import React, { useState } from 'react';
import { vocabularyLevels } from './data/vocabulary';
import GameArea from './components/GameArea';
import LevelComplete from './components/LevelComplete';
import './App.css';

function App() {
  // Shuffle utility
  const shuffleArray = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const [levelOrder, setLevelOrder] = useState(() => shuffleArray([...Array(vocabularyLevels.length).keys()]));
  const [currentStep, setCurrentStep] = useState(0);
  const [showLevelComplete, setShowLevelComplete] = useState(false);

  const currentLevelData = vocabularyLevels[levelOrder[currentStep]];
  const totalLevels = vocabularyLevels.length;

  const handleLevelComplete = () => {
    setShowLevelComplete(true);
  };

  const handleNextLevel = () => {
    setShowLevelComplete(false);
    if (currentStep < totalLevels - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // All levels done, reshuffle and restart
      setLevelOrder(shuffleArray([...Array(totalLevels).keys()]));
      setCurrentStep(0);
    }
  };

  return (
    <>
      <header className="mb-4 sm:mb-8 animate-fade-in relative z-10 w-full pt-4">
        <h1
          className="text-4xl sm:text-5xl font-bold mb-2"
          style={{
            background: 'linear-gradient(to right, #a78bfa, #34d399)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}
        >
          Lern Deutsch
        </h1>
        <p className="text-slate-300 text-lg sm:text-xl">
          Empareja las palabras para avanzar
        </p>
      </header>

      <main className="flex-1 flex flex-col w-full z-10">
        <GameArea
          key={currentLevelData.level} // Force remount on level change for fresh state
          levelData={currentLevelData}
          onLevelComplete={handleLevelComplete}
        />
      </main>

      {showLevelComplete && (
        <LevelComplete
          level={currentLevelData.level}
          totalLevels={totalLevels}
          onNextLevel={handleNextLevel}
        />
      )}

      {/* Background ambient lighting */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none -z-10" />
    </>
  );
}

export default App;
