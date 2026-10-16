import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { sound } from '../../utils/audio';
import { MascotSvg } from '../MascotSvg';

interface NumberIslandGameProps {
  onActivityComplete: (num: number) => void;
  onBackToMap: () => void;
}

const COUNTING_CHALLENGES = [
  { item: '🍎', name: 'Apel Merah', count: 3, options: [2, 3, 4] },
  { item: '🍌', name: 'Pisang Manis', count: 5, options: [4, 5, 6] },
  { item: '🐟', name: 'Ikan Lincah', count: 4, options: [3, 4, 5] },
  { item: '🍊', name: 'Jeruk Segar', count: 6, options: [5, 6, 7] },
  { item: '🍓', name: 'Stroberi Mungil', count: 2, options: [1, 2, 3] },
  { item: '⭐', name: 'Bintang Terang', count: 7, options: [6, 7, 8] },
];

const SEQUENCE_ROUNDS = [
  { full: [1, 2, 3, 4, 5], missingIndex: 2, options: [2, 3, 5] }, // missing 3
  { full: [2, 3, 4, 5, 6], missingIndex: 3, options: [4, 5, 6] }, // missing 5
  { full: [4, 5, 6, 7, 8], missingIndex: 2, options: [5, 6, 7] }, // missing 6
  { full: [6, 7, 8, 9, 10], missingIndex: 3, options: [8, 9, 10] }, // missing 9
];

export const NumberIslandGame: React.FC<NumberIslandGameProps> = ({
  onActivityComplete,
  onBackToMap,
}) => {
  const [activeTab, setActiveTab] = useState<'COUNT' | 'SEQUENCE' | 'CATCH'>('COUNT');

  // Counting fruit game
  const [countIndex, setCountIndex] = useState(0);
  const currentCountRound = COUNTING_CHALLENGES[countIndex];
  const [tappedItems, setTappedItems] = useState<number[]>([]);
  const [countSuccess, setCountSuccess] = useState(false);

  // Stepping stones sequence game
  const [seqIndex, setSeqIndex] = useState(0);
  const currentSeq = SEQUENCE_ROUNDS[seqIndex];
  const [seqAnswered, setSeqAnswered] = useState(false);

  // Catch the basket game
  const [targetCatch] = useState(4);
  const [caughtItems, setCaughtItems] = useState<number[]>([]);

  // Count item click
  const handleItemTap = (idx: number) => {
    if (tappedItems.includes(idx)) return;
    const newTapped = [...tappedItems, idx];
    setTappedItems(newTapped);
    sound.playPop();
    const indonesianNumbers = ['Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh'];
    const numWord = indonesianNumbers[newTapped.length - 1] || `${newTapped.length}`;
    sound.speak(numWord);
  };

  const handleSelectCountAnswer = (ans: number) => {
    if (ans === currentCountRound.count) {
      setCountSuccess(true);
      sound.playSuccessChime();
      sound.speak(`Tepat sekali! Ada ${ans} ${currentCountRound.name}! Kamu pintar!`);
      onActivityComplete(ans);
    } else {
      sound.playBoing();
      sound.speak(`Coba hitung lagi bersama Kiko ya!`);
    }
  };

  const handleNextCount = () => {
    setCountSuccess(false);
    setTappedItems([]);
    setCountIndex((prev) => (prev + 1) % COUNTING_CHALLENGES.length);
  };

  // Stepping stone sequence answer
  const handleSelectSeq = (val: number) => {
    const expected = currentSeq.full[currentSeq.missingIndex];
    if (val === expected) {
      setSeqAnswered(true);
      sound.playSuccessChime();
      sound.speak(`Hebat! Angka ${val} menyempurnakan jembatan batu!`);
      onActivityComplete(val);
    } else {
      sound.playBoing();
      sound.speak('Ayo perhatikan urutan angkanya ya!');
    }
  };

  const handleNextSeq = () => {
    setSeqAnswered(false);
    setSeqIndex((prev) => (prev + 1) % SEQUENCE_ROUNDS.length);
  };

  // Catch fruit into basket
  const handleCatchFruit = (id: number) => {
    if (caughtItems.includes(id)) return;
    const nextCaught = [...caughtItems, id];
    setCaughtItems(nextCaught);
    sound.playPop();

    const indonesianNumbers = ['Satu', 'Dua', 'Tiga', 'Empat', 'Lima'];
    const numWord = indonesianNumbers[nextCaught.length - 1] || `${nextCaught.length}`;
    sound.speak(`${numWord} apel di keranjang!`);

    if (nextCaught.length === targetCatch) {
      sound.playSuccessChime();
      sound.speak(`Hore! Keranjang sudah terisi ${targetCatch} apel!`);
      onActivityComplete(targetCatch);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-3 sm:p-6 flex flex-col items-center">
      {/* Zone Header Banner */}
      <div className="w-full bg-linear-to-r from-sky-500 via-blue-500 to-indigo-600 rounded-3xl p-4 sm:p-5 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl shadow-inner">
            🏝️
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-fredoka font-black">
              Pulau Angka &amp; Berhitung
            </h2>
            <p className="text-sky-100 text-xs sm:text-sm font-semibold">
              Kiko si Rubah mengajakmu berhitung buah lezat dan menyusun jembatan angka!
            </p>
          </div>
        </div>

        {/* Mascot Mini View */}
        <MascotSvg
          type="kiko"
          size="sm"
          showSpeech
          speechText="Ayo berhitung bersamaku!"
        />
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-sky-100/80 rounded-2xl border border-sky-300 mb-6 max-w-md w-full justify-center">
        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('COUNT');
          }}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 text-center ${
            activeTab === 'COUNT'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-sky-900 hover:bg-sky-200'
          }`}
        >
          🍎 Hitung Buah
        </button>
        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('SEQUENCE');
          }}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 text-center ${
            activeTab === 'SEQUENCE'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-sky-900 hover:bg-sky-200'
          }`}
        >
          🌉 Jembatan Angka
        </button>
        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('CATCH');
          }}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 text-center ${
            activeTab === 'CATCH'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-sky-900 hover:bg-sky-200'
          }`}
        >
          🧺 Petik ke Keranjang
        </button>
      </div>

      {/* TAB 1: COUNTING OBJECTS */}
      {activeTab === 'COUNT' && (
        <div className="w-full max-w-2xl bg-white/95 border-3 border-sky-300 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col items-center text-center">
          <div className="text-xs font-bold text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 mb-2">
            Ketuk setiap benda untuk menghitung, lalu pilih angka yang cocok!
          </div>

          <h3 className="text-2xl font-black text-slate-800 mt-2 mb-4">
            Berapa jumlah {currentCountRound.name}?
          </h3>

          {/* Interactive Items to Tap and Count */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 my-4 p-6 bg-sky-50/60 rounded-3xl border-2 border-dashed border-sky-200 min-h-[140px] w-full">
            {Array.from({ length: currentCountRound.count }).map((_, idx) => {
              const isTapped = tappedItems.includes(idx);
              return (
                <div
                  key={idx}
                  onClick={() => handleItemTap(idx)}
                  className={`relative p-3 rounded-2xl cursor-pointer transition-transform select-none ${
                    isTapped
                      ? 'scale-115 bg-amber-100 border-2 border-amber-400 rotate-6 shadow-md'
                      : 'hover:scale-110 active:scale-95 bg-white border border-slate-200'
                  }`}
                >
                  <span className="text-4xl sm:text-5xl">{currentCountRound.item}</span>
                  {isTapped && (
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-black flex items-center justify-center font-mono">
                      {tappedItems.indexOf(idx) + 1}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Answer Options */}
          {!countSuccess ? (
            <div className="w-full mt-4">
              <p className="text-xs font-bold text-slate-600 mb-3">
                Pilih angka yang tepat:
              </p>
              <div className="flex justify-center gap-4">
                {currentCountRound.options.map((num) => (
                  <button
                    key={num}
                    onClick={() => handleSelectCountAnswer(num)}
                    className="w-18 h-20 sm:w-22 sm:h-24 bg-sky-500 hover:bg-sky-400 active:scale-95 text-white font-fredoka font-black text-3xl sm:text-4xl rounded-3xl border-4 border-white shadow-lg transition-transform cursor-pointer"
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 animate-in zoom-in-95 mt-4">
              <div className="flex items-center gap-2 text-emerald-600 font-black text-xl">
                <Check className="w-7 h-7" />
                <span>Bagus Sekali! Ada {currentCountRound.count}!</span>
              </div>
              <button
                onClick={handleNextCount}
                className="py-3 px-6 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-base rounded-2xl shadow-md flex items-center gap-2 cursor-pointer transition-transform"
              >
                <span>Tantangan Berikutnya</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: STEPPING STONES NUMBER SEQUENCE */}
      {activeTab === 'SEQUENCE' && (
        <div className="w-full max-w-2xl bg-white/95 border-3 border-sky-300 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col items-center text-center">
          <div className="text-xs font-bold text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 mb-2">
            Lengkapi batu loncatan yang hilang agar Kiko bisa menyeberang!
          </div>

          <h3 className="text-2xl font-black text-slate-800 mt-2 mb-6">
            Jembatan Batu Berurutan
          </h3>

          {/* Stones in a River Graphic */}
          <div className="w-full py-6 px-4 bg-linear-to-r from-cyan-100 via-sky-200 to-blue-200 rounded-3xl border-2 border-sky-300 shadow-inner flex items-center justify-around gap-2 my-2 overflow-x-auto">
            {currentSeq.full.map((num, idx) => {
              const isMissing = idx === currentSeq.missingIndex;
              return (
                <div
                  key={idx}
                  className={`w-14 h-16 sm:w-16 sm:h-20 rounded-2xl border-3 flex flex-col items-center justify-center font-fredoka font-black transition-all ${
                    isMissing
                      ? seqAnswered
                        ? 'bg-emerald-500 border-white text-white text-3xl shadow-lg animate-bounce'
                        : 'bg-amber-100 border-dashed border-amber-400 text-amber-700 text-2xl animate-pulse'
                      : 'bg-white border-sky-300 text-sky-950 text-2xl sm:text-3xl shadow-md'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 -mt-1 font-sans">Batu</span>
                  <span>{isMissing ? (seqAnswered ? num : '?') : num}</span>
                </div>
              );
            })}
          </div>

          {/* Stepping Stone Options */}
          {!seqAnswered ? (
            <div className="w-full mt-6">
              <p className="text-xs font-bold text-slate-600 mb-3">
                Pilih batu angka yang hilang:
              </p>
              <div className="flex justify-center gap-4">
                {currentSeq.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelectSeq(opt)}
                    className="w-16 h-18 sm:w-20 sm:h-22 bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 font-black text-3xl rounded-2xl border-3 border-white shadow-md transition-transform cursor-pointer"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={handleNextSeq}
              className="mt-6 py-3 px-6 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-base rounded-2xl shadow-md flex items-center gap-2 cursor-pointer transition-transform"
            >
              <span>Jembatan Berikutnya</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      {/* TAB 3: HARVEST TO BASKET */}
      {activeTab === 'CATCH' && (
        <div className="w-full max-w-2xl bg-white/95 border-3 border-sky-300 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col items-center text-center">
          <div className="text-xs font-bold text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 mb-2">
            Petik buah apel hingga keranjang memiliki {targetCatch} buah!
          </div>

          <h3 className="text-2xl font-black text-slate-800 mt-2 mb-2">
            Target: Petik <span className="text-rose-500 font-mono text-3xl">{targetCatch}</span> Apel
          </h3>

          {/* The Apple Tree */}
          <div className="relative w-full max-w-md h-56 bg-linear-to-b from-green-500 to-emerald-700 rounded-3xl border-4 border-emerald-300 shadow-md flex flex-wrap items-center justify-around p-6 my-4">
            <span className="absolute top-2 left-4 text-xs font-black text-emerald-100 bg-emerald-900/40 px-2 py-0.5 rounded-full">
              🌳 Pohon Apel Manis
            </span>
            {[1, 2, 3, 4, 5, 6].map((appleId) => {
              const isHarvested = caughtItems.includes(appleId);
              return (
                <button
                  key={appleId}
                  onClick={() => handleCatchFruit(appleId)}
                  disabled={isHarvested}
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-4xl transition-all cursor-pointer ${
                    isHarvested
                      ? 'opacity-20 scale-75 cursor-not-allowed'
                      : 'hover:scale-125 active:scale-95 animate-bounce'
                  }`}
                  style={{ animationDelay: `${appleId * 0.2}s` }}
                >
                  🍎
                </button>
              );
            })}
          </div>

          {/* The Basket */}
          <div className="w-full max-w-md bg-amber-100 border-3 border-amber-400 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-4xl">🧺</span>
              <div className="text-left">
                <span className="text-xs font-bold text-amber-900 block">
                  Keranjang Buah Kiko
                </span>
                <span className="text-lg font-black text-amber-950 font-mono">
                  {caughtItems.length} / {targetCatch} Terisi
                </span>
              </div>
            </div>

            {caughtItems.length >= targetCatch && (
              <button
                onClick={() => {
                  setCaughtItems([]);
                  sound.playPop();
                }}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                Isi Ulang 🍎
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
