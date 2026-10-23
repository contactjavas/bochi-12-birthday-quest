import { onMount, onCleanup, For } from 'solid-js';
import { sound } from '../utils/sound';
import monogramB from '../../../images/monogram-b.png';

interface ILandingPageProps {
  onEnter: () => void;
}

const SPARKLES = [
  { top: '8%', left: '16%', delay: '0s', size: 'text-2xl' },
  { top: '14%', left: '82%', delay: '0.7s', size: 'text-lg' },
  { top: '38%', left: '8%', delay: '1.3s', size: 'text-sm' },
  { top: '42%', left: '90%', delay: '0.4s', size: 'text-xl' },
  { top: '68%', left: '14%', delay: '1.8s', size: 'text-lg' },
  { top: '74%', left: '84%', delay: '1s', size: 'text-2xl' },
  { top: '88%', left: '30%', delay: '2.1s', size: 'text-sm' },
  { top: '90%', left: '68%', delay: '0.2s', size: 'text-base' },
  { top: '24%', left: '50%', delay: '1.5s', size: 'text-sm' },
  { top: '55%', left: '3%', delay: '2.4s', size: 'text-base' },
];

export function LandingPage(props: ILandingPageProps) {
  onMount(() => {
    sound.startMorseLoop('I LOVE U BOCHI');
  });

  onCleanup(() => {
    sound.stopMorseLoop();
  });

  function handleEnter() {
    sound.playSuccess();
    props.onEnter();
  }

  return (
    <div
      class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090f] overflow-hidden select-none"
      onPointerDown={() => sound.startMorseLoop('I LOVE U BOCHI')}
    >
      {/* CRT Scanlines + Vignette */}
      <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40" />
      <div class="pointer-events-none absolute inset-0 shadow-[inset_0_0_140px_rgba(0,0,0,0.85)]" />

      {/* Rotating golden halo behind the monogram */}
      <div class="pointer-events-none absolute w-[560px] h-[560px] rounded-full border border-amber-500/15 anim-halo-spin">
        <div class="absolute -top-1 left-1/2 w-2 h-2 -translate-x-1/2 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(252,211,77,0.9)]" />
        <div class="absolute top-1/2 -left-1 w-1.5 h-1.5 -translate-y-1/2 rounded-full bg-amber-200/80 shadow-[0_0_10px_rgba(253,230,138,0.8)]" />
      </div>
      <div class="pointer-events-none absolute w-[440px] h-[440px] rounded-full border border-dashed border-amber-400/10 anim-halo-spin-reverse" />

      {/* Golden B Monogram with shimmering shine sweep */}
      <div class="relative animate-scaleUp">
        <img
          src={monogramB}
          alt="Golden B Monogram"
          class="w-[300px] sm:w-[380px] md:w-[440px] anim-gold-pulse pointer-events-none"
          draggable={false}
        />
        {/* Shine sweep masked to the monogram shape */}
        <div
          class="absolute inset-0 gold-shine-sweep pointer-events-none"
          style={{
            '-webkit-mask-image': `url(${monogramB})`,
            'mask-image': `url(${monogramB})`,
            '-webkit-mask-size': 'contain',
            'mask-size': 'contain',
            '-webkit-mask-repeat': 'no-repeat',
            'mask-repeat': 'no-repeat',
            '-webkit-mask-position': 'center',
            'mask-position': 'center',
          }}
        />
      </div>

      {/* Twinkling gold sparkles */}
      <For each={SPARKLES}>
        {s => (
          <span
            class={`absolute text-amber-200 anim-sparkle pointer-events-none ${s.size}`}
            style={{
              top: s.top,
              left: s.left,
              'animation-delay': s.delay,
              'text-shadow': '0 0 12px rgba(253, 230, 138, 0.9)',
            }}
          >
            ✦
          </span>
        )}
      </For>

      {/* Invitation text */}
      <p class="mt-8 text-lg sm:text-2xl font-classic italic tracking-wide text-amber-100/90 text-center px-6 animate-fadeIn" style={{ 'text-shadow': '0 0 24px rgba(251, 191, 36, 0.35)' }}>
        "Hey Bochi, are you ready to play?"
      </p>

      {/* Enter button */}
      <button
        onClick={handleEnter}
        class="mt-10 px-10 py-4 rounded-xl font-mono font-bold text-base sm:text-lg tracking-widest text-[#1a1206] bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 border border-amber-300/70 shadow-[0_0_30px_rgba(245,158,11,0.45)] hover:shadow-[0_0_45px_rgba(245,158,11,0.75)] hover:scale-105 active:scale-95 transition-all duration-200 animate-fadeIn"
      >
        YASSS, I'M IN!
      </button>

      <p class="mt-6 text-[10px] font-mono text-gray-600 tracking-[0.3em] uppercase animate-fadeIn">
        ⦿ Transmisi Morse Aktif ⦿
      </p>
    </div>
  );
}
