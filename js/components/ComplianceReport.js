export default {
    props: ['answers', 'framework'],
    computed: {
        pillarScores() {
            const scores = {};
            Object.keys(this.framework).forEach(pKey => {
                const rules = this.framework[pKey].rules;
                const pAnswers = this.answers.filter(a => a.pillarId === pKey);

                // If no answers for this pillar, score is 0 purely for display, or could follow logical default
                if (pAnswers.length === 0) {
                    scores[pKey] = 0;
                    return;
                }

                // If we have answers, calculate percentage of 'compliant' ones
                // Note: In a real app we might check if ALL rules in a pillar were answered.
                // Here we assume if they did the module, they did all questions.
                const compliantCount = pAnswers.filter(a => a.compliant).length;
                scores[pKey] = Math.round((compliantCount / rules.length) * 100);
            });
            return scores;
        },
        totalScore() {
            // Simple average of all pillars
            const values = Object.values(this.pillarScores);
            if (values.length === 0) return 0;
            const sum = values.reduce((a, b) => a + b, 0);
            return Math.round(sum / Object.keys(this.framework).length);
        },
        gaps() {
            return this.answers.filter(a => !a.compliant);
        }
    },
    template: `
    <div class="max-w-5xl mx-auto mt-10 animate-fade-in pb-20">
        <div class="text-center mb-10">
            <h2 class="text-4xl font-bold text-white mb-2">Agentic Governance Report</h2>
            <div class="flex items-center justify-center gap-2 text-gray-400 text-sm">
                 <span class="px-2 py-1 bg-gray-800 rounded">Jan 2026 Framework</span>
                 <span>•</span>
                 <span>Generated via AI Compliance Workbench</span>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <!-- Overall Score -->
            <div class="glass-panel p-8 rounded-2xl flex flex-col justify-center items-center text-center md:col-span-1 border-t-4 border-primary">
                <p class="text-gray-400 uppercase text-xs font-bold tracking-widest mb-2">Total Readiness</p>
                <div class="text-6xl font-black text-white mb-2">{{ totalScore }}%</div>
                <div class="text-sm font-medium" :class="totalScore > 80 ? 'text-green-400' : 'text-yellow-400'">
                    {{ totalScore > 80 ? 'Robust' : 'Improvements Needed' }}
                </div>
            </div>

            <!-- Pillar Breakdown -->
            <div class="glass-panel p-6 rounded-2xl md:col-span-2">
                <h3 class="text-white font-bold mb-4">Pillar Breakdown</h3>
                <div class="space-y-4">
                    <div v-for="(data, key) in framework" :key="key" class="flex items-center gap-4">
                        <div class="w-8 text-xl text-center">
                            <span v-if="key === 'pillar_1'">🏛️</span>
                            <span v-else-if="key === 'pillar_2'">👮</span>
                            <span v-else-if="key === 'pillar_3'">🛡️</span>
                            <span v-else>👥</span>
                        </div>
                        <div class="flex-grow">
                             <div class="flex justify-between text-xs mb-1">
                                <span class="text-gray-300 font-medium">{{ data.title }}</span>
                                <span class="text-white font-bold">{{ pillarScores[key] || 0 }}%</span>
                             </div>
                             <div class="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                                 <div class="h-full rounded-full transition-all duration-1000"
                                      :class="pillarScores[key] >= 80 ? 'bg-green-500' : (pillarScores[key] >= 50 ? 'bg-yellow-500' : 'bg-red-500')"
                                      :style="{ width: (pillarScores[key] || 0) + '%' }"></div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Action Items (Gaps) -->
        <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>📋</span> Priority Remediation Plan
        </h3>
        
        <div class="space-y-4">
            <div v-for="gap in gaps" :key="gap.rule.id" 
                class="bg-surface/50 border border-gray-700 rounded-xl p-6 hover:border-red-500/50 transition-colors">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                        <h4 class="text-lg font-bold text-white">{{ gap.rule.title }}</h4>
                        <p class="text-sm text-red-400 font-medium mt-1">⚠️ Gap Detected (Risk: {{ gap.rule.riskLevel }})</p>
                    </div>
                    <div class="text-right">
                         <span class="inline-block px-3 py-1 text-xs font-mono bg-black/40 text-gray-400 rounded">
                            {{ gap.rule.citation }}
                         </span>
                    </div>
                </div>
                
                <div class="bg-gray-900/50 p-4 rounded-lg flex gap-3 mb-3">
                    <div class="text-green-500 mt-0.5">💡</div>
                    <div>
                        <p class="text-xs text-green-500 font-bold uppercase mb-1">Recommendation</p>
                        <p class="text-gray-300 text-sm leading-relaxed">{{ gap.rule.remediation }}</p>
                    </div>
                </div>

                <div v-if="gap.rule.explanation" class="bg-blue-500/10 p-4 rounded-lg flex gap-3 border border-blue-500/20">
                    <div class="text-blue-400 mt-0.5">ℹ️</div>
                    <div>
                        <p class="text-xs text-blue-400 font-bold uppercase mb-1">Why this matters</p>
                        <p class="text-gray-400 text-sm leading-relaxed italic">{{ gap.rule.explanation }}</p>
                    </div>
                </div>
            </div>

            <div v-if="gaps.length === 0" class="p-8 text-center text-gray-500">
                No major gaps identified in the completed modules.
            </div>
        </div>

        <div class="mt-12 text-center pb-10">
            <button onclick="window.print()" class="px-8 py-3 bg-white text-gray-900 font-bold rounded shadow hover:bg-gray-200">
                Print Official Assessment
            </button>
            <button @click="$emit('back')" class="ml-4 px-8 py-3 text-gray-400 font-bold hover:text-white">
                Back to Dashboard
            </button>
        </div>
    </div>
    `
}
