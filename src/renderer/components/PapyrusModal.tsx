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
        class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn"
        onClick={handleClose}
      >
        {/* Ancient Egyptian Papyrus Scroll (papyrus.png) with hand-inked relic clues */}
        <div
          class="relative animate-scaleUp select-none h-[88vh] max-h-[840px] max-w-[94vw] aspect-[513/598] drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
          style={{
            'background-image': "url('/images/papyrus.png')",
            'background-size': '100% 100%',
            'background-position': 'center',
            'background-repeat': 'no-repeat',
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Inked contents, fitted inside the blank parchment area between the rolls */}
          <div class="absolute inset-0 pt-[12%] pb-[16%] px-[13%] flex flex-col">
            {/* Close Button — small inked circle on the parchment edge */}
            <button
              onClick={handleClose}
              class="absolute top-[13%] right-[9%] w-7 h-7 rounded-full border-2 border-[#6b4a1e]/70 text-[#4a2d0e] font-hand font-bold text-sm flex items-center justify-center hover:bg-[#8d6a33]/20 transition-all"
              title="Tutup Papyrus"
            >
              ✕
            </button>

            {/* Golden B Monogram — the letterhead seal at the top center */}
            <div class="flex justify-center shrink-0">
              <img
                src="/images/monogram-b.png"
                alt="Monogram B"
                draggable={false}
                class="h-24 sm:h-28 w-auto drop-shadow-[0_2px_8px_rgba(90,55,10,0.45)]"
              />
            </div>

            {/* Hand-inked Manuscript Header — spaced well below the letterhead */}
            <div class="flex items-center justify-center gap-3 mt-6 mb-1 shrink-0">
              <span class="text-[#8d6a33] text-xs">❖ ─────</span>
              <span class="font-hand text-lg sm:text-xl font-bold tracking-[0.15em] text-[#3a2408] uppercase whitespace-nowrap">
                Daftar 7 Relic Kuno
              </span>
              <span class="text-[#8d6a33] text-xs">───── ❖</span>
            </div>

            {/* Hand-drawn Clues — single column, one relic per line */}
            <div class="flex flex-col mt-1 gap-0.5">
              <For each={CLUES_LIST}>
                {(clue, idx) => (
                  <div class="flex items-center gap-3 border-b border-[#8d6a33]/25 py-0.5">
                    <HandDrawnRelicIcon stage={clue.stage} size={38} />
                    <div class="flex-1 min-w-0 flex items-baseline gap-2">
                      <span class="font-hand text-xs tracking-widest text-[#8d6a33] uppercase shrink-0">
                        Relic {idx() + 1}
                      </span>
                      <p class="font-hand text-sm sm:text-base font-bold text-[#2c1808] leading-tight">
                        {clue.clueText}
                      </p>
                    </div>
                  </div>
                )}
              </For>
            </div>

            {/* Solemn Inscription — pushed to the bottom of the page, above the paper fold */}
            <div class="shrink-0 pt-1.5 mt-auto border-t-2 border-[#8d6a33]/40 text-center">
              <p class="font-hand italic font-bold text-sm sm:text-base text-[#3a2408]">
                "Jika kamu mencari, maka kamu akan menemukan."
              </p>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
}
