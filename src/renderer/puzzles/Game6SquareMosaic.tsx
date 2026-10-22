import { createSignal, Show } from 'solid-js';
import { sound } from '../utils/sound';
import { completeStage } from '../stores/gameState';

export function Game6SquareMosaic() {
  const [inputA, setInputA] = createSignal('');
  const [inputB, setInputB] = createSignal('');
  const [inputC, setInputC] = createSignal('');
  const [singleInput, setSingleInput] = createSignal('');
  const [errorMessage, setErrorMessage] = createSignal('');
  const [showHint, setShowHint] = createSignal(false);

  function handleSubmit(e?: Event) {
    if (e) e.preventDefault();
    sound.playKeyClick();

    const aVal = inputA().trim();
    const bVal = inputB().trim();
    const cVal = inputC().trim();
    const sVal = singleInput().trim();

    // Correct answers: A = 4, B = 3, C = 7
    const isABC = aVal === '4' && bVal === '3' && cVal === '7';
    const isSingleC = sVal === '7' || sVal === '4, 3, 7' || sVal === '4,3,7' || sVal === '4 3 7';

    if (isABC || isSingleC || cVal === '7') {
      sound.playSuccess();
      setErrorMessage('');
      setTimeout(() => {
        completeStage(6);
      }, 1000);
    } else {
      sound.playError();
      setErrorMessage('Ukuran belum tepat. Perhatikan bahwa tinggi A + B harus sama persis dengan tinggi C!');
    }
  }

  return (
    <div class="max-w-4xl mx-auto flex flex-col items-center">
      {/* Stage Header */}
      <div class="text-center mb-6">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-amber/10 border border-cyber-amber/30 text-cyber-amber text-xs font-mono tracking-widest uppercase mb-2">
          <span>Game 06 // Mozaik Geometri Sempurna</span>
        </div>
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
          THE SQUARE MOSAIC DIMENSION
        </h2>
        <p class="text-gray-400 text-sm max-w-xl mx-auto mt-1">
          Sebuah bidang berukuran 79 × 74 tersusun dari persegi-persegi sempurna. Cari ukuran sisi persegi misterius A, B, dan C di bawah persegi 10!
        </p>
      </div>

      <div class="w-full max-w-2xl bg-[#111726]/90 border border-cyber-border rounded-xl p-5 shadow-2xl backdrop-blur-md flex flex-col items-center">
        {/* SVG Exact Representation of 79 x 74 Squared Rectangle */}
        <div class="w-full bg-[#0a0d14] p-3 rounded-lg border border-gray-800 flex justify-center overflow-hidden">
          <svg viewBox="0 0 790 740" class="w-full max-w-lg h-auto border-2 border-gray-700 rounded shadow-md">
            {/* 29 (Top-Left, Dark Purple) */}
            <rect x="0" y="0" width="290" height="290" fill="#312e81" stroke="#1e1b4b" stroke-width="4" />
            <text x="145" y="155" fill="#fff" font-family="'Fira Code', monospace" font-size="42" font-weight="bold" text-anchor="middle">29</text>

            {/* 45 (Bottom-Left, Yellow) */}
            <rect x="0" y="290" width="450" height="450" fill="#eab308" stroke="#ca8a04" stroke-width="4" />
            <text x="225" y="530" fill="#18181b" font-family="'Fira Code', monospace" font-size="56" font-weight="bold" text-anchor="middle">45</text>

            {/* 14 (Top, Medium Purple) */}
            <rect x="290" y="0" width="140" height="140" fill="#6b7280" stroke="#4b5563" stroke-width="4" />
            <text x="360" y="80" fill="#fff" font-family="'Fira Code', monospace" font-size="28" font-weight="bold" text-anchor="middle">14</text>

            {/* 15 (Under 14, Orange) */}
            <rect x="290" y="140" width="150" height="150" fill="#f97316" stroke="#c2410c" stroke-width="4" />
            <text x="365" y="225" fill="#fff" font-family="'Fira Code', monospace" font-size="30" font-weight="bold" text-anchor="middle">15</text>

            {/* 10 (Top, Purple) */}
            <rect x="430" y="0" width="100" height="100" fill="#4b5563" stroke="#374151" stroke-width="3" />
            <text x="480" y="60" fill="#fff" font-family="'Fira Code', monospace" font-size="24" font-weight="bold" text-anchor="middle">10</text>

            {/* 9 (Top, Yellow) */}
            <rect x="530" y="0" width="90" height="90" fill="#facc15" stroke="#ca8a04" stroke-width="3" />
            <text x="575" y="55" fill="#18181b" font-family="'Fira Code', monospace" font-size="24" font-weight="bold" text-anchor="middle">9</text>

            {/* 17 (Top-Right, Gray-Purple) */}
            <rect x="620" y="0" width="170" height="170" fill="#64748b" stroke="#475569" stroke-width="4" />
            <text x="705" y="95" fill="#fff" font-family="'Fira Code', monospace" font-size="32" font-weight="bold" text-anchor="middle">17</text>

            {/* 8 (Under 9, Orange) */}
            <rect x="540" y="90" width="80" height="80" fill="#ea580c" stroke="#9a3412" stroke-width="3" />
            <text x="580" y="140" fill="#fff" font-family="'Fira Code', monospace" font-size="24" font-weight="bold" text-anchor="middle">8</text>

            {/* Unmarked Small Square (size 1) at x=530, y=90 */}
            <rect x="530" y="90" width="10" height="10" fill="#f8fafc" stroke="#64748b" stroke-width="1" />

            {/* A (Yellow Square, side 4) at x=430, y=100 */}
            <rect x="430" y="100" width="40" height="40" fill="#fef08a" stroke="#eab308" stroke-width="3" />
            <text x="450" y="126" fill="#854d0e" font-family="'Fira Code', monospace" font-size="18" font-weight="bold" text-anchor="middle">A</text>

            {/* B (Under A, side 3) at x=440, y=140 */}
            <rect x="440" y="140" width="30" height="30" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" />
            <text x="455" y="161" fill="#0f172a" font-family="'Fira Code', monospace" font-size="14" font-weight="bold" text-anchor="middle">B</text>

            {/* C (Side 7) at x=470, y=100 */}
            <rect x="470" y="100" width="70" height="70" fill="#1e1b4b" stroke="#38bdf8" stroke-width="3" />
            <text x="505" y="143" fill="#38bdf8" font-family="'Fira Code', monospace" font-size="28" font-weight="bold" text-anchor="middle">C</text>

            {/* 12 (Under C and B) */}
            <rect x="440" y="170" width="120" height="120" fill="#1e1b4b" stroke="#312e81" stroke-width="4" />
            <text x="500" y="240" fill="#fff" font-family="'Fira Code', monospace" font-size="30" font-weight="bold" text-anchor="middle">12</text>

            {/* 11 (Under 12, Grey) */}
            <rect x="450" y="290" width="110" height="110" fill="#64748b" stroke="#475569" stroke-width="4" />
            <text x="505" y="355" fill="#fff" font-family="'Fira Code', monospace" font-size="26" font-weight="bold" text-anchor="middle">11</text>

            {/* 23 (Right, Dark Purple) */}
            <rect x="560" y="170" width="230" height="230" fill="#312e81" stroke="#1e1b4b" stroke-width="4" />
            <text x="675" y="295" fill="#fff" font-family="'Fira Code', monospace" font-size="44" font-weight="bold" text-anchor="middle">23</text>

            {/* 34 (Bottom-Right, Orange) */}
            <rect x="450" y="400" width="340" height="340" fill="#ea580c" stroke="#9a3412" stroke-width="4" />
            <text x="620" y="585" fill="#fff" font-family="'Fira Code', monospace" font-size="52" font-weight="bold" text-anchor="middle">34</text>
          </svg>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} class="w-full mt-6 flex flex-col gap-4">
          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-mono text-cyber-amber mb-1">Persegi A:</label>
              <input
                type="text"
                value={inputA()}
                onInput={e => setInputA(e.currentTarget.value)}
                placeholder="Sisi A"
                class="w-full px-3 py-2 bg-[#0a0d14] border border-cyber-border focus:border-cyber-amber rounded text-white font-mono text-center outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-mono text-gray-300 mb-1">Persegi B:</label>
              <input
                type="text"
                value={inputB()}
                onInput={e => setInputB(e.currentTarget.value)}
                placeholder="Sisi B"
                class="w-full px-3 py-2 bg-[#0a0d14] border border-cyber-border focus:border-cyber-amber rounded text-white font-mono text-center outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-mono text-cyber-cyan mb-1 font-bold">Persegi C:</label>
              <input
                type="text"
                value={inputC()}
                onInput={e => setInputC(e.currentTarget.value)}
                placeholder="Sisi C"
                class="w-full px-3 py-2 bg-[#0a0d14] border border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan rounded text-white font-mono text-center outline-none font-bold"
              />
            </div>
          </div>

          <button
            type="submit"
            class="w-full py-3 bg-cyber-amber hover:bg-amber-400 text-black font-mono font-bold text-sm rounded-lg transition-all shadow-[0_0_15px_rgba(255,176,0,0.3)] active:scale-95"
          >
            Verifikasi Dimensi Persegi →
          </button>

          <div class="flex justify-between items-center text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                sound.playKeyClick();
                setShowHint(!showHint());
              }}
              class="text-cyber-cyan hover:underline"
            >
              💡 {showHint() ? 'Tutup Petunjuk Geometri' : 'Butuh Petunjuk Geometri?'}
            </button>
            <span class="text-gray-500">Hubungan: Sisi A + Sisi B = Sisi C</span>
          </div>

          <Show when={showHint()}>
            <div class="p-3 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono leading-relaxed">
              <p>• Perhatikan sisi kanan: Tinggi total bingkai adalah 74 = 17 + 23 + 34.</p>
              <p>• Kolom di sebelah kiri C adalah persegi A di atas dan B di bawah.</p>
              <p>• Karena A dan B bertumpuk pas setinggi C, maka <code>A + B = C</code>.</p>
              <p>• Coba periksa: A = 4, B = 3, maka C = 7!</p>
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
