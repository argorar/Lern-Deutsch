import React, { useState, useEffect } from 'react';
import WordCard from './WordCard';

const GameArea = ({ levelData, onLevelComplete }) => {
    const [deWords, setDeWords] = useState([]);
    const [esWords, setEsWords] = useState([]);

    const [selectedDe, setSelectedDe] = useState(null);
    const [selectedEs, setSelectedEs] = useState(null);

    const [matchedPairs, setMatchedPairs] = useState([]);
    const [errorPair, setErrorPair] = useState(null); // { deId, esId }

    const [isProcessing, setIsProcessing] = useState(false);

    // Shuffle array utility
    const shuffle = (array) => {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    };

    // Initialize level
    useEffect(() => {
        if (levelData) {
            const de = levelData.pairs.map(p => ({ id: p.id, word: p.de, matchId: p.id }));
            const es = levelData.pairs.map(p => ({ id: `${p.id}-es`, word: p.es, matchId: p.id }));

            setDeWords(shuffle(de));
            setEsWords(shuffle(es));
            setMatchedPairs([]);
            setSelectedDe(null);
            setSelectedEs(null);
        }
    }, [levelData]);

    // Handle Match Logic
    useEffect(() => {
        if (selectedDe && selectedEs && !isProcessing) {
            setIsProcessing(true);

            const deItem = deWords.find(w => w.id === selectedDe);
            const esItem = esWords.find(w => w.id === selectedEs);

            if (deItem.matchId === esItem.matchId) {
                // Match!
                setTimeout(() => {
                    const newMatches = [...matchedPairs, deItem.matchId];
                    setMatchedPairs(newMatches);
                    setSelectedDe(null);
                    setSelectedEs(null);
                    setIsProcessing(false);

                    if (newMatches.length === levelData.pairs.length) {
                        setTimeout(onLevelComplete, 800);
                    }
                }, 500); // Wait for pulse animation
            } else {
                // No match
                setErrorPair({ deId: selectedDe, esId: selectedEs });
                setTimeout(() => {
                    setSelectedDe(null);
                    setSelectedEs(null);
                    setErrorPair(null);
                    setIsProcessing(false);
                }, 800); // Wait for shake animation
            }
        }
    }, [selectedDe, selectedEs, isProcessing, deWords, esWords, matchedPairs, levelData, onLevelComplete]);

    return (
        <div className="w-full max-w-4xl mx-auto animate-fade-in flex-1 flex flex-col justify-center my-8">
            <div className="glass-panel p-6 sm:p-10 relative overflow-hidden">

                {/* Progress Bar (Optional UI enhancement) */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
                    <div
                        className="h-full bg-emerald-400 transition-all duration-500 ease-out"
                        style={{ width: `${(matchedPairs.length / (levelData?.pairs.length || 1)) * 100}%` }}
                    />
                </div>

                <h2 className="text-2xl font-semibold mb-6 text-white/90">
                    Nivel {levelData.level}: {levelData.title}
                </h2>

                <div className="grid grid-cols-2 gap-4 sm:gap-8">
                    {/* German Column */}
                    <div className="flex flex-col gap-4 sm:gap-6">
                        <h3 className="text-sm uppercase tracking-wider text-violet-300 font-semibold mb-2">Alemán</h3>
                        {deWords.map((item) => (
                            <WordCard
                                key={item.id}
                                word={item.word}
                                onClick={() => setSelectedDe(item.id)}
                                isSelected={selectedDe === item.id}
                                isMatched={matchedPairs.includes(item.matchId)}
                                isError={errorPair?.deId === item.id}
                                disabled={isProcessing && selectedDe !== item.id}
                                showPronunciation
                            />
                        ))}
                    </div>

                    {/* Spanish Column */}
                    <div className="flex flex-col gap-4 sm:gap-6">
                        <h3 className="text-sm uppercase tracking-wider text-violet-300 font-semibold mb-2">Español</h3>
                        {esWords.map((item) => (
                            <WordCard
                                key={item.id}
                                word={item.word}
                                onClick={() => setSelectedEs(item.id)}
                                isSelected={selectedEs === item.id}
                                isMatched={matchedPairs.includes(item.matchId)}
                                isError={errorPair?.esId === item.id}
                                disabled={isProcessing && selectedEs !== item.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameArea;
