$ErrorActionPreference = 'Stop'
$contactWorkspace = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$contactEnvFile = Join-Path $contactWorkspace '.env.local'
Write-Host 'Configure the Gmail account that should receive portfolio enquiries.'
Write-Host 'Use a Google app password, not your normal Google password. Your password stays hidden.'
$contactGmailUser = (Read-Host 'Gmail address').Trim()
if ($contactGmailUser -notmatch '^[^\s@]+@[^\s@]+\.[^\s@]+$') { throw 'Enter a valid Gmail or Google Workspace address.' }
$contactSecurePassword = Read-Host '16-character Google app password' -AsSecureString
$contactPasswordPointer = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($contactSecurePassword)
try {
  $contactAppPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($contactPasswordPointer) -replace '\s', ''
  if ($contactAppPassword -notmatch '^[a-zA-Z0-9]{16}$') { throw 'Use the 16-character app password from Google.' }
  $contactExistingEnv = if (Test-Path -LiteralPath $contactEnvFile) { [System.IO.File]::ReadAllText($contactEnvFile) } else { '' }
  $contactExistingEnv = [regex]::Replace($contactExistingEnv, '(?m)^\s*(?:export\s+)?GMAIL_(?:USER|APP_PASSWORD)\s*=.*(?:\r?\n|$)', '')
  $contactNewEnv = $contactExistingEnv.TrimEnd() + "`nGMAIL_USER=$contactGmailUser`nGMAIL_APP_PASSWORD=$contactAppPassword`n"
  [System.IO.File]::WriteAllText($contactEnvFile, $contactNewEnv, [System.Text.UTF8Encoding]::new($false))
} finally {
  [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($contactPasswordPointer)
  $contactAppPassword = $null
  $contactNewEnv = $null
}
Write-Host 'Saved to .env.local (ignored by Git).'
Push-Location $contactWorkspace
$contactCheckExit = 0
try {
  & node --experimental-strip-types scripts/check-contact-email.mjs --send-test
  $contactCheckExit = $LASTEXITCODE
}
finally { Pop-Location }
if ($contactCheckExit -ne 0) {
  Write-Host 'Gmail verification failed. Review docs/contact-email-setup.md, correct the setup, and run this script again.'
  exit $contactCheckExit
}
Write-Host 'Restart your development server after setup. Configure the same two variables on your hosting platform for the live site.'
