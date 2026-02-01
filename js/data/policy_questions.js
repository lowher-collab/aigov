const questionsData = {
    // Question modes
    modes: {
        standard: {
            id: 'standard',
            name: 'Standard Version',
            description: '22 core questions | About 8-10 minutes',
            features: ['Covers all policy chapters', 'Generates complete professional AI policy'],
            questionCount: 22,
            recommended: true
        },
        complete: {
            id: 'complete',
            name: 'Complete Version',
            description: '48 detailed questions | About 18-22 minutes',
            features: ['Includes advanced security assessment', 'Industry customization & compliance', 'Suitable for high compliance requirements'],
            questionCount: 48,
            recommended: false
        }
    },

    // All questions organized by section
    sections: [
        {
            id: 'section_1',
            title: 'Part 1: Basic Information',
            description: 'Company information and AI usage attitude',
            questions: [
                {
                    id: '1.1',
                    question: 'Company/Organization Name',
                    type: 'text',
                    required: true,
                    mode: ['standard', 'complete'],
                    placeholder: 'Example: Innovation Tech Company',
                    mappingTo: 'companyInfo.companyName'
                },
                {
                    id: '1.2',
                    question: 'Industry',
                    type: 'single',
                    required: true,
                    mode: ['standard', 'complete'],
                    options: [
                        { value: 'finance', label: 'Financial Services' },
                        { value: 'healthcare', label: 'Healthcare' },
                        { value: 'technology', label: 'Technology/IT' },
                        { value: 'manufacturing', label: 'Manufacturing' },
                        { value: 'retail', label: 'Retail/E-commerce' },
                        { value: 'education', label: 'Education/Training' },
                        { value: 'legal', label: 'Legal/Professional Services' },
                        { value: 'media', label: 'Media/Creative' },
                        { value: 'government', label: 'Government/Public Sector' },
                        { value: 'other', label: 'Other', allowCustom: true }
                    ],
                    mappingTo: 'companyInfo.industry'
                },
                {
                    id: '1.3',
                    question: 'Organization Size',
                    type: 'single',
                    required: true,
                    mode: ['standard', 'complete'],
                    options: [
                        { value: 'small', label: 'Small (<50 employees)' },
                        { value: 'medium', label: 'Medium (50-500 employees)' },
                        { value: 'large', label: 'Large (>500 employees)' }
                    ],
                    mappingTo: 'companyInfo.companySize'
                },
                {
                    id: '1.4',
                    question: 'Primary Operating Region (multiple choice)',
                    type: 'multiple',
                    required: true,
                    mode: ['complete'],
                    options: [
                        { value: 'asia_pacific', label: 'Asia Pacific' },
                        { value: 'europe', label: 'Europe' },
                        { value: 'north_america', label: 'North America' },
                        { value: 'other', label: 'Other Regions' }
                    ],
                    mappingTo: 'companyInfo.regions'
                },
                {
                    id: '1.5',
                    question: 'Policy Applies To (multiple choice)',
                    type: 'multiple',
                    required: true,
                    mode: ['complete'],
                    options: [
                        { value: 'all_employees', label: 'All Employees' },
                        { value: 'it_team', label: 'IT/Technical Team' },
                        { value: 'business_team', label: 'Business/Operations Team' },
                        { value: 'contractors', label: 'External Contractors/Vendors' }
                    ],
                    mappingTo: 'companyInfo.applicableTo'
                },
                {
                    id: '1.6',
                    question: 'Company\'s Overall Attitude Towards Gen AI',
                    type: 'single',
                    required: true,
                    mode: ['standard', 'complete'],
                    options: [
                        { value: 'encouraging', label: 'Actively Encouraging - Promote innovation with training support' },
                        { value: 'cautious', label: 'Cautiously Open - Allow use with clear boundaries' },
                        { value: 'restrictive', label: 'Strictly Limited - Only approved specific use cases' },
                        { value: 'prohibited', label: 'Prohibited - Not allowed at current stage' }
                    ],
                    mappingTo: 'companyInfo.aiAttitude'
                }
            ]
        },
        {
            id: 'section_2',
            title: 'Part 2: AI Tools and Use Cases',
            description: 'Approved tools and usage scenarios',
            questions: [
                {
                    id: '2.1',
                    question: 'Approved Gen AI Tools (multiple choice)',
                    type: 'multiple',
                    required: true,
                    mode: ['standard', 'complete'],
                    groups: [
                        {
                            label: 'Text Generation',
                            options: [
                                { value: 'chatgpt', label: 'ChatGPT' },
                                { value: 'claude', label: 'Claude' },
                                { value: 'gemini', label: 'Gemini' },
                                { value: 'text_other', label: 'Other', allowCustom: true }
                            ]
                        },
                        {
                            label: 'Code Assistant',
                            options: [
                                { value: 'github_copilot', label: 'GitHub Copilot' },
                                { value: 'codewhisperer', label: 'Amazon CodeWhisperer' },
                                { value: 'code_other', label: 'Other', allowCustom: true }
                            ]
                        },
                        {
                            label: 'Image/Video',
                            options: [
                                { value: 'midjourney', label: 'Midjourney' },
                                { value: 'dalle', label: 'DALL-E' },
                                { value: 'stable_diffusion', label: 'Stable Diffusion' },
                                { value: 'media_other', label: 'Other', allowCustom: true }
                            ]
                        },
                        {
                            label: 'Other',
                            options: [
                                { value: 'custom_ai', label: 'Self-developed AI System' },
                                { value: 'other', label: 'Other', allowCustom: true }
                            ]
                        }
                    ],
                    mappingTo: 'approvedTools'
                },
                {
                    id: '2.2',
                    question: 'How Do Employees Access AI Tools?',
                    type: 'single',
                    required: true,
                    mode: ['complete'],
                    options: [
                        { value: 'company_only', label: 'Company account/license only (Recommended)' },
                        { value: 'personal_allowed', label: 'Allow personal accounts (with restrictions)' },
                        { value: 'to_be_regulated', label: 'To be regulated' }
                    ],
                    mappingTo: 'accessControl'
                },
                {
                    id: '2.3',
                    question: 'Are There Clearly Prohibited AI Tools or Scenarios?',
                    type: 'single',
                    required: true,
                    mode: ['standard', 'complete'],
                    options: [
                        { value: 'yes', label: 'Yes, have clear prohibition list', conditional: '2.3.1' },
                        { value: 'no', label: 'No, no specific prohibitions' }
                    ],
                    mappingTo: 'hasProhibitions'
                },
                {
                    id: '2.3.1',
                    question: 'Prohibited Content Includes (multiple choice)',
                    type: 'multiple',
                    required: false,
                    mode: ['standard', 'complete'],
                    conditionalOn: { questionId: '2.3', value: 'yes' },
                    options: [
                        { value: 'unvetted_opensource', label: 'Unvetted open-source models' },
                        { value: 'no_privacy_policy', label: 'Free tools without privacy statement' },
                        { value: 'deepfake', label: 'Deepfake tools' },
                        { value: 'other', label: 'Other', allowCustom: true }
                    ],
                    mappingTo: 'prohibitedTools'
                },
                {
                    id: '2.4',
                    question: 'Main Gen AI Application Scenarios (multiple choice)',
                    type: 'multiple',
                    required: true,
                    mode: ['standard', 'complete'],
                    groups: [
                        {
                            label: 'Low Risk',
                            options: [
                                { value: 'internal_docs', label: 'Internal document drafting' },
                                { value: 'brainstorming', label: 'Brainstorming/Ideation' },
                                { value: 'translation', label: 'Translation/Localization' },
                                { value: 'data_analysis', label: 'Data analysis assistance' }
                            ]
                        },
                        {
                            label: 'Medium Risk',
                            options: [
                                { value: 'marketing', label: 'External marketing content' },
                                { value: 'customer_service', label: 'Customer service (with human oversight)' },
                                { value: 'code_gen', label: 'Code generation' }
                            ]
                        },
                        {
                            label: 'High Risk ⚠️',
                            options: [
                                { value: 'decision_making', label: 'Decisions affecting individual rights' },
                                { value: 'legal_medical', label: 'Legal/Medical advice' },
                                { value: 'full_auto_service', label: 'Fully automated customer service' }
                            ]
                        }
                    ],
                    mappingTo: 'useCases'
                },
                {
                    id: '2.5',
                    question: 'Are There Specific AI Use Cases That Need Special Explanation?',
                    type: 'text',
                    required: false,
                    mode: ['complete'],
                    placeholder: 'E.g.: Customer service chatbot, contract review, medical imaging analysis, etc.',
                    mappingTo: 'specialUseCases'
                }
            ]
        },
        {
            id: 'section_3',
            title: 'Part 3: Usage Guidelines',
            description: 'Core usage requirements and standards',
            questions: [
                {
                    id: '3.1',
                    question: 'Is Human Review Required for AI-Generated Content?',
                    type: 'single',
                    required: true,
                    mode: ['standard', 'complete'],
                    options: [
                        { value: 'all', label: 'Yes, all outputs need review' },
                        { value: 'external', label: 'Yes, external-facing outputs need review' },
                        { value: 'high_risk', label: 'Yes, high-risk scenarios need review' },
                        { value: 'no', label: 'No, not mandatory' }
                    ],
                    mappingTo: 'humanReview'
                },
                {
                    id: '3.2',
                    question: 'How to Address AI "Hallucinations" (False Information) Risk? (multiple choice)',
                    type: 'multiple',
                    required: true,
                    mode: ['standard', 'complete'],
                    options: [
                        { value: 'verify_all', label: 'Require employees to verify all AI outputs' },
                        { value: 'inform_risk', label: 'Inform employees AI may generate false information' },
                        { value: 'no_critical_decisions', label: 'Prohibit complete reliance on AI in critical decisions' },
                        { value: 'use_rag', label: 'Use RAG and other technologies to reduce hallucinations' },
                        { value: 'other', label: 'Other', allowCustom: true }
                    ],
                    mappingTo: 'hallucinationPrevention'
                },
                {
                    id: '3.3',
                    question: 'Do Employees Need to Inform Supervisors When Using AI?',
                    type: 'single',
                    required: true,
                    mode: ['complete'],
                    options: [
                        { value: 'always', label: 'Yes, inform every time' },
                        { value: 'important_work', label: 'Yes, inform for important work' },
                        { value: 'no', label: 'No, not required' }
                    ],
                    mappingTo: 'supervisorNotification'
                },
                {
                    id: '3.4',
                    question: 'Is It Prohibited to Label AI-Generated Content as Personal Original Work?',
                    type: 'single',
                    required: true,
                    mode: ['standard', 'complete'],
                    options: [
                        { value: 'strictly_prohibited', label: 'Yes, strictly prohibited' },
                        { value: 'case_by_case', label: 'Depends on situation' },
                        { value: 'no', label: 'No' }
                    ],
                    mappingTo: 'originalityPolicy'
                },
                {
                    id: '3.5',
                    question: 'Is It Required to Check AI Output for Bias and Fairness?',
                    type: 'single',
                    required: true,
                    mode: ['complete'],
                    options: [
                        { value: 'must_check', label: 'Yes, must check' },
                        { value: 'high_risk_only', label: 'High-risk scenarios need checking' },
                        { value: 'no', label: 'No' }
                    ],
                    mappingTo: 'biasChecking'
                },
                {
                    id: '3.6',
                    question: 'Is AI Allowed to Assist in HR Decisions (Hiring/Performance, etc.)?',
                    type: 'single',
                    required: true,
                    mode: ['complete'],
                    options: [
                        { value: 'strictly_prohibited', label: 'Strictly prohibited' },
                        { value: 'assist_only', label: 'Allow assistance but human makes final decision' },
                        { value: 'allowed', label: 'Allowed' }
                    ],
                    mappingTo: 'hrDecisions'
                }
            ]
        },
        {
            id: 'section_4',
            title: 'Part 4: Output Management',
            description: 'AI output review and disclosure requirements',
            questions: [
                {
                    id: '4.1',
                    question: 'Does AI Need to Disclose When Directly Facing Customers/Public?',
                    type: 'single',
                    required: true,
                    mode: ['standard', 'complete'],
                    options: [
                        { value: 'must_disclose', label: 'Yes, must disclose "Generated by AI"' },
                        { value: 'partial', label: 'Some scenarios require it' },
                        { value: 'no', label: 'No' }
                    ],
                    mappingTo: 'publicDisclosure'
                },
                {
                    id: '4.2',
                    question: 'What Checks Are Needed When Using AI to Generate Images/Videos? (multiple choice)',
                    type: 'multiple',
                    required: true,
                    mode: ['complete'],
                    options: [
                        { value: 'check_watermark', label: 'Check for third-party watermarks/trademarks' },
                        { value: 'portrait_authorization', label: 'Using real person likenesses requires authorization' },
                        { value: 'not_applicable', label: 'Not applicable (don\'t generate images/videos)' }
                    ],
                    mappingTo: 'mediaGeneration'
                },
                {
                    id: '4.3',
                    question: 'Does AI-Generated Code Need Additional Review?',
                    type: 'single',
                    required: true,
                    mode: ['complete'],
                    options: [
                        { value: 'yes', label: 'Yes, needs security/quality review' },
                        { value: 'no', label: 'No' },
                        { value: 'not_applicable', label: 'Not applicable (don\'t generate code)' }
                    ],
                    mappingTo: 'codeReview'
                },
                {
                    id: '4.4',
                    question: 'How to Handle Possible Copyright Issues in AI Output? (multiple choice)',
                    type: 'multiple',
                    required: true,
                    mode: ['standard', 'complete'],
                    options: [
                        { value: 'employee_check', label: 'Require employees to check for infringement' },
                        { value: 'tool_guarantee', label: 'Use AI tools with copyright protection guarantees' },
                        { value: 'record_works', label: 'Record important AI-assisted works' },
                        { value: 'other', label: 'Other', allowCustom: true }
                    ],
                    mappingTo: 'copyrightProtection'
                }
            ]
        },
        {
            id: 'section_5',
            title: 'Part 5: Data Protection',
            description: 'Data security and privacy compliance',
            questions: [
                {
                    id: '5.1',
                    question: 'Clearly Prohibited Data Types for AI Input (multiple choice)',
                    type: 'multiple',
                    required: true,
                    mode: ['standard', 'complete'],
                    groups: [
                        {
                            label: 'Sensitive Personal Information',
                            options: [
                                { value: 'id_passport', label: 'ID/Passport numbers' },
                                { value: 'financial', label: 'Credit card/Bank account' },
                                { value: 'medical', label: 'Medical/Health records' },
                                { value: 'other_personal', label: 'Other sensitive personal data' }
                            ]
                        },
                        {
                            label: 'Business Confidential',
                            options: [
                                { value: 'unpublished_financial', label: 'Unpublished financial reports/performance' },
                                { value: 'trade_secrets', label: 'Trade secrets/Proprietary technology' },
                                { value: 'customer_privacy', label: 'Customer privacy data' }
                            ]
                        },
                        {
                            label: 'System Security',
                            options: [
                                { value: 'passwords', label: 'Passwords/Access credentials' },
                                { value: 'api_keys', label: 'API keys/Tokens' }
                            ]
                        }
                    ],
                    mappingTo: 'prohibitedData'
                },
                {
                    id: '5.2',
                    question: 'Is It Required to Input Only Necessary Minimum Data?',
                    type: 'single',
                    required: true,
                    mode: ['standard', 'complete'],
                    options: [
                        { value: 'mandatory', label: 'Yes, mandatory requirement' },
                        { value: 'recommended', label: 'Recommended but not mandatory' },
                        { value: 'no', label: 'No' }
                    ],
                    mappingTo: 'dataMinimization'
                },
                {
                    id: '5.3',
                    question: 'Is Data Desensitization/Anonymization Required Before AI Input?',
                    type: 'single',
                    required: true,
                    mode: ['complete'],
                    options: [
                        { value: 'mandatory', label: 'Yes, mandatory requirement' },
                        { value: 'case_by_case', label: 'Depends on data sensitivity' },
                        { value: 'no', label: 'No' }
                    ],
                    mappingTo: 'dataAnonymization'
                },
                {
                    id: '5.4',
                    question: 'Can AI Vendors Use Your Input Data to Train Their Models?',
                    type: 'single',
                    required: true,
                    mode: ['complete'],
                    options: [
                        { value: 'absolutely_not', label: 'Absolutely not' },
                        { value: 'anonymized_ok', label: 'Yes, but must be anonymized' },
                        { value: 'unrestricted', label: 'No restrictions' }
                    ],
                    mappingTo: 'vendorDataUsage'
                },
                {
                    id: '5.5',
                    question: 'Does It Involve Personal Data Protected by Privacy Regulations?',
                    type: 'single',
                    required: true,
                    mode: ['standard', 'complete'],
                    options: [
                        { value: 'yes', label: 'Yes → Trigger privacy compliance sub-questions', conditional: '5.5.1' },
                        { value: 'no', label: 'No' }
                    ],
                    mappingTo: 'hasPersonalData'
                },
                {
                    id: '5.5.1',
                    question: 'Applicable Privacy Regulations (multiple choice)',
                    type: 'multiple',
                    required: false,
                    mode: ['standard', 'complete'],
                    conditionalOn: { questionId: '5.5', value: 'yes' },
                    options: [
                        { value: 'gdpr', label: 'GDPR (EU)' },
                        { value: 'pdpa', label: 'PDPA (Singapore) - Will add detailed requirements if selected' },
                        { value: 'ccpa', label: 'CCPA (California, USA)' },
                        { value: 'other', label: 'Other personal information protection laws' },
                        { value: 'unsure', label: 'Not sure' }
                    ],
                    mappingTo: 'privacyRegulations'
                }
            ]
        },
        {
            id: 'section_6',
            title: 'Part 6: Accountability and Transparency',
            description: 'Responsibility assignment and disclosure requirements',
            questions: [
                {
                    id: '6.1',
                    question: 'Who Bears Ultimate Responsibility for AI-Generated Content?',
                    type: 'single',
                    required: true,
                    mode: ['standard', 'complete'],
                    options: [
                        { value: 'employee', label: 'Employee using the AI tool' },
                        { value: 'supervisor', label: 'Employee\'s direct supervisor' },
                        { value: 'ai_officer', label: 'AI project manager' },
                        { value: 'shared', label: 'Shared responsibility' }
                    ],
                    mappingTo: 'ultimateResponsibility'
                },
                {
                    id: '6.2',
                    question: 'Is A Dedicated Person Appointed for AI Governance?',
                    type: 'single',
                    required: true,
                    mode: ['standard', 'complete'],
                    options: [
                        { value: 'yes', label: 'Yes (e.g.: AI Officer / DPO / CISO)', conditional: '6.2.1' },
                        { value: 'planned', label: 'Plan to appoint' },
                        { value: 'no', label: 'No (Management collectively responsible)' }
                    ],
                    mappingTo: 'hasAIofficer'
                },
                {
                    id: '6.2.1',
                    question: 'Role Title',
                    type: 'single',
                    required: false,
                    mode: ['standard', 'complete'],
                    conditionalOn: { questionId: '6.2', value: 'yes' },
                    options: [
                        { value: 'ai_officer', label: 'AI Officer' },
                        { value: 'dpo', label: 'Data Protection Officer (DPO)' },
                        { value: 'ciso', label: 'Chief Information Security Officer (CISO)' },
                        { value: 'cto', label: 'CTO/Technical Director' },
                        { value: 'other', label: 'Other', allowCustom: true }
                    ],
                    mappingTo: 'aiOfficerRole'
                },
                {
                    id: '6.3',
                    question: 'When Must AI Usage Be Disclosed? (multiple choice)',
                    type: 'multiple',
                    required: true,
                    mode: ['complete'],
                    options: [
                        { value: 'all_external', label: 'All external content' },
                        { value: 'customer_service', label: 'Customer service interactions' },
                        { value: 'individual_rights', label: 'Decisions affecting individual rights' },
                        { value: 'legal_compliance', label: 'Scenarios required by law/compliance' },
                        { value: 'not_required', label: 'Not mandatory' }
                    ],
                    mappingTo: 'disclosureRequirements'
                },
                {
                    id: '6.4',
                    question: 'Is It Required to Record AI Usage for Auditing?',
                    type: 'single',
                    required: true,
                    mode: ['complete'],
                    options: [
                        { value: 'detailed', label: 'Yes, detailed records' },
                        { value: 'important_only', label: 'Yes, important use cases only' },
                        { value: 'no', label: 'No' }
                    ],
                    mappingTo: 'auditRecords'
                }
            ]
        },
        {
            id: 'section_7',
            title: 'Part 7: Governance Structure',
            description: 'Organizational structure and training',
            questions: [
                {
                    id: '7.1',
                    question: 'Is An AI Governance Committee or Working Group Established?',
                    type: 'single',
                    required: true,
                    mode: ['standard', 'complete'],
                    options: [
                        { value: 'yes', label: 'Yes', conditional: '7.1.1' },
                        { value: 'planned', label: 'Plan to establish' },
                        { value: 'no', label: 'No (Smaller scale, management directly responsible)' }
                    ],
                    mappingTo: 'hasGovernanceBoard'
                },
                {
                    id: '7.1.1',
                    question: 'Committee Composition (multiple choice)',
                    type: 'multiple',
                    required: false,
                    mode: ['standard', 'complete'],
                    conditionalOn: { questionId: '7.1', value: 'yes' },
                    options: [
                        { value: 'it', label: 'IT/Technical representative' },
                        { value: 'legal', label: 'Legal/Compliance representative' },
                        { value: 'business', label: 'Business department representative' },
                        { value: 'hr', label: 'HR representative' },
                        { value: 'external', label: 'External consultant' }
                    ],
                    mappingTo: 'boardComposition'
                },
                {
                    id: '7.2',
                    question: 'Do New AI Use Cases Require Approval?',
                    type: 'single',
                    required: true,
                    mode: ['complete'],
                    options: [
                        { value: 'all', label: 'Yes, all use cases need approval' },
                        { value: 'high_risk_only', label: 'Yes, high-risk use cases need approval' },
                        { value: 'no', label: 'No, employees decide independently' }
                    ],
                    mappingTo: 'useCaseApproval'
                },
                {
                    id: '7.3',
                    question: 'Is AI Usage Training Provided?',
                    type: 'single',
                    required: true,
                    mode: ['standard', 'complete'],
                    options: [
                        { value: 'mandatory', label: 'Yes, mandatory training', conditional: '7.3.1' },
                        { value: 'optional', label: 'Yes, optional training', conditional: '7.3.1' },
                        { value: 'planned', label: 'Plan to provide' },
                        { value: 'no', label: 'No' }
                    ],
                    mappingTo: 'hasTraining'
                },
                {
                    id: '7.3.1',
                    question: 'Training Content (multiple choice)',
                    type: 'multiple',
                    required: false,
                    mode: ['standard', 'complete'],
                    conditionalOn: { questionId: '7.3', value: ['mandatory', 'optional'] },
                    options: [
                        { value: 'basics', label: 'AI fundamentals' },
                        { value: 'policy', label: 'Company policy interpretation' },
                        { value: 'safety', label: 'Safe usage guidelines' },
                        { value: 'risk', label: 'Risk identification' },
                        { value: 'cases', label: 'Case analysis' }
                    ],
                    mappingTo: 'trainingContent'
                },
                {
                    id: '7.4',
                    question: 'Policy Review and Update Frequency',
                    type: 'single',
                    required: true,
                    mode: ['standard', 'complete'],
                    options: [
                        { value: 'quarterly', label: 'Quarterly' },
                        { value: 'semi_annual', label: 'Semi-annually' },
                        { value: 'annual', label: 'Annually' },
                        { value: 'as_needed', label: 'When major changes occur' }
                    ],
                    mappingTo: 'reviewFrequency'
                },
                {
                    id: '7.5',
                    question: 'Is An AI Tool/System Registry Maintained?',
                    type: 'single',
                    required: true,
                    mode: ['complete'],
                    options: [
                        { value: 'yes', label: 'Yes' },
                        { value: 'planned', label: 'Plan to establish' },
                        { value: 'no', label: 'No' }
                    ],
                    mappingTo: 'hasRegistry'
                }
            ]
        },
        {
            id: 'section_8',
            title: 'Part 8: Compliance and Enforcement',
            description: 'Violation consequences and reporting mechanisms',
            questions: [
                {
                    id: '8.1',
                    question: 'Consequences of Violating AI Policy (multiple choice by severity)',
                    type: 'multiple',
                    required: true,
                    mode: ['standard', 'complete'],
                    options: [
                        { value: 'verbal_warning', label: 'Verbal warning' },
                        { value: 'written_warning', label: 'Written warning with required correction' },
                        { value: 'access_suspension', label: 'Suspend AI tool access' },
                        { value: 'disciplinary', label: 'Disciplinary action (warning/demotion)' },
                        { value: 'termination', label: 'Termination' },
                        { value: 'legal', label: 'Legal action' }
                    ],
                    mappingTo: 'violationConsequences'
                },
                {
                    id: '8.2',
                    question: 'Who Is Responsible for Investigating and Handling Violations?',
                    type: 'single',
                    required: true,
                    mode: ['standard', 'complete'],
                    options: [
                        { value: 'hr', label: 'HR Department' },
                        { value: 'legal', label: 'Legal/Compliance Department' },
                        { value: 'it', label: 'IT/Information Security Department' },
                        { value: 'governance_board', label: 'AI Governance Committee' },
                        { value: 'other', label: 'Other', allowCustom: true }
                    ],
                    mappingTo: 'violationHandler'
                },
                {
                    id: '8.3',
                    question: 'How Can Employees Report Suspected AI Misuse?',
                    type: 'single',
                    required: true,
                    mode: ['complete'],
                    options: [
                        { value: 'dedicated_channel', label: 'Through dedicated reporting channel' },
                        { value: 'supervisor_hr', label: 'Report to supervisor/HR' },
                        { value: 'to_be_established', label: 'To be established' },
                        { value: 'no_mechanism', label: 'No dedicated mechanism' }
                    ],
                    mappingTo: 'reportingMechanism'
                },
                {
                    id: '8.4',
                    question: 'Are There Specific Industry Regulatory Requirements to Comply With?',
                    type: 'single',
                    required: true,
                    mode: ['complete'],
                    options: [
                        { value: 'yes', label: 'Yes → Trigger Part 10 industry questions' },
                        { value: 'no', label: 'No' }
                    ],
                    mappingTo: 'hasIndustryRegulation'
                }
            ]
        },
        {
            id: 'section_9',
            title: 'Part 9: Security and Risk (Optional)',
            description: 'Advanced security measures and risk assessment',
            questions: [
                {
                    id: '9.1',
                    question: 'Are Technical Measures Taken to Prevent AI Security Risks? (multiple choice)',
                    type: 'multiple',
                    required: false,
                    mode: ['complete'],
                    options: [
                        { value: 'input_filtering', label: 'Input filtering (prevent prompt injection)' },
                        { value: 'output_review', label: 'Output review/filtering' },
                        { value: 'access_control', label: 'Access control' },
                        { value: 'encryption', label: 'Encrypted transmission' },
                        { value: 'none', label: 'None currently' }
                    ],
                    mappingTo: 'securityMeasures'
                },
                {
                    id: '9.2',
                    question: 'Is An AI-Related Incident Reporting Mechanism Established?',
                    type: 'single',
                    required: false,
                    mode: ['complete'],
                    options: [
                        { value: 'yes', label: 'Yes, have formal process', conditional: '9.2.1' },
                        { value: 'planned', label: 'Plan to establish' },
                        { value: 'no', label: 'No' }
                    ],
                    mappingTo: 'hasIncidentReporting'
                },
                {
                    id: '9.2.1',
                    question: 'Reportable Incident Types (multiple choice)',
                    type: 'multiple',
                    required: false,
                    mode: ['complete'],
                    conditionalOn: { questionId: '9.2', value: 'yes' },
                    options: [
                        { value: 'data_breach', label: 'Data breach' },
                        { value: 'harmful_content', label: 'Generation of harmful content' },
                        { value: 'malicious_use', label: 'Malicious exploitation of system' },
                        { value: 'critical_errors', label: 'Major decision errors' }
                    ],
                    mappingTo: 'incidentTypes'
                },
                {
                    id: '9.3',
                    question: 'Is Third-Party Testing/Auditing Considered?',
                    type: 'single',
                    required: false,
                    mode: ['complete'],
                    options: [
                        { value: 'regular', label: 'Yes, conduct regularly' },
                        { value: 'considering', label: 'Considering' },
                        { value: 'no', label: 'No' }
                    ],
                    mappingTo: 'thirdPartyAudit'
                },
                {
                    id: '9.4',
                    question: 'Is Risk Assessment Conducted Before New AI Use Cases Go Live?',
                    type: 'single',
                    required: false,
                    mode: ['complete'],
                    options: [
                        { value: 'mandatory', label: 'Yes, mandatory requirement' },
                        { value: 'high_risk_only', label: 'High-risk use cases only' },
                        { value: 'no', label: 'No' }
                    ],
                    mappingTo: 'riskAssessment'
                }
            ]
        },
        {
            id: 'section_10',
            title: 'Part 10: Industry and Customization (Optional)',
            description: 'Industry-specific questions and customization',
            questions: [
                {
                    id: '10.1',
                    question: 'Industry-Specific Question A',
                    type: 'text',
                    required: false,
                    mode: ['complete'],
                    conditionalOn: { questionId: '1.2', value: ['finance', 'healthcare', 'legal'] },
                    placeholder: 'Specific industry-related questions',
                    mappingTo: 'industryQuestionA'
                },
                {
                    id: '10.2',
                    question: 'Do You Have Additional Customization Needs?',
                    type: 'text',
                    required: false,
                    mode: ['complete'],
                    placeholder: 'Any special requirements or emphasis areas for the policy',
                    mappingTo: 'customRequirements'
                }
            ]
        }
    ]
}

// Export the data object
export const policyQuestions = questionsData

// Get questions for specific mode
export function getQuestionsForMode(mode) {
    const allQuestions = []

    questionsData.sections.forEach(section => {
        if (!section.questions) return

        const sectionQuestions = section.questions.filter(q =>
            q.mode && Array.isArray(q.mode) && q.mode.includes(mode)
        )
        if (sectionQuestions.length > 0) {
            allQuestions.push({
                ...section,
                questions: sectionQuestions
            })
        }
    })

    return allQuestions
}

// Get total question count for mode
export function getQuestionCount(mode) {
    let count = 0
    questionsData.sections.forEach(section => {
        count += section.questions.filter(q => q.mode.includes(mode)).length
    })
    return count
}
