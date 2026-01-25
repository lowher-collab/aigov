export default {
    props: ['pillarId', 'data', 'progress'],
    emits: ['select'],
    template: `
    <div @click="$emit('select')" 
        class="glass-panel p-6 rounded-2xl cursor-pointer hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
        
        <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary opacity-50 group-hover:opacity-100 transition-opacity"></div>
        
        <div class="flex justify-between items-start mb-4">
            <div class="p-3 rounded-lg bg-surface border border-gray-700 group-hover:bg-primary/20 group-hover:border-primary/30 transition-colors">
                <span class="text-2xl" v-if="pillarId === 'pillar_1'">🏛️</span>
                <span class="text-2xl" v-else-if="pillarId === 'pillar_2'">👮</span>
                <span class="text-2xl" v-else-if="pillarId === 'pillar_3'">🛡️</span>
                <span class="text-2xl" v-else>👥</span>
            </div>
            <div class="text-right">
                <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Progress</span>
                <div class="text-xl font-bold font-mono" :class="{'text-green-400': progress === 100, 'text-white': progress < 100}">
                    {{ progress }}%
                </div>
            </div>
        </div>

        <h3 class="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors min-h-[3.5rem] flex items-center">
            {{ data.title }}
        </h3>
        
        <p class="text-gray-400 text-sm mb-6 h-10 overflow-hidden">
            {{ data.description }}
        </p>

        <div class="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <div class="bg-gradient-to-r from-primary to-secondary h-full transition-all duration-500"
                :style="{ width: progress + '%' }"></div>
        </div>

        <div class="mt-4 flex items-center text-xs font-bold text-gray-500 group-hover:text-gray-300">
            <span>START MODULE</span>
            <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </div>
    </div>
    `
}
