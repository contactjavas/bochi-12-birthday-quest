# install-autostart.ps1
# Registers "Bochi Birthday Quest" in Windows Task Scheduler so the game
# auto-launches ONLY when the target Windows user logs on or unlocks the
# workstation. Other users logging in will not trigger the game.
#
# Usage (run PowerShell as Administrator for best results):
#   .\install-autostart.ps1                          # user "Bochi", exe from release\
#   .\install-autostart.ps1 -UserName "Bochi" -ExePath "C:\path\to\game.exe"

param(
  [string]$UserName = "Bochi",
  [string]$ExePath,
  [string]$TaskName = "BochiBirthdayQuest",
  [int]$LogonDelaySec = 5,
  [switch]$NoDeploy  # Point the task directly at -ExePath without copying (for unpacked installs)
)

$ErrorActionPreference = "Stop"

# --- Self-elevate only when registering a task for ANOTHER user -------------
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()
  ).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin -and ($env:USERNAME -ine $UserName)) {
  Write-Host "Registering a task for user '$UserName' requires Administrator. Relaunching elevated..."
  $argList = @('-NoProfile','-ExecutionPolicy','Bypass','-File',"`"$PSCommandPath`"",
               '-UserName',"`"$UserName`"",'-TaskName',"`"$TaskName`"",'-LogonDelaySec',$LogonDelaySec)
  if ($ExePath) { $argList += @('-ExePath',"`"$ExePath`"") }
  if ($NoDeploy) { $argList += '-NoDeploy' }
  Start-Process powershell -Verb RunAs -Wait -ArgumentList $argList
  exit
}

# --- Resolve exe path -------------------------------------------------------
if (-not $ExePath) {
  $default = Join-Path $PSScriptRoot "..\release\BochiBirthdayQuest-1.0.0-portable.exe"
  if (Test-Path $default) {
    $ExePath = $default
  } else {
    throw "ExePath not specified and no portable exe found at '$default'. Run 'pnpm run dist' first or pass -ExePath."
  }
}
$ExePath = (Resolve-Path $ExePath).Path
Write-Host "Game exe   : $ExePath"

# --- Resolve target user SID -------------------------------------------------
try {
  $sid = (New-Object System.Security.Principal.NTAccount($UserName)).Translate(
    [System.Security.Principal.SecurityIdentifier]).Value
} catch {
  throw "Windows user '$UserName' not found on this machine."
}
Write-Host "Target user: $UserName (SID $sid)"

# --- Deploy exe to a stable location ----------------------------------------
if ($NoDeploy) {
  $deployedExe = $ExePath
  Write-Host "NoDeploy   : task will point directly at $deployedExe"
} else {
  $runningAsTarget = ($env:USERNAME -ieq $UserName)
  $installDir = if ($runningAsTarget) {
    Join-Path $env:LOCALAPPDATA "BochiBirthdayQuest"
  } else {
    "C:\ProgramData\BochiBirthdayQuest"
  }
  try {
    New-Item -ItemType Directory -Force -Path $installDir | Out-Null
    $deployedExe = Join-Path $installDir (Split-Path $ExePath -Leaf)
    Copy-Item $ExePath $deployedExe -Force
    Write-Host "Deployed to: $deployedExe"
  } catch {
    Write-Warning "Cannot write to '$installDir' ($($_.Exception.Message)). Task will point to the original exe path."
    $deployedExe = $ExePath
  }
}

# --- Build task XML ----------------------------------------------------------
$delay = "PT${LogonDelaySec}S"
$taskXml = @"
<?xml version="1.0" encoding="UTF-16"?>
<Task version="1.2" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
  <RegistrationInfo>
    <Description>Bochi 12th Birthday Quest - auto-start ARG terminal game for user $UserName</Description>
  </RegistrationInfo>
  <Triggers>
    <LogonTrigger>
      <Enabled>true</Enabled>
      <UserId>$sid</UserId>
      <Delay>$delay</Delay>
    </LogonTrigger>
    <SessionStateChangeTrigger>
      <Enabled>true</Enabled>
      <StateChange>SessionUnlock</StateChange>
      <UserId>$sid</UserId>
    </SessionStateChangeTrigger>
  </Triggers>
  <Principals>
    <Principal id="Author">
      <UserId>$sid</UserId>
      <LogonType>InteractiveToken</LogonType>
      <RunLevel>LeastPrivilege</RunLevel>
    </Principal>
  </Principals>
  <Settings>
    <MultipleInstancesPolicy>IgnoreNew</MultipleInstancesPolicy>
    <DisallowStartIfOnBatteries>false</DisallowStartIfOnBatteries>
    <StopIfGoingOnBatteries>false</StopIfGoingOnBatteries>
    <AllowHardTerminate>true</AllowHardTerminate>
    <StartWhenAvailable>true</StartWhenAvailable>
    <RunOnlyIfNetworkAvailable>false</RunOnlyIfNetworkAvailable>
    <ExecutionTimeLimit>PT0S</ExecutionTimeLimit>
    <Enabled>true</Enabled>
    <Hidden>false</Hidden>
  </Settings>
  <Actions Context="Author">
    <Exec>
      <Command>"$deployedExe"</Command>
    </Exec>
  </Actions>
</Task>
"@

# --- Register ----------------------------------------------------------------
try {
  Register-ScheduledTask -TaskName $TaskName -Xml $taskXml -Force | Out-Null
} catch {
  throw "Failed to register task: $($_.Exception.Message)`nTry running this script from an elevated (Administrator) PowerShell."
}

# --- Start Menu shortcut (searchable via Windows Search for all users) -------
$shortcutPath = "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Bochi Birthday Quest.lnk"
try {
  $wsh = New-Object -ComObject WScript.Shell
  $lnk = $wsh.CreateShortcut($shortcutPath)
  $lnk.TargetPath = $deployedExe.Trim('"')
  $lnk.WorkingDirectory = Split-Path $deployedExe.Trim('"')
  $lnk.Description = "Bochi 12th Birthday Quest"
  $lnk.Save()
  Write-Host "Shortcut  : $shortcutPath (findable via Windows Search)"
} catch {
  Write-Warning "Could not create Start Menu shortcut: $($_.Exception.Message)"
}

Write-Host ""
Write-Host "Task '$TaskName' registered successfully." -ForegroundColor Green
Write-Host "Triggers : logon + workstation unlock, bound to user '$UserName' only"
Write-Host "Relaunch : Windows key -> type 'Bochi' (Start Menu shortcut), or lock + unlock"
Write-Host "Test now : powershell -c `"Start-ScheduledTask -TaskName '$TaskName'`"  (must be run inside ${UserName}'s session)"
Write-Host "Remove   : .\uninstall-autostart.ps1"
