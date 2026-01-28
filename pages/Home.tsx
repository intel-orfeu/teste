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

import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Navbar } from '../components/ui/navbar';
import { useTheme } from '../lib/theme-provider';

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
            ctx.fillRect(cell.x + size/2 - 1, cell.y + 4, 2, size - 8);
            ctx.fillRect(cell.x + 4, cell.y + size/2 - 1, size - 8, 2);
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
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Neural Transcription</div>
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
                         <span className="text-xs font-bold text-cyan-600 dark:text-cyan-300">INSIGHT DETECTED</span>
                      </div>
                      <div className="text-[10px] text-slate-500">00:14:23</div>
                   </div>
                   <div className="h-24 w-full bg-cyan-50 dark:bg-cyan-500/5 rounded-lg border border-cyan-100 dark:border-cyan-500/10 relative overflow-hidden flex items-end justify-between px-2 pb-2 gap-1">
                      {[40, 70, 50, 90, 60, 80, 40, 60].map((h, i) => (
                         <motion.div 
                           key={i}
                           animate={{ height: [`${h/2}%`, `${h}%`, `${h/2}%`] }}
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
                   <div className="absolute bottom-4 text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest">Accuracy</div>
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
          tech: 'Gemini 2.5 Flash',
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
          tech: 'OpenAI text-embedding-3-small',
          action: 'O texto é convertido em vetores de 1536 dimensões e armazenados em um Banco Vetorial. Memórias similares são agrupadas.',
          meta: ['1536 Dimensions', 'Semantic Cluster', 'Pinecone DB']
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
      <Navbar />
      
      {/* 1. BACKGROUND: NEURAL NETWORK CANVAS */}
      <NeuralBackground />
      
      {/* Subtle overlay gradients for depth */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/30 dark:bg-indigo-900/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-200/30 dark:bg-cyan-900/10 blur-[120px]" />
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
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-600 dark:bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  Synapse Intelligence v2.0
               </Badge>
               
               <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-slate-900 dark:text-white">
                  Transforme <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 via-slate-800 to-slate-600 dark:from-slate-200 dark:via-slate-400 dark:to-slate-200">Conversas em</span> <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500 animate-gradient">
                    Dados Estratégicos
                  </span>
               </h1>
               
               <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed border-l-2 border-slate-200 dark:border-slate-800 pl-6">
                  A primeira plataforma de inteligência corporativa que <span className="text-cyan-600 dark:text-cyan-400">escuta, processa e executa</span> decisões de reuniões em tempo real. A Synapse conecta decisões à execução, cobra entregas, analisa riscos ocultos e audita a performance dos seus Squads.
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
                     <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-500" /> SOC2 Compliant
                  </div>
                  <div className="flex items-center gap-2">
                     <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-500" /> Enterprise Ready
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
                     className="absolute -right-6 top-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-cyan-500/30 p-4 rounded-xl shadow-xl dark:shadow-2xl z-30 max-w-[200px]"
                  >
                     <div className="flex items-start gap-3">
                        <div className="bg-green-100 dark:bg-green-500/20 p-1.5 rounded-lg text-green-600 dark:text-green-400"><Zap size={16} /></div>
                        <div>
                           <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Action Triggered</div>
                           <div className="text-xs font-medium text-slate-900 dark:text-white mt-1">Jira ticket created #4291</div>
                        </div>
                     </div>
                  </motion.div>

                  <motion.div 
                     initial={{ x: -20, opacity: 0 }}
                     animate={{ x: 0, opacity: 1, y: [0, 10, 0] }}
                     transition={{ delay: 1.5, duration: 5, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute -left-6 bottom-12 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-purple-500/30 p-4 rounded-xl shadow-xl dark:shadow-2xl z-30 max-w-[200px]"
                  >
                     <div className="flex items-start gap-3">
                        <div className="bg-purple-100 dark:bg-purple-500/20 p-1.5 rounded-lg text-purple-600 dark:text-purple-400"><Brain size={16} /></div>
                        <div>
                           <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Context Recall</div>
                           <div className="text-xs font-medium text-slate-900 dark:text-white mt-1">Linked to Q3 Strategy Doc</div>
                        </div>
                     </div>
                  </motion.div>
               </div>
            </motion.div>
        </div>
      </HeroSpotlight>

      {/* LOGO MARQUEE - Modernized */}
      <div className="w-full border-y border-slate-200 dark:border-white/5 py-12 overflow-hidden relative bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm z-10">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 dark:from-[#000206] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 dark:from-[#000206] to-transparent z-10" />
        <div className="flex w-full overflow-hidden">
          <motion.div 
             className="flex gap-20 min-w-full items-center px-8"
             animate={{ x: ["0%", "-50%"] }}
             transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
             {[...Array(10)].map((_, i) => (
               <div key={i} className="flex items-center gap-3 text-slate-400 dark:text-slate-500 font-bold text-lg shrink-0 grayscale hover:grayscale-0 hover:text-slate-900 dark:hover:text-white transition-all duration-500 cursor-pointer">
                 <div className="w-6 h-6 bg-slate-200 dark:bg-slate-800 rounded-sm rotate-45 border border-slate-300 dark:border-white/10" />
                 ENTERPRISE {i + 1}
               </div>
             ))}
             {[...Array(10)].map((_, i) => (
               <div key={`dup-${i}`} className="flex items-center gap-3 text-slate-400 dark:text-slate-500 font-bold text-lg shrink-0 grayscale hover:grayscale-0 hover:text-slate-900 dark:hover:text-white transition-all duration-500 cursor-pointer">
                 <div className="w-6 h-6 bg-slate-200 dark:bg-slate-800 rounded-sm rotate-45 border border-slate-300 dark:border-white/10" />
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
             <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-600 to-slate-900 dark:from-white dark:via-slate-300 dark:to-white mb-6">
                A desconexão custa <span className="text-red-500 dark:text-red-400">bilhões</span>.
             </h2>
             <p className="text-slate-600 dark:text-slate-400 text-lg">
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
                  className="p-8 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 backdrop-blur-sm hover:shadow-xl dark:hover:bg-slate-900/60 transition-all group shadow-sm"
               >
                  <div className={`text-6xl font-bold text-${stat.color}-600 dark:text-${stat.color}-500 mb-4 font-mono flex`}>
                     <Counter value={stat.val} suffix={stat.suffix} />
                  </div>
                  <div className="text-xl font-medium text-slate-800 dark:text-slate-200 mb-2">{stat.text}</div>
                  <div className="text-sm text-slate-500 border-t border-slate-100 dark:border-white/5 pt-4 mt-4 group-hover:border-${stat.color}-500/30 transition-colors">Fonte: {stat.sub}</div>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BENTO FEATURES - REDESIGNED */}
      <section id="features" className="py-32 relative z-20 overflow-hidden border-t border-slate-200 dark:border-white/10">
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

        <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <Badge variant="glow">Ecossistema Central</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                Um cérebro digital para <br/>
                <span className="text-cyan-600 dark:text-cyan-400">suas operações</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[300px]">
             
             {/* 1. Feature: Neural Context (Big Card) */}
             <motion.div 
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.6 }}
               whileHover={{ scale: 1.01 }}
               className="md:col-span-6 lg:col-span-8 row-span-2 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 overflow-hidden relative group backdrop-blur-md shadow-lg dark:shadow-none"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/50 dark:from-cyan-900/10 to-transparent transition-opacity group-hover:opacity-100 opacity-50" />
                <div className="p-8 h-full flex flex-col relative z-10">
                   <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                         <Network size={24} />
                      </div>
                      <Badge variant="outline" className="text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/20 bg-cyan-50 dark:bg-cyan-950/30">Synapse Core v2</Badge>
                   </div>
                   
                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Contexto Neural Persistente</h3>
                   <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">O Synapse conecta pontos entre reuniões, e-mails e tickets, criando uma memória institucional viva.</p>
                   
                   {/* Tech Visualization: Graph/Nodes */}
                   <div className="flex-1 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#050b14] relative overflow-hidden p-6 flex items-center">
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
                              <div className="px-3 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono shadow-sm">
                                 {node.label}
                              </div>
                           </div>
                         ))}
                         
                         {/* Connection Line */}
                         <div className="absolute top-[40%] left-10 right-10 h-px bg-gradient-to-r from-blue-500/20 via-cyan-500/50 to-purple-500/20 border-t border-dashed border-slate-300 dark:border-white/10" />
                         
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
               className="md:col-span-6 lg:col-span-6 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-md shadow-lg dark:shadow-none"
             >
                {/* Orange Mesh Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-bl from-orange-400 via-rose-50 to-amber-300 opacity-90 mix-blend-normal" />
                <div className="absolute inset-0 bg-white/30 backdrop-blur-3xl mix-blend-overlay" />
                
                <div className="flex justify-between items-start relative z-10 mb-6">
                   <div className="p-2 bg-white/40 rounded-lg text-orange-900"><TrendingUp size={20} /></div>
                   <div className="text-xs font-mono text-orange-950 font-bold bg-white/30 px-2 py-1 rounded">+14.2% YoY</div>
                </div>

                {/* Tiny Graph */}
                <div className="h-16 flex items-end gap-1 mb-4 opacity-80 relative z-10">
                   {[20, 45, 30, 60, 55, 75, 50, 80, 95].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ delay: i * 0.05 }}
                        className="flex-1 bg-orange-900/20 rounded-t-sm border-t border-orange-900/40 hover:bg-orange-900/40 transition-colors"
                      />
                   ))}
                </div>

                <div className="relative z-10">
                   <h3 className="text-lg font-bold text-slate-950">Sales Intelligence</h3>
                   <p className="text-sm text-slate-700 font-medium">Coaching automático baseado em performance.</p>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* RAG PIPELINE SECTION - RESTORED & UPGRADED */}
      <section ref={ragSectionRef} className="py-24 relative z-20 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-white/5 transition-colors duration-500">
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
                           className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border relative overflow-hidden z-10 ${
                              isActive 
                                 ? `bg-white dark:bg-slate-800 ${style.border} ${style.glow} scale-105` 
                                 : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/5 opacity-80 hover:opacity-100'
                           }`}
                        >
                           {isActive && (
                              <motion.div layoutId="activeGlow" className={`absolute inset-0 ${style.bg} opacity-50`} />
                           )}
                           <div className="flex items-center gap-4 relative z-10">
                              <div className={`p-3 rounded-xl transition-colors duration-300 ${
                                 isActive ? `${style.bg} ${style.text}` : 'bg-slate-100 dark:bg-white/5 text-slate-500'
                              }`}>
                                 <stage.icon size={24} />
                              </div>
                              <div>
                                 <h3 className={`font-bold text-lg transition-colors duration-300 ${
                                    isActive ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'
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
                                          Latency: &lt;120ms
                                       </Badge>
                                    </div>

                                    <div className="space-y-6 flex-1">
                                       <div>
                                          <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-2">Technology</div>
                                          <div className="font-mono text-white text-lg bg-white/5 p-3 rounded-lg border border-white/5 flex items-center gap-3">
                                             <Code2 size={16} className={`text-${currentStage.color}-400`} />
                                             {currentStage.details.tech}
                                          </div>
                                       </div>

                                       <div>
                                          <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-2">Process Logic</div>
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
      </section>

      {/* NEW SECTION: COLOR BLOCK GRID (Solutions) */}
      <section className="w-full relative z-20">
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
      </section>

      {/* NEW SECTION: INTEGRATED PROJECT MANAGEMENT DEEP DIVE WITH DIGITAL FLUX BACKGROUND */}
      <section className="py-24 relative z-20 bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors duration-500">
        
        {/* NEW: THE PHOTO RECREATION BACKGROUND */}
        <DigitalFluxBackground />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
           
           <FadeIn>
             <div className="text-center mb-16">
                <Badge variant="purple" className="mb-4">Gestão de Projetos Integrada</Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Não é só transcrição. <br/><span className="text-purple-600 dark:text-purple-400">É o cérebro do seu PMO.</span></h2>
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
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live Sync
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
                                        <strong>João</strong> tem 3 tarefas vencidas há +48h. <br/><span className="text-slate-400">→ Notificado ✓</span>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-start p-3 bg-red-50 dark:bg-red-900/10 rounded border border-red-100 dark:border-red-500/20">
                                    <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
                                    <div className="text-xs text-slate-600 dark:text-slate-300">
                                        <strong>Projeto C</strong> sem atualização há 7 dias. <br/><span className="text-red-500">→ Escalado ao gestor</span>
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
                                        <Sparkles size={12} /> Insight AI
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
                       <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500"><Brain size={20} /></div>
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
                       <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500"><Network size={20} /></div>
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
                       <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500"><Zap size={20} /></div>
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
                       <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500"><Briefcase size={20} /></div>
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
                       <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500"><TrendingUp size={20} /></div>
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
           </div>

           {/* FINAL PUNCHLINE FOR SECTION */}
           <FadeIn className="mt-20 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8">
                 "Ferramentas de transcrição te mostram o que foi dito.<br/>
                 <span className="text-cyan-600 dark:text-cyan-400">Synapse garante que o que foi decidido seja feito.</span>"
              </h3>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <Button size="lg" variant="default" className="bg-slate-900 text-white dark:bg-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200">
                    Ver demonstração <ArrowRight size={16} className="ml-2"/>
                 </Button>
                 <Button size="lg" variant="ghost">
                    Comparar planos
                 </Button>
              </div>
           </FadeIn>

        </div>
      </section>

      {/* SECURITY & COMPLIANCE SECTION - MOVED TO BOTTOM */}
      <section className="py-24 relative z-20 bg-slate-50 dark:bg-[#0B1121] border-t border-slate-200 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
             {/* SECURITY CARD - PREMIUM EXECUTIVE REDESIGN (Emerald Vault Theme) */}
             <motion.div 
               initial="hidden"
               whileInView="show"
               variants={containerVariants}
               viewport={{ once: true, margin: "-100px" }}
               className="w-full h-auto min-h-[500px] rounded-3xl relative overflow-hidden shadow-2xl transition-all border border-emerald-100 dark:border-emerald-900/30 flex flex-col group/card"
             >
                {/* 1. EXECUTIVE BACKGROUND: Deep Emerald Vault */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-white dark:from-[#022c22] dark:via-[#064e3b] dark:to-[#022c22] transition-colors duration-500" />
                
                {/* 2. NOISE TEXTURE & GRID */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98110_1px,transparent_1px),linear-gradient(to_bottom,#10b98110_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                {/* 3. ANIMATED SCANLINE (Executive "Active Monitoring" Feel) */}
                <motion.div 
                  animate={{ top: ["-10%", "110%"] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                  className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent blur-xl pointer-events-none z-0"
                />

                <div className="relative z-10 flex flex-col h-full gap-8 p-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-emerald-900/10 dark:border-emerald-100/10 pb-8 gap-4">
                        <div className="flex items-center gap-5">
                           <div className="w-16 h-16 bg-white dark:bg-emerald-950/80 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-xl shadow-emerald-900/5 border border-emerald-100 dark:border-emerald-800">
                              <ShieldCheck size={32} />
                           </div>
                           <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-3xl font-bold text-emerald-950 dark:text-emerald-50 tracking-tight">Segurança & Compliance</h3>
                                <div className="hidden md:flex px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-700 items-center gap-2">
                                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                   <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">System Secure</span>
                                </div>
                              </div>
                              <p className="text-base text-emerald-800/70 dark:text-emerald-200/60 font-medium">Padrões bancários de proteção de dados. Seus dados são seus, e de mais ninguém.</p>
                           </div>
                        </div>
                        <Button variant="glass" className="bg-white/60 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100 hover:bg-white dark:hover:bg-emerald-900/50 border-emerald-200/50 dark:border-emerald-800/50 backdrop-blur-md">
                          Ver Trust Center <ArrowRight size={16} className="ml-2" />
                        </Button>
                    </div>

                    {/* STAGGERED GRID CONTENT */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                        
                        {/* 1. SOC 2 Type II */}
                        <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-white/60 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-800/30 hover:bg-white dark:hover:bg-emerald-900/40 hover:border-emerald-300 dark:hover:border-emerald-600/50 transition-all duration-300 group flex flex-col gap-4">
                           <div className="w-12 h-12 rounded-xl bg-[#2563eb] flex items-center justify-center text-white shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform duration-300">
                              <span className="font-bold text-[10px] text-center leading-tight">AICPA<br/>SOC 2</span>
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">SOC 2 Type II</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                 A Synapse segue os mais rigorosos padrões da indústria para segurança de dados, privacidade e confidencialidade. Auditoria anual completa.
                              </p>
                           </div>
                        </motion.div>

                        {/* 2. GDPR */}
                        <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-white/60 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-800/30 hover:bg-white dark:hover:bg-emerald-900/40 hover:border-emerald-300 dark:hover:border-emerald-600/50 transition-all duration-300 group flex flex-col gap-4">
                           <div className="w-12 h-12 rounded-xl bg-[#2563eb] flex items-center justify-center text-white shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform duration-300">
                              <div className="border border-white/40 rounded-full p-1"><Globe size={16} /></div>
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">GDPR & LGPD</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                 Padrões rigorosos de proteção de dados e privacidade em conformidade total com regulações europeias e a LGPD brasileira.
                              </p>
                           </div>
                        </motion.div>

                        {/* 3. HIPAA */}
                        <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-white/60 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-800/30 hover:bg-white dark:hover:bg-emerald-900/40 hover:border-emerald-300 dark:hover:border-emerald-600/50 transition-all duration-300 group flex flex-col gap-4">
                           <div className="w-12 h-12 rounded-xl bg-[#1e293b] flex items-center justify-center text-white shadow-lg shadow-slate-900/20 group-hover:scale-110 transition-transform duration-300">
                              <Activity size={20} />
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">HIPAA Compliant</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                 Proteção completa para organizações de saúde. Nossa infraestrutura está pronta para processar dados sensíveis (PHI).
                              </p>
                           </div>
                        </motion.div>

                        {/* 4. Zero Data Retention */}
                        <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-white/60 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-800/30 hover:bg-white dark:hover:bg-emerald-900/40 hover:border-emerald-300 dark:hover:border-emerald-600/50 transition-all duration-300 group flex flex-col gap-4">
                           <div className="w-12 h-12 rounded-xl bg-[#d1fae5] dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm border border-emerald-200 dark:border-emerald-800 group-hover:scale-110 transition-transform duration-300">
                              <EyeOff size={20} />
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Retenção Zero de IA</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                 Seus dados nunca são usados para treinamento de IA ou qualquer propósito fora das necessidades diretas do seu negócio.
                              </p>
                           </div>
                        </motion.div>

                        {/* 5. Private Storage */}
                        <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-white/60 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-800/30 hover:bg-white dark:hover:bg-emerald-900/40 hover:border-emerald-300 dark:hover:border-emerald-600/50 transition-all duration-300 group flex flex-col gap-4">
                           <div className="w-12 h-12 rounded-xl bg-[#f3e8ff] dark:bg-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-sm border border-purple-200 dark:border-purple-800 group-hover:scale-110 transition-transform duration-300">
                              <Database size={20} />
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Armazenamento Privado</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                 Armazenamento em nuvem dedicado e seguro, exclusivo para os dados da sua organização (Silos isolados).
                              </p>
                           </div>
                        </motion.div>

                        {/* 6. Customer Ownership */}
                        <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-white/60 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-800/30 hover:bg-white dark:hover:bg-emerald-900/40 hover:border-emerald-300 dark:hover:border-emerald-600/50 transition-all duration-300 group flex flex-col gap-4">
                           <div className="w-12 h-12 rounded-xl bg-[#fef9c3] dark:bg-yellow-900/40 flex items-center justify-center text-yellow-600 dark:text-yellow-400 shadow-sm border border-yellow-200 dark:border-yellow-800 group-hover:scale-110 transition-transform duration-300">
                              <Lock size={20} />
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">Propriedade do Cliente</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                 Você mantém controle total e propriedade dos seus dados, explicitamente declarado em nossos Termos de Serviço.
                              </p>
                           </div>
                        </motion.div>

                    </div>

                    {/* Footer Metrics - Unified Strip */}
                    <div className="flex flex-wrap gap-x-8 gap-y-2 pt-6 border-t border-emerald-900/10 dark:border-emerald-100/10 mt-auto opacity-80">
                       <div className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                          <span className="text-xs font-mono font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider">AES-256 Encryption</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                          <span className="text-xs font-mono font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider">TLS 1.3 In-Transit</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                          <span className="text-xs font-mono font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider">SAML SSO Ready</span>
                       </div>
                    </div>
                </div>
             </motion.div>
        </div>
      </section>

      {/* NEW SECTION 1.5: PROJECT INTELLIGENCE MODULES */}
      <section className="py-16 relative z-20 bg-white/50 dark:bg-black/50 border-t border-slate-200 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
           <FadeIn>
             <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4">Módulos de Inteligência</Badge>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Capacidades Específicas</h2>
             </div>
           </FadeIn>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                 { icon: Workflow, title: "Workflow Automation", desc: "Dispara ações em Jira, Slack e Trello automaticamente." },
                 { icon: Shield, title: "Risk Detection", desc: "Identifica riscos em falas sutis durante reuniões." },
                 { icon: Users, title: "Squad Health", desc: "Monitora o engajamento e burnout da equipe." },
                 { icon: LineChart, title: "Cost Analysis", desc: "Calcula o custo real de cada reunião em tempo real." }
              ].map((item, i) => (
                 <FadeIn key={i} delay={i * 0.1}>
                   <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-cyan-500/50 transition-colors h-full">
                      <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-4">
                         <item.icon size={20} />
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                   </div>
                 </FadeIn>
              ))}
           </div>
        </div>
      </section>

      {/* FINAL CTA BLUE CARD */}
      <section className="py-20 relative z-20 px-6">
         <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="bg-[#0ea5e9] dark:bg-sky-600 rounded-[2rem] p-16 md:p-24 text-center shadow-2xl dark:shadow-sky-900/20 relative overflow-hidden">
                 <div className="relative z-10 flex flex-col items-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                       Pronto para assumir o controle?
                    </h2>
                    <p className="text-sky-50 text-lg md:text-xl max-w-2xl mb-10 font-medium leading-relaxed">
                       Deixe o caos das anotações manuais no passado. Junte-se aos líderes que usam dados para gerir pessoas e projetos.
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        size="lg" 
                        className="bg-white text-sky-600 hover:bg-sky-50 font-bold h-14 px-10 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all"
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
    </div>
  );
};

export default Home;