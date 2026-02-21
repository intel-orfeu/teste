import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedAudioWave = ({ className }: { className?: string }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <motion.path
                d="M12 4V20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            />
            <motion.path
                d="M8 8V16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            />
            <motion.path
                d="M16 8V16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            />
            <motion.path
                d="M4 11V13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            />
            <motion.path
                d="M20 11V13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            />

            {/* Dynamic continuous wave animation */}
            <motion.g
                animate={{
                    scaleY: [1, 1.5, 0.8, 1.2, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{ originY: "50%", transformBox: "fill-box" }}
            >
                <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-0" />
            </motion.g>
        </svg>
    );
};

export const AnimatedNeuralNet = ({ className }: { className?: string }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <motion.circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            />

            {/* Pulse effect */}
            <motion.circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1"
                animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />

            <motion.circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="2"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }}
            />
            <motion.circle cx="18" cy="6" r="2" stroke="currentColor" strokeWidth="2"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}
            />
            <motion.circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="2"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }}
            />
            <motion.circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth="2"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }}
            />

            {/* Connections drawing in */}
            <motion.path d="M7.5 7.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 }}
            />
            <motion.path d="M16.5 7.5L13.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.7 }}
            />
            <motion.path d="M7.5 16.5L10.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.8 }}
            />
            <motion.path d="M16.5 16.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.9 }}
            />
        </svg>
    );
};

export const AnimatedWorkflowList = ({ className }: { className?: string }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <motion.rect x="4" y="5" width="4" height="4" rx="1" fill="currentColor"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
            />
            <motion.path d="M11 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            />

            <motion.rect x="4" y="15" width="4" height="4" rx="1" fill="currentColor"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
            />
            <motion.path d="M11 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            />

            {/* Floating Checkmark animation over bottom item */}
            <motion.path
                d="M5 17L6.5 18.5L9 15.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            />

            {/* Glowing progress line */}
            <motion.path
                d="M11 12H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, -8] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </svg>
    );
};
