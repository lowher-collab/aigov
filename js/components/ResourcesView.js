export default {
    template: `
    <div class="max-w-5xl mx-auto mt-10 animate-fade-in pb-20">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-white mb-4">Official Singapore AI Resources</h2>
            <p class="text-gray-400 max-w-2xl mx-auto">
                Direct access to the regulatory frameworks and technical toolkits powering Singapore's AI ecosystem.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <!-- Frameworks -->
            <div class="space-y-6">
                <h3 class="text-xl font-bold text-primary flex items-center gap-2">
                    <span>🏛️</span> Regulatory Frameworks
                </h3>
                
                <a href="https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf" target="_blank" 
                    class="block glass-panel p-6 rounded-xl hover:border-primary/50 transition-all group">
                    <div class="flex justify-between items-start">
                        <h4 class="font-bold text-white text-lg group-hover:text-primary transition-colors">Agentic AI Governance Framework</h4>
                        <span class="text-xs bg-primary/20 text-primary px-2 py-1 rounded">NEW (Jan 2026)</span>
                    </div>
                    <p class="text-gray-400 text-sm mt-2">The official guidance on managing risks for autonomous AI agents (The basis of this Workbench).</p>
                </a>

                <a href="https://go.gov.sg/ai-gov-mf-2" target="_blank"
                    class="block glass-panel p-6 rounded-xl hover:border-primary/50 transition-all group">
                    <h4 class="font-bold text-white text-lg group-hover:text-primary transition-colors">Model AI Governance Framework (2nd Ed)</h4>
                    <p class="text-gray-400 text-sm mt-2">Singapore's foundational framework covering internal governance, human oversight, operations management, and stakeholder communication.</p>
                </a>

                <a href="https://go.gov.sg/isago" target="_blank"
                    class="block glass-panel p-6 rounded-xl hover:border-primary/50 transition-all group">
                    <h4 class="font-bold text-white text-lg group-hover:text-primary transition-colors">Implementation & Self-Assessment Guide (ISAGO)</h4>
                    <p class="text-gray-400 text-sm mt-2">Companion guide to help organisations assess alignment with the Model Framework, with practical examples from 60+ organisations.</p>
                </a>

                <a href="https://aiverifyfoundation.sg/downloads/Proposed_MGF_Gen_AI_2024.pdf" target="_blank"
                    class="block glass-panel p-6 rounded-xl hover:border-primary/50 transition-all group">
                    <h4 class="font-bold text-white text-lg group-hover:text-primary transition-colors">Generative AI Governance Framework</h4>
                    <p class="text-gray-400 text-sm mt-2">Comprehensive guidelines for LLM deployment, addressing hallucination, bias, and copyright.</p>
                </a>
            </div>

            <!-- Toolkits -->
            <div class="space-y-6">
                 <h3 class="text-xl font-bold text-secondary flex items-center gap-2">
                    <span>🛠️</span> Technical Toolkits
                </h3>

                <a href="https://github.com/aiverify-foundation/aiverify" target="_blank"
                    class="block glass-panel p-6 rounded-xl hover:border-secondary/50 transition-all group">
                    <h4 class="font-bold text-white text-lg group-hover:text-secondary transition-colors">AI Verify Toolkit</h4>
                    <p class="text-gray-400 text-sm mt-2">Open-source testing framework for technical validation of AI models against international principles.</p>
                </a>

                <a href="https://github.com/veritas-toolkit" target="_blank"
                    class="block glass-panel p-6 rounded-xl hover:border-secondary/50 transition-all group">
                    <h4 class="font-bold text-white text-lg group-hover:text-secondary transition-colors">MAS Veritas Toolkit</h4>
                    <p class="text-gray-400 text-sm mt-2">MAS-led consortium toolkit for FEAT (Fairness, Ethics, Accountability, Transparency) assessment in financial AI.</p>
                </a>

                <a href="https://www.pdpc.gov.sg/help-and-resources/2022/08/guide-to-anonymisation" target="_blank"
                    class="block glass-panel p-6 rounded-xl hover:border-secondary/50 transition-all group">
                    <h4 class="font-bold text-white text-lg group-hover:text-secondary transition-colors">PDPC Anonymisation Guide (2022)</h4>
                    <p class="text-gray-400 text-sm mt-2">Essential 5-step guide and techniques for anonymising datasets before training.</p>
                </a>
            </div>

        </div>

        <div class="mt-12 bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
             <h3 class="text-xl font-bold text-white mb-4">Other Useful Links</h3>
             <ul class="space-y-3 text-gray-300">
                <li class="flex items-center gap-2">
                    <span class="text-primary">•</span> 
                    <a href="https://go.gov.sg/ai-gov-use-cases" target="_blank" class="hover:underline hover:text-white">Compendium of Use Cases Vol 1</a>
                    <span class="text-gray-500 text-sm">– DBS, HSBC, Visa, MSD, and more</span>
                </li>
                <li class="flex items-center gap-2">
                    <span class="text-primary">•</span> 
                    <a href="https://go.gov.sg/ai-gov-use-cases-2" target="_blank" class="hover:underline hover:text-white">Compendium of Use Cases Vol 2</a>
                    <span class="text-gray-500 text-sm">– Google, Microsoft, AI Singapore projects</span>
                </li>
                <li class="flex items-center gap-2">
                    <span class="text-primary">•</span> 
                    <a href="https://www.pdpc.gov.sg/help-and-resources/2020/01/model-ai-governance-framework" target="_blank" class="hover:underline hover:text-white">PDPC AI Governance Hub</a>
                </li>
                <li class="flex items-center gap-2">
                    <span class="text-primary">•</span> 
                    <a href="https://www.cccs.gov.sg/" target="_blank" class="hover:underline hover:text-white">CCCS (Competition & Consumer Protection)</a>
                </li>
             </ul>
        </div>
        
        <div class="mt-8 text-center">
             <button @click="$emit('back')" class="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors font-bold">
                ← Back to Workbench
            </button>
        </div>
    </div>
    `
}
