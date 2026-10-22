import { createSignal, Show, For } from 'solid-js';
import { sound } from '../utils/sound';
import { completeStage } from '../stores/gameState';

export function Game7Organic() {
  const [userInput, setUserInput] = createSignal('');
  const [errorMessage, setErrorMessage] = createSignal('');
  const [showHint, setShowHint] = createSignal(false);
  const [activeRing, setActiveRing] = createSignal<number | null>(null);

  const acceptedAnswers = [
    'pohon',
    'lingkaran pohon',
    'lingkaran tahun',
    'batang pohon',
    'kayu',
    'tree',
    'tree rings',
    'lingkaran usia',
    'lingkaran usia pohon',
  ];

  function handleSubmit(e?: Event) {
    if (e) e.preventDefault();
    sound.playKeyClick();

    const cleanInput = userInput().trim().toLowerCase();
    const matched = acceptedAnswers.some(ans => cleanInput.includes(ans) || cleanInput === ans);

    if (matched) {
      sound.playSuccess();
      setErrorMessage('');
      setTimeout(() => {
        completeStage(7);
      }, 1000);
    } else {
      sound.playError();
      setErrorMessage('Jawaban belum tepat. Coba pikirkan hal alami di alam yang bertambah 1 lingkaran setiap tahunnya!');
    }
  }

  return (
    <div class="max-w-4xl mx-auto flex flex-col items-center">
      {/* Stage Header */}
      <div class="text-center mb-6">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-2">
          <span>Game 07 // Gerbang Siluet Alami</span>
        </div>
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
          THE ORGANIC SILHOUETTE
        </h2>
        <p class="text-gray-400 text-sm max-w-xl mx-auto mt-1">
          Bentuk terakhir ini tidak bersudut kaku, melainkan tumbuh bebas mengikuti irama alam dan waktu. Pecahkan teka-tekinya untuk membuka Relic ke-7!
        </p>
      </div>

      <div class="w-full max-w-xl bg-[#111726]/90 border border-cyber-border rounded-xl p-6 shadow-2xl backdrop-blur-md flex flex-col items-center">
        {/* Interactive Tree Rings Cross-Section SVG */}
        <div class="w-64 h-64 sm:w-72 sm:h-72 my-2 relative flex items-center justify-center">
          <svg viewBox="0 0 300 300" class="w-full h-full filter drop-shadow-xl">
            {/* Tree Bark Outer Contour */}
            <path
              d="M150 20 C230 18 280 70 280 150 C280 230 230 282 150 280 C70 282 20 230 20 150 C18 70 70 18 150 20 Z"
              fill="#271c19"
              stroke="#5c3d2e"
              stroke-width="8"
            />

            {/* 12 Concentric Growth Rings */}
            <For each={Array.from({ length: 12 })}>
              {(_, i) => {
                const ringIndex = 12 - i();
                const radius = 18 + ringIndex * 9;
                return (
                  <circle
                    cx="150"
                    cy="150"
                    r={radius}
                    fill={activeRing() === ringIndex ? 'rgba(52, 211, 153, 0.2)' : 'none'}
                    stroke={activeRing() === ringIndex ? '#34d399' : '#855845'}
                    stroke-width={activeRing() === ringIndex ? '3' : '1.5'}
                    stroke-dasharray="8,2,4,2"
                    onMouseEnter={() => {
                      sound.playKeyClick();
                      setActiveRing(ringIndex);
                    }}
                    onMouseLeave={() => setActiveRing(null)}
                    class="cursor-pointer transition-colors duration-200"
                  />
                );
              }}
            </For>

            {/* Heart of the Tree */}
            <circle cx="150" cy="150" r="10" fill="#34d399" class="animate-pulse" />
          </svg>

          <Show when={activeRing() !== null}>
            <div class="absolute bottom-2 px-3 py-1 rounded bg-black/80 border border-emerald-500 text-emerald-400 font-mono text-xs shadow">
              Lingkaran ke-{activeRing()} (Tahun ke-{activeRing()})
            </div>
          </Show>
        </div>

        {/* Riddle Poem */}
        <div class="w-full my-4 p-4 rounded-lg bg-[#0a0d14] border border-gray-800 text-gray-300 text-xs sm:text-sm font-mono leading-relaxed text-center">
          <p class="italic text-emerald-300 mb-2">"Aku tidak bersudut seperti persegi, tidak kaku seperti mesin."</p>
          <p>"Aku tumbuh bertambah satu lingkaran setiap kali bumi mengelilingi matahari."</p>
          <p class="mt-2 text-white font-semibold">"Di dalam diriku hari ini terukir tepat 12 lingkaran kehidupan. Benda apakah aku?"</p>
        </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} class="w-full flex flex-col gap-3">
          <div class="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={userInput()}
              onInput={e => {
                sound.playKeyClick();
                setUserInput(e.currentTarget.value);
              }}
              placeholder="Tebakan jawabanmu..."
              class="flex-1 px-4 py-3 bg-[#0a0d14] border border-cyber-border focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 rounded-lg text-white font-mono text-sm outline-none"
            />
            <button
              type="submit"
              class="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-sm rounded-lg transition-all shadow-[0_0_15px_rgba(52,211,153,0.3)] active:scale-95"
            >
              Kirim Jawaban →
            </button>
          </div>

          <div class="flex justify-between items-center text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                sound.playKeyClick();
                setShowHint(!showHint());
              }}
              class="text-emerald-400 hover:underline"
            >
              💡 {showHint() ? 'Tutup Petunjuk' : 'Minta Petunjuk?'}
            </button>
            <span class="text-gray-500">Arahkan kursor ke lingkaran untuk menghitung</span>
          </div>

          <Show when={showHint()}>
            <div class="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono leading-relaxed">
              <p>Makhluk hidup yang batangnya dipotong akan memperlihatkan lingkaran-lingkaran tahun (tree rings).</p>
            </div>
          </Show>

          <Show when={errorMessage()}>
            <p class="text-xs text-cyber-red font-mono animate-bounce text-center">
              ⚠️ {errorMessage()}
            </p>
          </Show>
        </form>
      </div>
    </div>
  );
}
