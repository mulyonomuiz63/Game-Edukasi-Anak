import React, { useState } from 'react';
import { X, Check, Heart, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';
import { ChildProfile, DifficultyLevel } from '../types/game';

interface ChildProfileModalProps {
  isOpen: boolean;
  profile: ChildProfile;
  onClose: () => void;
  onSaveProfile: (profile: ChildProfile) => void;
}

const AVATARS = [
  { id: 'kiko' as const, emoji: '🦊', name: 'Kiko si Rubah' },
  { id: 'kiki' as const, emoji: '🐰', name: 'Kiki si Kelinci' },
  { id: 'lion' as const, emoji: '🦁', name: 'Singa Berani' },
  { id: 'panda' as const, emoji: '🐼', name: 'Panda Manis' },
  { id: 'cat' as const, emoji: '🐱', name: 'Kucing Meong' },
  { id: 'bear' as const, emoji: '🐻', name: 'Beruang Madu' },
];

export const ChildProfileModal: React.FC<ChildProfileModalProps> = ({
  isOpen,
  profile,
  onClose,
  onSaveProfile,
}) => {
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(
    profile.difficulty || (profile.age <= 3 ? 'EASY' : profile.age >= 6 ? 'HARD' : 'MEDIUM')
  );

  if (!isOpen) return null;

  const handleAgeChange = (a: number) => {
    setAge(a);
    sound.playPop();
    sound.speak(`Usia ${a} tahun!`);
    // auto-adjust suggested difficulty
    const suggested: DifficultyLevel = a <= 3 ? 'EASY' : a >= 6 ? 'HARD' : 'MEDIUM';
    setDifficulty(suggested);
  };

  const handleSave = () => {
    sound.playSuccessChime();
    sound.speak(`Halo ${name}! Selamat datang di petualangan bersama Kiko dan Kiki!`);
    onSaveProfile({
      ...profile,
      name: name.trim() || 'Teman Cerdas',
      age,
      avatar,
      difficulty,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-linear-to-b from-sky-50 to-blue-50 border-4 border-sky-300 rounded-3xl shadow-2xl p-6 overflow-hidden animate-in zoom-in-95">
        <button
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-2xl text-slate-600 cursor-pointer shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="text-4xl mb-1">🌟</div>
          <h3 className="text-2xl sm:text-3xl font-fredoka font-black text-sky-950">
            Profil Petualang Kecil
          </h3>
          <p className="text-xs text-sky-800 font-semibold">
            Pilih karakter sahabat dan usiamu untuk bermain bersama Kiko &amp; Kiki!
          </p>
        </div>

        {/* Name input */}
        <div className="mb-5">
          <label className="block text-xs font-bold text-sky-900 mb-1.5 text-center">
            Siapa namamu, teman pintar?
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-center text-lg sm:text-xl font-black py-3 px-4 bg-white border-2 border-sky-300 rounded-2xl text-sky-950 focus:border-amber-400 focus:outline-hidden shadow-xs"
            placeholder="Tulis namamu..."
            maxLength={16}
          />
        </div>

        {/* Age picker */}
        <div className="mb-5 text-center">
          <label className="block text-xs font-bold text-sky-900 mb-2">
            Berapa usiamu sekarang?
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[3, 4, 5, 6].map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => handleAgeChange(a)}
                className={`py-3 rounded-2xl border-3 font-fredoka font-black text-lg transition-transform cursor-pointer ${
                  age === a
                    ? 'bg-amber-400 border-amber-500 text-amber-950 scale-105 shadow-md'
                    : 'bg-white border-sky-200 text-sky-800 hover:bg-sky-100'
                }`}
              >
                {a} Th
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Level Choice */}
        <div className="mb-5 text-center">
          <label className="block text-xs font-bold text-sky-900 mb-2">
            Tingkat Kesulitan Belajar:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'EASY' as const, label: 'Mudah', emoji: '🌱', desc: 'Usia 3 Th' },
              { id: 'MEDIUM' as const, label: 'Menengah', emoji: '⭐', desc: 'Usia 4-5 Th' },
              { id: 'HARD' as const, label: 'Sulit', emoji: '🏆', desc: 'Usia 6 Th' },
            ].map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  setDifficulty(d.id);
                  sound.playPop();
                }}
                className={`p-2 rounded-2xl border-2 flex flex-col items-center gap-0.5 cursor-pointer transition-transform ${
                  difficulty === d.id
                    ? 'bg-amber-100 border-amber-500 text-amber-950 font-black shadow-sm scale-102'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="text-xl">{d.emoji}</span>
                <span className="text-xs font-bold">{d.label}</span>
                <span className="text-[10px] text-slate-400">{d.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Avatar Buddy */}
        <div className="mb-6 text-center">
          <label className="block text-xs font-bold text-sky-900 mb-2">
            Pilih Sahabat Favoritmu:
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {AVATARS.map((av) => (
              <button
                key={av.id}
                type="button"
                onClick={() => {
                  setAvatar(av.id);
                  sound.playPop();
                  sound.speak(av.name);
                }}
                className={`p-2.5 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  avatar === av.id
                    ? 'bg-white border-amber-400 shadow-md scale-105'
                    : 'bg-white/60 border-slate-200 hover:bg-white'
                }`}
              >
                <span className="text-3xl">{av.emoji}</span>
                <span className="text-[11px] font-bold text-slate-800 truncate max-w-full">
                  {av.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSave}
          className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-base rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform"
        >
          <Check className="w-5 h-5" />
          <span>Simpan &amp; Mulai Petualangan!</span>
        </button>
      </div>
    </div>
  );
};
