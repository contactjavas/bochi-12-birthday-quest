# Bochi Birthday Quest 🎂

Aplikasi kejutan ulang tahun ke-12 untuk Bochi — game teka-teki misterius bergaya
*terminal hacker / ARG* yang **mengambil alih layar secara otomatis** setiap kali
Bochi login ke Windows atau membuka kunci laptopnya.

Bochi menyalakan laptop seperti biasa → beberapa detik kemudian layar berubah
menjadi konsol misterius fullscreen → dia harus memecahkan 8 stage puzzle untuk
membuka pesan kejutan tersembunyi di stage terakhir.

## Cara Kerja (Flow)

```
Bochi login Windows (atau unlock workstation)
        │
        ▼
Task Scheduler "BochiBirthdayQuest" trigger
(terikat SID user Bochi saja — user lain tidak memicu game)
        │
        ├─ Login  → delay 3 detik
        └─ Unlock → tanpa delay
        │
        ▼
C:\ProgramData\BochiBirthdayQuest\app\Bochi Birthday Quest.exe
        │
        ▼
Electron fullscreen kiosk (frameless, always-on-top, Alt+F4 diblokir)
        │
        ▼
Landing Page (welcome screen)
        │
        ▼
Game — 8 stage puzzle:
  1. Robus Kata         5. Matriks Diagonal
  2. Sidang Logika      6. Mozaik Geometri
  3. Katrol Mekanik     7. Siluet Alami
  4. Kristal Daya       8. Surprise Finale → exitApp()
        │
        ▼
App keluar sendiri setelah finale selesai
```

### Perilaku progres (by design)

- **Setiap launch = fresh run.** Progres sengaja selalu di-reset ke stage 1
  (`src/renderer/stores/gameState.ts`) supaya tiap login jadi kejutan utuh.
- **Lock → unlock saat game masih jalan tidak me-reset** — task scheduler
  (`IgnoreNew`) tidak membuat instance baru, jadi Bochi lanjut di titik terakhir.

### Cara keluar (untuk developer, bukan Bochi)

| Cara | Efek |
|---|---|
| `Ctrl+Shift+Alt+X` | Force quit kapan saja |
| Alt+F4 | Diblokir (production) |
| Task Manager / sign out | Bisa kill — tapi unlock berikutnya me-relaunch game |
| Windows Search → "Bochi Birthday Quest" | Relaunch manual (Start Menu shortcut) |

## Tech Stack

- **Electron 34** — fullscreen kiosk (`kiosk`, `frame: false`, `alwaysOnTop`)
- **SolidJS + Vite + TypeScript** — renderer
- **Tailwind CSS** — styling + CRT/glitch effects
- **electron-builder** — packaging
- **pnpm** — package manager
- **PowerShell + Task Scheduler** — autostart per-user

## Commands

```bash
# Development
pnpm run dev          # vite dev server (renderer saja)
pnpm start            # jalankan electron . hasil build

# Build & package
pnpm run build        # compile renderer (dist/) + main (dist-electron/)
pnpm run pack         # build + electron-builder --dir → release/win-unpacked
pnpm run dist         # full package: portable exe + NSIS installer → release/

# Deploy (PENTING)
pnpm run deploy       # build + package + copy unpacked ke
                      # C:\ProgramData\BochiBirthdayQuest\app\
                      # ← yang dijalankan scheduled task. WAJIB setelah ubah src/
```

**Perubahan di `src/` tidak otomatis tampil ke Bochi** — yang jalan saat login
adalah snapshot ter-install. Selalu akhiri perubahan dengan `pnpm run deploy`.

## Instalasi Autostart

```powershell
# Daftarkan task untuk user Bochi (self-elevate otomatis)
.\scripts\install-autostart.ps1

# Opsi
-UserName "Bochi"     # target user Windows
-LogonDelaySec 3      # delay setelah login
-NoDeploy -ExePath X  # tunjuk exe langsung tanpa copy (mode unpacked)

# Hapus
.\scripts\uninstall-autostart.ps1 -RemoveFiles
```

Script ini membuat: scheduled task (logon + unlock, terikat SID target) +
Start Menu shortcut + copy exe ke lokasi stabil. Task hanya berjalan di sesi
interaktif user target.

## Struktur Direktori

```text
├── src/main/index.ts        # Electron main: kiosk window, IPC, dev escape
├── src/preload/index.ts     # contextBridge: exitApp, toggleFullscreen
├── src/renderer/            # SolidJS app
│   ├── puzzles/             # Game1Robus ... Game8Finale
│   ├── stores/gameState.ts  # stage state (selalu reset tiap launch)
│   ├── components/          # LandingPage, modals, dll
│   └── utils/sound.ts       # audio engine
├── scripts/                 # install/uninstall autostart + deploy
├── electron-builder.yml     # packaging config (electronDist workaround)
├── electron-dist/           # pre-extracted Electron runtime
├── build/icon.png           # app icon
└── release/                 # build output
```

## Catatan Environment (mesin dev ini)

- `ELECTRON_RUN_AS_NODE=1` ter-set di shell → binary Electron jalan sebagai Node.
  Untuk test manual: `env -u ELECTRON_RUN_AS_NODE <exe>`
- Extraction Electron sering kena lock EPERM → `electron-builder.yml` memakai
  `electronDist: electron-dist`, dan `node_modules/electron/dist` diisi manual
  via `scripts/setup-electron.js`.
- Exe tidak di-sign → Windows SmartScreen warning "unrecognized app" saat run
  pertama → **More info → Run anyway**.
