import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../lib/theme-provider';

export const DisconnectionBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let w = canvas.width = canvas.offsetWidth;
        let h = canvas.height = canvas.offsetHeight;

        // Configuration
        const particleCount = 85;
        const connectionDistance = 140;
        const breakDistance = 200; // Distance where connection "snaps"

        interface Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            disconnected: boolean; // State to track "disconnection" feel
            opacity: number;
        }

        const particles: Particle[] = [];

        // Initialize
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.4, // Slightly faster
                vy: (Math.random() - 0.5) * 0.4,
                size: Math.random() * 3 + 1.5, // Larger particles
                disconnected: false,
                opacity: Math.random() * 0.5 + 0.4 // Higher base opacity
            });
        }

        const draw = () => {
            const isDark = document.documentElement.classList.contains('dark');
            ctx.clearRect(0, 0, w, h);

            // Stronger colors for visibility
            const particleColor = isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)';
            const lineColor = isDark ? '255, 255, 255' : '0, 0, 0';
            const disconnectColor = isDark ? '239, 68, 68' : '220, 38, 38'; // Red for disconnection hint (subtle)

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;

                // Randomly accelerate "drift" to simulate instability
                if (Math.random() > 0.995) {
                    p.vx += (Math.random() - 0.5) * 0.1;
                    p.vy += (Math.random() - 0.5) * 0.1;
                }

                // Draw Particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = particleColor; // Using the stronger color variable
                ctx.fill();

                // Connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        // Strong connection - Increased opacity multiplier
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${lineColor}, ${0.25 - (dist / connectionDistance) * 0.2})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    } else if (dist < breakDistance) {
                        // "Breaking" connection 
                        const tension = (dist - connectionDistance) / (breakDistance - connectionDistance); // 0 to 1
                        const alpha = 0.15 * (1 - tension); // Increased from 0.05 to 0.15

                        if (alpha > 0.02) {
                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;

                            // Dotted line for "breaking" effect
                            ctx.setLineDash([3, 5]);
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.stroke();
                            ctx.setLineDash([]); // Reset
                        }
                    }
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
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Base Canvas */}
            <canvas ref={canvasRef} className="w-full h-full" />

            {/* Vignette & Fade Overlay for "Premium" feel */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50 dark:from-[#000206] dark:via-transparent dark:to-[#000206]" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-50/80 via-transparent to-slate-50/80 dark:from-[#000206] dark:via-transparent dark:to-[#000206]" />
        </div>
    );
};
