import { Show } from 'solid-js';
import { activeClueModal, setActiveClueModal, triggerSaveToInventory } from '../stores/gameState';
import { AncientRelicIcon } from './AncientRelicIcon';

export function ClueModal() {
  const clue = () => activeClueModal();

  function handleSave() {
    const current = clue();
    if (current) {
      triggerSaveToInventory(current);
    }
    setActiveClueModal(null);
  }

  return (
    <Show when={clue()}>
      <div class="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
        <div class="w-full max-w-md bg-gradient-to-b from-[#182033] via-[#101626] to-[#0a0d17] border-2 border-amber-400/80 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(245,158,11,0.35)] flex flex-col items-center text-center relative animate-scaleUp">
          {/* Glowing Aura with Ancient European Relic Icon */}
          <div class="p-3 rounded-full bg-amber-400/10 border border-amber-400/40 mb-3 shadow-[0_0_30px_rgba(245,158,11,0.3)] animate-pulse">
            <AncientRelicIcon stage={clue()!.stage} size={84} />
          </div>

          <span class="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mb-1">
            ✨ RELIC KUNO DITEMUKAN ✨
          </span>
          <h3 class="text-xl font-mono font-bold text-white mb-4">
            {clue()!.title} Terbuka!
          </h3>

          {/* Clue Text Box without extra description text */}
          <div class="w-full bg-[#0a0d14]/90 border border-amber-400/30 rounded-xl p-5 my-2 shadow-inner">
            <span class="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">
              Petunjuk Rahasia:
            </span>
            <p class="text-xl font-mono font-bold text-amber-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.3)]">
              "{clue()!.clueText}"
            </p>
          </div>

          <button
            onClick={handleSave}
            class="mt-6 w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-mono font-bold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] active:scale-95 flex items-center justify-center gap-2"
          >
            <span>🎒</span>
            <span>Simpan ke Inventory & Lanjut Misi →</span>
          </button>
        </div>
      </div>
    </Show>
  );
}
