import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface DemoRecordingStepProps {
    isActive: boolean;
}

// Animated waveform bars
const WaveformBars = ({ isAnimating }: { isAnimating: boolean }) => (
    <div className="flex items-center gap-0.5 h-8">
        {[...Array(32)].map((_, i) => (
            <motion.div
                key={i}
                className="w-1 bg-gradient-to-t from-violet-500 to-violet-300 rounded-full"
                animate={isAnimating ? {
                    height: [4, 16 + Math.random() * 16, 4],
                } : { height: 8 }}
                transition={isAnimating ? {
                    duration: 0.6 + Math.random() * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.03
                } : { duration: 0.3 }}
            />
        ))}
    </div>
);

// Typing text component with character-by-character animation
const TypingText = ({ text, delay = 0, highlightWords = [], isActive = true }: { text: string; delay?: number; highlightWords?: string[]; isActive?: boolean }) => {
    const [displayedChars, setDisplayedChars] = useState(0);

    useEffect(() => {
        if (!isActive) return;

        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                setDisplayedChars(prev => {
                    if (prev >= text.length) {
                        clearInterval(interval);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 40);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timer);
    }, [text, delay, isActive]);

    const words = text.slice(0, displayedChars).split(' ');

    return (
        <span>
            {words.map((word, i) => {
                const isHighlight = highlightWords.some(hw => word.toLowerCase().includes(hw.toLowerCase()));
                return (
                    <span key={i}>
                        <span className={isHighlight ? "bg-yellow-400/30 text-yellow-200 px-1 rounded" : ""}>
                            {word}
                        </span>
                        {i < words.length - 1 ? ' ' : ''}
                    </span>
                );
            })}
            {isActive && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-0.5 h-4 bg-white/80 ml-0.5"
                />
            )}
        </span>
    );
};

const transcriptLines = [
    {
        speaker: "João",
        initials: "JM",
        color: "bg-blue-500",
        text: "Precisamos entregar o relatório até sexta-feira...",
        highlights: ["sexta-feira", "relatório"]
    },
    {
        speaker: "Ana",
        initials: "AS",
        color: "bg-emerald-500",
        text: "Eu fico responsável pela análise de dados.",
        highlights: ["responsável", "análise"]
    },
    {
        speaker: "Carlos",
        initials: "CP",
        color: "bg-amber-500",
        text: "Vou fazer a revisão final no sábado.",
        highlights: ["revisão", "sábado"]
    }
];

export function DemoRecordingStep({ isActive }: DemoRecordingStepProps) {
    const [visibleLines, setVisibleLines] = useState(0);
    const [time, setTime] = useState("00:45:32");

    useEffect(() => {
        // We only progress if active, but we DON'T reset visibleLines to 0 if inactive
        // only reset if specifically needed (e.g. step change handled by parent)
        if (!isActive) return;

        // Show lines sequentially
        const intervals = transcriptLines.map((_, index) => {
            if (index < visibleLines) return null; // Already visible

            return setTimeout(() => {
                setVisibleLines(index + 1);
            }, (800 + index * 1500) - (visibleLines * 1500)); // Rough adjustment for existing progress
        });

        return () => intervals.forEach(t => t && clearTimeout(t));
    }, [isActive, visibleLines]);

    // Timer effect
    useEffect(() => {
        if (!isActive) return;

        // Parse current time to resume from it
        const parts = time.split(':');
        let seconds = parseInt(parts[2]);
        let minutes = parseInt(parts[1]);

        const interval = setInterval(() => {
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
            }
            setTime(`00:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive, time]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl h-full border border-white/5"
        >
            {/* Recording Header */}
            <div className="p-4 border-b border-slate-800 bg-gradient-to-r from-violet-950/50 to-rose-950/50">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <motion.div
                            animate={isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                            transition={isActive ? { duration: 1, repeat: Infinity } : {}}
                            className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"
                        />
                        <span className="text-sm font-medium text-white">Gravando reunião...</span>
                    </div>
                    <motion.span
                        key={time}
                        initial={isActive ? { opacity: 0.5 } : {}}
                        animate={{ opacity: 1 }}
                        className="text-xs text-slate-400 font-mono"
                    >
                        {time}
                    </motion.span>
                </div>
                <WaveformBars isAnimating={isActive} />
            </div>

            {/* Transcript Area */}
            <div className="p-4 space-y-4 min-h-[300px]">
                {transcriptLines.slice(0, visibleLines).map((line, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20, x: -20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ duration: 0.4, type: "spring" }}
                        className="flex gap-3"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1, type: "spring" }}
                            className={`w-8 h-8 rounded-full ${line.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-lg`}
                        >
                            {line.initials}
                        </motion.div>
                        <div className="flex-1 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <p className="text-xs font-medium text-slate-300 mb-1">{line.speaker}</p>
                            <p className="text-sm text-slate-200">
                                <TypingText
                                    text={line.text}
                                    delay={200}
                                    highlightWords={line.highlights}
                                    isActive={isActive}
                                />
                            </p>
                        </div>
                    </motion.div>
                ))}

                {/* Empty state placeholder */}
                {visibleLines === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        className="flex flex-col items-center justify-center h-48 text-slate-500 gap-4"
                    >
                        <div className="w-12 h-12 rounded-full border-2 border-slate-700 border-t-violet-500 animate-spin" />
                        <span className="text-sm">Iniciando transcrição em tempo real...</span>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}

