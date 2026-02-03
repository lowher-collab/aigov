// policyEngine.js - Policy Generation Engine v3.1
// Implements Tone Engine, approved tools population, and proper placeholder handling

import policyTemplate from '../data/policy_template.js'
import { getIndustryAppendix } from '../data/policy_questions.js'

// ============================================
// APPROVED TOOLS MAPPING
// ============================================

const defaultApprovedTools = {
    technology: ['ChatGPT (Enterprise)', 'Claude', 'GitHub Copilot', 'Gemini'],
    finance: ['Bloomberg AI', 'ChatGPT (Enterprise)', 'Microsoft Copilot'],
    healthcare: ['ChatGPT (Enterprise)', 'Clinical Decision Support AI'],
    legal: ['ChatGPT (Enterprise)', 'Claude', 'Harvey AI', 'Casetext'],
    government: ['GovTech-approved AI tools only'],
    default: ['ChatGPT (Enterprise)', 'Claude', 'Microsoft Copilot']
}

function getApprovedToolsList(userTools, industry) {
    // If user specified tools, use those
    if (userTools && Array.isArray(userTools) && userTools.length > 0) {
        return userTools
    }
    // Otherwise use industry defaults
    return defaultApprovedTools[industry] || defaultApprovedTools.default
}

// ============================================
// INDUSTRY REGULATIONS MAPPING
// ============================================

const industryRegulations = {
    finance: [
        '• MAS FEAT Principles (Fairness, Ethics, Accountability, Transparency)',
        '• MAS Guidelines on Artificial Intelligence Risk Management (AIRM Guidelines)',
        '• MAS Technology Risk Management Guidelines'
    ],
    healthcare: [
        '• MOH Artificial Intelligence in Healthcare Guidelines (AIHGle)',
        '• HSA Guidance on AI-Medical Devices (AI-MD)',
        '• PDPA Health Data Provisions'
    ],
    legal: [
        '• Guide on the Use of Generative AI Tools by Court Users (Singapore Courts)',
        '• Law Society of Singapore Practice Directions on Technology',
        '• Professional Conduct Rules on Client Confidentiality'
    ],
    government: [
        '• Singapore Model AI Governance Framework (IMDA)',
        '• Public Sector Data Security Guidelines',
        '• Government Instruction Manual on AI Use'
    ]
}

// ============================================
// MAIN POLICY GENERATION
// ============================================

/**
 * Generate a complete AI policy document
 */
export function generatePolicy(config) {
    const generatedDate = new Date().toISOString()
    const aiAttitude = config.aiAttitude || 'cautious'
    const companyName = config.companyName || 'the Company'
    const industry = config.industry || 'technology'
    const officerRole = config.officerRole || 'AI Officer / DPO'
    const officerName = config.officerName || '[To be designated]'
    const officerEmail = config.officerEmail || '[compliance@company.com]'

    // Build disclaimer with actual date
    const disclaimer = policyTemplate.disclaimer ? {
        ...policyTemplate.disclaimer,
        content: policyTemplate.disclaimer.content.map(line =>
            line.replace('[AUTO-FILLED]', new Date(generatedDate).toLocaleDateString())
        )
    } : null

    const policy = {
        metadata: {
            generatedDate: generatedDate,
            companyName: companyName,
            industry: industry,
            tone: aiAttitude,
            qualityLevel: 'professional',
            ...policyTemplate.metadata
        },
        disclaimer: disclaimer,
        sections: [],
        logoPlaceholder: '[COMPANY LOGO HERE]'
    }

    // STEP 1: Preserve ALL template sections with deep clone
    policy.sections = JSON.parse(JSON.stringify(policyTemplate.sections))

    // STEP 2: Apply Tone Engine - replace content with tone-appropriate variants
    policy.sections = applyToneEngine(policy.sections, aiAttitude)

    // STEP 3: Populate approved tools list
    const approvedTools = getApprovedToolsList(config.approvedTools, industry)
    policy.sections = populateApprovedTools(policy.sections, approvedTools)

    // STEP 4: Populate officer placeholders
    policy.sections = populateOfficerInfo(policy.sections, officerRole, officerName, officerEmail)

    // STEP 5: Populate company name
    policy.sections = populateCompanyName(policy.sections, companyName)

    // STEP 6: Populate industry-specific content
    policy.sections = populateIndustryContent(policy.sections, industry)

    // STEP 7: Add PDPA supplements (Singapore region)
    if (config.region === 'singapore' || config.region === 'asia_pacific') {
        policy.sections = supplementPDPA(policy.sections)
    }

    // STEP 8: Add Singapore Framework supplements (always for SG)
    policy.sections = supplementSingaporeFramework(policy.sections, companyName)

    // STEP 9: Add industry-specific appendix
    const industryAppendix = getIndustryAppendix(industry)
    if (industryAppendix) {
        policy.sections = addIndustryAppendix(policy.sections, industryAppendix)
    }

    // STEP 10: Final cleanup of any remaining placeholders
    policy.sections = finalCleanup(policy.sections, {
        companyName,
        industry,
        year: new Date().getFullYear()
    })

    return policy
}

/**
 * Apply Tone Engine to sections with tone variants
 */
function applyToneEngine(sections, aiAttitude) {
    const toneKey = aiAttitude || 'cautious'

    return sections.map(section => {
        // If section has tone variants, use the appropriate one
        if (section.toneVariants && section.toneVariants[toneKey]) {
            section.content = section.toneVariants[toneKey]
        }
        return section
    })
}

/**
 * Populate the approved tools list in Section 3
 * Creates a properly formatted enumerated list with status indicators
 */
function populateApprovedTools(sections, tools) {
    return sections.map(section => {
        if (section.id === 'section_3' && Array.isArray(section.content)) {
            // Build a comprehensive tools list
            const allPossibleTools = [
                { id: 'chatgpt', name: 'ChatGPT (OpenAI)', category: 'Text Generation' },
                { id: 'claude', name: 'Claude (Anthropic)', category: 'Text Generation' },
                { id: 'gemini', name: 'Gemini (Google)', category: 'Text Generation' },
                { id: 'copilot', name: 'GitHub Copilot', category: 'Code Assistance' },
                { id: 'mscopilot', name: 'Microsoft Copilot', category: 'Office Integration' },
                { id: 'midjourney', name: 'Midjourney / DALL-E', category: 'Image Generation' },
                { id: 'internal', name: 'Internal / Custom AI System', category: 'Enterprise' }
            ]

            // Create formatted list - clean text format (no monospace chars)
            const formattedToolsList = []

            let approvedCount = 0
            allPossibleTools.forEach((tool, idx) => {
                // Check if tool is in user's selection
                const isApproved = tools.some(t =>
                    t.toLowerCase().includes(tool.id) ||
                    t.toLowerCase().includes(tool.name.split(' ')[0].toLowerCase())
                )
                if (isApproved) {
                    approvedCount++
                    formattedToolsList.push(`• ${tool.name} (${tool.category})`)
                }
            })

            // Add custom tools if any
            const customTools = tools.filter(t =>
                t.toLowerCase().includes('other') ||
                !allPossibleTools.some(apt =>
                    t.toLowerCase().includes(apt.id) ||
                    t.toLowerCase().includes(apt.name.split(' ')[0].toLowerCase())
                )
            )
            customTools.forEach(t => {
                if (!t.toLowerCase().includes('other')) {
                    approvedCount++
                    formattedToolsList.push(`• ${t}`)
                }
            })

            // Add placeholder if no tools selected
            if (approvedCount === 0) {
                formattedToolsList.push('• To be specified by IT Department')
            }

            // Replace placeholder with formatted list
            section.content = section.content.flatMap(line => {
                if (typeof line === 'string' && line.includes('[APPROVED_TOOLS_LIST]')) {
                    return formattedToolsList
                }
                return [line]
            })
        }
        return section
    })
}

/**
 * Populate officer information placeholders
 */
function populateOfficerInfo(sections, role, name, email) {
    const replacements = [
        { find: /\[AI Officer \/ DPO\]/g, replace: role },
        { find: /\[OFFICER_NAME\]/g, replace: name },
        { find: /\[OFFICER_EMAIL\]/g, replace: email },
        { find: /\[CONTACT_EMAIL\]/g, replace: email }
    ]

    return sections.map(section => replaceInSection(section, replacements))
}

/**
 * Populate company name throughout
 */
function populateCompanyName(sections, companyName) {
    const replacements = [
        { find: /\[Company\]/g, replace: companyName }
    ]

    return sections.map(section => replaceInSection(section, replacements))
}

/**
 * Populate industry-specific content
 */
function populateIndustryContent(sections, industry) {
    const regulations = industryRegulations[industry] || []
    const regulationText = regulations.length > 0
        ? regulations.join('\n')
        : '• Consult with industry specialists for specific requirements'

    const replacements = [
        { find: /\[INDUSTRY\]/g, replace: industry.charAt(0).toUpperCase() + industry.slice(1) },
        { find: /\[INDUSTRY_REGULATIONS\]/g, replace: regulationText },
        { find: /\[YEAR\]/g, replace: new Date().getFullYear().toString() }
    ]

    return sections.map(section => replaceInSection(section, replacements))
}

/**
 * Helper to replace text in section content
 */
function replaceInSection(section, replacements) {
    const replaceText = (text) => {
        if (typeof text !== 'string') return text
        let result = text
        replacements.forEach(r => {
            result = result.replace(r.find, r.replace)
        })
        return result
    }

    // Handle array content
    if (Array.isArray(section.content)) {
        section.content = section.content.map(item => {
            if (typeof item === 'string') {
                return replaceText(item)
            } else if (item && typeof item === 'object') {
                if (item.text) item.text = replaceText(item.text)
                if (item.title) item.title = replaceText(item.title)
            }
            return item
        })
    }
    // Handle string content
    else if (typeof section.content === 'string') {
        section.content = replaceText(section.content)
    }
    // Handle object content (like section 6 and 11)
    else if (section.content && typeof section.content === 'object') {
        Object.keys(section.content).forEach(key => {
            const item = section.content[key]
            if (typeof item === 'string') {
                section.content[key] = replaceText(item)
            } else if (item && typeof item === 'object') {
                if (item.text) item.text = replaceText(item.text)
                if (item.title) item.title = replaceText(item.title)
                if (item.intro) item.intro = replaceText(item.intro)
                if (Array.isArray(item.items)) {
                    item.items = item.items.map(i => replaceText(i))
                }
                if (Array.isArray(item.requirements)) {
                    item.requirements = item.requirements.map(i => replaceText(i))
                }
                if (Array.isArray(item.guidelines)) {
                    item.guidelines = item.guidelines.map(i => replaceText(i))
                }
            }
        })
        // Handle references array in section 11
        if (section.content.references) {
            section.content.references = section.content.references.map(ref => ({
                ...ref,
                category: replaceText(ref.category),
                items: ref.items.map(i => replaceText(i))
            }))
        }
        if (section.content.notes) {
            section.content.notes = section.content.notes.map(n => replaceText(n))
        }
    }

    // Handle subsections
    if (section.subsections) {
        section.subsections = section.subsections.map(sub => ({
            ...sub,
            content: replaceText(sub.content)
        }))
    }

    return section
}

/**
 * Supplement PDPA content into section 5b
 */
function supplementPDPA(sections) {
    const section5b = sections.find(s => s.id === 'section_5b')

    if (section5b && policyTemplate.supplements.pdpa) {
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
 * Supplement Singapore Framework content into section 7
 */
function supplementSingaporeFramework(sections, companyName) {
    const section7 = sections.find(s => s.id === 'section_7')

    if (section7 && policyTemplate.supplements.singaporeFramework) {
        const sgItems = policyTemplate.supplements.singaporeFramework.items.map(item =>
            item.text.replace('[Company]', companyName)
        )
        section7.content = [...section7.content, ...sgItems]
    }

    return sections
}

/**
 * Add industry-specific appendix
 */
function addIndustryAppendix(sections, industryContent) {
    const section11 = sections.find(s => s.id === 'section_11')

    if (section11 && section11.content.references) {
        // Add industry-specific regulations to appendix
        section11.content.references.push({
            category: industryContent.title,
            items: industryContent.items
        })
    }

    return sections
}

/**
 * Final cleanup of any remaining placeholders
 */
function finalCleanup(sections, context) {
    return sections.map(section => {
        const replacements = [
            { find: /\[Company\]/g, replace: context.companyName },
            { find: /\[YEAR\]/g, replace: context.year.toString() }
        ]
        return replaceInSection(section, replacements)
    })
}

/**
 * Convert policy structure to formatted markdown
 */
export function policyToMarkdown(policy) {
    let markdown = ''

    // Logo placeholder
    if (policy.logoPlaceholder) {
        markdown += `${policy.logoPlaceholder}\n\n`
    }

    markdown += `# ${policy.metadata.companyName} - AI POLICY\n\n`
    markdown += `**Generated Date:** ${new Date(policy.metadata.generatedDate).toLocaleDateString()}\n\n`
    markdown += `**Industry:** ${policy.metadata.industry}\n\n`
    markdown += `---\n\n`

    // Add Disclaimer Section
    if (policy.disclaimer) {
        markdown += `## ${policy.disclaimer.title}\n\n`
        markdown += `\`\`\`\n`
        policy.disclaimer.content.forEach(line => {
            markdown += `${line}\n`
        })
        markdown += `\`\`\`\n\n`
        markdown += `---\n\n`
    }

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
                } else if (item && item.title) {
                    markdown += `**${item.title}:** ${item.text || ''}\n\n`
                }
            })
        } else if (typeof section.content === 'object' && !Array.isArray(section.content)) {
            if (section.id === 'section_11') {
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
                Object.values(section.content).forEach(subsection => {
                    if (subsection && subsection.title) {
                        markdown += `### ${subsection.title}\n\n`
                        if (subsection.text) markdown += `${subsection.text}\n\n`
                    }
                    if (subsection && subsection.requirements) {
                        subsection.requirements.forEach(req => {
                            markdown += `- ${req}\n`
                        })
                        markdown += `\n`
                    }
                    if (subsection && subsection.guidelines) {
                        subsection.guidelines.forEach(guide => {
                            markdown += `- ${guide}\n`
                        })
                        markdown += `\n`
                    }
                    if (subsection && subsection.example) {
                        markdown += `**Example:** ${subsection.example}\n\n`
                    }
                })
            }
        } else if (typeof section.content === 'string') {
            markdown += `${section.content}\n\n`
        }

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
        hasSection10: policy.sections.some(s => s.id === 'section_10'),
        hasSection11: policy.sections.some(s => s.id === 'section_11'),
        hasSection12: policy.sections.some(s => s.id === 'section_12'),
        estimatedPages: estimatePageCount(policyToMarkdown(policy)),
        hasTableOfContents: true,
        hasDisclaimer: !!policy.disclaimer,
        hasLogoPlaceholder: !!policy.logoPlaceholder
    }

    checks.meetsMinimumPages = checks.estimatedPages >= 10
    checks.allMandatorySectionsPresent = checks.hasSection5a &&
        checks.hasSection5bWith9Items &&
        checks.hasSection6 &&
        checks.hasSection8 &&
        checks.hasSection10 &&
        checks.hasSection11

    checks.overallValid = Object.values(checks).every(v => v === true || typeof v === 'number')

    return checks
}

/**
 * Estimate page count from markdown text
 */
function estimatePageCount(markdown) {
    const words = markdown.split(/\s+/).length
    return Math.ceil(words / 400) // More accurate estimate: ~400 words per page
}

export default {
    generatePolicy,
    policyToMarkdown,
    validatePolicy
}
