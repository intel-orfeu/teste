import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Wallet, TrendingUp, Target, UserPlus, Menu, X, Brain, Zap, Activity, Ear, ScanSearch, Waypoints, BrainCircuit } from 'lucide-react';
import { Button } from '../ui/button';
import { SynapseLogo } from '../ui/synapse-logo';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

export default function WealthHero() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative w-full min-h-screen bg-black text-white font-sans overflow-hidden">
            {/* 1. Background Video */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-150 object-left-top origin-top-left opacity-100"
                >
                    <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260207_050933_33e2620d-09cd-43a2-80ef-4cdbb42f4194.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            </div>

            {/* 2. Navbar */}
            <nav
                className={cn(
                    "fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300",
                    isScrolled
                        ? "py-4 bg-black/30 backdrop-blur-md border-b border-white/10 shadow-lg"
                        : "py-6 bg-transparent border-transparent"
                )}
            >
                {/* Logo */}
                <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                        <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl animate-pulse" />
                        <SynapseLogo className="w-16 h-16 text-white relative z-10" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="font-bold text-2xl tracking-tight leading-none text-white">
                            Synapse<span className="text-cyan-400">.AI</span>
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-semibold mt-1">
                            Hub de Inteligência
                        </span>
                    </div>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#" className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white transition-colors">
                        Recursos <ChevronDown size={14} />
                    </a>
                    <a href="#" className="text-sm font-medium text-white/90 hover:text-white transition-colors">Empresa</a>
                    <a href="#" className="text-sm font-medium text-white/90 hover:text-white transition-colors">Blog</a>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-6">
                    <a href="#" className="text-sm font-medium text-white hover:text-white/80 transition-colors">Login</a>
                    <button className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:scale-105 transition-transform">
                        Começar Agora
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="absolute inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8 md:hidden">
                    <a href="#" className="text-xl font-medium text-white">Recursos</a>
                    <a href="#" className="text-xl font-medium text-white">Empresa</a>
                    <a href="#" className="text-xl font-medium text-white">Blog</a>
                    <a href="#" className="text-xl font-medium text-white">Login</a>
                    <button className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold">
                        Começar Agora
                    </button>
                </div>
            )}

            {/* 3. Hero Content */}
            <div className="relative z-10 container mx-auto px-6 h-screen flex flex-col items-center justify-center text-center pt-52 pb-80 md:pb-96">

                {/* Tag / Brain Animation - REMOVED */}

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-[90px] font-bold tracking-tight text-white leading-[1.1] md:leading-[1] max-w-6xl mx-auto mb-8"
                >
                    Transforme Conversas em <br className="hidden md:block" /> <span className="text-cyan-400">Dados Estratégicos</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed"
                >
                    A primeira plataforma de inteligência corporativa que <span className="text-cyan-400 font-medium">escuta, processa e executa</span> decisões de reuniões em tempo real. A Synapse conecta decisões à execução e audita a performance dos seus Squads.
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <button className="bg-white text-black h-14 px-8 rounded-full text-lg font-bold hover:scale-105 transition-transform flex items-center gap-2">
                        Fale Conosco <ArrowRight size={20} />
                    </button>
                    <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white h-14 px-8 rounded-full text-lg font-semibold hover:bg-white/20 transition-colors flex items-center gap-2">
                        Explorar Recursos
                    </button>
                </motion.div>

            </div>

            {/* 4. Bottom Features Grid */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-8 left-6 right-6 md:left-12 md:right-12 z-20 hidden md:block"
            >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 md:px-12 w-full max-w-[1400px] mx-auto">

                    {/* Card 1: Escuta Inteligente */}
                    <div className="group relative h-48 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 cursor-default">
                        {/* Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        {/* Animated Background Icon */}
                        <Ear
                            strokeWidth={1}
                            className="absolute -bottom-8 -right-8 w-40 h-40 text-cyan-500/5 group-hover:text-cyan-500/10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 ease-out"
                        />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col h-full p-6">
                            <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4 border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors">
                                <Ear size={20} className="text-cyan-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Escuta Inteligente</h3>
                            <p className="text-xs text-white/60 leading-relaxed font-medium max-w-[90%]">
                                Conecta-se ao Google Meet, Zoom e Teams. Grava e transcreve reuniões presenciais pelo celular.
                            </p>
                        </div>
                    </div>

                    {/* Card 2: Análise Contextual */}
                    <div className="group relative h-48 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 cursor-default">
                        {/* Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-violet-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        {/* Animated Background Icon */}
                        <ScanSearch
                            strokeWidth={1}
                            className="absolute -bottom-8 -right-8 w-40 h-40 text-violet-500/5 group-hover:text-violet-500/10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 ease-out"
                        />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col h-full p-6">
                            <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center mb-4 border border-violet-500/20 group-hover:border-violet-500/40 transition-colors">
                                <ScanSearch size={20} className="text-violet-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Análise Contextual</h3>
                            <p className="text-xs text-white/60 leading-relaxed font-medium max-w-[90%]">
                                IA identifica decisões, riscos, sentimentos e oportunidades escondidas em cada conversa.
                            </p>
                        </div>
                    </div>

                    {/* Card 3: Ação Automática */}
                    <div className="group relative h-48 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 cursor-default">
                        {/* Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        {/* Animated Background Icon */}
                        <Waypoints
                            strokeWidth={1}
                            className="absolute -bottom-8 -right-8 w-40 h-40 text-amber-500/5 group-hover:text-amber-500/10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 ease-out"
                        />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col h-full p-6">
                            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center mb-4 border border-amber-500/20 group-hover:border-amber-500/40 transition-colors">
                                <Waypoints size={20} className="text-amber-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Ação Automática</h3>
                            <p className="text-xs text-white/60 leading-relaxed font-medium max-w-[90%]">
                                Tarefas criadas automaticamente com responsáveis, prazos e integração com Jira e Trello.
                            </p>
                        </div>
                    </div>

                    {/* Card 4: Memória Institucional */}
                    <div className="group relative h-48 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 cursor-default">
                        {/* Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        {/* Animated Background Icon */}
                        <BrainCircuit
                            strokeWidth={1}
                            className="absolute -bottom-8 -right-8 w-40 h-40 text-emerald-500/5 group-hover:text-emerald-500/10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 ease-out"
                        />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col h-full p-6">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 border border-emerald-500/20 group-hover:border-emerald-500/40 transition-colors">
                                <BrainCircuit size={20} className="text-emerald-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Memória Institucional</h3>
                            <p className="text-xs text-white/60 leading-relaxed font-medium max-w-[90%]">
                                Cérebro IA que aprende com cada reunião e acumula o conhecimento do seu time.
                            </p>
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}
