import React from 'react';
import { X, Star, Sparkles, Lock, Award } from 'lucide-react';
import { sound } from '../utils/audio';
import { STICKER_LIST } from '../data/stickers';

interface StickerAlbumModalProps {
  isOpen: boolean;
  starsCount: number;
  unlockedStickers: string[];
  onClose: () => void;
  onUnlockWithStars?: (stickerId: string) => void;
}

export const StickerAlbumModal: React.FC<StickerAlbumModalProps> = ({
  isOpen,
  starsCount,
  unlockedStickers,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-linear-to-b from-amber-50 to-orange-50 border-4 border-amber-300 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b-2 border-amber-200 bg-white/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🏆</span>
            <div>
              <h3 className="text-xl sm:text-2xl font-fredoka font-black text-amber-950">
                Album Stiker Juara Kiko &amp; Kiki
              </h3>
              <p className="text-xs text-amber-800 font-semibold">
                Kumpulkan bintang dari setiap petualangan untuk membuka stiker hewan lucu!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-300 text-amber-950 font-black rounded-2xl border border-yellow-400 font-mono text-sm">
              <span>⭐</span>
              <span>{starsCount} Bintang</span>
            </div>

            <button
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="p-2 bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-2xl text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Generated Sticker Art Preview Banner */}
        <div className="px-4 pt-3">
          <div className="relative h-28 sm:h-36 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xs">
            <img
              src="/src/assets/images/sticker_animals_reward_1792121050815.jpg"
              alt="Stiker Hewan Ceria"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-105"
            />
            <div className="absolute inset-0 bg-linear-to-r from-amber-950/70 via-transparent to-transparent flex items-center px-4">
              <span className="text-white font-fredoka font-black text-sm sm:text-base drop-shadow-md max-w-xs">
                Koleksi Stiker Sahabat Satwa Lengkap!
              </span>
            </div>
          </div>
        </div>

        {/* Sticker Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {STICKER_LIST.map((sticker) => {
            const isUnlocked = starsCount >= sticker.requiredStars || unlockedStickers.includes(sticker.id);

            return (
              <div
                key={sticker.id}
                onClick={() => {
                  if (isUnlocked) {
                    sound.playSparkle();
                    sound.speak(`${sticker.name}! ${sticker.description}`);
                  } else {
                    sound.playBoing();
                    sound.speak(`Butuh ${sticker.requiredStars} bintang untuk membuka stiker ini. Semangat belajar!`);
                  }
                }}
                className={`relative p-4 rounded-3xl border-3 flex flex-col items-center text-center cursor-pointer transition-all select-none ${
                  isUnlocked
                    ? 'bg-white border-amber-300 hover:scale-105 active:scale-95 shadow-md'
                    : 'bg-slate-100/80 border-dashed border-slate-300 opacity-60'
                }`}
              >
                {/* Sticker Emoji or Lock */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-4xl sm:text-5xl shadow-xs mb-2">
                  {isUnlocked ? (
                    <span className="animate-wiggle-slow">{sticker.emoji}</span>
                  ) : (
                    <div className="flex flex-col items-center text-slate-400">
                      <Lock className="w-6 h-6 mb-1 text-slate-400" />
                      <span className="text-[10px] font-mono font-bold text-amber-700">
                        {sticker.requiredStars} ⭐
                      </span>
                    </div>
                  )}
                </div>

                <h4 className="text-xs sm:text-sm font-black text-slate-800 truncate max-w-full">
                  {sticker.name}
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-2 mt-0.5">
                  {isUnlocked ? sticker.description : `Perlu ${sticker.requiredStars} Bintang`}
                </p>

                {isUnlocked && (
                  <span className="mt-2 text-[9px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    ✓ Terkoleksi
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-white/90 border-t border-amber-200 text-center text-xs font-bold text-amber-900">
          ✨ Dapatkan lebih banyak bintang dengan menyelesaikan game di setiap pulau petualangan!
        </div>
      </div>
    </div>
  );
};
