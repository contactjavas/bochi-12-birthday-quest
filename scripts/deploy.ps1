# deploy.ps1
# Rebuilds the app (renderer + main) and redeploys the UNPACKED build to the
# autostart install location used by the scheduled task:
#   C:\ProgramData\BochiBirthdayQuest\app\
#
# Run after any change to src/ so the version Bochi sees at login is updated.
# If the game is currently running in another user's session, killing it and
# copying requires admin -> the script self-elevates in that case.

param(
  [string]$DeployDir = "C:\ProgramData\BochiBirthdayQuest\app"
)

$ErrorActionPreference = "Stop"
$root = Resolve-Path "$PSScriptRoot\.."
$exeName = "Bochi Birthday Quest.exe"

# --- 1. Build ---------------------------------------------------------------
Write-Host "==> Building renderer + electron main..."
pnpm -C $root run build
if ($LASTEXITCODE -ne 0) { throw "Build failed." }

Write-Host "==> Packaging unpacked build (electron-builder --dir)..."
pnpm -C $root exec electron-builder --dir
if ($LASTEXITCODE -ne 0) { throw "electron-builder failed." }

$source = Join-Path $root "release\win-unpacked"
if (-not (Test-Path (Join-Path $source $exeName))) {
  throw "Expected output not found: $source\$exeName"
}

# --- 2. Deploy ---------------------------------------------------------------
function Copy-Build {
  New-Item -ItemType Directory -Force -Path $DeployDir | Out-Null
  # Mirror source -> deploy dir (deletes stale files too)
  robocopy $source $DeployDir /MIR /NFL /NDL /NJH /R:2 /W:1 | Out-Null
  # robocopy exit codes 0-7 are success
  if ($LASTEXITCODE -gt 7) { throw "robocopy failed (exit $LASTEXITCODE) - files may be locked." }
}

try {
  Copy-Build
} catch {
  $isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()
    ).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
  if ($isAdmin) { throw }

  Write-Warning "Copy failed ($($_.Exception.Message)). Killing running instances and retrying elevated..."
  Start-Process powershell -Verb RunAs -Wait -ArgumentList @(
    '-NoProfile','-ExecutionPolicy','Bypass','-Command',
    "taskkill /F /IM `"$exeName`" 2>`$null; Start-Sleep 2; robocopy `"$source`" `"$DeployDir`" /MIR /NFL /NDL /NJH /R:2 /W:1")
  if (-not (Test-Path (Join-Path $DeployDir $exeName))) { throw "Elevated copy failed - $exeName not found in $DeployDir" }
}

Write-Host ""
Write-Host "Deployed to $DeployDir" -ForegroundColor Green
Write-Host "Next logon/unlock as target user will run the updated build."
