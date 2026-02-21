import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
    Mic,
    Users,
    ListTodo,
    Bell,
    Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GradientMesh } from "./GradientMesh";
import { InteractiveDemoPlayer } from "./InteractiveDemoPlayer";

export function FeatureSpotlight() {
    const section1Ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress: scroll1 } = useScroll({
        target: section1Ref,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scroll1, [0, 1], [100, -100]);
    const rotate1 = useTransform(scroll1, [0, 0.5, 1], [-5, 0, 5]);

    return (
        <section className="relative py-20 md:py-32 overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
            {/* Section 1: Task Extraction - Full-width immersive card */}
            <div ref={section1Ref} className="relative">
                <GradientMesh variant="blue" intensity="medium" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Large immersive card */}
                        <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group">
                            {/* 1. Base Background (Deep Space) */}
                            <div className="absolute inset-0 bg-[#030014]" />

                            {/* 2. Aurora Horizon Effect */}
                            <div className="absolute inset-0 overflow-hidden">
                                {/* Left Sky: Pink/Purple Gradient (The 'Dawn' side) */}
                                <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[120%] bg-[conic-gradient(at_center_right,_var(--tw-gradient-stops))] from-transparent via-pink-600/50 to-purple-600/50 blur-[80px] opacity-80" />

                                {/* Right Sky: Blue/Cyan Gradient (The 'Day' side) */}
                                <div className="absolute -top-[10%] -right-[10%] w-[70%] h-[120%] bg-[conic-gradient(at_center_left,_var(--tw-gradient-stops))] from-blue-600/50 via-cyan-500/50 to-transparent blur-[80px] opacity-80" />

                                {/* The Horizon Line / Light Beam */}
                                <div className="absolute top-1/2 left-0 right-0 h-[300px] -translate-y-1/2 bg-gradient-to-r from-orange-400/30 via-white/40 to-cyan-400/30 blur-[60px]" />
                                <div className="absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_40px_rgba(255,255,255,0.8)]" />

                                {/* Bottom Reflection (Ground/Ocean) */}
                                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[#020617] via-[#0f172a]/80 to-transparent" />
                            </div>

                            {/* Noise Texture */}
                            <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
                                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /%3E%3C/filter%3E%3Crect width="256" height="256" filter="url(%23noise)" opacity="1" /%3E%3C/svg%3E")' }}
                            />

                            <div className="relative p-8 md:p-16">
                                <div className="flex flex-col items-center text-center">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="mb-12"
                                    >
                                        <Badge className="mb-6 bg-blue-500/10 text-blue-200 border-blue-500/20 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                                            <Sparkles className="w-3 h-3 mr-1 text-cyan-400" />
                                            Extração Automática
                                        </Badge>

                                        <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white tracking-tight">
                                            Veja a mágica acontecer
                                        </h2>

                                        <p className="text-xl text-slate-300 mt-6 max-w-2xl mx-auto leading-relaxed">
                                            De uma reunião de 1 hora para tarefas distribuídas em menos de 2 minutos.
                                            Sem anotações manuais, sem follow-ups esquecidos.
                                        </p>
                                    </motion.div>

                                    {/* Video Player - Full Width Centered */}
                                    <motion.div
                                        style={{ y: y1, rotateY: rotate1 }}
                                        className="perspective-1000 w-full max-w-5xl mx-auto"
                                    >
                                        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-slate-950">
                                            <InteractiveDemoPlayer />
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
