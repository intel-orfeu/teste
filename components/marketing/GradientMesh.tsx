import { motion } from "framer-motion";

interface GradientMeshProps {
    variant?: "rose" | "blue" | "violet" | "emerald";
    intensity?: "low" | "medium" | "high";
    className?: string;
}

const variantColors = {
    rose: ["#f43f5e", "#ec4899", "#a855f7"],
    blue: ["#3b82f6", "#6366f1", "#06b6d4"],
    violet: ["#8b5cf6", "#a855f7", "#c084fc"],
    emerald: ["#10b981", "#22c55e", "#14b8a6"]
};

const intensityOpacity = {
    low: 0.1,
    medium: 0.2,
    high: 0.3
};

export function GradientMesh({
    variant = "rose",
    intensity = "medium",
    className = ""
}: GradientMeshProps) {
    const colors = variantColors[variant];
    const opacity = intensityOpacity[intensity];

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {/* Unified Gradient Mesh - Rotated & Blurred */}
            <motion.div
                className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] blur-[100px] opacity-70"
                style={{
                    background: `conic-gradient(from 0deg at 50% 50%, 
                        ${colors[0]}${Math.round(opacity * 255 * 1.5).toString(16).padStart(2, '0')} 0deg, 
                        ${colors[1]}${Math.round(opacity * 255 * 1.5).toString(16).padStart(2, '0')} 120deg, 
                        ${colors[2]}${Math.round(opacity * 255 * 1.5).toString(16).padStart(2, '0')} 240deg, 
                        ${colors[0]}${Math.round(opacity * 255 * 1.5).toString(16).padStart(2, '0')} 360deg)`
                }}
                animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                }}
            />
        </div>
    );
}
