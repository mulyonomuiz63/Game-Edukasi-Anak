import React, { useState } from 'react';
import { Check, ArrowRight, RotateCcw, Palette } from 'lucide-react';
import { sound } from '../../utils/audio';
import { MascotSvg } from '../MascotSvg';

interface ShapeGardenGameProps {
  onActivityComplete: (item: string) => void;
  onBackToMap: () => void;
}

interface ShapeItem {
  id: string;
  name: string;
  svgPath: string;
  color: string;
  borderColor: string;
  hint: string;
}

const SHAPES: ShapeItem[] = [
  {
    id: 'circle',
    name: 'Lingkaran',
    svgPath: 'circle',
    color: 'bg-rose-500',
    borderColor: 'border-rose-300',
    hint: 'Bentuk bulat seperti koin dan matahari!',
  },
  {
    id: 'triangle',
    name: 'Segitiga',
    svgPath: 'triangle',
    color: 'bg-amber-400',
    borderColor: 'border-amber-300',
    hint: 'Punya 3 sudut lancip seperti atap rumah!',
  },
  {
    id: 'square',
    name: 'Persegi',
    svgPath: 'square',
    color: 'bg-sky-500',
    borderColor: 'border-sky-300',
    hint: 'Punya 4 sisi sama panjang seperti jendela!',
  },
  {
    id: 'star',
    name: 'Bintang',
    svgPath: 'star',
    color: 'bg-yellow-400',
    borderColor: 'border-yellow-200',
    hint: 'Bercahaya indah di langit malam!',
  },
  {
    id: 'heart',
    name: 'Hati',
    svgPath: 'heart',
    color: 'bg-pink-500',
    borderColor: 'border-pink-300',
    hint: 'Tanda cinta dan kasih sayang!',
  },
];

const COLOR_BUCKETS = [
  {
    id: 'red',
    name: 'Merah',
    bg: 'bg-rose-500',
    border: 'border-rose-400',
    text: 'text-rose-900',
    items: ['🍎 Apel', '🍓 Stroberi', '🌹 Mawar', '🚗 Mobil'],
  },
  {
    id: 'blue',
    name: 'Biru',
    bg: 'bg-sky-500',
    border: 'border-sky-400',
    text: 'text-sky-900',
    items: ['🌊 Laut', '🐳 Paus', '🫐 Bluberi', '🧢 Topi'],
  },
  {
    id: 'yellow',
    name: 'Kuning',
    bg: 'bg-amber-400',
    border: 'border-amber-300',
    text: 'text-amber-900',
    items: ['🍌 Pisang', '☀️ Matahari', '🌻 Bunga', '🧀 Keju'],
  },
  {
    id: 'green',
    name: 'Hijau',
    bg: 'bg-emerald-500',
    border: 'border-emerald-400',
    text: 'text-emerald-900',
    items: ['🍃 Daun', '🐸 Katak', '🥒 Timun', '🥑 Alpukat'],
  },
];

export const ShapeGardenGame: React.FC<ShapeGardenGameProps> = ({
  onActivityComplete,
  onBackToMap,
}) => {
  const [activeTab, setActiveTab] = useState<'MATCH' | 'COLORS' | 'TOWER'>('MATCH');

  // Match shape state
  const [matchedShapes, setMatchedShapes] = useState<string[]>([]);
  const [selectedShapeToPlace, setSelectedShapeToPlace] = useState<ShapeItem | null>(null);

  // Color basket sort state
  const [activeColorBucket, setActiveColorBucket] = useState(COLOR_BUCKETS[0]);
  const [sortedItems, setSortedItems] = useState<{ [key: string]: string[] }>({
    red: [],
    blue: [],
    yellow: [],
    green: [],
  });

  // Tower builder state
  const [towerBlocks, setTowerBlocks] = useState<{ color: string; width: string; label: string }[]>([
    { color: 'bg-emerald-500', width: 'w-48', label: 'Pondasi Luas' },
  ]);

  // Handle shape slot click
  const handlePlaceInSlot = (targetShapeId: string) => {
    if (!selectedShapeToPlace) {
      sound.speak('Pilih bentuk di bawah dulu ya teman!');
      return;
    }

    if (selectedShapeToPlace.id === targetShapeId) {
      sound.playSuccessChime();
      sound.speak(`Tepat sekali! Bentuk ${selectedShapeToPlace.name} pas pada bingkainya!`);
      const updated = [...matchedShapes, targetShapeId];
      setMatchedShapes(updated);
      setSelectedShapeToPlace(null);
      onActivityComplete(selectedShapeToPlace.name);
    } else {
      sound.playBoing();
      sound.speak(`Ups, ini bukan bingkai ${selectedShapeToPlace.name}. Coba cari bingkai yang cocok!`);
    }
  };

  // Add block to tower
  const handleAddTowerBlock = (block: { color: string; width: string; label: string }) => {
    if (towerBlocks.length >= 7) {
      sound.playFanfare();
      sound.speak('Wah hebat! Menaramu sudah sangat tinggi dan kokoh!');
      return;
    }
    sound.playPop();
    setTowerBlocks([block, ...towerBlocks]);
    sound.speak('Tambah balok!');
    onActivityComplete('Menara Bentuk');
  };

  const renderShapeIcon = (shapeId: string, className = 'w-12 h-12') => {
    switch (shapeId) {
      case 'circle':
        return <div className={`rounded-full ${className}`} />;
      case 'square':
        return <div className={`rounded-xl ${className}`} />;
      case 'triangle':
        return (
          <div
            className={className}
            style={{
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }}
          />
        );
      case 'star':
        return (
          <div
            className={className}
            style={{
              clipPath:
                'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            }}
          />
        );
      case 'heart':
        return <span className="text-4xl">❤️</span>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-3 sm:p-6 flex flex-col items-center">
      {/* Zone Header Banner */}
      <div className="w-full bg-linear-to-r from-purple-500 via-pink-500 to-rose-500 rounded-3xl p-4 sm:p-5 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl shadow-inner">
            🎨
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-fredoka font-black">
              Taman Bentuk &amp; Warna
            </h2>
            <p className="text-purple-100 text-xs sm:text-sm font-semibold">
              Kiki dan Kiko mengajakmu memasangkan bingkai geometri dan memilah warna-warni!
            </p>
          </div>
        </div>

        {/* Mascot Mini View */}
        <MascotSvg
          type="kiki"
          size="sm"
          showSpeech
          speechText="Yuk kenali bentuknya!"
        />
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-purple-100/80 rounded-2xl border border-purple-300 mb-6 max-w-md w-full justify-center">
        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('MATCH');
          }}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 text-center ${
            activeTab === 'MATCH'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-purple-900 hover:bg-purple-200'
          }`}
        >
          🔷 Pasang Bentuk
        </button>
        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('COLORS');
          }}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 text-center ${
            activeTab === 'COLORS'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-purple-900 hover:bg-purple-200'
          }`}
        >
          🧺 Pilah Warna
        </button>
        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('TOWER');
          }}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 text-center ${
            activeTab === 'TOWER'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-purple-900 hover:bg-purple-200'
          }`}
        >
          🏰 Menara Balok
        </button>
      </div>

      {/* TAB 1: MATCH GEOMETRIC SHAPES */}
      {activeTab === 'MATCH' && (
        <div className="w-full max-w-3xl bg-white/95 border-3 border-purple-300 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col items-center text-center">
          <div className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 mb-2">
            Pilih bentuk di bawah, lalu ketuk bingkai kayu yang cocok!
          </div>

          <h3 className="text-2xl font-black text-slate-800 mt-2 mb-6">
            Papan Bingkai Geometri
          </h3>

          {/* Wooden Puzzle Board Slots */}
          <div className="w-full grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4 p-5 bg-amber-100 rounded-3xl border-4 border-amber-300 shadow-inner">
            {SHAPES.map((shape) => {
              const isMatched = matchedShapes.includes(shape.id);
              return (
                <div
                  key={shape.id}
                  onClick={() => handlePlaceInSlot(shape.id)}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 border-3 cursor-pointer transition-all ${
                    isMatched
                      ? 'bg-emerald-100 border-emerald-400 shadow-md scale-102'
                      : 'bg-amber-200/70 border-dashed border-amber-400 hover:bg-amber-300/60'
                  }`}
                >
                  {isMatched ? (
                    <div className="flex flex-col items-center">
                      <div className={shape.color + ' p-2 rounded-xl text-white'}>
                        {renderShapeIcon(shape.id, 'w-10 h-10 bg-white/90')}
                      </div>
                      <span className="text-xs font-black text-emerald-800 mt-1">
                        {shape.name}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center opacity-40">
                      {renderShapeIcon(shape.id, 'w-10 h-10 bg-amber-800')}
                      <span className="text-[10px] font-bold text-amber-900 mt-1">
                        {shape.name}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Available Shapes to Pick */}
          <div className="w-full mt-6">
            <p className="text-xs font-bold text-slate-600 mb-3">
              {selectedShapeToPlace
                ? `Bentuk dipilih: ${selectedShapeToPlace.name}! Sekarang ketuk bingkainya di atas!`
                : 'Ketuk salah satu bentuk untuk dipilih:'}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {SHAPES.filter((s) => !matchedShapes.includes(s.id)).map((s) => {
                const isSelected = selectedShapeToPlace?.id === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedShapeToPlace(s);
                      sound.playPop();
                      sound.speak(s.name);
                    }}
                    className={`p-3 rounded-2xl border-3 flex flex-col items-center gap-1 shadow-sm transition-transform cursor-pointer ${
                      isSelected
                        ? 'border-purple-600 bg-purple-100 scale-110 shadow-lg'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className={`${s.color} p-2 rounded-xl text-white`}>
                      {renderShapeIcon(s.id, 'w-10 h-10 bg-white')}
                    </div>
                    <span className="text-xs font-black text-slate-700">{s.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {matchedShapes.length === SHAPES.length && (
            <div className="mt-6 flex flex-col items-center gap-2 animate-in zoom-in-95">
              <div className="flex items-center gap-2 text-emerald-600 font-black text-lg">
                <Check className="w-6 h-6" />
                <span>Semua Bingkai Berhasil Dipasangkan!</span>
              </div>
              <button
                onClick={() => {
                  setMatchedShapes([]);
                  sound.playPop();
                }}
                className="py-2.5 px-5 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer"
              >
                Pasang Ulang 🔄
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: COLOR BUCKET SORTING */}
      {activeTab === 'COLORS' && (
        <div className="w-full max-w-2xl bg-white/95 border-3 border-purple-300 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col items-center text-center">
          <div className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 mb-2">
            Pilih keranjang warna dan masukkan benda yang cocok!
          </div>

          <h3 className="text-2xl font-black text-slate-800 mt-2 mb-4">
            Keranjang Warna Ceria
          </h3>

          {/* Color Baskets Selectors */}
          <div className="flex justify-center gap-2 sm:gap-4 mb-6">
            {COLOR_BUCKETS.map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  setActiveColorBucket(b);
                  sound.playPop();
                  sound.speak(`Warna ${b.name}!`);
                }}
                className={`py-2 px-3 sm:px-4 rounded-2xl border-3 flex items-center gap-2 cursor-pointer transition-transform ${
                  activeColorBucket.id === b.id
                    ? `${b.bg} text-white border-white scale-105 shadow-md`
                    : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                }`}
              >
                <div className={`w-4 h-4 rounded-full ${b.bg} border border-white`} />
                <span className="font-bold text-xs sm:text-sm">{b.name}</span>
              </button>
            ))}
          </div>

          {/* Active Bucket & Items Inside */}
          <div
            className={`w-full max-w-md p-6 rounded-3xl border-4 ${activeColorBucket.border} ${activeColorBucket.bg}/15 shadow-inner flex flex-col items-center`}
          >
            <div className="text-4xl mb-2">🧺</div>
            <h4 className="text-xl font-black text-slate-800">
              Keranjang Benda Warna {activeColorBucket.name}
            </h4>

            {/* Items grid */}
            <div className="grid grid-cols-2 gap-3 mt-4 w-full">
              {activeColorBucket.items.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playPop();
                    sound.speak(`${item} berwarna ${activeColorBucket.name}!`);
                    onActivityComplete(activeColorBucket.name);
                  }}
                  className="py-3 px-3 bg-white border-2 border-slate-200 hover:border-purple-400 rounded-2xl shadow-xs text-sm font-bold text-slate-800 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TOWER BUILDING BLOCKS */}
      {activeTab === 'TOWER' && (
        <div className="w-full max-w-2xl bg-white/95 border-3 border-purple-300 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col items-center text-center">
          <div className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 mb-2">
            Susun balok warna untuk membangun menara istana yang tinggi!
          </div>

          <h3 className="text-2xl font-black text-slate-800 mt-2 mb-4">
            Menara Bentuk Ajaib
          </h3>

          {/* The Tower Stack View */}
          <div className="w-full max-w-xs h-64 bg-slate-50 border-2 border-dashed border-purple-200 rounded-2xl p-4 flex flex-col justify-end items-center gap-1.5 shadow-inner my-3">
            {towerBlocks.map((blk, i) => (
              <div
                key={i}
                className={`${blk.width} h-8 ${blk.color} rounded-xl border-2 border-white shadow-xs flex items-center justify-center text-white text-[11px] font-black animate-in zoom-in-75`}
              >
                {blk.label}
              </div>
            ))}
          </div>

          {/* Block Options to Add */}
          <div className="w-full mt-4">
            <p className="text-xs font-bold text-slate-600 mb-2">
              Pilih balok untuk ditambahkan ke menara:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() =>
                  handleAddTowerBlock({ color: 'bg-rose-500', width: 'w-40', label: 'Persegi Merah' })
                }
                className="py-2 px-3 bg-rose-500 text-white font-bold text-xs rounded-xl shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
              >
                + Balok Merah
              </button>
              <button
                onClick={() =>
                  handleAddTowerBlock({ color: 'bg-sky-500', width: 'w-32', label: 'Balok Biru' })
                }
                className="py-2 px-3 bg-sky-500 text-white font-bold text-xs rounded-xl shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
              >
                + Balok Biru
              </button>
              <button
                onClick={() =>
                  handleAddTowerBlock({ color: 'bg-amber-400', width: 'w-24', label: 'Segitiga Kuning' })
                }
                className="py-2 px-3 bg-amber-400 text-amber-950 font-bold text-xs rounded-xl shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
              >
                + Puncak Segitiga
              </button>
              <button
                onClick={() => {
                  setTowerBlocks([{ color: 'bg-emerald-500', width: 'w-48', label: 'Pondasi Luas' }]);
                  sound.playPop();
                }}
                className="py-2 px-3 bg-slate-200 text-slate-700 font-bold text-xs rounded-xl shadow-xs hover:bg-slate-300 cursor-pointer"
              >
                Ulangi ↺
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
