import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface HlsVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    src: string;
    className?: string;
}

export function HlsVideo({ src, className, ...props }: HlsVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let hls: Hls | null = null;

        if (src.endsWith('.m3u8')) {
            if (Hls.isSupported()) {
                hls = new Hls({ enableWorker: true });
                hls.loadSource(src);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    video.play().catch(() => { /* Autoplay was prevented */ });
                });
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                // Fallback for Safari
                video.src = src;
                video.addEventListener('loadedmetadata', () => {
                    video.play().catch(() => { /* Autoplay was prevented */ });
                });
            }
        } else {
            // Standard MP4 fallback
            video.src = src;
            video.play().catch(() => { /* Autoplay was prevented */ });
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, [src]);

    return (
        <video
            ref={videoRef}
            className={className}
            autoPlay
            loop
            muted
            playsInline
            {...props}
        />
    );
}
