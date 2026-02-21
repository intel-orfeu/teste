import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Mic,
    CheckCircle2,
    Share2,
    FolderOpen,
    BarChart3,
    ShieldCheck,
    ArrowRight,
    Sparkles,
    Zap,
    Lock,
    Users,
    Smartphone
} from "lucide-react";
import { Badge } from "./ui/badge";

// --- MICRO-INTERACTIONS ---

const AudioVisualizer = () => (
    <div className="flex items-center justify-center gap-1.5 h-full w-full opacity-60">
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                animate={{
                    height: ["20%", `${Math.random() * 80 + 20}%`, "20%"],
                }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.05,
                    ease: "easeInOut"
                }}
                className="w-1.5 bg-cyan-500 rounded-full"
                style={{ height: "20%" }}
            />
        ))}
    </div>
);

const ChecklistVisualizer = () => {
    const [items, setItems] = useState([
        { text: "Atualizar Metas Q3", checked: true },
        { text: "Revisar Orçamento", checked: false },
        { text: "Sincronização de Time", checked: false }
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setItems(prev => {
                const uncheckedIdx = prev.findIndex(i => !i.checked);
                if (uncheckedIdx === -1) {
                    return prev.map(i => ({ ...i, checked: false }));
                }
                const newItems = [...prev];
                newItems[uncheckedIdx] = { ...newItems[uncheckedIdx], checked: true };
                return newItems;
            });
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full space-y-2 p-2 h-full flex flex-col justify-center">
            {items.map((item, i) => (
                <motion.div
                    key={i}
                    layout
                    initial={false}
                    animate={{
                        opacity: item.checked ? 0.5 : 1,
                        x: item.checked ? 8 : 0
                    }}
                    className="flex items-center gap-2"
                >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors duration-300 flex-shrink-0 ${item.checked ? "bg-emerald-500 border-emerald-500" : "border-slate-300"}`}>
                        {item.checked && <CheckCircle2 size={10} className="text-white" />}
                    </div>
                    <div className={`h-2 rounded-full bg-slate-200 flex-1 ${item.checked ? "opacity-50 bg-slate-300" : ""}`} />
                </motion.div>
            ))}
        </div>
    );
}

const CollabVisualizer = () => (
    <div className="relative w-full h-full">
        {[
            { img: "https://i.pravatar.cc/100?u=1", x: 20, y: 30, delay: 0 },
            { img: "https://i.pravatar.cc/100?u=5", x: 60, y: 50, delay: 1 },
            { img: "https://i.pravatar.cc/100?u=8", x: 40, y: 70, delay: 2 }
        ].map((user, i) => (
            <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: user.delay, duration: 0.5, type: "spring" }}
                style={{ left: `${user.x}%`, top: `${user.y}%` }}
                className="absolute w-10 h-10 rounded-full border-2 border-white shadow-xl overflow-hidden"
            >
                <img src={user.img} alt="Usuário" className="w-full h-full object-cover" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border border-white rounded-full" />
            </motion.div>
        ))}
        <motion.div
            animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/2 left-1/3 w-4 h-4"
        >
            <svg viewBox="0 0 24 24" fill="currentColor" className="text-cyan-500 w-full h-full drop-shadow-lg"><path d="M5.5 3.21l10.8 5.4c1 .5 1 1.97 0 2.47l-10.8 5.4a1.36 1.36 0 01-1.97-1.23V4.44c0-.98 1.12-1.55 1.97-1.23z" /></svg>
            <div className="absolute left-4 top-0 bg-cyan-500 px-1.5 rounded text-[8px] font-bold text-white shadow-md">Caique</div>
        </motion.div>
    </div>
)

const SecurityVisualizer = () => (
    <div className="flex items-center justify-center h-full w-full relative">
        <div className="relative">
            <ShieldCheck size={64} className="text-emerald-600 opacity-20" />
            <motion.div
                animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0 0 0)", "inset(0 0 0 100%)"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="absolute inset-0 text-emerald-500 flex items-center justify-center drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]"
            >
                <ShieldCheck size={64} />
            </motion.div>
        </div>
        <div className="absolute bottom-4 flex gap-1">
            <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
            <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping delay-75" />
            <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping delay-150" />
        </div>
    </div>
)

const RecordingVisual = () => (
    <div className="relative w-full h-full flex items-end justify-center pb-2">
        {/* Compact Recording Pill */}
        <div className="flex items-center gap-3 px-4 py-2 bg-slate-900 rounded-full border border-slate-700 shadow-xl relative z-10 w-[90%] justify-between">
            {/* Rec Dot */}
            <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)] flex-shrink-0"
            />

            {/* Waveform */}
            <div className="flex items-center gap-0.5 h-4 flex-1 justify-center">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ height: ["20%", "100%", "20%"] }}
                        transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: i * 0.05,
                            ease: "easeInOut",
                            repeatType: "reverse"
                        }}
                        className="w-0.5 bg-rose-500 rounded-full"
                        style={{ height: "40%" }}
                    />
                ))}
            </div>

            {/* Time */}
            <span className="text-[10px] text-white font-mono font-medium tracking-wider flex-shrink-0">00:42</span>
        </div>

        {/* Floating Abstract Doc (Background) */}
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-6 right-6 w-10 h-12 bg-white/90 backdrop-blur-sm rounded-lg border border-slate-200 shadow-sm -rotate-6 z-0 flex flex-col p-1.5 gap-1"
        >
            <div className="w-4 h-0.5 bg-slate-300 rounded-full" />
            <div className="w-full h-px bg-slate-100" />
            <div className="w-6 h-0.5 bg-slate-200 rounded-full" />
            <div className="w-5 h-0.5 bg-slate-200 rounded-full" />
        </motion.div>
    </div>
);

const AnalyticsVisual = () => (
    <div className="flex flex-col h-full w-full p-4 relative">
        {/* Stats Pills Top */}
        <div className="flex gap-2 mb-8 justify-center">
            <div className="px-2 py-1 rounded-md bg-emerald-50 border border-emerald-100 flex items-center gap-1.5 shadow-sm">
                <span className="text-[10px] text-emerald-600 font-bold">+28%</span>
                <span className="text-[10px] text-slate-500">Foco</span>
            </div>
            <div className="px-2 py-1 rounded-md bg-emerald-50 border border-emerald-100 flex items-center gap-1.5 opacity-50 shadow-sm">
                <span className="text-[10px] text-emerald-600 font-bold">+12%</span>
                <span className="text-[10px] text-slate-500">Tarefas</span>
            </div>
        </div>

        {/* Chart Area */}
        <div className="flex-1 flex items-end justify-between gap-2 relative px-2">
            {/* Dashed Average Line */}
            <div className="absolute top-[40%] text-white left-0 right-0 h-px border-t border-dashed border-slate-300 z-0">
                <span className="absolute -top-3 left-0 text-[8px] text-slate-400 bg-white pr-1">Média 1s</span>
            </div>

            {/* Bars */}
            {[40, 65, 45, 90, 60].map((h, i) => {
                const isHighlight = i === 3;
                return (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ delay: i * 0.1, duration: 0.8, type: "spring" }}
                        className={`relative w-full rounded-t-sm z-10 ${isHighlight
                            ? "bg-gradient-to-t from-emerald-500 to-emerald-300 shadow-md shadow-emerald-200"
                            : "bg-slate-100"
                            }`}
                    >
                        {isHighlight && (
                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow border-2 border-white ring-2 ring-emerald-400/30" />
                        )}
                    </motion.div>
                )
            })}
        </div>
    </div>
);

// --- FLUID GRADIENT ---

const FluidGradient = ({ className }: { className: string }) => {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 45, -45, 0],
                    x: [0, 20, -20, 0],
                    y: [0, -20, 20, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-mesh opacity-40 blur-[80px] mix-blend-multiply"
            />
        </div>
    )
}

// --- MAIN GRID ---

export function FeaturesGrid() {
    const cards = [
        {
            title: "Transcrição Neural",
            desc: "Captura cada palavra com precisão humana (98%), identificando interlocutores e contextos. Suporte a 40+ idiomas.",
            icon: Mic,
            colSpan: "md:col-span-2",
            bg: "bg-white",
            gradient: ["#1e3a8a", "#3b82f6", "#fbbf24"], // Blue/Gold Silk
            visual: <AudioVisualizer />,
            accent: "cyan"
        },
        {
            title: "Action Items",
            desc: "Transforma conversas em tarefas e as envia para seu cockpit automaticamente.",
            icon: CheckCircle2,
            colSpan: "md:col-span-1",
            bg: "bg-white",
            gradient: ["#064e3b", "#10b981", "#fef3c7"], // Green/Gold Cinema
            visual: <ChecklistVisualizer />,
            accent: "emerald"
        },
        {
            title: "Colaboração",
            desc: "Espaço de trabalho compartilhado para times de alta performance.",
            icon: Users,
            colSpan: "md:col-span-1",
            bg: "bg-white",
            gradient: ["#1e1b4b", "#7c3aed", "#ec4899"], // Purple/Pink Aurora
            visual: <CollabVisualizer />,
            accent: "blue"
        },
        {
            title: "Gravação Local",
            desc: "Grave reunioes presenciais com o app da Synpase, gere atas automaticas e não perca nada nunca mais.",
            icon: Smartphone,
            colSpan: "md:col-span-1",
            bg: "bg-white",
            gradient: ["#f43f5e", "#fda4af", "#fef9c3"], // Pink/Cream Soft
            visual: <RecordingVisual />,
            accent: "purple"
        },
        {
            title: "Analytics Avançado",
            desc: "Insights profundos de produtividade e performance do seu time.",
            icon: BarChart3,
            colSpan: "md:col-span-1",
            bg: "bg-white",
            gradient: ["#be185d", "#f472b6", "#fce7f3"], // Red/Pink Fabric
            visual: <AnalyticsVisual />,
            accent: "emerald"
        },
        {
            title: "Segurança Enterprise",
            desc: "Tranquilidade de nível corporativo. Seus dados permanecem seguros e privados. Infraestrutura certificada SOC 2 Type II, GDPR, LGPD e HIPAA. Retenção zero de IA.",
            icon: Lock,
            colSpan: "md:col-span-2",
            bg: "bg-white",
            gradient: ["#022c22", "#059669", "#f5f5f4"], // Green/Cream Cinematic
            visual: (
                <div className="flex flex-col items-center justify-center text-center h-full w-full relative">

                    {/* Sophisticated Shield Icon */}
                    <div className="relative mb-8">
                        {/* Subtle Ambient Glow */}
                        <div className="absolute inset-0 -m-6 bg-emerald-500/5 rounded-full blur-2xl" />

                        {/* Shield Container - Frosted Glass */}
                        <div className="relative p-5 rounded-2xl bg-gradient-to-b from-white/80 to-slate-50/60 backdrop-blur-sm border border-slate-200/80 shadow-lg shadow-slate-200/30">
                            <ShieldCheck size={36} strokeWidth={1.2} className="text-emerald-600" />

                            {/* Verified Badge */}
                            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm ring-2 ring-white">
                                <CheckCircle2 size={11} className="text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Compliance Badges - Clean Minimal */}
                    <div className="relative z-10 flex flex-wrap justify-center gap-2 max-w-sm">
                        {["SOC 2 Type II", "GDPR", "LGPD", "HIPAA"].map((badge, i) => (
                            <span
                                key={i}
                                className="px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 text-[10px] uppercase font-semibold tracking-wide"
                            >
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>
            ),
            accent: "emerald",
            centered: true
        }
    ];

    return (
        <div className="w-full py-24 relative z-10 bg-slate-50 overflow-hidden">

            {/* EXECUTIVE BACKGROUND */}
            {/* Gradient Orbs - More Visible */}
            <motion.div
                animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-40 left-0 w-[700px] h-[700px] bg-gradient-to-br from-blue-200/60 via-cyan-100/50 to-transparent rounded-full blur-[80px] pointer-events-none"
            />
            <motion.div
                animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
                transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-40 right-0 w-[600px] h-[600px] bg-gradient-to-br from-violet-200/50 via-purple-100/40 to-transparent rounded-full blur-[80px] pointer-events-none"
            />

            {/* Dot Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #475569 1px, transparent 0)`,
                    backgroundSize: '28px 28px'
                }}
            />

            {/* Top Border Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        Potência <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Cognitiva</span>
                    </h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        Uma suíte completa de ferramentas que trabalham para você durante todo o dia.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[320px]">
                    {cards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className={`${card.colSpan} row-span-1 rounded-3xl relative overflow-hidden group border border-slate-200 bg-white shadow-xl shadow-slate-200/50 flex flex-col hover:border-slate-300 transition-all duration-500`}
                        >
                            {/* SILK GRADIENT BACKGROUND - Multiple Blobs */}
                            {(card.gradient as string[]).map((color, i) => (
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
                                    className={`absolute rounded-full blur-[60px] opacity-40 pointer-events-none ${i === 0 ? "-top-1/4 -left-1/4 w-[80%] h-[80%]" :
                                        i === 1 ? "top-1/4 -right-1/4 w-[70%] h-[70%]" :
                                            "bottom-0 left-1/4 w-[60%] h-[60%]"
                                        }`}
                                />
                            ))}

                            {/* Noise Texture - Increased for Silk */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] mix-blend-overlay pointer-events-none" />

                            {/* Content Layer */}
                            <div className={`relative z-10 p-6 flex flex-col h-full ${card.centered ? 'items-center justify-center text-center' : ''}`}>

                                {/* Header */}
                                {!card.centered && (
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`p-3 rounded-xl bg-white/50 border border-white/50 text-slate-500 group-hover:text-${card.accent}-600 transition-colors duration-300 backdrop-blur-sm`}>
                                            <card.icon size={24} strokeWidth={1.5} />
                                        </div>
                                    </div>
                                )}

                                {/* Title & Desc */}
                                <div className={`mb-auto z-20 ${card.centered ? 'mt-auto order-last' : ''}`}>
                                    <h3 className="text-2xl font-semibold text-slate-900 mb-3 tracking-tight">{card.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{card.desc}</p>
                                </div>

                                {/* VISUAL CONTAINER */}
                                <div className={`w-full ${card.centered ? 'flex-1 flex items-center justify-center' : 'h-[140px] mt-6 relative'}`}>
                                    {card.visual}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
}
