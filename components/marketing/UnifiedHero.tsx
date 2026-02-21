import React, { useState, useEffect } from 'react';
import { HlsVideo } from '../ui/hls-video';
import { ChevronDown, Menu, X, Command, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedAudioWave, AnimatedNeuralNet, AnimatedWorkflowList } from '../ui/animated-icons';

const VIDEO_URL = "https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8";
const POSTER_URL = "";

export default function UnifiedHeroSection() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "#" },
        { name: "Recursos", href: "#", hasDropdown: true },
        { name: "Casos de Uso", href: "#" },
        { name: "Contato", href: "#" },
    ];

    return (
        <section className="relative w-full min-h-screen bg-[#070612] font-['Manrope',sans-serif] text-white">
            <style>{`
@import url('https://fonts.googleapis.com/css2?family=Cabin:wght@500;600;700&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap');
                
                .font - heading { font - family: 'Inter', sans - serif; }
                .font - accent { font - family: 'Instrument Serif', serif; }
                .font - ui { font - family: 'Cabin', sans - serif; }

                .glass - card {
    background: rgba(85, 80, 110, 0.4);
    border: 1px solid rgba(164, 132, 215, 0.5);
    backdrop - filter: blur(16px);
}
`}</style>

            {/* Background Video with Black Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <HlsVideo
                    src={VIDEO_URL}
                    poster={POSTER_URL}
                    className="w-full h-full origin-left scale-125 md:ml-[200px]"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#070612] to-transparent z-10 pointer-events-none" />
            </div>

            {/* Navbar */}
            <header
                className={`fixed top - 0 left - 0 w - full z - 50 transition - all duration - 300 border - b border - transparent ${scrolled ? 'bg-[#070612]/80 backdrop-blur-md border-white/10 py-4' : 'bg-transparent py-6'
                    } `}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3 z-50 cursor-pointer">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                            <Command className="w-6 h-6 text-[#070612]" />
                        </div>
                        <span className="font-heading font-bold text-xl tracking-tight text-white">
                            Synapse<span className="text-[#7b39fc]">.AI</span>
                        </span>
                    </div>

                    {/* Desktop Nav Links */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, i) => (
                            <a
                                key={i}
                                href={link.href}
                                className="text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center gap-1"
                            >
                                {link.name}
                                {link.hasDropdown && <ChevronDown className="w-4 h-4 opacity-70" />}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <button className="font-ui text-sm font-semibold text-white px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
                            Entrar
                        </button>
                        <button className="font-ui text-sm font-bold text-white bg-[#7b39fc] hover:bg-[#6a2ce0] px-6 py-2.5 rounded-full transition-colors shadow-[0_0_20px_rgba(123,57,252,0.4)]">
                            Começar
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden z-50 text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </header>

            {/* Mobile Fullscreen Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-[#070612] pt-24 px-6 pb-6 flex flex-col md:hidden"
                    >
                        <nav className="flex flex-col gap-6 text-2xl font-heading font-medium">
                            {navLinks.map((link, i) => (
                                <a key={i} href={link.href} className="text-white hover:text-[#7b39fc] transition-colors">{link.name}</a>
                            ))}
                        </nav>
                        <div className="mt-auto flex flex-col gap-4">
                            <button className="w-full font-ui text-lg font-semibold text-white border border-white/20 py-4 rounded-xl hover:bg-white/5">
                                Entrar
                            </button>
                            <button className="w-full font-ui text-lg font-bold text-white bg-[#7b39fc] py-4 rounded-xl">
                                Começar
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Layout */}
            <div className="relative z-10 w-full min-h-screen flex flex-col items-center pt-32 lg:pt-40 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">

                {/* Centered Hero Heading Section */}
                <div className="flex flex-col items-center text-center max-w-4xl w-full mb-20 lg:mb-32">

                    {/* Pill Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-3 rounded-full glass-card pl-2 pr-4 py-1.5 mb-8"
                    >
                        <span className="bg-[#f87b52] text-white font-ui text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                            Novo
                        </span>
                        <span className="font-ui text-sm font-medium text-white/90">
                            Aliado de Automação IA
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <h1 className="font-heading font-semibold text-white leading-[1.1] mb-8 text-5xl md:text-6xl lg:text-[76px]">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="block"
                        >
                            Transforme Conversas
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="block"
                        >
                            em Dados <span className="font-accent italic text-[#7b39fc] font-normal px-1">Estratégicos.</span>
                        </motion.span>
                    </h1>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-white/80 text-lg md:text-xl font-normal leading-relaxed max-w-2xl mb-12"
                    >
                        A primeira plataforma de inteligência corporativa que escuta, processa e executa decisões de reuniões em tempo real. A Synapse conecta decisões à execução e audita a performance dos seus Squads.
                    </motion.p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-5 items-center justify-center w-full sm:w-auto">
                        <motion.button
                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="w-full sm:w-auto font-ui text-base font-bold text-white bg-[#7b39fc] hover:bg-[#6a2ce0] px-8 py-4 rounded-full transition-transform hover:scale-105 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(123,57,252,0.3)]"
                        >
                            Fale Conosco <ArrowRight size={20} />
                        </motion.button>

                        <motion.button
                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="w-full sm:w-auto font-ui text-base font-semibold text-white bg-[#2b2344]/80 hover:bg-[#352b54] backdrop-blur-md px-8 py-4 rounded-full transition-transform hover:scale-105 border border-white/5"
                        >
                            Explorar Recursos
                        </motion.button>
                    </div>
                </div>

                {/* Feature Cards Grid (3 Columns) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.7 }}
                        className="glass-card rounded-3xl p-8 flex flex-col group hover:bg-[rgba(85,80,110,0.6)] transition-all duration-300"
                    >
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#7b39fc]/20 border border-[#7b39fc]/30 mb-6 group-hover:scale-110 transition-transform">
                            <AnimatedAudioWave className="w-7 h-7 text-[#7b39fc]" />
                        </div>
                        <h3 className="font-heading font-semibold text-xl text-white tracking-tight mb-3">Escuta Inteligente</h3>
                        <p className="text-sm text-white/70 font-medium leading-relaxed">
                            Conecta-se ao Google Meet, Zoom e Teams. Grava e transcreve reuniões presenciais pelo celular. Nenhuma palavra vital é perdida.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.8 }}
                        className="glass-card rounded-3xl p-8 flex flex-col group hover:bg-[rgba(85,80,110,0.6)] transition-all duration-300"
                    >
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#f87b52]/20 border border-[#f87b52]/30 mb-6 group-hover:scale-110 transition-transform">
                            <AnimatedNeuralNet className="w-7 h-7 text-[#f87b52]" />
                        </div>
                        <h3 className="font-heading font-semibold text-xl text-white tracking-tight mb-3">Análise Contextual</h3>
                        <p className="text-sm text-white/70 font-medium leading-relaxed">
                            IA identifica decisões, riscos, sentimentos e oportunidades escondidas em cada conversa, montando painéis de controle precisos.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.9 }}
                        className="glass-card rounded-3xl p-8 flex flex-col group hover:bg-[rgba(85,80,110,0.6)] transition-all duration-300"
                    >
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-cyan-400/20 border border-cyan-400/30 mb-6 group-hover:scale-110 transition-transform">
                            <AnimatedWorkflowList className="w-7 h-7 text-cyan-400" />
                        </div>
                        <h3 className="font-heading font-semibold text-xl text-white tracking-tight mb-3">Ação Automática</h3>
                        <p className="text-sm text-white/70 font-medium leading-relaxed">
                            Tarefas criadas automaticamente com responsáveis, prazos e integração com Jira e Trello. Da reunião direto para a linha de produção.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
