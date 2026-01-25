export default {
    props: ['rule', 'active'],
    emits: ['answer'],
    template: `
    <div v-if="active" class="max-w-3xl mx-auto mt-10 p-6 glass-panel rounded-2xl shadow-2xl transition-all duration-500 ease-in-out transform">
        <div class="flex items-center justify-between mb-4">
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-gray-700 text-gray-300 uppercase tracking-wider">
                {{ rule.category }}
            </span>
            <span v-if="rule.riskLevel === 'Critical'" class="px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                Critical Risk
            </span>
            <span v-else class="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                {{ rule.riskLevel }} Risk
            </span>
        </div>

        <h2 class="text-2xl font-bold text-white mb-4">{{ rule.title }}</h2>
        <p class="text-gray-300 mb-8 text-lg leading-relaxed">{{ rule.description }}</p>
        
        <div class="bg-surface/50 p-6 rounded-xl border border-gray-600 mb-8">
            <p class="font-medium text-primary mb-2 text-sm uppercase">Assessment Question</p>
            <p class="text-xl text-white font-semibold">{{ rule.question }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <button @click="$emit('answer', true)" 
                class="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-gray-700 hover:border-green-500 hover:bg-green-500/10 transition-all group">
                <span class="text-3xl mb-2 group-hover:scale-110 transition-transform">✅</span>
                <span class="font-bold text-gray-300 group-hover:text-green-400">Yes, Compliant</span>
            </button>
            <button @click="$emit('answer', false)"
                class="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-gray-700 hover:border-red-500 hover:bg-red-500/10 transition-all group">
                <span class="text-3xl mb-2 group-hover:scale-110 transition-transform">❌</span>
                <span class="font-bold text-gray-300 group-hover:text-red-400">No, Gap Identified</span>
            </button>
        </div>

        <div class="mt-6 text-center text-xs text-gray-500">
            Reference: {{ rule.citation }}
        </div>
    </div>
    `
}
