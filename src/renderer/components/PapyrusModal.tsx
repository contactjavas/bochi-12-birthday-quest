import { Show, For } from 'solid-js';
import { CLUES_LIST } from '../stores/gameState';
import { HandDrawnRelicIcon } from './HandDrawnRelicIcon';
import { sound } from '../utils/sound';

interface PapyrusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PapyrusModal(props: PapyrusModalProps) {
  function handleClose() {
    sound.playKeyClick();
    props.onClose();
  }

  return (
    <Show when={props.isOpen}>
      <div
        class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn"
        onClick={handleClose}
      >
        {/* Full Desktop Unrolled Papyrus Container - Compact, Zero Scroll */}
        <div
          class="w-full max-w-xl max-h-[92vh] flex flex-col items-center relative animate-scaleUp select-none"
          onClick={e => e.stopPropagation()}
        >
          {/* Top Wooden Scroll Spindle */}
          <div class="w-[96%] h-4 bg-gradient-to-r from-[#3e2412] via-[#8d5427] to-[#3e2412] rounded-full shadow-lg flex items-center justify-between px-2 border border-[#2b180a] z-10">
            <div class="w-3 h-3 rounded-full bg-amber-400 border border-amber-700 shadow-sm" />
            <div class="w-3 h-3 rounded-full bg-amber-400 border border-amber-700 shadow-sm" />
          </div>

          {/* The Weathered Parchment Paper with Torn/Ragged Edges */}
          <div class="w-[92%] -mt-1 -mb-1 bg-[#f5e9ce] text-[#2c1808] p-5 sm:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.85)] relative border-x-4 border-[#bca37d] flex flex-col justify-between"
               style={{
                 "background-image": "radial-gradient(circle at 50% 50%, #fbf3de 0%, #edd9b5 100%), repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,90,43,0.04) 3px, transparent 4px)",
                 "box-shadow": "inset 0 0 35px rgba(139, 87, 42, 0.35), 0 10px 40px rgba(0,0,0,0.8)",
               }}
          >
            {/* Ragged/Torn paper edge overlays */}
            <div class="absolute inset-0 pointer-events-none border border-[#a88960]/40 rounded-sm" />

            {/* Close Button top-right */}
            <button
              onClick={handleClose}
              class="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#8d5427]/20 hover:bg-[#8d5427]/40 text-[#42240c] font-serif font-bold text-sm flex items-center justify-center transition-all"
              title="Tutup Papyrus"
            >
              ✕
            </button>

            {/* Hand-drawn Manuscript Header Ornament */}
            <div class="flex items-center justify-center gap-3 mb-3">
              <span class="text-xs font-serif text-[#8d5427]">❖ ──────</span>
              <span class="text-base font-serif font-black tracking-widest text-[#3e2412] uppercase">
                Titah Arkana
              </span>
              <span class="text-xs font-serif text-[#8d5427]">────── ❖</span>
            </div>

            {/* Hand-drawn Clues in 2 Compact Columns so no vertical scrolling occurs */}
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 my-1">
              <For each={CLUES_LIST}>
                {(clue, idx) => (
                  <div class="flex items-center gap-2.5 p-2 rounded-lg bg-[#fcf6e8]/75 border border-[#c4a984]/50 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                    {/* Hand-drawn sketched relic icon */}
                    <HandDrawnRelicIcon stage={clue.stage} size={34} />
                    <div class="flex-1 min-w-0">
                      <span class="text-[10px] font-mono tracking-wider text-[#8d5427] uppercase block leading-none mb-1">
                        Arkana {idx() + 1}
                      </span>
                      <p class="text-xs sm:text-sm font-serif font-bold text-[#2c1808] leading-tight italic">
                        "{clue.clueText}"
                      </p>
                    </div>
                  </div>
                )}
              </For>
            </div>

            {/* Bottom Solemn Inscription: "Jika kamu mencari, maka kamu akan menemukan." */}
            <div class="mt-4 pt-3 border-t border-[#8d5427]/30 text-center">
              <p class="font-serif italic font-bold text-sm sm:text-base text-[#3e2412] tracking-wide">
                "Jika kamu mencari, maka kamu akan menemukan."
              </p>
            </div>
          </div>

          {/* Bottom Wooden Scroll Spindle */}
          <div class="w-[96%] h-4 bg-gradient-to-r from-[#3e2412] via-[#8d5427] to-[#3e2412] rounded-full shadow-lg flex items-center justify-between px-2 border border-[#2b180a] z-10">
            <div class="w-3 h-3 rounded-full bg-amber-400 border border-amber-700 shadow-sm" />
            <div class="w-3 h-3 rounded-full bg-amber-400 border border-amber-700 shadow-sm" />
          </div>
        </div>
      </div>
    </Show>
  );
}
