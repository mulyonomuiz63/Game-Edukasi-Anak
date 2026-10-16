import React, { useState, useEffect } from 'react';
import { Heart, Check, ArrowRight, RotateCcw, Smile, Frown, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';
import { MascotSvg } from '../MascotSvg';
import { DifficultyLevel } from '../../types/game';
import { DifficultySelector } from '../DifficultySelector';

interface EmotionAdventureGameProps {
  difficulty: DifficultyLevel;
  onChangeDifficulty: (diff: DifficultyLevel) => void;
  onActivityComplete: (item: string) => void;
  onBackToMap: () => void;
}

const ALL_EMOTIONS: Record<
  DifficultyLevel,
  {
    id: string;
    name: string;
    emoji: string;
    face: string;
    scenario: string;
    question: string;
    solution: string;
    comfortPrompt: string;
    color: string;
  }[]
> = {
  EASY: [
    {
      id: 'happy',
      name: 'Senang',
      emoji: '🦁',
      face: '😄',
      scenario: 'Singa kecil baru saja mendapatkan bola mainan baru!',
      question: 'Bagaimana perasaan Singa sekarang?',
      solution: 'Singa merasa SENANG dan tertawa ceria!',
      comfortPrompt: 'Beri tos tangan untuk ikut bergembira bersama Singa! ✋',
      color: 'border-yellow-400 bg-yellow-50',
    },
    {
      id: 'sad',
      name: 'Sedih',
      emoji: '🐻',
      face: '😢',
      scenario: 'Beruang madunya terjatuh dan es krimnya meleleh...',
      question: 'Bagaimana perasaan Beruang sekarang?',
      solution: 'Beruang merasa SEDIH. Ayo kita beri pelukan hangat!',
      comfortPrompt: 'Ketuk untuk memeluk dan menghibur Beruang! 🫂',
      color: 'border-sky-400 bg-sky-50',
    },
  ],
  MEDIUM: [
    {
      id: 'happy',
      name: 'Senang',
      emoji: '🦁',
      face: '😄',
      scenario: 'Singa kecil baru saja mendapatkan bola mainan baru!',
      question: 'Bagaimana perasaan Singa sekarang?',
      solution: 'Singa merasa SENANG dan tertawa ceria!',
      comfortPrompt: 'Beri tos tangan untuk ikut bergembira bersama Singa! ✋',
      color: 'border-yellow-400 bg-yellow-50',
    },
    {
      id: 'sad',
      name: 'Sedih',
      emoji: '🐻',
      face: '😢',
      scenario: 'Beruang madunya terjatuh dan es krimnya meleleh...',
      question: 'Bagaimana perasaan Beruang sekarang?',
      solution: 'Beruang merasa SEDIH. Ayo kita beri pelukan hangat!',
      comfortPrompt: 'Ketuk untuk memeluk dan menghibur Beruang! 🫂',
      color: 'border-sky-400 bg-sky-50',
    },
    {
      id: 'surprised',
      name: 'Terkejut',
      emoji: '🐼',
      face: '😲',
      scenario: 'Panda melihat kupu-kupu besar hinggap di hidungnya!',
      question: 'Bagaimana perasaan Panda sekarang?',
      solution: 'Panda merasa TERKEJUT dengan mata berbinar!',
      comfortPrompt: 'Tersenyumlah bersama Panda! ✨',
      color: 'border-purple-400 bg-purple-50',
    },
    {
      id: 'sleepy',
      name: 'Mengantuk',
      emoji: '🐱',
      face: '😴',
      scenario: 'Kucing manis sudah bermain seharian di kebun bunga...',
      question: 'Bagaimana perasaan Kucing sekarang?',
      solution: 'Kucing merasa MENGANTUK dan ingin tidur di kasur empuk.',
      comfortPrompt: 'Katakan "Selamat tidur manis, Kucing!" 🌙',
      color: 'border-indigo-400 bg-indigo-50',
    },
  ],
  HARD: [
    {
      id: 'happy',
      name: 'Senang',
      emoji: '🦁',
      face: '😄',
      scenario: 'Singa kecil baru saja menyelesaikan menara balok yang tinggi!',
      question: 'Bagaimana perasaan Singa sekarang?',
      solution: 'Singa merasa SENANG dan bangga atas karyanya!',
      comfortPrompt: 'Tepuk tangan meriah untuk Singa! 👏',
      color: 'border-yellow-400 bg-yellow-50',
    },
    {
      id: 'sad',
      name: 'Sedih',
      emoji: '🐻',
      face: '😢',
      scenario: 'Beruang tersandung akar pohon saat sedang berlari...',
      question: 'Bagaimana perasaan Beruang sekarang?',
      solution: 'Beruang merasa SEDIH dan butuh pertolongan sahabat.',
      comfortPrompt: 'Bantu obati luka kecil Beruang dengan plester ramah! 🩹',
      color: 'border-sky-400 bg-sky-50',
    },
    {
      id: 'angry',
      name: 'Marah',
      emoji: '🦊',
      face: '😠',
      scenario: 'Mainan puzzle Kiko terinjak dan tercecer berantakan.',
      question: 'Bagaimana perasaan Kiko sekarang?',
      solution: 'Kiko merasa KESAL/MARAH. Tarik napas dalam-dalam bersama Kiko.',
      comfortPrompt: 'Tarik napas lembut... 1, 2, 3... Hembuskan bersama Kiko! 💨',
      color: 'border-rose-400 bg-rose-50',
    },
    {
      id: 'shy',
      name: 'Khawatir/Malu',
      emoji: '🐰',
      face: '🥺',
      scenario: 'Kiki baru pertama kali tampil menyanyi di panggung sekolah.',
      question: 'Bagaimana perasaan Kiki sekarang?',
      solution: 'Kiki merasa KHAWATIR/MALU. Kita beri semangat ya!',
      comfortPrompt: 'Katakan: "Kiki pasti bisa, kami mendukungmu!" 🌟',
      color: 'border-pink-400 bg-pink-50',
    },
  ],
};

const ALL_SHADOWS: Record<DifficultyLevel, { id: string; name: string; emoji: string }[]> = {
  EASY: [
    { id: 'cat', name: 'Kucing', emoji: '🐱' },
    { id: 'elephant', name: 'Gajah', emoji: '🐘' },
  ],
  MEDIUM: [
    { id: 'cat', name: 'Kucing', emoji: '🐱' },
    { id: 'elephant', name: 'Gajah', emoji: '🐘' },
    { id: 'penguin', name: 'Pinguin', emoji: '🐧' },
    { id: 'monkey', name: 'Monyet', emoji: '🐵' },
  ],
  HARD: [
    { id: 'cat', name: 'Kucing', emoji: '🐱' },
    { id: 'elephant', name: 'Gajah', emoji: '🐘' },
    { id: 'penguin', name: 'Pinguin', emoji: '🐧' },
    { id: 'monkey', name: 'Monyet', emoji: '🐵' },
    { id: 'deer', name: 'Rusa', emoji: '🦌' },
    { id: 'owl', name: 'Burung Hantu', emoji: '🦉' },
  ],
};

export const EmotionAdventureGame: React.FC<EmotionAdventureGameProps> = ({
  difficulty,
  onChangeDifficulty,
  onActivityComplete,
  onBackToMap,
}) => {
  const [activeTab, setActiveTab] = useState<'EMOTION' | 'SHADOW' | 'PUZZLE'>('EMOTION');

  const emotionsList = ALL_EMOTIONS[difficulty];
  const [emotionIndex, setEmotionIndex] = useState(0);
  const currentEmotion = emotionsList[emotionIndex % emotionsList.length];
  const [emotionSolved, setEmotionSolved] = useState(false);
  const [comfortGiven, setComfortGiven] = useState(false);

  const shadowList = ALL_SHADOWS[difficulty];
  const [targetShadowIdx, setTargetShadowIdx] = useState(0);
  const currentTargetShadow = shadowList[targetShadowIdx % shadowList.length];
  const [shadowSolved, setShadowSolved] = useState(false);

  // Puzzle tiles state
  const [puzzleTiles, setPuzzleTiles] = useState<number[]>([3, 1, 4, 2]);
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);

  useEffect(() => {
    setEmotionIndex(0);
    setEmotionSolved(false);
    setComfortGiven(false);
    setTargetShadowIdx(0);
    setShadowSolved(false);
    setPuzzleTiles([3, 1, 4, 2]);
    setIsPuzzleSolved(false);
  }, [difficulty]);

  // Handle emotion answer
  const handleSelectEmotion = (chosenId: string) => {
    if (chosenId === currentEmotion.id) {
      setEmotionSolved(true);
      sound.playSuccessChime();
      sound.speak(`Tepat! ${currentEmotion.solution}`);
      onActivityComplete(currentEmotion.name);
    } else {
      sound.playBoing();
      sound.speak('Perhatikan raut wajahnya ya, apakah ia sedang tersenyum, sedih, atau kesal?');
    }
  };

  const handleGiveComfort = () => {
    setComfortGiven(true);
    sound.playSparkle();
    sound.speak('Terima kasih sudah peduli dan menyayangi sahabat satwa!');
  };

  const handleNextEmotion = () => {
    setEmotionSolved(false);
    setComfortGiven(false);
    setEmotionIndex((prev) => (prev + 1) % emotionsList.length);
  };

  // Shadow match answer
  const handlePickAnimal = (animalId: string) => {
    if (animalId === currentTargetShadow.id) {
      setShadowSolved(true);
      sound.playSuccessChime();
      sound.speak(`Benar sekali! Itu adalah bayangan ${currentTargetShadow.name}!`);
      onActivityComplete(currentTargetShadow.name);
    } else {
      sound.playBoing();
      sound.speak('Coba perhatikan bentuk telinga dan tubuh bayangannya!');
    }
  };

  const handleNextShadow = () => {
    setShadowSolved(false);
    setTargetShadowIdx((prev) => (prev + 1) % shadowList.length);
  };

  // Swap tiles in puzzle
  const handleTileClick = (index: number) => {
    sound.playPop();
    const updated = [...puzzleTiles];
    const nextIdx = (index + 1) % 4;
    const temp = updated[index];
    updated[index] = updated[nextIdx];
    updated[nextIdx] = temp;
    setPuzzleTiles(updated);

    if (updated.join('') === '1234') {
      setIsPuzzleSolved(true);
      sound.playSuccessChime();
      sound.speak('Hore! Gambar Kiko dan Kiki berhasil tersusun rapi!');
      onActivityComplete('Puzzle Bergambar');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-3 sm:p-6 flex flex-col items-center">
      {/* Zone Header Banner */}
      <div className="w-full bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-4 sm:p-5 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl shadow-inner">
            🦊
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-fredoka font-black">
              Lembah Emosi &amp; Sahabat Satwa
            </h2>
            <p className="text-amber-100 text-xs sm:text-sm font-semibold">
              Kiko dan Kiki mengajakmu memahami perasaan sahabat dan melatih logika ceria!
            </p>
          </div>
        </div>

        {/* Mascot Mini View */}
        <MascotSvg
          type="kiko"
          size="sm"
          showSpeech
          speechText="Yuk bantu sahabat kita!"
        />
      </div>

      {/* Difficulty Selector Bar */}
      <div className="w-full flex justify-center mb-4">
        <DifficultySelector
          currentDifficulty={difficulty}
          onChangeDifficulty={onChangeDifficulty}
        />
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-amber-100/80 rounded-2xl border border-amber-300 mb-6 max-w-md w-full justify-center">
        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('EMOTION');
          }}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 text-center ${
            activeTab === 'EMOTION'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-amber-900 hover:bg-amber-200'
          }`}
        >
          ❤️ Tebak Emosi
        </button>
        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('SHADOW');
          }}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 text-center ${
            activeTab === 'SHADOW'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-amber-900 hover:bg-amber-200'
          }`}
        >
          👥 Tebak Bayangan
        </button>
        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('PUZZLE');
          }}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 text-center ${
            activeTab === 'PUZZLE'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-amber-900 hover:bg-amber-200'
          }`}
        >
          🧩 Puzzle Satwa
        </button>
      </div>

      {/* TAB 1: EMOTION RECOGNITION & EMPATHY */}
      {activeTab === 'EMOTION' && (
        <div className="w-full max-w-2xl bg-white/95 border-3 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col items-center text-center">
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              {difficulty === 'EASY'
                ? '2 Emosi Dasar (Senang & Sedih)'
                : difficulty === 'MEDIUM'
                ? '4 Emosi Ceria'
                : 'Tantangan Emosi & Empati'}
            </span>
            <span className="text-xs font-bold text-slate-500 font-mono">
              Cerita {emotionIndex + 1} / {emotionsList.length}
            </span>
          </div>

          {/* Animal Card */}
          <div className={`w-full p-6 rounded-3xl border-3 ${currentEmotion.color} my-4 flex flex-col items-center shadow-xs`}>
            <div className="flex items-center gap-4 text-6xl my-2">
              <span>{currentEmotion.emoji}</span>
              <span className="text-5xl">{currentEmotion.face}</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-slate-800 mt-2 max-w-md">
              "{currentEmotion.scenario}"
            </p>
            <p className="text-sm font-black text-amber-900 mt-2">
              {currentEmotion.question}
            </p>
          </div>

          {/* Answer Options */}
          {!emotionSolved ? (
            <div className="w-full mt-2">
              <p className="text-xs font-bold text-slate-600 mb-3">
                Pilih perasaan yang tepat:
              </p>
              <div
                className={`grid gap-2.5 ${
                  emotionsList.length <= 2 ? 'grid-cols-2 max-w-xs mx-auto' : 'grid-cols-2 sm:grid-cols-4'
                }`}
              >
                {emotionsList.map((em) => (
                  <button
                    key={em.id}
                    onClick={() => handleSelectEmotion(em.id)}
                    className="py-3 px-2 bg-amber-100 hover:bg-amber-200 active:scale-95 border-2 border-amber-300 rounded-2xl flex flex-col items-center gap-1 cursor-pointer transition-transform"
                  >
                    <span className="text-3xl">{em.face}</span>
                    <span className="text-xs font-black text-amber-950">{em.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center gap-3 animate-in zoom-in-95 mt-2">
              <div className="flex items-center gap-2 text-emerald-600 font-black text-lg">
                <Check className="w-6 h-6" />
                <span>{currentEmotion.solution}</span>
              </div>

              {!comfortGiven ? (
                <button
                  onClick={handleGiveComfort}
                  className="w-full max-w-sm py-3 px-4 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform animate-pulse"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  <span>{currentEmotion.comfortPrompt}</span>
                </button>
              ) : (
                <button
                  onClick={handleNextEmotion}
                  className="py-3 px-6 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-base rounded-2xl shadow-md flex items-center gap-2 cursor-pointer transition-transform"
                >
                  <span>Sahabat Satwa Berikutnya</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SHADOW MATCHING */}
      {activeTab === 'SHADOW' && (
        <div className="w-full max-w-2xl bg-white/95 border-3 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col items-center text-center">
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              {difficulty === 'EASY'
                ? 'Pilih dari 2 Satwa Sahabat'
                : difficulty === 'MEDIUM'
                ? 'Pilih dari 4 Satwa'
                : 'Tantangan 6 Bayangan Misterius'}
            </span>
            <span className="text-xs font-bold text-slate-500 font-mono">
              Soal {targetShadowIdx + 1} / {shadowList.length}
            </span>
          </div>

          <h3 className="text-2xl font-black text-slate-800 mt-2 mb-2">
            Bayangan Sahabat Misterius
          </h3>

          {/* The Shadow Silhouette Card */}
          <div className="w-44 h-44 rounded-3xl bg-linear-to-b from-slate-800 to-slate-900 border-4 border-amber-300 shadow-xl flex items-center justify-center text-7xl my-4">
            {shadowSolved ? (
              <span className="animate-bounce">{currentTargetShadow.emoji}</span>
            ) : (
              <span className="filter brightness-0 contrast-200 opacity-60">
                {currentTargetShadow.emoji}
              </span>
            )}
          </div>

          {/* Animal Pickers */}
          {!shadowSolved ? (
            <div className="w-full mt-4">
              <p className="text-xs font-bold text-slate-600 mb-3">
                Siapakah pemilik bayangan di atas?
              </p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                {shadowList.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => handlePickAnimal(a.id)}
                    className="w-16 h-18 sm:w-20 sm:h-22 bg-amber-100 hover:bg-amber-200 active:scale-95 border-3 border-amber-300 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-md cursor-pointer transition-transform"
                  >
                    <span className="text-3xl sm:text-4xl">{a.emoji}</span>
                    <span className="text-[11px] font-bold text-slate-800 truncate max-w-full">{a.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 animate-in zoom-in-95 mt-4">
              <div className="flex items-center gap-2 text-emerald-600 font-black text-xl">
                <Check className="w-7 h-7" />
                <span>Tepat! Itu adalah {currentTargetShadow.name}!</span>
              </div>
              <button
                onClick={handleNextShadow}
                className="py-3 px-6 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-base rounded-2xl shadow-md flex items-center gap-2 cursor-pointer transition-transform"
              >
                <span>Bayangan Berikutnya</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PICTURE PUZZLE */}
      {activeTab === 'PUZZLE' && (
        <div className="w-full max-w-xl bg-white/95 border-3 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col items-center text-center">
          <div className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-2">
            Ketuk potongan kotak untuk menukar posisinya hingga urut 1, 2, 3, 4!
          </div>

          <h3 className="text-2xl font-black text-slate-800 mt-2 mb-4">
            Puzzle Sahabat Ceria
          </h3>

          {/* 2x2 Grid of Puzzle Pieces */}
          <div className="grid grid-cols-2 gap-3 w-64 h-64 p-3 bg-amber-100 rounded-3xl border-4 border-amber-300 shadow-inner">
            {puzzleTiles.map((pieceNum, index) => {
              const emojiMap: Record<number, string> = {
                1: '🦊 Kiko',
                2: '🐰 Kiki',
                3: '🌈 Pelangi',
                4: '⭐ Bintang',
              };
              return (
                <button
                  key={index}
                  onClick={() => handleTileClick(index)}
                  className="aspect-square rounded-2xl bg-white border-2 border-amber-400 hover:border-amber-600 active:scale-95 flex flex-col items-center justify-center p-2 shadow-xs cursor-pointer transition-transform"
                >
                  <span className="text-xs font-black text-amber-700 font-mono">
                    Bagian {pieceNum}
                  </span>
                  <span className="text-2xl mt-1">{emojiMap[pieceNum]}</span>
                </button>
              );
            })}
          </div>

          {isPuzzleSolved ? (
            <div className="mt-4 flex flex-col items-center gap-2 animate-in zoom-in-95">
              <div className="flex items-center gap-2 text-emerald-600 font-black text-lg">
                <Check className="w-6 h-6" />
                <span>Gambar Lengkap &amp; Indah Sekali!</span>
              </div>
              <button
                onClick={() => {
                  setPuzzleTiles([3, 1, 4, 2]);
                  setIsPuzzleSolved(false);
                  sound.playPop();
                }}
                className="py-2.5 px-5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer"
              >
                Acak &amp; Main Lagi 🔄
              </button>
            </div>
          ) : (
            <p className="text-xs text-slate-500 font-semibold mt-4">
              Susun hingga urut: 1 (Kiko), 2 (Kiki), 3 (Pelangi), 4 (Bintang)!
            </p>
          )}
        </div>
      )}
    </div>
  );
};
