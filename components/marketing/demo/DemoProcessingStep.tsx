import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Brain, Check, Loader2 } from "lucide-react";

interface DemoProcessingStepProps {
    isActive: boolean;
}

const processingSteps = [
    { text: "Identificando responsáveis...", duration: 800 },
    { text: "Extraindo datas e prazos...", duration: 600 },
    { text: "Detectando prioridades...", duration: 500 },
    { text: "Criando tarefas...", duration: 700 }
];

const textToScan = "Precisamos entregar o relatório até sexta-feira... Eu fico responsável pela análise de dados. Vou fazer a revisão final no sábado.";

// Orbiting particles around brain
const OrbitingParticle = ({ index, total, isAnimating }: { index: number; total: number; isAnimating: boolean; key?: any }) => {
    const angle = (index / total) * 360;
    return (
        <motion.div
            className="absolute w-2 h-2 rounded-full bg-violet-400"
            style={{
                left: '50%',
                top: '50%',
            }}
            animate={isAnimating ? {
                x: [
                    Math.cos((angle * Math.PI) / 180) * 30,
                    Math.cos(((angle + 360) * Math.PI) / 180) * 30,
                ],
                y: [
                    Math.sin((angle * Math.PI) / 180) * 30,
                    Math.sin(((angle + 360) * Math.PI) / 180) * 30,
                ],
                scale: [0.8, 1.2, 0.8],
                opacity: [0.4, 1, 0.4],
            } : { x: Math.cos((angle * Math.PI) / 180) * 30, y: Math.sin((angle * Math.PI) / 180) * 30, scale: 1, opacity: 0.6 }}
            transition={isAnimating ? {
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.2
            } : { duration: 0.5 }}
        />
    );
};

export function DemoProcessingStep({ isActive }: DemoProcessingStepProps) {
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [currentProcessingStep, setCurrentProcessingStep] = useState(0);
    const [scanPosition, setScanPosition] = useState(0);

    useEffect(() => {
        if (!isActive) return;

        // Animate scan line
        const scanInterval = setInterval(() => {
            setScanPosition(prev => (prev + 2) % 100);
        }, 50);

        // Process steps sequentially
        let totalDelay = 500;
        processingSteps.forEach((step, index) => {
            if (completedSteps.includes(index)) return;

            setTimeout(() => {
                setCurrentProcessingStep(index);
            }, totalDelay);

            setTimeout(() => {
                setCompletedSteps(prev => {
                    if (prev.includes(index)) return prev;
                    return [...prev, index];
                });
            }, totalDelay + step.duration);

            totalDelay += step.duration + 300;
        });

        return () => clearInterval(scanInterval);
    }, [isActive, completedSteps]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl h-full border border-white/5"
        >
            {/* Processing Header */}
            <div className="p-4 border-b border-slate-800 bg-gradient-to-r from-indigo-950/50 to-violet-950/50">
                <div className="flex items-center gap-3">
                    <motion.div
                        animate={isActive ? {
                            rotate: 360,
                            scale: [1, 1.1, 1]
                        } : { rotate: 0, scale: 1 }}
                        transition={isActive ? {
                            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                            scale: { duration: 1, repeat: Infinity }
                        } : { duration: 0.5 }}
                    >
                        <Brain className="w-5 h-5 text-violet-400" />
                    </motion.div>
                    <span className="text-sm font-medium text-white">Processando com IA...</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
                {/* Text being scanned */}
                <div className="relative p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
                    <p className="text-sm text-slate-300 leading-relaxed relative z-10">
                        {textToScan}
                    </p>
                    {/* Scan line */}
                    <motion.div
                        className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-violet-400 to-transparent opacity-60"
                        animate={{ left: `${scanPosition}%` }}
                        transition={{ duration: 0.1, ease: "linear" }}
                    />
                    {/* Highlight overlay following scan */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-transparent"
                        animate={{ width: `${scanPosition}%` }}
                        transition={{ duration: 0.1, ease: "linear" }}
                    />
                </div>

                {/* Brain with orbiting particles */}
                <div className="flex justify-center">
                    <div className="relative w-20 h-20">
                        {/* Glow effect */}
                        <motion.div
                            animate={isActive ? {
                                scale: [1, 1.3, 1],
                                opacity: [0.3, 0.6, 0.3]
                            } : { scale: 1.1, opacity: 0.4 }}
                            transition={isActive ? { duration: 2, repeat: Infinity } : { duration: 1 }}
                            className="absolute inset-0 bg-violet-500/30 rounded-full blur-xl"
                        />

                        {/* Brain icon */}
                        <motion.div
                            animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                            transition={isActive ? { duration: 1.5, repeat: Infinity } : { duration: 0.5 }}
                            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full border-2 border-violet-400/50 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                        >
                            <Brain className="w-8 h-8 text-white" />
                        </motion.div>

                        {/* Orbiting particles */}
                        {[...Array(6)].map((_, i) => (
                            <OrbitingParticle key={i} index={i} total={6} isAnimating={isActive} />
                        ))}
                    </div>
                </div>

                {/* Processing checklist */}
                <div className="space-y-3 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30">
                    {processingSteps.map((step, index) => {
                        const isCompleted = completedSteps.includes(index);
                        const isCurrent = currentProcessingStep === index && !isCompleted;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-5 h-5 flex items-center justify-center">
                                    {isCompleted ? (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring" }}
                                        >
                                            <Check className="w-5 h-5 text-emerald-400" />
                                        </motion.div>
                                    ) : isCurrent ? (
                                        <motion.div
                                            animate={isActive ? { rotate: 360 } : { rotate: 0 }}
                                            transition={isActive ? { duration: 1, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
                                        >
                                            <Loader2 className="w-5 h-5 text-violet-400" />
                                        </motion.div>
                                    ) : (
                                        <div className="w-4 h-4 rounded-full border-2 border-slate-600" />
                                    )}
                                </div>
                                <span className={`text-sm ${isCompleted ? "text-emerald-300" :
                                    isCurrent ? "text-violet-300" :
                                        "text-slate-500"
                                    }`}>
                                    {step.text}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}

