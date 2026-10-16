import React from 'react';
import { Sparkles, ArrowRight, Star, Heart, Award } from 'lucide-react';
import { sound } from '../utils/audio';
import { ScreenType, LearningStats, DifficultyLevel } from '../types/game';
import { DifficultySelector } from './DifficultySelector';

interface WorldMapProps {
  stats: LearningStats;
  difficulty: DifficultyLevel;
  onChangeDifficulty: (diff: DifficultyLevel) => void;
  onSelectZone: (zone: ScreenType) => void;
  onOpenStickers: () => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  stats,
  difficulty,
  onChangeDifficulty,
  onSelectZone,
  onOpenStickers,
}) => {
  const zones = [
    {
      id: 'ZONE_ABC' as ScreenType,
      title: 'Hutan ABC',
      subtitle: 'Taman Belajar Huruf & Kata',
      badge: `${stats.lettersLearned.length}/26 Huruf`,
      icon: '🌲',
      color: 'from-emerald-500 to-green-600',
      borderColor: 'border-emerald-300',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-950',
      tagColor: 'bg-emerald-100 text-emerald-800',
      speech: 'Ayo belajar membaca dan mengenal huruf di Hutan ABC!',
      description: 'Mengetuk pohon huruf, susun kata bergambar, dan tebak huruf hilang.',
    },
    {
      id: 'ZONE_NUMBERS' as ScreenType,
      title: 'Pulau Angka',
      subtitle: 'Petualangan Berhitung Ceria',
      badge: `${stats.numbersLearned.length}/10 Angka`,
      icon: '🏝️',
      color: 'from-sky-500 to-blue-600',
      borderColor: 'border-sky-300',
      bgColor: 'bg-sky-50',
      textColor: 'text-sky-950',
      tagColor: 'bg-sky-100 text-sky-800',
      speech: 'Mari berhitung buah dan ikan di Pulau Angka!',
      description: 'Hitung buah lezat, susun batu jembatan angka, dan tangkap ikan.',
    },
    {
      id: 'ZONE_SHAPES' as ScreenType,
      title: 'Taman Bentuk & Warna',
      subtitle: 'Eksplorasi Kreatif Bangun Datar',
      badge: `${stats.shapesLearned.length + stats.colorsLearned.length} Dikuasai`,
      icon: '🎨',
      color: 'from-purple-500 to-violet-600',
      borderColor: 'border-purple-300',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-950',
      tagColor: 'bg-purple-100 text-purple-800',
      speech: 'Yuk kenali bentuk geometri dan warna-warni indah!',
      description: 'Cocokkan bentuk ke bingkai kayu dan pilah benda warna-warni.',
    },
    {
      id: 'ZONE_EMOTION' as ScreenType,
      title: 'Lembah Emosi & Kognitif',
      subtitle: 'Teka-Teki & Sahabat Satwa',
      badge: `${stats.emotionsExplored.length} Emosi Dikenal`,
      icon: '🦊',
      color: 'from-amber-500 to-orange-600',
      borderColor: 'border-amber-300',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-950',
      tagColor: 'bg-amber-100 text-amber-800',
      speech: 'Ayo tebak perasaan sahabat satwa dan cocokkan bayangannya!',
      description: 'Mengenal rasa senang, sedih, dan mencocokkan siluet bayangan satwa.',
    },
  ];

  const handleZoneClick = (zone: (typeof zones)[0]) => {
    sound.playPop();
    sound.speak(zone.speech);
    onSelectZone(zone.id);
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-sky-100 p-3 sm:p-6 flex flex-col items-center">
      {/* Title & Guidance Header */}
      <div className="w-full max-w-5xl text-center mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/90 border border-amber-300 rounded-full shadow-xs mb-2">
          <span className="text-xl">🗺️</span>
          <span className="text-sm sm:text-base font-bold text-amber-900">
            Pilih Tempat Petualanganmu Hari Ini!
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-fredoka font-black text-slate-800 mb-3">
          Peta Dunia Belajar Kiko &amp; Kiki
        </h2>

        {/* Difficulty Level Switcher on World Map */}
        <div className="flex justify-center mt-2">
          <DifficultySelector
            currentDifficulty={difficulty}
            onChangeDifficulty={onChangeDifficulty}
          />
        </div>
      </div>

      {/* Panoramic Illustrated Visual Map Card */}
      <div className="relative w-full max-w-5xl h-48 sm:h-72 rounded-3xl overflow-hidden shadow-xl border-4 border-white mb-6">
        <img
          src="/src/assets/images/learning_world_map_1792121051103.jpg"
          alt="Peta Petualangan Belajar"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter brightness-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />

        {/* Floating Quick Action: Sticker Album Callout */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10">
          <button
            onClick={() => {
              sound.playSparkle();
              onOpenStickers();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-amber-950 font-black text-xs sm:text-sm rounded-2xl border-2 border-white shadow-lg cursor-pointer transition-transform"
          >
            <span className="text-lg">🏆</span>
            <span>Album Hadiah Stiker</span>
            <span className="bg-amber-900 text-yellow-300 text-xs px-2 py-0.5 rounded-full font-mono">
              {stats.unlockedStickers.length}
            </span>
          </button>
        </div>

        <div className="absolute bottom-3 left-4 text-white text-xs sm:text-sm font-bold drop-shadow-md hidden sm:block">
          ✨ Ketuk salah satu pulau atau hutan di bawah untuk mulai bermain!
        </div>
      </div>

      {/* 4 Interactive Learning Zones Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {zones.map((zone) => (
          <div
            key={zone.id}
            onClick={() => handleZoneClick(zone)}
            className={`group relative ${zone.bgColor} border-3 ${zone.borderColor} rounded-3xl p-4 sm:p-5 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1.5 active:scale-98 cursor-pointer flex flex-col justify-between`}
            role="button"
            tabIndex={0}
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-linear-to-br ${zone.color} text-white flex items-center justify-center text-3xl sm:text-4xl shadow-md group-hover:scale-110 transition-transform`}
                >
                  {zone.icon}
                </div>
                <div>
                  <h3 className={`text-xl sm:text-2xl font-black ${zone.textColor}`}>
                    {zone.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-semibold">
                    {zone.subtitle}
                  </p>
                </div>
              </div>

              {/* Progress badge */}
              <span className={`text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full ${zone.tagColor}`}>
                {zone.badge}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 mt-3 font-medium">
              {zone.description}
            </p>

            {/* Bottom action trigger */}
            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                Dapatkan Bintang
              </span>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-slate-800 group-hover:text-amber-600 transition-colors">
                <span>Ayo Main!</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
