import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import {
    Clock,
    CheckCircle2,
    Mic,
    Brain,
    ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    ProcessFlowIcon,
    FolderLayersIcon,
    BookStarIcon,
    DashboardLayersIcon,
    TargetPrecisionIcon,
    TrendArrowIcon,
    LightbulbSparkIcon,
    SparkleStarIcon,
    GridFlowIcon,
    ContextBrainIcon
} from "./PremiumIcons";

// ============================================
// DATA DEFINITIONS
// ============================================

interface ContextData {
    id: string;
    Icon: React.ComponentType<{ size?: number; className?: string }>;
    title: string;
    subtitle: string;
    description: string;
    destination: string;
    color: "blue" | "violet" | "emerald";
    features: { icon: React.ComponentType<{ size?: number; className?: string }>; label: string }[];
    mockupData: {
        type: "channel" | "project" | "training";
    };
}

const contexts: ContextData[] = [
    {
        id: "processes",
        Icon: ProcessFlowIcon,
        title: "Processos & Alinhamentos",
        subtitle: "Reuniões N1/N2 • Discussões de Área",
        description: "Alinhamentos estratégicos e tomada de decisão gerencial.",
        destination: "Aba Canais",
        color: "blue",
        features: [
            { icon: DashboardLayersIcon, label: "Dashboards por canal" },
            { icon: TargetPrecisionIcon, label: "Foco e prioridades" },
            { icon: TrendArrowIcon, label: "Desafios mapeados" },
        ],
        mockupData: { type: "channel" },
    },
    {
        id: "projects",
        Icon: FolderLayersIcon,
        title: "Projetos & Entregas",
        subtitle: "Updates • Planejamento • Cronogramas",
        description: "Acompanhamento de projetos e cronogramas de entregas.",
        destination: "Aba Projetos",
        color: "blue", // Changed from violet to blue
        features: [
            { icon: GridFlowIcon, label: "Timeline inteligente" },
            { icon: LightbulbSparkIcon, label: "Action items extraídos" },
            { icon: TrendArrowIcon, label: "Health score automático" },
        ],
        mockupData: { type: "project" },
    },
    {
        id: "training",
        Icon: BookStarIcon,
        title: "Treinamentos & Conhecimento",
        subtitle: "Capacitação • Onboarding • Tutoriais",
        description: "Treinamentos estruturados com IA em módulos navegáveis.",
        destination: "Biblioteca",
        color: "emerald",
        features: [
            { icon: BookStarIcon, label: "Módulos estruturados" },
            { icon: SparkleStarIcon, label: "Enriquecido por IA" },
            { icon: LightbulbSparkIcon, label: "Timestamps de vídeo" },
        ],
        mockupData: { type: "training" },
    },
];

const colorClasses = {
    blue: {
        bg: "bg-blue-500/10",
        text: "text-blue-600 dark:text-blue-400",
        border: "border-blue-500/30",
        glow: "shadow-blue-500/20",
        gradient: "from-blue-500 to-blue-600",
        pill: "bg-blue-500",
        light: "bg-blue-100 dark:bg-blue-900/40",
        glassCard: "bg-blue-50/40 dark:bg-blue-950/30 backdrop-blur-2xl border-blue-200/40 dark:border-blue-800/30",
        innerGlass: "bg-gradient-to-br from-blue-100/60 via-blue-50/30 to-transparent",
        metric: "bg-blue-100/60 dark:bg-blue-900/40 border-blue-200/40 dark:border-blue-700/40",
        ring: { start: "#3b82f6", end: "#1d4ed8" },
    },
    indigo: {
        bg: "bg-indigo-500/10",
        text: "text-indigo-600 dark:text-indigo-400",
        border: "border-indigo-500/30",
        glow: "shadow-indigo-500/20",
        gradient: "from-indigo-500 to-indigo-600",
        pill: "bg-indigo-500",
        light: "bg-indigo-100 dark:bg-indigo-900/40",
        glassCard: "bg-indigo-50/40 dark:bg-indigo-950/30 backdrop-blur-2xl border-indigo-200/40 dark:border-indigo-800/30",
        innerGlass: "bg-gradient-to-br from-indigo-100/60 via-indigo-50/30 to-transparent",
        metric: "bg-indigo-100/60 dark:bg-indigo-900/40 border-indigo-200/40 dark:border-indigo-700/40",
        ring: { start: "#6366f1", end: "#4f46e5" },
    },
    emerald: {
        bg: "bg-emerald-500/10",
        text: "text-emerald-600 dark:text-emerald-400",
        border: "border-emerald-500/30",
        glow: "shadow-emerald-500/20",
        gradient: "from-emerald-500 to-emerald-600",
        pill: "bg-emerald-500",
        light: "bg-emerald-100 dark:bg-emerald-900/40",
        glassCard: "bg-emerald-50/40 dark:bg-emerald-950/30 backdrop-blur-2xl border-emerald-200/40 dark:border-emerald-800/30",
        innerGlass: "bg-gradient-to-br from-emerald-100/60 via-emerald-50/30 to-transparent",
        metric: "bg-emerald-100/60 dark:bg-emerald-900/40 border-emerald-200/40 dark:border-emerald-700/40",
        ring: { start: "#10b981", end: "#059669" },
    },
};

const silkGradients = {
    blue: ["#1e3a8a", "#3b82f6", "#fbbf24"], // Blue/Gold Silk
    indigo: ["#1e1b4b", "#4f46e5", "#06b6d4"], // Indigo/Cyan Aurora
    emerald: ["#064e3b", "#10b981", "#fef3c7"], // Green/Gold Cinema
};

const GradientBackground = ({ colors }: { colors: string[] }) => (
    <>
        {colors.map((color, i) => (
            <motion.div
                key={i}
                animate={{
                    x: [0, 30 * (i % 2 === 0 ? 1 : -1), 0],
                    y: [0, 20 * (i % 2 === 0 ? -1 : 1), 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 12 + i * 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 2
                }}
                style={{ backgroundColor: color }}
                className={`absolute rounded-full blur-[60px] opacity-20 pointer-events-none ${i === 0 ? "-top-1/4 -left-1/4 w-[80%] h-[80%]" :
                    i === 1 ? "top-1/4 -right-1/4 w-[70%] h-[70%]" :
                        "bottom-0 left-1/4 w-[60%] h-[60%]"
                    }`}
            />
        ))}
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay pointer-events-none" />
    </>
);

// ============================================
// HELPER COMPONENTS - GLASS DESIGN SYSTEM
// ============================================

interface GlassMetricPillProps {
    icon: React.ReactNode;
    value: string | number;
    label: string;
    colorClass?: string;
    delay?: number;
}

function GlassMetricPill({ icon, value, label, colorClass = "bg-white/50 dark:bg-slate-800/50 border-white/30", delay = 0 }: GlassMetricPillProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            className={`flex flex-col items-center justify-center p-2.5 rounded-xl backdrop-blur-sm border ${colorClass}`}
        >
            <div className="flex items-center gap-1.5 mb-0.5">
                {icon}
                <span className="font-bold text-sm">{value}</span>
            </div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</span>
        </motion.div>
    );
}

interface AnimatedHealthRingProps {
    score: number;
    size?: number;
    color: "blue" | "violet" | "emerald";
}

function AnimatedHealthRing({ score, size = 56, color }: AnimatedHealthRingProps) {
    const colors = colorClasses[color];
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const progress = ((100 - score) / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="w-full h-full -rotate-90" viewBox="0 0 44 44">
                <circle
                    cx="22" cy="22" r={radius}
                    fill="none"
                    strokeWidth="4"
                    className={`${color === 'blue' ? 'stroke-blue-100 dark:stroke-blue-900/50' : color === 'violet' ? 'stroke-violet-100 dark:stroke-violet-900/50' : 'stroke-emerald-100 dark:stroke-emerald-900/50'}`}
                />
                <motion.circle
                    cx="22" cy="22" r={radius}
                    fill="none"
                    stroke={`url(#${color}Gradient)`}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: progress }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                />
                <defs>
                    <linearGradient id={`${color}Gradient`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={colors.ring.start} />
                        <stop offset="100%" stopColor={colors.ring.end} />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                    className={`font-bold ${colors.text}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                >
                    {score}
                </motion.span>
            </div>
        </div>
    );
}

function ProgressDots({ filled, total, color }: { filled: number; total: number; color: "blue" | "violet" | "emerald" }) {
    const colors = colorClasses[color];
    return (
        <div className="flex gap-1">
            {Array.from({ length: total }).map((_, idx) => (
                <motion.div
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.05, type: "spring" }}
                    className={`w-2 h-2 rounded-full ${idx < filled ? colors.pill : 'bg-muted/40'}`}
                />
            ))}
        </div>
    );
}

// ============================================
// ENHANCED MOCKUPS - PREMIUM LIQUID GLASS
// ============================================

// ============================================
// SIMPLIFIED VISUALIZERS - ABSTRACT & CLEAN
// ============================================

function ChannelMockupBalanced() {
    return (
        <div className="w-full px-4 py-2">
            <div className="flex items-center gap-4 mb-4">
                <AnimatedHealthRing score={85} size={64} color="blue" />
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-slate-700 dark:text-slate-200">Canal Comercial</span>
                        <Badge className="bg-blue-500/10 text-blue-600 border-0 text-[10px] px-1.5">Ativo</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-1.5 bg-white/50 dark:bg-slate-800/50 p-1.5 rounded-lg border border-blue-100/50 dark:border-blue-900/30">
                            <Clock size={12} className="text-blue-500" />
                            <span className="text-[10px] font-medium">12 Reuniões</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/50 dark:bg-slate-800/50 p-1.5 rounded-lg border border-blue-100/50 dark:border-blue-900/30">
                            <CheckCircle2 size={12} className="text-emerald-500" />
                            <span className="text-[10px] font-medium">4 Pendentes</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Micro Panorama */}
            <div className="space-y-1.5 bg-white/40 dark:bg-slate-800/40 p-3 rounded-xl border border-blue-100/30 dark:border-blue-900/20">
                <div className="text-[9px] font-bold text-blue-500 uppercase tracking-wider mb-1">Panorama</div>
                {[
                    { label: "Foco", value: "Fechamento Q1" },
                    { label: "Desafio", value: "Qualidade de leads" }
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[10px]">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium text-slate-700 dark:text-slate-200">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ProjectMockupBalanced() {
    const milestones = [
        { label: "Jan", done: true },
        { label: "Fev", done: true },
        { label: "Mar", active: true },
        { label: "Abr", done: false },
    ];

    return (
        <div className="w-full px-4 py-2">
            {/* Header Stats */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase">Progresso Global</span>
                    <span className="text-lg font-bold text-violet-600 dark:text-violet-400">73%</span>
                </div>
                <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[8px] font-bold text-violet-700">
                            {String.fromCharCode(64 + i)}
                        </div>
                    ))}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2.5 w-full bg-violet-100/50 dark:bg-violet-900/30 rounded-full overflow-hidden mb-4">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "73%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                />
            </div>

            {/* Timeline Compact */}
            <div className="flex justify-between items-center relative">
                {/* Connecting Line */}
                <div className="absolute top-1.5 left-0 w-full h-0.5 bg-violet-100 dark:bg-violet-800/50 -z-10" />

                {milestones.map((m, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1">
                        <div className={`w-3.5 h-3.5 rounded-full border-2 ${m.active ? 'border-violet-500 bg-white dark:bg-slate-900 scale-125' : m.done ? 'bg-violet-500 border-violet-500' : 'bg-white dark:bg-slate-900 border-violet-200 dark:border-violet-700'}`} />
                        <span className={`text-[9px] font-medium ${m.active ? 'text-violet-600 dark:text-violet-400' : 'text-muted-foreground'}`}>{m.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TrainingMockupBalanced() {
    return (
        <div className="w-full px-4 py-2">
            <div className="flex items-center justify-between mb-3">
                <Badge className="bg-emerald-500/10 text-emerald-600 border-0 text-[10px]">
                    Módulo 01 <span className="ml-1 opacity-70">/ 04</span>
                </Badge>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock size={10} /> 45min
                </div>
            </div>

            {/* Active Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-md border border-emerald-100/50 dark:border-emerald-900/30 mb-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="text-[10px] font-semibold text-emerald-600 mb-0.5">Em andamento</div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">Introdução ao CRM e Vendas</div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600">
                        <BookStarIcon size={12} />
                    </div>
                </div>
            </div>

            {/* Next Steps List */}
            <div className="space-y-1 opacity-60">
                {[
                    "Cadastro de Clientes",
                    "Pipeline de Vendas"
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-2 py-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-200 dark:bg-emerald-800" />
                        <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============================================
// REDESIGNED CARD IMPLEMENTATION
// ============================================

interface VerticalContextCardProps {
    context: ContextData;
    index: number;
}

function VerticalContextCard({ context, index }: VerticalContextCardProps) {
    const colors = colorClasses[context.color];
    const VisualizerComponent =
        context.mockupData.type === "channel" ? ChannelMockupBalanced :
            context.mockupData.type === "project" ? ProjectMockupBalanced :
                TrainingMockupBalanced;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`flex flex-col h-full rounded-3xl overflow-hidden border ${colors.border} ${colors.glassCard} shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1`}
        >
            {/* Top Gradient Line */}
            <div className={`h-1 w-full bg-gradient-to-r ${colors.gradient} opacity-80`} />

            <div className="p-6 flex flex-col h-full">
                {/* 1. HEADER section: Icon + Title */}
                <div className="flex flex-col items-center text-center mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <context.Icon size={24} className="text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-1">{context.title}</h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">{context.subtitle}</p>
                </div>

                {/* 2. VISUAL CORE section */}
                <div className={`relative w-full rounded-2xl overflow-hidden mb-6 ${colors.innerGlass} border ${colors.border}`}>
                    {/* Background Glow */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 ${colors.bg} rounded-full blur-[40px] opacity-60`} />

                    {/* The Simplified Visualizer */}
                    <div className="relative z-10 py-4">
                        <VisualizerComponent />
                    </div>
                </div>

                {/* 3. DESCRIPTION & FEATURES section */}
                <div className="text-center mt-auto">
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {context.description}
                    </p>

                    {/* Minimal Features List */}
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                        {context.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100/50 dark:bg-slate-800/50 px-2 py-1 rounded-md border border-slate-200/50 dark:border-slate-700/30">
                                <div className={`w-1 h-1 rounded-full ${colors.pill}`} />
                                {feature.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function TrainingSection() {
    return (
        <section className="py-20 md:py-32 bg-gradient-to-b from-muted/30 via-background to-muted/20 overflow-hidden relative">
            {/* Animated background blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.3, 0.5]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <ContextBrainIcon size={18} className="text-primary" />
                        <span className="text-sm font-medium text-primary">
                            Contextualização Inteligente
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Uma reunião.{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            O sistema entende o contexto.
                        </span>
                    </h2>

                    <p className="text-lg text-muted-foreground">
                        Cada tipo de conversa é automaticamente categorizada e direcionada para a área certa.
                    </p>
                </motion.div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {contexts.map((context, index) => (
                        <VerticalContextCard key={context.id} context={context} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
