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
          <radialGradient id="waxSeal" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#ef4444" />
            <stop offset="40%" stop-color="#b91c1c" />
            <stop offset="85%" stop-color="#7f1d1d" />
            <stop offset="100%" stop-color="#450a0a" />
          </radialGradient>
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

        {/* Center Crimson Wax Seal with Irregular Edges */}
        <g transform="translate(80, 35)">
          {/* Melted wax rim */}
          <circle cx="0" cy="0" r="17" fill="url(#waxSeal)" stroke="#5c0d0d" stroke-width="1.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))" />
          <circle cx="0" cy="0" r="14" fill="none" stroke="#f87171" stroke-width="0.8" stroke-dasharray="3,1" opacity="0.6" />

          {/* Tiny Golden Crown atop B */}
          <path d="M -5 -7 L -4 -11 L 0 -9 L 4 -11 L 5 -7 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="0.5" />

          {/* Golden Embossed Letter 'B' */}
          <text
            x="0"
            y="5"
            font-family="'Cinzel', 'Times New Roman', serif"
            font-size="14"
            font-weight="900"
            fill="#fef08a"
            stroke="#ca8a04"
            stroke-width="0.6"
            text-anchor="middle"
            dominant-baseline="central"
          >
            B
          </text>
        </g>
      </svg>
    </button>
  );
}
