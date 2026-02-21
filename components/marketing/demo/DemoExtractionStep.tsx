import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle2, Circle, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DemoExtractionStepProps {
    isActive: boolean;
}

const extractedTasks = [
    {
        title: "Finalizar relatório",
        assignee: "João M.",
        initials: "JM",
        color: "bg-blue-500",
        dueDate: "Sexta",
        priority: "Alta",
        priorityColor: "bg-red-500/20 text-red-300 border-red-500/30",
        completed: true
    },
    {
        title: "Análise de dados",
        assignee: "Ana S.",
        initials: "AS",
        color: "bg-emerald-500",
        dueDate: "Quinta",
        priority: "Média",
        priorityColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        completed: false
    },
    {
        title: "Revisão final",
        assignee: "Carlos P.",
        initials: "CP",
        color: "bg-amber-500",
        dueDate: "Sábado",
        priority: "Baixa",
        priorityColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        completed: false
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.8 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 15
        }
    }
};

const avatarVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
        scale: 1,
        rotate: 0,
        transition: {
            type: "spring" as const,
            delay: 0.3
        }
    }
};

const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring" as const,
            delay: 0.4
        }
    }
};

export function DemoExtractionStep({ isActive }: DemoExtractionStepProps) {
    const [visibleTasks, setVisibleTasks] = useState(0);

    useEffect(() => {
        // We only progress if active, but we DON'T reset visibleLines to 0 if inactive
        if (!isActive) return;

        // Show tasks one by one
        const intervals = extractedTasks.map((_, index) => {
            if (index < visibleTasks) return null;

            return setTimeout(() => {
                setVisibleTasks(index + 1);
            }, (300 + index * 600) - (visibleTasks * 600));
        });

        return () => intervals.forEach(t => t && clearTimeout(t));
    }, [isActive, visibleTasks]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl h-full border border-white/5"
        >
            {/* Header */}
            <div className="p-4 border-b border-slate-800 bg-gradient-to-r from-emerald-950/50 to-teal-950/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <motion.div
                            animate={isActive ? { rotate: [0, 10, -10, 0] } : {}}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            📋
                        </motion.div>
                        <span className="text-sm font-medium text-white">
                            <motion.span
                                key={visibleTasks}
                                initial={isActive ? { opacity: 0, y: -10 } : {}}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {visibleTasks}
                            </motion.span>
                            {" "}tarefa{visibleTasks !== 1 ? "s" : ""} criada{visibleTasks !== 1 ? "s" : ""} automaticamente
                        </span>
                    </div>
                    {visibleTasks === extractedTasks.length && (
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                            ✨ Extração completa
                        </Badge>
                    )}
                </div>
            </div>

            {/* Tasks List */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="p-4 space-y-3"
            >
                {extractedTasks.slice(0, visibleTasks).map((task, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        className="relative p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 
                 hover:border-emerald-500/30 transition-colors overflow-hidden group shadow-lg"
                        style={{
                            marginLeft: `${index * 12}px`
                        }}
                    >
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative flex items-start gap-3">
                            {/* Checkbox */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="mt-0.5"
                            >
                                {task.completed ? (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                ) : (
                                    <Circle className="w-5 h-5 text-slate-500" />
                                )}
                            </motion.div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <span className={`font-medium ${task.completed ? "text-slate-400 line-through" : "text-white"
                                        }`}>
                                        {task.title}
                                    </span>

                                    {/* Assignee avatar */}
                                    <motion.div
                                        variants={avatarVariants}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="text-xs text-slate-400">→</span>
                                        <div className={`w-6 h-6 rounded-full ${task.color} flex items-center justify-center text-white text-[10px] font-bold shadow-sm`}>
                                            {task.initials}
                                        </div>
                                        <span className="text-xs text-slate-300">{task.assignee}</span>
                                    </motion.div>
                                </div>

                                {/* Badges */}
                                <div className="flex items-center gap-2">
                                    <motion.div variants={badgeVariants}>
                                        <Badge variant="outline" className="text-[10px] gap-1 bg-slate-800/50">
                                            <Calendar className="w-3 h-3" />
                                            {task.dueDate}
                                        </Badge>
                                    </motion.div>
                                    <motion.div variants={badgeVariants}>
                                        <Badge className={`text-[10px] ${task.priorityColor}`}>
                                            <Tag className="w-3 h-3 mr-1" />
                                            {task.priority}
                                        </Badge>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Connecting line to next card */}
                        {index < extractedTasks.length - 1 && visibleTasks > index + 1 && (
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 16 }}
                                transition={{ delay: 0.5 }}
                                className="absolute -bottom-4 left-7 w-0.5 bg-gradient-to-b from-slate-600 to-transparent z-0"
                            />
                        )}
                    </motion.div>
                ))}

                {/* Empty state */}
                {visibleTasks === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        className="flex flex-col items-center justify-center h-48 text-slate-500 gap-4"
                    >
                        <div className="w-12 h-12 rounded-full border-2 border-slate-700 border-t-emerald-500 animate-spin" />
                        <span className="text-sm">Mapeando entregáveis e responsáveis...</span>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}

