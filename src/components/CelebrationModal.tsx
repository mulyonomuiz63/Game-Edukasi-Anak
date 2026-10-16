import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';
import { MascotSvg } from './MascotSvg';

interface CelebrationModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  earnedStars?: number;
  onNextActivity: () => void;
  onReplay: () => void;
  onBackToMap: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  title = 'Hebat Sekali!',
  message = 'Kamu berhasil menyelesaikan petualangan ini dengan luar biasa!',
  earnedStars = 1,
  onNextActivity,
  onReplay,
  onBackToMap,
}) => {
  useEffect(() => {
    if (isOpen) {
      sound.playFanfare();
      sound.playSuccessChime();

      // Launch cheerful confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'],
        });
      } catch {}

      const praises = [
        'Hebat sekali! Kamu sangat pintar!',
        'Bagus sekali! Kiko dan Kiki bangga padamu!',
        'Luar biasa! Bintang emas untukmu!',
        'Kamu juara kecil yang cerdas!',
      ];
      const randomPraise = praises[Math.floor(Math.random() * praises.length)];
      sound.speak(randomPraise);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-md bg-linear-to-b from-amber-50 to-orange-50 border-4 border-amber-300 rounded-3xl p-6 shadow-2xl text-center transform animate-in zoom-in-95 duration-200">
        {/* Floating Star Badges */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Star className="w-8 h-8 text-amber-400 fill-amber-400 animate-pulse-star" />
          <Star className="w-12 h-12 text-yellow-400 fill-yellow-400 animate-pulse-star" />
          <Star className="w-8 h-8 text-amber-400 fill-amber-400 animate-pulse-star" />
        </div>

        <h3 className="text-3xl font-fredoka font-black text-amber-900 mb-1">
          {title}
        </h3>
        <p className="text-sm font-semibold text-amber-800 mb-4">{message}</p>

        {/* Mascot Cheering */}
        <div className="flex items-center justify-center gap-6 my-2">
          <MascotSvg type="kiko" size="sm" isDancing />
          <div className="px-4 py-2 bg-white/90 border-2 border-yellow-300 rounded-2xl shadow-sm text-amber-900 font-bold text-xs">
            + {earnedStars} Bintang Emas! ⭐
          </div>
          <MascotSvg type="kiki" size="sm" isDancing />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 mt-5">
          <button
            onClick={() => {
              sound.playPop();
              onNextActivity();
            }}
            className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-base rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform"
          >
            <span>Lanjut Petualangan!</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={() => {
                sound.playPop();
                onReplay();
              }}
              className="flex-1 py-2.5 px-3 bg-white hover:bg-amber-100 active:scale-95 text-amber-900 font-bold text-xs sm:text-sm rounded-xl border border-amber-300 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-amber-700" />
              <span>Main Lagi</span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                onBackToMap();
              }}
              className="flex-1 py-2.5 px-3 bg-sky-100 hover:bg-sky-200 active:scale-95 text-sky-900 font-bold text-xs sm:text-sm rounded-xl border border-sky-300 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Kembali ke Peta</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
