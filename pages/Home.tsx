import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Brain,
  Zap,
  Shield,
  BarChart3,
  MessageSquare,
  Video,
  Play,
  Mic,
  Search,
  Layers,
  Users,
  Cpu,
  Globe,
  Activity,
  Network,
  Fingerprint,
  Command,
  GitGraph,
  Share2,
  Workflow,
  Sparkles,
  Lock,
  Binary,
  Target,
  LineChart,
  Briefcase
} from 'lucide-react';
import { motion, useScroll, useTransform, useInView, animate, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Navbar } from '../components/ui/navbar';

// --- ADVANCED ANIMATION COMPONENTS ---

// 1. NEURAL NETWORK CANVAS BACKGROUND (The "Datlo" Data Effect)
const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Nodes configuration
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100); 
    const connectionDistance = 150;
    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw Node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.5)'; // Cyan-500 equivalent
        ctx.fill();

        // Draw Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 - dist / connectionDistance * 0.15})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(draw);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    const animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />;
};

// 2. MOUSE SPOTLIGHT HERO
const HeroSpotlight = ({ children }: { children?: React.ReactNode }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      className="group relative flex items-center justify-center w-full min-h-[90vh]"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

// 3. COUNTER ANIMATION
const Counter = ({ value, suffix = '', duration = 2.5, className }: { value: number, suffix?: string, duration?: number, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (isInView && ref.current) {
      const node = ref.current;
      const controls = animate(0, value, {
        duration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate(latest) {
           node.textContent = Math.round(latest) + suffix;
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value, suffix, duration]);

  return <div ref={ref} className={className}>0{suffix}</div>;
};

// --- MOCK UI: HOLOGRAPHIC DASHBOARD ---
const HolographicDashboard = () => (
  <div className="relative w-full aspect-[16/10] bg-slate-950/40 rounded-2xl border border-white/10 backdrop-blur-md overflow-hidden shadow-2xl group select-none">
    {/* Animated Border Gradient */}
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    
    {/* Grid Overlay */}
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

    {/* Header */}
    <div className="relative h-12 border-b border-white/5 bg-white/5 flex items-center px-4 justify-between z-20">
      <div className="flex gap-2">
         <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
         </div>
      </div>
      <div className="flex items-center gap-3">
         <Badge variant="glow" className="text-[9px] h-5">LIVE DATA STREAM</Badge>
         <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
      </div>
    </div>

    {/* Content Area */}
    <div className="flex h-[calc(100%-3rem)] relative z-10">
       {/* Left Sidebar */}
       <div className="w-16 border-r border-white/5 flex flex-col items-center py-6 gap-6 bg-white/2">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400"><Brain size={18} /></div>
          <div className="p-2 rounded-lg hover:bg-white/5 text-slate-500"><Globe size={18} /></div>
          <div className="p-2 rounded-lg hover:bg-white/5 text-slate-500"><Layers size={18} /></div>
       </div>

       {/* Main Dashboard Area */}
       <div className="flex-1 p-6 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px]" />

          <div className="grid grid-cols-2 gap-4 h-full relative z-10">
             {/* Left Column: Transcription Feed */}
             <div className="space-y-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Neural Transcription</div>
                {[1, 2, 3].map((i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.5 + 1 }}
                     className="flex gap-3 items-start p-3 rounded-lg bg-white/5 border border-white/5 backdrop-blur-sm"
                   >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shrink-0" />
                      <div className="space-y-2 w-full">
                         <div className="h-2 w-20 bg-white/10 rounded-full" />
                         <div className="space-y-1">
                            <div className="h-1.5 w-full bg-white/5 rounded-full" />
                            <div className="h-1.5 w-3/4 bg-white/5 rounded-full" />
                         </div>
                      </div>
                   </motion.div>
                ))}
             </div>

             {/* Right Column: Visualization */}
             <div className="flex flex-col gap-4">
                {/* AI Insight Card */}
                <motion.div 
                   animate={{ y: [0, -5, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/50 to-slate-900/50 border border-cyan-500/30 shadow-[0_0_20px_rgba(8,145,178,0.1)]"
                >
                   <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                         <Cpu className="w-4 h-4 text-cyan-400" />
                         <span className="text-xs font-bold text-cyan-300">INSIGHT DETECTED</span>
                      </div>
                      <div className="text-[10px] text-slate-500">00:14:23</div>
                   </div>
                   <div className="h-24 w-full bg-cyan-500/5 rounded-lg border border-cyan-500/10 relative overflow-hidden flex items-end justify-between px-2 pb-2 gap-1">
                      {[40, 70, 50, 90, 60, 80, 40, 60].map((h, i) => (
                         <motion.div 
                           key={i}
                           animate={{ height: [`${h/2}%`, `${h}%`, `${h/2}%`] }}
                           transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                           className="w-full bg-cyan-500/40 rounded-t-sm"
                         />
                      ))}
                   </div>
                </motion.div>

                {/* Sentiment Analysis */}
                <div className="flex-1 rounded-xl bg-slate-900/50 border border-white/5 p-4 flex items-center justify-center relative">
                   <div className="absolute inset-0 bg-purple-500/5 animate-pulse-slow" />
                   <div className="w-24 h-24 rounded-full border-4 border-slate-800 border-t-purple-500 border-r-cyan-500 rotate-45" />
                   <div className="absolute text-2xl font-bold text-white">98%</div>
                   <div className="absolute bottom-4 text-[10px] text-slate-400 uppercase tracking-widest">Accuracy</div>
                </div>
             </div>
          </div>
       </div>
    </div>
  </div>
);

// --- MAIN PAGE ---

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  
  // Timeline Logic
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  const lineHeight = useTransform(timelineProgress, [0, 1], ["0%", "100%"]);

  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#000206] text-slate-50 selection:bg-cyan-500/30 selection:text-cyan-50 overflow-hidden relative font-sans">
      <Navbar />
      
      {/* 1. BACKGROUND: NEURAL NETWORK CANVAS */}
      <NeuralBackground />
      
      {/* Subtle overlay gradients for depth */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/10 blur-[120px]" />
      </div>

      {/* 2. HERO SECTION WITH MOUSE SPOTLIGHT */}
      <HeroSpotlight>
        <div className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Text Content */}
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="space-y-8 relative"
            >
               {/* Decorative line */}
               <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent opacity-50 hidden lg:block" />

               <Badge variant="glow" className="animate-pulse-slow backdrop-blur-md">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  Synapse Intelligence v2.0
               </Badge>
               
               <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-white">
                  Transforme <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200">Conversas em</span> <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient">
                    Dados Estratégicos
                  </span>
               </h1>
               
               <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed border-l-2 border-slate-800 pl-6">
                  A primeira plataforma de inteligência corporativa que <span className="text-cyan-400">escuta, processa e executa</span> decisões de reuniões em tempo real.
               </p>

               <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" variant="gradient" className="h-14 px-8 text-lg group relative overflow-hidden" onClick={scrollToContact}>
                     <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                     <span className="relative flex items-center">
                        Fale Conosco <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                     </span>
                  </Button>
                  <Button size="lg" variant="glass" className="h-14 px-8 text-lg hover:border-cyan-500/50 transition-colors" onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})}>
                     <Search className="mr-2 w-5 h-5" /> Explorar Recursos
                  </Button>
               </div>

               <div className="pt-8 flex items-center gap-6 text-sm text-slate-500 font-mono">
                  <div className="flex items-center gap-2">
                     <CheckCircle2 className="w-4 h-4 text-green-500" /> SOC2 Compliant
                  </div>
                  <div className="flex items-center gap-2">
                     <CheckCircle2 className="w-4 h-4 text-green-500" /> Enterprise Ready
                  </div>
               </div>
            </motion.div>

            {/* Right: Holographic Dashboard Visual */}
            <motion.div 
               style={{ y: heroY }}
               initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
               animate={{ opacity: 1, scale: 1, rotateX: 0 }}
               transition={{ duration: 1, delay: 0.2, type: "spring" }}
               className="relative perspective-1000 hidden lg:block"
            >
               {/* Floating Abstract Elements behind */}
               <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-cyan-500/10 rounded-full border-dashed"
               />
               <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-purple-500/5 rounded-full"
               />

               {/* The Dashboard */}
               <div className="transform rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-all duration-500 ease-out preserve-3d">
                  <HolographicDashboard />
                  
                  {/* Floating Notification Cards */}
                  <motion.div 
                     initial={{ x: 20, opacity: 0 }}
                     animate={{ x: 0, opacity: 1, y: [0, -10, 0] }}
                     transition={{ delay: 1, duration: 4, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute -right-6 top-20 bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 p-4 rounded-xl shadow-2xl z-30 max-w-[200px]"
                  >
                     <div className="flex items-start gap-3">
                        <div className="bg-green-500/20 p-1.5 rounded-lg text-green-400"><Zap size={16} /></div>
                        <div>
                           <div className="text-[10px] text-slate-400 uppercase font-bold">Action Triggered</div>
                           <div className="text-xs font-medium text-white mt-1">Jira ticket created #4291</div>
                        </div>
                     </div>
                  </motion.div>

                  <motion.div 
                     initial={{ x: -20, opacity: 0 }}
                     animate={{ x: 0, opacity: 1, y: [0, 10, 0] }}
                     transition={{ delay: 1.5, duration: 5, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute -left-6 bottom-12 bg-slate-900/90 backdrop-blur-md border border-purple-500/30 p-4 rounded-xl shadow-2xl z-30 max-w-[200px]"
                  >
                     <div className="flex items-start gap-3">
                        <div className="bg-purple-500/20 p-1.5 rounded-lg text-purple-400"><Brain size={16} /></div>
                        <div>
                           <div className="text-[10px] text-slate-400 uppercase font-bold">Context Recall</div>
                           <div className="text-xs font-medium text-white mt-1">Linked to Q3 Strategy Doc</div>
                        </div>
                     </div>
                  </motion.div>
               </div>
            </motion.div>
        </div>
      </HeroSpotlight>

      {/* LOGO MARQUEE - Modernized */}
      <div className="w-full border-y border-white/5 py-12 overflow-hidden relative bg-slate-950/50 backdrop-blur-sm z-10">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#000206] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#000206] to-transparent z-10" />
        <div className="flex w-full overflow-hidden">
          <motion.div 
             className="flex gap-20 min-w-full items-center px-8"
             animate={{ x: ["0%", "-50%"] }}
             transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
             {[...Array(10)].map((_, i) => (
               <div key={i} className="flex items-center gap-3 text-slate-500 font-bold text-lg shrink-0 grayscale hover:grayscale-0 hover:text-white transition-all duration-500 cursor-pointer">
                 <div className="w-6 h-6 bg-slate-800 rounded-sm rotate-45 border border-white/10" />
                 ENTERPRISE {i + 1}
               </div>
             ))}
             {[...Array(10)].map((_, i) => (
               <div key={`dup-${i}`} className="flex items-center gap-3 text-slate-500 font-bold text-lg shrink-0 grayscale hover:grayscale-0 hover:text-white transition-all duration-500 cursor-pointer">
                 <div className="w-6 h-6 bg-slate-800 rounded-sm rotate-45 border border-white/10" />
                 ENTERPRISE {i + 1}
               </div>
             ))}
          </motion.div>
        </div>
      </div>

      {/* STATS SECTION */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
             <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-300 to-white mb-6">
                A desconexão custa <span className="text-red-400">bilhões</span>.
             </h2>
             <p className="text-slate-400 text-lg">
                Reuniões deveriam ser o motor da inovação, não o gargalo da execução.
             </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
               { val: 31, suffix: "%", text: "Reuniões Improdutivas", sub: "Harvard Business Review", color: "cyan" },
               { val: 23, suffix: "h", text: "Perdidas por Semana", sub: "Atlassian Research", color: "purple" },
               { val: 67, suffix: "%", text: "Falha na Execução", sub: "MIT Sloan", color: "blue" }
            ].map((stat, i) => (
               <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-sm hover:bg-slate-900/60 transition-colors group"
               >
                  <div className={`text-6xl font-bold text-${stat.color}-500 mb-4 font-mono flex`}>
                     <Counter value={stat.val} suffix={stat.suffix} />
                  </div>
                  <div className="text-xl font-medium text-slate-200 mb-2">{stat.text}</div>
                  <div className="text-sm text-slate-500 border-t border-white/5 pt-4 mt-4 group-hover:border-${stat.color}-500/30 transition-colors">Fonte: {stat.sub}</div>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BENTO FEATURES - REDESIGNED */}
      <section id="features" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="glow">Ecossistema Central</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Um cérebro digital para <br/>
              <span className="text-cyan-400">suas operações</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[300px]">
             
             {/* 1. Feature: Neural Context (Big Card) */}
             <motion.div 
               whileHover={{ scale: 1.01 }}
               className="md:col-span-6 lg:col-span-8 row-span-2 rounded-3xl bg-slate-900/50 border border-white/10 overflow-hidden relative group backdrop-blur-md"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-transparent transition-opacity group-hover:opacity-100 opacity-50" />
                <div className="p-8 h-full flex flex-col relative z-10">
                   <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                         <Network size={24} />
                      </div>
                      <Badge variant="outline" className="text-cyan-400 border-cyan-500/20 bg-cyan-950/30">Synapse Core v2</Badge>
                   </div>
                   
                   <h3 className="text-2xl font-bold text-white mb-2">Contexto Neural Persistente</h3>
                   <p className="text-slate-400 mb-8 max-w-md">O Synapse conecta pontos entre reuniões, e-mails e tickets, criando uma memória institucional viva.</p>
                   
                   {/* Tech Visualization: Graph/Nodes */}
                   <div className="flex-1 rounded-xl border border-white/5 bg-[#050b14] relative overflow-hidden p-6 flex items-center">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]" />
                      
                      {/* Abstract Node Graph */}
                      <div className="relative w-full h-full flex justify-between items-center px-4">
                         {/* Nodes */}
                         {[
                           { label: "Meeting A", type: "Input", color: "bg-blue-500" },
                           { label: "Processing", type: "Core", color: "bg-cyan-400" },
                           { label: "Action Plan", type: "Output", color: "bg-purple-500" }
                         ].map((node, i) => (
                           <div key={i} className="relative z-10 flex flex-col items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${node.color} shadow-[0_0_15px_currentColor]`} />
                              <div className="px-3 py-1.5 rounded bg-slate-900 border border-white/10 text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                                 {node.label}
                              </div>
                           </div>
                         ))}
                         
                         {/* Connection Line */}
                         <div className="absolute top-[40%] left-10 right-10 h-px bg-gradient-to-r from-blue-500/20 via-cyan-500/50 to-purple-500/20 border-t border-dashed border-white/10" />
                         
                         {/* Moving Data Packet */}
                         <motion.div 
                           animate={{ left: ["10%", "90%"], opacity: [0, 1, 0] }}
                           transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                           className="absolute top-[40%] -translate-y-1/2 w-12 h-6 bg-cyan-500/20 rounded-full blur-md"
                         />
                      </div>
                   </div>
                </div>
             </motion.div>

             {/* 2. Feature: Semantic Search */}
             <motion.div 
               whileHover={{ scale: 1.02 }}
               className="md:col-span-6 lg:col-span-4 row-span-2 rounded-3xl bg-slate-950 border border-white/10 p-0 relative overflow-hidden backdrop-blur-md flex flex-col"
             >
                <div className="absolute top-0 right-0 p-32 bg-purple-500/5 rounded-full blur-3xl" />
                
                {/* Header-like styling */}
                <div className="p-8 pb-4 relative z-10">
                   <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                      <Command size={24} />
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-2">Busca Semântica</h3>
                   <p className="text-slate-400 text-sm">Pergunte à sua empresa como se fosse uma pessoa.</p>
                </div>

                {/* Terminal/Chat Interface Simulation */}
                <div className="flex-1 bg-[#09090b] border-t border-white/5 p-4 flex flex-col justify-end gap-3 font-mono text-xs">
                   <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-slate-300">
                      <span className="text-purple-400 mr-2">➜</span>
                      Qual foi o prazo definido pelo CFO para o Projeto Alpha?
                   </div>
                   
                   <div className="flex gap-2 items-center text-slate-500 pl-2">
                      <Binary className="w-3 h-3 animate-spin" />
                      Scanning transcripts...
                   </div>

                   <div className="p-3 rounded-lg bg-purple-900/10 border border-purple-500/20 text-slate-200">
                      <div className="flex items-center gap-2 mb-2 text-purple-400 font-bold uppercase text-[10px]">
                         <Sparkles size={10} /> Insight Found
                      </div>
                      "O prazo final é 15 de Outubro, com revisão em Setembro."
                      <div className="mt-2 text-[10px] text-slate-500">Source: Q3 Planning Meeting (2 days ago)</div>
                   </div>
                </div>
             </motion.div>

             {/* 3. Feature: Integrations (Hub) */}
             <motion.div 
               whileHover={{ scale: 1.02 }}
               className="md:col-span-3 lg:col-span-4 rounded-3xl bg-slate-900/50 border border-white/10 p-6 flex flex-col justify-between group backdrop-blur-md overflow-hidden"
             >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.1),transparent_50%)]" />
                
                <div className="flex justify-between items-start relative z-10">
                   <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Share2 size={20} /></div>
                   <Badge variant="secondary" className="bg-white/5 hover:bg-white/10">Plug & Play</Badge>
                </div>
                
                <div className="relative h-20 flex items-center justify-center my-4">
                   <div className="absolute w-full h-px bg-white/10" />
                   {/* Icons Row */}
                   <div className="flex gap-4 relative z-10 bg-slate-900 px-4">
                      <div className="w-8 h-8 rounded bg-[#2D8CFF] flex items-center justify-center text-[10px] font-bold text-white">Zm</div>
                      <div className="w-8 h-8 rounded bg-[#6264A7] flex items-center justify-center text-[10px] font-bold text-white">Tm</div>
                      <div className="w-8 h-8 rounded bg-[#0052CC] flex items-center justify-center text-[10px] font-bold text-white">Jr</div>
                   </div>
                </div>

                <div className="relative z-10">
                   <h3 className="text-lg font-bold text-white">Integração Universal</h3>
                   <p className="text-sm text-slate-400">Conecta-se nativamente ao seu stack existente.</p>
                </div>
             </motion.div>

             {/* 4. Feature: Security (Biometric) */}
             <motion.div 
               whileHover={{ scale: 1.02 }}
               className="md:col-span-3 lg:col-span-4 rounded-3xl bg-slate-900/50 border border-white/10 p-6 flex flex-col justify-between backdrop-blur-md relative overflow-hidden"
             >
                {/* Scanning Animation Line */}
                <motion.div 
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-px bg-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.5)] z-0"
                />

                <div className="flex justify-between items-start relative z-10">
                    <div className="p-2 bg-green-500/10 rounded-lg text-green-400"><Fingerprint size={20} /></div>
                    <Lock size={14} className="text-slate-600" />
                </div>

                <div className="relative z-10 pt-8">
                   <h3 className="text-lg font-bold text-white">Bank-Grade Security</h3>
                   <p className="text-sm text-slate-400">Zero data training. SOC2 Type II Compliant.</p>
                </div>
             </motion.div>

             {/* 5. Feature: Analytics (Graph) */}
             <motion.div 
               whileHover={{ scale: 1.02 }}
               className="md:col-span-6 lg:col-span-4 rounded-3xl bg-slate-900/50 border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-md"
             >
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent" />
                
                <div className="flex justify-between items-start relative z-10 mb-6">
                   <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400"><TrendingUp size={20} /></div>
                   <div className="text-xs font-mono text-orange-400">+14.2% YoY</div>
                </div>

                {/* Tiny Graph */}
                <div className="h-16 flex items-end gap-1 mb-4 opacity-80">
                   {[20, 45, 30, 60, 55, 75, 50, 80, 95].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ delay: i * 0.05 }}
                        className="flex-1 bg-orange-500/20 rounded-t-sm border-t border-orange-500/50 hover:bg-orange-500/40 transition-colors"
                      />
                   ))}
                </div>

                <div className="relative z-10">
                   <h3 className="text-lg font-bold text-white">Sales Intelligence</h3>
                   <p className="text-sm text-slate-400">Coaching automático baseado em performance.</p>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* RESTORED: USE CASES (DEEP DIVE) */}
      <section id="use-cases" className="py-24 relative z-10">
         <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
               <Badge variant="purple">Aplicações</Badge>
               <h2 className="text-4xl font-bold text-white mt-4">Inteligência para cada nível hierárquico</h2>
               <p className="text-slate-400 mt-4 max-w-2xl">O Synapse adapta sua saída de dados dependendo de quem está perguntando.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {/* Use Case 1: C-Level */}
               <div className="p-8 rounded-2xl bg-slate-950/80 border border-white/5 hover:border-purple-500/30 transition-all group">
                  <div className="w-12 h-12 rounded-lg bg-purple-900/20 text-purple-400 flex items-center justify-center mb-6">
                     <Target size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Executivos & Board</h3>
                  <ul className="space-y-3 text-slate-400">
                     <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0" /> Visão macro de riscos operacionais.</li>
                     <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0" /> Detecção de desalinhamento estratégico.</li>
                     <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0" /> Resumos executivos automatizados.</li>
                  </ul>
               </div>

               {/* Use Case 2: Product */}
               <div className="p-8 rounded-2xl bg-slate-950/80 border border-white/5 hover:border-cyan-500/30 transition-all group">
                  <div className="w-12 h-12 rounded-lg bg-cyan-900/20 text-cyan-400 flex items-center justify-center mb-6">
                     <Briefcase size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Produto & Engenharia</h3>
                  <ul className="space-y-3 text-slate-400">
                     <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0" /> Feedback de usuários em escala.</li>
                     <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0" /> Detecção de features mais solicitadas.</li>
                     <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0" /> Rastreamento de bugs críticos em calls.</li>
                  </ul>
               </div>

               {/* Use Case 3: Sales */}
               <div className="p-8 rounded-2xl bg-slate-950/80 border border-white/5 hover:border-blue-500/30 transition-all group">
                  <div className="w-12 h-12 rounded-lg bg-blue-900/20 text-blue-400 flex items-center justify-center mb-6">
                     <LineChart size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Vendas & CS</h3>
                  <ul className="space-y-3 text-slate-400">
                     <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> Análise de objeções em tempo real.</li>
                     <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> Coaching de discurso de vendas.</li>
                     <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> Preenchimento automático de CRM.</li>
                  </ul>
               </div>
            </div>
         </div>
      </section>

      {/* HOW IT WORKS - SCROLL TIMELINE */}
      <section id="workflow" className="py-32 relative z-10 bg-slate-950/50 backdrop-blur-sm" ref={timelineRef}>
         <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
               <div className="space-y-4">
                  <Badge variant="purple">Workflow</Badge>
                  <h2 className="text-4xl font-bold text-white">Automação Invisível</h2>
               </div>
               <p className="text-slate-400 max-w-sm text-right md:text-left">
                  Do agendamento à execução, o Synapse gerencia o ciclo de vida da informação.
               </p>
            </div>

            <div className="relative">
               {/* Timeline tracks */}
               <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-800 hidden md:block" />
               <motion.div 
                 style={{ height: lineHeight }}
                 className="absolute left-8 top-0 w-px bg-gradient-to-b from-cyan-500 via-purple-500 to-blue-500 hidden md:block" 
               />
               
               {[
                  { title: "Captura Passiva", desc: "O Synapse entra nas chamadas como um participante silencioso.", icon: Mic },
                  { title: "Processamento Cognitivo", desc: "Nossa IA separa ruído de sinal, identificando decisões e donos.", icon: Brain },
                  { title: "Distribuição e Cobrança", desc: "Tasks são criadas no Jira, Asana ou Trello e cobradas automaticamente.", icon: Zap }
               ].map((step, i) => (
                  <motion.div 
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ delay: i * 0.2 }}
                     key={i} 
                     className="flex gap-8 mb-16 md:pl-16 relative"
                  >
                     <div className="hidden md:flex absolute left-4 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-950 border border-slate-700 items-center justify-center text-xs font-bold z-10 ring-4 ring-slate-950 group-hover:border-cyan-500 transition-colors">
                        {i + 1}
                     </div>
                     <div className="flex-1 p-8 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/30 transition-all hover:bg-slate-900/80 group">
                        <div className="flex items-start gap-6">
                           <div className="w-14 h-14 rounded-xl bg-slate-950 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                              <step.icon className="text-slate-300 group-hover:text-cyan-400 transition-colors w-6 h-6" />
                           </div>
                           <div>
                              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">{step.title}</h3>
                              <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* NEW: FINAL CTA / CONVERSION SECTION */}
      <section id="contact-section" className="py-24 relative z-10 overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-cyan-950/10 to-slate-950 pointer-events-none" />
         
         <div className="max-w-4xl mx-auto px-6 text-center relative z-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Pronto para transformar sua empresa em uma organização <span className="text-cyan-400">data-driven</span>?</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
               Agende uma demonstração personalizada e veja o Synapse processando seus dados em tempo real.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Button size="lg" variant="gradient" className="h-16 px-10 text-xl w-full sm:w-auto">
                  Agendar Demonstração
               </Button>
               <Button size="lg" variant="glass" className="h-16 px-10 text-xl w-full sm:w-auto">
                  Falar com Especialista
               </Button>
            </div>
            <p className="mt-8 text-sm text-slate-500">Sem compromisso. Onboarding em menos de 24 horas.</p>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#000206] pt-20 pb-10 px-6 relative z-10">
         <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-4">
               <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-500 to-blue-600" />
                  <span className="font-bold text-lg text-white">SynapseHub</span>
               </div>
               <p className="text-slate-500 text-sm">Corporate Intelligence for the modern enterprise.</p>
            </div>
            <div>
               <h4 className="font-bold mb-4 text-white">Produto</h4>
               <ul className="space-y-2 text-sm text-slate-400">
                  <li><a href="#" className="hover:text-cyan-400 transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-cyan-400 transition-colors">Segurança</a></li>
                  <li><a href="#" className="hover:text-cyan-400 transition-colors">API & Integrações</a></li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold mb-4 text-white">Empresa</h4>
               <ul className="space-y-2 text-sm text-slate-400">
                  <li><a href="#" className="hover:text-cyan-400 transition-colors">Sobre</a></li>
                  <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-cyan-400 transition-colors">Fale Conosco</a></li>
               </ul>
            </div>
         </div>
         <div className="max-w-7xl mx-auto text-center text-slate-600 text-sm">
            &copy; 2024 Synapse Intelligence Inc. All rights reserved.
         </div>
      </footer>

    </div>
  );
};

export default Home;