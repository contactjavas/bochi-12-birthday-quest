import { createSignal, For, Show } from 'solid-js';
import { sound } from '../utils/sound';
import { completeStage } from '../stores/gameState';

interface ICrystalOption {
  id: string;
  label: string;
  formula: string;
  subtext: string;
  isCorrect: boolean;
  explanation: string;
}

export function Game4Exponential() {
  const [selectedId, setSelectedId] = createSignal<string | null>(null);
  const [feedback, setFeedback] = createSignal<string>('');
  const [showHint, setShowHint] = createSignal(false);

  const crystals: ICrystalOption[] = [
    {
      id: 'A',
      label: 'Kristal A',
      formula: '2⁷²',
      subtext: '4 × 2⁷⁰ muatan energi',
      isCorrect: true,
      explanation: 'Benar! 2⁷² = 2² × 2⁷⁰ = 4 × 2⁷⁰, memiliki muatan terbesar di antara semuanya!',
    },
    {
      id: 'B',
      label: 'Kristal B',
      formula: '2⁷¹ + 2⁷⁰',
      subtext: '3 × 2⁷⁰ muatan energi',
      isCorrect: false,
      explanation: 'Kurang tepat: 2⁷¹ + 2⁷⁰ = (2 × 2⁷⁰) + (1 × 2⁷⁰) = 3 × 2⁷⁰ (lebih kecil dari 4 × 2⁷⁰).',
    },
    {
      id: 'C',
      label: 'Kristal C',
      formula: '2⁶⁹ + 2⁶⁹ + 2⁶⁹ + 2⁶⁹',
      subtext: '2 × 2⁷⁰ muatan energi',
      isCorrect: false,
      explanation: 'Kurang tepat: 4 × 2⁶⁹ = 2² × 2⁶⁹ = 2⁷¹ = 2 × 2⁷⁰.',
    },
    {
      id: 'D',
      label: 'Kristal D',
      formula: '3 × 2⁷⁰',
      subtext: '3 × 2⁷⁰ muatan energi',
      isCorrect: false,
      explanation: 'Kurang tepat: 3 × 2⁷⁰ bernilai sama persis dengan Kristal B, dan lebih kecil dari Kristal A.',
    },
  ];

  function handleSelect(crystal: ICrystalOption) {
    sound.playKeyClick();
    setSelectedId(crystal.id);

    if (crystal.isCorrect) {
      sound.playSuccess();
      setFeedback(crystal.explanation);
      setTimeout(() => {
        completeStage(4);
      }, 1000);
    } else {
      sound.playError();
      setFeedback(crystal.explanation);
    }
  }

  return (
    <div class="max-w-4xl mx-auto flex flex-col items-center">
      {/* Stage Header */}
      <div class="text-center mb-6">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono tracking-widest uppercase mb-2">
          <span>Game 04 // Reaktor Kristal Eksponensial</span>
        </div>
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
          THE POWER CRYSTAL
        </h2>
        <p class="text-gray-400 text-sm max-w-xl mx-auto mt-1">
          Generator butuh kristal inti dengan kapasitas muatan matematika terbesar. Pilih kristal manakah yang memiliki nilai tertinggi!
        </p>
      </div>

      {/* Crystal Cards Grid */}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mb-6">
        <For each={crystals}>
          {crystal => (
            <button
              onClick={() => handleSelect(crystal)}
              class={`p-6 rounded-xl border flex flex-col items-center text-center transition-all group transform hover:-translate-y-1 ${
                selectedId() === crystal.id
                  ? crystal.isCorrect
                    ? 'border-cyber-green bg-cyber-green/10 shadow-[0_0_20px_rgba(0,255,102,0.3)]'
                    : 'border-cyber-red bg-cyber-red/10 shadow-[0_0_20px_rgba(255,51,102,0.3)]'
                  : 'border-cyber-border bg-[#111726]/90 hover:border-cyber-cyan hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]'
              }`}
            >
              {/* Crystal Graphic SVG */}
              <div class="w-16 h-16 mb-4 relative flex items-center justify-center">
                <svg viewBox="0 0 100 100" class="w-full h-full filter drop-shadow">
                  <polygon
                    points="50,10 85,35 68,90 32,90 15,35"
                    fill="none"
                    stroke={selectedId() === crystal.id ? (crystal.isCorrect ? '#00ff66' : '#ff3366') : '#00e5ff'}
                    stroke-width="3"
                    class="group-hover:fill-cyan-950/40 transition-colors"
                  />
                  <polygon
                    points="50,10 68,90 32,90"
                    fill="none"
                    stroke={selectedId() === crystal.id ? (crystal.isCorrect ? '#00ff66' : '#ff3366') : '#00e5ff'}
                    stroke-width="1.5"
                    stroke-dasharray="3,3"
                  />
                  <circle cx="50" cy="50" r="8" fill="#38bdf8" class="animate-ping opacity-30" />
                </svg>
                <span class="absolute font-mono font-bold text-xs text-white">{crystal.id}</span>
              </div>

              <span class="font-mono text-xs text-gray-400 mb-1">{crystal.label}</span>
              <span class="text-2xl font-mono font-bold text-white tracking-wider my-1 group-hover:text-cyber-cyan transition-colors">
                {crystal.formula}
              </span>
            </button>
          )}
        </For>
      </div>

      {/* Hint & Feedback Box */}
      <div class="w-full max-w-2xl flex flex-col gap-3">
        <div class="flex justify-between items-center text-xs font-mono">
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              setShowHint(!showHint());
            }}
            class="text-cyber-cyan hover:underline"
          >
            💡 {showHint() ? 'Tutup Petunjuk' : 'Butuh Petunjuk Penyederhanaan?'}
          </button>
          <span class="text-gray-500 font-mono">Tip: Ubah semua ke basis (2⁷⁰)</span>
        </div>

        <Show when={showHint()}>
          <div class="p-4 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono leading-relaxed">
            <p>Cobalah menyamakan semua pangkat dengan patokan <strong>2⁷⁰</strong>:</p>
            <p class="mt-1">• 2⁷² = 2² × 2⁷⁰ = 4 × 2⁷⁰</p>
            <p>• 2⁷¹ + 2⁷⁰ = (2 × 2⁷⁰) + (1 × 2⁷⁰) = 3 × 2⁷⁰</p>
            <p>• 4 × 2⁶⁹ = 2² × 2⁶⁹ = 2⁷¹ = 2 × 2⁷⁰</p>
          </div>
        </Show>

        <Show when={feedback()}>
          <div class={`p-4 rounded-lg text-xs font-mono text-center leading-relaxed ${
            selectedId() === 'A'
              ? 'bg-cyber-green/10 border border-cyber-green/30 text-cyber-green'
              : 'bg-cyber-red/10 border border-cyber-red/30 text-cyber-red'
          }`}>
            {feedback()}
          </div>
        </Show>
      </div>
    </div>
  );
}
