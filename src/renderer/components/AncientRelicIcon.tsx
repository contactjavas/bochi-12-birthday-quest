import { JSX } from 'solid-js';

interface AncientRelicIconProps {
  stage: number;
  size?: number | string;
  class?: string;
  glow?: boolean;
}

// Golden metal relics: embossed gold medallion with a carved/engraved emblem in the center.
// Relic 5 (the heart) is intentionally rendered WITHOUT the medallion circle so it can be
// slotted into the heart-shaped inlay at the top of the Sanctum door.
export function AncientRelicIcon(props: AncientRelicIconProps): JSX.Element {
  const size = () => props.size || 64;
  const glow = () => props.glow !== false;

  const engraveLight = '#fbe9ac';
  const engraveDark = '#6e4a0e';

  return (
    <div
      class={`inline-flex items-center justify-center relative select-none ${props.class || ''}`}
      style={{
        width: typeof size() === 'number' ? `${size()}px` : size(),
        height: typeof size() === 'number' ? `${size()}px` : size(),
      }}
    >
      {/* Relic 1: Engraved Parchment / Soft Rectangle ("Rectangle putih dan lembut") */}
      {props.stage === 1 && (
        <svg viewBox="0 0 100 100" class={`w-full h-full ${glow() ? 'drop-shadow-[0_4px_12px_rgba(217,145,42,0.45)]' : ''}`}>
          <defs>
            <radialGradient id="r1face" cx="38%" cy="30%" r="85%">
              <stop offset="0%" stop-color="#fff6cf" />
              <stop offset="40%" stop-color="#eec964" />
              <stop offset="78%" stop-color="#b8860b" />
              <stop offset="100%" stop-color="#77510f" />
            </radialGradient>
            <linearGradient id="r1rim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#f9e79a" />
              <stop offset="45%" stop-color="#caa03a" />
              <stop offset="55%" stop-color="#8a5f16" />
              <stop offset="100%" stop-color="#5e3f0b" />
            </linearGradient>
          </defs>
          {/* Raised outer rim + polished face */}
          <circle cx="50" cy="50" r="47" fill="url(#r1rim)" />
          <circle cx="50" cy="50" r="40" fill="url(#r1face)" stroke="#6e4a0e" stroke-width="1" />
          <circle cx="50" cy="50" r="33.5" fill="none" stroke="#8a5f16" stroke-width="1" stroke-dasharray="2,3" opacity="0.8" />
          {/* Metallic sheen */}
          <path d="M16 38 Q26 18 50 13 Q30 20 20 42 Z" fill="#ffffff" opacity="0.28" />
          {/* Engraved soft rectangle / parchment carving */}
          <g fill="none" stroke={engraveLight} stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" transform="translate(-0.6,-0.8)" opacity="0.9">
            <rect x="31" y="30" width="38" height="42" rx="5" />
            <path d="M37 42 H63 M37 51 H63 M37 60 H57" />
          </g>
          <g fill="none" stroke={engraveDark} stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
            <rect x="31" y="30" width="38" height="42" rx="5" />
            <path d="M37 42 H63 M37 51 H63 M37 60 H57" />
          </g>
        </svg>
      )}

      {/* Relic 2: Engraved Twin Rounds / Spectacles ("double round") */}
      {props.stage === 2 && (
        <svg viewBox="0 0 100 100" class={`w-full h-full ${glow() ? 'drop-shadow-[0_4px_12px_rgba(217,145,42,0.45)]' : ''}`}>
          <defs>
            <radialGradient id="r2face" cx="38%" cy="30%" r="85%">
              <stop offset="0%" stop-color="#fff6cf" />
              <stop offset="40%" stop-color="#eec964" />
              <stop offset="78%" stop-color="#b8860b" />
              <stop offset="100%" stop-color="#77510f" />
            </radialGradient>
            <linearGradient id="r2rim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#f9e79a" />
              <stop offset="45%" stop-color="#caa03a" />
              <stop offset="55%" stop-color="#8a5f16" />
              <stop offset="100%" stop-color="#5e3f0b" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="47" fill="url(#r2rim)" />
          <circle cx="50" cy="50" r="40" fill="url(#r2face)" stroke="#6e4a0e" stroke-width="1" />
          <circle cx="50" cy="50" r="33.5" fill="none" stroke="#8a5f16" stroke-width="1" stroke-dasharray="2,3" opacity="0.8" />
          <path d="M16 38 Q26 18 50 13 Q30 20 20 42 Z" fill="#ffffff" opacity="0.28" />
          <g fill="none" stroke={engraveLight} stroke-width="2.6" stroke-linecap="round" transform="translate(-0.6,-0.8)" opacity="0.9">
            <circle cx="36" cy="53" r="12.5" />
            <circle cx="64" cy="53" r="12.5" />
            <path d="M44 47 Q50 41 56 47" />
          </g>
          <g fill="none" stroke={engraveDark} stroke-width="2.6" stroke-linecap="round">
            <circle cx="36" cy="53" r="12.5" />
            <circle cx="64" cy="53" r="12.5" />
            <path d="M44 47 Q50 41 56 47" />
          </g>
        </svg>
      )}

      {/* Relic 3: Engraved Cathedral Lantern ("lighted nest") */}
      {props.stage === 3 && (
        <svg viewBox="0 0 100 100" class={`w-full h-full ${glow() ? 'drop-shadow-[0_4px_12px_rgba(217,145,42,0.45)]' : ''}`}>
          <defs>
            <radialGradient id="r3face" cx="38%" cy="30%" r="85%">
              <stop offset="0%" stop-color="#fff6cf" />
              <stop offset="40%" stop-color="#eec964" />
              <stop offset="78%" stop-color="#b8860b" />
              <stop offset="100%" stop-color="#77510f" />
            </radialGradient>
            <linearGradient id="r3rim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#f9e79a" />
              <stop offset="45%" stop-color="#caa03a" />
              <stop offset="55%" stop-color="#8a5f16" />
              <stop offset="100%" stop-color="#5e3f0b" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="47" fill="url(#r3rim)" />
          <circle cx="50" cy="50" r="40" fill="url(#r3face)" stroke="#6e4a0e" stroke-width="1" />
          <circle cx="50" cy="50" r="33.5" fill="none" stroke="#8a5f16" stroke-width="1" stroke-dasharray="2,3" opacity="0.8" />
          <path d="M16 38 Q26 18 50 13 Q30 20 20 42 Z" fill="#ffffff" opacity="0.28" />
          <g fill="none" stroke={engraveLight} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" transform="translate(-0.6,-0.8)" opacity="0.9">
            <circle cx="50" cy="31" r="3.5" />
            <path d="M35 41 L50 33 L65 41" />
            <path d="M39 41 L38 61 M61 41 L62 61 M50 41 L50 61" />
            <path d="M35 63 Q50 70 65 63" />
            <path d="M50 58 Q47.5 54 50 49 Q52.5 54 50 58 Z" />
          </g>
          <g fill="none" stroke={engraveDark} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="50" cy="31" r="3.5" />
            <path d="M35 41 L50 33 L65 41" />
            <path d="M39 41 L38 61 M61 41 L62 61 M50 41 L50 61" />
            <path d="M35 63 Q50 70 65 63" />
            <path d="M50 58 Q47.5 54 50 49 Q52.5 54 50 58 Z" />
          </g>
        </svg>
      )}

      {/* Relic 4: Engraved Watery Square Seal ("watery square") */}
      {props.stage === 4 && (
        <svg viewBox="0 0 100 100" class={`w-full h-full ${glow() ? 'drop-shadow-[0_4px_12px_rgba(217,145,42,0.45)]' : ''}`}>
          <defs>
            <radialGradient id="r4face" cx="38%" cy="30%" r="85%">
              <stop offset="0%" stop-color="#fff6cf" />
              <stop offset="40%" stop-color="#eec964" />
              <stop offset="78%" stop-color="#b8860b" />
              <stop offset="100%" stop-color="#77510f" />
            </radialGradient>
            <linearGradient id="r4rim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#f9e79a" />
              <stop offset="45%" stop-color="#caa03a" />
              <stop offset="55%" stop-color="#8a5f16" />
              <stop offset="100%" stop-color="#5e3f0b" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="47" fill="url(#r4rim)" />
          <circle cx="50" cy="50" r="40" fill="url(#r4face)" stroke="#6e4a0e" stroke-width="1" />
          <circle cx="50" cy="50" r="33.5" fill="none" stroke="#8a5f16" stroke-width="1" stroke-dasharray="2,3" opacity="0.8" />
          <path d="M16 38 Q26 18 50 13 Q30 20 20 42 Z" fill="#ffffff" opacity="0.28" />
          <g fill="none" stroke={engraveLight} stroke-width="2.4" stroke-linecap="round" transform="translate(-0.6,-0.8)" opacity="0.9">
            <rect x="31" y="31" width="38" height="38" rx="4" />
            <path d="M36 44 Q43 40 50 44 T64 44" />
            <path d="M36 53 Q43 49 50 53 T64 53" />
            <path d="M36 62 Q43 58 50 62 T64 62" />
          </g>
          <g fill="none" stroke={engraveDark} stroke-width="2.4" stroke-linecap="round">
            <rect x="31" y="31" width="38" height="38" rx="4" />
            <path d="M36 44 Q43 40 50 44 T64 44" />
            <path d="M36 53 Q43 49 50 53 T64 53" />
            <path d="M36 62 Q43 58 50 62 T64 62" />
          </g>
        </svg>
      )}

      {/* Relic 5: Standalone Golden Heart — NO medallion circle ("calm heart") */}
      {props.stage === 5 && (
        <svg viewBox="0 0 100 100" class={`w-full h-full ${glow() ? 'drop-shadow-[0_4px_14px_rgba(217,145,42,0.5)]' : ''}`}>
          <defs>
            <radialGradient id="r5face" cx="38%" cy="30%" r="85%">
              <stop offset="0%" stop-color="#fff6cf" />
              <stop offset="40%" stop-color="#eec964" />
              <stop offset="78%" stop-color="#b8860b" />
              <stop offset="100%" stop-color="#77510f" />
            </radialGradient>
            <linearGradient id="r5rim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#f9e79a" />
              <stop offset="50%" stop-color="#a87b22" />
              <stop offset="100%" stop-color="#5e3f0b" />
            </linearGradient>
          </defs>
          {/* Solid golden heart with raised rim — fills most of the viewBox */}
          <path
            d="M50 90 C43 82 10 62 10 40 C10 26 23 18 35 23 C43 26 50 35 50 35 C50 35 57 26 65 23 C77 18 90 26 90 40 C90 62 57 82 50 90 Z"
            fill="url(#r5face)"
            stroke="url(#r5rim)"
            stroke-width="3.2"
            stroke-linejoin="round"
          />
          {/* Inner engraved heart contour */}
          <path
            d="M50 79 C45 73 22 57 22 41 C22 31 31 26 39 29 C45 31 50 38 50 38 C50 38 55 31 61 29 C69 26 78 31 78 41 C78 57 55 73 50 79 Z"
            fill="none"
            stroke={engraveDark}
            stroke-width="2"
            stroke-linejoin="round"
          />
          <path
            d="M50 77 C45.6 71.6 24.6 57 24.6 41.6 C24.6 32.5 31.6 28.4 38.6 31"
            fill="none"
            stroke={engraveLight}
            stroke-width="1"
            stroke-linecap="round"
            opacity="0.85"
          />
          {/* Carved center ornament */}
          <circle cx="50" cy="52" r="5" fill="none" stroke={engraveDark} stroke-width="1.8" />
          <circle cx="50" cy="52" r="1.8" fill={engraveDark} />
          {/* Metallic sheen on upper lobe */}
          <path d="M20 38 C20 30 28 25 35 27 C28 29 23 33 20 38 Z" fill="#ffffff" opacity="0.5" />
        </svg>
      )}

      {/* Relic 6: Engraved Gothic Arch Portal ("Arched rectangle") */}
      {props.stage === 6 && (
        <svg viewBox="0 0 100 100" class={`w-full h-full ${glow() ? 'drop-shadow-[0_4px_12px_rgba(217,145,42,0.45)]' : ''}`}>
          <defs>
            <radialGradient id="r6face" cx="38%" cy="30%" r="85%">
              <stop offset="0%" stop-color="#fff6cf" />
              <stop offset="40%" stop-color="#eec964" />
              <stop offset="78%" stop-color="#b8860b" />
              <stop offset="100%" stop-color="#77510f" />
            </radialGradient>
            <linearGradient id="r6rim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#f9e79a" />
              <stop offset="45%" stop-color="#caa03a" />
              <stop offset="55%" stop-color="#8a5f16" />
              <stop offset="100%" stop-color="#5e3f0b" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="47" fill="url(#r6rim)" />
          <circle cx="50" cy="50" r="40" fill="url(#r6face)" stroke="#6e4a0e" stroke-width="1" />
          <circle cx="50" cy="50" r="33.5" fill="none" stroke="#8a5f16" stroke-width="1" stroke-dasharray="2,3" opacity="0.8" />
          <path d="M16 38 Q26 18 50 13 Q30 20 20 42 Z" fill="#ffffff" opacity="0.28" />
          <g fill="none" stroke={engraveLight} stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" transform="translate(-0.6,-0.8)" opacity="0.9">
            <path d="M33 69 L33 46 Q50 27 67 46 L67 69 Z" />
            <path d="M40 69 L40 49 Q50 36 60 49 L60 69" />
            <path d="M45 33 L55 33 L56 40 L44 40 Z" />
          </g>
          <g fill="none" stroke={engraveDark} stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M33 69 L33 46 Q50 27 67 46 L67 69 Z" />
            <path d="M40 69 L40 49 Q50 36 60 49 L60 69" />
            <path d="M45 33 L55 33 L56 40 L44 40 Z" />
          </g>
        </svg>
      )}

      {/* Relic 7: Engraved Golden Laurel Foliage ("organic shape") */}
      {props.stage === 7 && (
        <svg viewBox="0 0 100 100" class={`w-full h-full ${glow() ? 'drop-shadow-[0_4px_12px_rgba(217,145,42,0.45)]' : ''}`}>
          <defs>
            <radialGradient id="r7face" cx="38%" cy="30%" r="85%">
              <stop offset="0%" stop-color="#fff6cf" />
              <stop offset="40%" stop-color="#eec964" />
              <stop offset="78%" stop-color="#b8860b" />
              <stop offset="100%" stop-color="#77510f" />
            </radialGradient>
            <linearGradient id="r7rim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#f9e79a" />
              <stop offset="45%" stop-color="#caa03a" />
              <stop offset="55%" stop-color="#8a5f16" />
              <stop offset="100%" stop-color="#5e3f0b" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="47" fill="url(#r7rim)" />
          <circle cx="50" cy="50" r="40" fill="url(#r7face)" stroke="#6e4a0e" stroke-width="1" />
          <circle cx="50" cy="50" r="33.5" fill="none" stroke="#8a5f16" stroke-width="1" stroke-dasharray="2,3" opacity="0.8" />
          <path d="M16 38 Q26 18 50 13 Q30 20 20 42 Z" fill="#ffffff" opacity="0.28" />
          <g fill="none" stroke={engraveLight} stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" transform="translate(-0.6,-0.8)" opacity="0.9">
            <path d="M50 71 C34 68 27 53 30 38" />
            <path d="M50 71 C66 68 73 53 70 38" />
            <path d="M31 37 Q25 33 29 27 Q36 31 31 37 Z" />
            <path d="M29 48 Q22 45 26 38 Q33 42 29 48 Z" />
            <path d="M31 59 Q24 59 27 52 Q34 55 31 59 Z" />
            <path d="M38 67 Q32 71 33 64 Q40 64 38 67 Z" />
            <path d="M69 37 Q75 33 71 27 Q64 31 69 37 Z" />
            <path d="M71 48 Q78 45 74 38 Q67 42 71 48 Z" />
            <path d="M69 59 Q76 59 73 52 Q66 55 69 59 Z" />
            <path d="M62 67 Q68 71 67 64 Q60 64 62 67 Z" />
            <circle cx="50" cy="70" r="2.4" />
          </g>
          <g fill="none" stroke={engraveDark} stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <path d="M50 71 C34 68 27 53 30 38" />
            <path d="M50 71 C66 68 73 53 70 38" />
            <path d="M31 37 Q25 33 29 27 Q36 31 31 37 Z" />
            <path d="M29 48 Q22 45 26 38 Q33 42 29 48 Z" />
            <path d="M31 59 Q24 59 27 52 Q34 55 31 59 Z" />
            <path d="M38 67 Q32 71 33 64 Q40 64 38 67 Z" />
            <path d="M69 37 Q75 33 71 27 Q64 31 69 37 Z" />
            <path d="M71 48 Q78 45 74 38 Q67 42 71 48 Z" />
            <path d="M69 59 Q76 59 73 52 Q66 55 69 59 Z" />
            <path d="M62 67 Q68 71 67 64 Q60 64 62 67 Z" />
            <circle cx="50" cy="70" r="2.4" />
          </g>
        </svg>
      )}
    </div>
  );
}
