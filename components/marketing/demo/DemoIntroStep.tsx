
import { motion } from "framer-motion";
import { Play, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DemoIntroStepProps {
    onStart: () => void;
}

export function DemoIntroStep({ onStart }: DemoIntroStepProps) {
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                className="relative z-10 text-center px-6 max-w-2xl w-full"
            >
                {/* Background Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[500px] max-h-[300px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 mb-8 backdrop-blur-md">
                        <Sparkles size={12} className="text-cyan-400" />
                        <span>Experiência Interativa</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight font-serif">
                        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/70">
                            Entenda como
                        </span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 font-sans italic">
                            funciona na prática.
                        </span>
                    </h2>

                    <p className="text-lg text-slate-400 mb-10 max-w-lg mx-auto leading-relaxed">
                        Uma demonstração guiada de como transformamos reuniões em planos de ação estruturados em segundos.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onStart}
                        className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white text-slate-900 font-semibold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-300"
                    >
                        <div className="w-10 h-10 rounded-full bg-slate-900/10 flex items-center justify-center group-hover:bg-slate-900/20 transition-colors">
                            <Play size={20} className="fill-slate-900 ml-1" />
                        </div>
                        <span className="tracking-wide">Iniciar Demonstração</span>
                        <ChevronRight className="w-5 h-5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-slate-500" />
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    );
}
