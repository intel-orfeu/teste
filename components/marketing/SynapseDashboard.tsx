import React from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    CheckSquare,
    Calendar,
    Folder,
    Users,
    Inbox,
    Zap,
    Brain,
    Activity,
    Clock,
    CheckCircle2,
    AlertCircle,
    Bot,
    Plus
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

export const SynapseDashboard = () => {
    return (
        <div className="relative w-full aspect-[16/9] bg-zinc-50/90 dark:bg-zinc-900/80 rounded-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl overflow-hidden shadow-2xl group select-none font-sans">
            {/* Ambient Background Effects - Changed to Cyan/Blue */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-50" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

            <div className="flex h-full relative z-10">
                {/* SIDEBAR - Dark Theme like Orfeu but with Cyan accent */}
                <div className="w-16 h-full bg-[#0B1121] flex flex-col items-center py-6 gap-6 border-r border-white/5">
                    <div className="relative group/logo cursor-pointer">
                        {/* Brain Logo Container */}
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B1121] to-[#162032] border border-cyan-500/30 flex items-center justify-center relative shadow-[0_0_15px_rgba(6,182,212,0.15)] overflow-hidden">
                            {/* Synapse Pulses */}
                            <motion.div
                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 bg-cyan-500/20 rounded-full blur-md"
                            />

                            {/* Brain Icon */}
                            <Brain size={20} className="text-cyan-400 relative z-10" />

                            {/* Incoming Synapses (Particles) */}
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_5px_white] z-20"
                                    initial={{ opacity: 0, x: -15, y: -15 }} // Start corner
                                    animate={{
                                        opacity: [0, 1, 0],
                                        x: 0,
                                        y: 0
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.5,
                                        ease: "circIn"
                                    }}
                                />
                            ))}
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={`b-${i}`}
                                    className="absolute w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_5px_cyan] z-20"
                                    initial={{ opacity: 0, x: 15, y: 15 }} // Opposite corner
                                    animate={{
                                        opacity: [0, 1, 0],
                                        x: 0,
                                        y: 0
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: 0.2 + (i * 0.5),
                                        ease: "circIn"
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 w-full px-3">
                        <SidebarIcon icon={LayoutDashboard} active />
                        <SidebarIcon icon={CheckSquare} />
                        <SidebarIcon icon={Calendar} />
                        <SidebarIcon icon={Folder} />
                        <SidebarIcon icon={Inbox} />
                        <SidebarIcon icon={Users} />
                    </div>

                    <div className="mt-auto pb-4 opacity-50">
                        <div className="w-8 h-8 rounded-full bg-white/10" />
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="flex-1 flex flex-col p-6 overflow-hidden">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Boa noite, Caio.</h3>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mt-1">
                                Synapse Hub &bull; Cockpit
                            </p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 text-[10px] px-2 py-0.5">
                                <CheckCircle2 size={10} className="mr-1" /> 6 concluídas
                            </Badge>
                            <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200 text-[10px] px-2 py-0.5">
                                <AlertCircle size={10} className="mr-1" /> 1 atrasada
                            </Badge>

                            {/* Invite Robot Button */}
                            <button className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30 text-[10px] font-bold hover:bg-cyan-200 dark:hover:bg-cyan-500/30 transition-colors">
                                <Bot size={12} />
                                Convidar
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-6 h-full items-stretch min-h-0">
                        {/* LEFT: Task List & Scheduled Meetings */}
                        <div className="flex-[1.4] flex flex-col gap-6 min-h-0">

                            {/* Minhas Tarefas (Shortened) */}
                            <div className="flex flex-col gap-3 min-h-[40%]">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                        Minhas Tarefas
                                    </span>
                                    <span className="text-[10px] text-zinc-400">Ver todas</span>
                                </div>

                                <div className="space-y-3 relative">
                                    <TaskItem
                                        title="Revisar Integração do e-mail"
                                        tag="Nova"
                                        delay={0}
                                        color="cyan"
                                    />
                                    <TaskItem
                                        title="Terminar a dashboard"
                                        tag="Em andamento"
                                        color="cyan"
                                        delay={0.2}
                                    />
                                </div>
                            </div>

                            {/* Reuniões Agendadas (New Section) */}
                            <div className="flex flex-col gap-3 flex-1 min-h-0">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                        Reuniões Agendadas
                                    </span>
                                    <span className="text-[10px] text-zinc-400">Ver todas</span>
                                </div>

                                <div className="space-y-3 relative overflow-hidden">
                                    <MeetingItem
                                        title="Alinhamento Semanal"
                                        time="10:00 - 11:00"
                                        users={3}
                                        delay={0.4}
                                    />
                                    <MeetingItem
                                        title="Review de Produto"
                                        time="14:30 - 15:30"
                                        users={5}
                                        delay={0.6}
                                        active
                                    />
                                    {/* Gradient Fade at bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-zinc-50/90 dark:from-zinc-900/90 to-transparent z-10" />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Widgets */}
                        <div className="flex-1 flex flex-col gap-4 min-h-0">
                            {/* Top Widget: Graph */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-white dark:bg-zinc-800/50 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700 shadow-sm relative overflow-hidden group/graph h-32 flex flex-col justify-between"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Performance</span>
                                    <Activity size={14} className="text-cyan-500" />
                                </div>

                                <div className="flex items-end justify-between h-full gap-2 px-1 pb-1">
                                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            transition={{ delay: 1 + i * 0.1, duration: 1 }}
                                            className={cn(
                                                "w-full rounded-t-sm opacity-80",
                                                i === 5 ? "bg-cyan-500" : "bg-zinc-200 dark:bg-zinc-700 group-hover/graph:bg-cyan-300 dark:group-hover/graph:bg-cyan-500/30 transition-colors"
                                            )}
                                        />
                                    ))}
                                </div>
                            </motion.div>

                            {/* Bottom Widget: Circular Progress */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="flex-1 bg-white dark:bg-zinc-800/50 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700 shadow-sm flex items-center justify-between min-h-[100px]"
                            >
                                <div>
                                    <div className="text-xl font-bold text-zinc-900 dark:text-white">9 Pendentes</div>
                                    <div className="text-[10px] text-zinc-500 uppercase font-medium mt-1">Esta Semana</div>
                                </div>
                                <div className="relative w-14 h-14 flex items-center justify-center">
                                    <svg className="w-full h-full rotate-[-90deg]">
                                        <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="none" className="text-zinc-100 dark:text-zinc-700" />
                                        <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="150" strokeDashoffset="40" className="text-cyan-500 rounded-full" />
                                    </svg>
                                    <Clock size={14} className="text-zinc-400 absolute" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Floating Cards - "Orfeu Brain" Animations - Changed to Cyan/Purple */}
                <FloatingCard
                    icon={Zap}
                    title="Ação Automática"
                    subtitle="Card criado no Trello"
                    color="bg-cyan-500"
                    x="right"
                    delay={2}
                />
                <FloatingCard
                    icon={Brain}
                    title="Memória Recuperada"
                    subtitle="Vínculo com Projeto X"
                    color="bg-purple-600"
                    x="left"
                    delay={3}
                />
            </div>
        </div>
    );
}

const SidebarIcon = ({ icon: Icon, active }: { icon: any, active?: boolean }) => (
    <div className={cn(
        "p-2 rounded-lg transition-all duration-300 cursor-default",
        active ? "bg-white/10 text-cyan-400" : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
    )}>
        <Icon size={18} />
    </div>
);

const TaskItem = ({ title, tag, color = "cyan", delay }: { title: string, tag: string, color?: "orange" | "blue" | "green" | "cyan", delay: number }) => (
    <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 + delay }}
        className="group flex gap-3 items-center p-3 rounded-xl bg-white dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-700/50 shadow-sm hover:shadow-md hover:border-cyan-200 dark:hover:border-cyan-500/30 transition-all cursor-pointer"
    >
        <div className="w-5 h-5 rounded-full border-2 border-zinc-300 dark:border-zinc-600 group-hover:border-cyan-500 transition-colors shrink-0" />

        <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-zinc-700 dark:text-zinc-200 truncate group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                {title}
            </div>
        </div>

        <Badge variant="secondary" className={cn(
            "text-[9px] px-1.5 h-5 font-bold uppercase tracking-wide opacity-80",
            color === "orange" && "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400",
            color === "blue" && "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
            color === "cyan" && "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-400",
        )}>
            {tag}
        </Badge>
    </motion.div>
);

const MeetingItem = ({ title, time, users, delay, active }: { title: string, time: string, users: number, delay: number, active?: boolean }) => (
    <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 + delay }}
        className={cn(
            "group flex gap-3 items-center p-3 rounded-xl border shadow-sm transition-all cursor-pointer",
            active
                ? "bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/30"
                : "bg-white dark:bg-zinc-800/40 border-zinc-100 dark:border-zinc-700/50 hover:shadow-md hover:border-purple-200 dark:hover:border-purple-500/30"
        )}
    >
        <div className={cn(
            "flex flex-col items-center justify-center w-10 h-10 rounded-lg text-xs font-bold leading-none",
            active ? "bg-purple-200 text-purple-700 dark:bg-purple-500/30 dark:text-purple-300" : "bg-zinc-100 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400"
        )}>
            <span>28</span>
            <span className="text-[8px] uppercase">JAN</span>
        </div>

        <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-zinc-700 dark:text-zinc-200 truncate">
                {title}
            </div>
            <div className="text-[10px] text-zinc-500 flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1"><Clock size={10} /> {time}</span>
                <span className="flex items-center gap-1"><Users size={10} /> {users}</span>
            </div>
        </div>

        {active && (
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
        )}
    </motion.div>
);

const FloatingCard = ({ icon: Icon, title, subtitle, color, x, delay }: any) => (
    <motion.div
        initial={{ [x === 'right' ? 'x' : '-x']: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1, y: [0, -10, 0] }}
        transition={{ delay, duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
            "absolute top-20 z-30 p-3 rounded-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 w-48",
            x === 'right' ? "-right-12" : "-left-12 bottom-20 top-auto"
        )}
    >
        <div className={cn("p-1.5 rounded-lg text-white shadow-sm", color)}>
            <Icon size={14} />
        </div>
        <div>
            <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">{title}</div>
            <div className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 leading-tight">{subtitle}</div>
        </div>
    </motion.div>
);
