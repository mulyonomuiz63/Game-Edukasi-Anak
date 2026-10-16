/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenType, ChildProfile, LearningStats, ParentSettings } from './types/game';
import { sound } from './utils/audio';
import { HeaderNav } from './components/HeaderNav';
import { SplashScreen } from './components/SplashScreen';
import { WorldMap } from './components/WorldMap';
import { AbcForestGame } from './components/games/AbcForestGame';
import { NumberIslandGame } from './components/games/NumberIslandGame';
import { ShapeGardenGame } from './components/games/ShapeGardenGame';
import { EmotionAdventureGame } from './components/games/EmotionAdventureGame';
import { CelebrationModal } from './components/CelebrationModal';
import { StickerAlbumModal } from './components/StickerAlbumModal';
import { ParentDashboardModal } from './components/ParentDashboardModal';
import { ChildProfileModal } from './components/ChildProfileModal';
import { BreakReminderModal } from './components/BreakReminderModal';

const DEFAULT_PROFILE: ChildProfile = {
  name: 'Budi Ceria',
  age: 4,
  avatar: 'kiko',
  favoriteColor: '#F59E0B',
  difficulty: 'MEDIUM',
};

const DEFAULT_STATS: LearningStats = {
  lettersLearned: ['A', 'B', 'C'],
  numbersLearned: [1, 2, 3],
  shapesLearned: ['Lingkaran'],
  colorsLearned: ['Merah', 'Kuning'],
  emotionsExplored: ['Senang'],
  totalActivitiesCompleted: 5,
  totalPlayMinutes: 12,
  starsCount: 8,
  unlockedStickers: ['lion', 'elephant', 'panda', 'cat', 'monkey', 'penguin'],
};

const DEFAULT_SETTINGS: ParentSettings = {
  timeLimitMinutes: 30,
  soundVolume: 1,
  voiceGuidanceEnabled: true,
  backgroundMusicEnabled: true,
};

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('SPLASH');

  // Stored state with local storage hydration
  const [profile, setProfile] = useState<ChildProfile>(() => {
    try {
      const saved = localStorage.getItem('kiko_kiki_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.difficulty) {
          parsed.difficulty = parsed.age <= 3 ? 'EASY' : parsed.age >= 6 ? 'HARD' : 'MEDIUM';
        }
        return parsed;
      }
      return DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [stats, setStats] = useState<LearningStats>(() => {
    try {
      const saved = localStorage.getItem('kiko_kiki_stats');
      return saved ? JSON.parse(saved) : DEFAULT_STATS;
    } catch {
      return DEFAULT_STATS;
    }
  });

  const [settings, setSettings] = useState<ParentSettings>(() => {
    try {
      const saved = localStorage.getItem('kiko_kiki_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [isMuted, setIsMuted] = useState(sound.isMuted);

  // Modals
  const [isStickersOpen, setIsStickersOpen] = useState(false);
  const [isParentGateOpen, setIsParentGateOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isBreakReminderOpen, setIsBreakReminderOpen] = useState(false);

  // Celebration state
  const [celebration, setCelebration] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    earnedStars: number;
  }>({
    isOpen: false,
    title: 'Hebat Sekali!',
    message: 'Kamu menyelesaikan petualangan ini dengan luar biasa!',
    earnedStars: 1,
  });

  // Screen-time session counter (in seconds)
  const [sessionSeconds, setSessionSeconds] = useState(0);

  // Save to local storage on changes
  useEffect(() => {
    try {
      localStorage.setItem('kiko_kiki_profile', JSON.stringify(profile));
    } catch {}
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('kiko_kiki_stats', JSON.stringify(stats));
    } catch {}
  }, [stats]);

  useEffect(() => {
    try {
      localStorage.setItem('kiko_kiki_settings', JSON.stringify(settings));
    } catch {}
  }, [settings]);

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds((prev) => {
        const next = prev + 1;
        // Check if reaches screen time limit
        if (settings.timeLimitMinutes > 0 && next === settings.timeLimitMinutes * 60) {
          setIsBreakReminderOpen(true);
          sound.speak('Waktunya istirahat mata dulu ya, teman pintar!');
        }
        return next;
      });

      // Update total play minutes every minute
      setStats((prev) => ({
        ...prev,
        totalPlayMinutes: prev.totalPlayMinutes + 1 / 60,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [settings.timeLimitMinutes]);

  // Audio mute toggle
  const handleToggleMute = () => {
    const newState = sound.toggleMute();
    setIsMuted(newState);
  };

  // Difficulty change handler
  const handleDifficultyChange = (diff: import('./types/game').DifficultyLevel) => {
    setProfile((prev) => ({
      ...prev,
      difficulty: diff,
    }));
  };

  const activeDifficulty = profile.difficulty || 'MEDIUM';

  // Award stars and update learning progress
  const awardActivity = (type: 'letter' | 'number' | 'shape' | 'color' | 'emotion', val: string | number) => {
    sound.playSparkle();
    setStats((prev) => {
      const newStars = prev.starsCount + 1;
      const updatedLetters = type === 'letter' && typeof val === 'string' && !prev.lettersLearned.includes(val)
        ? [...prev.lettersLearned, val]
        : prev.lettersLearned;
      const updatedNumbers = type === 'number' && typeof val === 'number' && !prev.numbersLearned.includes(val)
        ? [...prev.numbersLearned, val]
        : prev.numbersLearned;
      const updatedShapes = type === 'shape' && typeof val === 'string' && !prev.shapesLearned.includes(val)
        ? [...prev.shapesLearned, val]
        : prev.shapesLearned;
      const updatedColors = type === 'color' && typeof val === 'string' && !prev.colorsLearned.includes(val)
        ? [...prev.colorsLearned, val]
        : prev.colorsLearned;
      const updatedEmotions = type === 'emotion' && typeof val === 'string' && !prev.emotionsExplored.includes(val)
        ? [...prev.emotionsExplored, val]
        : prev.emotionsExplored;

      return {
        ...prev,
        starsCount: newStars,
        totalActivitiesCompleted: prev.totalActivitiesCompleted + 1,
        lettersLearned: updatedLetters,
        numbersLearned: updatedNumbers,
        shapesLearned: updatedShapes,
        colorsLearned: updatedColors,
        emotionsExplored: updatedEmotions,
      };
    });

    // Show celebration modal occasionally or on completions
    setCelebration({
      isOpen: true,
      title: 'Hebat Sekali!',
      message: `Kamu mendapatkan 1 Bintang Emas tambahan! Bintangmu sekarang bertambah!`,
      earnedStars: 1,
    });
  };

  const handleResetStats = () => {
    setStats({
      lettersLearned: [],
      numbersLearned: [],
      shapesLearned: [],
      colorsLearned: [],
      emotionsExplored: [],
      totalActivitiesCompleted: 0,
      totalPlayMinutes: 0,
      starsCount: 0,
      unlockedStickers: [],
    });
  };

  return (
    <div className="min-h-screen bg-sky-100 flex flex-col font-fredoka antialiased selection:bg-amber-200 selection:text-amber-900">
      {/* Top HUD Navigation Bar */}
      <HeaderNav
        currentScreen={currentScreen}
        starsCount={stats.starsCount}
        profile={profile}
        difficulty={activeDifficulty}
        onChangeDifficulty={handleDifficultyChange}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onGoHome={() => setCurrentScreen('WORLD_MAP')}
        onOpenStickers={() => setIsStickersOpen(true)}
        onOpenParentGate={() => setIsParentGateOpen(true)}
      />

      {/* Main Screen Router */}
      <main className="flex-1 flex flex-col">
        {currentScreen === 'SPLASH' && (
          <SplashScreen
            profile={profile}
            onStartPlaying={() => setCurrentScreen('WORLD_MAP')}
            onOpenProfile={() => setIsProfileOpen(true)}
            onOpenParentSettings={() => setIsParentGateOpen(true)}
          />
        )}

        {currentScreen === 'WORLD_MAP' && (
          <WorldMap
            stats={stats}
            difficulty={activeDifficulty}
            onChangeDifficulty={handleDifficultyChange}
            onSelectZone={(zone) => setCurrentScreen(zone)}
            onOpenStickers={() => setIsStickersOpen(true)}
          />
        )}

        {currentScreen === 'ZONE_ABC' && (
          <AbcForestGame
            difficulty={activeDifficulty}
            onChangeDifficulty={handleDifficultyChange}
            onActivityComplete={(letter) => awardActivity('letter', letter)}
            onBackToMap={() => setCurrentScreen('WORLD_MAP')}
          />
        )}

        {currentScreen === 'ZONE_NUMBERS' && (
          <NumberIslandGame
            difficulty={activeDifficulty}
            onChangeDifficulty={handleDifficultyChange}
            onActivityComplete={(num) => awardActivity('number', num)}
            onBackToMap={() => setCurrentScreen('WORLD_MAP')}
          />
        )}

        {currentScreen === 'ZONE_SHAPES' && (
          <ShapeGardenGame
            difficulty={activeDifficulty}
            onChangeDifficulty={handleDifficultyChange}
            onActivityComplete={(shape) => awardActivity('shape', shape)}
            onBackToMap={() => setCurrentScreen('WORLD_MAP')}
          />
        )}

        {currentScreen === 'ZONE_EMOTION' && (
          <EmotionAdventureGame
            difficulty={activeDifficulty}
            onChangeDifficulty={handleDifficultyChange}
            onActivityComplete={(em) => awardActivity('emotion', em)}
            onBackToMap={() => setCurrentScreen('WORLD_MAP')}
          />
        )}
      </main>

      {/* Modals */}
      {/* 1. Celebration Modal */}
      <CelebrationModal
        isOpen={celebration.isOpen}
        title={celebration.title}
        message={celebration.message}
        earnedStars={celebration.earnedStars}
        onNextActivity={() => setCelebration((prev) => ({ ...prev, isOpen: false }))}
        onReplay={() => setCelebration((prev) => ({ ...prev, isOpen: false }))}
        onBackToMap={() => {
          setCelebration((prev) => ({ ...prev, isOpen: false }));
          setCurrentScreen('WORLD_MAP');
        }}
      />

      {/* 2. Virtual Sticker Album Modal */}
      <StickerAlbumModal
        isOpen={isStickersOpen}
        starsCount={stats.starsCount}
        unlockedStickers={stats.unlockedStickers}
        onClose={() => setIsStickersOpen(false)}
      />

      {/* 3. Parent Settings & Progress Dashboard Modal */}
      <ParentDashboardModal
        isOpen={isParentGateOpen}
        profile={profile}
        stats={stats}
        settings={settings}
        onClose={() => setIsParentGateOpen(false)}
        onUpdateProfile={(p) => setProfile(p)}
        onUpdateSettings={(s) => setSettings(s)}
        onResetStats={handleResetStats}
      />

      {/* 4. Child Profile Modal */}
      <ChildProfileModal
        isOpen={isProfileOpen}
        profile={profile}
        onClose={() => setIsProfileOpen(false)}
        onSaveProfile={(p) => setProfile(p)}
      />

      {/* 5. Screen Time Break Reminder Modal */}
      <BreakReminderModal
        isOpen={isBreakReminderOpen}
        onExtend={() => {
          // Extend session by 5 minutes
          setSessionSeconds((prev) => Math.max(0, prev - 300));
          setIsBreakReminderOpen(false);
        }}
        onTakeBreak={() => {
          setIsBreakReminderOpen(false);
          setCurrentScreen('SPLASH');
        }}
      />
    </div>
  );
}
