// AI Policy Template - Complete Commercial Template
// This template preserves 100% of the original content
// Supplements will be added WITHOUT replacing any existing content

export const policyTemplate = {
    metadata: {
        version: "1.0",
        source: "AI_Policy_Template_副本.docx",
        mustPreserveAll: true,
        minimumPages: 10
    },

    sections: [
        {
            id: "section_1",
            number: "1",
            title: "Purpose and Applicability",
            mustPreserve: true,
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
                "This policy covers all AI tools used within the Company, including but not limited to GenAI, machine learning, and predictive analytics.",
                "It encompasses the collection, processing, and utilization of data through AI systems."
            ]
        },

        {
            id: "section_3",
            number: "3",
            title: "Approved AI Tools",
            mustPreserve: true,
            content: [
                "Employees may use AI tools that have been approved by the IT department and meet Company security standards.",
                "Examples of allowed AI tools: customer support chatbots, data analysis algorithms, and predictive analytics tools.",
                "Use of approved tools requires that they are only accessed through a company-provided account (personal accounts prohibited)."
            ]
        },

        {
            id: "section_4",
            number: "4",
            title: "Prohibited AI Tools",
            mustPreserve: true,
            content: [
                "Use of any AI tools that infringe upon privacy laws or violate ethical guidelines is strictly prohibited.",
                "Examples of prohibited AI tools: facial recognition systems without explicit consent, biased AI models, or unauthorized data scraping tools."
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
            title: "Guidelines",
            mustPreserve: true,
            content: [
                "AI-generated content should be reviewed by a human to ensure it's appropriate for its intended purpose.",
                "Understand that GenAI tools may be useful but are not a substitute for human judgment and creativity.",
                "Understand that many GenAI tools are prone to \"hallucinations,\" false answers or information, or information that is subtly wrong.",
                "Treat every bit of information you provide to a GenAI tool as if it will go viral on the Internet, attributed to you or the Company, regardless of the settings you have selected within the tool (or the assurances made by its creators).",
                "Inform your supervisor when you have used a GenAI tool to help perform a task.",
                "Verify that any response from a GenAI tool that you intend to rely on or use is accurate, appropriate, not biased, not a violation of any other individual or entity's intellectual property or privacy, and consistent with Company policies and applicable laws."
            ],
            supplementPosition: "after" // PDPA/SG additions go after existing content
        },

        {
            id: "section_5b",
            number: "5b",
            title: "Data Guardrails",
            mustPreserve: true,
            content: [
                {
                    title: "Only input the data you need",
                    text: "Only input data that is required for the purpose for which you are using the AI tool, and ensure the data you are using has been approved by your legal business partner for your use case."
                },
                {
                    title: "Do not input Sensitive Personal Data",
                    text: "This includes information such as social security numbers, financial information like credit card or bank account numbers, personal addresses, or personal health information."
                },
                {
                    title: "Do not input any Restricted Data",
                    text: "This may include things like material nonpublic information, SOX-controlled data, Company trade secrets, or internal security controls."
                },
                {
                    title: "Do not input access credentials",
                    text: "Do not input system access credentials (for our systems or those of any third party)"
                },
                {
                    title: "Additional restrictions",
                    text: ""
                },
                {
                    title: "Do not use GenAI tools to make or help you make employment decisions",
                    text: "Do not use GenAI tools to make or help you make employment decisions about applicants or employees, including recruitment, hiring, retention, promotions, transfers, performance monitoring, discipline, demotion, or terminations."
                },
                {
                    title: "Do not upload or input any confidential, proprietary, or sensitive Company information",
                    text: "Do not upload or input any confidential, proprietary, or sensitive Company information into any GenAI tool. Examples include passwords and other credentials, protected health information, personnel material, information from documents marked Confidential, Sensitive, or Proprietary, or any other nonpublic Company information that might be of use to competitors or harmful to the Company if disclosed. This may breach your or the Company's obligations to keep certain information confidential and secure, risks widespread disclosure, and may cause the Company's rights to that information to be challenged."
                },
                {
                    title: "Do not represent work generated by a GenAI tool as being your own original work",
                    text: ""
                },
                {
                    title: "Do not integrate any GenAI tool with internal Company software",
                    text: "Do not integrate any GenAI tool with internal Company software without first receiving specific written permission from your supervisor and the IT Department."
                },
                {
                    title: "Do not use GenAI tools other than those on the approved list",
                    text: "Do not use GenAI tools other than those on the approved list from the IT Department. Malicious chatbots can be designed to steal or convince you to divulge information."
                }
            ],
            pdpaSupplementPosition: "after", // PDPA additions go after the 9+ existing items
            minimumItems: 9
        },

        {
            id: "section_6",
            number: "6",
            title: "AI-Generated Output Guardrails",
            mustPreserve: true,
            content: {
                aiOnlyResponses: {
                    title: "AI Only Responses",
                    text: "If an AI feature will directly present a response to customers or third parties without human review or intervention, you must disclose to the customer that they are:",
                    requirements: [
                        "Engaging solely with an AI.",
                        "Responsible for checking it for accuracy.",
                        "Responsible for checking the response for detectable bias."
                    ],
                    example: '"This response has been generated by an AI tool and has not been reviewed by a human being, you are responsible for checking for accuracy and bias."'
                },
                generatingMedia: {
                    title: "Generating Images/Voice/Video",
                    text: "If you're using AI to generate content, please follow these guidelines.",
                    guidelines: [
                        "Check output for any indication of third-party ownership, such as trademarks or watermarks, and don't use any output that contains such content.",
                        "If you are using an AI tool to replicate someone's image, likeness, or voice - you need to get their express written permission first. Please reach out to legal counsel to coordinate permission."
                    ]
                },
                generatingCode: {
                    title: "Generating Code",
                    text: "If an AI feature will generate code, this requires additional review."
                }
            }
        },

        {
            id: "section_7",
            number: "7",
            title: "Transparency, explainability, and accountability",
            mustPreserve: true,
            content: [
                "Employees must be transparent about the use of AI in their work, ensuring that stakeholders are aware of the technology's involvement in decision-making processes.",
                "Employees must utilize Company's centralized system for AI governance and compliance efforts to ensure transparency of proposed and active AI activities.",
                "Employees are responsible for the outcomes generated by AI systems and should be prepared to explain and justify those outcomes.",
                "Employees should report any concerns or potential violations of this AI policy to the designated authority within the Company. [Link to an external reporting resouce or insert a designated reporting email.]",
                "The Company will investigate and address reported issues promptly.",
                "AI systems and models should provide clear explanations of their decision-making processes, especially when impacting individuals.",
                "Ensure that AI tools are understandable to non-technical stakeholders and that their implications are communicated transparently."
            ],
            sgFrameworkSupplementPosition: "after" // Singapore Framework additions go here
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
                    content: "A multidisciplinary AI risk management team ('AI Governance Board') comprised of a diverse team of experts, including data scientists, legal and compliance professionals, and ethics specialists, will ensure that AI initiatives are developed and deployed responsibly, in compliance with relevant laws and regulations, and with ethical considerations in mind. The AI Governance Board will create and define roles and responsibilities for designated committees critical to the oversight of the Company's AI initiatives."
                },
                {
                    id: "section_8b",
                    number: "8b",
                    title: "Designated AI Officer",
                    content: "A designated AI Officer will be responsible for overseeing the implementation of this policy, providing guidance and support to employees, and ensuring compliance with relevant laws and regulations."
                },
                {
                    id: "section_8c",
                    number: "8c",
                    title: "Periodic Reviews",
                    content: "The AI Officer will conduct periodic reviews of AI system use within the company to ensure adherence to this policy, identify any emerging risks, and recommend updates to the policy as necessary."
                }
            ]
        },

        {
            id: "section_9",
            number: "9",
            title: "Compliance and legal",
            mustPreserve: true,
            content: [
                "Legal and Security will monitor and investigate suspected and/or reported violations of this policy. Depending on the results of any investigations, violations may be escalated to Leadership to determine the appropriate action.",
                "All AI tools and processes must comply with applicable laws, regulations, and industry standards.",
                "Periodic audits of AI systems may be conducted to ensure ongoing compliance."
            ]
        },

        {
            id: "section_10",
            number: "10",
            title: "Consequences of policy violation",
            mustPreserve: true,
            content: "Violating this policy may result in disciplinary action, up to and including immediate termination, and could result in legal action. If you are concerned that someone has violated this policy, report this behavior to your supervisor or any member of Human Resources."
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
                            "Singapore Model AI Governance Framework (IMDA, 2026)",
                            "Supplementary Guidance for Agentic AI Systems (January 2026)",
                            "ISO/IEC 42001:2023 - AI Management System",
                            "NIST AI Risk Management Framework"
                        ]
                    },
                    {
                        category: "Approved AI Tools List",
                        items: [
                            "List of Company-Approved Generative AI Tools (maintained by IT Department)",
                            "AI Tool Risk Assessment Matrix",
                            "Third-Party AI Vendor Agreements"
                        ]
                    },
                    {
                        category: "Training and Resources",
                        items: [
                            "AI Ethics and Responsible Use Training Materials",
                            "Prompt Engineering Best Practices Guide",
                            "AI Incident Response Procedures",
                            "FAQ: Common Questions About AI Use at the Company"
                        ]
                    }
                ],
                notes: [
                    "All referenced documents are available on the company intranet or through the Legal/Compliance department.",
                    "Employees are responsible for staying updated on changes to related policies and frameworks.",
                    "For questions about document access or interpretation, contact the designated AI Officer or Legal department."
                ]
            }
        }
    ],

    // Supplement templates for PDPA and Singapore Framework
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
                    text: "The Company aligns with the Singapore Model AI Governance Framework, specifically the supplementary guidance for Agentic AI systems (January 2026), which addresses unique risks from autonomous agents including:"
                },
                {
                    text: "• Agentic Loop Risks: Monitoring and controlling AI systems that can iteratively refine their own actions"
                },
                {
                    text: "• Tool Use Accountability: Clear tracking of which AI agent invoked which external tool or API"
                },
                {
                    text: "• Explainability for Multi-Step Decisions: Providing audit trails for complex, multi-turn agent reasoning"
                }
            ]
        }
    }
};

export default policyTemplate;
