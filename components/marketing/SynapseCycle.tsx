import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mic, Brain, Columns, LineChart, Workflow } from 'lucide-react';

const steps = [
    {
        icon: Mic,
        label: "Reunião",
        subLabel: "Gravar Áudio",
        color: "#8B5CF6",
        description: "Grave reuniões presenciais com o app da Synapse, gere atas automáticas e não perca nenhum detalhe.",
        x: 35,
        y: 12
    },
    {
        icon: Brain,
        label: "IA Processa",
        subLabel: "Transcrever",
        color: "#6366F1",
        description: "Análise profunda de intenção e extração de tópicos chave.",
        x: 65,
        y: 32
    },
    {
        icon: Columns,
        label: "Tarefas",
        subLabel: "Distribuir",
        color: "#3B82F6",
        description: "Distribuição automática para os responsáveis no seu PMO.",
        x: 35,
        y: 58
    },
    {
        icon: LineChart,
        label: "Monitor",
        subLabel: "Acompanhar",
        color: "#06B6D4",
        description: "Acompanhe tarefas em kanban, lista ou calendário.",
        x: 65,
        y: 78
    }
];

// S-Curve Bezier Path (Tightened to 35-65 with adjusted Y for better fit)
const path = "M 35 12 C 65 12, 65 32, 65 32 S 35 32, 35 58 S 65 58, 65 78";

export const SynapseCycle = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="relative w-full h-full min-h-[450px] max-w-4xl mx-auto px-12">
            {/* SVG Background Layer */}
            <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                        <stop offset="33%" stopColor="#6366F1" stopOpacity="0.4" />
                        <stop offset="66%" stopColor="#3B82F6" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.4" />
                    </linearGradient>

                    <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="1" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Main Connection Path */}
                <path
                    d={path}
                    fill="none"
                    stroke="url(#neuralGradient)"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    className="opacity-50"
                />

                {/* Animated Data Packets (Comets) */}
                {[...Array(3)].map((_, i) => (
                    <motion.circle
                        key={i}
                        r="0.8"
                        fill="white"
                        filter="url(#neonGlow)"
                    >
                        <animateMotion
                            path={path}
                            dur={`${4 + i * 2}s`}
                            repeatCount="indefinite"
                            begin={`${i * 2}s`}
                        />
                    </motion.circle>
                ))}
            </svg>

            {/* Nodes Layer */}
            <div className="absolute inset-0 w-full h-full p-4">
                {steps.map((step, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2 }}
                        className="absolute flex items-center group cursor-default"
                        style={{
                            left: `${step.x}%`,
                            top: `${step.y}%`,
                            transform: `translate(${step.x > 50 ? '-100%' : '0%'}, -50%)`,
                            flexDirection: step.x > 50 ? 'row-reverse' : 'row'
                        }}
                    >
                        {/* Glass Pedestal Node */}
                        <div className="relative">
                            <motion.div
                                whileHover={{ y: -5, scale: 1.05 }}
                                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 dark:bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex items-center justify-center relative overflow-hidden group-hover:border-white/20 transition-all duration-500"
                            >
                                {/* Active Inner Glow */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                                    style={{ background: `radial-gradient(circle, ${step.color} 0%, transparent 70%)` }}
                                />

                                <step.icon
                                    size={32}
                                    className="relative z-10 transition-all duration-500 group-hover:scale-110"
                                    style={{ color: step.color }}
                                />
                            </motion.div>

                            {/* Ground Reflection/Shadow */}
                            <div
                                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-2 rounded-[50%] blur-md opacity-20 pointer-events-none"
                                style={{ backgroundColor: step.color }}
                            />
                        </div>

                        {/* Text Label & Floating Tooltip */}
                        <div className={`px-4 sm:px-6 transition-all duration-500 ${step.x > 50 ? 'text-right' : 'text-left'}`}>
                            <div className="text-white font-bold text-lg md:text-xl tracking-tight leading-none group-hover:text-white/100 transition-colors whitespace-nowrap">
                                {step.label}
                            </div>
                            <div className="text-slate-500 text-sm font-medium mt-1 whitespace-nowrap">
                                {step.subLabel}
                            </div>

                            {/* Floating Description - Professional Tooltip */}
                            <div className={`absolute top-full mt-4 w-48 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 pointer-events-none z-50
                                ${step.x > 50 ? 'right-0' : 'left-0'}`}
                            >
                                <div className="p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 shadow-2xl">
                                    <p className="text-slate-300 text-xs leading-relaxed whitespace-normal">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
