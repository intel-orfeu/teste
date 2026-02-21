import React, { useEffect, useRef } from "react";
import { useTheme } from "../lib/theme-provider";

export const ExecutiveBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = (canvas.width = canvas.offsetWidth);
        let h = (canvas.height = canvas.offsetHeight);

        // Constellation Logic
        const points: { x: number; y: number; vx: number; vy: number }[] = [];
        const numPoints = Math.floor((w * h) / 15000); // Response to screen size
        const maxDist = 120; // Max distance for connection

        for (let i = 0; i < numPoints; i++) {
            points.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.3, // Slow velocity
                vy: (Math.random() - 0.5) * 0.3,
            });
        }

        const draw = () => {
            const isDark = document.documentElement.classList.contains("dark");

            // Clear with very slight fade for trail effect (optional, here just clear)
            ctx.clearRect(0, 0, w, h);

            // Styles
            const pointColor = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(15, 23, 42, 0.4)";
            const lineColor = isDark ? "rgba(56, 189, 248, 0.15)" : "rgba(59, 130, 246, 0.1)"; // Cyan/Blueish

            // Update Points
            points.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off walls
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;

                // Draw Point
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = pointColor;
                ctx.fill();
            });

            // Draw Connections
            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const dx = points[i].x - points[j].x;
                    const dy = points[i].y - points[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDist) {
                        ctx.beginPath();
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 1 - dist / maxDist; // Thinner further away
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(draw);
        };

        const handleResize = () => {
            w = canvas.width = canvas.offsetWidth;
            h = canvas.height = canvas.offsetHeight;
        };

        window.addEventListener("resize", handleResize);
        const animId = requestAnimationFrame(draw);
        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animId);
        };
    }, [theme]);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
            {/* Background Base */}
            <div className="absolute inset-0 bg-slate-50/50 dark:bg-[#020408]/80 transition-colors duration-500" />

            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 dark:opacity-40" />

            {/* Subtle Gradients */}
            <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-500/5 to-transparent blur-3xl rounded-full translate-x-[-20%] translate-y-[-20%]" />
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-violet-500/5 to-transparent blur-3xl rounded-full translate-x-[20%] translate-y-[20%]" />
        </div>
    );
};
