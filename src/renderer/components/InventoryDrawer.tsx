import { createSignal, For, Show } from 'solid-js';
import { CLUES_LIST, completedStages } from '../stores/gameState';
import { sound } from '../utils/sound';
import { AncientRelicIcon } from './AncientRelicIcon';

export function InventoryDrawer() {
  const [isOpen, setIsOpen] = createSignal(false);

  function toggle() {
    sound.playKeyClick();
    setIsOpen(!isOpen());
  }

  const collectedCount = () => completedStages().filter(s => s >= 1 && s <= 7).length;

  return (
    <>
      {/* Inventory Trigger Button */}
      <button
        onClick={toggle}
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111726] border border-cyber-border hover:border-amber-400 text-xs font-mono text-gray-200 transition-all shadow-md group relative"
      >
        <span class="text-base">🎒</span>
        <span class="group-hover:text-amber-300 transition-colors">Inventory Relic</span>
        <span class="px-1.5 py-0.2 rounded-full bg-amber-400/20 text-amber-300 font-bold text-[10px]">
          {collectedCount()}/7
        </span>
      </button>

      {/* Drawer Overlay */}
      <Show when={isOpen()}>
        <div class="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex justify-end animate-fadeIn" onClick={toggle}>
          <div
            class="w-full max-w-sm h-full bg-[#0e1422] border-l border-amber-500/30 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div>
              <div class="flex items-center justify-between pb-4 border-b border-gray-800 mb-6">
                <div class="flex items-center gap-2">
                  <span class="text-xl">🎒</span>
                  <h3 class="font-mono font-bold text-white text-base">Inventory Relic Kuno</h3>
                </div>
                <button
                  onClick={toggle}
                  class="w-8 h-8 rounded-lg bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center font-mono"
                >
                  ✕
                </button>
              </div>

              <div class="flex flex-col gap-3">
                <For each={CLUES_LIST}>
                  {clue => {
                    const isUnlocked = () => completedStages().includes(clue.stage);
                    return (
                      <div
                        class={`p-3 rounded-xl border transition-all ${
                          isUnlocked()
                            ? 'bg-[#151e33] border-amber-400/50 shadow-md'
                            : 'bg-[#0a0d14]/60 border-gray-800/80 opacity-40'
                        }`}
                      >
                        <div class="flex items-center gap-3">
                          <div class="shrink-0">
                            {isUnlocked() ? (
                              <AncientRelicIcon stage={clue.stage} size={44} />
                            ) : (
                              <div class="w-11 h-11 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-600 text-lg">
                                🔒
                              </div>
                            )}
                          </div>
                          <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between">
                              <span class="text-[10px] font-mono text-amber-400 uppercase font-bold">
                                {clue.title}
                              </span>
                              <span class={`text-[10px] font-mono ${isUnlocked() ? 'text-emerald-400' : 'text-gray-500'}`}>
                                {isUnlocked() ? 'TERSIMPAN ✓' : 'TERKUNCI'}
                              </span>
                            </div>
                            <p class="text-xs font-mono font-bold text-white mt-1 break-words">
                              {isUnlocked() ? `"${clue.clueText}"` : '????????????'}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </For>
              </div>
            </div>

            <div class="pt-4 border-t border-gray-800 text-center">
              <p class="text-[11px] font-mono text-gray-400">
                Kumpulkan seluruh 7 Relic untuk membuka gerbang The Sanctum of Revelation di Game 8!
              </p>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}
