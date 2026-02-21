import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const ConclusionCard = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;

        mouseX.set(x);
        mouseY.set(y);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-[520px] mx-auto mt-8 p-1 perspective-1000"
        >
            {/* Abstract Backdrop Glow - Subtle Brand Cyan */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-cyan-900/20 blur-[80px] rounded-full opacity-0 dark:opacity-40 pointer-events-none" />

            {/* MAIN CARD CONTAINER */}
            <div
                className="group relative overflow-hidden rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-xl transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.15)] bg-white dark:bg-[#020617] backdrop-blur-3xl"
                onMouseMove={handleMouseMove}
            >
                {/* 0. CLEAN BRAND BACKGROUND */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-slate-50 dark:bg-[#020617]" />

                    {/* Top Right: Subtle Cyan Glow */}
                    <div className="absolute -top-[30%] -right-[10%] w-[80%] h-[80%] bg-cyan-500/5 dark:bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

                    {/* Bottom Left: Deep Blue Depth */}
                    <div className="absolute -bottom-[30%] -left-[10%] w-[80%] h-[80%] bg-blue-600/5 dark:bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
                </div>

                {/* Subtle Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none" />

                {/* Top Highlight Polish */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent dark:from-white/5 pointer-events-none" />

                {/* 1. MOUSE FOLLOW SPOTLIGHT */}
                <motion.div
                    className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                    style={{
                        background: useMotionTemplate`
                     radial-gradient(
                        500px circle at ${mouseX}px ${mouseY}px,
                        rgba(6,182,212,0.1),
                        transparent 40%
                     )
                  `
                    }}
                />

                {/* 3. CONTENT LAYOUT - Wider but still vertically compact */}
                <div className="relative z-20 px-8 py-8 flex flex-col items-center justify-center text-center">

                    <div className="space-y-5">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full overflow-hidden 
                                     bg-white/10 dark:bg-black/20 
                                     border border-white/20 dark:border-white/10
                                     shadow-sm
                                     backdrop-blur-2xl group/badge cursor-default"
                        >
                            {/* Inner Bevel/Glow acting as the gold tint */}
                            <div className="absolute inset-0 bg-gradient-to-b from-amber-100/10 to-transparent dark:from-amber-500/10 pointer-events-none" />

                            <Sparkles size={14} className="text-amber-400 dark:text-amber-300 relative z-10" fill="currentColor" />
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-amber-700 dark:text-amber-100 relative z-10 drop-shadow-sm mix-blend-plus-lighter">
                                ROI Imediato
                            </span>
                        </motion.div>

                        <h2 className="text-3xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15] drop-shadow-sm">
                            Faça seu tempo <br className="hidden md:block" />
                            — e o da sua equipe —
                            <span className="relative block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500">
                                valer a pena.
                            </span>
                        </h2>

                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                            Transforme reuniões em resultados.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
