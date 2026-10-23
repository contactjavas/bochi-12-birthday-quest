import { createSignal, For, Show } from 'solid-js';
import { sound } from '../utils/sound';
import { completeStage } from '../stores/gameState';

type StampState = '?' | 'T' | 'L';

interface IGuest {
  id: string;
  name: string;
  cam: string;
  statement: string;
  shirtColor: string;
}

export function Game2LogicPanel() {
  const [stamps, setStamps] = createSignal<Record<string, StampState>>({
    ken: '?',
    dana: '?',
    yumi: '?',
    marcus: '?',
  });

  const [selectedDoor, setSelectedDoor] = createSignal<'left' | 'right' | null>(null);
  const [showExplanation, setShowExplanation] = createSignal(false);
  const [feedback, setFeedback] = createSignal<string>('');

  const guests: IGuest[] = [
    {
      id: 'ken',
      cam: 'CAM 1',
      name: 'KEN',
      statement: '"PINTU KIRI adalah pintu yang aman."',
      shirtColor: 'from-pink-500 to-purple-600',
    },
    {
      id: 'dana',
      cam: 'CAM 2',
      name: 'DANA',
      statement: '"Ken berkata jujur hari ini."',
      shirtColor: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'yumi',
      cam: 'CAM 3',
      name: 'YUMI',
      statement: '"Hari ini, pembohong lebih banyak daripada yang jujur di antara kami berempat."',
      shirtColor: 'from-amber-400 to-orange-500',
    },
    {
      id: 'marcus',
      cam: 'CAM 4',
      name: 'MARCUS',
      statement: '"Ken sedang berbohong hari ini."',
      shirtColor: 'from-emerald-500 to-teal-700',
    },
  ];

  function toggleStamp(guestId: string) {
    sound.playKeyClick();
    const current = stamps()[guestId];
    const next: StampState = current === '?' ? 'T' : current === 'T' ? 'L' : '?';

    setStamps({
      ...stamps(),
      [guestId]: next,
    });
  }

  // Player must stamp every guest before doors unlock
  const allStamped = () => Object.values(stamps()).every(s => s !== '?');

  // Verify the stamped assignment is logically consistent with every statement.
  // Dana: "Ken jujur" -> D === K
  // Yumi: "pembohong > yang jujur" -> Y === (liars > honest)
  // Marcus: "Ken bohong" -> M === !K
  const isAnalysisConsistent = () => {
    const K = stamps().ken === 'T';
    const D = stamps().dana === 'T';
    const Y = stamps().yumi === 'T';
    const M = stamps().marcus === 'T';
    const honest = [K, D, Y, M].filter(Boolean).length;
    return D === K && Y === (4 - honest > honest) && M === !K;
  };

  function handleChooseDoor(door: 'left' | 'right') {
    if (!allStamped()) return;
    sound.playKeyClick();
    setSelectedDoor(door);

    if (!isAnalysisConsistent()) {
      sound.playError();
      setFeedback('Analisis T/L-mu belum konsisten dengan semua kesaksian. Cek kembali stempel setiap tamu sebelum membuka pintu!');
      return;
    }

    if (door === 'left') {
      sound.playSuccess();
      setFeedback('BENAR! Dari analisismu, Ken terbukti jujur hari ini, jadi klaimnya bahwa Pintu Kiri aman memang benar!');
      setShowExplanation(true);
      setTimeout(() => {
        completeStage(2);
      }, 1200);
    } else {
      sound.playError();
      setFeedback('PILIHAN SALAH! Analisismu konsisten, tapi kesimpulan pintunya keliru. Ken itu jujur — percayai klaimnya!');
    }
  }

  return (
    <div class="max-w-4xl mx-auto flex flex-col items-center">
      {/* Stage Header */}
      <div class="text-center mb-6">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple text-xs font-mono tracking-widest uppercase mb-2">
          <span>Game 02 // Ruang Sidang Paradoks</span>
        </div>
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
          THE TWO DOORS & THE HONEST PANEL
        </h2>
        <p class="text-gray-400 text-sm max-w-xl mx-auto mt-1">
          Hari ini, setiap tamu berkata jujur (T) atau bohong (L). Analisis kesaksian mereka untuk menentukan pintu mana yang aman!
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Left Column: Guest Cards */}
        <div class="lg:col-span-2 flex flex-col gap-3">
          <div class="p-3 bg-[#111726]/80 border border-cyber-border rounded-lg text-xs font-mono text-gray-300">
            <span class="text-cyber-amber font-bold">ATURAN RUMAH:</span> Setiap tamu hari ini jujur (T) atau pembohong (L). Coba andaikan seseorang jujur atau bohong, lalu lihat apakah ucapan tamu lain jadi kontradiksi. Ketuk stempel [?] untuk menandai analisismu.
          </div>

          <For each={guests}>
            {guest => (
              <div class="bg-[#111726]/90 border border-cyber-border hover:border-gray-600 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between transition-all">
                {/* Avatar & Info */}
                <div class="flex items-center gap-3 w-full sm:w-auto">
                  <div class={`w-12 h-12 rounded-lg bg-gradient-to-tr ${guest.shirtColor} flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0`}>
                    {guest.name[0]}
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] px-1.5 py-0.5 rounded bg-red-950/80 border border-red-500/40 text-red-400 font-mono font-bold">
                        {guest.cam}
                      </span>
                      <span class="font-mono font-bold text-white text-sm">{guest.name}</span>
                    </div>
                    <p class="text-xs text-gray-300 italic mt-1 font-sans">
                      {guest.statement}
                    </p>
                  </div>
                </div>

                {/* Stamping Controls */}
                <div class="flex items-center gap-4 shrink-0 bg-[#0a0d14]/70 px-3 py-1.5 rounded-lg border border-gray-800">
                  <div class="flex flex-col items-center">
                    <span class="text-[10px] text-gray-500 font-mono mb-1">HARI INI</span>
                    <button
                      onClick={() => toggleStamp(guest.id)}
                      class={`w-8 h-8 rounded font-mono font-bold text-sm flex items-center justify-center border transition-all ${
                        stamps()[guest.id] === 'T'
                          ? 'bg-cyber-green/20 border-cyber-green text-cyber-green'
                          : stamps()[guest.id] === 'L'
                          ? 'bg-cyber-red/20 border-cyber-red text-cyber-red'
                          : 'bg-gray-900 border-gray-700 text-gray-500'
                      }`}
                    >
                      {stamps()[guest.id]}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>

        {/* Right Column: The Giveaway & Doors */}
        <div class="bg-[#111726]/90 border border-cyber-border rounded-xl p-5 flex flex-col items-center justify-between shadow-xl">
          <div class="w-full text-center">
            <span class="inline-block px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-mono font-bold tracking-widest uppercase mb-2">
              ● LIVE ON STAGE
            </span>
            <h3 class="text-sm font-mono font-bold text-white mb-2">THE GIVEAWAY</h3>
            <p class="text-xs text-gray-300 leading-relaxed">
              Di atas panggung siaran langsung, <strong class="text-cyber-cyan">KEN</strong> mengklaim bahwa <strong class="text-yellow-400">PINTU KIRI (LEFT)</strong> adalah pintu yang aman.
            </p>
            <p class="text-xs text-gray-400 mt-2">
              Tandai status T/L keempat tamu dengan stempel [?], lalu buka pintu yang aman!
            </p>
          </div>

          {/* Interactive Doors */}
          <div class="flex gap-4 my-6 w-full justify-center">
            {/* Left Door */}
            <button
              onClick={() => handleChooseDoor('left')}
              disabled={!allStamped()}
              class={`group flex flex-col items-center p-3 rounded-xl border transition-all transform ${
                !allStamped()
                  ? 'border-gray-800 bg-[#0a0d14] opacity-40 cursor-not-allowed'
                  : selectedDoor() === 'left'
                  ? 'border-cyber-green bg-cyber-green/10 shadow-[0_0_20px_rgba(0,255,102,0.3)] hover:-translate-y-1'
                  : 'border-cyber-border bg-[#0a0d14] hover:border-cyber-cyan hover:-translate-y-1'
              }`}
            >
              <div class="w-20 h-32 rounded-t-lg border-2 border-gray-400 group-hover:border-cyber-cyan bg-gradient-to-b from-gray-800 to-gray-900 relative flex flex-col items-center p-2">
                <div class="w-full h-10 border border-gray-600 rounded-sm mb-2" />
                <div class="w-full h-12 border border-gray-600 rounded-sm" />
                <div class="w-2 h-2 rounded-full bg-amber-400 absolute right-2 top-16 shadow" />
              </div>
              <span class="font-mono text-xs font-bold text-white mt-2 group-hover:text-cyber-cyan">
                LEFT (KIRI)
              </span>
            </button>

            {/* Right Door */}
            <button
              onClick={() => handleChooseDoor('right')}
              disabled={!allStamped()}
              class={`group flex flex-col items-center p-3 rounded-xl border transition-all transform ${
                !allStamped()
                  ? 'border-gray-800 bg-[#0a0d14] opacity-40 cursor-not-allowed'
                  : selectedDoor() === 'right'
                  ? 'border-cyber-red bg-cyber-red/10 shadow-[0_0_20px_rgba(255,51,102,0.3)] hover:-translate-y-1'
                  : 'border-cyber-border bg-[#0a0d14] hover:border-gray-500 hover:-translate-y-1'
              }`}
            >
              <div class="w-20 h-32 rounded-t-lg border-2 border-gray-400 group-hover:border-gray-500 bg-gradient-to-b from-gray-800 to-gray-900 relative flex flex-col items-center p-2">
                <div class="w-full h-10 border border-gray-600 rounded-sm mb-2" />
                <div class="w-full h-12 border border-gray-600 rounded-sm" />
                <div class="w-2 h-2 rounded-full bg-amber-400 absolute left-2 top-16 shadow" />
              </div>
              <span class="font-mono text-xs font-bold text-white mt-2 group-hover:text-gray-400">
                RIGHT (KANAN)
              </span>
            </button>
          </div>

          {/* Lock hint while analysis is incomplete */}
          <Show when={!allStamped()}>
            <div class="text-[11px] font-mono text-gray-500 text-center -mt-3 mb-2">
              🔒 Pintu terkunci — tandai status T/L keempat tamu terlebih dahulu
            </div>
          </Show>

          <Show when={feedback()}>
            <div class={`text-xs font-mono p-3 rounded-lg text-center leading-relaxed ${
              selectedDoor() === 'left'
                ? 'bg-cyber-green/10 border border-cyber-green/30 text-cyber-green'
                : 'bg-cyber-red/10 border border-cyber-red/30 text-cyber-red'
            }`}>
              {feedback()}
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
}
