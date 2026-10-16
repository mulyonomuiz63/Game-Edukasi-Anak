import React, { useState, useEffect } from 'react';
import { X, Lock, ShieldCheck, Clock, Award, BarChart2, User, Volume2, Check } from 'lucide-react';
import { sound } from '../utils/audio';
import { ChildProfile, DifficultyLevel, LearningStats, ParentSettings } from '../types/game';

interface ParentDashboardModalProps {
  isOpen: boolean;
  profile: ChildProfile;
  stats: LearningStats;
  settings: ParentSettings;
  onClose: () => void;
  onUpdateProfile: (profile: ChildProfile) => void;
  onUpdateSettings: (settings: ParentSettings) => void;
  onResetStats: () => void;
}

export const ParentDashboardModal: React.FC<ParentDashboardModalProps> = ({
  isOpen,
  profile,
  stats,
  settings,
  onClose,
  onUpdateProfile,
  onUpdateSettings,
  onResetStats,
}) => {
  // Gate state: random adult math question (e.g., 7 + 6 = 13)
  const [numA, setNumA] = useState(7);
  const [numB, setNumB] = useState(6);
  const [parentAnswer, setParentAnswer] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Editable profile & settings form states
  const [childName, setChildName] = useState(profile.name);
  const [childAge, setChildAge] = useState(profile.age);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(profile.difficulty || 'MEDIUM');
  const [timeLimit, setTimeLimit] = useState(settings.timeLimitMinutes);
  const [voiceEnabled, setVoiceEnabled] = useState(settings.voiceGuidanceEnabled);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Generate fresh math challenge
      const a = Math.floor(Math.random() * 8) + 3;
      const b = Math.floor(Math.random() * 8) + 2;
      setNumA(a);
      setNumB(b);
      setParentAnswer('');
      setIsUnlocked(false);
      setErrorMsg('');
      setSaveSuccess(false);
      setChildName(profile.name);
      setChildAge(profile.age);
      setDifficulty(profile.difficulty || 'MEDIUM');
      setTimeLimit(settings.timeLimitMinutes);
      setVoiceEnabled(settings.voiceGuidanceEnabled);
    }
  }, [isOpen, profile, settings]);

  if (!isOpen) return null;

  const handleVerifyGate = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(parentAnswer, 10) === numA + bSum(numA, numB)) {
      setIsUnlocked(true);
      setErrorMsg('');
      sound.playSuccessChime();
    } else {
      setErrorMsg('Jawaban salah. Fitur ini khusus orang tua.');
      sound.playBoing();
    }
  };

  function bSum(a: number, b: number) {
    return b;
  }

  const handleSaveSettings = () => {
    onUpdateProfile({
      ...profile,
      name: childName.trim() || 'Si Kecil',
      age: childAge,
      difficulty,
    });
    onUpdateSettings({
      ...settings,
      timeLimitMinutes: timeLimit,
      voiceGuidanceEnabled: voiceEnabled,
    });
    sound.isVoiceEnabled = voiceEnabled;
    setSaveSuccess(true);
    sound.playSuccessChime();
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white border-4 border-amber-300 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-amber-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-400 text-amber-950 rounded-2xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-fredoka font-black text-slate-800">
                Dashboard Orang Tua
              </h3>
              <p className="text-xs text-slate-600 font-semibold">
                Pantau progres belajar dan atur batas waktu bermain anak
              </p>
            </div>
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

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {!isUnlocked ? (
            // ADULT VERIFICATION GATE
            <div className="max-w-md mx-auto text-center py-6">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-slate-800 mb-1">
                Kunci Keamanan Orang Tua
              </h4>
              <p className="text-xs text-slate-600 mb-6">
                Untuk membuka dashboard, mohon selesaikan soal matematika sederhana berikut:
              </p>

              <form onSubmit={handleVerifyGate} className="flex flex-col items-center gap-4">
                <div className="text-3xl font-mono font-black text-amber-900 bg-amber-50 px-6 py-3 rounded-2xl border-2 border-amber-300 shadow-inner">
                  {numA} + {numB} = ?
                </div>

                <div className="w-full max-w-xs">
                  <input
                    type="number"
                    value={parentAnswer}
                    onChange={(e) => setParentAnswer(e.target.value)}
                    placeholder="Ketik jawaban di sini"
                    className="w-full text-center text-xl font-bold py-3 px-4 border-2 border-slate-300 rounded-2xl focus:border-amber-500 focus:outline-hidden"
                    autoFocus
                  />
                  {errorMsg && (
                    <p className="text-xs text-rose-600 font-bold mt-1.5">{errorMsg}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="py-3 px-8 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-black text-sm rounded-2xl shadow-md cursor-pointer transition-transform"
                >
                  Buka Pengaturan
                </button>
              </form>
            </div>
          ) : (
            // UNLOCKED PARENT DASHBOARD & ANALYTICS
            <div className="space-y-6">
              {/* Learning Progress Summary */}
              <div>
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-emerald-600" />
                  <span>Ringkasan Kemajuan Belajar ({profile.name})</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
                    <span className="text-[10px] text-emerald-700 font-bold block uppercase">
                      Huruf Dikuasai
                    </span>
                    <span className="text-2xl font-black text-emerald-950 font-mono">
                      {stats.lettersLearned.length} / 26
                    </span>
                  </div>

                  <div className="p-3 bg-sky-50 border border-sky-200 rounded-2xl">
                    <span className="text-[10px] text-sky-700 font-bold block uppercase">
                      Angka Dipelajari
                    </span>
                    <span className="text-2xl font-black text-sky-950 font-mono">
                      {stats.numbersLearned.length} / 10
                    </span>
                  </div>

                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-2xl">
                    <span className="text-[10px] text-purple-700 font-bold block uppercase">
                      Bentuk &amp; Warna
                    </span>
                    <span className="text-2xl font-black text-purple-950 font-mono">
                      {stats.shapesLearned.length + stats.colorsLearned.length}
                    </span>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl">
                    <span className="text-[10px] text-amber-700 font-bold block uppercase">
                      Bintang Dikoleksi
                    </span>
                    <span className="text-2xl font-black text-amber-950 font-mono flex items-center gap-1">
                      ⭐ {stats.starsCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Time Management / Screen Time Controls */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <h4 className="text-sm font-black text-slate-800 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Pengaturan Batas Waktu Layar (Screen-Time)</span>
                </h4>
                <p className="text-xs text-slate-600 mb-3">
                  Kiko dan Kiki akan memberi alarm istirahat mata yang ramah saat waktu habis.
                </p>

                <div className="grid grid-cols-4 gap-2">
                  {[0, 15, 30, 45].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => setTimeLimit(mins)}
                      className={`py-2 px-3 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                        timeLimit === mins
                          ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {mins === 0 ? 'Tanpa Batas' : `${mins} Menit`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Child Profile Settings */}
              <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-2xl space-y-4">
                <h4 className="text-sm font-black text-sky-950 flex items-center gap-2">
                  <User className="w-4 h-4 text-sky-600" />
                  <span>Pengaturan Profil Anak</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nama Panggilan Anak:
                    </label>
                    <input
                      type="text"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      className="w-full py-2 px-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:outline-hidden focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Usia Anak:
                    </label>
                    <div className="flex gap-2">
                      {[3, 4, 5, 6].map((age) => (
                        <button
                          key={age}
                          type="button"
                          onClick={() => {
                            setChildAge(age);
                            const autoDiff: DifficultyLevel = age <= 3 ? 'EASY' : age >= 6 ? 'HARD' : 'MEDIUM';
                            setDifficulty(autoDiff);
                          }}
                          className={`flex-1 py-2 text-xs font-bold rounded-xl border cursor-pointer ${
                            childAge === age
                              ? 'bg-sky-500 text-white border-sky-600'
                              : 'bg-white text-slate-700 border-slate-300'
                          }`}
                        >
                          {age} Th
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Difficulty Selector in Parent Settings */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tingkat Kesulitan Permainan:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'EASY' as const, label: 'Mudah', emoji: '🌱', desc: 'Usia 3 Th / Pemula' },
                      { id: 'MEDIUM' as const, label: 'Menengah', emoji: '⭐', desc: 'Usia 4-5 Th / Petualang' },
                      { id: 'HARD' as const, label: 'Sulit', emoji: '🏆', desc: 'Usia 6 Th / Juara Cilik' },
                    ].map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => {
                          setDifficulty(d.id);
                          sound.playPop();
                        }}
                        className={`p-2.5 rounded-2xl border-2 flex flex-col items-center gap-0.5 cursor-pointer transition-transform ${
                          difficulty === d.id
                            ? 'bg-amber-100 border-amber-500 text-amber-950 font-black shadow-xs scale-102'
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

                <div className="flex items-center justify-between pt-2 border-t border-sky-200">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-sky-700" />
                    <span className="text-xs font-bold text-slate-700">
                      Panduan Suara Bahasa Indonesia
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={voiceEnabled}
                    onChange={(e) => setVoiceEnabled(e.target.checked)}
                    className="w-5 h-5 accent-sky-600 rounded-md cursor-pointer"
                  />
                </div>
              </div>

              {/* Save & Reset Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Yakin ingin mereset catatan bintang & stiker si kecil?')) {
                      onResetStats();
                      sound.playPop();
                    }
                  }}
                  className="text-xs text-rose-600 font-bold hover:underline cursor-pointer"
                >
                  Reset Progres Belajar
                </button>

                <div className="flex items-center gap-2">
                  {saveSuccess && (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Tersimpan!
                    </span>
                  )}
                  <button
                    onClick={handleSaveSettings}
                    className="py-2.5 px-6 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold text-sm rounded-2xl shadow-xs cursor-pointer transition-transform"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
