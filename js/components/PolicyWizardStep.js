// Policy Wizard Step Component
// Similar to WizardStep but adapted for policy questions

export default {
    props: {
        question: {
            type: Object,
            required: true
        },
        answer: {
            default: null
        },
        progress: {
            type: Object,
            required: true  // { current: 5, total: 22 }
        },
        sectionTitle: {
            type: String,
            required: true
        }
    },
    emits: ['answer', 'back', 'skip'],
    data() {
        return {
            selectedValue: null,
            selectedValues: [],
            textValue: '',
            customInputs: {},
            groupValues: {}  // For group question type
        }
    },
    mounted() {
        // Initialize with existing answer if any
        if (this.answer !== null && this.answer !== undefined) {
            if (this.question.type === 'multiple') {
                this.selectedValues = Array.isArray(this.answer) ? [...this.answer] : []
            } else if (this.question.type === 'text') {
                this.textValue = this.answer || ''
            } else if (this.question.type === 'group') {
                // Initialize group values from answer object
                this.groupValues = typeof this.answer === 'object' ? { ...this.answer } : {}
            } else {
                this.selectedValue = this.answer
            }
        }
        // Initialize group values with empty strings for subfields
        if (this.question.type === 'group' && this.question.subfields) {
            this.question.subfields.forEach(field => {
                if (!this.groupValues[field.id]) {
                    this.groupValues[field.id] = ''
                }
            })
        }
    },
    methods: {
        handleAnswer() {
            let answerValue = null

            if (this.question.type === 'text') {
                answerValue = this.textValue.trim()
                if (this.question.required && !answerValue) {
                    alert('This question is required')
                    return
                }
            } else if (this.question.type === 'single') {
                answerValue = this.selectedValue
                if (this.question.required && !answerValue) {
                    alert('Please select an option')
                    return
                }
            } else if (this.question.type === 'multiple') {
                answerValue = this.selectedValues
                if (this.question.required && answerValue.length === 0) {
                    alert('Please select at least one option')
                    return
                }
                // Include custom inputs if any
                Object.keys(this.customInputs).forEach(optionValue => {
                    if (this.selectedValues.includes(optionValue) && this.customInputs[optionValue]) {
                        answerValue.push(`${optionValue}:${this.customInputs[optionValue]}`)
                    }
                })
            } else if (this.question.type === 'group') {
                // Emit each subfield value separately so they can be mapped to config
                answerValue = { ...this.groupValues }
                // Also emit individual values to parent for easy mapping
                this.$emit('answer', answerValue)
                return
            }

            this.$emit('answer', answerValue)
        },

        handleBack() {
            this.$emit('back')
        },

        handleSkip() {
            if (!this.question.required) {
                this.$emit('skip')
            }
        },

        toggleMultipleChoice(value) {
            const index = this.selectedValues.indexOf(value)
            if (index > -1) {
                this.selectedValues.splice(index, 1)
            } else {
                this.selectedValues.push(value)
            }
        }
    },
    template: `
    <div class="max-w-4xl mx-auto mt-10 p-8 glass-panel rounded-2xl shadow-2xl transition-all duration-500 ease-in-out transform">
        <!-- Progress Bar -->
        <div class="mb-6">
            <div class="flex justify-between items-center mb-2">
                <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">{{ sectionTitle }}</span>
                <span class="text-xs font-bold text-primary">Question {{ progress.current }} of {{ progress.total }}</span>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-2">
                <div class="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300" 
                     :style="{ width: (progress.current / progress.total * 100) + '%' }"></div>
            </div>
        </div>
        
        <!-- Question -->
        <div class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-3">
                <span v-if="question.required" class="text-red-400">*</span>
                {{ question.question }}
            </h2>
            <p v-if="question.description" class="text-gray-400 text-sm">{{ question.description }}</p>
            <p v-if="question.helpText" class="text-gray-500 text-xs mt-2 italic">{{ question.helpText }}</p>
        </div>
        
        <!-- Answer Input: Text -->
        <div v-if="question.type === 'text'" class="mb-8">
            <input 
                v-model="textValue"
                type="text" 
                :placeholder="question.placeholder || ''"
                class="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary placeholder-gray-500 transition-colors"
                @keyup.enter="handleAnswer"
            >
        </div>
        
        <!-- Answer Input: Group (Multiple Text Fields) -->
        <div v-if="question.type === 'group'" class="mb-8 space-y-4">
            <div v-for="field in question.subfields" :key="field.id" class="space-y-2">
                <label class="block text-sm font-medium text-gray-300">
                    {{ field.label }}
                    <span v-if="field.required" class="text-red-400">*</span>
                </label>
                <input 
                    v-model="groupValues[field.id]"
                    type="text" 
                    :placeholder="field.placeholder || ''"
                    class="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary placeholder-gray-500 transition-colors"
                >
            </div>
        </div>
        
        <!-- Answer Input: Single Choice -->
        <div v-if="question.type === 'single'" class="space-y-3 mb-8">
            <button 
                v-for="option in question.options" 
                :key="option.value"
                @click="selectedValue = option.value"
                class="w-full text-left p-4 rounded-xl border-2 transition-all"
                :class="selectedValue === option.value 
                    ? 'border-primary bg-primary/10 text-white' 
                    : 'border-gray-700 hover:border-gray-500 text-gray-300'"
            >
                <div class="flex items-center gap-3">
                    <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                         :class="selectedValue === option.value ? 'border-primary' : 'border-gray-600'">
                        <div v-if="selectedValue === option.value" class="w-3 h-3 rounded-full bg-primary"></div>
                    </div>
                    <span class="font-medium">{{ option.label }}</span>
                </div>
                <div v-if="option.allowCustom && selectedValue === option.value" class="mt-3 ml-8">
                    <input 
                        v-model="customInputs[option.value]"
                        type="text" 
                        placeholder="Please specify..."
                        class="w-full px-3 py-2 bg-black/50 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-primary"
                        @click.stop
                    >
                </div>
            </button>
        </div>
        
        <!-- Answer Input: Multiple Choice -->
        <div v-if="question.type === 'multiple'" class="mb-8">
            <!-- Grouped options -->
            <div v-if="question.groups" class="space-y-6">
                <div v-for="group in question.groups" :key="group.label" class="space-y-2">
                    <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider">{{ group.label }}</h4>
                    <div class="space-y-2">
                        <button 
                            v-for="option in group.options" 
                            :key="option.value"
                            @click="toggleMultipleChoice(option.value)"
                            class="w-full text-left p-3 rounded-lg border transition-all"
                            :class="selectedValues.includes(option.value) 
                                ? 'border-primary bg-primary/5 text-white' 
                                : 'border-gray-700 hover:border-gray-600 text-gray-300'"
                        >
                            <div class="flex items-center gap-3">
                                <div class="w-5 h-5 rounded border-2 flex items-center justify-center transition-all"
                                     :class="selectedValues.includes(option.value) ? 'border-primary bg-primary' : 'border-gray-600'">
                                    <svg v-if="selectedValues.includes(option.value)" class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <span class="text-sm font-medium">{{ option.label }}</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Ungrouped options -->
            <div v-else class="space-y-2">
                <button 
                    v-for="option in question.options" 
                    :key="option.value"
                    @click="toggleMultipleChoice(option.value)"
                    class="w-full text-left p-3 rounded-lg border transition-all"
                    :class="selectedValues.includes(option.value) 
                        ? 'border-primary bg-primary/5 text-white' 
                        : 'border-gray-700 hover:border-gray-600 text-gray-300'"
                >
                    <div class="flex items-center gap-3">
                        <div class="w-5 h-5 rounded border-2 flex items-center justify-center transition-all"
                             :class="selectedValues.includes(option.value) ? 'border-primary bg-primary' : 'border-gray-600'">
                            <svg v-if="selectedValues.includes(option.value)" class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <span class="text-sm font-medium">{{ option.label }}</span>
                    </div>
                    <div v-if="option.allowCustom && selectedValues.includes(option.value)" class="mt-2 ml-8">
                        <input 
                            v-model="customInputs[option.value]"
                            type="text" 
                            placeholder="Please specify..."
                            class="w-full px-3 py-2 bg-black/50 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-primary"
                            @click.stop
                        >
                    </div>
                </button>
            </div>
        </div>
        
        <!-- Navigation Buttons -->
        <div class="flex justify-between items-center pt-4 border-t border-gray-700">
            <button 
                @click="handleBack"
                v-if="progress.current > 1"
                class="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Previous
            </button>
            <div v-else></div>
            
            <div class="flex gap-3">
                <button 
                    v-if="!question.required"
                    @click="handleSkip"
                    class="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-400 rounded-lg transition-colors font-medium"
                >
                    Skip
                </button>
                <button 
                    @click="handleAnswer"
                    class="px-8 py-3 bg-gradient-to-r from-primary to-secondary hover:from-indigo-500 hover:to-pink-600 text-white rounded-lg transition-all font-bold flex items-center gap-2 shadow-lg"
                >
                    Next
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </div>
        
        <!-- Required Notice -->
        <div v-if="question.required" class="mt-4 text-center text-xs text-gray-500">
            * This question is required
        </div>
    </div>
    `
}

