import { createSignal, Switch, Match, For, Show } from 'solid-js';
import { sound } from './utils/sound';
import { currentStage, setCurrentStage, completedStages, resetGameProgress } from './stores/gameState';
import { LandingPage } from './components/LandingPage';
import { Game1Robus } from './puzzles/Game1Robus';
import { Game2LogicPanel } from './puzzles/Game2LogicPanel';
import { Game3Pulley } from './puzzles/Game3Pulley';
import { Game4Exponential } from './puzzles/Game4Exponential';
import { Game5Diagonal } from './puzzles/Game5Diagonal';
import { Game6SquareMosaic } from './puzzles/Game6SquareMosaic';
import { Game7Organic } from './puzzles/Game7Organic';
import { Game8Finale } from './puzzles/Game8Finale';
import { ClueModal } from './components/ClueModal';
import { InventoryDrawer } from './components/InventoryDrawer';
import { InventorySaveNotification } from './components/InventorySaveNotification';

export function App() {
  const [isMuted, setIsMuted] = createSignal(sound.getMuted());
  const [showDevControls, setShowDevControls] = createSignal(false);
  const [hasEntered, setHasEntered] = createSignal(false);

  function handleEnterGame() {
    sound.stopMorseLoop();
    setHasEntered(true);
    sound.startAmbientDrone();
  }

  function toggleMute() {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  }

  const stageTitles = [
    'Robus Kata',
    'Sidang Logika',
    'Katrol Mekanik',
    'Kristal Daya',
    'Matriks Diagonal',
    'Mozaik Geometri',
    'Siluet Alami',
    'Surprise Finale',
  ];

  return (
    <div
      class="min-h-screen w-full bg-[#0a0d14] text-white flex flex-col font-sans select-none relative overflow-x-hidden"
      onClick={() => hasEntered() && sound.startAmbientDrone()}
    >
      {/* Golden Landing Page (blocks the game until Bochi enters) */}
      <Show when={!hasEntered()}>
        <LandingPage onEnter={handleEnterGame} />
      </Show>

      {/* CRT Scanline & Subtle Vignette Overlay */}
      <div class="pointer-events-none fixed inset-0 z-30 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40" />
      <div class="pointer-events-none fixed inset-0 z-30 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />

      {/* Top Cyber Navigation Bar */}
      <header class="w-full border-b border-cyber-border/80 bg-[#0d121f]/90 backdrop-blur-md px-4 py-3 z-20 flex items-center justify-between shadow-lg">
        {/* Left Logo / Title */}
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan font-mono font-bold text-sm shadow-[0_0_10px_rgba(0,229,255,0.2)]">
            12
          </div>
          <div>
            <h1 class="text-xs sm:text-sm font-mono font-bold tracking-wider text-white flex items-center gap-2">
              PROJECT B.O.C.H.I.
              <span class="text-[10px] px-1.5 py-0.2 rounded bg-cyber-green/20 text-cyber-green font-normal">
                ONLINE
              </span>
            </h1>
            <p class="text-[10px] font-mono text-gray-400 hidden sm:block">
              12th Birthday Mystery ARG Quest
            </p>
          </div>
        </div>

        {/* Center: Stage Indicator Bar */}
        <div class="hidden md:flex items-center gap-1.5 bg-[#0a0d14]/80 p-1 rounded-xl border border-gray-800">
          <For each={Array.from({ length: 8 })}>
            {(_, idx) => {
              const stageNum = idx() + 1;
              const isCurrent = () => currentStage() === stageNum;
              const isCompleted = () => completedStages().includes(stageNum);

              return (
                <button
                  onClick={() => {
                    sound.playKeyClick();
                    setCurrentStage(stageNum);
                  }}
                  class={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1 ${
                    isCurrent()
                      ? 'bg-cyber-cyan text-black font-bold shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                      : isCompleted()
                      ? 'bg-cyber-green/10 text-cyber-green border border-cyber-green/30'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                  title={`Stage ${stageNum}: ${stageTitles[idx()]}`}
                >
                  <span>{stageNum}</span>
                  <Show when={isCompleted()}>
                    <span class="text-[9px]">✓</span>
                  </Show>
                </button>
              );
            }}
          </For>
        </div>

        {/* Right Tools: Inventory, Sound Mute, Dev */}
        <div class="flex items-center gap-2">
          <InventoryDrawer />

          <button
            onClick={toggleMute}
            class="w-9 h-9 rounded-lg bg-[#111726] border border-cyber-border hover:border-gray-600 text-gray-300 flex items-center justify-center transition-all shadow-md text-sm"
            title={isMuted() ? 'Aktifkan Suara' : 'Matikan Suara'}
          >
            {isMuted() ? '🔇' : '🔊'}
          </button>

          <button
            onClick={() => setShowDevControls(!showDevControls())}
            class="px-2 py-1 rounded bg-gray-900 border border-gray-800 hover:border-gray-700 text-[10px] font-mono text-gray-500 hover:text-gray-300"
            title="Menu Pengembang (Developer / Testing)"
          >
            ⚙️ DEV
          </button>
        </div>
      </header>

      {/* Dev Menu Panel (Collapsible) */}
      <Show when={showDevControls()}>
        <div class="w-full bg-yellow-950/40 border-b border-yellow-700/50 p-2 text-xs font-mono text-yellow-300 flex items-center justify-between px-6 z-20">
          <div class="flex items-center gap-2">
            <span class="font-bold">DEV CONTROL:</span>
            <span>Lompat ke Game:</span>
            <For each={Array.from({ length: 8 })}>
              {(_, i) => (
                <button
                  onClick={() => setCurrentStage(i() + 1)}
                  class="px-2 py-0.5 rounded bg-yellow-900 hover:bg-yellow-800 text-white font-bold"
                >
                  {i() + 1}
                </button>
              )}
            </For>
          </div>
          <button
            onClick={() => {
              resetGameProgress();
              alert('Progres game berhasil di-reset!');
            }}
            class="px-2 py-0.5 rounded bg-red-900/80 hover:bg-red-800 text-white font-bold"
          >
            Reset Semua Progres
          </button>
        </div>
      </Show>

      {/* Mobile Stage Selector */}
      <div class="md:hidden flex items-center justify-center gap-1.5 py-2 px-3 bg-[#0d121f] border-b border-gray-800 overflow-x-auto">
        <For each={Array.from({ length: 8 })}>
          {(_, idx) => {
            const stageNum = idx() + 1;
            const isCurrent = () => currentStage() === stageNum;
            const isCompleted = () => completedStages().includes(stageNum);

            return (
              <button
                onClick={() => {
                  sound.playKeyClick();
                  setCurrentStage(stageNum);
                }}
                class={`px-2.5 py-1 rounded text-xs font-mono shrink-0 ${
                  isCurrent()
                    ? 'bg-cyber-cyan text-black font-bold'
                    : isCompleted()
                    ? 'bg-cyber-green/10 text-cyber-green'
                    : 'text-gray-500'
                }`}
              >
                G{stageNum} {isCompleted() ? '✓' : ''}
              </button>
            );
          }}
        </For>
      </div>

      {/* Main Game Stage Content */}
      <main class="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6 flex flex-col justify-center z-10">
        <Switch>
          <Match when={currentStage() === 1}>
            <Game1Robus />
          </Match>
          <Match when={currentStage() === 2}>
            <Game2LogicPanel />
          </Match>
          <Match when={currentStage() === 3}>
            <Game3Pulley />
          </Match>
          <Match when={currentStage() === 4}>
            <Game4Exponential />
          </Match>
          <Match when={currentStage() === 5}>
            <Game5Diagonal />
          </Match>
          <Match when={currentStage() === 6}>
            <Game6SquareMosaic />
          </Match>
          <Match when={currentStage() === 7}>
            <Game7Organic />
          </Match>
          <Match when={currentStage() === 8}>
            <Game8Finale />
          </Match>
        </Switch>
      </main>

      {/* Relic Unlocked Modal Popup */}
      <ClueModal />

      {/* Floating Inventory Save Animation & Toast */}
      <InventorySaveNotification />
    </div>
  );
}
