import React from "react";
import { motion } from "framer-motion";

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    wordDelay?: number;
    yOffset?: number;
}

export const SplitText = ({
    text,
    className = "",
    delay = 0,
    duration = 0.6,
    wordDelay = 0.08,
    yOffset = 40,
}: SplitTextProps) => {
    const words = text.split(" ");

    return (
        <span className={className}>
            {words.map((word, i) => (
                <React.Fragment key={i}>
                    <motion.span
                        initial={{ opacity: 0, y: yOffset }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration,
                            delay: delay + i * wordDelay,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                    {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
                </React.Fragment>
            ))}
        </span>
    );
};
