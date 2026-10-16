export type ScreenType =
  | 'SPLASH'
  | 'WORLD_MAP'
  | 'ZONE_ABC'
  | 'ZONE_NUMBERS'
  | 'ZONE_SHAPES'
  | 'ZONE_EMOTION'
  | 'STICKER_ALBUM';

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';

export interface ChildProfile {
  name: string;
  age: number; // 3, 4, 5, or 6
  avatar: 'kiko' | 'kiki' | 'bear' | 'cat' | 'lion' | 'panda';
  favoriteColor: string;
  difficulty: DifficultyLevel;
}

export interface LearningStats {
  lettersLearned: string[];
  numbersLearned: number[];
  shapesLearned: string[];
  colorsLearned: string[];
  emotionsExplored: string[];
  totalActivitiesCompleted: number;
  totalPlayMinutes: number;
  starsCount: number;
  unlockedStickers: string[];
}

export interface ParentSettings {
  timeLimitMinutes: number; // 0 for unlimited, 15, 30, 45, 60
  soundVolume: number;
  voiceGuidanceEnabled: boolean;
  backgroundMusicEnabled: boolean;
}

export interface StickerItem {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: 'animals' | 'shapes' | 'numbers' | 'adventure';
  requiredStars: number;
}
