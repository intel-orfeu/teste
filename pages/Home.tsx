import React, { useState, useEffect, useRef, useMemo } from 'react';
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
   Lightbulb,
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
   Briefcase,
   Database,
   FileText,
   AlertTriangle,
   Clock,
   ArrowDown,
   X,
   Server,
   Code2,
   ListTree,
   CalendarClock,
   Columns,
   Flag,
   MoreHorizontal,
   Bell,
   AlertCircle,
   Check,
   FileCheck,
   Settings,
   ShieldCheck,
   Eye,
   Key,
   Cloud,
   HardDrive,
   EyeOff,
   FileKey
} from 'lucide-react';
import { motion, useScroll, useTransform, useInView, animate, useMotionValue, useSpring, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';


import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Navbar } from '../components/ui/navbar';
import { useTheme } from '../lib/theme-provider';
import { TrainingSection } from '../components/TrainingSection';
import { FeaturesGrid } from '../components/FeaturesGrid';
import { ParallaxSection } from '../components/ui/ParallaxSection';
import { FeatureSpotlight } from '../components/marketing/FeatureSpotlight';
import { ConclusionCard } from '../components/marketing/ConclusionCard';
import { LiquidHeroBackground } from '../components/marketing/LiquidHeroBackground';
import { VideoHeroBackground } from '../components/marketing/VideoHeroBackground';
import UnifiedHeroSection from '../components/marketing/UnifiedHero';
import { DisconnectionBackground } from '../components/marketing/DisconnectionBackground';
import { GradientMesh } from '../components/marketing/GradientMesh';

// --- MEETING TOPICS DATA FOR TIMELINE CARD ---
const meetingTopics = [
   {
      order: 1,
      emoji: "📊",
      title: "Status do Projeto Alpha",
      summary: "Discussão sobre progresso atual e bloqueios identificados na sprint.",
      sentiment: "neutral",
      timestamp: "09:42",
      decision: "Priorizar bug crítico",
      nextStep: "Ana envia relatório hoje"
   },
   {
      order: 2,
      emoji: "💰",
      title: "Orçamento Q4",
      summary: "Revisão das projeções financeiras e alocação de recursos.",
      sentiment: "positive",
      timestamp: "10:15",
      decision: "Aprovado +15% para marketing"
   },
   {
      order: 3,
      emoji: "👥",
      title: "Contratações Tech",
      summary: "Urgência na contratação de devs sênior para os novos projetos.",
      sentiment: "concern",
      timestamp: "10:38",
      risk: "Prazo curto para onboarding"
   },
   {
      order: 4,
      emoji: "🚀",
      title: "Deep Dive: Arquitetura",
      summary: "Análise técnica da migração para microserviços e escalabilidade.",
      sentiment: "positive",
      timestamp: "11:05",
      expanded: true,
      detailed_points: [
         "Implementação de filas RabbitMQ",
         "Segregação de banco de dados por serviço",
         "Auto-scaling para pico de Q4"
      ],
      risk: "Latência em serviços legados na transição"
   }
];

const getSentimentColor = (sentiment: string) => {
   switch (sentiment) {
      case 'positive': return 'bg-emerald-500';
      case 'concern': return 'bg-amber-500';
      case 'negative': return 'bg-red-500';
      default: return 'bg-slate-500';
   }
};

const getSentimentBadge = (sentiment: string) => {
   const configs: Record<string, { label: string; cls: string }> = {
      positive: { label: "Positivo", cls: "bg-emerald-100 text-emerald-700 border-emerald-200" },
      neutral: { label: "Neutro", cls: "bg-slate-100 text-slate-700 border-slate-200" },
      concern: { label: "Atenção", cls: "bg-amber-100 text-amber-700 border-amber-200" },
      negative: { label: "Crítico", cls: "bg-red-100 text-red-700 border-red-200" }
   };
   return configs[sentiment] || configs.neutral;
};


// --- UTILITY: FADE IN ANIMATION WRAPPER ---
const FadeIn = ({ children, delay = 0, className, direction = "up", ...props }: { children: React.ReactNode, delay?: number, className?: string, direction?: "up" | "down" | "left" | "right" } & any) => {
   const directions = {
      up: { y: 40, x: 0 },
      down: { y: -40, x: 0 },
      left: { x: 40, y: 0 },
      right: { x: -40, y: 0 }
   };

   return (
      <motion.div
         initial={{ opacity: 0, ...directions[direction] }}
         whileInView={{ opacity: 1, x: 0, y: 0 }}
         viewport={{ once: true, margin: "-50px" }}
         transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
         className={className}
         {...props}
      >
         {children}
      </motion.div>
   );
};

// --- ADVANCED ANIMATION COMPONENTS ---

// 1. NEURAL NETWORK CANVAS BACKGROUND (The "Datlo" Data Effect)
const NeuralBackground = () => {
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const { theme } = useTheme();

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

         const isDark = document.documentElement.classList.contains('dark');

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
            // Color based on theme
            ctx.fillStyle = isDark ? 'rgba(6, 182, 212, 0.5)' : 'rgba(37, 99, 235, 0.4)'; // Cyan vs Blue
            ctx.fill();

            // Draw Connections
            for (let j = i + 1; j < particles.length; j++) {
               const p2 = particles[j];
               const dx = p.x - p2.x;
               const dy = p.y - p2.y;
               const dist = Math.sqrt(dx * dx + dy * dy);

               if (dist < connectionDistance) {
                  ctx.beginPath();
                  const opacity = 0.15 - dist / connectionDistance * 0.15;
                  ctx.strokeStyle = isDark
                     ? `rgba(6, 182, 212, ${opacity})`
                     : `rgba(37, 99, 235, ${opacity})`;
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
   }, [theme]); // Re-run when theme changes

   return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />;
};

// 2. DIGITAL FLUX BACKGROUND (Recriando a imagem solicitada com animação)
const DigitalFluxBackground = () => {
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const { theme } = useTheme();

   useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let w = canvas.width = canvas.offsetWidth;
      let h = canvas.height = canvas.offsetHeight;

      // Configurações da Grid
      const size = 20; // Tamanho do quadrado
      const cols = Math.ceil(w / size);
      const rows = Math.ceil(h / size);

      // Matriz de dados para os quadrados
      const grid: {
         x: number,
         y: number,
         opacity: number,
         targetOpacity: number,
         speed: number,
         type: 'filled' | 'outline' | 'cross'
      }[] = [];

      // Inicialização da Grid com clusters de densidade (como na imagem)
      for (let i = 0; i < cols; i++) {
         for (let j = 0; j < rows; j++) {
            // Criar clusters de "dados" usando ruído simples
            const noise = Math.sin(i * 0.1) * Math.cos(j * 0.1) + Math.random() * 0.5;
            const isActive = noise > 0.8 || Math.random() > 0.92;

            if (isActive) {
               grid.push({
                  x: i * size,
                  y: j * size,
                  opacity: Math.random() * 0.5,
                  targetOpacity: Math.random() * 0.5,
                  speed: 0.01 + Math.random() * 0.03,
                  type: Math.random() > 0.8 ? 'outline' : (Math.random() > 0.9 ? 'cross' : 'filled')
               });
            }
         }
      }

      const draw = () => {
         // Limpar (com rastro leve para suavidade)
         ctx.clearRect(0, 0, w, h);

         const isDark = document.documentElement.classList.contains('dark');
         const baseColor = isDark ? '255, 255, 255' : '15, 23, 42'; // White or Slate-900
         const accentColor = '6, 182, 212'; // Cyan

         grid.forEach(cell => {
            // Atualizar opacidade (efeito de respiração/flicker)
            if (Math.abs(cell.opacity - cell.targetOpacity) < 0.01) {
               cell.targetOpacity = Math.random() * 0.6; // Nova meta
            }
            const diff = cell.targetOpacity - cell.opacity;
            cell.opacity += diff * cell.speed;

            // Renderizar
            const alpha = cell.opacity;

            if (cell.type === 'filled') {
               ctx.fillStyle = `rgba(${baseColor}, ${alpha})`;
               // Chance pequena de ser colorido (Cyan)
               if (Math.random() > 0.995) ctx.fillStyle = `rgba(${accentColor}, ${alpha + 0.2})`;
               ctx.fillRect(cell.x + 1, cell.y + 1, size - 2, size - 2);
            } else if (cell.type === 'outline') {
               ctx.strokeStyle = `rgba(${baseColor}, ${alpha * 0.8})`;
               ctx.lineWidth = 1;
               ctx.strokeRect(cell.x + 2, cell.y + 2, size - 4, size - 4);
            } else if (cell.type === 'cross') {
               ctx.fillStyle = `rgba(${accentColor}, ${alpha})`;
               ctx.fillRect(cell.x + size / 2 - 1, cell.y + 4, 2, size - 8);
               ctx.fillRect(cell.x + 4, cell.y + size / 2 - 1, size - 8, 2);
            }
         });

         requestAnimationFrame(draw);
      };

      const handleResize = () => {
         w = canvas.width = canvas.offsetWidth;
         h = canvas.height = canvas.offsetHeight;
      };

      window.addEventListener('resize', handleResize);
      const animId = requestAnimationFrame(draw);
      return () => {
         window.removeEventListener('resize', handleResize);
         cancelAnimationFrame(animId);
      };
   }, [theme]);

   return (
      <div className="absolute inset-0 z-0 overflow-hidden">
         <canvas ref={canvasRef} className="w-full h-full opacity-40 dark:opacity-20" />
         {/* Gradients to blend edges and ensure text readability */}
         <div className="absolute inset-0 bg-gradient-to-r from-slate-50/90 via-slate-50/60 to-slate-50/90 dark:from-[#000206] dark:via-[#000206]/70 dark:to-[#000206] pointer-events-none" />
         <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50 dark:from-[#000206] dark:via-transparent dark:to-[#000206] pointer-events-none opacity-80" />
      </div>
   );
};

// 3. MOUSE SPOTLIGHT HERO
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
         {/* Hero Background - Right Side Only */}
         <LiquidHeroBackground />

         <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
            style={{
               background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              var(--spotlight-color),
              transparent 80%
            )
          `,
            }}
         />
         <style>{`
        :root { --spotlight-color: rgba(37, 99, 235, 0.08); }
        .dark { --spotlight-color: rgba(14, 165, 233, 0.15); }
      `}</style>
         <div className="relative z-10 w-full">{children}</div>
      </div>
   );
};

// 4. COUNTER ANIMATION
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



// 5. DATA STREAM BACKGROUND (For "Veja a mágica acontecer")
const DataStreamBackground = () => {
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const { theme } = useTheme();

   useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let w = canvas.width = canvas.offsetWidth;
      let h = canvas.height = canvas.offsetHeight;

      const cols = Math.floor(w / 20);
      const ypos = Array(cols).fill(0).map(() => Math.random() * -100);
      const speeds = Array(cols).fill(0).map(() => 0.5 + Math.random() * 1.5);

      const draw = () => {
         const isDark = document.documentElement.classList.contains('dark');
         ctx.fillStyle = isDark ? 'rgba(0, 2, 6, 0.1)' : 'rgba(255, 255, 255, 0.1)';
         ctx.fillRect(0, 0, w, h);

         ctx.fillStyle = isDark ? '#A855F7' : '#9333EA'; // Purple
         ctx.font = '10pt monospace';

         ypos.forEach((y, ind) => {
            const text = String.fromCharCode(Math.random() < 0.5 ? 48 : 49); // 0 or 1
            const x = ind * 20;

            if (Math.random() > 0.98) {
               ctx.fillStyle = isDark ? '#E879F9' : '#D946EF'; // Brighter purple highlight
               ctx.fillText(text, x, y);
               ctx.fillStyle = isDark ? '#A855F7' : '#9333EA'; // Reset
            } else {
               ctx.fillText(text, x, y);
            }

            if (y > h + Math.random() * 10000) ypos[ind] = 0;
            else ypos[ind] = y + speeds[ind];
         });
         requestAnimationFrame(draw);
      };

      const handleResize = () => {
         w = canvas.width = canvas.offsetWidth;
         h = canvas.height = canvas.offsetHeight;
      };

      window.addEventListener('resize', handleResize);
      const animId = requestAnimationFrame(draw);
      return () => {
         window.removeEventListener('resize', handleResize);
         cancelAnimationFrame(animId);
      };
   }, [theme]);

   return (
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
         <canvas ref={canvasRef} className="w-full h-full" />
         <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white dark:from-[#020408] dark:via-transparent dark:to-[#020408]" />
      </div>
   );
};

// 6. CONTEXT NETWORK BACKGROUND (For "Nunca mais perca o contexto")
const ContextNetworkBackground = () => {
   return (
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-blue-900/20" />

         {/* Moving Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

         {/* Floating Elements */}
         {[...Array(6)].map((_, i) => (
            <motion.div
               key={i}
               className="absolute rounded-full bg-blue-500/10 blur-xl"
               style={{
                  width: Math.random() * 300 + 100,
                  height: Math.random() * 300 + 100,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
               }}
               animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  scale: [1, 1.2, 1],
               }}
               transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
               }}
            />
         ))}
      </div>
   );
};

// --- MOCK UI: HOLOGRAPHIC DASHBOARD ---
const HolographicDashboard = () => (
   <div className="relative w-full aspect-[16/10] bg-white/80 dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-white/10 backdrop-blur-md overflow-hidden shadow-2xl dark:shadow-2xl group select-none">
      {/* Animated Border Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Header */}
      <div className="relative h-12 border-b border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex items-center px-4 justify-between z-20">
         <div className="flex gap-2">
            <div className="flex gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
               <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
               <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            </div>
         </div>
         <div className="flex items-center gap-3">
            <Badge variant="glow" className="text-[9px] h-5">LIVE DATA STREAM</Badge>
            <Activity className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />
         </div>
      </div>

      {/* Content Area */}
      <div className="flex h-[calc(100%-3rem)] relative z-10">
         {/* Left Sidebar */}
         <div className="w-16 border-r border-slate-200 dark:border-white/5 flex flex-col items-center py-6 gap-6 bg-slate-50/30 dark:bg-white/2">
            <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400"><Brain size={18} /></div>
            <div className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-white/5 text-slate-400 dark:text-slate-500"><Globe size={18} /></div>
            <div className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-white/5 text-slate-400 dark:text-slate-500"><Layers size={18} /></div>
         </div>

         {/* Main Dashboard Area */}
         <div className="flex-1 p-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px]" />

            <div className="grid grid-cols-2 gap-4 h-full relative z-10">
               {/* Left Column: Transcription Feed */}
               <div className="space-y-4">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Transcrição Neural</div>
                  {[1, 2, 3].map((i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.5 + 1 }}
                        className="flex gap-3 items-start p-3 rounded-lg bg-white/60 dark:bg-white/5 border border-slate-100 dark:border-white/5 backdrop-blur-sm shadow-sm dark:shadow-none"
                     >
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shrink-0" />
                        <div className="space-y-2 w-full">
                           <div className="h-2 w-20 bg-slate-200 dark:bg-white/10 rounded-full" />
                           <div className="space-y-1">
                              <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full" />
                              <div className="h-1.5 w-3/4 bg-slate-100 dark:bg-white/5 rounded-full" />
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
                     className="p-4 rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-cyan-950/50 dark:to-slate-900/50 border border-slate-200 dark:border-cyan-500/30 shadow-lg shadow-cyan-900/5 dark:shadow-[0_0_20px_rgba(8,145,178,0.1)]"
                  >
                     <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                           <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                           <span className="text-xs font-bold text-cyan-600 dark:text-cyan-300">INSIGHT DETECTADO</span>
                        </div>
                        <div className="text-[10px] text-slate-500">00:14:23</div>
                     </div>
                     <div className="h-24 w-full bg-cyan-50 dark:bg-cyan-500/5 rounded-lg border border-cyan-100 dark:border-cyan-500/10 relative overflow-hidden flex items-end justify-between px-2 pb-2 gap-1">
                        {[40, 70, 50, 90, 60, 80, 40, 60].map((h, i) => (
                           <motion.div
                              key={i}
                              animate={{ height: [`${h / 2}%`, `${h}%`, `${h / 2}%`] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                              className="w-full bg-cyan-400/50 dark:bg-cyan-500/40 rounded-t-sm"
                           />
                        ))}
                     </div>
                  </motion.div>

                  {/* Sentiment Analysis */}
                  <div className="flex-1 rounded-xl bg-white/60 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 p-4 flex items-center justify-center relative">
                     <div className="absolute inset-0 bg-purple-500/5 animate-pulse-slow" />
                     <div className="w-24 h-24 rounded-full border-4 border-slate-100 dark:border-slate-800 border-t-purple-500 border-r-cyan-500 rotate-45" />
                     <div className="absolute text-2xl font-bold text-slate-900 dark:text-white">98%</div>
                     <div className="absolute bottom-4 text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest">Acurácia</div>
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

   // Interactive RAG Diagram State
   const [activeRagStage, setActiveRagStage] = useState(0);
   const [isRagAutoPlaying, setIsRagAutoPlaying] = useState(true);
   const ragSectionRef = useRef<HTMLElement>(null);
   const isRagInView = useInView(ragSectionRef, { margin: "-20%" });

   // Timeline Logic
   const section2Ref = useRef<HTMLDivElement>(null);
   const { scrollYProgress: scrollYSection2 } = useScroll({
      target: section2Ref,
      offset: ["start end", "end start"]
   });
   const y2 = useTransform(scrollYSection2, [0, 1], [100, -100]);

   const timelineRef = useRef<HTMLDivElement>(null);
   const { scrollYProgress: timelineProgress } = useScroll({
      target: timelineRef,
      offset: ["start center", "end center"]
   });
   const lineHeight = useTransform(timelineProgress, [0, 1], ["0%", "100%"]);

   const scrollToContact = () => {
      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
   };

   // --- SECURITY CARD VARIANTS ---
   const containerVariants = {
      hidden: { opacity: 0 },
      show: {
         opacity: 1,
         transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
         }
      }
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
   };

   const ragStages = useMemo(() => [
      {
         id: 'ingest',
         title: 'Ingestão Multimodal',
         icon: Mic,
         color: 'blue',
         desc: 'Captura de áudio, upload de docs e webhooks.',
         details: {
            tech: 'Webhook Listener',
            action: 'O sistema recebe áudio bruto do Fireflies.ai, uploads manuais ou streams em tempo real. Os dados são normalizados.',
            meta: ['WAV/MP3', 'PDF/Docx', 'API Stream']
         }
      },
      {
         id: 'process',
         title: 'Processamento Cognitivo',
         icon: Cpu,
         color: 'indigo',
         desc: 'Limpeza, transcrição e análise de sentimento.',
         details: {
            tech: 'Gemini 3.0 Flash',
            action: 'Diarização de oradores (quem falou o quê), extração de entidades (clientes, prazos) e análise de sentimento por trecho.',
            meta: ['Speaker ID', 'Sentiment Score', 'Key Topics']
         }
      },
      {
         id: 'vector',
         title: 'Vetorização (Embeddings)',
         icon: Database,
         color: 'green',
         desc: 'Conversão de texto em vetores matemáticos.',
         details: {
            tech: 'OpenAI text-embedding-3-large',
            action: 'O texto é convertido em vetores de 3072 dimensões e armazenados em um Banco Vetorial. Memórias similares são agrupadas.',
            meta: ['3072 Dimensions', 'Semantic Cluster', 'Pinecone DB']
         }
      },
      {
         id: 'rag',
         title: 'RAG & Geração',
         icon: Sparkles,
         color: 'cyan',
         desc: 'Busca contextual e resposta generativa.',
         details: {
            tech: 'Context Window Retrieval',
            action: 'Quando você faz uma pergunta, o sistema busca os vetores mais próximos e gera uma resposta baseada APENAS nos fatos da empresa.',
            meta: ['Top-K Retrieval', 'No Hallucination', 'Cited Sources']
         }
      }
   ], []);

   // Safe color mapping to avoid JIT interpolation issues
   const colorMap: Record<string, { border: string, bg: string, text: string, glow: string, fill: string }> = {
      blue: {
         border: 'border-blue-500',
         bg: 'bg-blue-500/20',
         text: 'text-blue-500',
         glow: 'shadow-[0_0_20px_rgba(59,130,246,0.2)]',
         fill: 'bg-blue-500'
      },
      indigo: {
         border: 'border-indigo-500',
         bg: 'bg-indigo-500/20',
         text: 'text-indigo-500',
         glow: 'shadow-[0_0_20px_rgba(99,102,241,0.2)]',
         fill: 'bg-indigo-500'
      },
      green: {
         border: 'border-green-500',
         bg: 'bg-green-500/20',
         text: 'text-green-500',
         glow: 'shadow-[0_0_20px_rgba(34,197,94,0.2)]',
         fill: 'bg-green-500'
      },
      cyan: {
         border: 'border-cyan-500',
         bg: 'bg-cyan-500/20',
         text: 'text-cyan-500',
         glow: 'shadow-[0_0_20px_rgba(6,182,212,0.2)]',
         fill: 'bg-cyan-500'
      }
   };

   // Auto-rotation effect
   useEffect(() => {
      if (isRagInView && isRagAutoPlaying) {
         const interval = setInterval(() => {
            setActiveRagStage((prev) => (prev + 1) % ragStages.length);
         }, 3000);
         return () => clearInterval(interval);
      }
   }, [isRagInView, isRagAutoPlaying, ragStages.length]);

   return (
      <div className="flex flex-col min-h-screen w-full bg-slate-50 dark:bg-[#000206] text-slate-900 dark:text-slate-50 selection:bg-cyan-500/30 selection:text-cyan-900 dark:selection:text-cyan-50 overflow-hidden relative font-sans transition-colors duration-500">
         <UnifiedHeroSection />

         {/* LOGO MARQUEE REMOVED */}

         {/* STATS SECTION */}
         <section className="py-12 relative z-10 overflow-hidden">
            <DisconnectionBackground />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center max-w-3xl mx-auto mb-20"
               >
                  <h2 className="text-4xl md:text-[3.5rem] leading-tight font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-600 to-slate-900 dark:from-white dark:via-slate-300 dark:to-white mb-6 py-2">
                     A desconexão custa <span className="text-red-500 dark:text-red-400">caro</span>.
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">
                     Reuniões deveriam ser o motor da inovação, não o gargalo da execução.
                  </p>
               </motion.div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                     { val: 31, suffix: "%", text: "Reuniões são consideradas improdutivas", sub: "Harvard Business Review" },
                     { val: 80, suffix: "%", text: "Seriam mais produtivos com menos reuniões", sub: "Atlassian" },
                     { val: 70, suffix: "%", text: "Da informação é esquecida em 24h", sub: "Learning Guild 2025" }
                  ].map((stat, i) => (
                     <div key={i} className="w-full">
                        <ParallaxSection speed={0.1 + (i * 0.05)} offset={20}>
                           <motion.div
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.2 }}
                              viewport={{ once: true }}
                              className="p-6 pb-10 rounded-3xl bg-[#0066FF] text-white overflow-hidden relative flex flex-col justify-between min-h-[270px] shadow-xl hover:scale-[1.02] transition-transform duration-300"
                              style={{ boxShadow: '0 20px 40px -10px rgba(0, 102, 255, 0.3)' }}
                           >
                              {/* Large Metric */}
                              <div className="text-[6rem] leading-none font-medium tracking-tight mb-auto mt-2">
                                 <span className="flex items-start">
                                    <Counter value={stat.val} />
                                    <span className="text-4xl mt-2 ml-1 opacity-90">%</span>
                                 </span>
                              </div>

                              {/* Content Bottom */}
                              <div className="space-y-4 relative z-10 mt-8">
                                 <div className="text-xl font-light leading-snug max-w-[90%] opacity-95">
                                    {stat.text}
                                 </div>
                                 <div className="text-sm font-medium opacity-60 uppercase tracking-wider">
                                    Fonte: {stat.sub}
                                 </div>
                              </div>
                           </motion.div>
                        </ParallaxSection>
                     </div>
                  ))}
               </div>
            </div>

            <ConclusionCard />


         </section >

         {/* NEW SECTION: FEATURE SPOTLIGHT WITH INTERACTIVE VIDEO DEMO */}
         {/* BENTO FEATURES - REDESIGNED */}
         <section id="features" className="py-16 relative z-20 overflow-hidden border-t border-slate-200 dark:border-white/10">
            {/* DISTINCT BACKGROUND LAYER (Cybernetic Break) */}
            <div className="absolute inset-0 bg-slate-100 dark:bg-[#0B1121] z-0 transition-colors duration-500">
               {/* Cyber Grid Pattern */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
               {/* Top Glow/Break Light */}
               <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent shadow-[0_0_20px_rgba(6,182,212,0.5)]" />
               <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-500/10 dark:bg-indigo-500/20 blur-[100px] rounded-full" />
               {/* Bottom Fade */}
               <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-50 dark:from-[#000206] to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-6 space-y-8 relative z-10">
               <FadeIn>
                  <div className="text-center max-w-3xl mx-auto space-y-4">
                     <Badge variant="glow">Ecossistema Central</Badge>
                     <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                        Do áudio à ação em <span className="text-cyan-600 dark:text-cyan-400">4 passos</span>.<br />
                        Um <span className="text-cyan-600 dark:text-cyan-400">cérebro digital</span> para suas operações.
                     </h2>
                     <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                        O ciclo Synapse transforma conversas em ações concretas automaticamente, sem falhas.
                     </p>
                  </div>
               </FadeIn>

               <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[300px]">

                  {/* 1. HERO CARD: 4-Step Transformation Pipeline */}
                  <motion.div
                     initial={{ opacity: 0, y: 40 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-50px" }}
                     transition={{ duration: 0.6 }}
                     className="md:col-span-6 lg:col-span-8 row-span-2 rounded-3xl bg-slate-900 border border-white/10 overflow-hidden relative group shadow-2xl"
                  >
                     {/* Background Glow */}
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-cyan-900/10 to-transparent" />
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-cyan-500/10 blur-[100px] rounded-full" />

                     <div className="p-8 h-full flex flex-col relative z-10">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                                 <Workflow size={20} />
                              </div>
                              <span className="text-slate-500 font-mono text-xs uppercase tracking-wider">CICLO_SYNAPSE</span>
                           </div>
                           <Badge variant="outline" className="text-cyan-400 border-cyan-500/30 bg-cyan-950/50">Ao Vivo</Badge>
                        </div>

                        <p className="text-slate-400 text-sm mb-auto max-w-lg">
                           Cada reunião é capturada, processada e transformada em tarefas auditáveis para sua equipe.
                        </p>

                        {/* The Pipeline Visualization */}
                        <div className="flex-1 flex items-center justify-center py-8 relative">
                           {/* Connection Track */}
                           <div className="absolute top-1/2 left-[10%] right-[10%] h-[2px] -translate-y-1/2 bg-slate-800 rounded-full">
                              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-cyan-500/20 to-purple-500/0 h-full" />
                              {/* The Traveling Pulse */}
                              <motion.div
                                 animate={{ left: ["-10%", "110%"], opacity: [0, 1, 1, 0] }}
                                 transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                                 className="absolute top-1/2 -translate-y-1/2 w-24 h-8 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full blur-lg"
                              />
                           </div>

                           {/* Step Nodes */}
                           <div className="grid grid-cols-4 w-full relative z-10 gap-4">
                              {[
                                 { icon: Mic, label: "Reunião", subLabel: "Gravar Áudio", color: "from-blue-500 to-blue-600", delay: 0, bubble: "reuniao" },
                                 { icon: Brain, label: "IA Processa", subLabel: "Transcrever", color: "from-indigo-500 to-indigo-600", delay: 1, bubble: null },
                                 { icon: Columns, label: "Tarefas", subLabel: "Distribuir", color: "from-cyan-500 to-cyan-600", delay: 2, bubble: null },
                                 { icon: LineChart, label: "Monitor", subLabel: "Acompanhar", color: "from-blue-600 to-blue-700", delay: 3, bubble: "monitor" }
                              ].map((step, i) => (
                                 <div key={i} className="flex flex-col items-center relative">
                                    <motion.div
                                       animate={{
                                          boxShadow: [
                                             "0 0 0 0 rgba(6, 182, 212, 0)",
                                             "0 0 30px 5px rgba(6, 182, 212, 0.4)",
                                             "0 0 0 0 rgba(6, 182, 212, 0)"
                                          ],
                                          scale: [1, 1.1, 1]
                                       }}
                                       transition={{
                                          duration: 4,
                                          repeat: Infinity,
                                          ease: "easeInOut",
                                          delay: step.delay * 0.8 + 0.5,
                                          repeatDelay: 1.2,
                                          times: [0, 0.15, 0.35]
                                       }}
                                       className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-xl border border-white/10`}
                                    >
                                       <step.icon size={28} />
                                    </motion.div>
                                    <div className="mt-4 text-center">
                                       <div className="text-white font-semibold text-sm">{step.label}</div>
                                       <div className="text-slate-500 text-xs">{step.subLabel}</div>
                                    </div>

                                    {/* Speech Bubble - Reunião (Top Right) */}
                                    {step.bubble === "reuniao" && (
                                       <div className="absolute bottom-full mb-6 left-0 w-64 md:w-72 z-20">
                                          {/* Bubble Content */}
                                          <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500/10 to-slate-800/80 border border-violet-500/30 backdrop-blur-sm shadow-lg">
                                             <p className="text-slate-200 text-xs md:text-sm leading-relaxed">
                                                Grave reuniões presenciais com o app da Synapse, gere atas automáticas e não perca nenhum detalhe.
                                             </p>
                                          </div>
                                          {/* Triangle Pointer (Bottom, centered on icon) */}
                                          <div className="absolute -bottom-2 left-[32px] md:left-[40px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-violet-500/50" />
                                       </div>
                                    )}

                                    {/* Speech Bubble - Monitor (Bottom Left) */}
                                    {step.bubble === "monitor" && (
                                       <div className="absolute top-full mt-10 right-1/2 translate-x-1/4 w-64 md:w-80 z-20">
                                          {/* Triangle Pointer (Top) */}
                                          <div className="absolute -top-2 right-8 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-cyan-500/30" />
                                          {/* Bubble Content */}
                                          <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/10 to-slate-800/80 border border-cyan-500/30 backdrop-blur-sm shadow-lg">
                                             <p className="text-slate-200 text-xs md:text-sm leading-relaxed">
                                                Acompanhe as tarefas criadas em uma visualização kanban, de lista ou calendário.
                                             </p>
                                          </div>
                                       </div>
                                    )}
                                 </div>
                              ))}
                           </div>
                        </div>

                        {/* Quote */}
                        <div className="mt-auto pt-6 border-t border-white/5">
                           <p className="text-slate-400 text-base md:text-lg text-center leading-relaxed">
                              Zero trabalho manual. <span className="text-white font-semibold">100% de suas reuniões transformadas em ação.</span>
                           </p>
                        </div>
                     </div>
                  </motion.div>

                  {/* 2. Feature: Semantic Search */}
                  <motion.div
                     initial={{ opacity: 0, y: 40 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-50px" }}
                     transition={{ duration: 0.6, delay: 0.1 }}
                     whileHover={{ scale: 1.02 }}
                     className="md:col-span-6 lg:col-span-4 row-span-2 rounded-3xl bg-slate-900 dark:bg-slate-950 border border-white/10 p-0 relative overflow-hidden backdrop-blur-md flex flex-col shadow-lg"
                  >
                     <div className="absolute top-0 right-0 p-32 bg-purple-500/10 rounded-full blur-3xl" />

                     {/* Header-like styling - Always Dark for Terminal Feel */}
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
                           Escaneando transcrições...
                        </div>

                        <div className="p-3 rounded-lg bg-purple-900/10 border border-purple-500/20 text-slate-200">
                           <div className="flex items-center gap-2 mb-2 text-purple-400 font-bold uppercase text-[10px]">
                              <Sparkles size={10} /> Insight Encontrado
                           </div>
                           "O prazo final é 15 de Outubro, com revisão em Setembro."
                           <div className="mt-2 text-[10px] text-slate-500">Fonte: Reunião de Planejamento Q3 (há 2 dias)</div>
                        </div>
                     </div>
                  </motion.div>

                  {/* 3. Feature: Integrations (Hub) */}
                  <motion.div
                     initial={{ opacity: 0, y: 40 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-50px" }}
                     transition={{ duration: 0.6, delay: 0.2 }}
                     whileHover={{ scale: 1.02 }}
                     className="md:col-span-3 lg:col-span-6 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 p-6 flex flex-col justify-between group backdrop-blur-md overflow-hidden shadow-lg dark:shadow-none"
                  >
                     {/* Replaced radial gradient with the new "mesh" background image (CSS approximation for robustness if url fails, but using opaque overlay logic) */}
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-white to-orange-400 opacity-90 dark:opacity-80 mix-blend-normal" />
                     <div className="absolute inset-0 bg-white/40 dark:bg-black/20 backdrop-blur-3xl mix-blend-overlay" />

                     <div className="flex justify-between items-start relative z-10">
                        <div className="p-2 bg-white/40 rounded-lg text-slate-950 drop-shadow-sm"><Share2 size={20} /></div>
                        <Badge variant="secondary" className="bg-white/40 hover:bg-white/50 text-slate-950 border-0 backdrop-blur-md shadow-sm">Plug & Play</Badge>
                     </div>

                     {/* Icons Row - UPDATED: 100% larger (w-24 h-24) and Centered */}
                     <div className="flex gap-6 relative z-10 px-4 py-6 mt-4 justify-center items-center h-full">
                        {[
                           { name: 'Zoom', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Zoom_Communications_Logo.svg/1024px-Zoom_Communications_Logo.svg.png' },
                           { name: 'Teams', src: 'https://i.imgur.com/vkNEg1b.png' },
                           { name: 'Meet', src: 'https://i.imgur.com/IbPalLU.png' }
                        ].map((logo, idx) => (
                           <div key={idx} className="w-24 h-24 rounded-3xl bg-white/80 dark:bg-slate-900/80 shadow-2xl border border-white/20 flex items-center justify-center p-5 transform hover:-translate-y-2 transition-transform duration-300 backdrop-blur-sm">
                              <img src={logo.src} alt={logo.name} className="w-full h-full object-contain" />
                           </div>
                        ))}
                     </div>

                     <div className="relative z-10 mt-4 text-center">
                        <h3 className="text-xl font-bold text-slate-950 drop-shadow-sm">Integração Universal</h3>
                        <p className="text-sm text-slate-700 font-medium drop-shadow-sm">Conecta-se nativamente ao seu stack existente.</p>
                     </div>
                  </motion.div>

                  {/* 5. Feature: Analytics (Graph) */}
                  <motion.div
                     initial={{ opacity: 0, y: 40 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-50px" }}
                     transition={{ duration: 0.6, delay: 0.4 }}
                     whileHover={{ scale: 1.02 }}
                     className="md:col-span-6 lg:col-span-6 rounded-3xl bg-white border-0 p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl"
                  >
                     {/* Purple/Pink Gradient Background - Pronounced Style (Matching Universal Integration) */}
                     <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-white to-purple-600 opacity-90 dark:opacity-80 mix-blend-normal" />
                     <div className="absolute inset-0 bg-white/40 dark:bg-black/20 backdrop-blur-3xl mix-blend-overlay" />

                     {/* Film Grain / Noise Overlay - Kept for texture */}
                     <div className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none"
                        style={{
                           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                           filter: 'contrast(120%) brightness(120%)'
                        }}
                     />

                     {/* Vertical "Horizon Opening" Gradient */}
                     <div className="absolute inset-0 pointer-events-none"
                        style={{
                           background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.1) 60%, transparent 100%)',
                           filter: 'blur(60px)',
                           mixBlendMode: 'overlay'
                        }}
                     />

                     {/* Subtle Wave/Texture Overlay */}
                     <div className="absolute inset-0 opacity-30 mix-blend-overlay"
                        style={{
                           backgroundImage: `radial-gradient(circle at 0% 0%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(0,0,0,0.2) 0%, transparent 50%)`
                        }}
                     />

                     {/* Interactive Neural Mesh */}
                     <div className="absolute inset-0 z-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/10 blur-[80px] rounded-full animate-pulse" />
                     </div>

                     <div className="flex justify-between items-start relative z-10 mb-2">
                        <div className="p-2 bg-white/40 rounded-lg text-slate-950 border border-white/50 backdrop-blur-sm shadow-sm">
                           <Brain size={20} />
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-900 font-bold bg-white/40 px-2.5 py-1 rounded-full border border-white/50 backdrop-blur-sm shadow-sm">
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse" />
                           +94% Precisão
                        </div>
                     </div>

                     {/* Central Brain Network Visualization */}
                     <div className="h-48 flex items-center justify-center relative z-10 my-4">
                        <div className="relative w-64 h-48">
                           <svg viewBox="0 0 120 100" className="w-full h-full drop-shadow-2xl">
                              <defs>
                                 <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                                    <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                                 </linearGradient>
                              </defs>

                              {/* Base Network Connections (Enhanced Visibility) */}
                              {[
                                 // Left Hemisphere
                                 [35, 20, 15, 35], [35, 20, 45, 40], [15, 35, 10, 55], [15, 35, 45, 40],
                                 [10, 55, 30, 75], [10, 55, 45, 40], [45, 40, 30, 75], [45, 40, 50, 60],
                                 [35, 20, 50, 60], [30, 75, 15, 35], // Extra density

                                 // Right Hemisphere (Mirrored)
                                 [85, 20, 105, 35], [85, 20, 75, 40], [105, 35, 110, 55], [105, 35, 75, 40],
                                 [110, 55, 90, 75], [110, 55, 75, 40], [75, 40, 90, 75], [75, 40, 70, 60],
                                 [85, 20, 70, 60], [90, 75, 105, 35], // Extra density

                                 // Corpus Callosum (Bridges)
                                 [35, 20, 85, 20], [45, 40, 75, 40], [30, 75, 90, 75], [50, 60, 70, 60]
                              ].map((line, i) => (
                                 <line
                                    key={`base-${i}`}
                                    x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]}
                                    stroke="currentColor"
                                    strokeWidth="0.8"
                                    className="text-slate-400/40 dark:text-indigo-200/30"
                                 />
                              ))}

                              {/* Active Synapse Paths (Highlighted) */}
                              {[
                                 [15, 35, 45, 40], [45, 40, 75, 40], [75, 40, 110, 55]
                              ].map((line, i) => (
                                 <motion.g key={`active-${i}`}>
                                    <line
                                       x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]}
                                       stroke="#22d3ee"
                                       strokeWidth="2"
                                       strokeOpacity="0.8"
                                       initial={{ pathLength: 0, opacity: 0 }}
                                       animate={{ pathLength: 1, opacity: 1 }}
                                       transition={{ duration: 1.5, delay: i * 0.5 }}
                                    />
                                    <motion.circle
                                       r="2.5"
                                       fill="#fff"
                                       className="drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                                       initial={{ offsetDistance: "0%" }}
                                       animate={{
                                          cx: [line[0], line[2]],
                                          cy: [line[1], line[3]],
                                       }}
                                       transition={{
                                          duration: 2,
                                          repeat: Infinity,
                                          ease: "linear",
                                          delay: i * 0.3
                                       }}
                                    />
                                 </motion.g>
                              ))}

                              {/* Nodes */}
                              {[
                                 // Left Nodes
                                 { x: 35, y: 20 }, { x: 15, y: 35 }, { x: 10, y: 55 }, { x: 30, y: 75 }, { x: 45, y: 40 }, { x: 50, y: 60 },
                                 // Right Nodes
                                 { x: 85, y: 20 }, { x: 105, y: 35 }, { x: 110, y: 55 }, { x: 90, y: 75 }, { x: 75, y: 40 }, { x: 70, y: 60 }
                              ].map((node, i) => {
                                 const isActive = [1, 4, 10, 8].includes(i);
                                 return (
                                    <motion.circle
                                       key={`node-${i}`}
                                       cx={node.x}
                                       cy={node.y}
                                       r={isActive ? 3.5 : 2}
                                       fill={isActive ? "#22d3ee" : "currentColor"}
                                       className={isActive ? "drop-shadow-[0_0_12px_rgba(34,211,238,0.9)]" : "text-slate-300 dark:text-slate-400"}
                                       animate={isActive ? { scale: [1, 1.3, 1] } : {}}
                                       transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                                    />
                                 )
                              })}
                           </svg>

                           {/* Glow Effect behind the brain */}
                           <div className="absolute inset-0 bg-cyan-500/10 blur-3xl -z-10 rounded-full" />
                        </div>
                     </div>

                     <div className="relative z-10 text-center">
                        <h3 className="text-lg font-bold text-slate-950 drop-shadow-sm">Um cérebro que evolui com sua empresa</h3>
                        <p className="text-sm text-slate-800 font-medium drop-shadow-sm">Base de conhecimento vetorial que aprende continuamente com suas reuniões, decisões e processos.</p>
                     </div>
                  </motion.div>

               </div>
            </div>
         </section>
         <FeatureSpotlight />





         {/* SECTION 2: NUNCA MAIS PERCA O CONTEXTO */}
         <div ref={section2Ref} className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600">
            {/* Noise texture for the entire section */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
               style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /%3E%3C/filter%3E%3Crect width="256" height="256" filter="url(%23noise)" opacity="1" /%3E%3C/svg%3E")' }}
            />
            <GradientMesh variant="blue" intensity="medium" className="opacity-50" />

            <div className="container mx-auto px-6 relative z-10">
               <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="grid lg:grid-cols-2 gap-16 items-center"
               >
                  {/* Left - 3D Tilted Timeline Mockup */}
                  <motion.div
                     style={{ y: y2 }}
                     className="order-2 lg:order-1"
                  >
                     <div className="relative max-w-lg mx-auto lg:ml-0">
                        {/* Soft shadow */}
                        <div className="absolute inset-0 bg-black/10 rounded-3xl blur-2xl translate-y-4" />

                        {/* Liquid Glass Card */}
                        <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl overflow-hidden
                                    border border-white/40
                                    shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_0_rgba(255,255,255,0.4)]">
                           {/* Header */}
                           <div className="px-6 py-5 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                 <Clock className="w-4 h-4 text-slate-500" strokeWidth={1.5} />
                                 <div>
                                    <h3 className="font-semibold text-slate-800 text-lg">Análise Profunda</h3>
                                    <p className="text-sm text-slate-500 mt-0.5">3 tópicos · 52 min</p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-1.5">
                                 <motion.div
                                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                                    animate={{ opacity: [1, 0.4, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                 />
                                 <span className="text-xs text-slate-500 font-medium">Processado</span>
                              </div>
                           </div>

                           {/* Separator */}
                           <div className="mx-6 h-px bg-slate-200/60" />

                           {/* Timeline */}
                           <div className="p-6">
                              <div className="relative pl-10">
                                 {/* Timeline vertical line */}
                                 <div className="absolute left-[13px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200" />

                                 <div className="space-y-4">
                                    {meetingTopics.map((topic, index) => {
                                       const barColor = getSentimentColor(topic.sentiment);
                                       const badge = getSentimentBadge(topic.sentiment);
                                       const isExpanded = 'expanded' in topic && topic.expanded;
                                       return (
                                          <motion.div
                                             key={index}
                                             initial={{ opacity: 0, x: -10 }}
                                             whileInView={{ opacity: 1, x: 0 }}
                                             viewport={{ once: true }}
                                             transition={{ delay: 0.3 + index * 0.15 }}
                                             className="relative"
                                          >
                                             {/* Numbered timeline node */}
                                             <div className="absolute -left-10 top-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-white/60 flex items-center justify-center shadow-sm">
                                                <span className="text-xs font-semibold text-slate-600">{topic.order}</span>
                                             </div>

                                             {/* Topic card */}
                                             <div className="flex rounded-2xl bg-white/50 backdrop-blur-sm border border-white/60 overflow-hidden">
                                                <div className={`w-1 flex-shrink-0 ${barColor} rounded-l-2xl`} />

                                                <div className="p-3.5 flex-1 min-w-0">
                                                   <div className="flex items-center justify-between gap-2">
                                                      <div className="flex items-center gap-1.5 min-w-0">
                                                         <span className="text-sm">{topic.emoji}</span>
                                                         <span className="text-sm font-medium text-slate-700 truncate">{topic.title}</span>
                                                         <span className={`inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${badge.cls}`}>
                                                            {badge.label}
                                                         </span>
                                                      </div>
                                                      <span className="text-[10px] text-slate-300 font-mono flex-shrink-0">{topic.timestamp}</span>
                                                   </div>
                                                   <p className="text-xs text-slate-400 mt-1 leading-relaxed">{topic.summary}</p>

                                                   {/* Expanded content for last card */}
                                                   {isExpanded && topic.detailed_points && (
                                                      <div className="mt-2.5 space-y-2">
                                                         <div className="space-y-1">
                                                            {topic.detailed_points.map((point, pi) => (
                                                               <div key={pi} className="flex items-start gap-1.5 text-[11px] text-slate-500">
                                                                  <span className="mt-0.5 w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                                                                  <span>{point}</span>
                                                               </div>
                                                            ))}
                                                         </div>
                                                         {topic.risk && (
                                                            <div className="border-l-2 border-amber-500/30 pl-2.5 py-1">
                                                               <div className="flex items-center gap-1.5 text-[11px] text-amber-600">
                                                                  <AlertTriangle className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
                                                                  <span className="font-medium">Risco</span>
                                                               </div>
                                                               <p className="text-[11px] text-slate-500 mt-0.5">{topic.risk}</p>
                                                            </div>
                                                         )}
                                                      </div>
                                                   )}

                                                   {/* Collapsed actions */}
                                                   {!isExpanded && (
                                                      <>
                                                         {topic.decision && (
                                                            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-500">
                                                               <CheckCircle2 className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
                                                               <span>{topic.decision}</span>
                                                            </div>
                                                         )}
                                                         {topic.nextStep && (
                                                            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-500">
                                                               <Target className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
                                                               <span>{topic.nextStep}</span>
                                                            </div>
                                                         )}
                                                      </>
                                                   )}
                                                </div>
                                             </div>
                                          </motion.div>
                                       );
                                    })}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </motion.div>

                  {/* Right - Content */}
                  <div className="text-white order-1 lg:order-2">
                     <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                        <Lightbulb className="w-3 h-3 mr-1" />
                        Análise Contextual
                     </Badge>

                     <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        Não é só transcrição.<br />
                        É o cérebro da sua equipe.
                     </h2>

                     <p className="text-xl md:text-2xl text-white/85 mb-10 leading-relaxed">
                        Quem faltou à reunião entende tudo em 30 segundos.
                        A IA estrutura cada assunto com decisões, riscos e próximos passos.
                     </p>

                     <div className="space-y-8">
                        {[
                           { icon: Clock, title: "Timeline Cronológica", desc: "Tópicos na ordem exata em que foram discutidos" },
                           { icon: TrendingUp, title: "Análise de Sentimento", desc: "Identifique tópicos que precisam de atenção" },
                           { icon: Lightbulb, title: "Insights Automáticos", desc: "Decisões e próximos passos extraídos pela IA" },
                        ].map((item, index) => (
                           <motion.div
                              key={index}
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                              className="flex items-start gap-5"
                           >
                              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                                 <item.icon className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                 <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                                 <p className="text-base text-white/70">{item.desc}</p>
                              </div>
                           </motion.div>
                        ))}
                     </div>
                  </div>
               </motion.div>
            </div>
         </div>





         {/* NEW SECTION: INTEGRATED PROJECT MANAGEMENT DEEP DIVE WITH DIGITAL FLUX BACKGROUND */}
         < section className="py-24 relative z-20 bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors duration-500" >

            {/* NEW: THE PHOTO RECREATION BACKGROUND */}
            < DigitalFluxBackground />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

               <FadeIn>
                  <div className="text-center mb-16">
                     <Badge variant="purple" className="mb-4">Gestão de Projetos Integrada</Badge>
                     <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Não é só transcrição. <br /><span className="text-cyan-600 dark:text-cyan-400">É o cérebro da sua equipe.</span></h2>
                     <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Transforme conversas em um painel de controle vivo. O Synapse audita o progresso, detecta riscos e garante que o planejado seja executado.
                     </p>
                  </div>
               </FadeIn>

               {/* DASHBOARD MOCKUP */}
               <FadeIn delay={0.2} direction="up">
                  <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#0B1121]/90 backdrop-blur-xl shadow-2xl overflow-hidden p-6 md:p-8 mb-24">

                     <div className="flex flex-col gap-8">
                        {/* Row 1: Dashboard Header */}
                        <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/5 pb-6">
                           <div className="flex items-center gap-3">
                              <div className="p-2 bg-purple-100 dark:bg-purple-500/20 rounded text-purple-600 dark:text-purple-400">
                                 <BarChart3 size={20} />
                              </div>
                              <div>
                                 <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Dashboard de Projetos</h3>
                                 <div className="text-xs text-slate-500">Atualizado em tempo real</div>
                              </div>
                           </div>
                           <div className="flex gap-2">
                              <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
                                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Sincronização Ativa
                              </div>
                           </div>
                        </div>

                        {/* Row 2: Project Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                           {[
                              { name: "Projeto A", prog: 80, status: "success", label: "No prazo", color: "green" },
                              { name: "Projeto B", prog: 100, status: "success", label: "Concluído", color: "blue" },
                              { name: "Projeto C", prog: 30, status: "warning", label: "5d atrasado", color: "red" },
                              { name: "Projeto D", prog: 60, status: "warning", label: "Risco médio", color: "yellow" },
                           ].map((proj, i) => (
                              <div key={i} className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-xl p-4 flex flex-col justify-between h-32 hover:border-slate-300 dark:hover:border-white/20 transition-colors">
                                 <div className="flex justify-between items-start">
                                    <span className="font-bold text-slate-700 dark:text-slate-200">{proj.name}</span>
                                    <Badge variant={proj.status === "success" ? "success" : proj.status === "warning" && proj.color === "red" ? "danger" : "yellow"} className="text-[10px] px-1.5 py-0 h-5">
                                       {proj.label}
                                    </Badge>
                                 </div>
                                 <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-slate-500">
                                       <span>Progresso</span>
                                       <span>{proj.prog}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                       <div style={{ width: `${proj.prog}%` }} className={`h-full rounded-full bg-${proj.color}-500 transition-all duration-1000`} />
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>

                        {/* Row 3: Alerts & Gantt */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                           {/* Column Left: Automatic Alerts */}
                           <div className="lg:col-span-1 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-white/5 p-5">
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                 <Bell size={16} /> Alertas Automáticos
                              </h4>
                              <div className="space-y-3">
                                 <div className="flex gap-3 items-start p-3 bg-white dark:bg-black/20 rounded border border-slate-200 dark:border-white/5">
                                    <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                                    <div className="text-xs text-slate-600 dark:text-slate-300">
                                       <strong>João</strong> tem 3 tarefas vencidas há +48h. <br /><span className="text-slate-400">→ Notificado ✓</span>
                                    </div>
                                 </div>
                                 <div className="flex gap-3 items-start p-3 bg-red-50 dark:bg-red-900/10 rounded border border-red-100 dark:border-red-500/20">
                                    <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
                                    <div className="text-xs text-slate-600 dark:text-slate-300">
                                       <strong>Projeto C</strong> sem atualização há 7 dias. <br /><span className="text-red-500">→ Escalado ao gestor</span>
                                    </div>
                                 </div>
                                 <div className="flex gap-3 items-start p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded border border-yellow-100 dark:border-yellow-500/20">
                                    <AlertTriangle size={16} className="text-yellow-500 mt-0.5 shrink-0" />
                                    <div className="text-xs text-slate-600 dark:text-slate-300">
                                       Sprint atual com <strong>23% de tasks</strong> não atribuídas.
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {/* Column Right: Smart Gantt */}
                           <div className="lg:col-span-2 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-white/5 p-5 relative overflow-hidden">
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                 <CalendarClock size={16} /> Gantt Inteligente
                              </h4>

                              {/* Fake Gantt Visualization */}
                              <div className="relative pt-6">
                                 {/* Months Header */}
                                 <div className="grid grid-cols-6 mb-4 text-xs text-slate-400 font-mono border-b border-slate-200 dark:border-white/5 pb-2">
                                    <span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span>
                                 </div>

                                 {/* Bars */}
                                 <div className="space-y-6 relative z-10">
                                    {/* Project A */}
                                    <div className="relative h-6 w-full bg-slate-200 dark:bg-white/5 rounded">
                                       <div className="absolute left-0 w-[45%] h-full bg-green-500/80 rounded flex items-center px-2 text-[10px] text-white font-bold">Projeto A</div>
                                    </div>
                                    {/* Project B */}
                                    <div className="relative h-6 w-full bg-slate-200 dark:bg-white/5 rounded">
                                       <div className="absolute left-[15%] w-[40%] h-full bg-blue-500/80 rounded flex items-center px-2 text-[10px] text-white font-bold">Projeto B</div>
                                    </div>
                                    {/* Project C (Risk) */}
                                    <div className="relative h-6 w-full bg-slate-200 dark:bg-white/5 rounded">
                                       <div className="absolute left-[40%] w-[35%] h-full bg-red-500/80 rounded flex items-center px-2 text-[10px] text-white font-bold">Projeto C ⚠️</div>
                                    </div>
                                 </div>

                                 {/* Insight Overlay */}
                                 <div className="absolute bottom-4 right-4 max-w-xs bg-slate-900 dark:bg-black text-white p-3 rounded-lg border border-purple-500/50 shadow-xl text-xs z-20">
                                    <div className="flex items-center gap-2 text-purple-400 font-bold mb-1">
                                       <Sparkles size={12} /> Insight de IA
                                    </div>
                                    "O Projeto C tem dependência do Projeto A. Se A atrasar mais 5 dias, C não entrega no prazo."
                                 </div>

                                 {/* Vertical Line Marker */}
                                 <div className="absolute top-0 bottom-0 left-[38%] w-px border-l border-dashed border-red-500/50 z-0">
                                    <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-red-500" />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </FadeIn>

               {/* COMPARISON SECTION - REDESIGNED */}
               <div className="max-w-5xl mx-auto mb-20">
                  <FadeIn>
                     <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">A Evolução da Inteligência Corporativa</h3>
                        <p className="text-slate-500 dark:text-slate-400">Esqueça ferramentas da década passada, junte-se ao futuro.</p>
                     </div>
                  </FadeIn>

                  <ParallaxSection speed={0.08} offset={50}>
                     <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#0f172a]/50 backdrop-blur-xl shadow-2xl overflow-hidden relative"
                     >
                        {/* Header Row */}
                        <div className="grid grid-cols-12 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 text-sm font-bold uppercase tracking-wider text-slate-500">
                           <div className="col-span-4 p-6">Recurso</div>
                           <div className="col-span-4 p-6 border-l border-slate-200 dark:border-white/5 text-center">Ferramentas Comuns</div>
                           <div className="col-span-4 p-6 border-l border-slate-200 dark:border-white/5 text-center text-cyan-600 dark:text-cyan-400 bg-cyan-50/30 dark:bg-cyan-950/20">Synapse Intelligence</div>
                        </div>

                        {/* Row 1: Conhecimento */}
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} className="grid grid-cols-12 border-b border-slate-200 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                           <div className="col-span-4 p-6 flex items-center gap-4">
                              <motion.div
                                 whileHover={{ scale: 1.2, rotate: 12 }}
                                 className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 cursor-pointer"
                              >
                                 <Brain size={20} />
                              </motion.div>
                              <div className="font-bold text-slate-700 dark:text-slate-200">Conhecimento</div>
                           </div>
                           <div className="col-span-4 p-6 border-l border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-500 text-sm text-center">
                              Zero contexto da empresa
                           </div>
                           <div className="col-span-4 p-6 border-l border-slate-200 dark:border-white/5 flex items-center justify-center relative overflow-hidden bg-cyan-50/10 dark:bg-cyan-900/5">
                              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white relative z-10">
                                 <CheckCircle2 size={18} className="text-cyan-500" /> Memória Institucional Ativa
                              </div>
                              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                           </div>
                        </motion.div>

                        {/* Row 2: Conexão */}
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="grid grid-cols-12 border-b border-slate-200 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                           <div className="col-span-4 p-6 flex items-center gap-4">
                              <motion.div
                                 whileHover={{ scale: 1.2, rotate: 12 }}
                                 className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 cursor-pointer"
                              >
                                 <Network size={20} />
                              </motion.div>
                              <div className="font-bold text-slate-700 dark:text-slate-200">Conexão</div>
                           </div>
                           <div className="col-span-4 p-6 border-l border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-500 text-sm text-center">
                              Reuniões isoladas
                           </div>
                           <div className="col-span-4 p-6 border-l border-slate-200 dark:border-white/5 flex items-center justify-center relative overflow-hidden bg-cyan-50/10 dark:bg-cyan-900/5">
                              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white relative z-10">
                                 <CheckCircle2 size={18} className="text-cyan-500" /> Contexto Conectado
                              </div>
                              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                           </div>
                        </motion.div>

                        {/* Row 3: Ação */}
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className="grid grid-cols-12 border-b border-slate-200 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                           <div className="col-span-4 p-6 flex items-center gap-4">
                              <motion.div
                                 whileHover={{ scale: 1.2, rotate: 12 }}
                                 className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 cursor-pointer"
                              >
                                 <Zap size={20} />
                              </motion.div>
                              <div className="font-bold text-slate-700 dark:text-slate-200">Ação</div>
                           </div>
                           <div className="col-span-4 p-6 border-l border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-500 text-sm text-center">
                              Passivo (só armazena)
                           </div>
                           <div className="col-span-4 p-6 border-l border-slate-200 dark:border-white/5 flex items-center justify-center relative overflow-hidden bg-cyan-50/10 dark:bg-cyan-900/5">
                              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white relative z-10">
                                 <CheckCircle2 size={18} className="text-cyan-500" /> Execução Autônoma (Cobra & Escala)
                              </div>
                              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                           </div>
                        </motion.div>

                        {/* Row 4: Gestão */}
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} className="grid grid-cols-12 border-b border-slate-200 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                           <div className="col-span-4 p-6 flex items-center gap-4">
                              <motion.div
                                 whileHover={{ scale: 1.2, rotate: 12 }}
                                 className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 cursor-pointer"
                              >
                                 <Briefcase size={20} />
                              </motion.div>
                              <div className="font-bold text-slate-700 dark:text-slate-200">Gestão</div>
                           </div>
                           <div className="col-span-4 p-6 border-l border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-500 text-sm text-center">
                              Não existe
                           </div>
                           <div className="col-span-4 p-6 border-l border-slate-200 dark:border-white/5 flex items-center justify-center relative overflow-hidden bg-cyan-50/10 dark:bg-cyan-900/5">
                              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white relative z-10">
                                 <CheckCircle2 size={18} className="text-cyan-500" /> PMO Completo Integrado
                              </div>
                              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                           </div>
                        </motion.div>

                        {/* Row 5: Evolução */}
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} className="grid grid-cols-12 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                           <div className="col-span-4 p-6 flex items-center gap-4">
                              <motion.div
                                 whileHover={{ scale: 1.2, rotate: 12 }}
                                 className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 cursor-pointer"
                              >
                                 <TrendingUp size={20} />
                              </motion.div>
                              <div className="font-bold text-slate-700 dark:text-slate-200">Evolução</div>
                           </div>
                           <div className="col-span-4 p-6 border-l border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-500 text-sm text-center">
                              Estático
                           </div>
                           <div className="col-span-4 p-6 border-l border-slate-200 dark:border-white/5 flex items-center justify-center relative overflow-hidden bg-cyan-50/10 dark:bg-cyan-900/5">
                              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white relative z-10">
                                 <CheckCircle2 size={18} className="text-cyan-500" /> Aprendizado Contínuo
                              </div>
                              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                           </div>
                        </motion.div>
                     </motion.div>
                  </ParallaxSection>
               </div>

               {/* FINAL PUNCHLINE FOR SECTION */}
               <FadeIn className="mt-20 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8">
                     "Ferramentas de transcrição te mostram o que foi dito.<br />
                     <span className="text-cyan-600 dark:text-cyan-400">Synapse garante que o que foi decidido seja feito.</span>"
                  </h3>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <Button size="lg" variant="default" className="bg-slate-900 text-white dark:bg-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200">
                        Ver demonstração <ArrowRight size={16} className="ml-2" />
                     </Button>
                     <Button size="lg" variant="ghost">
                        Comparar planos
                     </Button>
                  </div>
               </FadeIn>

            </div>
         </section >

         {/* NEW SECTION: COLOR BLOCK GRID (Solutions) */}
         < section className="w-full relative z-20" >
            <div className="grid grid-cols-1 md:grid-cols-3 w-full">
               {/* Item 1 - Blue */}
               <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="bg-blue-600 p-12 md:p-20 flex flex-col items-center justify-center text-center group">
                  <h3 className="text-2xl font-bold text-white mb-4">Data Synapse</h3>
                  <p className="text-blue-100 max-w-xs text-sm leading-relaxed">A base de tudo. Estruturação e unificação completa dos dados em tempo real.</p>
               </motion.div>
               {/* Item 2 - Dark */}
               <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="bg-[#050510] p-12 md:p-20 flex flex-col items-center justify-center text-center group">
                  <h3 className="text-2xl font-bold text-white mb-4">Auditoria Digital</h3>
                  <p className="text-slate-400 max-w-xs text-sm leading-relaxed">100% das reuniões auditadas em minutos, com redução expressiva de custos operacionais.</p>
               </motion.div>
               {/* Item 3 - Light */}
               <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="bg-sky-200 p-12 md:p-20 flex flex-col items-center justify-center text-center group">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Mapa de Execução</h3>
                  <p className="text-slate-700 max-w-xs text-sm leading-relaxed">Gestão completa, com visão da jornada do projeto, custos e gaps de entrega.</p>
               </motion.div>
               {/* Item 4 - Dark */}
               <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="bg-[#050510] p-12 md:p-20 flex flex-col items-center justify-center text-center group">
                  <h3 className="text-2xl font-bold text-white mb-4">Gestão de Rede</h3>
                  <p className="text-slate-400 max-w-xs text-sm leading-relaxed">Benchmark inteligente de performance para eficiência operacional e modelos value-based.</p>
               </motion.div>
               {/* Item 5 - Light */}
               <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} viewport={{ once: true }} className="bg-sky-200 p-12 md:p-20 flex flex-col items-center justify-center text-center group">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Score de Risco</h3>
                  <p className="text-slate-700 max-w-xs text-sm leading-relaxed">Estratificação precisa da carteira para planejamento financeiro sustentável.</p>
               </motion.div>
               {/* Item 6 - Blue */}
               <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }} viewport={{ once: true }} className="bg-blue-600 p-12 md:p-20 flex flex-col items-center justify-center text-center group">
                  <h3 className="text-2xl font-bold text-white mb-4">Predict AI</h3>
                  <p className="text-blue-100 max-w-xs text-sm leading-relaxed">Modelos preditivos que antecipam eventos críticos e evitam atrasos desnecessários.</p>
               </motion.div>
            </div>
         </section >

         {/* SECURITY & COMPLIANCE SECTION - MOVED TO BOTTOM */}





         {/* SECTION: TRAINING / CONTEXTUAL INTELLIGENCE */}
         <TrainingSection />

         {/* RAG PIPELINE SECTION - RESTORED & UPGRADED */}
         <section ref={ragSectionRef} className="py-16 relative z-20 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-white/5 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6">
               <FadeIn>
                  <div className="text-center mb-16">
                     <Badge variant="glow" className="mb-4">Arquitetura Cognitiva</Badge>
                     <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        O fluxo da <span className="text-cyan-600 dark:text-cyan-400">Inteligência</span>
                     </h2>
                     <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Entenda como transformamos áudio bruto em decisões estratégicas auditáveis em milissegundos. Nossa solução utiliza um sistema RAG em conjunto com técnicas de machine learning para que você possa desbloquear todo o potencial da IA.
                     </p>
                  </div>
               </FadeIn>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Left: Interactive Steps with Circuit Connection */}
                  <div className="relative space-y-4">
                     {/* CIRCUIT BACKBONE */}
                     <div className="absolute left-12 top-8 bottom-8 w-0.5 bg-slate-200 dark:bg-white/10 z-0 hidden sm:block">
                        {/* Energy Flow Animation */}
                        <motion.div
                           animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
                           transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                           className="absolute left-0 w-full h-24 bg-gradient-to-b from-transparent via-cyan-400 to-transparent z-10"
                        />
                     </div>

                     {ragStages.map((stage, idx) => {
                        // Get safe color styles
                        const style = colorMap[stage.color] || colorMap.cyan;
                        const isActive = activeRagStage === idx;

                        return (
                           <motion.div
                              key={stage.id}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: idx * 0.1 }}
                              viewport={{ once: true }}
                              onClick={() => { setActiveRagStage(idx); setIsRagAutoPlaying(false); }}
                              className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border relative overflow-hidden z-10 ${isActive
                                 ? `bg-white dark:bg-slate-800 ${style.border} ${style.glow} scale-105`
                                 : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/5 opacity-80 hover:opacity-100'
                                 }`}
                           >
                              {isActive && (
                                 <motion.div layoutId="activeGlow" className={`absolute inset-0 ${style.bg} opacity-50`} />
                              )}
                              <div className="flex items-center gap-4 relative z-10">
                                 <div className={`p-3 rounded-xl transition-colors duration-300 ${isActive ? `${style.bg} ${style.text}` : 'bg-slate-100 dark:bg-white/5 text-slate-500'
                                    }`}>
                                    <stage.icon size={24} />
                                 </div>
                                 <div>
                                    <h3 className={`font-bold text-lg transition-colors duration-300 ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'
                                       }`}>
                                       {stage.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-500">
                                       {stage.desc}
                                    </p>
                                 </div>
                                 {isActive && (
                                    <div className="ml-auto">
                                       <div className={`w-2 h-2 rounded-full ${style.fill} animate-pulse`} />
                                    </div>
                                 )}
                              </div>
                           </motion.div>
                        );
                     })}
                  </div>

                  {/* Right: Technical Deep Dive Display */}
                  <FadeIn delay={0.2} direction="left">
                     <div className="relative h-[400px] lg:h-[500px] bg-slate-900 rounded-3xl border border-white/10 p-8 shadow-2xl overflow-hidden flex flex-col">
                        {/* Decor */}
                        <div className="absolute top-0 right-0 p-32 bg-cyan-500/10 rounded-full blur-[100px]" />
                        <div className="absolute bottom-0 left-0 p-32 bg-purple-500/10 rounded-full blur-[100px]" />
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                        <AnimatePresence mode="wait">
                           <motion.div
                              key={activeRagStage}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                              className="relative z-10 h-full flex flex-col"
                           >
                              {(() => {
                                 const currentStage = ragStages[activeRagStage];
                                 const activeStyle = colorMap[currentStage.color] || colorMap.cyan;

                                 return (
                                    <>
                                       <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                                          <div className="flex items-center gap-3">
                                             <div className={`p-2 rounded-lg ${activeStyle.bg} ${activeStyle.text}`}>
                                                {React.createElement(currentStage.icon, { size: 20 })}
                                             </div>
                                             <div className={`${activeStyle.text} font-mono text-sm tracking-widest uppercase`}>
                                                SYSTEM_STEP_0{activeRagStage + 1}
                                             </div>
                                          </div>
                                          <Badge variant="outline" className="border-white/10 text-slate-400 bg-white/5">
                                             Latência: &lt;120ms
                                          </Badge>
                                       </div>

                                       <div className="space-y-6 flex-1">
                                          <div>
                                             <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-2">Tecnologia</div>
                                             <div className="font-mono text-white text-lg bg-white/5 p-3 rounded-lg border border-white/5 flex items-center gap-3">
                                                <Code2 size={16} className={`text-${currentStage.color}-400`} />
                                                {currentStage.details.tech}
                                             </div>
                                          </div>

                                          <div>
                                             <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-2">Lógica de Processo</div>
                                             <p className="text-slate-300 leading-relaxed text-sm">
                                                {currentStage.details.action}
                                             </p>
                                          </div>

                                          <div className="mt-auto pt-6">
                                             <div className="flex gap-2 flex-wrap">
                                                {currentStage.details.meta.map((tag, i) => (
                                                   <span key={i} className={`px-3 py-1 rounded-full bg-slate-800 border border-white/10 text-xs ${activeStyle.text} font-mono opacity-80`}>
                                                      {tag}
                                                   </span>
                                                ))}
                                             </div>
                                          </div>
                                       </div>
                                    </>
                                 );
                              })()}
                           </motion.div>
                        </AnimatePresence>
                     </div>
                  </FadeIn>
               </div>
            </div>
         </section >

         {/* FEATURES GRID SECTION */}
         <ParallaxSection speed={0.08} offset={60}>
            <FeaturesGrid />
         </ParallaxSection>

         {/* FINAL CTA BLUE CARD */}
         {/* FINAL CTA BLUE CARD */}
         <section className="py-12 relative z-20 px-6 bg-[#ffdcf5] dark:bg-pink-950/20">
            <div className="max-w-6xl mx-auto">
               <FadeIn>
                  <div className="relative rounded-[2rem] p-16 md:p-24 text-center shadow-2xl dark:shadow-pink-900/20 overflow-hidden bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10">

                     {/* Custom Image Background */}
                     <div className="absolute inset-0 z-0 overflow-hidden">
                        <img
                           src="https://i.imgur.com/l67UYFj.png"
                           alt="Gradient Background"
                           className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />
                     </div>

                     <div className="relative z-10 flex flex-col items-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                           Pronto para assumir o controle?
                        </h2>
                        <p className="text-white text-lg md:text-xl max-w-2xl mb-10 font-medium leading-relaxed">
                           Deixe o caos das anotações manuais no passado. Junte-se aos líderes que usam dados para gerir pessoas e projetos.
                        </p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                           <Button
                              size="lg"
                              className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 font-bold h-14 px-10 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all"
                              onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
                           >
                              Solicitar Acesso ao Synapse
                           </Button>
                        </motion.div>
                     </div>
                  </div>
               </FadeIn>
            </div>
         </section>

         {/* FOOTER */}
         <footer id="contact-section" className="py-12 relative z-20 bg-white dark:bg-black border-t border-slate-200 dark:border-white/10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="text-slate-500 dark:text-slate-400 text-sm">
                  © 2024 Synapse Intelligence. Todos os direitos reservados.
               </div>
               <div className="flex gap-6">
                  <a href="#" className="text-slate-500 hover:text-cyan-500 transition-colors"><Share2 size={20} /></a>
                  <a href="#" className="text-slate-500 hover:text-cyan-500 transition-colors"><Globe size={20} /></a>
               </div>
            </div>
         </footer>
      </div >
   );
};

export default Home;