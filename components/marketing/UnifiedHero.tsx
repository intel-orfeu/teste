import React from 'react';
import { HlsVideo } from '../ui/hls-video';
import { SynapseLogo } from '../ui/synapse-logo';
import { ArrowRight, Ear, ScanSearch, Waypoints } from 'lucide-react';

const SHARED_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260207_050933_33e2620d-09cd-43a2-80ef-4cdbb42f4194.mp4";

export default function UnifiedHeroSection() {
    return (
        <section className="relative w-full min-h-screen bg-black overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] text-white">
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
                <HlsVideo src={SHARED_VIDEO} className="w-full h-full object-cover opacity-100" />
            </div>

            {/* Header / Nav */}
            <header className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-[4%] py-[2%]">
                <div className="flex items-center gap-3">
                    <SynapseLogo className="w-10 h-10 text-white" />
                    <span className="font-bold text-xl tracking-tight leading-none text-white">
                        Synapse<span className="text-cyan-400">.AI</span>
                    </span>
                </div>
            </header>

            {/* Main Content Layout */}
            <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row items-center justify-between px-[4%] pt-[8%] pb-[4%] gap-[4%]">
                {/* Left Side: Hero Text and CTA */}
                <div className="flex-1 max-w-3xl flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="relative w-20 h-20 flex items-center justify-center">
                            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl animate-pulse" />
                            <SynapseLogo className="w-20 h-20 text-white relative z-10" />
                        </div>
                    </div>

                    <h1
                        className="font-bold tracking-tight text-white leading-[1.05] mb-[4%]"
                        style={{ fontSize: 'clamp(32px, 4.5vw, 80px)' }}
                    >
                        Transforme Conversas em <br className="hidden md:block" />
                        <span className="text-cyan-400">Dados Estratégicos</span>
                    </h1>

                    <p
                        className="text-white/90 font-medium leading-relaxed max-w-2xl mb-[6%]"
                        style={{ fontSize: 'clamp(14px, 1.25vw, 20px)' }}
                    >
                        A primeira plataforma de inteligência corporativa que <span className="text-cyan-400 font-medium">escuta, processa e executa</span> decisões de reuniões em tempo real. A Synapse conecta decisões à execução e audita a performance dos seus Squads.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <button className="bg-white text-black h-12 md:h-14 px-6 md:px-8 rounded-full text-sm md:text-base font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 w-full sm:w-auto">
                            Fale Conosco <ArrowRight size={20} />
                        </button>
                        <button className="glass-panel text-white h-12 md:h-14 px-6 md:px-8 rounded-full text-sm md:text-base font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
                            Explorar Recursos
                        </button>
                    </div>
                </div>

                {/* Right Side: Feature Cards Stack */}
                <div className="w-full lg:w-[45%] flex flex-col gap-4 md:gap-6 mt-12 lg:mt-0 xl:mr-[4%]">
                    {/* Card 1 */}
                    <div className="glass-panel glass-highlight relative rounded-2xl p-6 md:p-8 flex flex-col group hover:bg-white/5 transition-colors isolate overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                        <div className="flex items-start gap-5">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 shrink-0 group-hover:bg-cyan-500/10 transition-colors">
                                <Ear size={24} className="text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">Escuta Inteligente</h3>
                                <p className="text-sm md:text-base text-white/70 font-medium leading-relaxed">
                                    Conecta-se ao Google Meet, Zoom e Teams. Grava e transcreve reuniões presenciais pelo celular. Nenhuma palavra vital é perdida.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="glass-panel glass-highlight relative rounded-2xl p-6 md:p-8 flex flex-col group hover:bg-white/5 transition-colors isolate overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/20 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                        <div className="flex items-start gap-5">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 shrink-0 group-hover:bg-violet-500/10 transition-colors">
                                <ScanSearch size={24} className="text-violet-400" />
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">Análise Contextual</h3>
                                <p className="text-sm md:text-base text-white/70 font-medium leading-relaxed">
                                    IA identifica decisões, riscos, sentimentos e oportunidades escondidas em cada conversa, montando painéis de controle precisos.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="glass-panel glass-highlight relative rounded-2xl p-6 md:p-8 flex flex-col group hover:bg-white/5 transition-colors isolate overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                        <div className="flex items-start gap-5">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 shrink-0 group-hover:bg-amber-500/10 transition-colors">
                                <Waypoints size={24} className="text-amber-400" />
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">Ação Automática</h3>
                                <p className="text-sm md:text-base text-white/70 font-medium leading-relaxed">
                                    Tarefas criadas automaticamente com responsáveis, prazos e integração com Jira e Trello. Da reunião direto para a linha de produção.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
