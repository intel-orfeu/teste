import { useEffect, useRef } from "react";

export const LiquidHeroBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let isRunning = true;

        // Configuration matching the user's provided code
        const config = {
            speed: 0.8,
            maxDpr: 1.5,
            bgColor: '#f0f4f8',
            targetFps: 30
        };

        const blobs = [
            {
                // Indigo
                x: 0.1, y: 0.15, radius: 0.55, color: [99, 102, 241], alpha: 0.85,
                ax: 0.12, ay: 0.10, vx: 0.15, vy: 0.20, px: 0.0, py: 0.5
            },
            {
                // Violet
                x: 0.55, y: 0.05, radius: 0.45, color: [139, 92, 246], alpha: 0.7,
                ax: 0.10, ay: 0.14, vx: 0.12, vy: 0.10, px: 1.5, py: 0.8
            },
            {
                // Cyan
                x: 0.65, y: 0.55, radius: 0.50, color: [6, 182, 212], alpha: 0.75,
                ax: 0.14, ay: 0.10, vx: 0.10, vy: 0.16, px: 3.0, py: 2.0
            },
            {
                // Blue
                x: 0.2, y: 0.65, radius: 0.42, color: [59, 130, 246], alpha: 0.65,
                ax: 0.10, ay: 0.12, vx: 0.18, vy: 0.08, px: 2.0, py: 4.0
            },
            {
                // Rose/Pink
                x: 0.85, y: 0.30, radius: 0.38, color: [244, 114, 182], alpha: 0.5,
                ax: 0.12, ay: 0.08, vx: 0.08, vy: 0.14, px: 4.5, py: 1.2
            },
            {
                // Teal
                x: 0.4, y: 0.85, radius: 0.48, color: [45, 212, 191], alpha: 0.55,
                ax: 0.08, ay: 0.10, vx: 0.14, vy: 0.12, px: 5.0, py: 3.5
            },
            {
                // Lavender
                x: 0.5, y: 0.4, radius: 0.60, color: [196, 181, 253], alpha: 0.4,
                ax: 0.06, ay: 0.08, vx: 0.06, vy: 0.06, px: 1.0, py: 5.0
            }
        ];

        let width = 0;
        let height = 0;
        let lastFrameTime = 0;
        const frameInterval = 1000 / config.targetFps;

        const resize = () => {
            if (!container || !canvas) return;
            const dpr = Math.min(window.devicePixelRatio || 1, config.maxDpr);
            const rect = container.getBoundingClientRect();

            // 150% size to avoid blur edges
            width = rect.width * 1.5;
            height = rect.height * 1.5;

            canvas.width = width * dpr;
            canvas.height = height * dpr;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const renderBlob = (blob: any, time: number) => {
            // Animated position with organic sinusoidal movement
            const x = (blob.x + Math.sin(time * blob.vx * config.speed + blob.px) * blob.ax
                + Math.sin(time * blob.vx * config.speed * 0.6 + blob.px * 2.5) * blob.ax * 0.3
            ) * width;

            const y = (blob.y + Math.cos(time * blob.vy * config.speed + blob.py) * blob.ay
                + Math.cos(time * blob.vy * config.speed * 0.7 + blob.py * 1.8) * blob.ay * 0.3
            ) * height;

            // Pulsing radius
            const radiusPulse = 1 + Math.sin(time * config.speed * 0.1 + blob.px) * 0.05;
            const r = blob.radius * Math.min(width, height) * radiusPulse;

            // Radial Gradient
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
            const [cr, cg, cb] = blob.color;

            gradient.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${blob.alpha})`);
            gradient.addColorStop(0.4, `rgba(${cr}, ${cg}, ${cb}, ${blob.alpha * 0.6})`);
            gradient.addColorStop(0.7, `rgba(${cr}, ${cg}, ${cb}, ${blob.alpha * 0.2})`);
            gradient.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        };

        const render = (timestamp: number) => {
            if (!isRunning) return;

            const elapsed = timestamp - lastFrameTime;
            if (elapsed < frameInterval) {
                animationId = requestAnimationFrame(render);
                return;
            }
            lastFrameTime = timestamp - (elapsed % frameInterval);

            const time = timestamp * 0.001;

            ctx.clearRect(0, 0, width, height);

            // Base Background
            ctx.fillStyle = config.bgColor;
            ctx.fillRect(0, 0, width, height);

            // Lighter composition for smooth color mixing
            ctx.globalCompositeOperation = 'lighter';

            blobs.forEach(blob => renderBlob(blob, time));

            // Restore composition
            ctx.globalCompositeOperation = 'source-over';

            animationId = requestAnimationFrame(render);
        };

        // Initialize
        resize();
        animationId = requestAnimationFrame(render);

        const handleResize = () => resize();
        window.addEventListener('resize', handleResize);

        return () => {
            isRunning = false;
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-[#f0f4f8]">
            <canvas
                ref={canvasRef}
                className="absolute top-[-25%] left-[-25%] w-[150%] h-[150%] opacity-55 will-change-transform"
                style={{
                    filter: 'blur(140px)',
                    transform: 'translateZ(0)'
                }}
            />

            {/* Noise Overlay */}
            <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '128px 128px'
                }}
            />

            {/* Refined Diagonal Grid Overlay (Decagon-inspired) - MAX VISIBILITY */}
            <div className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(45deg, #94a3b8 1px, transparent 1px), linear-gradient(-45deg, #94a3b8 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    opacity: 0.2
                }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 80% 70% at 50% 45%, transparent 40%, rgba(248, 250, 252, 0.5) 75%, rgba(248, 250, 252, 0.95) 100%)'
                }}
            />
        </div>
    );
};
