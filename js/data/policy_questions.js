// policy_questions.js - Simplified 10-Question SME Version
// V3.1 with Tone Engine support

export const questionsData = {
    // Single simplified mode for SME
    modes: {
        sme: {
            id: 'sme',
            name: 'SME Quick Policy',
            description: '10 Core Questions | 5-8 Minutes',
            features: [
                'Generates complete professional AI policy',
                'Auto-applies industry best practices',
                'Singapore MGF compliant defaults'
            ],
            questionCount: 10,
            recommended: true
        }
    },

    // 10 Core Questions
    sections: [
        {
            id: 'section_basic',
            title: 'Basic Information',
            questions: [
                {
                    id: 'q1',
                    question: 'Company/Organization Name',
                    type: 'text',
                    required: true,
                    placeholder: 'Example: ABC Technology Pte Ltd',
                    mappingTo: 'companyName'
                },
                {
                    id: 'q2',
                    question: 'Industry',
                    type: 'single',
                    required: true,
                    options: [
                        { value: 'finance', label: 'Financial Services' },
                        { value: 'healthcare', label: 'Healthcare' },
                        { value: 'technology', label: 'Technology / IT' },
                        { value: 'legal', label: 'Legal / Professional Services' },
                        { value: 'manufacturing', label: 'Manufacturing' },
                        { value: 'retail', label: 'Retail / E-commerce' },
                        { value: 'education', label: 'Education / Training' },
                        { value: 'government', label: 'Government / Public Sector' },
                        { value: 'other', label: 'Other' }
                    ],
                    mappingTo: 'industry',
                    triggersIndustryAppendix: true
                },
                {
                    id: 'q3',
                    question: 'Organization Size',
                    type: 'single',
                    required: true,
                    options: [
                        { value: 'small', label: 'Small (< 50 employees)' },
                        { value: 'medium', label: 'Medium (50-500 employees)' },
                        { value: 'large', label: 'Large (> 500 employees)' }
                    ],
                    mappingTo: 'companySize'
                },
                {
                    id: 'q4',
                    question: 'Primary Operating Region',
                    type: 'single',
                    required: true,
                    options: [
                        { value: 'singapore', label: 'Singapore' },
                        { value: 'asia_pacific', label: 'Asia Pacific' },
                        { value: 'global', label: 'Global Operations' }
                    ],
                    mappingTo: 'region'
                },
                {
                    id: 'q5',
                    question: 'Policy Applies To',
                    type: 'single',
                    required: true,
                    options: [
                        { value: 'all', label: 'All Employees' },
                        { value: 'tech_only', label: 'IT / Technical Team Only' },
                        { value: 'selected', label: 'Selected Departments' }
                    ],
                    mappingTo: 'policyScope'
                },
                {
                    id: 'q6',
                    question: "Company's Attitude Towards GenAI",
                    type: 'single',
                    required: true,
                    options: [
                        { value: 'encouraging', label: 'Actively Encouraging - Promote innovation with support' },
                        { value: 'cautious', label: 'Cautiously Open - Allow use with clear boundaries' },
                        { value: 'restrictive', label: 'Strictly Limited - Only approved specific use cases' },
                        { value: 'prohibited', label: 'Prohibited - Not allowed at current stage' }
                    ],
                    mappingTo: 'aiAttitude',
                    drivesToneEngine: true
                }
            ]
        },
        {
            id: 'section_usage',
            title: 'AI Usage',
            questions: [
                {
                    id: 'q7',
                    question: 'Approved GenAI Tools (Select all that apply)',
                    type: 'multiple',
                    required: true,
                    options: [
                        { value: 'chatgpt', label: 'ChatGPT (OpenAI)' },
                        { value: 'claude', label: 'Claude (Anthropic)' },
                        { value: 'gemini', label: 'Gemini (Google)' },
                        { value: 'copilot', label: 'GitHub Copilot' },
                        { value: 'midjourney', label: 'Midjourney / DALL-E' },
                        { value: 'internal', label: 'Internal / Custom AI System' },
                        { value: 'other', label: 'Other' }
                    ],
                    mappingTo: 'approvedTools'
                },
                {
                    id: 'q8',
                    question: 'Is Human Review Required for AI-Generated Content?',
                    type: 'single',
                    required: true,
                    options: [
                        { value: 'all', label: 'Yes, for all AI outputs' },
                        { value: 'external', label: 'Yes, for external-facing content only' },
                        { value: 'high_risk', label: 'Yes, for high-risk decisions only' },
                        { value: 'no', label: 'No, not mandatory' }
                    ],
                    mappingTo: 'humanReview'
                }
            ]
        },
        {
            id: 'section_governance',
            title: 'Governance',
            questions: [
                {
                    id: 'q9',
                    question: 'Data Types Prohibited from AI Input (Select all that apply)',
                    type: 'multiple',
                    required: true,
                    options: [
                        { value: 'personal_id', label: 'Personal ID / Passport Numbers' },
                        { value: 'financial', label: 'Credit Card / Bank Account Info' },
                        { value: 'health', label: 'Medical / Health Records' },
                        { value: 'confidential', label: 'Confidential Business Information' },
                        { value: 'credentials', label: 'Passwords / API Keys' },
                        { value: 'customer', label: 'Customer Personal Data' }
                    ],
                    mappingTo: 'prohibitedData',
                    defaultSelectAll: true
                },
                {
                    id: 'q10',
                    question: 'Who Bears Ultimate Responsibility for AI-Generated Content?',
                    type: 'single',
                    required: true,
                    options: [
                        { value: 'employee', label: 'The employee using the AI tool' },
                        { value: 'supervisor', label: "Employee's direct supervisor" },
                        { value: 'department', label: 'Department head' },
                        { value: 'ai_officer', label: 'Designated AI Officer / DPO' }
                    ],
                    mappingTo: 'responsibility'
                }
            ]
        }
    ],

    // Default values for auto-fill (Singapore MGF compliant)
    defaults: {
        region: 'singapore',
        policyScope: 'all',
        humanReview: 'external',
        prohibitedData: ['personal_id', 'financial', 'health', 'confidential', 'credentials', 'customer'],
        responsibility: 'employee',
        approvedTools: ['chatgpt', 'copilot']
    },

    // Industry-specific appendix content (regulation names only)
    industryAppendix: {
        legal: {
            title: 'Legal Services - Applicable AI Regulations',
            items: [
                'Guide on the Use of Generative Artificial Intelligence Tools by Court Users (Singapore Courts, Oct 2024)',
                'MinLaw Guidance on AI Use by Legal Practitioners (In Development)',
                'Law Society of Singapore Practice Directions on Technology'
            ]
        },
        finance: {
            title: 'Financial Services - Applicable AI Regulations',
            items: [
                'MAS FEAT Principles (Fairness, Ethics, Accountability, Transparency)',
                'MAS Guidelines on Artificial Intelligence Risk Management (AIRM Guidelines, Nov 2025)',
                'MAS Technology Risk Management Guidelines',
                'MAS Notice on Cyber Hygiene'
            ]
        },
        healthcare: {
            title: 'Healthcare - Applicable AI Regulations',
            items: [
                'MOH Artificial Intelligence in Healthcare Guidelines (AIHGle, 2021)',
                'HSA Guidance on AI-Medical Devices (AI-MD)',
                'PDPA Health Data Provisions',
                'HBRA (Healthcare Services Act) Compliance Requirements'
            ]
        },
        government: {
            title: 'Government / Public Sector - Applicable AI Regulations',
            items: [
                'Singapore Model AI Governance Framework (IMDA)',
                'Government Instruction Manual on AI Use',
                'Public Sector Data Security Guidelines'
            ]
        }
    }
}

// Helper function to get all questions as flat array
export function getAllQuestions() {
    const questions = []
    questionsData.sections.forEach(section => {
        section.questions.forEach(q => {
            questions.push({ ...q, sectionTitle: section.title })
        })
    })
    return questions
}

// Helper to get question count
export function getQuestionCount() {
    return questionsData.modes.sme.questionCount
}

// Get industry appendix if applicable
export function getIndustryAppendix(industry) {
    return questionsData.industryAppendix[industry] || null
}

// Get default values
export function getDefaults() {
    return questionsData.defaults
}

export default questionsData
