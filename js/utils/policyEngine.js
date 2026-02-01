// policyEngine.js - Policy Generation Engine
// CRITICAL: This engine PRESERVES 100% of template content
// It supplements content, never replaces or compresses

import policyTemplate from '../data/policy_template.js'

/**
 * Generate a complete AI policy document
 * @param {Object} config - User configuration from PolicyGenerator
 * @returns {Object} - Generated policy structure with all content
 */
export function generatePolicy(config) {
    const policy = {
        metadata: {
            generatedDate: new Date().toISOString(),
            companyName: config.companyInfo.name,
            industry: config.companyInfo.industry,
            qualityLevel: config.quality,
            ...policyTemplate.metadata
        },
        sections: []
    }

    // RULE 1: Preserve ALL template sections (100% preservation)
    policy.sections = preserveAllSections(policyTemplate.sections)

    // RULE 2: Supplement (not replace) with PDPA if requested
    if (config.supplements.pdpa) {
        policy.sections = supplementPDPA(policy.sections, config)
    }

    // RULE 3: Supplement (not replace) with Singapore Framework if requested
    if (config.supplements.singaporeFramework) {
        policy.sections = supplementSingaporeFramework(policy.sections, config)
    }

    // RULE 4: Customize company-specific placeholders
    policy.sections = customizeCompanyInfo(policy.sections, config.companyInfo)

    return policy
}

/**
 * Preserve all sections from template - NO COMPRESSION
 */
function preserveAllSections(templateSections) {
    // Deep clone to avoid mutating original
    return JSON.parse(JSON.stringify(templateSections))
}

/**
 * Supplement PDPA content into section 5b (Data Guardrails)
 * PRESERVES all existing 9+ items
 */
function supplementPDPA(sections, config) {
    const section5b = sections.find(s => s.id === 'section_5b')

    if (section5b && policyTemplate.supplements.pdpa) {
        // CRITICAL: Add AFTER existing content, never replace
        const pdpaItems = policyTemplate.supplements.pdpa.items.map(item => ({
            title: item.title,
            text: item.text,
            supplementType: 'pdpa'
        }))

        section5b.content = [...section5b.content, ...pdpaItems]
    }

    return sections
}

/**
 * Supplement Singapore Framework content into section 7 (Transparency)
 * PRESERVES all existing items
 */
function supplementSingaporeFramework(sections, config) {
    const section7 = sections.find(s => s.id === 'section_7')

    if (section7 && policyTemplate.supplements.singaporeFramework) {
        // CRITICAL: Add AFTER existing content, never replace
        const sgItems = policyTemplate.supplements.singaporeFramework.items.map(item => item.text)

        section7.content = [...section7.content, ...sgItems]
    }

    return sections
}

/**
 * Customize company-specific placeholders
 * Only replaces [Company] placeholders, preserves all other content
 */
function customizeCompanyInfo(sections, companyInfo) {
    const companyPlaceholder = /\[Company\]/g
    const companyName = companyInfo.name || 'the Company'

    return sections.map(section => {
        if (section.content) {
            if (Array.isArray(section.content)) {
                section.content = section.content.map(item => {
                    if (typeof item === 'string') {
                        return item.replace(companyPlaceholder, companyName)
                    } else if (typeof item === 'object' && item.text) {
                        item.text = item.text.replace(companyPlaceholder, companyName)
                    }
                    return item
                })
            } else if (typeof section.content === 'string') {
                section.content = section.content.replace(companyPlaceholder, companyName)
            }
        }

        // Handle subsections
        if (section.subsections) {
            section.subsections = section.subsections.map(sub => {
                if (sub.content) {
                    sub.content = sub.content.replace(companyPlaceholder, companyName)
                }
                return sub
            })
        }

        return section
    })
}

/**
 * Convert policy structure to formatted text (markdown)
 * Ready for DOCX export
 */
export function policyToMarkdown(policy) {
    let markdown = `# ${policy.metadata.companyName} - AI Usage Policy\n\n`
    markdown += `**Generated Date:** ${new Date(policy.metadata.generatedDate).toLocaleDateString()}\n\n`
    markdown += `**Industry:** ${policy.metadata.industry}\n\n`
    markdown += `---\n\n`

    // Table of Contents
    markdown += `## Table of Contents\n\n`
    policy.sections.forEach(section => {
        markdown += `${section.number}. ${section.title}\n`
        if (section.subsections) {
            section.subsections.forEach(sub => {
                markdown += `   ${sub.number}. ${sub.title}\n`
            })
        }
    })
    markdown += `\n---\n\n`

    // Content
    policy.sections.forEach(section => {
        markdown += `## ${section.number}. ${section.title}\n\n`

        if (Array.isArray(section.content)) {
            section.content.forEach(item => {
                if (typeof item === 'string') {
                    markdown += `${item}\n\n`
                } else if (item.title) {
                    markdown += `**${item.title}:** ${item.text}\n\n`
                }
            })
        } else if (typeof section.content === 'object' && !Array.isArray(section.content)) {
            // Handle complex objects like section 6 and section 11 (Appendix)
            if (section.id === 'section_11') {
                // Special handling for Appendix
                if (section.content.intro) {
                    markdown += `${section.content.intro}\n\n`
                }
                if (section.content.references) {
                    section.content.references.forEach(refCategory => {
                        markdown += `### ${refCategory.category}\n\n`
                        refCategory.items.forEach(item => {
                            markdown += `- ${item}\n`
                        })
                        markdown += `\n`
                    })
                }
                if (section.content.notes) {
                    markdown += `### Notes\n\n`
                    section.content.notes.forEach(note => {
                        markdown += `- ${note}\n`
                    })
                    markdown += `\n`
                }
            } else {
                // Handle other complex objects like section 6
                Object.values(section.content).forEach(subsection => {
                    if (subsection.title) {
                        markdown += `### ${subsection.title}\n\n`
                        markdown += `${subsection.text}\n\n`
                    }
                    if (subsection.requirements) {
                        subsection.requirements.forEach(req => {
                            markdown += `- ${req}\n`
                        })
                        markdown += `\n`
                    }
                    if (subsection.guidelines) {
                        subsection.guidelines.forEach(guide => {
                            markdown += `- ${guide}\n`
                        })
                        markdown += `\n`
                    }
                    if (subsection.example) {
                        markdown += `**Example:** ${subsection.example}\n\n`
                    }
                })
            }
        } else if (typeof section.content === 'string') {
            markdown += `${section.content}\n\n`
        }

        // Handle subsections
        if (section.subsections) {
            section.subsections.forEach(sub => {
                markdown += `### ${sub.number}. ${sub.title}\n\n`
                markdown += `${sub.content}\n\n`
            })
        }
    })

    return markdown
}

/**
 * Validate generated policy meets quality requirements
 */
export function validatePolicy(policy) {
    const checks = {
        hasSection5a: policy.sections.some(s => s.id === 'section_5a'),
        hasSection5bWith9Items: (() => {
            const s5b = policy.sections.find(s => s.id === 'section_5b')
            return s5b && Array.isArray(s5b.content) && s5b.content.length >= 9
        })(),
        hasSection6: policy.sections.some(s => s.id === 'section_6'),
        hasSection8: policy.sections.some(s => s.id === 'section_8'),
        hasSection8Subsections: (() => {
            const s8 = policy.sections.find(s => s.id === 'section_8')
            return s8 && s8.subsections && s8.subsections.length >= 3
        })(),
        estimatedPages: estimatePageCount(policyToMarkdown(policy)),
        hasTableOfContents: true // Generated automatically
    }

    checks.meetsMinimumPages = checks.estimatedPages >= 10
    checks.allMandatorySectionsPresent = checks.hasSection5a &&
        checks.hasSection5bWith9Items &&
        checks.hasSection6 &&
        checks.hasSection8
    checks.overallValid = Object.values(checks).every(v => v === true || typeof v === 'number')

    return checks
}

/**
 * Estimate page count from markdown text
 * Rough estimate: ~500 words per page
 */
function estimatePageCount(markdown) {
    const words = markdown.split(/\s+/).length
    return Math.ceil(words / 500)
}

export default {
    generatePolicy,
    policyToMarkdown,
    validatePolicy
}
