import { createApp, ref, computed } from 'vue'
import NavBar from './components/NavBar.js'
import ModuleCard from './components/ModuleCard.js'
import WizardStep from './components/WizardStep.js'
import PolicyWizardStep from './components/PolicyWizardStep.js'
import ComplianceReport from './components/ComplianceReport.js'
import ResourcesView from './components/ResourcesView.js'
import PolicyGenerator from './components/PolicyGenerator.js'
import { agenticFramework } from './data/rules_agentic.js'
import { generatePolicy, policyToMarkdown, validatePolicy } from './utils/policyEngine.js'
import { exportToDOCX, exportToPDF } from './utils/documentExport.js'

createApp({
    components: {
        NavBar,
        ModuleCard,
        WizardStep,
        PolicyWizardStep,
        ComplianceReport,
        ResourcesView,
        PolicyGenerator
    },
    setup() {
        // App State: 'landing' | 'dashboard' | 'wizard' | 'report' | 'resources' | 'policy-generator' | 'policy-preview'
        const viewState = ref('landing')
        const previousViewState = ref('landing')

        // Active Module Tracking
        const activePillarKey = ref(null)
        const currentQuestionIndex = ref(0)

        // Data Store
        const answers = ref([]) // Array of { pillarId, ruleId, compliant, rule }
        const generatedPolicy = ref(null) // Generated policy document
        const policyValidation = ref(null) // Validation results
        const subscriptionEmail = ref('') // Email subscription

        // --- FUNCTIONS ---

        const handleEmailSubscription = () => {
            if (subscriptionEmail.value) {
                // TODO: Implement actual email collection (send to backend/API)
                alert(`✅ Thank you for subscribing!\n\nEmail: ${subscriptionEmail.value}\n\n(In production, this would be sent to your backend/mailing list service)`)
                subscriptionEmail.value = ''
            }
        }

        // --- COMPUTED ---

        const activePillarRules = computed(() => {
            if (!activePillarKey.value) return [];
            return agenticFramework[activePillarKey.value].rules;
        })

        const activeRule = computed(() => {
            if (activePillarRules.value.length === 0) return null;
            return activePillarRules.value[currentQuestionIndex.value];
        })

        const isWizardActive = computed(() => viewState.value === 'wizard');

        // Calculate progress for Dashboard Cards
        const getPillarProgress = (pillarKey) => {
            const rules = agenticFramework[pillarKey].rules;
            // Find how many rules specifically for this pillar have been answered
            const answered = answers.value.filter(a => a.pillarId === pillarKey);
            return Math.round((answered.length / rules.length) * 100);
        }

        const isAssessmentComplete = computed(() => {
            let total = 0;
            let answered = 0;
            Object.keys(agenticFramework).forEach(k => {
                total += agenticFramework[k].rules.length;
            });
            answered = answers.value.length;
            return total > 0 && answered === total;
        })

        // --- ACTIONS ---

        const startApp = () => {
            viewState.value = 'dashboard'
        }

        const openModule = (pillarKey) => {
            const rules = agenticFramework[pillarKey].rules;
            const answeredIds = new Set(answers.value.filter(a => a.pillarId === pillarKey).map(a => a.rule.id));

            let firstUnanswered = rules.findIndex(r => !answeredIds.has(r.id));
            if (firstUnanswered === -1) firstUnanswered = 0; // All done, restart from 0 for review

            activePillarKey.value = pillarKey;
            currentQuestionIndex.value = firstUnanswered;
            viewState.value = 'wizard';
        }

        const submitAnswer = (isCompliant) => {
            const rule = activeRule.value;
            // Remove old answer for this rule if exists (handling retakes)
            const existingIdx = answers.value.findIndex(a => a.rule.id === rule.id);
            if (existingIdx !== -1) answers.value.splice(existingIdx, 1);

            answers.value.push({
                pillarId: activePillarKey.value,
                rule: rule, // Store full rule object for report
                compliant: isCompliant
            });

            // Nav logic
            if (currentQuestionIndex.value < activePillarRules.value.length - 1) {
                currentQuestionIndex.value++;
            } else {
                // End of this module
                viewState.value = 'dashboard';
                activePillarKey.value = null;
            }
        }

        const viewReport = () => {
            viewState.value = 'report';
        }

        const backToDashboard = () => {
            viewState.value = 'dashboard';
        }

        const showResources = () => {
            // Save previous state if we are not already in resources
            if (viewState.value !== 'resources') {
                previousViewState.value = viewState.value;
            }
            viewState.value = 'resources';
        }

        const backFromResources = () => {
            viewState.value = previousViewState.value === 'resources' ? 'dashboard' : previousViewState.value;
            if (viewState.value === 'landing') viewState.value = 'dashboard'; // Better UX usually to go to dashboard
        }

        const showAssessment = () => {
            if (viewState.value !== 'dashboard') {
                previousViewState.value = viewState.value;
            }
            viewState.value = 'dashboard';
        }

        const showPolicyGenerator = () => {
            if (viewState.value !== 'policy-generator') {
                previousViewState.value = viewState.value;
            }
            viewState.value = 'policy-generator';
        }

        const handlePolicyGeneration = (config) => {
            try {
                const policy = generatePolicy(config);
                const validation = validatePolicy(policy);

                generatedPolicy.value = {
                    policy,
                    markdown: policyToMarkdown(policy),
                    validation,
                    config
                };

                viewState.value = 'policy-preview';
            } catch (error) {
                console.error('Policy generation error:', error);
                alert('生成政策时出错，请重试。');
            }
        }

        const backFromPolicyGenerator = () => {
            viewState.value = previousViewState.value === 'policy-generator' ? 'dashboard' : previousViewState.value;
            if (viewState.value === 'landing') viewState.value = 'dashboard';
        }

        const downloadPolicyAsMarkdown = () => {
            if (!generatedPolicy.value) return;

            const blob = new Blob([generatedPolicy.value.markdown], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'AI POLICY.md';
            a.click();
            URL.revokeObjectURL(url);
        }

        const downloadPolicyAsDOCX = async () => {
            if (!generatedPolicy.value) return;
            try {
                await exportToDOCX(generatedPolicy.value.policy);
            } catch (error) {
                console.error('DOCX export error:', error);
                alert('导出DOCX时出错: ' + error.message);
            }
        }

        const downloadPolicyAsPDF = () => {
            if (!generatedPolicy.value) return;
            try {
                exportToPDF(generatedPolicy.value.policy);
            } catch (error) {
                console.error('PDF export error:', error);
                alert('导出PDF时出错: ' + error.message);
            }
        }

        return {
            agenticFramework,
            viewState,
            activeRule,
            isWizardActive,
            answers,
            activePillarKey,
            generatedPolicy,
            policyValidation,
            subscriptionEmail,
            handleEmailSubscription,
            startApp,
            openModule,
            submitAnswer,
            getPillarProgress,
            viewReport,
            backToDashboard,
            isAssessmentComplete,
            showResources,
            backFromResources,
            showAssessment,
            showPolicyGenerator,
            handlePolicyGeneration,
            backFromPolicyGenerator,
            downloadPolicyAsMarkdown,
            downloadPolicyAsDOCX,
            downloadPolicyAsPDF
        }
    },
    template: `
        <NavBar @nav-resources="showResources" @nav-policy="showPolicyGenerator" />
        
        <main class="flex-grow container mx-auto px-4 py-8 relative">
            
            <!-- VIEW: Landing -->
            <div v-if="viewState === 'landing'" class="text-center mt-10 fade-in pb-20">
                
                <!-- Hero Section -->
                <div class="inline-block p-4 rounded-full bg-primary/10 mb-6 animate-pulse">
                     <span class="text-5xl">🕸️</span>
                </div>
                <h1 class="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-6 font-tracking-tight">
                    Agentic Governance 2026
                </h1>
                <p class="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Official Reference Implementation for the <strong>Singapore Model AI Governance Framework for Agentic AI</strong>.
                </p>
                <button @click="startApp" class="px-10 py-4 bg-primary hover:bg-indigo-500 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-primary/50 transition-all transform hover:-translate-y-1 mb-16">
                    Enter Workbench
                </button>


                <!-- News Section -->
                <div class="max-w-4xl mx-auto mb-16">
                    <div class="glass-panel rounded-2xl overflow-hidden border border-gray-700/50 group hover:border-primary/30 transition-all text-left">
                        <div class="grid md:grid-cols-2">
                             <div class="h-64 md:h-auto bg-cover bg-center" style="background-image: url('./assets/news_banner.png');"></div>
                             <div class="p-8 flex flex-col justify-center">
                                <span class="text-xs font-bold text-primary uppercase tracking-widest mb-2">Latest Governance News</span>
                                <h3 class="text-2xl font-bold text-white mb-3">Singapore Launches Model AI Governance Framework for Generative AI</h3>
                                <p class="text-gray-400 text-sm mb-4 leading-relaxed">
                                    The new framework expands on the existing Model AI Governance Framework to address 9 dimensions of AI governance, including Incident Reporting and Content Provenance.
                                </p>
                                <a href="https://aiverifyfoundation.sg/resources/model-ai-governance-framework-genai" target="_blank" class="text-primary font-bold hover:text-white transition-colors flex items-center gap-1 text-sm">
                                    Read Full Framework →
                                </a>
                             </div>
                        </div>
                    </div>
                </div>

                <!-- Subscription Section -->
                <div class="max-w-xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 text-center relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    
                    <h3 class="text-xl font-bold text-white mb-2 relative z-10">Stay Ahead of AI Regulation</h3>
                    <p class="text-gray-400 text-sm mb-6 relative z-10">
                        Get monthly "Red Team" reports and emerging threat analysis directly to your inbox.
                    </p>
                    
                    <form @submit.prevent="handleEmailSubscription" class="flex gap-2 relative z-10">
                        <input v-model="subscriptionEmail" type="email" placeholder="Enter your work email" required
                            class="flex-grow px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary placeholder-gray-500 transition-colors">
                        <button type="submit" class="px-6 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-200 transition-colors">
                            Subscribe
                        </button>
                    </form>
                    <p class="text-xs text-gray-600 mt-4 relative z-10">
                        Join 2,500+ AI Safety Professionals in SG.
                    </p>
                </div>

            </div>

            <!-- VIEW: Dashboard (Modules) -->
            <div v-else-if="viewState === 'dashboard'" class="fade-in max-w-6xl mx-auto">
                <div class="flex justify-between items-center mb-8">
                    <div>
                        <h2 class="text-3xl font-bold text-white">Compliance Pillars</h2>
                        <p class="text-gray-400">Select a module to begin assessment.</p>
                    </div>
                    <button v-if="answers.length > 0" @click="viewReport" 
                        class="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-600 transition-colors flex items-center gap-2">
                        <span>📊</span> View Current Report
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ModuleCard 
                        v-for="(data, key) in agenticFramework" 
                        :key="key"
                        :pillarId="key"
                        :data="data"
                        :progress="getPillarProgress(key)"
                        @select="openModule(key)"
                    />
                </div>
                
                <div v-if="isAssessmentComplete" class="text-center mt-12 bg-green-500/10 p-4 rounded-xl border border-green-500/30">
                    <p class="text-green-400 font-bold mb-2">Build complete!</p>
                    <button @click="viewReport" class="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 shadow-lg">
                        Generate Final Audit PDF
                    </button>
                </div>
            </div>

            <!-- VIEW: Wizard (Questions) -->
            <div v-else-if="viewState === 'wizard'" class="fade-in">
                <div class="text-center text-gray-500 mb-4 uppercase tracking-widest text-xs font-bold">
                    Assessing Pillar
                </div>
                <h2 class="text-center text-3xl font-bold text-white mb-2">
                    {{ agenticFramework[activePillarKey].title }}
                </h2>
                
                <WizardStep 
                    v-if="activeRule"
                    :rule="activeRule" 
                    :active="true"
                    @answer="submitAnswer" 
                />
            </div>

            <!-- VIEW: Report -->
            <ComplianceReport 
                v-else-if="viewState === 'report'"
                :answers="answers"
                :framework="agenticFramework"
                @back="backToDashboard"
            />

            <!-- VIEW: Resources -->
            <ResourcesView 
                v-else-if="viewState === 'resources'"
                @back="backFromResources"
            />

            <!-- VIEW: Policy Generator -->
            <PolicyGenerator
                v-else-if="viewState === 'policy-generator'"
                @back="backFromPolicyGenerator"
                @generate="handlePolicyGeneration"
            />

            <!-- VIEW: Policy Preview -->
            <div v-else-if="viewState === 'policy-preview' && generatedPolicy" class="max-w-6xl mx-auto mt-10 animate-fade-in pb-20">
                <div class="text-center mb-8">
                    <h2 class="text-4xl font-bold text-white mb-4">Generated AI Policy Document</h2>
                    <p class="text-gray-400">
                        {{ generatedPolicy.policy.metadata.companyName }} - {{ generatedPolicy.policy.metadata.industry }}
                    </p>
                </div>

                <!-- Validation Results -->
                <div v-if="generatedPolicy.validation" class="mb-8 glass-panel p-6 rounded-xl">
                    <h3 class="text-xl font-bold text-white mb-4">质量检查</h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="text-center">
                            <div :class="generatedPolicy.validation.hasSection5a ? 'text-green-400' : 'text-red-400'" class="text-3xl mb-2">
                                {{ generatedPolicy.validation.hasSection5a ? '✓' : '✗' }}
                            </div>
                            <p class="text-sm text-gray-400">第5a章</p>
                        </div>
                        <div class="text-center">
                            <div :class="generatedPolicy.validation.hasSection5bWith9Items ? 'text-green-400' : 'text-red-400'" class="text-3xl mb-2">
                                {{ generatedPolicy.validation.hasSection5bWith9Items ? '✓' : '✗' }}
                            </div>
                            <p class="text-sm text-gray-400">第5b章 (≥9条)</p>
                        </div>
                        <div class="text-center">
                            <div :class="generatedPolicy.validation.meetsMinimumPages ? 'text-green-400' : 'text-yellow-400'" class="text-3xl mb-2">
                                {{ generatedPolicy.validation.estimatedPages }}
                            </div>
                            <p class="text-sm text-gray-400">预估页数</p>
                        </div>
                        <div class="text-center">
                            <div :class="generatedPolicy.validation.allMandatorySectionsPresent ? 'text-green-400' : 'text-red-400'" class="text-3xl mb-2">
                                {{ generatedPolicy.validation.allMandatorySectionsPresent ? '✓' : '✗' }}
                            </div>
                            <p class="text-sm text-gray-400">所有必需章节</p>
                        </div>
                    </div>
                </div>

                <!-- Preview -->
                <div class="glass-panel p-8 rounded-xl mb-8">
                    <pre class="text-gray-300 text-sm whitespace-pre-wrap font-mono">{{ generatedPolicy.markdown }}</pre>
                </div>

                <!-- Actions -->
                    <button 
                        @click="viewState = 'policy-generator'"
                        class="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-bold"
                    >
                        ← Back to Edit
                    </button>
                    <div class="flex gap-3">
                        <button 
                            @click="downloadPolicyAsDOCX"
                            class="px-6 py-3 bg-primary hover:bg-indigo-500 text-white rounded-lg transition-colors font-bold flex items-center gap-2 shadow-lg"
                        >
                            <span>📄</span> Download DOCX
                        </button>
                        <button 
                            @click="downloadPolicyAsPDF"
                            class="px-6 py-3 bg-secondary hover:bg-pink-600 text-white rounded-lg transition-colors font-bold flex items-center gap-2 shadow-lg"
                        >
                            <span>📕</span> Download PDF
                        </button>
                        <button 
                            @click="downloadPolicyAsMarkdown"
                            class="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors font-bold flex items-center gap-2"
                        >
                            <span>📝</span> Markdown
                        </button>
                        <button 
                            @click="backToDashboard"
                            class="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors font-bold ml-2"
                        >
                            Done ✓
                        </button>
                    </div>
                </div>
            </div>

        </main>
        
        <footer class="text-center py-6 text-gray-600 text-xs mt-auto">
            System Version 1.1 | Data: SG Agentic Framework (Jan 22, 2026)
        </footer>
    `
}).mount('#app')
