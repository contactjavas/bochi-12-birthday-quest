import { createSignal, For, Show, onMount } from 'solid-js';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
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
        colors: ['#f5d67b', '#d4a437', '#fff6cf', '#8a5f16', '#ffffff', '#1d3a5f'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random() * 0.3 + 0.65, y: Math.random() * 0.4 },
        colors: ['#f5d67b', '#d4a437', '#fff6cf', '#8a5f16', '#ffffff', '#1d3a5f'],
      });
    }, 280);
  }

  // Open the grand sanctum door via the glowing golden heart
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

  // 6 ring sockets on the door side pillars (3 left + 3 right) matching the door.png rings.
  // Positions are fractions of the door image (1024x1536). No relic numbers are shown —
  // only the engraved silhouette of the relic shape hints what belongs there.
  const socketLayout = [
    {
      stage: 1,
      pos: 'left-[10.5%] top-[32.2%]',
      svgOutline: (
        <g fill="none" stroke="#8a6a33" stroke-width="2" stroke-linejoin="round">
          <rect x="14" y="10" width="22" height="30" rx="3" />
          <path d="M18 19 H32 M18 25 H32 M18 31 H28" />
        </g>
      ),
    },
    {
      stage: 2,
      pos: 'left-[10.5%] top-[51.4%]',
      svgOutline: (
        <g fill="none" stroke="#8a6a33" stroke-width="2">
          <circle cx="18" cy="26" r="9" />
          <circle cx="34" cy="26" r="9" />
          <path d="M24 21 Q26 17 28 21" />
        </g>
      ),
    },
    {
      stage: 3,
      pos: 'left-[10.5%] top-[70.9%]',
      svgOutline: (
        <g fill="none" stroke="#8a6a33" stroke-width="2" stroke-linecap="round">
          <circle cx="25" cy="10" r="2.5" />
          <path d="M15 18 L25 12 L35 18" />
          <path d="M18 18 L17 33 M32 18 L33 33 M25 18 L25 33" />
          <path d="M15 35 Q25 40 35 35" />
        </g>
      ),
    },
    {
      stage: 4,
      pos: 'left-[86.5%] top-[32.2%]',
      svgOutline: (
        <g fill="none" stroke="#8a6a33" stroke-width="2" stroke-linecap="round">
          <rect x="13" y="13" width="24" height="24" rx="3" />
          <path d="M17 22 Q21 19 25 22 T33 22" />
          <path d="M17 28 Q21 25 25 28 T33 28" />
        </g>
      ),
    },
    {
      stage: 6,
      pos: 'left-[86.5%] top-[51.4%]',
      svgOutline: (
        <g fill="none" stroke="#8a6a33" stroke-width="2" stroke-linejoin="round">
          <path d="M15 38 L15 22 Q25 10 35 22 L35 38 Z" />
          <path d="M20 38 L20 24 Q25 16 30 24 L30 38" />
        </g>
      ),
    },
    {
      stage: 7,
      pos: 'left-[86.5%] top-[70.9%]',
      svgOutline: (
        <g fill="none" stroke="#8a6a33" stroke-width="2" stroke-linecap="round">
          <path d="M25 38 C16 36 12 27 14 17" />
          <path d="M25 38 C34 36 38 27 36 17" />
          <path d="M15 17 Q11 14 14 10 Q19 13 15 17 Z" />
          <path d="M35 17 Q39 14 36 10 Q31 13 35 17 Z" />
        </g>
      ),
    },
  ];

  // Side tray assignment — relics scattered on the left & right of the tall door,
  // the golden heart sits alone centered beneath it.
  const leftTrayStages = [1, 2, 3];
  const rightTrayStages = [4, 6, 7];

  function trayRelic(stageNum: number, tilt: string) {
    const isInstalled = () => socketedRelics().includes(stageNum);

    function handleDragStart(e: DragEvent) {
      if (isInstalled()) return;
      setDraggedRelic(stageNum);
      e.dataTransfer?.setData('text/plain', stageNum.toString());
    }

    return (
      <div
        draggable={!isInstalled()}
        onDragStart={handleDragStart}
        onClick={() => handleSocketRelic(stageNum)}
        class={`transition-all duration-300 relative shrink-0 ${tilt} ${
          isInstalled()
            ? 'opacity-25 grayscale scale-90 pointer-events-none'
            : 'cursor-grab active:cursor-grabbing hover:scale-110 active:scale-95 hover:drop-shadow-[0_0_22px_rgba(245,197,66,0.7)]'
        }`}
        title={`Geser atau klik untuk memasang Relic ${stageNum}`}
      >
        <AncientRelicIcon stage={stageNum} size={92} />
        <Show when={isInstalled()}>
          <span class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-black text-[10px] font-bold flex items-center justify-center shadow">
            ✓
          </span>
        </Show>
      </div>
    );
  }

  return (
    <div class="w-full max-w-6xl mx-auto flex flex-col justify-between py-1 select-none overflow-hidden max-h-[calc(100vh-80px)]">
      <Show
        when={isRevealed()}
        fallback={
          <div class="w-full flex items-stretch justify-center gap-1 sm:gap-4">
            {/* Left Relic Tray — vertically scattered golden relics */}
            <div class="flex flex-col items-center justify-center gap-6 sm:gap-8">
              {trayRelic(leftTrayStages[0], '-rotate-6 -translate-x-1')}
              {trayRelic(leftTrayStages[1], 'rotate-3 translate-x-2')}
              {trayRelic(leftTrayStages[2], '-rotate-3')}
            </div>

            {/* The Grand Sanctum Door (door.png) */}
            <div class="relative flex flex-col items-center">
              <div class="relative h-[68vh] max-h-[700px] min-h-[420px]">
                <img
                  src="/images/door.png"
                  alt="Pintu Sanctum"
                  draggable={false}
                  class={`h-full w-auto drop-shadow-[0_0_45px_rgba(217,145,42,0.35)] transition-all duration-[2200ms] ${
                    isDoorOpening() ? 'scale-[1.06] brightness-150' : ''
                  }`}
                />

                {/* Golden light burst when the door opens */}
                <Show when={isDoorOpening()}>
                  <div class="absolute inset-0 z-40 anim-sanctum-glow pointer-events-none bg-[radial-gradient(circle_at_50%_42%,rgba(255,232,150,0.98)_0%,rgba(255,196,64,0.55)_40%,transparent_72%)]" />
                </Show>

                {/* Heart Relic Socket — heart-shaped inlay under the crown (no ring) */}
                {(() => {
                  const isHeartSocketed = () => socketedRelics().includes(5);

                  function handleHeartDrop(e: DragEvent) {
                    e.preventDefault();
                    const droppedStage = e.dataTransfer?.getData('text/plain');
                    if (droppedStage && parseInt(droppedStage) === 5) {
                      handleSocketRelic(5);
                    }
                  }

                  function handleHeartClick() {
                    if (isAllSocketed()) {
                      handleOpenDoor();
                    } else {
                      handleSocketRelic(5);
                    }
                  }

                  return (
                    <div
                      onDragOver={e => e.preventDefault()}
                      onDrop={handleHeartDrop}
                      onClick={handleHeartClick}
                      class="absolute left-[50%] top-[13.9%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer w-[17%] aspect-square"
                      title={
                        isAllSocketed()
                          ? 'Jantung Sanctum menyala — klik untuk membuka!'
                          : 'Tempat Relic Hati'
                      }
                    >
                      <Show
                        when={isHeartSocketed()}
                        fallback={
                          <div class="w-full h-full flex items-center justify-center opacity-60 hover:opacity-90 hover:scale-110 transition-all">
                            <svg viewBox="0 0 50 50" class="w-[55%] h-[55%]">
                              <path
                                d="M 25 40 C 22 36 10 27 10 18 C 10 11 16 8 21 11 C 23 12 25 15 25 15 C 25 15 27 12 29 11 C 34 8 40 11 40 18 C 40 27 28 36 25 40 Z"
                                fill="none"
                                stroke="#8a6a33"
                                stroke-width="1.8"
                                stroke-dasharray="3,2"
                              />
                            </svg>
                          </div>
                        }
                      >
                        {/* The socketed heart blazes as the final trigger once all relics are placed */}
                        <div
                          class={`w-full h-full relative transition-all duration-700 ${
                            isAllSocketed() ? 'scale-125' : ''
                          }`}
                        >
                          {/* Blazing golden halo behind the heart when door is ready */}
                          <Show when={isAllSocketed()}>
                            <div class="absolute -inset-[60%] rounded-full bg-[radial-gradient(circle,rgba(255,246,190,0.95)_0%,rgba(255,215,90,0.75)_35%,rgba(255,170,30,0.35)_60%,transparent_75%)] animate-pulse pointer-events-none" />
                          </Show>
                          <div
                            class={`w-full h-full relative ${
                              isAllSocketed()
                                ? 'animate-pulse drop-shadow-[0_0_45px_rgba(255,235,150,1)] drop-shadow-[0_0_90px_rgba(255,190,50,0.95)] brightness-125'
                                : 'drop-shadow-[0_0_10px_rgba(217,145,42,0.6)]'
                            }`}
                          >
                            <AncientRelicIcon stage={5} size="100%" glow={isAllSocketed()} />
                          </div>
                        </div>
                      </Show>
                    </div>
                  );
                })()}

                {/* 6 Ring Sockets on the door side pillars */}
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
                        class={`absolute ${slot.pos} -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer w-[11.5%] aspect-square transition-all duration-300`}
                        title={`Tempat Relic ${slot.stage}`}
                      >
                        <Show
                          when={isSocketed()}
                          fallback={
                            <div class="w-full h-full flex items-center justify-center opacity-70 hover:opacity-100 hover:scale-110 transition-all">
                              <svg viewBox="0 0 50 50" class="w-[52%] h-[52%]">
                                {slot.svgOutline}
                              </svg>
                            </div>
                          }
                        >
                          <div class="w-full h-full animate-scaleUp">
                            <AncientRelicIcon stage={slot.stage} size="100%" />
                          </div>
                        </Show>
                      </div>
                    );
                  }}
                </For>
              </div>

              {/* Heart Relic — placed alone, centered below the door */}
              <div class="mt-3 flex items-center justify-center gap-2">
                {trayRelic(5, 'rotate-2')}
              </div>
            </div>

            {/* Right Relic Tray — vertically scattered golden relics */}
            <div class="flex flex-col items-center justify-center gap-6 sm:gap-8">
              {trayRelic(rightTrayStages[0], 'rotate-6 translate-x-1')}
              {trayRelic(rightTrayStages[1], '-rotate-3 -translate-x-2')}
              {trayRelic(rightTrayStages[2], 'rotate-3')}
            </div>
          </div>
        }
      >
        {/* Celebration Scene — full-screen royal navy & gold floral backdrop */}
        <div
          class="fixed inset-0 z-40 flex flex-col items-center justify-center text-center px-6 pb-24 animate-fadeIn"
          style={{
            'background-image': "url('/images/background-end.png')",
            'background-size': '100% 100%',
            'background-position': 'center',
          }}
        >
          {/* Golden B Monogram */}
          <img
            src="/images/monogram-b.png"
            alt="Monogram B"
            draggable={false}
            class="h-28 sm:h-36 w-auto drop-shadow-[0_6px_24px_rgba(212,164,55,0.55)] mb-2 animate-scaleUp"
          />

          {/* Classical Royal Birthday Title */}
          <h1 class="font-classic text-2xl sm:text-4xl font-bold text-[#f5d67b] tracking-[0.12em] drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
            Selamat Ulang Tahun Ke-12, Bochi
          </h1>

          <div class="w-32 h-px bg-gradient-to-r from-transparent via-[#d4a437] to-transparent my-4" />

          {/* Heartfelt Royal Decree Message */}
          <p class="font-classic text-lg sm:text-2xl text-[#f8e8b8] italic leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            "Happy Birthday, Bochi!
            <br />
            My little partner in all things fun and silly."
          </p>

          <div class="mt-5 flex flex-col items-center">
            <span class="font-classic text-sm italic text-[#d4a437]">Love always,</span>
            <span class="font-classic text-2xl sm:text-3xl font-bold text-[#f5d67b] tracking-widest drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
              Mama Ley
            </span>
          </div>

          {/* Rolled Papyrus Button (with B monogram seal) */}
          <div class="mt-5 flex flex-col items-center">
            <RolledPapyrusButton onClick={() => setShowPapyrus(true)} />
          </div>

          {/* Golden Metal "Selesai" Button — anchored to the bottom, away from the papyrus */}
          <div class="absolute bottom-8 left-1/2 -translate-x-1/2">
            <button
              onClick={handleExit}
              class="font-classic px-10 py-3 rounded-full text-base sm:text-lg font-bold tracking-[0.2em] uppercase text-[#3d2a05] transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background:
                  'linear-gradient(180deg, #fdf0b3 0%, #e7c25a 32%, #b8860b 50%, #8a5f16 53%, #d4a437 100%)',
                border: '2px solid #6e4a0e',
                'box-shadow':
                  'inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -3px 6px rgba(0,0,0,0.35), 0 6px 18px rgba(0,0,0,0.55)',
                'text-shadow': '0 1px 0 rgba(255,240,180,0.7)',
              }}
            >
              Selesai
            </button>
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
