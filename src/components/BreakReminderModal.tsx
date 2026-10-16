import React from 'react';
import { Eye, Coffee, Check, Shield } from 'lucide-react';
import { sound } from '../utils/audio';
import { MascotSvg } from './MascotSvg';

interface BreakReminderModalProps {
  isOpen: boolean;
  onExtend: () => void;
  onTakeBreak: () => void;
}

export const BreakReminderModal: React.FC<BreakReminderModalProps> = ({
  isOpen,
  onExtend,
  onTakeBreak,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md bg-linear-to-b from-sky-50 to-indigo-50 border-4 border-amber-300 rounded-3xl p-6 shadow-2xl text-center animate-in zoom-in-95">
        <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center mx-auto mb-3 text-3xl">
          🌙
        </div>

        <h3 className="text-2xl sm:text-3xl font-fredoka font-black text-slate-800 mb-2">
          Waktunya Istirahat Mata!
        </h3>

        <p className="text-sm font-semibold text-slate-600 mb-4">
          Hebat sekali kamu sudah belajar banyak hari ini! Kiko dan Kiki mengajakmu istirahat sebentar, minum air, dan melihat pemandangan hijau di luar jendela ya.
        </p>

        <div className="flex items-center justify-center gap-6 my-3">
          <MascotSvg type="kiko" size="sm" />
          <div className="text-3xl">🥛🥤</div>
          <MascotSvg type="kiki" size="sm" />
        </div>

        <div className="flex flex-col gap-2 mt-6">
          <button
            onClick={() => {
              sound.playPop();
              onTakeBreak();
            }}
            className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-base rounded-2xl shadow-md cursor-pointer transition-transform"
          >
            Siap, Istirahat Dulu! 🌿
          </button>

          <button
            onClick={() => {
              sound.playPop();
              onExtend();
            }}
            className="w-full py-2.5 px-4 bg-white/80 hover:bg-white text-slate-600 font-bold text-xs rounded-xl border border-slate-300 cursor-pointer"
          >
            Lanjut 5 Menit Lagi (Izin Orang Tua)
          </button>
        </div>
      </div>
    </div>
  );
};
