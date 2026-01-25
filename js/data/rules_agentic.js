export const agenticFramework = {
    pillar_1: {
        title: "1. Risk Assessment & Bounding",
        description: "Assess risks upfront and place limits on agent autonomy.",
        rules: [
            {
                id: 'r1_1',
                title: 'Autonomy Classification',
                question: 'Is the agent explicitly classified as "Assistive" (User-in-loop) rather than fully "Autonomous"?',
                riskLevel: 'High',
                citation: 'Pillar 1: Risk Assessment',
                remediation: 'Clearly define the agent\'s autonomy level in the system design document.',
                explanation: 'Singapore\'s framework distinguishes heavily between "Assistive" and "Autonomous" agents. Misclassification can lead to inadequate control measures being applied to high-risk autonomous loops.'
            },
            {
                id: 'r1_2',
                title: 'Tool Whitelisting',
                question: 'Is the Agent restricted to a strict whitelist of API tools necessary for its specific task?',
                riskLevel: 'Critical',
                citation: 'Pillar 1: Least Privilege',
                remediation: 'Remove all "general purpose" tool access. Only grant specific, scoped API permissions.',
                explanation: 'Agents should operate on a "Need-to-Know/Do" basis. Leaving standardized "Shell" or "Web Browser" tools open without whitelisting targets is the #1 vector for successful jailbreaks.'
            },
            {
                id: 'r1_3',
                title: 'Financial Caps',
                question: 'Is there a hard-coded financial limit for single transactions and daily totals (e.g., $50/day)?',
                riskLevel: 'Critical',
                citation: 'Pillar 1: Bounding Risks',
                remediation: 'Implement logic-layer limits that reject tool calls exceeding the budget.',
                explanation: 'LLMs can be tricked into "hallucinating" approval. Hard-coded limits act as a final, non-AI safety net that safeguards your budget even if the model is compromised.'
            },
            {
                id: 'r1_4',
                title: 'Context Management',
                question: 'Is there a strategy to handle context window limits to prevent "forgetting" critical instructions?',
                riskLevel: 'Medium',
                citation: 'Pillar 1: Reliability',
                remediation: 'Implement context pruning or summarization to keep safety prompts in focus.',
                explanation: 'As conversations grow, safety prompts can be pushed out of the context window. A "forgetful" agent is a dangerous agent, as it may lose its original safety instructions.'
            },
            {
                id: 'r1_5',
                title: 'Deterministic Fallback',
                question: 'If the model fails or hallucinates, is there a deterministic rule-based fallback?',
                riskLevel: 'Medium',
                citation: 'Pillar 1: Robustness',
                remediation: 'Ensure critical failures default to a safe, hard-coded error state.',
                explanation: 'Probabilistic models will fail. A "Safe Mode" that reverts to simple rule-based behavior ensures business continuity and safety during model degradation.'
            },
            {
                id: 'r1_6',
                title: 'Action Reversibility',
                question: 'For every tool assigned, is there an assessment of whether its actions are "Easily Reversible"?',
                riskLevel: 'Medium',
                citation: 'Pillar 1: Impact Assessment',
                remediation: 'Tag tools as "Reversible" or "Irreversible" and add friction to the latter.',
                explanation: 'Sending an email is irreversible; drafting one is not. Categorizing tools this way allows you to dynamic friction (e.g., extra confirmations) only where it matters most.'
            },
            {
                id: 'r1_7',
                title: 'Unique Agent Identity',
                question: 'Does the agent have a unique, traceable technical identity (e.g., API token)?',
                riskLevel: 'High',
                citation: 'Pillar 1: Accountability',
                remediation: 'Provision unique Service Accounts for agents; do not reuse human admin credentials.',
                explanation: 'Sharing credentials between humans and agents creates audit chaos. In a breach, you must be able to distinguish "Human Error" from "Agent Malfunction" instantly.'
            },
            {
                id: 'r1_8',
                title: 'Permission Parity',
                question: 'Is there a technical check to ensure the agent’s permissions never exceed the user\'s?',
                riskLevel: 'Critical',
                citation: 'Pillar 1: Access Control',
                remediation: 'Implement "On-Behalf-Of" (OBO) flow using OAuth user tokens.',
                explanation: 'The "Confused Deputy" problem serves as a classic attack vector where an agent acts with higher privileges than the user invoking it. OBO flows enforce user-level boundaries on the agent.'
            }
        ]
    },
    pillar_2: {
        title: "2. Human Accountability",
        description: "Ensure meaningful human oversight at critical checkpoints.",
        rules: [
            {
                id: 'r2_1',
                title: 'High-Stakes Approval',
                question: 'Does the Agent require explicit human approval before executing "High Impact" actions?',
                riskLevel: 'Critical',
                citation: 'Pillar 2: Meaningful Oversight',
                remediation: 'Implement a "Human-in-the-Loop" approval step for all destructive actions.',
                explanation: 'Speed is secondary to safety in high-stakes actions. Forcing a human pause creates a psychological "circuit breaker" that prevents cascading automated failures.'
            },
            {
                id: 'r2_2',
                title: 'Kill Switch',
                question: 'Can a human operator immediately terminate the agent\'s active steps in < 2 seconds?',
                riskLevel: 'Critical',
                citation: 'Pillar 2: Control',
                remediation: 'Implement a global "Stop Generation" button that also revokes pending tool calls.',
                explanation: 'A stop button must be "Physical" (logic-level), not just UI cosmetic. It must cut network connections and revoke tokens immediately to halt a runaway process.'
            },
            {
                id: 'r2_3',
                title: 'Action Attribution',
                question: 'Can every action be traced back to a specific PROMPT and MODEL VERSION?',
                riskLevel: 'Medium',
                citation: 'Pillar 2: Traceability',
                remediation: 'Log the "Run ID" and "Model Hash" with every tool execution.',
                explanation: 'Models behave differently between versions. Without version-level logging, debugging a "sudden" behavioral drift in your agent becomes statistically impossible.'
            },
            {
                id: 'r2_4',
                title: 'Organizational Owner',
                question: 'Is there a named "Product Owner" legally responsible for the agent\'s output errors?',
                riskLevel: 'Medium',
                citation: 'Pillar 2: Governance Structure',
                remediation: 'Assign a specific role (not just a department) as the Agent Owner.',
                explanation: 'Shared responsibility often means no responsibility. Naming a specific "Agent Owner" ensures someone is incentivized to review logs and maintain governance standards.'
            },
            {
                id: 'r2_5',
                title: 'Digestible Approvals',
                question: 'Are approval requests presented in a "short and clear" format rather than raw JSON?',
                riskLevel: 'Medium',
                citation: 'Pillar 2: Effective Oversight',
                remediation: 'Design a UI card for approvals summarizing: "Tool", "Params", and "Consequence".',
                explanation: 'If approvals are hard to read, humans will "Rubber Stamp" them. Good UX design in approval cards is actually a critical security control against automation bias.'
            },
            {
                id: 'r2_6',
                title: 'Oversight Audit',
                question: 'Is there a periodic audit of human approvals to prevent "automation bias"?',
                riskLevel: 'Low',
                citation: 'Pillar 2: Oversight Quality',
                remediation: 'Randomly sample "Approved" actions to verify reviewer attention.',
                explanation: 'Humans get tired and start approving everything. Periodic "Secret Shopper" style audits of the reviewers themselves keep the human-in-the-loop layer effective.'
            },
            {
                id: 'r2_7',
                title: 'Adaptive Governance',
                question: 'Is there a process to update risk assessments when new agent modalities are added?',
                riskLevel: 'Low',
                citation: 'Pillar 2: Lifecycle',
                remediation: 'Trigger a re-assessment whenever a new Tool Definition is added.',
                explanation: 'Giving an agent "Computer Use" or "Internet Access" fundamentally changes its risk profile. Governance must be dynamic, triggering reviews upon capability upgrades.'
            }
        ]
    },
    pillar_3: {
        title: "3. Technical Controls",
        description: "Implement robustness testing and access controls.",
        rules: [
            {
                id: 'r3_1',
                title: 'Input Injection Scan',
                question: 'Is all external content (emails, websites) scanned for prompt injection before feeding to the Agent?',
                riskLevel: 'Critical',
                citation: 'Pillar 3: Input Security',
                remediation: 'Sanitize all external inputs using a "Prompt Injection" classifier.',
                explanation: 'Agents reading websites are reading potential hacks. Indirect Prompt Injection is the most common way to hijack an agent, turning it into a sleeper threat.'
            },
            {
                id: 'r3_2',
                title: 'Max Steps Limit',
                question: 'Is there a "Max Steps" counter (e.g., limit 20 steps) to prevent run-away agent loops?',
                riskLevel: 'High',
                citation: 'Pillar 3: Safety Guardrails',
                remediation: 'Hard-code a maximum loop count (e.g., 20 iterations) in the agent runtime.',
                explanation: 'Infinite loops cost money and lock resources. A "Time-to-Live" (TTL) or Step Limit is a basic but essential denial-of-service protection for agentic systems.'
            },
            {
                id: 'r3_3',
                title: 'User-Level Auth',
                question: 'Does the agent use "User-Level" OAuth tokens rather than a "Super-Admin" Service Key?',
                riskLevel: 'Critical',
                citation: 'Pillar 3: Authentication',
                remediation: 'Ensure the agent acts WITH the user\'s credentials, not its own admin keys.',
                explanation: 'Agents acting as "God Mode" admins are disasters waiting to happen. Binding the agent to the specific user\'s limited OAuth scope drastically limits the "Blast Radius" of any breach.'
            },
            {
                id: 'r3_4',
                title: 'Structured Chain Logs',
                question: 'Are agent "Thought Traces" (CoT) logged separately from "Final Outputs"?',
                riskLevel: 'Medium',
                citation: 'Pillar 3: Observability',
                remediation: 'Store "Reasoning Chains" in a separate DB column for auditing logic errors.',
                explanation: 'You cannot debug an agent\'s logic if you only save its final answer. Storing the "Chain of Thought" allows you to replay and fix the specific step where reasoning failed.'
            },
            {
                id: 'r3_5',
                title: 'Red Teaming',
                question: 'Has the Agent been Red Teamed specifically for jailbreaks and unauthorized tool use?',
                riskLevel: 'High',
                citation: 'Pillar 3: Testing',
                remediation: 'Perform adversarial testing focusing on privilege escalation.',
                explanation: 'Standard QA tests functionality; Red Teaming tests security. You need adversarial thinkers to actively try to break your agent restrictions before hackers do.'
            },
            {
                id: 'r3_6',
                title: 'Logic & Policy Testing',
                question: 'Has the agent been tested for Policy Adherence and Task Accuracy (not just LLM correctness)?',
                riskLevel: 'High',
                citation: 'Pillar 3: Quality Assurance',
                remediation: 'Add integration tests that verify the agent follows logic rules.',
                explanation: 'An agent can write great English but fail its business logic. Test specifically for "Policy Adherence" (e.g., did it refuse a refund request?) separate from conversational quality.'
            },
            {
                id: 'r3_7',
                title: 'Phased Rollout',
                question: 'Is there a mandatory "Gradual Rollout" phase for new workflows?',
                riskLevel: 'Medium',
                citation: 'Pillar 3: Deployment Safety',
                remediation: 'Use Canary Deployment: release to 5% of users first.',
                explanation: 'Agent behavior is emergent and unpredictable at scale. A canary release allows you to spot "weird" patterns in a small group before they impact your entire user base.'
            },
            {
                id: 'r3_8',
                title: 'Trajectory Alerts',
                question: 'Are there automated alerts for "Anomalous Agent Trajectories" (e.g., unusual tool paths)?',
                riskLevel: 'Medium',
                citation: 'Pillar 3: Monitoring',
                remediation: 'Alert if an agent uses a "Payment Tool" -> "Delete Tool" sequence unexpectedly.',
                explanation: 'Just like credit card fraud detection, agents need behavioral monitoring. Unusual sequences of tool use (e.g., "Delete" followed by "Email") should trigger immediate security alerts.'
            }
        ]
    },
    pillar_4: {
        title: "4. End-User Responsibility",
        description: "Transparency and user education.",
        rules: [
            {
                id: 'r4_1',
                title: 'Agent Disclosure',
                question: 'Does the Agent clearly disclose its non-human identity to the user immediately?',
                riskLevel: 'Medium',
                citation: 'Pillar 4: Transparency',
                remediation: 'Add a mandatory disclaimer: "I am an AI Agent" at the start of every session.',
                explanation: 'Users treat humans and machines differently. Deceiving a user about the nature of their interlocutor erodes trust and is increasingly illegal under consumer protection laws.'
            },
            {
                id: 'r4_2',
                title: 'Liability Terms',
                question: 'Did the user explicitly agree to Terms of Service acknowledging the risk of AI error?',
                riskLevel: 'Low',
                citation: 'Pillar 4: Liability',
                remediation: 'Update ToS to include specific "AI Agent" limitation of liability clauses.',
                explanation: 'Standard software ToS may not cover the "probabilistic" nature of AI errors. Specific clauses protecting against "hallucinated advice" are essential for legal limitation of liability.'
            },
            {
                id: 'r4_3',
                title: 'Dispute Mechanism',
                question: 'Is there a clear "Report Issue" or "Dispute Transaction" flow for agent-caused errors?',
                riskLevel: 'High',
                citation: 'Pillar 4: Consumer Protection',
                remediation: 'Add a "Flag this Action" button on every agent message.',
                explanation: 'When an agent makes a mistake, the user needs an "Undo" button, not a customer support number. A quick dispute flow reduces user frustration and regulatory complaints.'
            },
            {
                id: 'r4_4',
                title: 'User Guide',
                question: 'Are users provided with clear instructions on the Agent\'s limitations?',
                riskLevel: 'Low',
                citation: 'Pillar 4: Education',
                remediation: 'Publish a "Capabilities Map" showing what the agent CANNOT do.',
                explanation: 'Managing expectations helps prevent misuse. Telling users explicitly what the agent *cannot* do prevents them from over-trusting it with inappropriate tasks.'
            },
            {
                id: 'r4_5',
                title: 'Tradecraft Preservation',
                question: 'Does the organization train users to maintain skills without over-reliance on the agent?',
                riskLevel: 'Low',
                citation: 'Pillar 4: Human Capital',
                remediation: 'Ensure staff periodically perform manual tasks to maintain competency.',
                explanation: 'If the AI breaks, can your staff still do the work? "Deskilling" is a long-term strategic risk; maintaining manual competency ensures resilience against AI failure.'
            },
            {
                id: 'r4_6',
                title: 'Scope Disclosure',
                question: 'Are users informed of the agent\'s "Range of Actions" and "Data Access" scope?',
                riskLevel: 'Medium',
                citation: 'Pillar 4: Informed Consent',
                remediation: 'Show a "Permissions Card" on start-up listing exactly what data the agent can read/write.',
                explanation: 'Transparency builds trust. A user who knows exactly what data the agent accesses is less suspicious and more likely to use the tool effectively and safely.'
            }
        ]
    }
};
