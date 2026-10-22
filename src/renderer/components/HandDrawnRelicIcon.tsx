import { JSX } from 'solid-js';

interface HandDrawnRelicIconProps {
  stage: number;
  size?: number | string;
  class?: string;
}

// Authentic sepia ink / hand-drawn medieval scribe sketches for each relic
export function HandDrawnRelicIcon(props: HandDrawnRelicIconProps): JSX.Element {
  const size = () => props.size || 36;
  const ink = "#42240c"; // Deep sepia iron-gall ink

  return (
    <div
      class={`inline-flex items-center justify-center shrink-0 ${props.class || ''}`}
      style={{
        width: typeof size() === 'number' ? `${size()}px` : size(),
        height: typeof size() === 'number' ? `${size()}px` : size(),
      }}
    >
      {/* 1: Hand-drawn Silk Rectangle / Parchment */}
      {props.stage === 1 && (
        <svg viewBox="0 0 40 40" class="w-full h-full">
          {/* Sketchy rectangle with curled corner */}
          <path
            d="M 8 10 C 18 9 24 11 32 9 C 33 18 31 25 32 30 C 24 31 16 29 8 31 C 7 24 9 17 8 10 Z"
            fill="#f9f3e3"
            stroke={ink}
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          {/* Internal quill hatching lines */}
          <path d="M 12 15 L 28 15 M 12 19 L 28 19 M 12 23 L 24 23" stroke={ink} stroke-width="1" stroke-dasharray="1,2" stroke-linecap="round" />
          {/* Hand-drawn wax seal circle */}
          <circle cx="27" cy="25" r="3.2" fill="#881337" stroke={ink} stroke-width="1" />
        </svg>
      )}

      {/* 2: Hand-drawn Double Round / Spectacles */}
      {props.stage === 2 && (
        <svg viewBox="0 0 40 40" class="w-full h-full">
          {/* Connecting wire bridge */}
          <path d="M 16 20 Q 20 16 24 20" fill="none" stroke={ink} stroke-width="1.8" stroke-linecap="round" />
          {/* Left lens circle with quill sketch imperfection */}
          <circle cx="11" cy="20" r="7.5" fill="#f4ebd0" stroke={ink} stroke-width="1.6" />
          <path d="M 8 17 Q 11 15 14 17" fill="none" stroke={ink} stroke-width="0.9" opacity="0.6" />
          {/* Right lens circle */}
          <circle cx="29" cy="20" r="7.5" fill="#f4ebd0" stroke={ink} stroke-width="1.6" />
          <path d="M 26 17 Q 29 15 32 17" fill="none" stroke={ink} stroke-width="0.9" opacity="0.6" />
        </svg>
      )}

      {/* 3: Hand-drawn Lighted Nest / Lantern */}
      {props.stage === 3 && (
        <svg viewBox="0 0 40 40" class="w-full h-full">
          {/* Hanging ring */}
          <circle cx="20" cy="8" r="2.5" fill="none" stroke={ink} stroke-width="1.4" />
          {/* Triangular lantern roof */}
          <path d="M 12 15 L 20 10 L 28 15 Z" fill="#e8d8b5" stroke={ink} stroke-width="1.5" stroke-linejoin="round" />
          {/* Lantern glass cage */}
          <path d="M 14 15 L 13 28 L 27 28 L 26 15" fill="none" stroke={ink} stroke-width="1.5" />
          <line x1="20" y1="15" x2="20" y2="28" stroke={ink} stroke-width="1.2" />
          {/* Flame sketched inside */}
          <path d="M 20 25 Q 18 22 20 19 Q 22 22 20 25 Z" fill="#d97706" stroke={ink} stroke-width="1" />
          {/* Base */}
          <line x1="11" y1="28" x2="29" y2="28" stroke={ink} stroke-width="1.8" stroke-linecap="round" />
        </svg>
      )}

      {/* 4: Hand-drawn Watery Square Seal */}
      {props.stage === 4 && (
        <svg viewBox="0 0 40 40" class="w-full h-full">
          {/* Square border */}
          <rect x="9" y="9" width="22" height="22" rx="2" fill="#e2edf0" stroke={ink} stroke-width="1.6" />
          {/* Inner sketch frame */}
          <rect x="12" y="12" width="16" height="16" fill="none" stroke={ink} stroke-width="0.8" stroke-dasharray="2,1" />
          {/* Sketched water wave ripples */}
          <path d="M 14 17 Q 17 15 20 17 T 26 17" fill="none" stroke={ink} stroke-width="1.3" stroke-linecap="round" />
          <path d="M 14 21 Q 17 19 20 21 T 26 21" fill="none" stroke={ink} stroke-width="1.3" stroke-linecap="round" />
          <path d="M 14 25 Q 17 23 20 25 T 26 25" fill="none" stroke={ink} stroke-width="1.1" stroke-linecap="round" />
        </svg>
      )}

      {/* 5: Hand-drawn Calm Heart */}
      {props.stage === 5 && (
        <svg viewBox="0 0 40 40" class="w-full h-full">
          {/* Sketched royal heart with hatching */}
          <path
            d="M 20 31 C 18 28 8 22 8 15 C 8 10 13 8 17 11 C 19 12 20 14 20 14 C 20 14 21 12 23 11 C 27 8 32 10 32 15 C 32 22 22 28 20 31 Z"
            fill="#e8bcbe"
            stroke={ink}
            stroke-width="1.7"
            stroke-linejoin="round"
          />
          {/* Ink shadow shading lines on the left side of heart */}
          <path d="M 12 15 Q 11 18 13 21 M 15 16 Q 14 19 16 22" stroke={ink} stroke-width="1" stroke-linecap="round" />
          {/* Tiny royal crown sketched atop */}
          <path d="M 16 9 L 17 6 L 20 8 L 23 6 L 24 9 Z" fill="none" stroke={ink} stroke-width="1.2" />
        </svg>
      )}

      {/* 6: Hand-drawn Arched Rectangle Portal */}
      {props.stage === 6 && (
        <svg viewBox="0 0 40 40" class="w-full h-full">
          {/* Base threshold */}
          <line x1="8" y1="32" x2="32" y2="32" stroke={ink} stroke-width="2" stroke-linecap="round" />
          {/* Gothic stone arched doorway */}
          <path
            d="M 12 32 L 12 18 Q 20 7 28 18 L 28 32"
            fill="#ede2cc"
            stroke={ink}
            stroke-width="1.7"
            stroke-linejoin="round"
          />
          {/* Inner arch outline */}
          <path d="M 16 32 L 16 20 Q 20 12 24 20 L 24 32" fill="none" stroke={ink} stroke-width="1" />
          {/* Keystone at arch peak */}
          <path d="M 18 10 L 22 10 L 23 14 L 17 14 Z" fill="none" stroke={ink} stroke-width="1.1" />
        </svg>
      )}

      {/* 7: Hand-drawn Organic Shape / Laurel Foliage */}
      {props.stage === 7 && (
        <svg viewBox="0 0 40 40" class="w-full h-full">
          {/* Central stem */}
          <path d="M 20 32 Q 20 20 20 8" fill="none" stroke={ink} stroke-width="1.5" stroke-linecap="round" />
          {/* Left sketched leaves */}
          <path d="M 20 26 Q 14 24 15 19 Q 19 22 20 24" fill="#d9e6d0" stroke={ink} stroke-width="1.2" />
          <path d="M 20 19 Q 13 17 14 12 Q 19 15 20 17" fill="#d9e6d0" stroke={ink} stroke-width="1.2" />
          {/* Right sketched leaves */}
          <path d="M 20 26 Q 26 24 25 19 Q 21 22 20 24" fill="#d9e6d0" stroke={ink} stroke-width="1.2" />
          <path d="M 20 19 Q 27 17 26 12 Q 21 15 20 17" fill="#d9e6d0" stroke={ink} stroke-width="1.2" />
          {/* Apex leaf */}
          <path d="M 20 11 Q 18 7 20 5 Q 22 7 20 11" fill="#d9e6d0" stroke={ink} stroke-width="1.2" />
        </svg>
      )}
    </div>
  );
}
