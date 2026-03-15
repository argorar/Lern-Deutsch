import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight } from 'lucide-react';

const LevelComplete = ({ level, totalLevels, onNextLevel }) => {
    const isFinalLevel = level === totalLevels;

    useEffect(() => {
        // Fire confetti when component mounts
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#8b5cf6', '#10b981', '#f59e0b']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#8b5cf6', '#10b981', '#f59e0b']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
            <div className="glass-panel max-w-md w-full p-8 text-center animate-pop-in relative overflow-hidden">

                {/* Decorative background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-500/30 rounded-full blur-[60px] pointer-events-none" />

                <div className="relative z-10">
                    <div className="mx-auto w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                        <Sparkles className="w-10 h-10 text-emerald-400" />
                    </div>

                    <h2 className="text-3xl font-bold mb-2 text-white">
                        {isFinalLevel ? "¡Felicidades!" : "¡Nivel Completado!"}
                    </h2>

                    <p className="text-slate-300 mb-8 text-lg">
                        {isFinalLevel
                            ? "Has completado todos los niveles disponibles. ¡Excelente trabajo!"
                            : "Dominaste estas 5 palabras. ¿Listo para el siguiente desafío?"}
                    </p>

                    <button
                        onClick={onNextLevel}
                        className="group w-full py-4 px-6 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-semibold text-lg transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] flex items-center justify-center gap-2"
                    >
                        {isFinalLevel ? "Volver a Jugar" : "Siguiente Nivel"}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LevelComplete;
