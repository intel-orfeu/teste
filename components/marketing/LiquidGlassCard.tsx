import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LiquidGlassCardProps {
    children: ReactNode;
    className?: string;
    intensity?: "light" | "medium" | "heavy";
}

export function LiquidGlassCard({
    children,
    className = "",
    intensity = "medium"
}: LiquidGlassCardProps) {
    const intensityStyles = {
        light: "bg-white/5 backdrop-blur-sm border-white/10",
        medium: "bg-white/10 backdrop-blur-md border-white/20",
        heavy: "bg-white/20 backdrop-blur-xl border-white/30"
    };

    return (
        <div
            className={cn(
                "relative rounded-2xl border overflow-hidden",
                intensityStyles[intensity],
                className
            )}
        >
            {/* Glass shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
