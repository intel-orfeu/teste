import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DemoProgressIndicatorProps {
    currentStep: number;
    totalSteps: number;
    isPlaying: boolean;
    isComplete: boolean;
    onStepClick: (step: number) => void;
    onPlayPause: () => void;
    onPrevious: () => void;
    onNext: () => void;
    onReplay: () => void;
}

const stepLabels = [
    "Gravando Reunião",
    "IA Processando",
    "Tarefas Extraídas",
    "Time Notificado"
];

export function DemoProgressIndicator({
    currentStep,
    totalSteps,
    isPlaying,
    isComplete,
    onStepClick,
    onPlayPause,
    onPrevious,
    onNext,
    onReplay
}: DemoProgressIndicatorProps) {
    return (
        <div className="flex flex-col items-center gap-4 mt-6">
            {/* Progress dots with labels */}
            <div className="flex items-center gap-2">
                {Array.from({ length: totalSteps }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => onStepClick(index)}
                        className="group flex flex-col items-center gap-1"
                    >
                        <motion.div
                            className={cn(
                                "w-3 h-3 rounded-full transition-all cursor-pointer",
                                index === currentStep
                                    ? "bg-white scale-125 shadow-lg shadow-white/30"
                                    : index < currentStep
                                        ? "bg-white/60"
                                        : "bg-white/30"
                            )}
                            whileHover={{ scale: 1.3 }}
                            whileTap={{ scale: 0.9 }}
                        />
                        {index < totalSteps - 1 && (
                            <div className="hidden" /> // Placeholder for spacing
                        )}
                    </button>
                ))}
            </div>

            {/* Current step label */}
            <motion.p
                key={currentStep}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-white/70"
            >
                Passo {currentStep + 1} de {totalSteps}: {stepLabels[currentStep]}
            </motion.p>

            {/* Controls */}
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onPrevious}
                    disabled={currentStep === 0}
                    className="text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Anterior
                </Button>

                {isComplete ? (
                    <Button
                        onClick={onReplay}
                        className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Recomeçar
                    </Button>
                ) : (
                    <Button
                        onClick={onPlayPause}
                        className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                    >
                        {isPlaying ? (
                            <>
                                <Pause className="w-4 h-4 mr-2" />
                                Pausar
                            </>
                        ) : (
                            <>
                                <Play className="w-4 h-4 mr-2" />
                                Iniciar
                            </>
                        )}
                    </Button>
                )}

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onNext}
                    disabled={currentStep === totalSteps - 1}
                    className="text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30"
                >
                    Próximo
                    <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            </div>
        </div>
    );
}
