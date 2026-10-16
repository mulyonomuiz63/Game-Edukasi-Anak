import React from 'react';
import { Play, User, Lock, Sparkles, Star } from 'lucide-react';
import { sound } from '../utils/audio';
import { MascotSvg } from './MascotSvg';
import { ChildProfile } from '../types/game';

interface SplashScreenProps {
  profile: ChildProfile;
  onStartPlaying: () => void;
  onOpenProfile: () => void;
  onOpenParentSettings: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  profile,
  onStartPlaying,
  onOpenProfile,
  onOpenParentSettings,
}) => {
  const handleStart = () => {
    sound.playFanfare();
    sound.speak('Ayo mulai petualangan bersama Kiko dan Kiki!');
    onStartPlaying();
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col justify-between items-center overflow-hidden bg-sky-200">
      {/* Background Graphic Illustration */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/splash_kiko_kiki_adventure_1792121050354.jpg"
          alt="Petualangan Belajar Kiko dan Kiki"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-bottom filter brightness-105"
        />
        {/* Soft upper vignette scrim for crisp contrast on title and buttons */}
        <div className="absolute inset-0 bg-linear-to-b from-sky-900/35 via-transparent to-amber-950/40 pointer-events-none" />
      </div>

      {/* Floating Animated Nature Bits */}
      <div className="absolute top-12 left-10 pointer-events-none select-none text-4xl animate-float-slow opacity-90 hidden sm:block">
        ☁️
      </div>
      <div className="absolute top-20 right-16 pointer-events-none select-none text-5xl animate-spin-slow hidden sm:block">
        ☀️
      </div>
      <div className="absolute top-36 left-1/4 pointer-events-none select-none text-3xl animate-wiggle-slow">
        🦋
      </div>
      <div className="absolute top-44 right-1/4 pointer-events-none select-none text-2xl animate-float-slow">
        ✨
      </div>

      {/* Top Header Region: Age Badge & Bubbly Game Logo */}
      <div className="relative z-10 w-full max-w-5xl px-4 pt-4 sm:pt-6 flex flex-col items-center">
        {/* Top Left Badge: Usia 3-6 Tahun */}
        <div className="self-start mb-2 sm:mb-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-yellow-400 border-2 border-yellow-200 text-amber-950 font-black rounded-full shadow-md text-xs sm:text-sm tracking-wide transform -rotate-2 hover:rotate-0 transition-transform">
            <span className="text-base">🎒</span>
            <span>Usia 3-6 Tahun</span>
          </div>
        </div>

        {/* Bubbly Logo Title Container */}
        <div className="text-center mt-1 sm:mt-2">
          {/* Subtitle / Supertitle */}
          <div className="inline-block px-4 py-1 bg-white/90 backdrop-blur-xs border-2 border-amber-300 rounded-full shadow-sm mb-1.5 transform hover:scale-105 transition-transform">
            <span className="text-amber-800 text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-wider flex items-center gap-1.5">
              <span>🌈</span>
              PETUALANGAN BELAJAR
              <span>🌈</span>
            </span>
          </div>

          {/* Main Logo Text Lockup */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-fredoka font-black tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
            <span className="inline-block text-orange-500 hover:rotate-6 transition-transform">K</span>
            <span className="inline-block text-yellow-400 hover:-rotate-6 transition-transform">i</span>
            <span className="inline-block text-emerald-500 hover:rotate-6 transition-transform">k</span>
            <span className="inline-block text-cyan-400 hover:-rotate-6 transition-transform">o</span>
            <span className="mx-2 text-white font-serif text-3xl sm:text-5xl">&amp;</span>
            <span className="inline-block text-pink-500 hover:rotate-6 transition-transform">K</span>
            <span className="inline-block text-purple-400 hover:-rotate-6 transition-transform">i</span>
            <span className="inline-block text-rose-400 hover:rotate-6 transition-transform">k</span>
            <span className="inline-block text-amber-400 hover:-rotate-6 transition-transform">i</span>
          </h1>

          {/* Tagline */}
          <p className="mt-2 text-base sm:text-xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] bg-black/20 backdrop-blur-xs px-4 py-1 rounded-full inline-block">
            Belajar &amp; Bermain Ceria Bersama!
          </p>
        </div>
      </div>

      {/* Middle Interactive Character Section */}
      <div className="relative z-10 w-full max-w-4xl px-4 flex items-center justify-around my-auto">
        {/* Kiko Character */}
        <div className="flex flex-col items-center">
          <MascotSvg
            type="kiko"
            size="hero"
            showSpeech
            speechText="Halo! Aku Kiko si Rubah!"
            isDancing
          />
        </div>

        {/* Quick Highlights of Learning Zones */}
        <div className="hidden md:flex flex-col gap-2.5 bg-white/85 backdrop-blur-md p-3.5 rounded-3xl border-2 border-amber-300 shadow-xl max-w-xs text-xs font-bold text-slate-700">
          <div className="flex items-center gap-2 text-emerald-700">
            <span className="text-xl">🌲</span>
            <span>Hutan ABC &amp; Fonik Kata</span>
          </div>
          <div className="flex items-center gap-2 text-sky-700">
            <span className="text-xl">🏝️</span>
            <span>Pulau Angka &amp; Berhitung</span>
          </div>
          <div className="flex items-center gap-2 text-purple-700">
            <span className="text-xl">🎨</span>
            <span>Taman Bentuk &amp; Warna</span>
          </div>
          <div className="flex items-center gap-2 text-rose-700">
            <span className="text-xl">🦊</span>
            <span>Petualangan Sahabat &amp; Emosi</span>
          </div>
        </div>

        {/* Kiki Character */}
        <div className="flex flex-col items-center">
          <MascotSvg
            type="kiki"
            size="hero"
            showSpeech
            speechText="Aku Kiki! Ayo belajar!"
            isDancing
          />
        </div>
      </div>

      {/* Bottom Action Area: Prominent Star START Button & Sub-actions */}
      <div className="relative z-10 w-full max-w-md px-4 pb-6 sm:pb-8 flex flex-col items-center gap-3">
        {/* Prominent Star-Shaped START PLAYING Button */}
        <button
          onClick={handleStart}
          className="group relative w-full sm:w-80 py-4 px-6 bg-linear-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 active:scale-95 text-amber-950 font-black text-2xl sm:text-3xl rounded-3xl border-4 border-white shadow-[0_10px_25px_rgba(245,158,11,0.6)] flex items-center justify-center gap-3 cursor-pointer transition-all transform hover:-translate-y-1 animate-pulse-star"
          title="Mulai Petualangan Belajar!"
        >
          <span className="text-3xl filter drop-shadow">⭐</span>
          <span className="tracking-wide">MULAI MAIN!</span>
          <div className="w-10 h-10 rounded-full bg-white/80 text-amber-900 flex items-center justify-center shadow-xs group-hover:translate-x-1.5 transition-transform">
            <Play className="w-6 h-6 fill-amber-900" />
          </div>
        </button>

        {/* Secondary Buttons: Profil Saya & Pengaturan Orang Tua */}
        <div className="flex items-center justify-center gap-3 w-full">
          {/* My Profile Button */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenProfile();
            }}
            className="flex-1 max-w-[190px] py-2.5 px-3 bg-white/95 hover:bg-white active:scale-95 text-sky-900 font-bold text-xs sm:text-sm rounded-2xl border-2 border-sky-300 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform"
          >
            <User className="w-4 h-4 text-sky-600" />
            <span className="truncate">Profil Saya</span>
          </button>

          {/* Parent Settings Button with Lock */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenParentSettings();
            }}
            className="flex-1 max-w-[190px] py-2.5 px-3 bg-white/95 hover:bg-white active:scale-95 text-amber-900 font-bold text-xs sm:text-sm rounded-2xl border-2 border-amber-300 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform"
          >
            <Lock className="w-4 h-4 text-amber-600" />
            <span className="truncate">Pengaturan Orang Tua</span>
          </button>
        </div>
      </div>
    </div>
  );
};
