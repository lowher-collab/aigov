// PolicyGenerator.js - Questionnaire-based Policy Generator
import { ref, computed, onMounted } from 'vue'
import { policyQuestions, getQuestionsForMode, getQuestionCount } from '../data/policy_questions.js'
import PolicyWizardStep from './PolicyWizardStep.js'

export default {
    components: {
        PolicyWizardStep
    },
    emits: ['back', 'generate'],
    setup(props, { emit }) {
        // State management
        const currentView = ref('mode-selection') // 'mode-selection' | 'questionnaire' | 'summary'
        const selectedMode = ref(null) // 'standard' | 'complete'
        const currentQuestionIndex = ref(0)
        const answers = ref({}) // { questionId: answer }
        const questionList = ref([])

        // Reset state on mount to prevent stale data
        onMounted(() => {
            currentView.value = 'mode-selection'
            answers.value = {}
            currentQuestionIndex.value = 0
            questionList.value = []
            selectedMode.value = null
        })

        // Start questionnaire with selected mode
        const startQuestionnaire = (mode) => {
            selectedMode.value = mode
            const questions = getQuestionsForMode(mode)

            if (!questions || questions.length === 0) {
                console.error("Failed to load questions for mode:", mode)
                alert("Error: Questions failed to load. Please refresh the page.")
                return
            }

            questionList.value = questions
            currentQuestionIndex.value = 0
            answers.value = {}
            currentView.value = 'questionnaire'
        }

        // Get current section and question
        const currentSection = computed(() => {
            if (questionList.value.length === 0) return null

            let questionCount = 0
            for (const section of questionList.value) {
                if (currentQuestionIndex.value < questionCount + section.questions.length) {
                    return section
                }
                questionCount += section.questions.length
            }
            return null
        })

        const currentQuestion = computed(() => {
            if (!currentSection.value) return null

            let questionCount = 0
            for (const section of questionList.value) {
                if (section.id === currentSection.value.id) {
                    const indexInSection = currentQuestionIndex.value - questionCount
                    return section.questions[indexInSection]
                }
                questionCount += section.questions.length
            }
            return null
        })

        const progress = computed(() => ({
            current: currentQuestionIndex.value + 1,
            total: getTotalQuestions()
        }))

        // Get total questions count
        const getTotalQuestions = () => {
            return questionList.value.reduce((total, section) =>
                total + section.questions.length, 0
            )
        }

        // Check if question should be shown (conditional logic)
        const shouldShowQuestion = (question) => {
            if (!question.conditionalOn) return true

            const condition = question.conditionalOn
            const dependentAnswer = answers.value[condition.questionId]

            if (Array.isArray(condition.value)) {
                return condition.value.includes(dependentAnswer)
            }
            return dependentAnswer === condition.value
        }

        // Navigate to next question
        const handleAnswer = (answer) => {
            if (currentQuestion.value) {
                answers.value[currentQuestion.value.id] = answer
            }

            // Move to next question, skipping conditional ones
            let nextIndex = currentQuestionIndex.value + 1
            while (nextIndex < getTotalQuestions()) {
                const nextQ = getQuestionByIndex(nextIndex)
                if (shouldShowQuestion(nextQ)) {
                    currentQuestionIndex.value = nextIndex
                    return
                }
                nextIndex++
            }

            // All questions answered
            if (nextIndex >= getTotalQuestions()) {
                currentView.value = 'summary'
            }
        }

        // Navigate to previous question
        const handleBack = () => {
            if (currentQuestionIndex.value > 0) {
                let prevIndex = currentQuestionIndex.value - 1
                while (prevIndex >= 0) {
                    const prevQ = getQuestionByIndex(prevIndex)
                    if (shouldShowQuestion(prevQ)) {
                        currentQuestionIndex.value = prevIndex
                        return
                    }
                    prevIndex--
                }
            }
        }

        // Skip optional question
        const handleSkip = () => {
            handleAnswer(null)
        }

        // Get question by absolute index
        const getQuestionByIndex = (index) => {
            let count = 0
            for (const section of questionList.value) {
                if (index < count + section.questions.length) {
                    return section.questions[index - count]
                }
                count += section.questions.length
            }
            return null
        }

        // Return to mode selection
        const backToModeSelection = () => {
            currentView.value = 'mode-selection'
            answers.value = {}
            currentQuestionIndex.value = 0
        }

        // Generate policy from answers
        const generatePolicy = () => {
            if (Object.keys(answers.value).length === 0) {
                alert("Please answer questions before generating policy.")
                return
            }
            const config = buildConfigFromAnswers()
            emit('generate', config)
        }

        // Build policy config from questionnaire answers
        const buildConfigFromAnswers = () => {
            const config = {
                companyInfo: {
                    name: answers.value['1.1'] || 'Your Company',  // Fixed: was companyName
                    industry: answers.value['1.2'] || 'Technology',
                    size: answers.value['1.3'] || 'medium',  // Fixed: was companySize
                    hasExistingPolicy: false
                },
                approvedTools: parseApprovedTools(answers.value['2.1']),
                accessControl: answers.value['2.2'],
                hasProhibitions: answers.value['2.3'] === 'yes',
                prohibitedTools: answers.value['2.3.1'] || [],
                useCases: answers.value['2.4'] || [],
                specialUseCases: answers.value['2.5'],
                humanReview: answers.value['3.1'],
                hallucinationPrevention: answers.value['3.2'] || [],
                supervisorNotification: answers.value['3.3'],
                originalityPolicy: answers.value['3.4'],
                biasChecking: answers.value['3.5'],
                hrDecisions: answers.value['3.6'],
                publicDisclosure: answers.value['4.1'],
                mediaGeneration: answers.value['4.2'] || [],
                codeReview: answers.value['4.3'],
                copyrightProtection: answers.value['4.4'] || [],
                prohibitedData: answers.value['5.1'] || [],
                dataMinimization: answers.value['5.2'],
                dataAnonymization: answers.value['5.3'],
                vendorDataUsage: answers.value['5.4'],
                hasPersonalData: answers.value['5.5'] === 'yes',
                privacyRegulations: answers.value['5.5.1'] || [],
                ultimateResponsibility: answers.value['6.1'],
                hasAIofficer: answers.value['6.2'],
                aiOfficerRole: answers.value['6.2.1'],
                disclosureRequirements: answers.value['6.3'] || [],
                auditRecords: answers.value['6.4'],
                hasGovernanceBoard: answers.value['7.1'],
                boardComposition: answers.value['7.1.1'] || [],
                useCaseApproval: answers.value['7.2'],
                hasTraining: answers.value['7.3'],
                trainingContent: answers.value['7.3.1'] || [],
                reviewFrequency: answers.value['7.4'],
                hasRegistry: answers.value['7.5'],
                violationConsequences: answers.value['8.1'] || [],
                violationHandler: answers.value['8.2'],
                reportingMechanism: answers.value['8.3'],
                hasIndustryRegulation: answers.value['8.4'] === 'yes',
                securityMeasures: answers.value['9.1'] || [],
                hasIncidentReporting: answers.value['9.2'],
                incidentTypes: answers.value['9.2.1'] || [],
                thirdPartyAudit: answers.value['9.3'],
                riskAssessment: answers.value['9.4'],
                customRequirements: answers.value['10.2'],
                supplements: {
                    pdpa: (answers.value['5.5.1'] || []).includes('pdpa'),
                    singaporeFramework: true
                },
                quality: selectedMode.value === 'complete' ? 'comprehensive' : 'standard'
            }

            return config
        }

        // Parse approved tools from multi-select
        const parseApprovedTools = (toolsAnswer) => {
            if (!toolsAnswer || !Array.isArray(toolsAnswer)) return []

            const tools = []
            toolsAnswer.forEach(item => {
                if (item.includes(':')) {
                    const [type, custom] = item.split(':')
                    tools.push(custom)
                } else {
                    tools.push(item)
                }
            })
            return tools
        }

        return {
            currentView,
            selectedMode,
            currentQuestionIndex,
            currentQuestion,
            currentSection,
            progress,
            answers,
            policyQuestions,
            startQuestionnaire,
            handleAnswer,
            handleBack,
            handleSkip,
            backToModeSelection,
            generatePolicy,
            getTotalQuestions
        }
    },
    template: `
    <div>
        <!-- Mode Selection View -->
        <div v-if="currentView === 'mode-selection'" class="max-w-5xl mx-auto">
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold text-white mb-4">Generate AI Policy</h1>
                <p class="text-xl text-gray-400">Choose your questionnaire mode</p>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
                <!-- Standard Mode -->
                <div class="glass-panel rounded-2xl p-8 border-2 border-primary/30 hover:border-primary transition-all cursor-pointer group"
                     @click="startQuestionnaire('standard')">
                    <div class="flex items-start justify-between mb-4">
                        <h2 class="text-2xl font-bold text-white">⭐ Standard Version</h2>
                        <span class="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">RECOMMENDED</span>
                    </div>
                    
                    <div class="h-1 w-full bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
                    
                    <p class="text-gray-300 mb-4">22 core questions | About 8-10 minutes</p>
                    
                    <div class="space-y-2 mb-6">
                        <div class="flex items-center gap-2 text-sm text-gray-400">
                            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>Covers all policy chapters</span>
                        </div>
                        <div class="flex items-center gap-2 text-sm text-gray-400">
                            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>Generates complete professional AI policy</span>
                        </div>
                    </div>
                    
                    <button class="w-full px-6 py-3 bg-primary hover:bg-indigo-500 text-white rounded-lg transition-all font-bold group-hover:scale-105 transform">
                        Start Standard Questionnaire
                    </button>
                </div>

                <!-- Complete Mode -->
                <div class="glass-panel rounded-2xl p-8 border-2 border-gray-700 hover:border-secondary transition-all cursor-pointer group"
                     @click="startQuestionnaire('complete')">
                    <h2 class="text-2xl font-bold text-white mb-4">🎯 Complete Version</h2>
                    
                    <div class="h-1 w-full bg-gradient-to-r from-secondary to-primary rounded-full mb-6"></div>
                    
                    <p class="text-gray-300 mb-4">48 detailed questions | About 18-22 minutes</p>
                    
                    <div class="space-y-2 mb-6">
                        <div class="flex items-center gap-2 text-sm text-gray-400">
                            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>Includes advanced security assessment</span>
                        </div>
                        <div class="flex items-center gap-2 text-sm text-gray-400">
                            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>Industry customization & compliance</span>
                        </div>
                        <div class="flex items-center gap-2 text-sm text-gray-400">
                            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>Suitable for high compliance requirements</span>
                        </div>
                    </div>
                    
                    <button class="w-full px-6 py-3 bg-secondary hover:bg-pink-600 text-white rounded-lg transition-all font-bold group-hover:scale-105 transform">
                        Start Complete Questionnaire
                    </button>
                </div>
            </div>
        </div>

        <!-- Questionnaire View -->
        <div v-if="currentView === 'questionnaire'">
            <PolicyWizardStep 
                v-if="currentQuestion"
                :key="currentQuestion.id"
                :question="currentQuestion"
                :answer="answers[currentQuestion.id]"
                :progress="progress"
                :section-title="currentSection?.title || ''"
                @answer="handleAnswer"
                @back="handleBack"
                @skip="handleSkip"
            />
        </div>

        <!-- Summary View -->
        <div v-if="currentView === 'summary'" class="max-w-4xl mx-auto">
            <div class="glass-panel rounded-2xl p-8">
                <div class="text-center mb-8">
                    <div class="inline-block p-4 rounded-full bg-green-500/10 mb-4">
                        <svg class="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h2 class="text-3xl font-bold text-white mb-2">Questionnaire Completed!</h2>
                    <p class="text-gray-400">Ready to generate your customized AI policy</p>
                </div>

                <div class="bg-surface/50 rounded-xl p-6 mb-8">
                    <h3 class="text-lg font-bold text-white mb-4">Summary</h3>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span class="text-gray-400">Mode:</span>
                            <span class="text-white font-medium ml-2">{{ selectedMode === 'standard' ? 'Standard' : 'Complete' }}</span>
                        </div>
                        <div>
                            <span class="text-gray-400">Questions Answered:</span>
                            <span class="text-white font-medium ml-2">{{ Object.keys(answers).length }}</span>
                        </div>
                        <div>
                            <span class="text-gray-400">Company:</span>
                            <span class="text-white font-medium ml-2">{{ answers['1.1'] || 'Not provided' }}</span>
                        </div>
                        <div>
                            <span class="text-gray-400">Industry:</span>
                            <span class="text-white font-medium ml-2">{{ answers['1.2'] || 'Not specified' }}</span>
                        </div>
                    </div>
                </div>

                <div class="flex gap-4">
                    <button 
                        @click="backToModeSelection"
                        class="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
                    >
                        Start Over
                    </button>
                    <button 
                        @click="generatePolicy"
                        class="flex-1 px-8 py-3 bg-gradient-to-r from-primary to-secondary hover:from-indigo-500 hover:to-pink-600 text-white rounded-lg transition-all font-bold shadow-lg"
                    >
                        Generate Policy Document
                    </button>
                </div>
            </div>
        </div>
    </div>
    `
}
