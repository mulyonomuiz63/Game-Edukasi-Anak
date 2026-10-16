import React from 'react';
import { DifficultyLevel } from '../types/game';
import { sound } from '../utils/audio';

interface DifficultySelectorProps {
  currentDifficulty: DifficultyLevel;
  onChangeDifficulty: (diff: DifficultyLevel) => void;
  compact?: boolean;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  currentDifficulty,
  onChangeDifficulty,
  compact = false,
}) => {
  const levels: {
    id: DifficultyLevel;
    label: string;
    ageHint: string;
    icon: string;
    activeBg: string;
    activeBorder: string;
    speech: string;
  }[] = [
    {
      id: 'EASY',
      label: 'Mudah',
      ageHint: '3 Th',
      icon: '🌱',
      activeBg: 'bg-emerald-500 text-white shadow-md',
      activeBorder: 'border-emerald-600',
      speech: 'Tingkat Mudah! Belajar santai dan menyenangkan bersama Kiko dan Kiki!',
    },
    {
      id: 'MEDIUM',
      label: 'Menengah',
      ageHint: '4-5 Th',
      icon: '⭐',
      activeBg: 'bg-amber-400 text-amber-950 shadow-md',
      activeBorder: 'border-amber-500',
      speech: 'Tingkat Menengah! Petualangan seru yang pas untukmu!',
    },
    {
      id: 'HARD',
      label: 'Sulit',
      ageHint: '6 Th',
      icon: '🏆',
      activeBg: 'bg-rose-500 text-white shadow-md',
      activeBorder: 'border-rose-600',
      speech: 'Tingkat Sulit! Luar biasa, tantangan untuk sang juara cilik!',
    },
  ];

  const handleSelect = (lvl: (typeof levels)[0]) => {
    if (currentDifficulty !== lvl.id) {
      sound.playPop();
      sound.speak(lvl.speech);
      onChangeDifficulty(lvl.id);
    }
  };

  if (compact) {
    return (
      <div className="inline-flex items-center gap-1 p-1 bg-white/90 border border-slate-200 rounded-2xl shadow-xs">
        {levels.map((lvl) => {
          const isActive = currentDifficulty === lvl.id;
          return (
            <button
              key={lvl.id}
              onClick={() => handleSelect(lvl)}
              className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                isActive
                  ? lvl.activeBg
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{lvl.icon}</span>
              <span>{lvl.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 p-1.5 bg-white/95 border-2 border-amber-200 rounded-2xl shadow-xs max-w-lg w-full">
      <span className="text-xs font-black text-amber-900 px-2 shrink-0">
        Tingkat:
      </span>
      <div className="flex items-center gap-1.5 w-full">
        {levels.map((lvl) => {
          const isActive = currentDifficulty === lvl.id;
          return (
            <button
              key={lvl.id}
              onClick={() => handleSelect(lvl)}
              className={`flex-1 py-1.5 px-2.5 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 border-2 ${
                isActive
                  ? `${lvl.activeBg} ${lvl.activeBorder} scale-102`
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title={`Tingkat ${lvl.label} (Cocok untuk usia ${lvl.ageHint})`}
            >
              <span className="text-sm sm:text-base">{lvl.icon}</span>
              <span>{lvl.label}</span>
              <span className={`text-[10px] px-1 py-0.2 rounded-md ${isActive ? 'bg-black/15' : 'text-slate-400'}`}>
                {lvl.ageHint}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
