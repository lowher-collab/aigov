// documentExport.js - DOCX and PDF Export Utilities
// Provides professional document export for generated AI policies

/**
 * Export policy to DOCX format
 * Uses docx.js library (loaded via CDN)
 */
export async function exportToDOCX(policy) {
    if (typeof docx === 'undefined') {
        throw new Error('docx library not loaded. Please refresh the page.');
    }

    const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, TableOfContents } = docx;

    // Create paragraphs for the document
    const children = [];

    // Cover page
    children.push(
        new Paragraph({
            text: `${policy.metadata.companyName}`,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 }
        }),
        new Paragraph({
            text: 'AI Usage Policy',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
        }),
        new Paragraph({
            children: [
                new TextRun({
                    text: `Industry: ${policy.metadata.industry}`,
                    break: 1
                }),
                new TextRun({
                    text: `Generated: ${new Date(policy.metadata.generatedDate).toLocaleDateString()}`,
                    break: 1
                })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
        }),
        new Paragraph({
            text: '',
            pageBreakBefore: true
        })
    );

    // Table of Contents
    children.push(
        new Paragraph({
            text: 'Table of Contents',
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 200 }
        }),
        new TableOfContents('Table of Contents', {
            hyperlink: true,
            headingStyleRange: '1-3'
        }),
        new Paragraph({
            text: '',
            pageBreakBefore: true
        })
    );

    // Sections
    policy.sections.forEach((section, idx) => {
        // Section heading
        children.push(
            new Paragraph({
                text: `${section.number}. ${section.title}`,
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 300, after: 200 }
            })
        );

        // Section content
        if (Array.isArray(section.content)) {
            section.content.forEach(item => {
                if (typeof item === 'string') {
                    children.push(
                        new Paragraph({
                            text: item,
                            spacing: { after: 150 }
                        })
                    );
                } else if (item.title) {
                    children.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: item.title,
                                    bold: true
                                }),
                                new TextRun({
                                    text: item.text ? `: ${item.text}` : '',
                                })
                            ],
                            spacing: { after: 150 }
                        })
                    );
                }
            });
        } else if (typeof section.content === 'object' && !Array.isArray(section.content)) {
            // Handle complex objects (e.g., section 6)
            Object.values(section.content).forEach(subsection => {
                if (subsection.title) {
                    children.push(
                        new Paragraph({
                            text: subsection.title,
                            heading: HeadingLevel.HEADING_2,
                            spacing: { before: 200, after: 100 }
                        })
                    );
                }
                if (subsection.text) {
                    children.push(
                        new Paragraph({
                            text: subsection.text,
                            spacing: { after: 100 }
                        })
                    );
                }
                if (subsection.requirements) {
                    subsection.requirements.forEach(req => {
                        children.push(
                            new Paragraph({
                                text: req,
                                bullet: { level: 0 },
                                spacing: { after: 50 }
                            })
                        );
                    });
                }
                if (subsection.guidelines) {
                    subsection.guidelines.forEach(guide => {
                        children.push(
                            new Paragraph({
                                text: guide,
                                bullet: { level: 0 },
                                spacing: { after: 50 }
                            })
                        );
                    });
                }
                if (subsection.example) {
                    children.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'Example: ',
                                    bold: true
                                }),
                                new TextRun({
                                    text: subsection.example,
                                    italics: true
                                })
                            ],
                            spacing: { after: 150 }
                        })
                    );
                }
            });
        } else if (typeof section.content === 'string') {
            children.push(
                new Paragraph({
                    text: section.content,
                    spacing: { after: 150 }
                })
            );
        }

        // Handle subsections (e.g., 8a, 8b, 8c)
        if (section.subsections) {
            section.subsections.forEach(sub => {
                children.push(
                    new Paragraph({
                        text: `${sub.number}. ${sub.title}`,
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 200, after: 100 }
                    }),
                    new Paragraph({
                        text: sub.content,
                        spacing: { after: 150 }
                    })
                );
            });
        }
    });

    // Create document
    const doc = new Document({
        sections: [{
            properties: {},
            children: children
        }]
    });

    // Generate and download
    const blob = await Packer.toBlob(doc);
    downloadBlob(blob, 'AI POLICY.docx');
}

/**
 * Export policy to PDF format
 * Uses jsPDF library (loaded via CDN)
 */
export function exportToPDF(policy) {
    if (typeof window.jspdf === 'undefined') {
        throw new Error('jsPDF library not loaded. Please refresh the page.');
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let yPosition = 20;
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const maxWidth = pageWidth - (2 * margin);

    // Helper function to add page if needed
    function checkPageBreak(requiredSpace = 20) {
        if (yPosition + requiredSpace > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
            return true;
        }
        return false;
    }

    // Helper function to add text with wrapping
    function addText(text, fontSize = 11, isBold = false, isItalic = false) {
        doc.setFontSize(fontSize);
        const fontStyle = isBold ? 'bold' : (isItalic ? 'italic' : 'normal');
        doc.setFont('helvetica', fontStyle);

        const lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach(line => {
            checkPageBreak();
            doc.text(line, margin, yPosition);
            yPosition += fontSize * 0.5;
        });
        yPosition += 5;
    }

    // Cover page
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(policy.metadata.companyName, pageWidth / 2, 60, { align: 'center' });

    doc.setFontSize(18);
    doc.text('AI Usage Policy', pageWidth / 2, 80, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Industry: ${policy.metadata.industry}`, pageWidth / 2, 100, { align: 'center' });
    doc.text(`Generated: ${new Date(policy.metadata.generatedDate).toLocaleDateString()}`, pageWidth / 2, 110, { align: 'center' });

    // New page for content
    doc.addPage();
    yPosition = margin;

    // Table of Contents
    addText('Table of Contents', 16, true);
    policy.sections.forEach(section => {
        addText(`${section.number}. ${section.title}`, 11);
        if (section.subsections) {
            section.subsections.forEach(sub => {
                addText(`   ${sub.number}. ${sub.title}`, 10);
            });
        }
    });

    // New page for sections
    doc.addPage();
    yPosition = margin;

    // Sections
    policy.sections.forEach(section => {
        checkPageBreak(30);

        // Section heading
        addText(`${section.number}. ${section.title}`, 14, true);

        // Section content
        if (Array.isArray(section.content)) {
            section.content.forEach(item => {
                if (typeof item === 'string') {
                    addText(item);
                } else if (item.title) {
                    const text = item.text ? `${item.title}: ${item.text}` : item.title;
                    addText(text, 11, true);
                }
            });
        } else if (typeof section.content === 'object' && !Array.isArray(section.content)) {
            Object.values(section.content).forEach(subsection => {
                if (subsection.title) {
                    addText(subsection.title, 12, true);
                }
                if (subsection.text) {
                    addText(subsection.text);
                }
                if (subsection.requirements) {
                    subsection.requirements.forEach(req => {
                        addText(`• ${req}`, 10);
                    });
                }
                if (subsection.guidelines) {
                    subsection.guidelines.forEach(guide => {
                        addText(`• ${guide}`, 10);
                    });
                }
                if (subsection.example) {
                    addText(`Example: ${subsection.example}`, 10, false, true);
                }
            });
        } else if (typeof section.content === 'string') {
            addText(section.content);
        }

        // Subsections
        if (section.subsections) {
            section.subsections.forEach(sub => {
                checkPageBreak(20);
                addText(`${sub.number}. ${sub.title}`, 12, true);
                addText(sub.content);
            });
        }

        yPosition += 10; // Extra space between sections
    });

    // Add page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    }

    // Download
    doc.save('AI POLICY.pdf');
}

/**
 * Helper function to download blob
 */
function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

export default {
    exportToDOCX,
    exportToPDF
};
