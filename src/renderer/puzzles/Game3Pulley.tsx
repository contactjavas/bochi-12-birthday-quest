import { createSignal, Show } from 'solid-js';
import { sound } from '../utils/sound';
import { completeStage } from '../stores/gameState';

type TestState = 'idle' | 'testing' | 'success' | 'failure';

export function Game3Pulley() {
  const [rpmInput, setRpmInput] = createSignal('');
  const [errorMessage, setErrorMessage] = createSignal('');
  const [showHint, setShowHint] = createSignal(false);
  const [testState, setTestState] = createSignal<TestState>('idle');
  const [testedValue, setTestedValue] = createSignal<string>('');

  function handleSubmit(e?: Event) {
    if (e) e.preventDefault();
    if (testState() === 'testing') return;

    sound.playKeyClick();
    const rawVal = rpmInput().trim();
    if (!rawVal) {
      setErrorMessage('Harap masukkan angka RPM terlebih dahulu.');
      return;
    }

    const val = rawVal.toLowerCase().replace(/[^0-9]/g, '');
    setTestedValue(val);
    setErrorMessage('');
    setTestState('testing');

    // Play mechanical gear/ratchet sound during rotation
    sound.playPulleySpinSequence(2600);

    // Run test for ~2.6 seconds
    setTimeout(() => {
      if (val === '250') {
        setTestState('success');
        sound.playSuccess();
        setTimeout(() => {
          completeStage(3);
        }, 1200);
      } else {
        setTestState('failure');
        sound.playPulleyJam();
        setErrorMessage(
          `Kecepatan ${val} RPM tidak selaras dengan sistem! Katrol macet dan terhenti. Periksa rasio diameter dan coba lagi.`
        );
      }
    }, 2600);
  }

  const isTesting = () => testState() === 'testing';
  const isSuccess = () => testState() === 'success';
  const isFailure = () => testState() === 'failure';

  return (
    <div class="max-w-4xl mx-auto flex flex-col items-center">
      {/* Stage Header */}
      <div class="text-center mb-6">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-amber/10 border border-cyber-amber/30 text-cyber-amber text-xs font-mono tracking-widest uppercase mb-2">
          <span>Game 03 // Ruang Transmisi Mekanikal</span>
        </div>
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
          THE CLOCKWORK TRANSMISSION
        </h2>
        <p class="text-gray-400 text-sm max-w-xl mx-auto mt-1">
          Katrol penggerak A berputar pada 3.000 RPM. Hitung kecepatan putaran akhir pada Katrol D untuk mengaktifkan jembatan kuno!
        </p>
      </div>

      <div class="w-full max-w-2xl bg-[#111726]/90 border border-cyber-border rounded-xl p-6 shadow-2xl backdrop-blur-md flex flex-col items-center">
        {/* Testing Status Banner */}
        <div class="w-full mb-3 flex items-center justify-between text-xs font-mono">
          <div class="flex items-center gap-2">
            <span class="text-gray-400">STATUS TRANSMISI:</span>
            <Show when={testState() === 'idle'}>
              <span class="text-gray-500 font-bold">MENUNGGU AKTIVASI</span>
            </Show>
            <Show when={isTesting()}>
              <span class="text-amber-400 font-bold animate-pulse flex items-center gap-1">
                ⚙️ MENGUJI PUTARAN (2.5 DETIK)...
              </span>
            </Show>
            <Show when={isSuccess()}>
              <span class="text-emerald-400 font-bold flex items-center gap-1">
                ✓ SINKRONISASI BERHASIL (250 RPM)
              </span>
            </Show>
            <Show when={isFailure()}>
              <span class="text-rose-400 font-bold flex items-center gap-1">
                ✕ TRANSMISI GAGAL // MACET
              </span>
            </Show>
          </div>
          <span class="text-gray-500">Input A = 3.000 RPM</span>
        </div>

        {/* Animated Pulley SVG Diagram */}
        <div
          class={`w-full bg-[#080c14] rounded-xl border p-4 mb-6 relative overflow-hidden transition-all duration-500 ${
            isSuccess()
              ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]'
              : isFailure()
              ? 'border-rose-500/80 shadow-[0_0_25px_rgba(244,63,94,0.25)]'
              : isTesting()
              ? 'border-amber-400/80 shadow-[0_0_25px_rgba(245,158,11,0.25)]'
              : 'border-gray-800'
          }`}
        >
          <svg viewBox="0 0 600 280" class="w-full h-auto">
            {/* Belt A to B */}
            <path
              d="M 100 68 L 220 102 M 100 132 L 220 238"
              stroke={isSuccess() ? '#10b981' : isFailure() ? '#f43f5e' : '#00e5ff'}
              stroke-width={isTesting() || isSuccess() ? '3.5' : '3'}
              stroke-dasharray="8,5"
              class={isTesting() || isSuccess() ? 'anim-belt-move' : ''}
            />

            {/* Belt C to D */}
            <path
              d="M 220 152 L 440 85 M 220 188 L 440 255"
              stroke={isSuccess() ? '#10b981' : isFailure() ? '#f43f5e' : '#ffb000'}
              stroke-width={isTesting() || isSuccess() ? '3.5' : '3'}
              stroke-dasharray="8,5"
              class={
                isTesting()
                  ? testedValue() === '250'
                    ? 'anim-belt-move'
                    : 'anim-belt-move opacity-60'
                  : isSuccess()
                  ? 'anim-belt-move'
                  : ''
              }
            />

            {/* Pulley A (Dia 10) */}
            <g transform="translate(100, 100)">
              {/* Outer Rim */}
              <circle r="32" fill="#1e293b" stroke={isSuccess() ? '#10b981' : '#38bdf8'} stroke-width="3" />
              {/* Rotating Spokes and Crosshairs */}
              <g class={isTesting() || isSuccess() ? 'anim-spin-fast' : ''}>
                <line x1="0" y1="-30" x2="0" y2="30" stroke="#38bdf8" stroke-width="2" />
                <line x1="-30" y1="0" x2="30" y2="0" stroke="#38bdf8" stroke-width="2" />
                <line x1="-21" y1="-21" x2="21" y2="21" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="2,2" />
                <line x1="-21" y1="21" x2="21" y2="-21" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="2,2" />
                {/* Spoke bolt dots */}
                <circle cx="0" cy="-20" r="2" fill="#fff" />
                <circle cx="0" cy="20" r="2" fill="#fff" />
                <circle cx="-20" cy="0" r="2" fill="#fff" />
                <circle cx="20" cy="0" r="2" fill="#fff" />
              </g>
              {/* Axle Center */}
              <circle r="6" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
              <text x="0" y="2" font-family="'Fira Code', monospace" font-size="10" font-weight="bold" fill="#38bdf8" text-anchor="middle" dy="18">A</text>
            </g>

            {/* Pulley B and C (Coaxial: B Dia 20, C Dia 5) */}
            <g transform="translate(220, 170)">
              {/* Outer Pulley B Rim */}
              <circle r="68" fill="#1e293b" stroke={isSuccess() ? '#10b981' : '#38bdf8'} stroke-width="3" />
              {/* Rotating Spokes for B */}
              <g class={isTesting() || isSuccess() ? 'anim-spin-med' : ''}>
                <line x1="0" y1="-65" x2="0" y2="65" stroke="#64748b" stroke-width="2.5" />
                <line x1="-65" y1="0" x2="65" y2="0" stroke="#64748b" stroke-width="2.5" />
                <line x1="-46" y1="-46" x2="46" y2="46" stroke="#475569" stroke-width="2" />
                <line x1="-46" y1="46" x2="46" y2="-46" stroke="#475569" stroke-width="2" />
                {/* Bolt markers on rim */}
                <circle cx="0" cy="-52" r="2.5" fill="#38bdf8" />
                <circle cx="0" cy="52" r="2.5" fill="#38bdf8" />
                <circle cx="-52" cy="0" r="2.5" fill="#38bdf8" />
                <circle cx="52" cy="0" r="2.5" fill="#38bdf8" />
              </g>
              {/* Inner Pulley C (Same Axle, Dia 5) */}
              <circle r="18" fill="#334155" stroke={isSuccess() ? '#10b981' : '#f59e0b'} stroke-width="3" />
              <g class={isTesting() || isSuccess() ? 'anim-spin-med' : ''}>
                <line x1="0" y1="-16" x2="0" y2="16" stroke="#fef08a" stroke-width="2" />
                <line x1="-16" y1="0" x2="16" y2="0" stroke="#fef08a" stroke-width="2" />
              </g>
              {/* Common Axle Center */}
              <circle r="6" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
              <text x="-40" y="4" font-family="'Fira Code', monospace" font-size="14" font-weight="bold" fill="#fff" text-anchor="middle">B</text>
              <text x="0" y="-24" font-family="'Fira Code', monospace" font-size="11" font-weight="bold" fill="#fef08a" text-anchor="middle">C</text>
            </g>

            {/* Pulley D (Dia 30) */}
            <g transform="translate(440, 170)">
              {/* Outer Pulley D Rim */}
              <circle
                r="85"
                fill="#1e293b"
                stroke={isSuccess() ? '#10b981' : isFailure() ? '#f43f5e' : '#f59e0b'}
                stroke-width="3.5"
              />
              {/* Rotating Spokes for D */}
              <g
                class={
                  isTesting()
                    ? testedValue() === '250'
                      ? 'anim-spin-slow'
                      : 'anim-spin-erratic'
                    : isSuccess()
                    ? 'anim-spin-slow'
                    : ''
                }
              >
                <line x1="0" y1="-80" x2="0" y2="80" stroke="#f59e0b" stroke-width="3" />
                <line x1="-80" y1="0" x2="80" y2="0" stroke="#f59e0b" stroke-width="3" />
                <line x1="-56" y1="-56" x2="56" y2="56" stroke="#d97706" stroke-width="2" />
                <line x1="-56" y1="56" x2="56" y2="-56" stroke="#d97706" stroke-width="2" />
                {/* Peripheral gear teeth / bolt indicators */}
                <circle cx="0" cy="-68" r="3" fill="#fef08a" />
                <circle cx="0" cy="68" r="3" fill="#fef08a" />
                <circle cx="-68" cy="0" r="3" fill="#fef08a" />
                <circle cx="68" cy="0" r="3" fill="#fef08a" />
                <circle cx="-48" cy="-48" r="2.5" fill="#fef08a" />
                <circle cx="48" cy="48" r="2.5" fill="#fef08a" />
                <circle cx="-48" cy="48" r="2.5" fill="#fef08a" />
                <circle cx="48" cy="-48" r="2.5" fill="#fef08a" />
              </g>
              {/* Axle Center */}
              <circle r="8" fill="#f8fafc" stroke="#0f172a" stroke-width="2" />
              <text x="0" y="6" font-family="'Fira Code', monospace" font-size="20" font-weight="bold" fill="#fff" text-anchor="middle">D</text>

              {/* Spark / Error indicator if failure */}
              <Show when={isFailure()}>
                <text x="0" y="-45" font-family="'Fira Code', monospace" font-size="16" fill="#f43f5e" font-weight="bold" text-anchor="middle">💥 MACET!</text>
              </Show>
              <Show when={isSuccess()}>
                <text x="0" y="-45" font-family="'Fira Code', monospace" font-size="14" fill="#10b981" font-weight="bold" text-anchor="middle">✓ 250 RPM</text>
              </Show>
            </g>
          </svg>

          {/* Specifications Tag */}
          <div class="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#111726]/80 p-3 rounded-lg border border-gray-700/80 text-xs font-mono">
            <div class="text-cyber-cyan"><span class="text-gray-400">Katrol A:</span> 10 inci</div>
            <div class="text-cyber-cyan"><span class="text-gray-400">Katrol B:</span> 20 inci</div>
            <div class="text-amber-400"><span class="text-gray-400">Katrol C:</span> 5 inci (seporos B)</div>
            <div class="text-amber-400"><span class="text-gray-400">Katrol D:</span> 30 inci</div>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} class="w-full flex flex-col gap-4">
          <div class="flex flex-col sm:flex-row gap-3">
            <div class="relative flex-1">
              <input
                type="text"
                disabled={isTesting() || isSuccess()}
                value={rpmInput()}
                onInput={e => {
                  sound.playKeyClick();
                  setRpmInput(e.currentTarget.value);
                }}
                placeholder="Masukkan nilai RPM Katrol D..."
                class={`w-full px-4 py-3 bg-[#0a0d14] border rounded-lg text-white font-mono text-sm outline-none transition-all ${
                  isTesting()
                    ? 'border-amber-400/50 opacity-60'
                    : isSuccess()
                    ? 'border-emerald-500 bg-emerald-950/20'
                    : 'border-cyber-border focus:border-amber-400 focus:ring-1 focus:ring-amber-400'
                }`}
              />
              <span class="absolute right-3 top-3 text-xs text-gray-500 font-mono">RPM</span>
            </div>
            <button
              type="submit"
              disabled={isTesting() || isSuccess()}
              class={`px-6 py-3 font-mono font-bold text-sm rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 ${
                isTesting()
                  ? 'bg-amber-600 text-amber-100 opacity-80 cursor-wait'
                  : isSuccess()
                  ? 'bg-emerald-500 text-black cursor-default'
                  : 'bg-cyber-amber hover:bg-amber-400 text-black shadow-[0_0_15px_rgba(255,176,0,0.3)] active:scale-95'
              }`}
            >
              <Show when={isTesting()} fallback={<span>{isSuccess() ? '✓ Berhasil Terpasang' : 'Aktifkan Katrol →'}</span>}>
                <span class="animate-spin text-base">⚙️</span>
                <span>Menguji Putaran...</span>
              </Show>
            </button>
          </div>

          <div class="flex items-center justify-between text-xs font-mono">
            <button
              type="button"
              disabled={isTesting()}
              onClick={() => {
                sound.playKeyClick();
                setShowHint(!showHint());
              }}
              class="text-cyber-cyan hover:underline"
            >
              💡 {showHint() ? 'Tutup Petunjuk Rumus' : 'Butuh Petunjuk Rumus?'}
            </button>
            <span class="text-gray-400">Putaran Motor A = 3.000 RPM</span>
          </div>

          <Show when={showHint()}>
            <div class="p-3.5 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono leading-relaxed animate-fadeIn">
              <p>• Rumus sabuk: <code>RPM_A × Diameter_A = RPM_B × Diameter_B</code></p>
              <p class="mt-1">• Karena Katrol C menempel di poros yang sama dengan Katrol B, maka <code>RPM_C = RPM_B</code>.</p>
              <p class="mt-1">• Lanjutkan rumus sabuk dari C ke D: <code>RPM_C × Diameter_C = RPM_D × Diameter_D</code>.</p>
            </div>
          </Show>

          <Show when={errorMessage()}>
            <p class="text-xs text-rose-400 font-mono animate-bounce text-center bg-rose-950/30 p-2.5 rounded border border-rose-800/50">
              ⚠️ {errorMessage()}
            </p>
          </Show>

          <Show when={isSuccess()}>
            <div class="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/60 text-emerald-300 text-xs font-mono text-center animate-fadeIn">
              ✨ Transmisi berputar stabil pada 250 RPM! Jembatan mekanik terbuka lebar.
            </div>
          </Show>
        </form>
      </div>
    </div>
  );
}
