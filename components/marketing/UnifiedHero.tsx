import React from 'react';
import { HlsVideo } from '../ui/hls-video';
import { ArrowRight, Ear, ScanSearch, Waypoints, Sparkles } from 'lucide-react';
import { BlurIn } from '../ui/blur-in';
import { SplitText } from '../ui/split-text';
import { motion } from 'framer-motion';

const SHARED_VIDEO = "https://stream.mux.com/s8pMcOvMQXc4GD6AX4e1o01xFogFxipmuKltNfSYza0200.m3u8";

export default function UnifiedHeroSection() {
    return (
        <section className="relative w-full h-screen bg-[#070612] overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] text-white">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700&display=swap');
                
                .glass-panel {
                    backdrop-filter: blur(24px) saturate(1.4);
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    box-shadow: none;
                }
                
                .glass-highlight::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(circle at top left, rgba(255,255,255,0.1) 0%, transparent 40%);
                    pointer-events: none;
                    border-radius: inherit;
                }
            `}</style>

            {/* Background Video */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <HlsVideo
                    src={SHARED_VIDEO}
                    className="w-full h-full object-cover origin-left scale-125 md:ml-[200px] opacity-100"
                />
            </div>
            {/* Bottom Fade Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#070612] to-transparent z-10 pointer-events-none" />

            {/* Main Content Layout */}
            <div className="relative z-20 w-full h-full flex items-center">
                <div className="max-w-7xl w-full mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* Left Side: Hero Text and CTA */}
                    <div className="flex-1 flex flex-col justify-center items-start text-left w-full">

                        {/* Pill Badge */}
                        <div className="mb-6 flex">
                            <BlurIn
                                duration={0.6}
                                delay={0}
                                className="flex items-center gap-2 rounded-full border border-white/20 backdrop-blur-sm bg-white/5 pl-3 pr-4 py-1.5"
                            >
                                <Sparkles className="w-4 h-4 text-white/80" />
                                <span className="text-sm font-medium text-white/80 tracking-wide">
                                    New AI Automation Ally
                                </span>
                            </BlurIn>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight lg:leading-[1.2] text-white mb-6">
                            <span className="block">
                                <SplitText
                                    text="Transforme Conversas em"
                                    delay={0.1}
                                    duration={0.6}
                                />
                            </span>
                            <span className="inline-block mt-2">
                                <SplitText
                                    text="Dados"
                                    delay={0.6}
                                    duration={0.6}
                                    className="inline-block"
                                />
                            </span>
                            <span className="inline-block ml-3 md:ml-4">
                                <motion.span
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                    className="inline-block font-serif italic text-cyan-400"
                                >
                                    Estratégicos.
                                </motion.span>
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <BlurIn delay={0.4} duration={0.6} className="mb-12">
                            <p className="text-white/80 text-lg font-normal leading-relaxed max-w-xl">
                                A primeira plataforma de inteligência corporativa que escuta, processa e executa decisões de reuniões em tempo real. A Synapse conecta decisões à execução e audita a performance dos seus Squads.
                            </p>
                        </BlurIn>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 items-center">
                            <BlurIn delay={0.6} duration={0.6}>
                                <button className="bg-white text-[#070612] px-6 py-3 rounded-full text-base font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2">
                                    Fale Conosco <ArrowRight size={20} />
                                </button>
                            </BlurIn>
                            <BlurIn delay={0.65} duration={0.6}>
                                <button className="bg-white/10 border border-white/20 backdrop-blur-sm px-8 py-3 rounded-full text-base font-semibold hover:bg-white/20 transition-colors text-white">
                                    Explorar Recursos
                                </button>
                            </BlurIn>
                        </div>
                    </div>

                    {/* Right Side: Feature Cards Stack (Retained from instructions) */}
                    <div className="w-full lg:w-[45%] flex flex-col gap-4 mt-12 lg:mt-0">
                        {/* Card 1 */}
                        <div className="glass-panel glass-highlight relative rounded-2xl p-6 flex flex-col group hover:bg-white/5 transition-colors isolate overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 shrink-0 group-hover:bg-cyan-500/10 transition-colors">
                                    <Ear size={24} className="text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white tracking-tight mb-2">Escuta Inteligente</h3>
                                    <p className="text-sm text-white/70 font-medium leading-relaxed">
                                        Conecta-se ao Google Meet, Zoom e Teams. Grava e transcreve reuniões presenciais pelo celular. Nenhuma palavra vital é perdida.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="glass-panel glass-highlight relative rounded-2xl p-6 flex flex-col group hover:bg-white/5 transition-colors isolate overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/20 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 shrink-0 group-hover:bg-violet-500/10 transition-colors">
                                    <ScanSearch size={24} className="text-violet-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white tracking-tight mb-2">Análise Contextual</h3>
                                    <p className="text-sm text-white/70 font-medium leading-relaxed">
                                        IA identifica decisões, riscos, sentimentos e oportunidades escondidas em cada conversa, montando painéis de controle precisos.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="glass-panel glass-highlight relative rounded-2xl p-6 flex flex-col group hover:bg-white/5 transition-colors isolate overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 shrink-0 group-hover:bg-amber-500/10 transition-colors">
                                    <Waypoints size={24} className="text-amber-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white tracking-tight mb-2">Ação Automática</h3>
                                    <p className="text-sm text-white/70 font-medium leading-relaxed">
                                        Tarefas criadas automaticamente com responsáveis, prazos e integração com Jira e Trello. Da reunião direto para a linha de produção.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
