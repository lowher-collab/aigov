// documentExport.js - DOCX and PDF Export Utilities v3.3
// Clean typography: no ** markers, italics for instructional text

// List of instructional headings that should be italicized
const INSTRUCTIONAL_HEADINGS = [
    'Approval Requirements',
    'Requesting New Tool Approval',
    'Reserved for Future Approval',
    'Currently Approved Tools',
    'Approved',
    'Prohibited Tools',
    'Prohibited Uses',
    'Notes',
    'Example',
    'Recommended Next Steps',
    'Contact for Professional Consultation'
];

/**
 * Check if text is an instructional heading
 */
function isInstructionalHeading(text) {
    const cleanText = text.replace(/\*\*/g, '').replace(/:$/, '').trim();
    return INSTRUCTIONAL_HEADINGS.some(h => cleanText.includes(h));
}

/**
 * Clean text - remove markdown markers
 */
function cleanText(text) {
    return text.replace(/\*\*/g, '').replace(/\*([^*]+)\*/g, '$1');
}

/**
 * Export policy to DOCX format
 */
export async function exportToDOCX(policy) {
    if (typeof docx === 'undefined') {
        alert('DOCX library not loaded. Please refresh the page and try again.');
        throw new Error('docx library not loaded');
    }

    try {
        const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = docx;
        const children = [];

        // ===== COVER PAGE =====
        children.push(
            new Paragraph({
                children: [new TextRun({ text: policy.metadata.companyName, bold: true, size: 56 })],
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 }
            }),
            new Paragraph({
                children: [new TextRun({ text: 'AI POLICY', bold: true, size: 48 })],
                alignment: AlignmentType.CENTER,
                spacing: { after: 600 }
            }),
            new Paragraph({
                children: [new TextRun({ text: `Industry: ${policy.metadata.industry}`, size: 24 })],
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 }
            }),
            new Paragraph({
                children: [new TextRun({ text: `Generated: ${new Date(policy.metadata.generatedDate).toLocaleDateString()}`, size: 24 })],
                alignment: AlignmentType.CENTER,
                spacing: { after: 800 }
            }),
            new Paragraph({ text: '', pageBreakBefore: true })
        );

        // ===== DISCLAIMER =====
        if (policy.disclaimer) {
            children.push(
                new Paragraph({
                    children: [new TextRun({ text: policy.disclaimer.title, bold: true, size: 28 })],
                    spacing: { after: 200 }
                })
            );
            policy.disclaimer.content.forEach(line => {
                children.push(new Paragraph({
                    text: cleanText(line),
                    spacing: { after: 100 },
                    alignment: AlignmentType.JUSTIFIED
                }));
            });
            children.push(new Paragraph({ text: '', pageBreakBefore: true }));
        }

        // ===== TABLE OF CONTENTS =====
        children.push(
            new Paragraph({
                children: [new TextRun({ text: 'Table of Contents', bold: true, size: 32 })],
                spacing: { after: 300 }
            })
        );
        policy.sections.forEach(section => {
            children.push(new Paragraph({
                text: `${section.number}. ${section.title}`,
                spacing: { after: 100 }
            }));
            if (section.subsections) {
                section.subsections.forEach(sub => {
                    children.push(new Paragraph({
                        text: `    ${sub.number}. ${sub.title}`,
                        spacing: { after: 50 }
                    }));
                });
            }
        });
        children.push(new Paragraph({ text: '', pageBreakBefore: true }));

        // ===== CONTENT SECTIONS =====
        policy.sections.forEach(section => {
            // Section heading
            children.push(new Paragraph({
                children: [new TextRun({ text: `${section.number}. ${section.title}`, bold: true, size: 28 })],
                spacing: { before: 400, after: 200 }
            }));

            // Handle different content types
            if (Array.isArray(section.content)) {
                section.content.forEach(item => {
                    if (typeof item === 'string') {
                        addDocxStringContent(children, item, Paragraph, TextRun, AlignmentType);
                    } else if (item && item.title) {
                        children.push(new Paragraph({
                            children: [
                                new TextRun({ text: cleanText(item.title) + ': ', bold: true }),
                                new TextRun({ text: cleanText(item.text || '') })
                            ],
                            spacing: { after: 150 },
                            alignment: AlignmentType.JUSTIFIED
                        }));
                    }
                });
            } else if (typeof section.content === 'object' && section.content !== null) {
                if (section.id === 'section_11') {
                    addDocxSection11(children, section.content, Paragraph, TextRun, AlignmentType);
                } else {
                    addDocxComplexSection(children, section.content, Paragraph, TextRun, AlignmentType);
                }
            } else if (typeof section.content === 'string') {
                children.push(new Paragraph({
                    text: cleanText(section.content),
                    spacing: { after: 150 },
                    alignment: AlignmentType.JUSTIFIED
                }));
            }

            // Subsections
            if (section.subsections) {
                section.subsections.forEach(sub => {
                    children.push(
                        new Paragraph({
                            children: [new TextRun({ text: `${sub.number}. ${sub.title}`, bold: true, size: 24 })],
                            spacing: { before: 200, after: 100 }
                        }),
                        new Paragraph({
                            text: cleanText(sub.content),
                            spacing: { after: 150 },
                            alignment: AlignmentType.JUSTIFIED
                        })
                    );
                });
            }
        });

        // Create and download document
        const doc = new Document({
            sections: [{ properties: {}, children: children }]
        });
        const blob = await Packer.toBlob(doc);
        downloadBlob(blob, 'AI POLICY.docx');

    } catch (error) {
        console.error('DOCX export error:', error);
        alert('DOCX export failed: ' + error.message + '\nPlease try PDF or Markdown instead.');
        throw error;
    }
}

/**
 * Add DOCX string content with proper formatting
 */
function addDocxStringContent(children, text, Paragraph, TextRun, AlignmentType) {
    const clean = cleanText(text);

    // Instructional heading (italics + bold)
    if (text.startsWith('**') && text.includes(':')) {
        const colonIndex = clean.indexOf(':');
        const heading = clean.substring(0, colonIndex);
        const rest = clean.substring(colonIndex + 1);

        const isInstructional = isInstructionalHeading(heading);

        children.push(new Paragraph({
            children: [
                new TextRun({
                    text: heading + ':',
                    bold: true,
                    italics: isInstructional
                }),
                new TextRun({ text: rest })
            ],
            spacing: { after: 150 },
            alignment: AlignmentType.JUSTIFIED
        }));
        return;
    }

    // Bullet point
    if (text.startsWith('•') || text.startsWith('-')) {
        children.push(new Paragraph({
            text: clean,
            bullet: { level: 0 },
            spacing: { after: 80 },
            alignment: AlignmentType.JUSTIFIED
        }));
        return;
    }

    // Empty line
    if (text.trim() === '') {
        children.push(new Paragraph({ text: '', spacing: { after: 100 } }));
        return;
    }

    // Regular paragraph
    children.push(new Paragraph({
        text: clean,
        spacing: { after: 150 },
        alignment: AlignmentType.JUSTIFIED
    }));
}

/**
 * Add Section 11 (Appendix) content for DOCX
 */
function addDocxSection11(children, content, Paragraph, TextRun, AlignmentType) {
    if (content.intro) {
        children.push(new Paragraph({
            text: cleanText(content.intro),
            spacing: { after: 200 },
            alignment: AlignmentType.JUSTIFIED
        }));
    }

    if (content.references && Array.isArray(content.references)) {
        content.references.forEach(refCategory => {
            children.push(new Paragraph({
                children: [new TextRun({ text: cleanText(refCategory.category), bold: true, size: 24 })],
                spacing: { before: 200, after: 100 }
            }));
            if (refCategory.items && Array.isArray(refCategory.items)) {
                refCategory.items.forEach(item => {
                    children.push(new Paragraph({
                        text: '• ' + cleanText(item),
                        spacing: { after: 50 },
                        alignment: AlignmentType.JUSTIFIED
                    }));
                });
            }
        });
    }

    if (content.notes && Array.isArray(content.notes)) {
        children.push(new Paragraph({
            children: [new TextRun({ text: 'Notes', bold: true, italics: true, size: 24 })],
            spacing: { before: 200, after: 100 }
        }));
        content.notes.forEach(note => {
            children.push(new Paragraph({
                text: '• ' + cleanText(note),
                spacing: { after: 50 },
                alignment: AlignmentType.JUSTIFIED
            }));
        });
    }
}

/**
 * Add complex section content for DOCX
 */
function addDocxComplexSection(children, content, Paragraph, TextRun, AlignmentType) {
    Object.values(content).forEach(subsection => {
        if (subsection && typeof subsection === 'object') {
            if (subsection.title) {
                const isInstructional = isInstructionalHeading(subsection.title);
                children.push(new Paragraph({
                    children: [new TextRun({
                        text: cleanText(subsection.title),
                        bold: true,
                        italics: isInstructional,
                        size: 24
                    })],
                    spacing: { before: 200, after: 100 }
                }));
            }
            if (subsection.text) {
                children.push(new Paragraph({
                    text: cleanText(subsection.text),
                    spacing: { after: 100 },
                    alignment: AlignmentType.JUSTIFIED
                }));
            }
            if (subsection.requirements) {
                subsection.requirements.forEach(req => {
                    children.push(new Paragraph({
                        text: '• ' + cleanText(req),
                        spacing: { after: 50 },
                        alignment: AlignmentType.JUSTIFIED
                    }));
                });
            }
            if (subsection.guidelines) {
                subsection.guidelines.forEach(guide => {
                    children.push(new Paragraph({
                        text: '• ' + cleanText(guide),
                        spacing: { after: 50 },
                        alignment: AlignmentType.JUSTIFIED
                    }));
                });
            }
            if (subsection.example) {
                children.push(new Paragraph({
                    children: [
                        new TextRun({ text: 'Example: ', bold: true, italics: true }),
                        new TextRun({ text: cleanText(subsection.example), italics: true })
                    ],
                    spacing: { after: 150 },
                    alignment: AlignmentType.JUSTIFIED
                }));
            }
        }
    });
}

/**
 * Export policy to PDF format
 */
export function exportToPDF(policy) {
    if (typeof window.jspdf === 'undefined') {
        alert('PDF library not loaded. Please refresh the page and try again.');
        throw new Error('jsPDF library not loaded');
    }

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ unit: 'mm', format: 'a4' });

        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 20;
        const contentWidth = pageWidth - (margin * 2);
        let y = margin;

        const checkPageBreak = (neededSpace = 15) => {
            if (y > pageHeight - margin - neededSpace) {
                doc.addPage();
                y = margin;
            }
        };

        const addText = (text, fontSize = 11, isBold = false, isItalic = false) => {
            doc.setFontSize(fontSize);
            let fontStyle = 'normal';
            if (isBold && isItalic) fontStyle = 'bolditalic';
            else if (isBold) fontStyle = 'bold';
            else if (isItalic) fontStyle = 'italic';
            doc.setFont('helvetica', fontStyle);

            const lines = doc.splitTextToSize(cleanText(text), contentWidth);
            lines.forEach(line => {
                checkPageBreak();
                doc.text(line, margin, y, { align: 'justify', maxWidth: contentWidth });
                y += fontSize * 0.55;  // 1.25 line spacing
            });
            y += 2;
        };

        const addHeading = (text, level = 1, isItalic = false) => {
            const sizes = { 1: 16, 2: 13, 3: 11 };
            checkPageBreak(20);
            y += 4;
            doc.setFontSize(sizes[level] || 12);
            doc.setFont('helvetica', isItalic ? 'bolditalic' : 'bold');
            doc.text(cleanText(text), margin, y);
            y += sizes[level] * 0.6;  // 1.25 line spacing for headings
        };

        const addBullet = (text, fontSize = 10) => {
            doc.setFontSize(fontSize);
            doc.setFont('helvetica', 'normal');
            checkPageBreak();
            const bulletText = '• ' + cleanText(text).replace(/^[•\-]\s*/, '');
            const lines = doc.splitTextToSize(bulletText, contentWidth - 5);
            lines.forEach((line, idx) => {
                checkPageBreak();
                doc.text(idx === 0 ? line : '  ' + line, margin + 3, y);
                y += fontSize * 0.55;  // 1.25 line spacing
            });
            y += 1;
        };

        // ===== COVER PAGE =====
        y = 80;
        doc.setFontSize(28);
        doc.setFont('helvetica', 'bold');
        doc.text(policy.metadata.companyName, pageWidth / 2, y, { align: 'center' });

        y += 20;
        doc.setFontSize(24);
        doc.text('AI POLICY', pageWidth / 2, y, { align: 'center' });

        y += 30;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Industry: ${policy.metadata.industry}`, pageWidth / 2, y, { align: 'center' });

        y += 8;
        doc.text(`Generated: ${new Date(policy.metadata.generatedDate).toLocaleDateString()}`, pageWidth / 2, y, { align: 'center' });

        // ===== DISCLAIMER =====
        doc.addPage();
        y = margin;
        if (policy.disclaimer) {
            addHeading(policy.disclaimer.title, 1);
            policy.disclaimer.content.forEach(line => addText(line, 10));
        }

        // ===== TABLE OF CONTENTS =====
        doc.addPage();
        y = margin;
        addHeading('Table of Contents', 1);
        y += 5;
        policy.sections.forEach(section => {
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            checkPageBreak();
            doc.text(`${section.number}. ${section.title}`, margin, y);
            y += 6;
            if (section.subsections) {
                section.subsections.forEach(sub => {
                    checkPageBreak();
                    doc.text(`    ${sub.number}. ${sub.title}`, margin, y);
                    y += 5;
                });
            }
        });

        // ===== CONTENT SECTIONS =====
        doc.addPage();
        y = margin;

        policy.sections.forEach(section => {
            addHeading(`${section.number}. ${section.title}`, 1);

            if (Array.isArray(section.content)) {
                section.content.forEach(item => {
                    if (typeof item === 'string') {
                        // Check for subheading with colon (e.g., "**Bold Header:** text")
                        if (item.startsWith('**') && item.includes(':')) {
                            const clean = cleanText(item);
                            const colonIdx = clean.indexOf(':');
                            const heading = clean.substring(0, colonIdx);
                            const isInstructional = isInstructionalHeading(heading);

                            // Add spacing before each new item
                            y += 4;
                            checkPageBreak();

                            doc.setFontSize(11);
                            doc.setFont('helvetica', isInstructional ? 'bolditalic' : 'bold');
                            doc.text(heading + ':', margin, y);
                            y += 6;  // Proper spacing after header

                            const rest = clean.substring(colonIdx + 1).trim();
                            if (rest) {
                                doc.setFont('helvetica', 'normal');
                                const lines = doc.splitTextToSize(rest, contentWidth);
                                lines.forEach(line => {
                                    checkPageBreak();
                                    doc.text(line, margin, y);
                                    y += 5.5;  // 1.25 line spacing
                                });
                            }
                            y += 2;  // Extra spacing after complete item
                        } else if (item.startsWith('•') || item.startsWith('-')) {
                            addBullet(item);
                        } else if (item.trim() === '') {
                            y += 4;  // Slightly more for empty lines
                        } else {
                            addText(item);
                        }
                    } else if (item && item.title) {
                        // Structured content with title/text
                        y += 4;  // Space before item
                        doc.setFontSize(11);
                        doc.setFont('helvetica', 'bold');
                        checkPageBreak();
                        doc.text(item.title + ':', margin, y);
                        y += 6;

                        if (item.text) {
                            doc.setFont('helvetica', 'normal');
                            const lines = doc.splitTextToSize(cleanText(item.text), contentWidth);
                            lines.forEach(line => {
                                checkPageBreak();
                                doc.text(line, margin, y);
                                y += 5.5;
                            });
                        }
                        y += 2;
                    }
                });
            } else if (typeof section.content === 'object' && section.content !== null) {
                if (section.id === 'section_11') {
                    if (section.content.intro) addText(section.content.intro);
                    if (section.content.references) {
                        section.content.references.forEach(refCategory => {
                            addHeading(refCategory.category, 2);
                            if (refCategory.items) refCategory.items.forEach(item => addBullet(item));
                        });
                    }
                    if (section.content.notes) {
                        addHeading('Notes', 2, true);
                        section.content.notes.forEach(note => addBullet(note));
                    }
                } else {
                    Object.values(section.content).forEach(sub => {
                        if (sub && typeof sub === 'object') {
                            if (sub.title) {
                                const isInstructional = isInstructionalHeading(sub.title);
                                addHeading(sub.title, 2, isInstructional);
                            }
                            if (sub.text) addText(sub.text);
                            if (sub.requirements) sub.requirements.forEach(r => addBullet(r));
                            if (sub.guidelines) sub.guidelines.forEach(g => addBullet(g));
                            if (sub.example) addText(`Example: ${sub.example}`, 10, false, true);
                        }
                    });
                }
            } else if (typeof section.content === 'string') {
                addText(section.content);
            }

            if (section.subsections) {
                section.subsections.forEach(sub => {
                    addHeading(`${sub.number}. ${sub.title}`, 2);
                    addText(sub.content);
                });
            }
        });

        doc.save('AI POLICY.pdf');

    } catch (error) {
        console.error('PDF export error:', error);
        alert('PDF export failed: ' + error.message);
        throw error;
    }
}

/**
 * Download blob as file
 */
function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export default { exportToDOCX, exportToPDF };
