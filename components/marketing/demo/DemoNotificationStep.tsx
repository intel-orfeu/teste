import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Check, Mail, MessageSquare, Bell, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DemoNotificationStepProps {
    isActive: boolean;
}

const notifications = [
    { channel: "Slack", icon: MessageSquare, recipient: "João M.", color: "bg-purple-500" },
    { channel: "Email", icon: Mail, recipient: "Ana S.", color: "bg-blue-500" },
    { channel: "Push", icon: Bell, recipient: "Carlos P.", color: "bg-amber-500" }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.4,
            delayChildren: 0.3
        }
    }
};

const notificationVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.8 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { type: "spring" as const, stiffness: 100 }
    }
};

const trailVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
        scaleX: 1,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" as const }
    }
};

const checkmarkVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
        scale: 1,
        rotate: 0,
        transition: {
            type: "spring" as const,
            stiffness: 200,
            delay: 0.3
        }
    }
};

export function DemoNotificationStep({ isActive }: DemoNotificationStepProps) {
    const [sentNotifications, setSentNotifications] = useState<number[]>([]);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        // We only progress if active, but we DON'T reset sentNotifications if inactive
        if (!isActive) return;

        // Send notifications sequentially
        notifications.forEach((_, index) => {
            if (sentNotifications.includes(index)) return;

            setTimeout(() => {
                setSentNotifications(prev => {
                    if (prev.includes(index)) return prev;
                    return [...prev, index];
                });
            }, (500 + index * 800) - (sentNotifications.length * 800));
        });

        // Show confetti after all notifications
        if (sentNotifications.length === notifications.length && !showConfetti) {
            const timer = setTimeout(() => {
                setShowConfetti(true);
            }, 500);
            return () => clearTimeout(timer);
        }

    }, [isActive, sentNotifications, showConfetti]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl relative h-full border border-white/5"
        >
            {/* Confetti particles */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                backgroundColor: ['#8B5CF6', '#EC4899', '#10B981', '#F59E0B'][i % 4]
                            }}
                            initial={{ y: -10, opacity: 1 }}
                            animate={isActive ? {
                                y: 400,
                                opacity: 0,
                                x: (Math.random() - 0.5) * 100,
                                rotate: Math.random() * 360
                            } : { opacity: 0.5 }}
                            transition={isActive ? {
                                duration: 2 + Math.random(),
                                ease: "easeOut",
                                delay: Math.random() * 0.5
                            } : { duration: 1 }}
                        />
                    ))}
                </div>
            )}

            {/* Header */}
            <div className="p-4 border-b border-slate-800 bg-gradient-to-r from-amber-950/50 to-rose-950/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <motion.div
                            animate={isActive ? { rotate: [0, 15, -15, 0] } : { rotate: 0 }}
                            transition={{ duration: 0.5, repeat: showConfetti && isActive ? 3 : 0 }}
                        >
                            🔔
                        </motion.div>
                        <span className="text-sm font-medium text-white">
                            Time notificado!
                        </span>
                    </div>
                    {showConfetti && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                        >
                            <Badge className="bg-gradient-to-r from-violet-500/20 to-rose-500/20 text-white border-violet-500/30">
                                <Sparkles className="w-3 h-3 mr-1" />
                                Processo completo!
                            </Badge>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Notifications */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="p-6 space-y-4"
            >
                {notifications.map((notification, index) => {
                    const isSent = sentNotifications.includes(index);
                    const Icon = notification.icon;

                    return (
                        <motion.div
                            key={index}
                            variants={notificationVariants}
                            className="flex items-center gap-4"
                        >
                            {/* Channel icon */}
                            <motion.div
                                animate={isSent && isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className={`w-12 h-12 rounded-xl ${notification.color} flex items-center justify-center shadow-lg border border-white/10`}
                            >
                                <Icon className="w-6 h-6 text-white" />
                            </motion.div>

                            {/* Trail animation */}
                            <div className="flex-1 relative">
                                <motion.div
                                    variants={trailVariants}
                                    className="h-1 bg-gradient-to-r from-slate-600 via-white/50 to-slate-600 rounded-full origin-left"
                                />

                                {/* Flying dots on trail */}
                                {isSent && (
                                    <motion.div
                                        initial={isActive ? { left: "0%", opacity: 1 } : { left: "100%", opacity: 0.2 }}
                                        animate={isActive ? { left: "100%", opacity: 0 } : {}}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg shadow-white/50"
                                    />
                                )}
                            </div>

                            {/* Recipient */}
                            <div className="flex items-center gap-3 min-w-[120px]">
                                <AnimatePresence>
                                    {isSent && (
                                        <motion.div
                                            variants={checkmarkVariants}
                                            initial="hidden"
                                            animate="visible"
                                            className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm"
                                        >
                                            <Check className="w-4 h-4 text-white" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <span className={`text-sm ${isSent ? "text-white" : "text-slate-500"}`}>
                                    {notification.recipient}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Success message */}
            <AnimatePresence>
                {showConfetti && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 border-t border-slate-800 bg-gradient-to-r from-emerald-950/30 to-teal-950/30"
                    >
                        <p className="text-center text-sm text-emerald-300">
                            ✨ Processo completo em <span className="font-bold">45 segundos</span>!
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

