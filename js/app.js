import { createApp, ref, computed } from 'vue'
import NavBar from './components/NavBar.js'
import ModuleCard from './components/ModuleCard.js'
import WizardStep from './components/WizardStep.js'
import ComplianceReport from './components/ComplianceReport.js'
import ResourcesView from './components/ResourcesView.js'
import { agenticFramework } from './data/rules_agentic.js'

createApp({
    components: {
        NavBar,
        ModuleCard,
        WizardStep,
        ComplianceReport,
        ResourcesView
    },
    setup() {
        // App State: 'landing' | 'dashboard' | 'wizard' | 'report' | 'resources'
        const viewState = ref('landing')
        const previousViewState = ref('landing')

        // Active Module Tracking
        const activePillarKey = ref(null)
        const currentQuestionIndex = ref(0)

        // Data Store
        const answers = ref([]) // Array of { pillarId, ruleId, compliant, rule }

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

        return {
            agenticFramework,
            viewState,
            activeRule,
            isWizardActive,
            answers,
            activePillarKey,
            startApp,
            openModule,
            submitAnswer,
            getPillarProgress,
            viewReport,
            backToDashboard,
            isAssessmentComplete,
            showResources,
            backFromResources
        }
    },
    template: `
        <NavBar @nav-resources="showResources" />
        
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
                                <span class="text-xs font-bold text-primary uppercase tracking-widest mb-2">Global Breaking News</span>
                                <h3 class="text-2xl font-bold text-white mb-3">Singapore Launches World's First Agentic AI Framework</h3>
                                <p class="text-gray-400 text-sm mb-4 leading-relaxed">
                                    At Davos 2026, Singapore defined the global standard for governing autonomous agents. This framework addresses the unique risks of "Agentic Loops" and "Tool Use" that traditional LLM guidance missed.
                                </p>
                                <a href="https://www.imda.gov.sg" target="_blank" class="text-primary font-bold hover:text-white transition-colors flex items-center gap-1 text-sm">
                                    Read Press Release →
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
                    
                    <form onsubmit="event.preventDefault(); alert('Subscribed! (Demo Only)')" class="flex gap-2 relative z-10">
                        <input type="email" placeholder="Enter your work email" required
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

        </main>
        
        <footer class="text-center py-6 text-gray-600 text-xs mt-auto">
            System Version 1.1 | Data: SG Agentic Framework (Jan 22, 2026)
        </footer>
    `
}).mount('#app')
