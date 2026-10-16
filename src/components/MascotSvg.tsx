import React, { useState } from 'react';
import { sound } from '../utils/audio';

interface MascotProps {
  type: 'kiko' | 'kiki';
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSpeech?: boolean;
  speechText?: string;
  isDancing?: boolean;
  onClick?: () => void;
}

export const MascotSvg: React.FC<MascotProps> = ({
  type,
  size = 'md',
  showSpeech = false,
  speechText,
  isDancing = false,
  onClick,
}) => {
  const [bouncing, setBouncing] = useState(false);

  const handleClick = () => {
    setBouncing(true);
    sound.playBoing();
    if (type === 'kiko') {
      sound.speak('Halo teman pintar! Aku Kiko si Rubah, senang belajar bersamamu!');
    } else {
      sound.speak('Hai! Aku Kiki si Kelinci! Ayo kita bertualang bersama!');
    }
    setTimeout(() => setBouncing(false), 800);
    if (onClick) onClick();
  };

  const sizeClass = {
    sm: 'w-20 h-24',
    md: 'w-32 h-36',
    lg: 'w-44 h-52',
    hero: 'w-56 h-64 sm:w-64 sm:h-72',
  }[size];

  return (
    <div
      onClick={handleClick}
      className={`relative inline-flex flex-col items-center justify-center cursor-pointer transition-transform select-none ${
        bouncing ? 'scale-110 -translate-y-3' : 'hover:scale-105 active:scale-95'
      } ${isDancing ? 'animate-wiggle-slow' : ''}`}
      role="button"
      tabIndex={0}
      title={type === 'kiko' ? 'Kiko si Rubah' : 'Kiki si Kelinci'}
    >
      {/* Speech bubble */}
      {showSpeech && speechText && (
        <div className="absolute -top-12 z-20 bg-white border-2 border-amber-300 text-amber-900 px-3 py-1.5 rounded-2xl shadow-lg text-xs font-bold whitespace-nowrap animate-bounce flex items-center gap-1.5">
          <span>💬</span>
          <span>{speechText}</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white" />
        </div>
      )}

      {type === 'kiko' ? (
        // KIKO THE ORANGE FOX
        <svg
          viewBox="0 0 200 240"
          className={`${sizeClass} filter drop-shadow-md`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="foxBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
            <linearGradient id="foxWhite" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="100%" stopColor="#FEF3C7" />
            </linearGradient>
            <linearGradient id="backpack" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>

          {/* Bushy Fox Tail with White Tip */}
          <path
            d="M 140 160 C 180 140 210 180 180 210 C 150 230 130 190 135 170 Z"
            fill="url(#foxBody)"
          />
          <path
            d="M 180 190 C 190 198 185 208 175 212 C 165 212 165 198 180 190 Z"
            fill="url(#foxWhite)"
          />

          {/* Blue Backpack Straps & Pack */}
          <rect x="45" y="140" width="30" height="45" rx="10" fill="url(#backpack)" />
          <path d="M 60 140 Q 75 120 90 140" stroke="#0284C7" strokeWidth="6" fill="none" />

          {/* Body */}
          <ellipse cx="100" cy="165" rx="46" ry="50" fill="url(#foxBody)" />
          {/* White Chest Patch */}
          <ellipse cx="100" cy="172" rx="28" ry="32" fill="url(#foxWhite)" />

          {/* Legs & Paws */}
          <ellipse cx="80" cy="216" rx="16" ry="12" fill="#9A3412" />
          <ellipse cx="120" cy="216" rx="16" ry="12" fill="#9A3412" />

          {/* Ears */}
          {/* Left Ear */}
          <polygon points="50,90 30,30 85,60" fill="url(#foxBody)" />
          <polygon points="52,80 40,42 75,64" fill="#FEF08A" />
          {/* Right Ear */}
          <polygon points="150,90 170,30 115,60" fill="url(#foxBody)" />
          <polygon points="148,80 160,42 125,64" fill="#FEF08A" />

          {/* Head */}
          <ellipse cx="100" cy="98" rx="55" ry="46" fill="url(#foxBody)" />

          {/* Cheeks / White fluff */}
          <path
            d="M 50 110 Q 70 140 100 120 Q 130 140 150 110 C 158 98 150 85 100 85 C 50 85 42 98 50 110 Z"
            fill="url(#foxWhite)"
          />

          {/* Big Cartoon Eyes */}
          <ellipse cx="78" cy="92" rx="10" ry="14" fill="#1E293B" />
          <ellipse cx="122" cy="92" rx="10" ry="14" fill="#1E293B" />
          {/* Eye Sparkles */}
          <circle cx="75" cy="88" r="4" fill="#FFFFFF" />
          <circle cx="81" cy="96" r="2" fill="#FFFFFF" />
          <circle cx="119" cy="88" r="4" fill="#FFFFFF" />
          <circle cx="125" cy="96" r="2" fill="#FFFFFF" />

          {/* Cute Nose */}
          <path d="M 94 110 Q 100 114 106 110 Q 100 118 94 110 Z" fill="#0F172A" />

          {/* Happy Mouth */}
          <path d="M 92 120 Q 100 132 108 120" stroke="#0F172A" strokeWidth="3" fill="#DC2626" />

          {/* Rosy Cheeks */}
          <ellipse cx="62" cy="112" rx="8" ry="5" fill="#F43F5E" opacity="0.4" />
          <ellipse cx="138" cy="112" rx="8" ry="5" fill="#F43F5E" opacity="0.4" />

          {/* Front Paws holding a Yellow Pencil */}
          {/* Left Paw */}
          <ellipse cx="65" cy="155" rx="12" ry="10" fill="#9A3412" />
          {/* Right Paw holding yellow pencil */}
          <g transform="rotate(25 130 150)">
            <rect x="125" y="125" width="8" height="35" rx="2" fill="#FBBF24" />
            <polygon points="125,125 129,115 133,125" fill="#F59E0B" />
            <polygon points="127,119 129,115 131,119" fill="#1E293B" />
            <ellipse cx="129" cy="150" rx="12" ry="10" fill="#9A3412" />
          </g>
        </svg>
      ) : (
        // KIKI THE CUTE WHITE RABBIT
        <svg
          viewBox="0 0 200 240"
          className={`${sizeClass} filter drop-shadow-md`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bunnyWhite" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F1F5F9" />
            </linearGradient>
            <linearGradient id="bunnyPink" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FBCFE8" />
              <stop offset="100%" stopColor="#F472B6" />
            </linearGradient>
            <linearGradient id="bookCover" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>

          {/* Long Bunny Ears */}
          {/* Left Ear */}
          <g transform="rotate(-8 65 50)">
            <ellipse cx="65" cy="45" rx="16" ry="42" fill="url(#bunnyWhite)" stroke="#E2E8F0" strokeWidth="2" />
            <ellipse cx="65" cy="45" rx="9" ry="32" fill="url(#bunnyPink)" opacity="0.8" />
          </g>
          {/* Right Ear */}
          <g transform="rotate(10 135 50)">
            <ellipse cx="135" cy="45" rx="16" ry="42" fill="url(#bunnyWhite)" stroke="#E2E8F0" strokeWidth="2" />
            <ellipse cx="135" cy="45" rx="9" ry="32" fill="url(#bunnyPink)" opacity="0.8" />
          </g>

          {/* Fluffy Tail */}
          <circle cx="150" cy="190" r="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />

          {/* Body */}
          <ellipse cx="100" cy="165" rx="44" ry="48" fill="url(#bunnyWhite)" stroke="#E2E8F0" strokeWidth="2" />
          {/* Soft Pink Belly */}
          <ellipse cx="100" cy="172" rx="26" ry="30" fill="#FDF2F8" />

          {/* Feet */}
          <ellipse cx="80" cy="216" rx="17" ry="11" fill="url(#bunnyWhite)" stroke="#E2E8F0" strokeWidth="2" />
          <ellipse cx="120" cy="216" rx="17" ry="11" fill="url(#bunnyWhite)" stroke="#E2E8F0" strokeWidth="2" />

          {/* Head */}
          <circle cx="100" cy="104" r="48" fill="url(#bunnyWhite)" stroke="#E2E8F0" strokeWidth="2" />

          {/* Big Shining Cartoon Eyes */}
          <ellipse cx="80" cy="98" rx="9" ry="13" fill="#1E293B" />
          <ellipse cx="120" cy="98" rx="9" ry="13" fill="#1E293B" />
          {/* Sparkles */}
          <circle cx="77" cy="94" r="4" fill="#FFFFFF" />
          <circle cx="82" cy="102" r="2" fill="#FFFFFF" />
          <circle cx="117" cy="94" r="4" fill="#FFFFFF" />
          <circle cx="122" cy="102" r="2" fill="#FFFFFF" />

          {/* Tiny Pink Nose */}
          <polygon points="96,112 104,112 100,118" fill="#F43F5E" />

          {/* Sweet Bunny Smile */}
          <path d="M 93 120 Q 100 125 107 120" stroke="#0F172A" strokeWidth="2.5" fill="none" />

          {/* Pink Cheeks */}
          <circle cx="68" cy="114" r="8" fill="#FB7185" opacity="0.5" />
          <circle cx="132" cy="114" r="8" fill="#FB7185" opacity="0.5" />

          {/* Whiskers */}
          <line x1="55" y1="110" x2="40" y2="108" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="55" y1="116" x2="38" y2="120" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="145" y1="110" x2="160" y2="108" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="145" y1="116" x2="162" y2="120" stroke="#CBD5E1" strokeWidth="2" />

          {/* Paws holding ABC Storybook */}
          <g transform="translate(74, 142)">
            <rect x="0" y="0" width="52" height="38" rx="5" fill="url(#bookCover)" />
            <rect x="3" y="3" width="46" height="32" rx="3" fill="#FEF9C3" />
            <text x="14" y="24" fontSize="16" fontWeight="bold" fill="#7C3AED" fontFamily="Fredoka">
              ABC
            </text>
          </g>
          {/* Left and Right Paws on book */}
          <circle cx="74" cy="160" r="10" fill="url(#bunnyWhite)" stroke="#E2E8F0" strokeWidth="2" />
          <circle cx="126" cy="160" r="10" fill="url(#bunnyWhite)" stroke="#E2E8F0" strokeWidth="2" />
        </svg>
      )}
    </div>
  );
};
