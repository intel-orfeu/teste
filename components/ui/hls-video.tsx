import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface HlsVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    src: string;
    className?: string;
    poster?: string;
}

export function HlsVideo({ src, className, poster, ...props }: HlsVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let hls: Hls | null = null;

        const handlePlay = () => setIsPlaying(true);
        video.addEventListener('playing', handlePlay);

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
            video.removeEventListener('playing', handlePlay);
            if (hls) {
                hls.destroy();
            }
        };
    }, [src]);

    return (
        <div className={`relative ${className || ''}`}>
            {/* Custom Poster Overlay */}
            {poster && (
                <img
                    src={poster}
                    alt="Video Poster"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] pointer-events-none z-10 ${isPlaying ? 'opacity-0' : 'opacity-100'
                        }`}
                />
            )}

            {/* Video Element */}
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                {...props}
            />
        </div>
    );
}
