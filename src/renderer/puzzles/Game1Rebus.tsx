import { createSignal, Show, For } from 'solid-js';
import { sound } from '../utils/sound';
import { completeStage } from '../stores/gameState';

import rebus1Img from '../../../images/Robus 1.png';
import rebus2Img from '../../../images/Robus 2.png';
import rebus3Img from '../../../images/Robus 3.png';
import rebus4Img from '../../../images/Robus 4.png';
import rebus5Img from '../../../images/Robus 5.png';

interface IRebusItem {
  id: number;
  title: string;
  hint: string;
  acceptedAnswers: string[];
  imageUrl: string;
}

export function Game1Rebus() {
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [userInput, setUserInput] = createSignal('');
  const [errorMessage, setErrorMessage] = createSignal('');
  const [showHint, setShowHint] = createSignal(false);
  const [isSuccess, setIsSuccess] = createSignal(false);

  const puzzles: IRebusItem[] = [
    {
      id: 1,
      title: 'Rebus 1 / 5',
      hint: 'Hitung ada berapa banyak kata TAHUN yang tertulis di dalam gambar ini...',
      acceptedAnswers: [
        'ulang tahun 12',
        'ulang tahun ke-12',
        'ulang tahun ke 12',
        'ultah 12',
        'ultah ke-12',
        'ultah ke 12',
        'ulang tahun keduabelas',
        '12 tahun',
        'duabelas tahun',
        'ulang tahun dua belas',
      ],
      imageUrl: rebus1Img,
    },
    {
      id: 2,
      title: 'Rebus 2 / 5',
      hint: 'Dua tangan yang saling memberi dan menerima simbol hati merah...',
      acceptedAnswers: [
        'kasih sayang',
        'rasa sayang',
        'memberi kasih sayang',
        'cinta dan kasih sayang',
        'memberi cinta',
      ],
      imageUrl: rebus2Img,
    },
    {
      id: 3,
      title: 'Rebus 3 / 5',
      hint: 'Hembusan angin meniup huruf-huruf L-I-L-I-N yang biasa dinyalakan di kue ulang tahun...',
      acceptedAnswers: [
        'tiup lilin',
        'meniup lilin',
        'tiupan lilin',
        'tiup lilinnya',
      ],
      imageUrl: rebus3Img,
    },
    {
      id: 4,
      title: 'Rebus 4 / 5',
      hint: 'Simbol hati (heart) yang posisinya berada di paling bawah / rendah...',
      acceptedAnswers: [
        'rendah hati',
        'merendah hati',
        'hati rendah',
      ],
      imageUrl: rebus4Img,
    },
    {
      id: 5,
      title: 'Rebus 5 / 5',
      hint: 'Kata MIMPI dan LANGIT dengan tanda panah tinggi di antaranya...',
      acceptedAnswers: [
        'bermimpi setinggi langit',
        'mimpi setinggi langit',
        'mimpi setinggi-tinggi langit',
        'bermimpi setinggi-tingginya langit',
        'setinggi langit',
      ],
      imageUrl: rebus5Img,
    },
  ];

  function normalizeText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function handleSubmit(e?: Event) {
    if (e) e.preventDefault();
    sound.playKeyClick();
    const cleanInput = normalizeText(userInput());
    const current = puzzles[currentIndex()];

    const matched = current.acceptedAnswers.some(ans => {
      const cleanAns = normalizeText(ans);
      return cleanInput === cleanAns || cleanInput.includes(cleanAns);
    });

    if (matched) {
      sound.playSuccess();
      setErrorMessage('');
      setShowHint(false);
      setUserInput('');

      if (currentIndex() < puzzles.length - 1) {
        setCurrentIndex(currentIndex() + 1);
      } else {
        // Complete Game 1!
        setIsSuccess(true);
        setTimeout(() => {
          completeStage(1);
        }, 800);
      }
    } else {
      sound.playError();
      setErrorMessage('Jawaban belum tepat, ayo coba perhatikan gambarnya lagi!');
    }
  }

  return (
    <div class="max-w-4xl mx-auto flex flex-col items-center">
      {/* Stage Header */}
      <div class="text-center mb-6">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono tracking-widest uppercase mb-2">
          <span>Game 01 // Ruang Arkana Kata</span>
        </div>
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
          THE REBUS CRYPTOGRAM
        </h2>
        <p class="text-gray-400 text-sm max-w-lg mx-auto mt-1">
          Pecahkan ke-5 teka-teki visual kata dan gambar berikut untuk menguak petunjuk Relic pertama!
        </p>
      </div>

      {/* Progress Dots */}
      <div class="flex items-center gap-2 mb-6">
        <For each={puzzles}>
          {(_, idx) => (
            <div
              class={`w-8 h-2 rounded-full transition-all duration-300 ${
                idx() < currentIndex()
                  ? 'bg-cyber-green'
                  : idx() === currentIndex()
                  ? 'bg-cyber-cyan shadow-[0_0_10px_#00e5ff]'
                  : 'bg-gray-800'
              }`}
            />
          )}
        </For>
      </div>

      {/* Main Puzzle Card */}
      <div class="w-full max-w-md bg-[#111726]/90 border border-cyber-border rounded-xl p-6 shadow-2xl backdrop-blur-md flex flex-col items-center">
        <div class="w-full flex justify-between items-center mb-4">
          <span class="text-cyber-cyan font-mono text-xs font-bold uppercase tracking-wider">
            {puzzles[currentIndex()].title}
          </span>
          <button
            onClick={() => {
              sound.playKeyClick();
              setShowHint(!showHint());
            }}
            class="text-xs text-cyber-amber hover:underline font-mono flex items-center gap-1"
          >
            💡 {showHint() ? 'Tutup Petunjuk' : 'Minta Petunjuk'}
          </button>
        </div>

        {/* Puzzle Visual Area - High Quality Original Images */}
        <div class="w-full aspect-square max-w-[320px] p-2 bg-white rounded-xl border-2 border-neutral-300 shadow-xl flex items-center justify-center overflow-hidden">
          <img
            src={puzzles[currentIndex()].imageUrl}
            alt={puzzles[currentIndex()].title}
            class="w-full h-full object-contain select-none pointer-events-none"
          />
        </div>

        {/* Hint Box */}
        <Show when={showHint()}>
          <div class="w-full mt-4 p-3 rounded-lg bg-cyber-amber/10 border border-cyber-amber/30 text-cyber-amber text-xs font-mono leading-relaxed animate-fadeIn">
            <span class="font-bold">CLUE:</span> {puzzles[currentIndex()].hint}
          </div>
        </Show>

        {/* Input Box & Submit */}
        <form onSubmit={handleSubmit} class="w-full mt-6 flex flex-col gap-3">
          <div class="relative">
            <input
              type="text"
              value={userInput()}
              onInput={e => {
                sound.playKeyClick();
                setUserInput(e.currentTarget.value);
              }}
              placeholder="Ketik tebakanmu di sini..."
              autofocus
              class="w-full px-4 py-3 bg-[#0a0d14] border border-cyber-border focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan rounded-lg text-white font-mono text-sm placeholder-gray-500 outline-none transition-all"
            />
          </div>

          <Show when={errorMessage()}>
            <p class="text-xs text-cyber-red font-mono animate-bounce text-center">
              ⚠️ {errorMessage()}
            </p>
          </Show>

          <button
            type="submit"
            class="w-full py-3 bg-cyber-cyan hover:bg-cyan-400 text-black font-mono font-bold text-sm rounded-lg transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)] active:scale-95"
          >
            Periksa Jawaban →
          </button>
        </form>
      </div>
    </div>
  );
}
