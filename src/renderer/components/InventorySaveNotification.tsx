import { Show } from 'solid-js';
import { inventorySaveEffect } from '../stores/gameState';
import { AncientRelicIcon } from './AncientRelicIcon';

export function InventorySaveNotification() {
  const effect = () => inventorySaveEffect();

  return (
    <Show when={effect()}>
      <div class="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
        {/* Big Relic in Center, zooming in and swooshing into inventory */}
        <div class="animate-relicCenterSave flex flex-col items-center">
          <div class="p-6 rounded-full bg-gradient-to-b from-amber-400/30 to-amber-600/10 border-4 border-amber-300 shadow-[0_0_80px_rgba(245,158,11,0.95)] backdrop-blur-md">
            <AncientRelicIcon stage={effect()!.stage} size={150} />
          </div>
        </div>
      </div>
    </Show>
  );
}
