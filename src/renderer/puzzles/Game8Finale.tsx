import { createSignal, For, Show, onMount } from 'solid-js';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { CLUES_LIST } from '../stores/gameState';
import { AncientRelicIcon } from '../components/AncientRelicIcon';
import { PapyrusModal } from '../components/PapyrusModal';
import { RolledPapyrusButton } from '../components/RolledPapyrusButton';

declare global {
  interface Window {
    electronAPI?: {
      exitApp: () => void;
      toggleFullscreen: () => void;
      isDev: boolean;
    };
  }
}

export function Game8Finale() {
  const [socketedRelics, setSocketedRelics] = createSignal<number[]>([]);
  const [isDoorOpening, setIsDoorOpening] = createSignal(false);
  const [isRevealed, setIsRevealed] = createSignal(false);
  const [showPapyrus, setShowPapyrus] = createSignal(false);
  const [draggedRelic, setDraggedRelic] = createSignal<number | null>(null);

  onMount(() => {
    // If the game reaches stage 8 finale, silence eerie background music permanently
    sound.disableEerieAmbient();
  });

  // Socket a relic into the grand door
  function handleSocketRelic(stageNum: number) {
    if (socketedRelics().includes(stageNum)) return;
    sound.playRelicSocketed();
    setSocketedRelics([...socketedRelics(), stageNum]);
  }

  const isAllSocketed = () => socketedRelics().length === 7;

  // Trigger continuous festive confetti shower
  function triggerConfettiShower() {
    const duration = 18 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 35, spread: 360, ticks: 70, zIndex: 1000 };

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random() * 0.3 + 0.05, y: Math.random() * 0.4 },
        colors: ['#00e5ff', '#ffb000', '#ff3366', '#00ff66', '#ffffff', '#eab308', '#a855f7'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random() * 0.3 + 0.65, y: Math.random() * 0.4 },
        colors: ['#00e5ff', '#ffb000', '#ff3366', '#00ff66', '#ffffff', '#eab308', '#a855f7'],
      });
    }, 280);
  }

  // Open the grand ancient sanctum door via the golden 'B' logo button
  function handleOpenDoor() {
    if (!isAllSocketed() || isDoorOpening()) return;

    sound.playDoorOpening();
    setIsDoorOpening(true);

    setTimeout(() => {
      setIsRevealed(true);
      sound.playHappyBirthdayTheme();
      triggerConfettiShower();
    }, 2000);
  }

  function handleExit() {
    if (window.electronAPI) {
      window.electronAPI.exitApp();
    } else {
      alert('Selamat Ulang Tahun Bochi! Kamu sekarang dapat menutup halaman ini.');
    }
  }

  // Sockets layout with their unique relief silhouette shapes
  const socketLayout = [
    {
      stage: 1,
      label: 'I',
      pos: 'top-[36%] left-[10%]',
      shapeClass: 'rounded-md', // Rectangle silhouette
      svgOutline: (
        <rect x="6" y="6" width="38" height="42" rx="4" fill="none" stroke="#d97706" stroke-width="1.8" stroke-dasharray="3,2" />
      ),
    },
    {
      stage: 2,
      label: 'II',
      pos: 'top-[20%] left-[22%]',
      shapeClass: 'rounded-full', // Double round silhouette
      svgOutline: (
        <g stroke="#d97706" stroke-width="1.8" fill="none" stroke-dasharray="3,2">
          <circle cx="16" cy="25" r="10" />
          <circle cx="34" cy="25" r="10" />
          <path d="M 21 25 L 29 25" stroke-dasharray="none" />
        </g>
      ),
    },
    {
      stage: 3,
      label: 'III',
      pos: 'top-[10%] left-[36%]',
      shapeClass: 'rounded-t-full rounded-b-md', // Lantern silhouette
      svgOutline: (
        <path d="M 25 8 L 36 17 L 34 38 L 16 38 L 14 17 Z" fill="none" stroke="#d97706" stroke-width="1.8" stroke-dasharray="3,2" />
      ),
    },
    {
      stage: 4,
      label: 'IV',
      pos: 'top-[5%] left-[50%] -translate-x-1/2',
      shapeClass: 'rounded-lg rotate-45', // Square facet silhouette
      svgOutline: (
        <rect x="10" y="10" width="30" height="30" rx="3" fill="none" stroke="#d97706" stroke-width="1.8" stroke-dasharray="3,2" />
      ),
    },
    {
      stage: 5,
      label: 'V',
      pos: 'top-[10%] right-[36%]',
      shapeClass: 'rounded-full', // Heart silhouette
      svgOutline: (
        <path d="M 25 38 C 22 35 12 26 12 18 C 12 12 17 9 21 12 C 23 14 25 16 25 16 C 25 16 27 14 29 12 C 33 9 38 12 38 18 C 38 26 28 35 25 38 Z" fill="none" stroke="#d97706" stroke-width="1.8" stroke-dasharray="3,2" />
      ),
    },
    {
      stage: 6,
      label: 'VI',
      pos: 'top-[20%] right-[22%]',
      shapeClass: 'rounded-t-full', // Arched rectangle silhouette
      svgOutline: (
        <path d="M 15 40 L 15 22 Q 25 8 35 22 L 35 40 Z" fill="none" stroke="#d97706" stroke-width="1.8" stroke-dasharray="3,2" />
      ),
    },
    {
      stage: 7,
      label: 'VII',
      pos: 'top-[36%] right-[10%]',
      shapeClass: 'rounded-full', // Laurel branch silhouette
      svgOutline: (
        <path d="M 25 40 Q 14 30 15 16 M 25 40 Q 36 30 35 16 M 25 16 L 25 10" fill="none" stroke="#d97706" stroke-width="1.8" stroke-dasharray="3,2" />
      ),
    },
  ];

  return (
    <div class="w-full max-w-5xl mx-auto flex flex-col justify-between py-1 select-none overflow-hidden max-h-[calc(100vh-80px)]">
      <Show
        when={isRevealed()}
        fallback={
          <div class="w-full flex flex-col items-center justify-between h-full">
            {/* The Classic Ornate Ancient Door with Relief Sockets */}
            <div class="w-full max-w-xl bg-[#070a12] border-4 border-[#854d0e] rounded-t-full rounded-b-xl p-3 sm:p-4 shadow-[0_0_50px_rgba(217,119,6,0.3)] relative overflow-hidden flex flex-col items-center">
              {/* Medieval Gothic Arch Stone Frame */}
              <div class="w-full aspect-[4/3] max-h-[380px] rounded-t-full border-4 border-[#92400e] bg-[#0a0e1a] relative flex items-center justify-center overflow-hidden shadow-inner">
                {/* Mystical Background Light Behind Doors */}
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(245,158,11,0.35)_0%,rgba(10,14,26,1)_70%)]" />

                {/* Left Door Panel with Classic Engravings */}
                <div
                  class={`absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-[#171d2b] via-[#131926] to-[#0f1420] border-r-2 border-amber-600/60 transition-transform ${
                    isDoorOpening() ? 'anim-door-left-open' : ''
                  }`}
                >
                  {/* Classical Royal Iron Straps & Relief Filigree */}
                  <div class="absolute top-[28%] left-0 right-0 h-3.5 bg-[#252f42] border-y border-amber-500/40 flex items-center justify-around px-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <div class="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  </div>
                  <div class="absolute top-[52%] left-0 right-0 h-3.5 bg-[#252f42] border-y border-amber-500/40 flex items-center justify-around px-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <div class="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  </div>
                  <div class="absolute top-[76%] left-0 right-0 h-3.5 bg-[#252f42] border-y border-amber-500/40 flex items-center justify-around px-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <div class="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  </div>
                </div>

                {/* Right Door Panel with Classic Engravings */}
                <div
                  class={`absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-[#171d2b] via-[#131926] to-[#0f1420] border-l-2 border-amber-600/60 transition-transform ${
                    isDoorOpening() ? 'anim-door-right-open' : ''
                  }`}
                >
                  <div class="absolute top-[28%] left-0 right-0 h-3.5 bg-[#252f42] border-y border-amber-500/40 flex items-center justify-around px-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <div class="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  </div>
                  <div class="absolute top-[52%] left-0 right-0 h-3.5 bg-[#252f42] border-y border-amber-500/40 flex items-center justify-around px-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <div class="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  </div>
                  <div class="absolute top-[76%] left-0 right-0 h-3.5 bg-[#252f42] border-y border-amber-500/40 flex items-center justify-around px-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <div class="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  </div>
                </div>

                {/* Center: Golden Letter 'B' with Royal Crown Logo (Door Trigger Button) */}
                <button
                  onClick={handleOpenDoor}
                  disabled={!isAllSocketed() || isDoorOpening()}
                  class={`z-30 w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-500 relative ${
                    isAllSocketed()
                      ? 'bg-gradient-to-b from-[#b45309] via-[#d97706] to-[#78350f] border-4 border-amber-300 shadow-[0_0_50px_rgba(245,158,11,0.95)] animate-pulse scale-105 hover:scale-110 cursor-pointer'
                      : 'bg-[#181d2a] border-2 border-amber-700/60 opacity-60 cursor-default'
                  }`}
                  title={isAllSocketed() ? 'Buka Pintu Sanctum' : 'Pasang semua relic untuk mengaktifkan'}
                >
                  {/* Royal Golden Crown atop B */}
                  <div class="text-xl sm:text-2xl leading-none -mb-1">
                    👑
                  </div>
                  {/* Imperial Golden Letter B */}
                  <span
                    class={`font-serif font-black text-2xl sm:text-3xl tracking-tight leading-none ${
                      isAllSocketed()
                        ? 'text-amber-100 drop-shadow-[0_2px_8px_rgba(254,240,138,0.8)]'
                        : 'text-amber-600/70'
                    }`}
                  >
                    B
                  </span>
                  <Show when={isAllSocketed()}>
                    <span class="absolute -bottom-2 px-2 py-0.5 rounded-full bg-amber-400 text-black text-[9px] font-mono font-bold tracking-widest uppercase shadow">
                      BUKA
                    </span>
                  </Show>
                </button>

                {/* 7 Carved Sockets on the Door Arch Matching Relief Silhouettes */}
                <For each={socketLayout}>
                  {slot => {
                    const isSocketed = () => socketedRelics().includes(slot.stage);

                    function handleDrop(e: DragEvent) {
                      e.preventDefault();
                      const droppedStage = e.dataTransfer?.getData('text/plain');
                      if (droppedStage && parseInt(droppedStage) === slot.stage) {
                        handleSocketRelic(slot.stage);
                      }
                    }

                    return (
                      <div
                        onDragOver={e => e.preventDefault()}
                        onDrop={handleDrop}
                        onClick={() => handleSocketRelic(slot.stage)}
                        class={`absolute ${slot.pos} z-20 cursor-pointer transition-all duration-300 transform hover:scale-110`}
                        title={`Socket ${slot.label}: Tempat Relic ${slot.stage}`}
                      >
                        <div
                          class={`w-13 h-13 sm:w-15 sm:h-15 w-[52px] h-[52px] flex items-center justify-center transition-all ${
                            isSocketed()
                              ? 'bg-amber-400/20 border-2 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.7)] rounded-full animate-scaleUp'
                              : 'bg-black/90 border-2 border-amber-700/60 hover:border-amber-400 shadow-inner rounded-full'
                          }`}
                        >
                          <Show
                            when={isSocketed()}
                            fallback={
                              <div class="w-full h-full p-1 flex items-center justify-center relative">
                                <svg viewBox="0 0 50 50" class="w-full h-full opacity-60">
                                  {slot.svgOutline}
                                </svg>
                                <span class="absolute text-[10px] font-mono font-bold text-amber-500/70">
                                  {slot.label}
                                </span>
                              </div>
                            }
                          >
                            <AncientRelicIcon stage={slot.stage} size={46} />
                          </Show>
                        </div>
                      </div>
                    );
                  }}
                </For>
              </div>
            </div>

            {/* Bottom: All 7 Relics in a SINGLE ROW (Full Desktop View, No Scroll) */}
            <div class="w-full max-w-4xl mt-3 p-2.5 rounded-2xl bg-[#0f1422]/90 border border-amber-600/40 backdrop-blur-md flex flex-row items-center justify-center gap-2 sm:gap-4 overflow-x-auto shadow-xl">
              <For each={CLUES_LIST}>
                {clue => {
                  const isInstalled = () => socketedRelics().includes(clue.stage);

                  function handleDragStart(e: DragEvent) {
                    if (isInstalled()) return;
                    setDraggedRelic(clue.stage);
                    e.dataTransfer?.setData('text/plain', clue.stage.toString());
                  }

                  return (
                    <div
                      draggable={!isInstalled()}
                      onDragStart={handleDragStart}
                      onClick={() => handleSocketRelic(clue.stage)}
                      class={`p-1.5 rounded-xl transition-all duration-300 flex flex-col items-center justify-center relative shrink-0 cursor-grab active:cursor-grabbing ${
                        isInstalled()
                          ? 'opacity-30 grayscale bg-black/40 border border-gray-800 scale-95 pointer-events-none'
                          : 'bg-gradient-to-b from-[#1c2438] to-[#101626] border-2 border-amber-400/60 hover:border-amber-300 hover:scale-105 shadow-[0_0_15px_rgba(245,158,11,0.25)] active:scale-95'
                      }`}
                      title={`Geser atau klik untuk pasang Relic ${clue.stage}`}
                    >
                      <AncientRelicIcon stage={clue.stage} size={64} />
                      <Show when={isInstalled()}>
                        <span class="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 text-black text-[9px] font-bold flex items-center justify-center">
                          ✓
                        </span>
                      </Show>
                    </div>
                  );
                }}
              </For>
            </div>
          </div>
        }
      >
        {/* Celebration Scene: Royal Gilded Plaque + Rolled Papyrus with B Seal Button (No Balloons, No Access Granted Text) */}
        <div class="w-full max-w-2xl mx-auto flex flex-col items-center justify-center py-2 animate-scaleUp">
          {/* Classic Royal Greeting Box with Ornate Kingdom Border */}
          <div
            class="w-full bg-gradient-to-b from-[#1c1829] via-[#120f1c] to-[#0a0710] border-4 border-[#b45309] rounded-3xl p-6 sm:p-10 shadow-[0_0_60px_rgba(217,119,6,0.4)] relative flex flex-col items-center text-center"
            style={{
              "box-shadow": "inset 0 0 40px rgba(180, 83, 9, 0.25), 0 0 50px rgba(0,0,0,0.8)",
            }}
          >
            {/* Royal Baroque Corner Flourishes */}
            <div class="absolute top-3 left-4 text-amber-400/60 text-lg select-none">⚜</div>
            <div class="absolute top-3 right-4 text-amber-400/60 text-lg select-none">⚜</div>
            <div class="absolute bottom-3 left-4 text-amber-400/60 text-lg select-none">⚜</div>
            <div class="absolute bottom-3 right-4 text-amber-400/60 text-lg select-none">⚜</div>

            {/* Imperial Golden Crown Seal */}
            <div class="w-16 h-16 rounded-full bg-amber-400/20 border-2 border-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.6)] flex items-center justify-center text-3xl mb-3 animate-pulse">
              👑
            </div>

            {/* Classical Royal Birthday Title */}
            <h1 class="text-2xl sm:text-4xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 tracking-wide mb-2 drop-shadow-[0_2px_12px_rgba(245,158,11,0.5)]">
              Selamat Ulang Tahun Ke-12, Bochi
            </h1>

            <div class="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-3" />

            {/* Heartfelt Royal Decree Message */}
            <div class="bg-black/40 border border-amber-500/30 rounded-2xl p-5 my-2 w-full max-w-lg shadow-inner">
              <p class="text-lg sm:text-xl text-amber-100/90 font-serif leading-relaxed italic">
                "Happy Birthday, Bochi!
                <br />
                My little partner in all things fun."
              </p>

              <div class="mt-4 pt-3 border-t border-amber-600/30 flex flex-col items-center">
                <span class="text-xs font-serif italic text-amber-300/80 mb-0.5">Love always,</span>
                <span class="text-xl sm:text-2xl font-serif font-bold text-amber-200 tracking-wider">
                  Mama Ley
                </span>
              </div>
            </div>

            {/* Rolled Papyrus Button (Only Rolled Scroll with Red Wax Seal 'B' Logo, No Text) */}
            <div class="mt-4 flex flex-col items-center">
              <RolledPapyrusButton onClick={() => setShowPapyrus(true)} />
            </div>

            {/* Exit / Return to Windows Button */}
            <div class="mt-4">
              <button
                onClick={handleExit}
                class="px-6 py-2.5 bg-white/90 hover:bg-white text-black font-mono font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95"
              >
                Selesai & Kembali ke Windows
              </button>
            </div>
          </div>
        </div>
      </Show>

      {/* Unrolled Papyrus Modal */}
      <PapyrusModal
        isOpen={showPapyrus()}
        onClose={() => setShowPapyrus(false)}
      />
    </div>
  );
}
