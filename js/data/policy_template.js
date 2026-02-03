// AI Policy Template - Complete Commercial Template v3.1
// Enhanced for professional output with Tone Engine support
// Removes all Agentic AI references, focuses on Generative AI

export const policyTemplate = {
    metadata: {
        version: "3.1",
        source: "AI_Policy_Template_v3.1",
        mustPreserveAll: true,
        minimumPages: 10
    },

    disclaimer: {
        title: "Important Notice",
        content: [
            "This AI Policy was generated using AI-assisted tools based on:",
            "• Singapore Model AI Governance Framework for Generative AI (2024)",
            "• Singapore Personal Data Protection Act (PDPA)",
            "• Industry best practices and your organization's input",
            "",
            "This document is for reference only and does not constitute legal advice.",
            "Please have your Legal/Compliance team review before formal adoption.",
            "",
            "Generated: [AUTO-FILLED]"
        ]
    },

    sections: [
        {
            id: "section_1",
            number: "1",
            title: "Purpose and Applicability",
            mustPreserve: true,
            // Content will be replaced by Tone Engine based on AI attitude
            toneVariants: {
                encouraging: [
                    "[Company] embraces Generative AI as a powerful tool for enhancing productivity, creativity, and innovation across all business functions.",
                    "We encourage employees to explore and leverage AI capabilities to optimize workflows, accelerate decision-making, and deliver exceptional value to our stakeholders.",
                    "This policy provides a framework for responsible AI adoption while fostering an innovation-first culture.",
                    "This policy applies to all employees, contractors, and third-party users with access to Company AI tools and systems."
                ],
                cautious: [
                    "[Company] recognizes the potential benefits of Generative AI while maintaining appropriate safeguards to protect our business, employees, and clients.",
                    "Employees may use approved AI tools within clearly defined boundaries, following the guidelines outlined in this policy.",
                    "This policy aims to balance innovation with risk management, ensuring AI is used responsibly and ethically.",
                    "This policy applies to all employees, contractors, and third-party users with access to Company AI tools and systems."
                ],
                restrictive: [
                    "[Company] permits limited use of Generative AI tools only for specifically approved business purposes and under strict oversight.",
                    "All AI usage MUST comply with this policy. Unauthorized use of AI tools is strictly prohibited and may result in disciplinary action.",
                    "This policy establishes mandatory controls to ensure AI is used safely, ethically, and in compliance with all applicable laws.",
                    "This policy applies to all employees, contractors, and third-party users with access to Company AI tools and systems."
                ],
                prohibited: [
                    "[Company] does not currently permit the general use of Generative AI tools in business operations due to identified risks.",
                    "Exceptions may be granted on a case-by-case basis following the formal approval process outlined in this policy.",
                    "This policy explains the rationale for these restrictions and the process for requesting exceptions.",
                    "This policy applies to all employees, contractors, and third-party users."
                ]
            },
            content: [
                "This AI Use Policy outlines principles and guardrails for responsible use of Artificial Intelligence tools at the Company, particularly Generative AI.",
                "The purpose of this policy is to ensure ethical, transparent, and compliant use of AI technologies while mitigating associated risks.",
                "This policy applies to all employees, contractors, and third-party users with access to Company AI tools and systems."
            ]
        },

        {
            id: "section_2",
            number: "2",
            title: "Scope",
            mustPreserve: true,
            content: [
                "This policy covers all AI tools used within [Company], including but not limited to Generative AI (GenAI), machine learning models, and predictive analytics platforms.",
                "It encompasses the collection, processing, and utilization of data through AI systems.",
                "Specific areas covered include:",
                "• Text generation and summarization tools (e.g., ChatGPT, Claude, Gemini)",
                "• Code generation and assistance tools (e.g., GitHub Copilot, Cursor)",
                "• Image and media generation tools (e.g., DALL-E, Midjourney)",
                "• Data analysis and business intelligence AI features",
                "• AI-powered customer service and communication tools"
            ]
        },

        {
            id: "section_3",
            number: "3",
            title: "Approved AI Tools",
            mustPreserve: true,
            // This section will be populated with approved tools from questionnaire
            content: [
                "Employees may only use AI tools that have been approved by the IT department and meet [Company] security standards.",
                "",
                "**Currently Approved Tools:**",
                "[APPROVED_TOOLS_LIST]",
                "",
                "**Approval Requirements:**",
                "• Tools must be accessed through company-provided accounts only (personal accounts are prohibited)",
                "• Enterprise versions with data protection features are required where available",
                "• All tools must pass IT security assessment before approval",
                "",
                "**Requesting New Tool Approval:**",
                "To request approval for a new AI tool, submit a request to the [AI Officer / DPO] with:",
                "• Business justification and intended use cases",
                "• Data types that will be processed",
                "• Vendor security documentation"
            ]
        },

        {
            id: "section_4",
            number: "4",
            title: "Prohibited AI Tools and Uses",
            mustPreserve: true,
            content: [
                "The following AI tools and uses are strictly prohibited:",
                "",
                "**Prohibited Tools:**",
                "• Any AI tool not on the approved list",
                "• Free/consumer versions of AI tools that lack enterprise data protections",
                "• AI tools that store or train on user data without explicit opt-out options",
                "• Open-source AI models running on unauthorized infrastructure",
                "",
                "**Prohibited Uses:**",
                "• Processing personal data without proper consent or legal basis",
                "• Making automated decisions that significantly affect individuals without human review",
                "• Generating content that infringes intellectual property rights",
                "• Creating deepfakes or synthetic media of real individuals without consent",
                "• Using AI for surveillance or employee monitoring without disclosure",
                "• Uploading confidential business information to non-approved AI tools"
            ]
        },

        {
            id: "section_5",
            number: "5",
            title: "Guidelines and Guardrails",
            mustPreserve: true,
            content: ""
        },

        {
            id: "section_5a",
            number: "5a",
            title: "Usage Guidelines",
            mustPreserve: true,
            toneVariants: {
                encouraging: [
                    "**Embrace AI as Your Productivity Partner:** Explore how AI can enhance your work. Experiment with different prompts and approaches to find what works best for your tasks.",
                    "**Verify and Enhance AI Outputs:** Use AI-generated content as a starting point. Apply your expertise to refine, validate, and improve upon AI suggestions.",
                    "**Be Aware of AI Limitations:** AI tools can produce impressive results but may occasionally generate inaccurate information. Your professional judgment remains essential.",
                    "**Share AI-Assisted Work Transparently:** Keep your supervisor informed when AI has contributed significantly to deliverables, allowing for appropriate review.",
                    "**Contribute to Collective Learning:** Document effective prompts and use cases. Share successful approaches with colleagues to build organizational AI capability.",
                    "**Maintain Quality Standards:** Ensure all AI-assisted outputs meet [Company]'s quality and ethical standards before use or distribution."
                ],
                cautious: [
                    "**Human Review Required:** All AI-generated content must be reviewed by a qualified human before use in any business context.",
                    "**Understand AI Limitations:** Be aware that GenAI tools may produce 'hallucinations' — plausible-sounding but incorrect information. Verify all facts independently.",
                    "**Data Sensitivity:** Treat every piece of information you input to an AI tool as potentially public. Do not share confidential information.",
                    "**Supervisor Notification:** Inform your supervisor when you use AI tools to assist with significant work deliverables.",
                    "**Quality Assurance:** Verify that AI outputs are accurate, appropriate, unbiased, and compliant with all applicable laws and policies.",
                    "**Intellectual Property Check:** Ensure AI-generated content does not infringe on third-party intellectual property rights."
                ],
                restrictive: [
                    "**MANDATORY Human Review:** All AI-generated content MUST be reviewed and approved by a qualified supervisor before any use.",
                    "**CRITICAL WARNING - Hallucination Risk:** GenAI tools frequently produce false, misleading, or fabricated information. Direct use of unverified AI outputs is STRICTLY PROHIBITED.",
                    "**Data Prohibition:** Do NOT input any confidential, proprietary, or personal data into AI tools under any circumstances.",
                    "**REQUIRED Supervisor Approval:** You MUST obtain supervisor approval BEFORE using any AI tool for work purposes.",
                    "**Documentation Requirement:** Maintain records of all AI tool usage, including prompts used and outputs generated.",
                    "**Legal Compliance:** Ensure strict compliance with all applicable laws, regulations, and internal policies."
                ],
                prohibited: [
                    "**General AI Use is Not Permitted:** AI tools may not be used for work purposes without explicit written authorization.",
                    "**Exception Request Process:** Submit requests for AI use exceptions to the [AI Officer / DPO] with detailed justification.",
                    "**Conditional Guidelines:** In the event of approved exceptions, all usage must follow the strict controls outlined in this policy.",
                    "**Full Documentation Required:** Any authorized AI use must be fully documented and auditable.",
                    "**Immediate Reporting:** Report any unauthorized AI use or suspected policy violations immediately.",
                    "**Regular Review:** Approved exceptions will be reviewed quarterly for continued necessity and compliance."
                ]
            },
            content: [
                "AI-generated content should be reviewed by a human to ensure it's appropriate for its intended purpose.",
                "Understand that GenAI tools may be useful but are not a substitute for human judgment and creativity.",
                "Understand that many GenAI tools are prone to \"hallucinations,\" false answers or information, or information that is subtly wrong.",
                "Treat every bit of information you provide to a GenAI tool as if it will go viral on the Internet, attributed to you or the Company.",
                "Inform your supervisor when you have used a GenAI tool to help perform a task.",
                "Verify that any response from a GenAI tool that you intend to rely on or use is accurate, appropriate, not biased, and consistent with Company policies and applicable laws."
            ],
            supplementPosition: "after"
        },

        {
            id: "section_5b",
            number: "5b",
            title: "Data Guardrails",
            mustPreserve: true,
            content: [
                {
                    title: "Data Minimization Principle",
                    text: "Only input data that is strictly necessary for your intended purpose. Obtain approval from your legal business partner before processing sensitive data."
                },
                {
                    title: "Sensitive Personal Data Prohibition",
                    text: "Do NOT input sensitive personal data including: NRIC/passport numbers, financial information (credit cards, bank accounts), personal addresses, health information, biometric data."
                },
                {
                    title: "Restricted Business Data Prohibition",
                    text: "Do NOT input restricted business data including: material non-public information, financial reports before disclosure, trade secrets, security credentials, internal controls documentation."
                },
                {
                    title: "System Credentials Protection",
                    text: "Never input system access credentials, API keys, passwords, or authentication tokens into any AI tool."
                },
                {
                    title: "Employment Decision Prohibition",
                    text: "Do NOT use AI tools to make or influence employment decisions (hiring, promotions, performance reviews, terminations) without explicit legal and HR approval."
                },
                {
                    title: "Confidential Information Protection",
                    text: "Do NOT upload documents marked Confidential, Sensitive, or Proprietary. This includes client information, strategic plans, and unreleased product information."
                },
                {
                    title: "Original Work Attribution",
                    text: "Do not represent work substantially generated by AI as your own original work. Disclose significant AI contributions appropriately."
                },
                {
                    title: "System Integration Controls",
                    text: "Do NOT integrate AI tools with internal systems, APIs, or databases without written IT department approval."
                },
                {
                    title: "Approved Tools Only",
                    text: "Use only AI tools from the approved list. Unapproved tools may have inadequate security or may be designed to harvest data."
                }
            ],
            pdpaSupplementPosition: "after",
            minimumItems: 9
        },

        {
            id: "section_6",
            number: "6",
            title: "AI-Generated Output Guardrails",
            mustPreserve: true,
            content: {
                aiOnlyResponses: {
                    title: "Customer-Facing AI Responses",
                    text: "When AI directly interfaces with customers or third parties without human review, you MUST disclose:",
                    requirements: [
                        "That they are interacting with an AI system",
                        "That they remain responsible for verifying accuracy",
                        "How to escalate to a human representative if needed"
                    ],
                    example: '"This response was generated by AI and has not been reviewed by a human. Please verify accuracy and contact us directly for critical matters."'
                },
                generatingMedia: {
                    title: "AI-Generated Images, Voice, and Video",
                    text: "When using AI to generate visual or audio content:",
                    guidelines: [
                        "Check output for third-party trademarks, watermarks, or copyrighted elements",
                        "Obtain written consent before creating synthetic representations of real individuals",
                        "Label AI-generated media appropriately when shared externally",
                        "Maintain records of AI tools and prompts used for generated media"
                    ]
                },
                generatingCode: {
                    title: "AI-Generated Code",
                    text: "AI-generated code requires additional security and legal review:",
                    guidelines: [
                        "Review for security vulnerabilities before deployment",
                        "Check for open-source license compliance",
                        "Test thoroughly before production use",
                        "Document AI assistance in code comments for audit trails"
                    ]
                }
            }
        },

        {
            id: "section_7",
            number: "7",
            title: "Transparency, Explainability, and Accountability",
            mustPreserve: true,
            content: [
                "**Transparency Requirement:** Employees must be transparent about AI use in their work, ensuring stakeholders are aware when AI has contributed to outputs or decisions.",
                "**Centralized Governance:** Use the Company's designated AI governance system to register and track AI initiatives and ensure compliance visibility.",
                "**Accountability:** Employees remain personally accountable for outcomes generated with AI assistance. AI does not transfer or reduce individual responsibility.",
                "**Reporting Obligation:** Report any concerns, potential violations, or AI-related incidents to the [AI Officer / DPO] at [CONTACT_EMAIL].",
                "**Investigation Process:** The Company will investigate reported issues promptly and confidentially.",
                "**Explainability:** When AI influences decisions affecting individuals, be prepared to explain the role AI played and the reasoning involved.",
                "**Stakeholder Communication:** Ensure non-technical stakeholders can understand AI involvement and its implications."
            ],
            sgFrameworkSupplementPosition: "after"
        },

        {
            id: "section_8",
            number: "8",
            title: "Implementation and Monitoring",
            mustPreserve: true,
            subsections: [
                {
                    id: "section_8a",
                    number: "8a",
                    title: "AI Governance Board",
                    content: "A multidisciplinary AI Governance Board comprised of representatives from Legal, Compliance, IT Security, Data Protection, and relevant business units will oversee [Company]'s AI initiatives. The Board is responsible for: approving new AI tools, reviewing high-risk AI use cases, updating this policy, and ensuring alignment with regulatory requirements."
                },
                {
                    id: "section_8b",
                    number: "8b",
                    title: "Designated [AI Officer / DPO]",
                    content: "The designated [AI Officer / DPO] is responsible for: overseeing day-to-day implementation of this policy, providing guidance and training to employees, handling AI-related inquiries and exception requests, ensuring compliance with relevant laws including the PDPA, and coordinating with the AI Governance Board. Contact: [OFFICER_NAME] at [OFFICER_EMAIL]."
                },
                {
                    id: "section_8c",
                    number: "8c",
                    title: "Periodic Reviews and Audits",
                    content: "The [AI Officer / DPO] will conduct reviews of AI tool usage at least quarterly to ensure policy adherence, identify emerging risks, assess new regulatory requirements, and recommend policy updates. Annual audits may be conducted with external support to validate compliance."
                }
            ]
        },

        {
            id: "section_9",
            number: "9",
            title: "Compliance and Legal",
            mustPreserve: true,
            content: [
                "**Investigation Authority:** Legal and Security departments are authorized to monitor, investigate, and address suspected policy violations.",
                "**Escalation Process:** Confirmed violations will be escalated to Leadership for appropriate action determination.",
                "**Regulatory Compliance:** All AI tools and processes must comply with applicable laws, regulations, and industry standards including PDPA, sector-specific regulations, and international data transfer requirements.",
                "**Audit Rights:** Periodic audits of AI systems and usage may be conducted to ensure ongoing compliance.",
                "**Record Retention:** Maintain records of AI usage decisions and approvals for audit purposes."
            ]
        },

        {
            id: "section_10",
            number: "10",
            title: "Consequences of Policy Violation",
            mustPreserve: true,
            content: [
                "Violations of this AI Use Policy will be addressed through a progressive disciplinary process proportionate to the severity and nature of the violation.",
                "",
                "**Level 1 - Minor Violations (First Occurrence):**",
                "• Verbal warning and documented coaching",
                "• Mandatory refresher training on AI policy",
                "• Supervisor monitoring of AI usage for 30 days",
                "",
                "**Level 2 - Moderate Violations or Repeated Minor Violations:**",
                "• Formal written warning placed in personnel file",
                "• Temporary suspension of AI tool access (30-90 days)",
                "• Required completion of enhanced AI ethics training",
                "• Performance improvement plan if applicable",
                "",
                "**Level 3 - Serious Violations:**",
                "• Extended suspension of AI access or system privileges",
                "• Formal disciplinary action up to and including termination",
                "• Notification to regulatory authorities if required by law",
                "• Legal action to recover damages if applicable",
                "",
                "**Immediate Termination Offenses:**",
                "• Intentional data breach involving personal or confidential data",
                "• Malicious use of AI causing reputational or financial harm",
                "• Repeated serious violations after prior warnings",
                "",
                "**Reporting Violations:**",
                "If you observe or suspect a violation, report immediately to your supervisor, the [AI Officer / DPO], or through the anonymous ethics hotline."
            ]
        },

        {
            id: "section_11",
            number: "11",
            title: "Appendix - Related Documents and References",
            mustPreserve: true,
            content: {
                intro: "This AI Usage Policy should be read in conjunction with the following related documents and frameworks:",
                references: [
                    {
                        category: "Internal Governance Documents",
                        items: [
                            "AI Governance Framework and Policy",
                            "Data Protection and Privacy Policy",
                            "Information Security Policy",
                            "Enterprise Risk Management Framework",
                            "Employee Code of Conduct",
                            "Acceptable Use Policy for IT Systems"
                        ]
                    },
                    {
                        category: "Regulatory Frameworks and Standards",
                        items: [
                            "Singapore Personal Data Protection Act 2012 (PDPA)",
                            "Singapore Model AI Governance Framework for Generative AI (IMDA, 2024)",
                            "ISO/IEC 42001:2023 - AI Management System",
                            "NIST AI Risk Management Framework"
                        ]
                    },
                    {
                        category: "Approved AI Tools and Resources",
                        items: [
                            "List of Company-Approved Generative AI Tools (maintained by IT Department)",
                            "AI Tool Risk Assessment Matrix",
                            "Third-Party AI Vendor Agreements and Security Assessments"
                        ]
                    },
                    {
                        category: "Training and Support Materials",
                        items: [
                            "AI Ethics and Responsible Use Training Materials",
                            "Prompt Engineering Best Practices Guide",
                            "AI Incident Response Procedures",
                            "FAQ: Common Questions About AI Use at [Company]"
                        ]
                    }
                ],
                notes: [
                    "All referenced documents are available on the company intranet or through the Legal/Compliance department.",
                    "Employees are responsible for staying updated on changes to related policies and frameworks.",
                    "For questions about document access or interpretation, contact the [AI Officer / DPO]."
                ]
            }
        },

        {
            id: "section_12",
            number: "12",
            title: "Professional Review and Support",
            mustPreserve: true,
            content: [
                "This policy was generated using AI-assisted tools and is designed to provide a comprehensive starting point for AI governance.",
                "",
                "**Recommended Next Steps:**",
                "",
                "1. **Legal Review:** Have your legal team review this policy to ensure alignment with your specific jurisdiction and business context.",
                "",
                "2. **Customization:** Adapt the policy to reflect your organization's unique culture, risk tolerance, and operational requirements.",
                "",
                "3. **Industry-Specific Compliance:** For industries with specific regulatory requirements ([INDUSTRY]), consult with specialists familiar with:",
                "[INDUSTRY_REGULATIONS]",
                "",
                "4. **Implementation Support:** Consider professional assistance for:",
                "   • AI governance framework design",
                "   • Employee training program development",
                "   • Technical controls implementation",
                "   • Ongoing compliance monitoring",
                "",
                "**Contact for Professional Consultation:**",
                "For deep customization, industry-specific adaptations, or hands-on implementation support, please contact our consulting partners.",
                "",
                "---",
                "© [YEAR] [Company]. This document is generated for internal use only."
            ]
        }
    ],

    // Supplement templates for PDPA and Singapore Framework
    // Note: Agentic AI references REMOVED per requirement
    supplements: {
        pdpa: {
            targetSection: "section_5b",
            position: "after",
            items: [
                {
                    title: "PDPA Compliance - Personal Data Collection",
                    text: "Ensure that any personal data collected through AI tools complies with the Personal Data Protection Act 2012 (PDPA). Organizations must notify individuals about the purposes of collection, use, or disclosure of their personal data."
                },
                {
                    title: "PDPA Compliance - Consent Requirement",
                    text: "Obtain consent from individuals before collecting, using, or disclosing their personal data, unless an exception under the PDPA applies."
                },
                {
                    title: "PDPA Compliance - Data Accuracy",
                    text: "Make reasonable efforts to ensure that personal data collected is accurate and complete, especially if it will be used to make decisions affecting individuals or disclosed to other organizations."
                }
            ]
        },

        singaporeFramework: {
            targetSection: "section_7",
            position: "after",
            items: [
                {
                    text: "[Company] aligns with the Singapore Model AI Governance Framework for Generative AI, which provides guidance on responsible AI deployment including:"
                },
                {
                    text: "• Accountability: Clear assignment of responsibility for AI system outcomes"
                },
                {
                    text: "• Transparency: Open communication about AI use and limitations"
                },
                {
                    text: "• Human Oversight: Maintaining meaningful human control over AI decisions"
                },
                {
                    text: "• Fairness: Avoiding discrimination and ensuring equitable AI outcomes"
                }
            ]
        }
    }
};

export default policyTemplate;
