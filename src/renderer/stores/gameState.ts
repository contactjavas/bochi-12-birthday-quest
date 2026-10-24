import { createSignal } from 'solid-js';
import { sound } from '../utils/sound';

export interface IClue {
  stage: number;
  id: string;
  title: string;
  clueText: string;
  icon: string;
}

export const CLUES_LIST: IClue[] = [
  {
    stage: 1,
    id: 'clue-1',
    title: 'Relic 1',
    clueText: 'Rectangle putih dan lembut',
    icon: '�',
  },
  {
    stage: 2,
    id: 'clue-2',
    title: 'Relic 2',
    clueText: 'double round',
    icon: '�',
  },
  {
    stage: 3,
    id: 'clue-3',
    title: 'Relic 3',
    clueText: 'lighted nest',
    icon: '🏮',
  },
  {
    stage: 4,
    id: 'clue-4',
    title: 'Relic 4',
    clueText: 'watery square',
    icon: '💠',
  },
  {
    stage: 5,
    id: 'clue-5',
    title: 'Relic 5',
    clueText: 'calm heart',
    icon: '💖',
  },
  {
    stage: 6,
    id: 'clue-6',
    title: 'Relic 6',
    clueText: 'Arched rectangle',
    icon: '🏛️',
  },
  {
    stage: 7,
    id: 'clue-7',
    title: 'Relic 7',
    clueText: 'starry sphere',
    icon: '⭐',
  },
];

const STORAGE_KEY = 'bochi_12_birthday_progress_v1';

// Every app launch starts a fresh run (welcome screen -> stage 1).
// Any stale save from a previous session is wiped instead of resumed.
function loadSavedState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  return { currentStage: 1, completedStages: [] as number[] };
}

const initialState = loadSavedState();

export const [currentStage, setCurrentStage] = createSignal<number>(initialState.currentStage);
export const [completedStages, setCompletedStages] = createSignal<number[]>(initialState.completedStages);
export const [activeClueModal, setActiveClueModal] = createSignal<IClue | null>(null);

export interface IInventorySaveEffect {
  stage: number;
  title: string;
  clueText: string;
}
export const [inventorySaveEffect, setInventorySaveEffect] = createSignal<IInventorySaveEffect | null>(null);

function saveState() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        currentStage: currentStage(),
        completedStages: completedStages(),
      })
    );
  } catch {
    // ignore
  }
}

export function triggerSaveToInventory(clue: IClue) {
  sound.playInventoryStored();
  setInventorySaveEffect({
    stage: clue.stage,
    title: clue.title,
    clueText: clue.clueText,
  });
  setTimeout(() => {
    setInventorySaveEffect(null);
  }, 1600);
}

export function completeStage(stageNumber: number) {
  if (!completedStages().includes(stageNumber)) {
    setCompletedStages([...completedStages(), stageNumber]);
  }
  
  const clue = CLUES_LIST.find(c => c.stage === stageNumber);
  if (clue) {
    sound.playRelicUnlocked();
    setActiveClueModal(clue);
  } else {
    sound.playSuccess();
  }

  // Advance to next stage
  if (stageNumber < 8) {
    setCurrentStage(stageNumber + 1);
  }
  saveState();
}

export function jumpToStage(stageNumber: number) {
  setCurrentStage(stageNumber);
  saveState();
}

export function resetGameProgress() {
  setCurrentStage(1);
  setCompletedStages([]);
  setActiveClueModal(null);
  setInventorySaveEffect(null);
  localStorage.removeItem(STORAGE_KEY);
}
