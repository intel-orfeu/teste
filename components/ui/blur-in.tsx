import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface BlurInProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    duration?: number;
    delay?: number;
    yOffset?: number;
}

export const BlurIn = ({
    children,
    duration = 0.6,
    delay = 0,
    yOffset = 20,
    className,
    ...props
}: BlurInProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: yOffset }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1], // ease out cubic
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};
