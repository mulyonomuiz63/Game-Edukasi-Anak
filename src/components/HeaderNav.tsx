import React from 'react';
import { Volume2, VolumeX, Sparkles, Home, Shield, BookOpen } from 'lucide-react';
import { sound } from '../utils/audio';
import { ChildProfile, DifficultyLevel, ScreenType } from '../types/game';

interface HeaderNavProps {
  currentScreen: ScreenType;
  starsCount: number;
  profile: ChildProfile;
  difficulty: DifficultyLevel;
  onChangeDifficulty: (diff: DifficultyLevel) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onGoHome: () => void;
  onOpenStickers: () => void;
  onOpenParentGate: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentScreen,
  starsCount,
  profile,
  difficulty,
  onChangeDifficulty,
  isMuted,
  onToggleMute,
  onGoHome,
  onOpenStickers,
  onOpenParentGate,
}) => {
  return (
    <header className="relative z-30 flex items-center justify-between px-3 py-2 sm:px-6 sm:py-3 bg-white/90 backdrop-blur-md border-b-2 border-amber-200/80 shadow-xs">
      {/* Left: Home / Navigation */}
      <div className="flex items-center gap-2">
        {currentScreen !== 'SPLASH' && (
          <button
            onClick={() => {
              sound.playPop();
              onGoHome();
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-amber-400 hover:bg-amber-500 active:scale-95 text-amber-950 font-bold text-sm sm:text-base rounded-2xl shadow-xs transition-transform cursor-pointer"
            title="Kembali ke Beranda"
          >
            <Home className="w-5 h-5 text-amber-950" />
            <span className="hidden sm:inline">Peta Petualangan</span>
          </button>
        )}

        {/* Child Profile Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-sky-50 border border-sky-200 rounded-2xl">
          <span className="text-xl">
            {profile.avatar === 'kiko' ? '🦊' : profile.avatar === 'kiki' ? '🐰' : '🌟'}
          </span>
          <div className="leading-tight">
            <span className="block text-xs sm:text-sm font-bold text-sky-900 truncate max-w-[100px] sm:max-w-[140px]">
              {profile.name}
            </span>
            <span className="text-[10px] text-sky-600 font-semibold">
              Usia {profile.age} Tahun
            </span>
          </div>
        </div>

        {/* Quick Difficulty Badge Switcher */}
        <button
          onClick={() => {
            const nextDiff: DifficultyLevel =
              difficulty === 'EASY' ? 'MEDIUM' : difficulty === 'MEDIUM' ? 'HARD' : 'EASY';
            onChangeDifficulty(nextDiff);
            sound.playPop();
            const names = { EASY: 'Mudah', MEDIUM: 'Menengah', HARD: 'Sulit' };
            sound.speak(`Ganti ke tingkat ${names[nextDiff]}!`);
          }}
          className={`hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-2xl border text-xs font-black cursor-pointer hover:scale-105 active:scale-95 transition-transform ${
            difficulty === 'EASY'
              ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
              : difficulty === 'MEDIUM'
              ? 'bg-amber-100 border-amber-300 text-amber-900'
              : 'bg-rose-100 border-rose-300 text-rose-900'
          }`}
          title="Klik untuk ganti tingkat kesulitan"
        >
          <span>{difficulty === 'EASY' ? '🌱' : difficulty === 'MEDIUM' ? '⭐' : '🏆'}</span>
          <span>{difficulty === 'EASY' ? 'Mudah' : difficulty === 'MEDIUM' ? 'Menengah' : 'Sulit'}</span>
        </button>
      </div>

      {/* Center: Brand Wordmark (when in game or map) */}
      <div className="hidden lg:flex items-center gap-1 font-fredoka">
        <span className="text-orange-500 font-black text-lg">Kiko</span>
        <span className="text-amber-400 text-sm font-bold">&amp;</span>
        <span className="text-purple-600 font-black text-lg">Kiki</span>
        <span className="text-emerald-600 text-xs font-bold bg-emerald-100 px-2 py-0.5 rounded-full ml-1">
          Belajar Ceria
        </span>
      </div>

      {/* Right: Stars Counter, Sticker Album, Sound, Parent Gate */}
      <div className="flex items-center gap-2">
        {/* Stars Counter */}
        <div
          onClick={() => {
            sound.playSparkle();
            onOpenStickers();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-linear-to-r from-amber-400 to-yellow-300 text-amber-950 rounded-2xl shadow-xs font-black text-sm sm:text-base cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          title="Lihat Koleksi Bintang & Stiker"
        >
          <span className="text-lg animate-pulse-star">⭐</span>
          <span className="tabular-nums font-mono">{starsCount}</span>
        </div>

        {/* Sticker Album Button */}
        <button
          onClick={() => {
            sound.playPop();
            onOpenStickers();
          }}
          className="p-2 bg-purple-100 hover:bg-purple-200 active:scale-95 text-purple-700 rounded-2xl transition-transform cursor-pointer"
          title="Buka Album Stiker"
        >
          <BookOpen className="w-5 h-5" />
        </button>

        {/* Audio Toggle */}
        <button
          onClick={() => {
            onToggleMute();
            sound.playPop();
          }}
          className={`p-2 rounded-2xl transition-transform cursor-pointer ${
            isMuted
              ? 'bg-rose-100 text-rose-600 hover:bg-rose-200'
              : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
          }`}
          title={isMuted ? 'Suara Mati (Klik untuk Menyalakan)' : 'Suara Nyala'}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        {/* Parent Settings Button with Lock */}
        <button
          onClick={() => {
            sound.playPop();
            onOpenParentGate();
          }}
          className="p-2 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-600 rounded-2xl transition-transform cursor-pointer"
          title="Pengaturan Orang Tua (Terkunci)"
        >
          <Shield className="w-5 h-5 text-amber-600" />
        </button>
      </div>
    </header>
  );
};
