import React from 'react';
import { Volume2 } from 'lucide-react';

const WordCard = ({ word, onClick, isSelected, isMatched, isError, disabled, showPronunciation }) => {
    // Determine card base style and dynamic state styles
    let stateClasses = "hover:var(--glass-bg-hover)";
    let animationClass = "";

    if (isMatched) {
        stateClasses = "bg-emerald-500/20 border-emerald-500/50 text-emerald-400";
        animationClass = "animate-match";
    } else if (isError) {
        stateClasses = "bg-red-500/20 border-red-500/50 text-red-400";
        animationClass = "animate-shake";
    } else if (isSelected) {
        stateClasses = "bg-amber-500/30 border-amber-500/70 shadow-[0_0_20px_rgba(245,158,11,0.6)] text-amber-200 scale-[1.02]";
    }

    const handleSpeak = (e) => {
        e.stopPropagation();
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'de-DE';
        utterance.rate = 0.85;
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    };

    return (
        <button
            onClick={() => !disabled && !isMatched && onClick()}
            disabled={disabled || isMatched}
            className={`glass-panel w-full py-24 px-28 sm:py-28 sm:px-36 text-center text-lg sm:text-xl font-medium transition-all duration-300 transform relative
        ${!disabled && !isMatched && !isSelected ? 'hover:-translate-y-1 hover:shadow-lg cursor-pointer' : ''}
        ${isMatched || disabled ? 'cursor-default opacity-80' : ''}
        ${stateClasses}
        ${animationClass}
      `}
            style={{
                transition: 'all 0.3s ease, transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
        >
            {word}
            {showPronunciation && (
                <span
                    onClick={handleSpeak}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                    title="Escuchar pronunciación"
                >
                    <Volume2 className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity" />
                </span>
            )}
        </button>
    );
};

export default WordCard;
