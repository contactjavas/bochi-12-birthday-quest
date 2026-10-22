import { JSX } from 'solid-js';

interface AncientRelicIconProps {
  stage: number;
  size?: number | string;
  class?: string;
  glow?: boolean;
}

export function AncientRelicIcon(props: AncientRelicIconProps): JSX.Element {
  const size = () => props.size || 64;
  const glow = () => props.glow !== false;

  return (
    <div
      class={`inline-flex items-center justify-center relative select-none ${props.class || ''}`}
      style={{
        width: typeof size() === 'number' ? `${size()}px` : size(),
        height: typeof size() === 'number' ? `${size()}px` : size(),
      }}
    >
      {/* Relic 1: Royal Silk Scroll / Velvet Parchment of Eldoria ("Rectangle putih dan lembut") */}
      {props.stage === 1 && (
        <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-[0_4px_12px_rgba(217,119,6,0.35)]">
          <defs>
            <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fef08a" />
              <stop offset="50%" stop-color="#d97706" />
              <stop offset="100%" stop-color="#78350f" />
            </linearGradient>
            <linearGradient id="ivoryGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="50%" stop-color="#f8fafc" />
              <stop offset="100%" stop-color="#e2e8f0" />
            </linearGradient>
            <filter id="relicGlow1" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* Outer Ancient Medallion Base */}
          <circle cx="50" cy="50" r="46" fill="#1e182e" stroke="url(#goldGrad1)" stroke-width="3" />
          <circle cx="50" cy="50" r="41" fill="none" stroke="#d97706" stroke-width="1" stroke-dasharray="3,2" />
          {/* Heraldic Fleur-de-lis Ornaments at Cardinal Points */}
          <path d="M50 11 L53 16 L47 16 Z M50 89 L53 84 L47 84 Z M11 50 L16 53 L16 47 Z M89 50 L84 53 L84 47 Z" fill="#fef08a" />
          {/* The White Soft Royal Parchment / Velvet Rectangle */}
          <rect x="25" y="24" width="50" height="52" rx="6" fill="url(#ivoryGrad1)" stroke="url(#goldGrad1)" stroke-width="2.5" />
          {/* Delicate Silk/Parchment Embossing Lines */}
          <path d="M30 33 Q50 31 70 33 M30 42 Q50 40 70 42 M30 51 Q50 49 70 51 M30 60 Q50 58 70 60" stroke="#cbd5e1" stroke-width="1.5" stroke-linecap="round" />
          {/* Royal Red Wax Seal */}
          <circle cx="50" cy="65" r="7" fill="#dc2626" stroke="#991b1b" stroke-width="1.5" />
          <path d="M47 65 L53 65 M50 62 L50 68" stroke="#fef08a" stroke-width="1.2" stroke-linecap="round" />
          {/* Crown Emblem on Parchment */}
          <path d="M42 28 L44 32 L47 29 L50 33 L53 29 L56 32 L58 28 L57 34 L43 34 Z" fill="url(#goldGrad1)" />
        </svg>
      )}

      {/* Relic 2: Ancient Twin Celestial Spheres / Royal Brass Spectacle ("double round") */}
      {props.stage === 2 && (
        <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-[0_4px_12px_rgba(217,119,6,0.35)]">
          <defs>
            <linearGradient id="brassGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fef08a" />
              <stop offset="40%" stop-color="#eab308" />
              <stop offset="80%" stop-color="#b45309" />
              <stop offset="100%" stop-color="#713f12" />
            </linearGradient>
            <radialGradient id="lensGlow2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.6" />
              <stop offset="70%" stop-color="#0284c7" stop-opacity="0.3" />
              <stop offset="100%" stop-color="#0c4a6e" stop-opacity="0.8" />
            </radialGradient>
          </defs>
          {/* Outer Ancient Medallion Base */}
          <circle cx="50" cy="50" r="46" fill="#18232c" stroke="url(#brassGrad2)" stroke-width="3" />
          <circle cx="50" cy="50" r="41" fill="none" stroke="#ca8a04" stroke-width="1" stroke-dasharray="4,2" />
          {/* Ornate Bridge between the twin rounds */}
          <path d="M41 50 Q50 43 59 50" fill="none" stroke="url(#brassGrad2)" stroke-width="3.5" stroke-linecap="round" />
          <circle cx="50" cy="46" r="2.5" fill="#fef08a" />
          {/* Left Lens / Circle */}
          <circle cx="33" cy="50" r="16" fill="url(#lensGlow2)" stroke="url(#brassGrad2)" stroke-width="3" />
          <circle cx="33" cy="50" r="11" fill="none" stroke="#38bdf8" stroke-width="1" stroke-opacity="0.5" />
          <path d="M28 44 Q33 41 38 45" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" opacity="0.8" />
          {/* Right Lens / Circle */}
          <circle cx="67" cy="50" r="16" fill="url(#lensGlow2)" stroke="url(#brassGrad2)" stroke-width="3" />
          <circle cx="67" cy="50" r="11" fill="none" stroke="#38bdf8" stroke-width="1" stroke-opacity="0.5" />
          <path d="M62 44 Q67 41 72 45" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" opacity="0.8" />
          {/* Ancient Ornamental Side Flourishes */}
          <path d="M17 50 Q13 46 12 40 M83 50 Q87 46 88 40" fill="none" stroke="url(#brassGrad2)" stroke-width="2" stroke-linecap="round" />
        </svg>
      )}

      {/* Relic 3: Gothic Cathedral Lantern of Sacred Light ("lighted nest") */}
      {props.stage === 3 && (
        <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-[0_4px_12px_rgba(245,158,11,0.4)]">
          <defs>
            <linearGradient id="goldGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fde047" />
              <stop offset="50%" stop-color="#eab308" />
              <stop offset="100%" stop-color="#854d0e" />
            </linearGradient>
            <radialGradient id="fireGlow3" cx="50%" cy="55%" r="45%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="25%" stop-color="#fef08a" />
              <stop offset="60%" stop-color="#f97316" />
              <stop offset="100%" stop-color="#7c2d12" stop-opacity="0" />
            </radialGradient>
          </defs>
          {/* Outer Ancient Medallion Base */}
          <circle cx="50" cy="50" r="46" fill="#261a14" stroke="url(#goldGrad3)" stroke-width="3" />
          <circle cx="50" cy="50" r="41" fill="none" stroke="#eab308" stroke-width="1" stroke-dasharray="3,3" />
          {/* Glowing Aura inside the nest */}
          <circle cx="50" cy="52" r="22" fill="url(#fireGlow3)" />
          {/* Gothic Spire / Suspension Ring */}
          <circle cx="50" cy="18" r="4" fill="none" stroke="url(#goldGrad3)" stroke-width="2" />
          <path d="M46 22 L50 16 L54 22 Z" fill="url(#goldGrad3)" />
          {/* Cathedral Lantern Roof */}
          <path d="M34 32 L50 24 L66 32 L60 36 L40 36 Z" fill="url(#goldGrad3)" stroke="#78350f" stroke-width="1" />
          {/* Lantern Cage / Woven Nest Pillars */}
          <path d="M38 36 L36 64 L40 68 M62 36 L64 64 L60 68 M50 36 L50 68" stroke="url(#goldGrad3)" stroke-width="2.5" fill="none" stroke-linecap="round" />
          {/* Woven Nest Base */}
          <path d="M32 66 Q50 76 68 66 L64 72 Q50 78 36 72 Z" fill="url(#goldGrad3)" stroke="#78350f" stroke-width="1" />
          {/* Radiating Light Rays */}
          <line x1="50" y1="36" x2="50" y2="30" stroke="#fef08a" stroke-width="2" stroke-linecap="round" />
          <line x1="33" y1="45" x2="27" y2="42" stroke="#fef08a" stroke-width="2" stroke-linecap="round" />
          <line x1="67" y1="45" x2="73" y2="42" stroke="#fef08a" stroke-width="2" stroke-linecap="round" />
        </svg>
      )}

      {/* Relic 4: Medieval Aquamarine Square Seal of Northern Tides ("watery square") */}
      {props.stage === 4 && (
        <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-[0_4px_12px_rgba(6,182,212,0.4)]">
          <defs>
            <linearGradient id="silverGold4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f8fafc" />
              <stop offset="35%" stop-color="#cbd5e1" />
              <stop offset="70%" stop-color="#eab308" />
              <stop offset="100%" stop-color="#78350f" />
            </linearGradient>
            <radialGradient id="waterPool4" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#67e8f9" />
              <stop offset="45%" stop-color="#06b6d4" />
              <stop offset="85%" stop-color="#0e7490" />
              <stop offset="100%" stop-color="#164e63" />
            </radialGradient>
          </defs>
          {/* Outer Ancient Medallion Base */}
          <circle cx="50" cy="50" r="46" fill="#0f232e" stroke="url(#silverGold4)" stroke-width="3" />
          <circle cx="50" cy="50" r="41" fill="none" stroke="#06b6d4" stroke-width="1" stroke-dasharray="2,2" />
          {/* Medieval Carved Square Bezel */}
          <rect x="25" y="25" width="50" height="50" rx="6" fill="#155e75" stroke="url(#silverGold4)" stroke-width="3" />
          {/* Inner Aquamarine Pool */}
          <rect x="30" y="30" width="40" height="40" rx="3" fill="url(#waterPool4)" />
          {/* Water Ripples and Waves */}
          <path d="M34 44 Q42 39 50 44 T66 44" fill="none" stroke="#e0f2fe" stroke-width="2" stroke-linecap="round" />
          <path d="M34 52 Q42 47 50 52 T66 52" fill="none" stroke="#e0f2fe" stroke-width="2" stroke-linecap="round" />
          <path d="M34 60 Q42 55 50 60 T66 60" fill="none" stroke="#e0f2fe" stroke-width="1.5" stroke-linecap="round" opacity="0.8" />
          {/* Ornate Corner Claws */}
          <circle cx="27" cy="27" r="3" fill="#fef08a" stroke="#854d0e" stroke-width="1" />
          <circle cx="73" cy="27" r="3" fill="#fef08a" stroke="#854d0e" stroke-width="1" />
          <circle cx="27" cy="73" r="3" fill="#fef08a" stroke="#854d0e" stroke-width="1" />
          <circle cx="73" cy="73" r="3" fill="#fef08a" stroke="#854d0e" stroke-width="1" />
        </svg>
      )}

      {/* Relic 5: Baroque Royal Crimson Heart Medallion ("calm heart") */}
      {props.stage === 5 && (
        <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-[0_4px_14px_rgba(239,68,68,0.45)]">
          <defs>
            <linearGradient id="royalGold5" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fef08a" />
              <stop offset="50%" stop-color="#eab308" />
              <stop offset="100%" stop-color="#78350f" />
            </linearGradient>
            <radialGradient id="rubyGlow5" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#fca5a5" />
              <stop offset="35%" stop-color="#ef4444" />
              <stop offset="80%" stop-color="#991b1b" />
              <stop offset="100%" stop-color="#450a0a" />
            </radialGradient>
          </defs>
          {/* Outer Ancient Medallion Base */}
          <circle cx="50" cy="50" r="46" fill="#2d151c" stroke="url(#royalGold5)" stroke-width="3" />
          <circle cx="50" cy="50" r="41" fill="none" stroke="#f43f5e" stroke-width="1" stroke-dasharray="3,2" />
          {/* Baroque Crown on Top of Heart */}
          <path d="M42 27 L45 22 L50 25 L55 22 L58 27 L56 31 L44 31 Z" fill="url(#royalGold5)" stroke="#78350f" stroke-width="0.8" />
          {/* Golden Filigree Wings / Ribbons Framing the Heart */}
          <path d="M22 45 C20 38 27 34 35 38 C32 46 34 56 42 63" fill="none" stroke="url(#royalGold5)" stroke-width="2.5" stroke-linecap="round" />
          <path d="M78 45 C80 38 73 34 65 38 C68 46 66 56 58 63" fill="none" stroke="url(#royalGold5)" stroke-width="2.5" stroke-linecap="round" />
          {/* Imperial Ruby Heart Jewel */}
          <path
            d="M50 74 C47 71 30 58 30 43 C30 35 38 31 45 35 C48 37 50 40 50 40 C50 40 52 37 55 35 C62 31 70 35 70 43 C70 58 53 71 50 74 Z"
            fill="url(#rubyGlow5)"
            stroke="url(#royalGold5)"
            stroke-width="2.5"
          />
          {/* Jewel Facet Reflection */}
          <path d="M36 40 C34 44 35 48 38 52" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.75" />
          <circle cx="50" cy="48" r="2" fill="#fef08a" />
        </svg>
      )}

      {/* Relic 6: Gothic Cathedral Royal Arch Portal Keystone ("Arched rectangle") */}
      {props.stage === 6 && (
        <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-[0_4px_12px_rgba(217,119,6,0.35)]">
          <defs>
            <linearGradient id="bronzeGold6" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fde047" />
              <stop offset="50%" stop-color="#d97706" />
              <stop offset="100%" stop-color="#713f12" />
            </linearGradient>
            <linearGradient id="stoneArch6" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#334155" />
              <stop offset="100%" stop-color="#0f172a" />
            </linearGradient>
          </defs>
          {/* Outer Ancient Medallion Base */}
          <circle cx="50" cy="50" r="46" fill="#1a1c29" stroke="url(#bronzeGold6)" stroke-width="3" />
          <circle cx="50" cy="50" r="41" fill="none" stroke="#d97706" stroke-width="1" stroke-dasharray="4,2" />
          {/* The Arched Rectangle Gothic Portal */}
          <path
            d="M32 74 L32 44 Q50 18 68 44 L68 74 Z"
            fill="url(#stoneArch6)"
            stroke="url(#bronzeGold6)"
            stroke-width="3.5"
            stroke-linejoin="round"
          />
          {/* Inner Archway Moldings */}
          <path
            d="M38 74 L38 47 Q50 26 62 47 L62 74"
            fill="none"
            stroke="url(#bronzeGold6)"
            stroke-width="1.8"
          />
          {/* Sacred Keystone at the apex */}
          <path d="M46 25 L54 25 L56 33 L44 33 Z" fill="url(#bronzeGold6)" stroke="#78350f" stroke-width="1" />
          {/* Cathedral Rose Window Trefoil inside Arch */}
          <circle cx="50" cy="46" r="6" fill="#0284c7" stroke="url(#bronzeGold6)" stroke-width="1.5" />
          <path d="M50 40 L50 52 M44 46 L56 46" stroke="#fef08a" stroke-width="1" />
          {/* Portal Base Step */}
          <rect x="28" y="73" width="44" height="4" rx="1.5" fill="url(#bronzeGold6)" />
        </svg>
      )}

      {/* Relic 7: Imperial Roman / Celtic Golden Laurel Wreath Foliage ("organic shape") */}
      {props.stage === 7 && (
        <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-[0_4px_12px_rgba(34,197,94,0.35)]">
          <defs>
            <linearGradient id="emeraldGold7" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fef08a" />
              <stop offset="50%" stop-color="#22c55e" />
              <stop offset="100%" stop-color="#14532d" />
            </linearGradient>
            <linearGradient id="pureGold7" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fef08a" />
              <stop offset="50%" stop-color="#eab308" />
              <stop offset="100%" stop-color="#854d0e" />
            </linearGradient>
          </defs>
          {/* Outer Ancient Medallion Base */}
          <circle cx="50" cy="50" r="46" fill="#13231b" stroke="url(#pureGold7)" stroke-width="3" />
          <circle cx="50" cy="50" r="41" fill="none" stroke="#22c55e" stroke-width="1" stroke-dasharray="3,2" />
          {/* Central Sacred Emerald Gem */}
          <circle cx="50" cy="50" r="10" fill="#15803d" stroke="url(#pureGold7)" stroke-width="2" />
          <circle cx="50" cy="50" r="4" fill="#86efac" />
          {/* Left Branch of Golden Laurel Leaves */}
          <path d="M50 72 C32 70 24 55 26 38 C28 30 35 24 44 22" fill="none" stroke="url(#pureGold7)" stroke-width="2.5" stroke-linecap="round" />
          {/* Left Leaves */}
          <path d="M26 38 Q22 32 30 30 Q33 36 26 38 Z" fill="url(#emeraldGold7)" stroke="#854d0e" stroke-width="0.8" />
          <path d="M27 48 Q21 44 26 40 Q31 45 27 48 Z" fill="url(#emeraldGold7)" stroke="#854d0e" stroke-width="0.8" />
          <path d="M33 59 Q26 58 30 52 Q36 56 33 59 Z" fill="url(#emeraldGold7)" stroke="#854d0e" stroke-width="0.8" />
          <path d="M42 68 Q36 71 38 64 Q45 66 42 68 Z" fill="url(#emeraldGold7)" stroke="#854d0e" stroke-width="0.8" />
          {/* Right Branch of Golden Laurel Leaves */}
          <path d="M50 72 C68 70 76 55 74 38 C72 30 65 24 56 22" fill="none" stroke="url(#pureGold7)" stroke-width="2.5" stroke-linecap="round" />
          {/* Right Leaves */}
          <path d="M74 38 Q78 32 70 30 Q67 36 74 38 Z" fill="url(#emeraldGold7)" stroke="#854d0e" stroke-width="0.8" />
          <path d="M73 48 Q79 44 74 40 Q69 45 73 48 Z" fill="url(#emeraldGold7)" stroke="#854d0e" stroke-width="0.8" />
          <path d="M67 59 Q74 58 70 52 Q64 56 67 59 Z" fill="url(#emeraldGold7)" stroke="#854d0e" stroke-width="0.8" />
          <path d="M58 68 Q64 71 62 64 Q55 66 58 68 Z" fill="url(#emeraldGold7)" stroke="#854d0e" stroke-width="0.8" />
          {/* Golden Ribbon Knot at base */}
          <circle cx="50" cy="72" r="3" fill="#fef08a" stroke="#854d0e" stroke-width="1" />
          <path d="M47 74 L42 81 M53 74 L58 81" stroke="url(#pureGold7)" stroke-width="2" stroke-linecap="round" />
        </svg>
      )}
    </div>
  );
}
