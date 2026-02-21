import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

interface ParallaxSectionProps {
    children: React.ReactNode;
    className?: string;
    speed?: number; // Sensitivity factor. Positive = moves slower (depth), Negative = moves faster (foreground). Range typically -0.5 to 0.5
    offset?: number; // Max pixel offset
    direction?: "up" | "down";
}

export function ParallaxSection({
    children,
    className = "",
    speed = 0.1,
    offset = 50,
    direction = "up"
}: ParallaxSectionProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const range = direction === "up" ? [offset, -offset] : [-offset, offset];

    // Use spring for smoother scroll feel
    const y = useTransform(scrollYProgress, [0, 1], range);
    const smoothY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <div ref={ref} className={className}>
            <motion.div style={{ y: smoothY }}>
                {children}
            </motion.div>
        </div>
    );
}
