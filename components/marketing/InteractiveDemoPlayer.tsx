import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
    DemoProgressIndicator,
    DemoRecordingStep,
    DemoProcessingStep,
    DemoExtractionStep,
    DemoNotificationStep,
    DemoIntroStep
} from "./demo";

const STEP_DURATION = 5000; // 5 seconds per step
const TOTAL_STEPS = 4;

export function InteractiveDemoPlayer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    // State
    const [hasStarted, setHasStarted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-advance logic
    useEffect(() => {
        if (!hasStarted || !isPlaying || isPaused || isComplete) return;

        const timer = setTimeout(() => {
            if (currentStep < TOTAL_STEPS - 1) {
                setCurrentStep(prev => prev + 1);
            } else {
                setIsComplete(true);
                setIsPlaying(false);
            }
        }, STEP_DURATION);

        return () => clearTimeout(timer);
    }, [hasStarted, isPlaying, isPaused, currentStep, isComplete]);

    // Keyboard navigation
    useEffect(() => {
        if (!hasStarted) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                handlePrevious();
            } else if (e.key === "ArrowRight") {
                handleNext();
            } else if (e.key === " ") {
                e.preventDefault();
                handlePlayPause();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [hasStarted, isPlaying, currentStep]);

    const handleStart = useCallback(() => {
        setHasStarted(true);
        setIsPlaying(true);
    }, []);

    const handlePlayPause = useCallback(() => {
        if (isComplete) {
            handleReplay();
        } else {
            setIsPlaying(prev => !prev);
        }
    }, [isComplete]);

    const handlePrevious = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            setIsComplete(false);
        }
    }, [currentStep]);

    const handleNext = useCallback(() => {
        if (currentStep < TOTAL_STEPS - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setIsComplete(true);
            setIsPlaying(false);
        }
    }, [currentStep]);

    const handleStepClick = useCallback((step: number) => {
        setCurrentStep(step);
        setIsComplete(step === TOTAL_STEPS - 1);
        if (step < TOTAL_STEPS - 1) {
            setIsPlaying(true);
        }
    }, []);

    const handleReplay = useCallback(() => {
        setCurrentStep(0);
        setIsComplete(false);
        setIsPlaying(true);
    }, []);

    // Pause on hover
    const handleMouseEnter = useCallback(() => {
        if (hasStarted) setIsPaused(true);
    }, [hasStarted]);

    const handleMouseLeave = useCallback(() => {
        if (hasStarted) setIsPaused(false);
    }, [hasStarted]);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative h-full min-h-[400px] flex flex-col"
        >
            {/* Intro Screen Overlay */}
            <AnimatePresence>
                {!hasStarted && (
                    <motion.div
                        className="absolute inset-0 z-50"
                        exit={{ opacity: 0, pointerEvents: "none" }}
                    >
                        <DemoIntroStep onStart={handleStart} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Progress bar at top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 rounded-full overflow-hidden z-20">
                <motion.div
                    className="h-full bg-gradient-to-r from-violet-500 to-rose-500"
                    initial={{ width: "0%" }}
                    animate={{ width: hasStarted ? `${((currentStep + 1) / TOTAL_STEPS) * 100}%` : "0%" }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Demo content area */}
            <div className={`pt-2 flex-1 relative transition-opacity duration-500 ${!hasStarted ? 'opacity-20 blur-sm pointer-events-none' : 'opacity-100'}`}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                    >
                        {currentStep === 0 && <DemoRecordingStep isActive={isPlaying && !isPaused} />}
                        {currentStep === 1 && <DemoProcessingStep isActive={isPlaying && !isPaused} />}
                        {currentStep === 2 && <DemoExtractionStep isActive={isPlaying && !isPaused} />}
                        {currentStep === 3 && <DemoNotificationStep isActive={isPlaying && !isPaused} />}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Pause indicator */}
            <AnimatePresence>
                {isPaused && isPlaying && !isComplete && hasStarted && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     bg-black/60 backdrop-blur-sm rounded-full p-4 z-30"
                    >
                        <div className="w-4 h-4 flex gap-1">
                            <div className="w-1.5 h-full bg-white rounded-full" />
                            <div className="w-1.5 h-full bg-white rounded-full" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Progress indicator and controls */}
            <div className={`transition-opacity duration-500 ${!hasStarted ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <DemoProgressIndicator
                    currentStep={currentStep}
                    totalSteps={TOTAL_STEPS}
                    isPlaying={isPlaying}
                    isComplete={isComplete}
                    onStepClick={handleStepClick}
                    onPlayPause={handlePlayPause}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    onReplay={handleReplay}
                />
            </div>
        </motion.div>
    );
}
