import { motion } from "framer-motion";

interface IconProps {
    size?: number;
    className?: string;
    gradient?: boolean;
    animated?: boolean;
}

export function ProcessFlowIcon({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M4 6h4v4H4V6ZM16 6h4v4h-4V6ZM10 14h4v4h-4v-4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 8h8M12 10v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export function FolderLayersIcon({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 13h10M7 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export function BookStarIcon({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 6l1.09 2.26L15.5 8.5l-1.73 1.73L14.18 13 12 11.77 9.82 13l.41-2.77L8.5 8.5l2.41-.24L12 6Z" fill="currentColor" />
        </svg>
    );
}

export function DashboardLayersIcon({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
            <rect x="14" y="3" width="7" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
            <rect x="14" y="10" width="7" height="11" rx="1" stroke="currentColor" strokeWidth="2" />
            <rect x="3" y="13" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="2" />
        </svg>
    );
}

export function TargetPrecisionIcon({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
    );
}

export function TrendArrowIcon({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M22 7l-8.5 8.5-5-5L2 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 7h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function ConnectedUsersIcon({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
            <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="19" cy="7" r="2" stroke="currentColor" strokeWidth="2" />
            <path d="M19 11v2m0 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export function GridFlowIcon({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <rect x="3" y="3" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="2" />
            <rect x="10" y="3" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="2" />
            <rect x="17" y="3" width="4" height="5" rx="1" stroke="currentColor" strokeWidth="2" />
            <rect x="3" y="10" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="2" />
            <rect x="10" y="10" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="2" />
            <rect x="3" y="17" width="5" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
            <path d="M12 15v6M19 8v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export function LightbulbSparkIcon({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M9 21h6M12 3a6 6 0 00-4 10.5V17a1 1 0 001 1h6a1 1 0 001-1v-3.5A6 6 0 0012 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 17v-3M14 17v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export function SparkleStarIcon({ size = 24, className = "", gradient = false, animated = false }: IconProps) {
    const IconContent = () => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2Z" fill="currentColor" />
            <circle cx="19" cy="5" r="1.5" fill="currentColor" opacity="0.6" />
            <circle cx="5" cy="19" r="1" fill="currentColor" opacity="0.4" />
        </svg>
    );

    if (animated) {
        return (
            <motion.div
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <IconContent />
            </motion.div>
        );
    }

    return <IconContent />;
}

// ============ NEW ICON VARIATIONS ============

export function BrainAIIcon({ size = 24, className = "", animated = false }: IconProps) {
    const IconContent = () => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M12 4.5a4.5 4.5 0 00-4.5 4.5c0 1.5.7 2.8 1.8 3.7L8 18h8l-1.3-5.3c1.1-.9 1.8-2.2 1.8-3.7A4.5 4.5 0 0012 4.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 18v2a1 1 0 001 1h4a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="10" cy="9" r="1" fill="currentColor" />
            <circle cx="14" cy="9" r="1" fill="currentColor" />
            <path d="M10 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 2v2M6 4l1.5 1.5M18 4l-1.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );

    if (animated) {
        return (
            <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <IconContent />
            </motion.div>
        );
    }
    return <IconContent />;
}

export function AnalyticsChartIcon({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M7 14l3-3 2 2 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="17" cy="8" r="2" fill="currentColor" />
        </svg>
    );
}

export function CalendarCheckIcon({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M9 15l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function ChatBubblesIcon({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 10h8M8 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export function DocumentStackIcon({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2Z" stroke="currentColor" strokeWidth="2" />
            <path d="M9 7h6M9 11h6M9 15h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 6v12a2 2 0 002 2h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </svg>
    );
}

export function FlagProgressIcon({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 22v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="9" r="2" fill="currentColor" />
        </svg>
    );
}

export function PulseWaveIcon({ size = 24, className = "", animated = false }: IconProps) {
    const IconContent = () => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M2 12h4l2-6 4 12 4-8 2 2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    if (animated) {
        return (
            <motion.div
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
                <IconContent />
            </motion.div>
        );
    }
    return <IconContent />;
}

export function RocketLaunchIcon({ size = 24, className = "", animated = false }: IconProps) {
    const IconContent = () => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11.95A22 22 0 0112 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="17" cy="7" r="2" fill="currentColor" />
        </svg>
    );

    if (animated) {
        return (
            <motion.div
                animate={{ y: [0, -3, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <IconContent />
            </motion.div>
        );
    }
    return <IconContent />;
}

export function ShieldVerifiedIcon({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function TimerClockIcon({ size = 24, className = "", animated = false }: IconProps) {
    const IconContent = () => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="M12 9v4l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 2h6M12 2v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );

    if (animated) {
        return (
            <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
                <IconContent />
            </motion.div>
        );
    }
    return <IconContent />;
}

export function WaveformIcon({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M4 12h2M8 8v8M12 4v16M16 8v8M20 12h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export function ZapBoltIcon({ size = 24, className = "", animated = false }: IconProps) {
    const IconContent = () => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z" fill="currentColor" />
        </svg>
    );

    if (animated) {
        return (
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <IconContent />
            </motion.div>
        );
    }
    return <IconContent />;
}

export function NetworkNodesIcon({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
            <circle cx="4" cy="6" r="2" stroke="currentColor" strokeWidth="2" />
            <circle cx="20" cy="6" r="2" stroke="currentColor" strokeWidth="2" />
            <circle cx="4" cy="18" r="2" stroke="currentColor" strokeWidth="2" />
            <circle cx="20" cy="18" r="2" stroke="currentColor" strokeWidth="2" />
            <path d="M6 7l4 3M14 9l4-2M6 17l4-3M14 15l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export function MicrophoneWaveIcon({ size = 24, className = "", animated = false }: IconProps) {
    const IconContent = () => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="2" />
            <path d="M5 10v1a7 7 0 0014 0v-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 18v4M8 22h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );

    if (animated) {
        return (
            <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            >
                <IconContent />
            </motion.div>
        );
    }
    return <IconContent />;
}

export function LayersStackIcon({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M12 2L2 7l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function RefreshSyncIcon({ size = 24, className = "", animated = false }: IconProps) {
    const IconContent = () => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 3v5h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 21v-5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    if (animated) {
        return (
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
                <IconContent />
            </motion.div>
        );
    }
    return <IconContent />;
}

export function SpeakerWaveIcon({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M19.07 4.93a10 10 0 010 14.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export function FilterFunnelIcon({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M3 4h18l-7 8.5V20l-4-2v-5.5L3 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
// ============ ALIASES FOR COMPATIBILITY ============
export {
    WaveformIcon as AudioWaveIcon,
    ConnectedUsersIcon as CollaborationIcon,
    ShieldVerifiedIcon as SecurityShieldIcon,
    BrainAIIcon as NeuralNetworkIcon,
    BrainAIIcon as ContextBrainIcon
};
