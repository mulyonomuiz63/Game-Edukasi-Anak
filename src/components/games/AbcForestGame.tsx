import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, Check, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';
import { MascotSvg } from '../MascotSvg';
import { DifficultyLevel } from '../../types/game';
import { DifficultySelector } from '../DifficultySelector';

interface AbcForestGameProps {
  difficulty: DifficultyLevel;
  onChangeDifficulty: (diff: DifficultyLevel) => void;
  onActivityComplete: (letter: string) => void;
  onBackToMap: () => void;
}

// Alphabet database categorized by difficulty
const ALPHABET_ITEMS_EASY = [
  { letter: 'A', word: 'Apel', emoji: '🍎', desc: 'A untuk Apel yang manis dan merah' },
  { letter: 'B', word: 'Bola', emoji: '⚽', desc: 'B untuk Bola yang bulat membal' },
  { letter: 'C', word: 'Ceri', emoji: '🍒', desc: 'C untuk Ceri merah mungil' },
  { letter: 'D', word: 'Domba', emoji: '🐑', desc: 'D untuk Domba berbulu lembut' },
  { letter: 'E', word: 'Elang', emoji: '🦅', desc: 'E untuk Elang yang gagah' },
  { letter: 'I', word: 'Ikan', emoji: '🐟', desc: 'I untuk Ikan yang berenang' },
  { letter: 'O', word: 'Orangutan', emoji: '🦧', desc: 'O untuk Orangutan di pohon' },
  { letter: 'U', word: 'Unta', emoji: '🐪', desc: 'U untuk Unta di padang pasir' },
];

const ALPHABET_ITEMS_MEDIUM = [
  ...ALPHABET_ITEMS_EASY,
  { letter: 'G', word: 'Gajah', emoji: '🐘', desc: 'G untuk Gajah berbelalai panjang' },
  { letter: 'H', word: 'Harimau', emoji: '🐯', desc: 'H untuk Harimau yang gagah' },
  { letter: 'J', word: 'Jeruk', emoji: '🍊', desc: 'J untuk Jeruk segar manis' },
  { letter: 'K', word: 'Kucing', emoji: '🐱', desc: 'K untuk Kucing meong yang lucu' },
  { letter: 'L', word: 'Lebah', emoji: '🐝', desc: 'L untuk Lebah pembuat madu' },
  { letter: 'M', word: 'Melon', emoji: '🍈', desc: 'M untuk Melon yang segar' },
  { letter: 'P', word: 'Pisang', emoji: '🍌', desc: 'P untuk Pisang kuning lezat' },
  { letter: 'R', word: 'Rusa', emoji: '🦌', desc: 'R untuk Rusa bertanduk indah' },
  { letter: 'S', word: 'Sapi', emoji: '🐄', desc: 'S untuk Sapi penghasil susu' },
  { letter: 'T', word: 'Topi', emoji: '🧢', desc: 'T untuk Topi pelindung panas' },
];

const ALPHABET_ITEMS_HARD = [
  ...ALPHABET_ITEMS_MEDIUM,
  { letter: 'F', word: 'Foto', emoji: '📷', desc: 'F untuk Foto kenangan manis' },
  { letter: 'N', word: 'Nanas', emoji: '🍍', desc: 'N untuk Nanas yang harum' },
  { letter: 'Q', word: 'Quran', emoji: '📖', desc: 'Q untuk Kitab suci bercahaya' },
  { letter: 'V', word: 'Vas', emoji: '🏺', desc: 'V untuk Vas bunga yang elok' },
  { letter: 'W', word: 'Wortel', emoji: '🥕', desc: 'W untuk Wortel makanan kelinci' },
  { letter: 'X', word: 'Xilofon', emoji: '🎹', desc: 'X untuk Xilofon alat musik merdu' },
  { letter: 'Y', word: 'Yoyo', emoji: '🪀', desc: 'Y untuk Yoyo mainan berputar' },
  { letter: 'Z', word: 'Zebra', emoji: '🦓', desc: 'Z untuk Zebra bergaris hitam putih' },
];

// Word spelling database per difficulty
const WORDS_BY_DIFFICULTY = {
  EASY: [
    { word: 'IBU', emoji: '👩', meaning: 'Ibu yang penuh kasih sayang' },
    { word: 'API', emoji: '🔥', meaning: 'Api yang hangat' },
    { word: 'TAS', emoji: '🎒', meaning: 'Tas sekolah Kiko' },
    { word: 'UBI', emoji: '🍠', meaning: 'Ubi manis yang lezat' },
    { word: 'AIR', emoji: '💧', meaning: 'Air jernih pelepas dahaga' },
  ],
  MEDIUM: [
    { word: 'MAMA', emoji: '👩', meaning: 'Mama tersayang' },
    { word: 'BOLA', emoji: '⚽', meaning: 'Bola mainan bulat membal' },
    { word: 'IKAN', emoji: '🐟', meaning: 'Ikan berenang di air' },
    { word: 'BUKU', emoji: '📖', meaning: 'Buku cerita ajaib Kiki' },
    { word: 'APEL', emoji: '🍎', meaning: 'Apel manis berwarna merah' },
    { word: 'ROTI', emoji: '🍞', meaning: 'Roti sarapan pagi hangat' },
  ],
  HARD: [
    { word: 'KUCING', emoji: '🐱', meaning: 'Kucing berbulu halus dan lucu' },
    { word: 'KERETA', emoji: '🚂', meaning: 'Kereta api berjalan cepat di rel' },
    { word: 'KELINCI', emoji: '🐰', meaning: 'Kelinci sahabat Kiki yang lincah' },
    { word: 'PELANGI', emoji: '🌈', meaning: 'Pelangi indah warna-warni di langit' },
    { word: 'BINTANG', emoji: '⭐', meaning: 'Bintang bersinar terang di malam hari' },
  ],
};

// Missing letter puzzles per difficulty
const MISSING_PUZZLES_BY_DIFFICULTY = {
  EASY: [
    { full: 'API', display: ['A', '_', 'I'], answer: 'P', options: ['P', 'M'], emoji: '🔥' },
    { full: 'TAS', display: ['T', 'A', '_'], answer: 'S', options: ['S', 'B'], emoji: '🎒' },
    { full: 'IBU', display: ['_', 'B', 'U'], answer: 'I', options: ['I', 'O'], emoji: '👩' },
  ],
  MEDIUM: [
    { full: 'BOLA', display: ['B', '_', 'L', 'A'], answer: 'O', options: ['O', 'A', 'E'], emoji: '⚽' },
    { full: 'APEL', display: ['A', 'P', '_', 'L'], answer: 'E', options: ['I', 'E', 'U'], emoji: '🍎' },
    { full: 'IKAN', display: ['_', 'K', 'A', 'N'], answer: 'I', options: ['I', 'O', 'A'], emoji: '🐟' },
    { full: 'BUKU', display: ['B', 'U', 'K', '_'], answer: 'U', options: ['A', 'U', 'I'], emoji: '📖' },
  ],
  HARD: [
    { full: 'KERETA', display: ['K', 'E', 'R', '_', 'T', 'A'], answer: 'E', options: ['E', 'A', 'I', 'O'], emoji: '🚂' },
    { full: 'KUCING', display: ['K', 'U', 'C', '_', 'N', 'G'], answer: 'I', options: ['I', 'E', 'A', 'U'], emoji: '🐱' },
    { full: 'PELANGI', display: ['P', 'E', '_', 'A', 'N', 'G', 'I'], answer: 'L', options: ['L', 'R', 'M', 'N'], emoji: '🌈' },
    { full: 'BINTANG', display: ['B', '_', 'N', 'T', 'A', 'N', 'G'], answer: 'I', options: ['I', 'E', 'O', 'U'], emoji: '⭐' },
  ],
};

export const AbcForestGame: React.FC<AbcForestGameProps> = ({
  difficulty,
  onChangeDifficulty,
  onActivityComplete,
  onBackToMap,
}) => {
  const [activeTab, setActiveTab] = useState<'TREES' | 'SPELL' | 'MISSING'>('TREES');

  // Alphabet list dynamically matching difficulty
  const alphabetItems =
    difficulty === 'EASY'
      ? ALPHABET_ITEMS_EASY
      : difficulty === 'MEDIUM'
      ? ALPHABET_ITEMS_MEDIUM
      : ALPHABET_ITEMS_HARD;

  const [selectedLetter, setSelectedLetter] = useState(alphabetItems[0]);

  // Words list matching difficulty
  const wordsList = WORDS_BY_DIFFICULTY[difficulty];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentWord = wordsList[currentWordIndex % wordsList.length];
  const [spelledLetters, setSpelledLetters] = useState<string[]>([]);

  // Missing puzzle list matching difficulty
  const puzzleList = MISSING_PUZZLES_BY_DIFFICULTY[difficulty];
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const currentPuzzle = puzzleList[puzzleIndex % puzzleList.length];
  const [puzzleSuccess, setPuzzleSuccess] = useState(false);

  // Reset indices on difficulty change
  useEffect(() => {
    setSelectedLetter(alphabetItems[0]);
    setCurrentWordIndex(0);
    setSpelledLetters([]);
    setPuzzleIndex(0);
    setPuzzleSuccess(false);
  }, [difficulty]);

  // Tab 1: Phonics Letter Tree Tap
  const handleTapLetter = (item: (typeof ALPHABET_ITEMS_HARD)[0]) => {
    setSelectedLetter(item);
    sound.playPop();
    sound.speak(`Huruf ${item.letter}! ${item.letter} untuk ${item.word}!`);
    onActivityComplete(item.letter);
  };

  // Tab 2: Word spelling block click
  const handleSpellBlockClick = (char: string) => {
    sound.playPop();
    const nextIdx = spelledLetters.length;
    if (nextIdx < currentWord.word.length) {
      if (currentWord.word[nextIdx] === char) {
        const updated = [...spelledLetters, char];
        setSpelledLetters(updated);
        sound.playSparkle();
        sound.speak(char);

        if (updated.length === currentWord.word.length) {
          sound.playSuccessChime();
          sound.speak(`Hore! Kamu berhasil menyusun kata ${currentWord.word}!`);
          onActivityComplete(currentWord.word);
        }
      } else {
        sound.playBoing();
        sound.speak(`Coba cari huruf ${currentWord.word[nextIdx]} ya!`);
      }
    }
  };

  const handleNextWord = () => {
    setSpelledLetters([]);
    setCurrentWordIndex((prev) => (prev + 1) % wordsList.length);
  };

  // Tab 3: Missing letter click
  const handleSelectMissingLetter = (char: string) => {
    if (char === currentPuzzle.answer) {
      setPuzzleSuccess(true);
      sound.playSuccessChime();
      sound.speak(`Benar sekali! Huruf ${char}! Membentuk kata ${currentPuzzle.full}!`);
      onActivityComplete(currentPuzzle.full);
    } else {
      sound.playBoing();
      sound.speak('Coba lagi ya, kamu pasti bisa!');
    }
  };

  const handleNextPuzzle = () => {
    setPuzzleSuccess(false);
    setPuzzleIndex((prev) => (prev + 1) % puzzleList.length);
  };

  // Helper scrambled candidate letters generator
  const getLetterChoices = () => {
    const needed = currentWord.word.split('');
    const distractors = ['A', 'B', 'M', 'K', 'U', 'I', 'L', 'O', 'C', 'N', 'G', 'E', 'R', 'T'];
    const count = difficulty === 'EASY' ? 5 : difficulty === 'MEDIUM' ? 8 : 12;
    const combined = Array.from(new Set([...needed, ...distractors])).slice(0, count);
    return combined.sort(() => 0.5 - Math.random());
  };

  const [availableChoices, setAvailableChoices] = useState<string[]>([]);
  useEffect(() => {
    setAvailableChoices(getLetterChoices());
  }, [currentWordIndex, difficulty]);

  return (
    <div className="w-full max-w-5xl mx-auto p-3 sm:p-6 flex flex-col items-center">
      {/* Zone Header Banner */}
      <div className="w-full bg-linear-to-r from-emerald-500 via-teal-500 to-green-600 rounded-3xl p-4 sm:p-5 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl shadow-inner">
            🌲
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-fredoka font-black">
              Hutan ABC &amp; Fonik Kata
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm font-semibold">
              Kiki si Kelinci mengajakmu mengenal huruf dan menyusun kata ceria!
            </p>
          </div>
        </div>

        {/* Mascot Mini View */}
        <MascotSvg
          type="kiki"
          size="sm"
          showSpeech
          speechText="Ayo ketuk hurufnya!"
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
      <div className="flex items-center gap-2 p-1.5 bg-emerald-100/80 rounded-2xl border border-emerald-300 mb-6 max-w-md w-full justify-center">
        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('TREES');
          }}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 text-center ${
            activeTab === 'TREES'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-emerald-900 hover:bg-emerald-200'
          }`}
        >
          🌳 Pohon Huruf
        </button>
        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('SPELL');
          }}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 text-center ${
            activeTab === 'SPELL'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-emerald-900 hover:bg-emerald-200'
          }`}
        >
          🧩 Susun Kata
        </button>
        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('MISSING');
          }}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 text-center ${
            activeTab === 'MISSING'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-emerald-900 hover:bg-emerald-200'
          }`}
        >
          🔍 Huruf Hilang
        </button>
      </div>

      {/* TAB 1: LETTER TREES */}
      {activeTab === 'TREES' && (
        <div className="w-full flex flex-col md:flex-row gap-5 items-stretch">
          {/* Alphabet Grid */}
          <div className="flex-1 bg-white/90 border-3 border-emerald-200 rounded-3xl p-4 sm:p-6 shadow-md">
            <div className="text-center mb-4 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Ketuk huruf untuk mendengar bunyinya!
              </span>
              <span className="text-xs font-bold text-slate-500">
                {alphabetItems.length} Huruf ({difficulty === 'EASY' ? 'Dasar' : difficulty === 'MEDIUM' ? 'Lengkap' : 'A-Z Penuh'})
              </span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3">
              {alphabetItems.map((item) => {
                const isSelected = selectedLetter.letter === item.letter;
                return (
                  <button
                    key={item.letter}
                    onClick={() => handleTapLetter(item)}
                    className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-1 border-3 transition-transform cursor-pointer active:scale-95 ${
                      isSelected
                        ? 'bg-emerald-500 border-emerald-600 text-white scale-105 shadow-lg'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100 hover:border-emerald-300'
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl font-black font-fredoka">
                      {item.letter}
                    </span>
                    <span className="text-base sm:text-lg">{item.emoji}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Letter Showcase Focus Card */}
          <div className="w-full md:w-80 bg-linear-to-b from-amber-50 to-orange-50 border-3 border-amber-300 rounded-3xl p-6 shadow-md flex flex-col items-center justify-between text-center">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">
                Kartu Belajar Huruf
              </span>
              <div className="w-28 h-28 my-3 rounded-3xl bg-linear-to-tr from-amber-400 to-yellow-300 border-4 border-white shadow-lg flex items-center justify-center text-6xl font-fredoka font-black text-amber-950 mx-auto animate-bounce">
                {selectedLetter.letter}
              </div>
              <div className="text-5xl my-2">{selectedLetter.emoji}</div>
              <h3 className="text-3xl font-fredoka font-black text-amber-900">
                {selectedLetter.word}
              </h3>
              <p className="text-xs font-semibold text-amber-800 mt-2 px-2">
                {selectedLetter.desc}
              </p>
            </div>

            <button
              onClick={() => {
                sound.playPop();
                sound.speak(`Huruf ${selectedLetter.letter}! ${selectedLetter.word}!`);
              }}
              className="w-full mt-4 py-3 px-4 bg-amber-400 hover:bg-amber-500 active:scale-95 text-amber-950 font-black text-sm rounded-2xl shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-transform"
            >
              <Volume2 className="w-5 h-5 text-amber-950" />
              <span>Dengarkan Lagi</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: WORD SPELLING */}
      {activeTab === 'SPELL' && (
        <div className="w-full max-w-2xl bg-white/95 border-3 border-emerald-300 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col items-center text-center">
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {difficulty === 'EASY'
                ? 'Kata 3 Huruf Sederhana'
                : difficulty === 'MEDIUM'
                ? 'Kata 4 Huruf'
                : 'Tantangan Kata 6-7 Huruf'}
            </span>
            <span className="text-xs font-bold text-slate-500 font-mono">
              Kata {currentWordIndex + 1} / {wordsList.length}
            </span>
          </div>

          {/* Visual Clue with Big Emoji */}
          <div className="text-6xl sm:text-7xl my-3 animate-float-slow">
            {currentWord.emoji}
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mb-6">
            {currentWord.meaning}
          </p>

          {/* Target Word Slots */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-8">
            {currentWord.word.split('').map((char, idx) => {
              const isFilled = idx < spelledLetters.length;
              return (
                <div
                  key={idx}
                  className={`w-12 h-14 sm:w-16 sm:h-20 rounded-2xl border-3 flex items-center justify-center text-2xl sm:text-4xl font-fredoka font-black transition-all ${
                    isFilled
                      ? 'bg-emerald-500 border-emerald-600 text-white shadow-md scale-105'
                      : 'bg-slate-100 border-dashed border-slate-300 text-slate-400'
                  }`}
                >
                  {isFilled ? spelledLetters[idx] : idx === spelledLetters.length ? '?' : ''}
                </div>
              );
            })}
          </div>

          {/* Scrambled Available Letters to Pick */}
          {spelledLetters.length < currentWord.word.length ? (
            <div className="w-full">
              <p className="text-xs font-bold text-slate-600 mb-3">
                Pilih huruf berikutnya:
              </p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {availableChoices.map((ch, i) => (
                  <button
                    key={i}
                    onClick={() => handleSpellBlockClick(ch)}
                    className="w-12 h-14 sm:w-14 sm:h-16 bg-amber-100 hover:bg-amber-300 active:scale-90 border-2 border-amber-300 text-amber-950 font-black text-2xl rounded-2xl shadow-xs transition-transform cursor-pointer"
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 animate-in zoom-in-95">
              <div className="flex items-center gap-2 text-emerald-600 font-black text-lg">
                <Check className="w-6 h-6" />
                <span>Luar Biasa! Kata {currentWord.word} Tersusun!</span>
              </div>
              <button
                onClick={handleNextWord}
                className="py-3 px-6 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-base rounded-2xl shadow-md flex items-center gap-2 cursor-pointer transition-transform"
              >
                <span>Kata Selanjutnya</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MISSING LETTER */}
      {activeTab === 'MISSING' && (
        <div className="w-full max-w-xl bg-white/95 border-3 border-emerald-300 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col items-center text-center">
          <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
            Tebak huruf apa yang sedang bersembunyi!
          </div>

          <div className="text-6xl sm:text-7xl my-3">{currentPuzzle.emoji}</div>

          {/* Missing Puzzle Slots */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 my-6">
            {currentPuzzle.display.map((ch, idx) => (
              <div
                key={idx}
                className={`w-12 h-14 sm:w-16 sm:h-20 rounded-2xl border-3 flex items-center justify-center text-2xl sm:text-4xl font-fredoka font-black ${
                  ch === '_'
                    ? puzzleSuccess
                      ? 'bg-emerald-500 border-emerald-600 text-white animate-bounce'
                      : 'bg-amber-100 border-amber-400 text-amber-800 animate-pulse'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                }`}
              >
                {ch === '_' ? (puzzleSuccess ? currentPuzzle.answer : '?') : ch}
              </div>
            ))}
          </div>

          {/* Options */}
          {!puzzleSuccess ? (
            <div className="w-full">
              <p className="text-xs font-bold text-slate-600 mb-3">
                Pilih jawaban yang benar:
              </p>
              <div className="flex justify-center gap-4">
                {currentPuzzle.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelectMissingLetter(opt)}
                    className="w-16 h-18 sm:w-20 sm:h-22 bg-amber-400 hover:bg-yellow-300 active:scale-95 border-3 border-white text-amber-950 font-black text-3xl sm:text-4xl rounded-2xl shadow-md transition-transform cursor-pointer"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={handleNextPuzzle}
              className="py-3 px-6 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-base rounded-2xl shadow-md flex items-center gap-2 cursor-pointer transition-transform"
            >
              <span>Teka-teki Berikutnya</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
