// PolicyGenerator.js - Simplified 10-Question SME Policy Generator
import { ref, computed, onMounted } from 'vue'
import questionsData, { getAllQuestions, getDefaults } from '../data/policy_questions.js'
import PolicyWizardStep from './PolicyWizardStep.js'

export default {
    components: {
        PolicyWizardStep
    },
    emits: ['back', 'generate'],
    setup(props, { emit }) {
        // State management
        const currentView = ref('intro') // 'intro' | 'questionnaire' | 'summary'
        const currentQuestionIndex = ref(0)
        const answers = ref({}) // { questionId: answer }
        const questionList = ref([])

        // Reset state on mount
        onMounted(() => {
            currentView.value = 'intro'
            answers.value = {}
            currentQuestionIndex.value = 0
            questionList.value = getAllQuestions()
        })

        // Start questionnaire
        const startQuestionnaire = () => {
            questionList.value = getAllQuestions()
            currentQuestionIndex.value = 0
            answers.value = {}
            currentView.value = 'questionnaire'
        }

        // Get current question
        const currentQuestion = computed(() => {
            if (questionList.value.length === 0) return null
            return questionList.value[currentQuestionIndex.value]
        })

        const progress = computed(() => ({
            current: currentQuestionIndex.value + 1,
            total: questionList.value.length
        }))

        // Navigate to next question
        const handleAnswer = (answer) => {
            if (currentQuestion.value) {
                // For group type questions, spread the object fields into individual answers
                if (currentQuestion.value.type === 'group' && typeof answer === 'object') {
                    Object.keys(answer).forEach(fieldId => {
                        answers.value[fieldId] = answer[fieldId]
                    })
                    // Also store the whole answer under the question id
                    answers.value[currentQuestion.value.id] = answer
                } else {
                    answers.value[currentQuestion.value.id] = answer
                }
            }

            if (currentQuestionIndex.value < questionList.value.length - 1) {
                currentQuestionIndex.value++
            } else {
                currentView.value = 'summary'
            }
        }

        // Navigate to previous question
        const handleBack = () => {
            if (currentQuestionIndex.value > 0) {
                currentQuestionIndex.value--
            }
        }

        // Skip optional question
        const handleSkip = () => {
            handleAnswer(null)
        }

        // Return to intro
        const backToIntro = () => {
            currentView.value = 'intro'
            answers.value = {}
            currentQuestionIndex.value = 0
        }

        // Generate policy from answers
        const generatePolicy = () => {
            const config = buildConfigFromAnswers()
            emit('generate', config)
        }

        // Build policy config from questionnaire answers
        const buildConfigFromAnswers = () => {
            const defaults = getDefaults()

            // Map answers to config, applying defaults for unanswered questions
            const config = {
                companyName: answers.value['q1'] || 'Your Company',
                industry: answers.value['q2'] || 'technology',
                companySize: answers.value['q3'] || defaults.companySize || 'medium',
                region: answers.value['q4'] || defaults.region,
                policyScope: answers.value['q5'] || defaults.policyScope,
                aiAttitude: answers.value['q6'] || 'cautious',
                approvedTools: mapApprovedTools(answers.value['q7']) || defaults.approvedTools,
                humanReview: answers.value['q8'] || defaults.humanReview,
                prohibitedData: answers.value['q9'] || defaults.prohibitedData,
                responsibility: answers.value['q10'] || defaults.responsibility,
                // Officer information from Q11
                officerRole: answers.value['officerRole'] || 'AI Officer / DPO',
                officerName: answers.value['officerName'] || '[To be designated]',
                officerEmail: answers.value['officerEmail'] || '[compliance@company.com]',
                supplements: {
                    pdpa: ['singapore', 'asia_pacific'].includes(answers.value['q4']),
                    singaporeFramework: true
                }
            }

            return config
        }

        // Map tool selection values to display names
        const mapApprovedTools = (tools) => {
            if (!tools || !Array.isArray(tools)) return null
            const toolNames = {
                'chatgpt': 'ChatGPT (Enterprise)',
                'claude': 'Claude',
                'gemini': 'Gemini',
                'copilot': 'GitHub Copilot',
                'midjourney': 'Midjourney / DALL-E',
                'internal': 'Internal / Custom AI System',
                'other': 'Other (as approved)'
            }
            return tools.map(t => toolNames[t] || t)
        }

        // Get answer display value
        const getAnswerDisplay = (questionId) => {
            const answer = answers.value[questionId]
            if (!answer) return 'Not specified'

            if (Array.isArray(answer)) {
                return answer.length > 0 ? answer.join(', ') : 'None selected'
            }

            // Find the question and get label for the value
            const question = questionList.value.find(q => q.id === questionId)
            if (question && question.options) {
                const option = question.options.find(o => o.value === answer)
                return option ? option.label : answer
            }

            return answer
        }

        return {
            currentView,
            currentQuestionIndex,
            currentQuestion,
            progress,
            answers,
            questionsData,
            startQuestionnaire,
            handleAnswer,
            handleBack,
            handleSkip,
            backToIntro,
            generatePolicy,
            getAnswerDisplay
        }
    },
    template: `
    <div>
        <!-- Intro View -->
        <div v-if="currentView === 'intro'" class="max-w-4xl mx-auto fade-in">
            <div class="text-center mb-12">
                <div class="inline-block p-4 rounded-full bg-primary/10 mb-6">
                    <span class="text-5xl">📋</span>
                </div>
                <h1 class="text-4xl font-bold text-white mb-4">AI Policy Generator</h1>
                <p class="text-xl text-gray-400 max-w-2xl mx-auto">
                    Generate a professional, Singapore-compliant AI usage policy in under 10 minutes.
                </p>
            </div>

            <div class="glass-panel rounded-2xl p-8 border-2 border-primary/30 hover:border-primary transition-all cursor-pointer group"
                 @click="startQuestionnaire">
                <div class="flex items-start justify-between mb-4">
                    <h2 class="text-2xl font-bold text-white">⭐ SME Quick Policy</h2>
                    <span class="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">10 QUESTIONS</span>
                </div>
                
                <div class="h-1 w-full bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
                
                <p class="text-gray-300 mb-4">10 core questions | About 5-8 minutes</p>
                
                <div class="space-y-2 mb-6">
                    <div class="flex items-center gap-2 text-sm text-gray-400">
                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Generates 10+ page professional AI policy</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm text-gray-400">
                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Auto-applies Singapore MGF best practices</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm text-gray-400">
                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Industry-specific regulatory references included</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm text-gray-400">
                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Tone adapts to your company's AI attitude</span>
                    </div>
                </div>
                
                <button class="w-full px-6 py-3 bg-primary hover:bg-indigo-500 text-white rounded-lg transition-all font-bold group-hover:scale-105 transform">
                    Start Questionnaire
                </button>
            </div>

            <div class="mt-8 text-center">
                <p class="text-gray-500 text-sm">
                    ✨ Defaults based on Singapore Model AI Governance Framework (GenAI Edition)
                </p>
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
                :section-title="currentQuestion.sectionTitle || ''"
                @answer="handleAnswer"
                @back="handleBack"
                @skip="handleSkip"
            />
        </div>

        <!-- Summary View -->
        <div v-if="currentView === 'summary'" class="max-w-4xl mx-auto fade-in">
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
                            <span class="text-gray-400">Company:</span>
                            <span class="text-white font-medium ml-2">{{ getAnswerDisplay('q1') }}</span>
                        </div>
                        <div>
                            <span class="text-gray-400">Industry:</span>
                            <span class="text-white font-medium ml-2">{{ getAnswerDisplay('q2') }}</span>
                        </div>
                        <div>
                            <span class="text-gray-400">Size:</span>
                            <span class="text-white font-medium ml-2">{{ getAnswerDisplay('q3') }}</span>
                        </div>
                        <div>
                            <span class="text-gray-400">AI Attitude:</span>
                            <span class="text-white font-medium ml-2">{{ getAnswerDisplay('q6') }}</span>
                        </div>
                        <div class="col-span-2">
                            <span class="text-gray-400">Approved Tools:</span>
                            <span class="text-white font-medium ml-2">{{ getAnswerDisplay('q7') }}</span>
                        </div>
                    </div>
                </div>

                <div class="flex gap-4">
                    <button 
                        @click="backToIntro"
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
