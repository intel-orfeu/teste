import React from 'react';

export const VideoHeroBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-100"
            >
                <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4" type="video/mp4" />
            </video>
            {/* No overlays as requested */}
        </div>
    );
};
