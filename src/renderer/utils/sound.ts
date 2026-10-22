// Web Audio API Synthesizer for Retro ARG / Eerie Mystery Theme and Birthday Finale

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  
  // Ambient Eerie Engine Nodes
  private ambientGain: GainNode | null = null;
  private ambientFilter: BiquadFilterNode | null = null;
  private ambientDroneOsc1: OscillatorNode | null = null;
  private ambientDroneOsc2: OscillatorNode | null = null;
  private ambientDroneOsc3: OscillatorNode | null = null;
  private ambientLfoOsc: OscillatorNode | null = null;
  private ambientChimeTimer: any = null;
  private isAmbientPlaying: boolean = false;
  private ambientDisabled: boolean = false;

  private init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.ambientGain) {
      this.ambientGain.gain.setValueAtTime(0, this.ctx?.currentTime || 0);
    } else if (!this.isMuted && this.ambientGain && this.isAmbientPlaying) {
      this.ambientGain.gain.setValueAtTime(0.08, this.ctx?.currentTime || 0);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Subtle typewriter / keyboard tick
  public playKeyClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600 + Math.random() * 200, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  // Success chime for right answers
  public playSuccess() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.08, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.35);
    });
  }

  // Error buzz for incorrect answer
  public playError() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.2);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  // Magical Relic Unlocked Fanfare
  public playRelicUnlocked() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Ascending sparkle arpeggio
    const arpeggio = [440, 554.37, 659.25, 880, 1108.73, 1318.51, 1760];
    arpeggio.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.07);

      gain.gain.setValueAtTime(0.09, now + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 0.4);
    });
  }

  // Inventory Stored Sound: crisp fantasy RPG deposit chime + velvet chest snap
  public playInventoryStored() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Twinkling crystal deposit shimmer
    const shimmerNotes = [880, 1174.66, 1567.98, 2093.00];
    shimmerNotes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.04);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.05, now + i * 0.04 + 0.15);

      gain.gain.setValueAtTime(0.07, now + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.04 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.35);
    });

    // Warm pouch / latch confirmation snap
    const thudOsc = this.ctx.createOscillator();
    const thudGain = this.ctx.createGain();
    thudOsc.type = 'triangle';
    thudOsc.frequency.setValueAtTime(220, now + 0.12);
    thudOsc.frequency.exponentialRampToValueAtTime(80, now + 0.28);
    thudGain.gain.setValueAtTime(0.1, now + 0.12);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    thudOsc.connect(thudGain);
    thudGain.connect(this.ctx.destination);
    thudOsc.start(now + 0.12);
    thudOsc.stop(now + 0.28);
  }

  // Pulley Gear Spinning Sounds (Ratchet sequence)
  public playPulleySpinSequence(durationMs: number = 2500) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const step = 80; // click interval ms
    const count = Math.floor(durationMs / step);

    for (let i = 0; i < count; i++) {
      const clickTime = this.ctx.currentTime + (i * step) / 1000;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      // Pitch rises subtly as gears accelerate
      const freq = 180 + Math.min(i * 12, 350) + Math.random() * 30;
      osc.frequency.setValueAtTime(freq, clickTime);

      gain.gain.setValueAtTime(0.04, clickTime);
      gain.gain.exponentialRampToValueAtTime(0.001, clickTime + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(clickTime);
      osc.stop(clickTime + 0.035);
    }
  }

  // Pulley Jam / Stall Sound (when RPM answer is wrong)
  public playPulleyJam() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Clattering metal stall
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(180, now);
    osc1.frequency.linearRampToValueAtTime(50, now + 0.4);
    gain1.gain.setValueAtTime(0.12, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.45);

    // Friction rattle
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(95, now + 0.08);
    osc2.frequency.setValueAtTime(140, now + 0.16);
    osc2.frequency.setValueAtTime(70, now + 0.25);
    gain2.gain.setValueAtTime(0.08, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.35);
  }

  // Stone relic socketed into the ancient door
  public playRelicSocketed() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Heavy stone lock thud
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.3);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);

    // Golden rune activation chime
    const runeChime = this.ctx.createOscillator();
    const runeGain = this.ctx.createGain();
    runeChime.type = 'sine';
    runeChime.frequency.setValueAtTime(783.99, now + 0.08); // G5
    runeChime.frequency.exponentialRampToValueAtTime(1174.66, now + 0.2); // D6
    runeGain.gain.setValueAtTime(0.08, now + 0.08);
    runeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
    runeChime.connect(runeGain);
    runeGain.connect(this.ctx.destination);
    runeChime.start(now + 0.08);
    runeChime.stop(now + 0.6);
  }

  // Deep rumble of ancient grand door opening
  public playDoorOpening() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Low rumble
    const rumbleOsc = this.ctx.createOscillator();
    const rumbleGain = this.ctx.createGain();
    rumbleOsc.type = 'triangle';
    rumbleOsc.frequency.setValueAtTime(45, now);
    rumbleOsc.frequency.linearRampToValueAtTime(65, now + 1.2);
    rumbleOsc.frequency.linearRampToValueAtTime(35, now + 2.5);
    rumbleGain.gain.setValueAtTime(0.18, now);
    rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);
    rumbleOsc.connect(rumbleGain);
    rumbleGain.connect(this.ctx.destination);
    rumbleOsc.start(now);
    rumbleOsc.stop(now + 2.8);

    // Heavy iron bolt slides
    [0.1, 0.45, 0.9].forEach(delay => {
      const clank = this.ctx!.createOscillator();
      const clankGain = this.ctx!.createGain();
      clank.type = 'sawtooth';
      clank.frequency.setValueAtTime(320, now + delay);
      clank.frequency.exponentialRampToValueAtTime(110, now + delay + 0.15);
      clankGain.gain.setValueAtTime(0.09, now + delay);
      clankGain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.2);
      clank.connect(clankGain);
      clankGain.connect(this.ctx!.destination);
      clank.start(now + delay);
      clank.stop(now + delay + 0.2);
    });
  }

  public disableEerieAmbient() {
    this.ambientDisabled = true;
    this.stopAmbientDrone();
  }

  // Eerie mystery ambient background music (dark drone + breathing filter + haunting cavern chimes)
  public startAmbientDrone() {
    if (this.ambientDisabled || this.isAmbientPlaying) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Master ambient gain
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : 0.07, now);

      // Low-pass filter for dark, muffled breathing atmosphere
      this.ambientFilter = this.ctx.createBiquadFilter();
      this.ambientFilter.type = 'lowpass';
      this.ambientFilter.frequency.setValueAtTime(260, now);
      this.ambientFilter.Q.setValueAtTime(3.5, now);

      // Eerie Drone 1: C2 (65.4 Hz)
      this.ambientDroneOsc1 = this.ctx.createOscillator();
      this.ambientDroneOsc1.type = 'sawtooth';
      this.ambientDroneOsc1.frequency.setValueAtTime(65.41, now);

      // Eerie Drone 2: Detuned minor interval Eb2 (77.78 Hz) creating slow haunting beat frequency
      this.ambientDroneOsc2 = this.ctx.createOscillator();
      this.ambientDroneOsc2.type = 'triangle';
      this.ambientDroneOsc2.frequency.setValueAtTime(77.78, now);

      // Eerie Drone 3: Sub-bass G1 (49.0 Hz)
      this.ambientDroneOsc3 = this.ctx.createOscillator();
      this.ambientDroneOsc3.type = 'sine';
      this.ambientDroneOsc3.frequency.setValueAtTime(49.00, now);

      // Slow LFO for filter cutoff breathing (0.07 Hz)
      this.ambientLfoOsc = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      this.ambientLfoOsc.type = 'sine';
      this.ambientLfoOsc.frequency.setValueAtTime(0.07, now);
      lfoGain.gain.setValueAtTime(140, now); // Sweeps cutoff between ~120Hz and 400Hz

      this.ambientLfoOsc.connect(lfoGain);
      lfoGain.connect(this.ambientFilter.frequency);

      // Connect drone oscillators through filter to ambientGain
      this.ambientDroneOsc1.connect(this.ambientFilter);
      this.ambientDroneOsc2.connect(this.ambientFilter);
      this.ambientDroneOsc3.connect(this.ambientFilter);

      this.ambientFilter.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.ambientDroneOsc1.start();
      this.ambientDroneOsc2.start();
      this.ambientDroneOsc3.start();
      this.ambientLfoOsc.start();

      this.isAmbientPlaying = true;

      // Start periodic eerie chime notes in the distance
      this.scheduleEerieChimes();
    } catch {
      // Ignore if autoplay blocked until first interaction
    }
  }

  // Periodic haunting crystal notes (diminished / minor scale)
  private scheduleEerieChimes() {
    if (this.ambientChimeTimer) clearTimeout(this.ambientChimeTimer);

    const nextInterval = 4000 + Math.random() * 3500; // every 4-7.5 seconds
    this.ambientChimeTimer = setTimeout(() => {
      if (this.isAmbientPlaying && !this.isMuted && this.ctx) {
        this.playHauntingChimeNote();
      }
      if (this.isAmbientPlaying) {
        this.scheduleEerieChimes();
      }
    }, nextInterval);
  }

  private playHauntingChimeNote() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    // Eerie minor / diminished notes: C4, Eb4, F#4, G4, Bb4, C5, Eb5
    const eerieScale = [261.63, 311.13, 369.99, 392.00, 466.16, 523.25, 622.25];
    const freq = eerieScale[Math.floor(Math.random() * eerieScale.length)];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const bpFilter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    bpFilter.type = 'bandpass';
    bpFilter.frequency.setValueAtTime(freq, now);
    bpFilter.Q.setValueAtTime(5, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.045, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

    osc.connect(bpFilter);
    bpFilter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 3.2);
  }

  public stopAmbientDrone() {
    if (this.ambientChimeTimer) {
      clearTimeout(this.ambientChimeTimer);
      this.ambientChimeTimer = null;
    }
    [this.ambientDroneOsc1, this.ambientDroneOsc2, this.ambientDroneOsc3, this.ambientLfoOsc].forEach(osc => {
      if (osc) {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      }
    });
    this.ambientDroneOsc1 = null;
    this.ambientDroneOsc2 = null;
    this.ambientDroneOsc3 = null;
    this.ambientLfoOsc = null;
    this.isAmbientPlaying = false;
  }

  // Papyrus parchment unrolling & wax seal snap sound
  public playPapyrusUnroll() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Seal crack snap
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.12);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);

    // Parchment paper rustle
    [0.05, 0.12, 0.2, 0.28].forEach((t, i) => {
      const pOsc = this.ctx!.createOscillator();
      const pGain = this.ctx!.createGain();
      pOsc.type = 'sine';
      pOsc.frequency.setValueAtTime(450 + i * 80, now + t);
      pGain.gain.setValueAtTime(0.04, now + t);
      pGain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.1);
      pOsc.connect(pGain);
      pGain.connect(this.ctx!.destination);
      pOsc.start(now + t);
      pOsc.stop(now + t + 0.1);
    });
  }

  // Celebratory "Happy Birthday" Festive Party Fanfare for Game 8 Finale
  public playHappyBirthdayTheme() {
    this.disableEerieAmbient();
    this.init();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime + 0.1;
    const bpm = 138; // More energetic & festive tempo
    const beat = 60 / bpm;

    // Musical notes frequencies
    const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, B4 = 493.88;
    const C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46, G5 = 783.99, A5 = 880.00;
    const C3 = 130.81, F3 = 174.61, G3 = 196.00, A3 = 220.00;

    // Lead Melody: [freq, duration in beats]
    const leadMelody: Array<[number, number]> = [
      // Hap-py Birth-day to you
      [G4, 0.75], [G4, 0.25], [A4, 1.0], [G4, 1.0], [C5, 1.0], [B4, 2.0],
      // Hap-py Birth-day to you
      [G4, 0.75], [G4, 0.25], [A4, 1.0], [G4, 1.0], [D5, 1.0], [C5, 2.0],
      // Hap-py Birth-day dear Bo-chi
      [G4, 0.75], [G4, 0.25], [G5, 1.0], [E5, 1.0], [C5, 1.0], [B4, 1.0], [A4, 2.0],
      // Hap-py Birth-day to you!
      [F5, 0.75], [F5, 0.25], [E5, 1.0], [C5, 1.0], [D5, 1.0], [C5, 2.5]
    ];

    // Play Lead Melody with warm festive brass/synth timbre
    let timeOffset = 0;
    leadMelody.forEach(([freq, beats]) => {
      const dur = beats * beat;

      // Lead Voice (Square + Triangle blend)
      const osc1 = this.ctx!.createOscillator();
      const osc2 = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, now + timeOffset);

      osc2.type = 'square';
      osc2.frequency.setValueAtTime(freq, now + timeOffset);

      gain.gain.setValueAtTime(0.12, now + timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + dur - 0.04);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx!.destination);

      osc1.start(now + timeOffset);
      osc1.stop(now + timeOffset + dur);
      osc2.start(now + timeOffset);
      osc2.stop(now + timeOffset + dur);

      // Festive sparkle chime an octave above for high notes
      if (beats >= 1.0) {
        const chime = this.ctx!.createOscillator();
        const chimeGain = this.ctx!.createGain();
        chime.type = 'sine';
        chime.frequency.setValueAtTime(freq * 2, now + timeOffset);
        chimeGain.gain.setValueAtTime(0.04, now + timeOffset);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + timeOffset + 0.35);
        chime.connect(chimeGain);
        chimeGain.connect(this.ctx!.destination);
        chime.start(now + timeOffset);
        chime.stop(now + timeOffset + 0.35);
      }

      timeOffset += dur;
    });

    // Upbeat celebratory bass accompaniment
    const bassline: Array<[number, number]> = [
      [C3, 2.0], [F3, 2.0], [G3, 2.0],
      [C3, 2.0], [G3, 2.0], [C3, 2.0],
      [C3, 2.0], [F3, 2.0], [F3, 2.0],
      [G3, 2.0], [C3, 3.0]
    ];

    let bassOffset = 0;
    bassline.forEach(([freq, beats]) => {
      const dur = beats * beat;
      const bassOsc = this.ctx!.createOscillator();
      const bassGain = this.ctx!.createGain();

      bassOsc.type = 'triangle';
      bassOsc.frequency.setValueAtTime(freq, now + bassOffset);
      bassGain.gain.setValueAtTime(0.09, now + bassOffset);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + bassOffset + dur - 0.05);

      bassOsc.connect(bassGain);
      bassGain.connect(this.ctx!.destination);

      bassOsc.start(now + bassOffset);
      bassOsc.stop(now + bassOffset + dur);

      bassOffset += dur;
    });
  }
}

export const sound = new SoundManager();
