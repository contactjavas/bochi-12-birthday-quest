# uninstall-autostart.ps1
# Removes the Bochi Birthday Quest scheduled task (and optionally the deployed exe).

param(
  [string]$TaskName = "BochiBirthdayQuest",
  [string]$UserName = "Bochi",
  [switch]$RemoveFiles
)

$ErrorActionPreference = "Stop"

# --- Self-elevate only when removing a task owned by ANOTHER user -----------
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()
  ).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin -and ($env:USERNAME -ine $UserName)) {
  Write-Host "Removing a task owned by user '$UserName' requires Administrator. Relaunching elevated..."
  $argList = @('-NoProfile','-ExecutionPolicy','Bypass','-File',"`"$PSCommandPath`"",
               '-UserName',"`"$UserName`"",'-TaskName',"`"$TaskName`"")
  if ($RemoveFiles) { $argList += '-RemoveFiles' }
  Start-Process powershell -Verb RunAs -Wait -ArgumentList $argList
  exit
}

$task = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
if ($task) {
  Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
  Write-Host "Task '$TaskName' removed." -ForegroundColor Green
} else {
  Write-Host "Task '$TaskName' not found - nothing to remove."
}

$shortcutPath = "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Bochi Birthday Quest.lnk"
if (Test-Path $shortcutPath) {
  Remove-Item $shortcutPath -Force
  Write-Host "Removed Start Menu shortcut."
}

if ($RemoveFiles) {
  $dirs = @(
    "C:\ProgramData\BochiBirthdayQuest",
    "C:\Users\$UserName\AppData\Local\BochiBirthdayQuest"
  )
  foreach ($d in $dirs) {
    if (Test-Path $d) {
      Remove-Item $d -Recurse -Force
      Write-Host "Removed $d"
    }
  }
}
