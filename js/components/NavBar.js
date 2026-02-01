export default {
    template: `
    <nav class="border-b border-gray-700 bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                        AI
                    </div>
                    <span class="font-bold text-xl tracking-tight text-white">Singapore AI Compliance <span class="text-primary font-light">Workbench</span></span>
                </div>
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-4">
                        <span class="px-3 py-2 rounded-md text-sm font-medium text-white bg-white/10">Agentic Framework 2026</span>
                        <!-- <button @click="$emit('nav-policy')" class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">📋 Generate Policy</button> -->
                        <button @click="$emit('nav-resources')" class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Resources</button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    `
}
