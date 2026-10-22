import { createSignal, Show } from 'solid-js';
import { sound } from '../utils/sound';
import { completeStage } from '../stores/gameState';

type SymbolType = 'star' | 'circle' | 'diamond' | 'arrow';

export function Game5Diagonal() {
  const [answerInput, setAnswerInput] = createSignal('');
  const [errorMessage, setErrorMessage] = createSignal('');
  const [showHint, setShowHint] = createSignal(false);
  const [highlightDiagonal, setHighlightDiagonal] = createSignal(true);

  // 4x4 Grid definition
  const grid: SymbolType[][] = [
    ['star', 'circle', 'diamond', 'arrow'],     // Row 1 -> Sum: 15
    ['arrow', 'diamond', 'circle', 'star'],     // Row 2 -> Sum: 15
    ['circle', 'diamond', 'arrow', 'diamond'],   // Row 3 -> Sum: 19
    ['arrow', 'diamond', 'arrow', 'arrow'],     // Row 4 -> Sum: 23
  ];

  const rowSums = [15, 15, 19, 23];
  const colSums = [16, 18, 20, 18];

  function renderSymbol(type: SymbolType) {
    switch (type) {
      case 'star':
        return (
          <svg viewBox="0 0 24 24" class="w-8 h-8 fill-purple-400 filter drop-shadow">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      case 'circle':
        return (
          <svg viewBox="0 0 24 24" class="w-7 h-7 fill-cyan-400 filter drop-shadow">
            <circle cx="12" cy="12" r="10" />
          </svg>
        );
      case 'diamond':
        return (
          <svg viewBox="0 0 24 24" class="w-7 h-7 fill-amber-400 filter drop-shadow">
            <path d="M12 2L2 12l10 10 10-10L12 2z" />
          </svg>
        );
      case 'arrow':
        return (
          <svg viewBox="0 0 24 24" class="w-7 h-7 fill-emerald-400 filter drop-shadow">
            <path d="M12 2l-5 5h3v10H7l5 5 5-5h-3V7h3l-5-5z" />
          </svg>
        );
    }
  }

  function handleSubmit(e?: Event) {
    if (e) e.preventDefault();
    sound.playKeyClick();

    const val = answerInput().trim();

    if (val === '18') {
      sound.playSuccess();
      setErrorMessage('');
      setTimeout(() => {
        completeStage(5);
      }, 900);
    } else {
      sound.playError();
      setErrorMessage('Nilai belum tepat. Coba selesaikan nilai masing-masing simbol dari baris dan kolom terlebih dahulu!');
    }
  }

  return (
    <div class="max-w-4xl mx-auto flex flex-col items-center">
      {/* Stage Header */}
      <div class="text-center mb-6">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-green/10 border border-cyber-green/30 text-cyber-green text-xs font-mono tracking-widest uppercase mb-2">
          <span>Game 05 // Altar Matriks Simbolik</span>
        </div>
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
          THE MYSTERY DIAGONAL
        </h2>
        <p class="text-gray-400 text-sm max-w-xl mx-auto mt-1">
          Setiap simbol mewakili sebuah angka rahasia. Cari tahu nilai dari masing-masing simbol, lalu hitung jumlah total simbol pada garis diagonal dari kiri-atas ke kanan-bawah (kotak kuning ?)!
        </p>
      </div>

      <div class="w-full max-w-md bg-[#111726]/90 border border-cyber-border rounded-xl p-5 shadow-2xl backdrop-blur-md flex flex-col items-center">
        {/* 5x5 Visual Grid Table */}
        <div class="bg-white rounded-lg p-3 w-full shadow-inner border border-gray-200">
          <div class="grid grid-cols-5 gap-1.5 text-center">
            {/* Rows 1 to 4 */}
            {grid.map((row, rIdx) => (
              <>
                {row.map((cell, cIdx) => {
                  const isDiag = rIdx === cIdx;
                  return (
                    <div
                      class={`h-14 flex items-center justify-center rounded border transition-all ${
                        isDiag && highlightDiagonal()
                          ? 'border-amber-400 bg-amber-50 shadow-sm ring-2 ring-amber-300'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      {renderSymbol(cell)}
                    </div>
                  );
                })}
                {/* Row Sum */}
                <div class="h-14 flex items-center justify-center font-mono font-bold text-lg text-gray-800 bg-gray-100 rounded border border-gray-300">
                  {rowSums[rIdx]}
                </div>
              </>
            ))}

            {/* Bottom Row: Column Sums + Yellow Mystery Cell */}
            {colSums.map(sum => (
              <div class="h-14 flex items-center justify-center font-mono font-bold text-lg text-gray-800 bg-gray-100 rounded border border-gray-300">
                {sum}
              </div>
            ))}
            {/* The Missing Diagonal Sum (?) */}
            <div class="h-14 flex items-center justify-center font-mono font-bold text-2xl text-gray-900 bg-yellow-400 rounded border-2 border-yellow-500 shadow-md animate-pulse">
              ?
            </div>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} class="w-full mt-6 flex flex-col gap-3">
          <div class="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={answerInput()}
              onInput={e => {
                sound.playKeyClick();
                setAnswerInput(e.currentTarget.value);
              }}
              placeholder="Nilai diagonal kuning (?)..."
              class="flex-1 px-4 py-3 bg-[#0a0d14] border border-cyber-border focus:border-cyber-green focus:ring-1 focus:ring-cyber-green rounded-lg text-white font-mono text-sm outline-none"
            />
            <button
              type="submit"
              class="px-6 py-3 bg-cyber-green hover:bg-emerald-400 text-black font-mono font-bold text-sm rounded-lg transition-all shadow-[0_0_15px_rgba(0,255,102,0.3)] active:scale-95"
            >
              Kirim Nilai →
            </button>
          </div>

          <div class="flex items-center justify-between text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                sound.playKeyClick();
                setShowHint(!showHint());
              }}
              class="text-cyber-amber hover:underline"
            >
              💡 {showHint() ? 'Tutup Petunjuk Eliminasi' : 'Butuh Petunjuk Eliminasi?'}
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playKeyClick();
                setHighlightDiagonal(!highlightDiagonal());
              }}
              class="text-gray-400 hover:text-white"
            >
              {highlightDiagonal() ? 'Matikan Sorot Diagonal' : 'Sorot Diagonal'}
            </button>
          </div>

          <Show when={showHint()}>
            <div class="p-3 rounded-lg bg-cyber-amber/10 border border-cyber-amber/30 text-cyber-amber text-xs font-mono leading-relaxed">
              <p>1. Perhatikan Baris 4: <code>3 Arrow + 1 Diamond = 23</code></p>
              <p>2. Perhatikan Kolom 2: <code>1 Circle + 3 Diamond = 18</code></p>
              <p>3. Kurangkan Baris 3 dari Kolom 2 untuk menemukan hubungan antara Arrow dan Diamond!</p>
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
