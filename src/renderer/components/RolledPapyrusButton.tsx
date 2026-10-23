import { sound } from '../utils/sound';

interface RolledPapyrusButtonProps {
  onClick: () => void;
}

// Rolled Papyrus Scroll with Crimson Wax Seal and Golden 'B' Logo
export function RolledPapyrusButton(props: RolledPapyrusButtonProps) {
  function handleClick() {
    sound.playPapyrusUnroll();
    props.onClick();
  }

  return (
    <button
      onClick={handleClick}
      class="group relative inline-flex items-center justify-center p-2 transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none"
      title="Buka Papyrus"
    >
      {/* Subtle glowing halo aura */}
      <div class="absolute inset-0 rounded-full bg-amber-400/20 blur-xl group-hover:bg-amber-400/40 transition-all duration-500 animate-pulse pointer-events-none" />

      {/* Golden B Monogram Seal overlaying the scroll center */}
      <img
        src="images/monogram-b.png"
        alt="Segel Monogram B"
        draggable={false}
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 sm:w-16 h-auto z-10 pointer-events-none drop-shadow-[0_2px_8px_rgba(120,72,10,0.6)]"
      />

      {/* Rolled Scroll SVG */}
      <svg viewBox="0 0 160 70" class="w-36 sm:w-44 h-auto drop-shadow-[0_8px_20px_rgba(217,119,6,0.5)]">
        <defs>
          <linearGradient id="scrollWood" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#451a03" />
            <stop offset="50%" stop-color="#78350f" />
            <stop offset="100%" stop-color="#451a03" />
          </linearGradient>
          <linearGradient id="parchmentRoll" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fef3c7" />
            <stop offset="30%" stop-color="#fde68a" />
            <stop offset="70%" stop-color="#d97706" />
            <stop offset="100%" stop-color="#92400e" />
          </linearGradient>
          <linearGradient id="goldCord" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#fef08a" />
            <stop offset="50%" stop-color="#eab308" />
            <stop offset="100%" stop-color="#ca8a04" />
          </linearGradient>
        </defs>

        {/* Left Wooden Spindle Finial */}
        <ellipse cx="14" cy="35" rx="5" ry="16" fill="url(#scrollWood)" stroke="#271104" stroke-width="1.5" />
        <circle cx="8" cy="35" r="4.5" fill="#ca8a04" stroke="#78350f" stroke-width="1" />

        {/* Right Wooden Spindle Finial */}
        <ellipse cx="146" cy="35" rx="5" ry="16" fill="url(#scrollWood)" stroke="#271104" stroke-width="1.5" />
        <circle cx="152" cy="35" r="4.5" fill="#ca8a04" stroke="#78350f" stroke-width="1" />

        {/* Main Rolled Parchment Cylinder */}
        <rect x="14" y="21" width="132" height="28" rx="4" fill="url(#parchmentRoll)" stroke="#854d0e" stroke-width="1.5" />
        
        {/* Curled Papyrus edge lines */}
        <path d="M 14 24 Q 80 20 146 24 M 14 46 Q 80 50 146 46" stroke="#fef3c7" stroke-width="1" fill="none" opacity="0.8" />
        <path d="M 14 30 Q 80 27 146 30" stroke="#b45309" stroke-width="0.8" fill="none" opacity="0.4" />
        <path d="M 14 40 Q 80 43 146 40" stroke="#78350f" stroke-width="0.8" fill="none" opacity="0.4" />

        {/* Golden Tying Ribbons / Cords */}
        <rect x="73" y="19" width="14" height="32" rx="2" fill="url(#goldCord)" stroke="#854d0e" stroke-width="1" />
        <path d="M 75 49 L 71 63 M 85 49 L 89 63" stroke="#eab308" stroke-width="2.5" stroke-linecap="round" />

      </svg>
    </button>
  );
}
