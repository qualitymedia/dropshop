# Run this file as Administrator to open Port 3000 for the DropShop Dev Server
# Right-click this file -> "Run with PowerShell"

$ruleName = "DropShop Dev Server"
$existing = netsh advfirewall firewall show rule name="$ruleName" 2>&1

if ($existing -like "*No rules match*") {
    netsh advfirewall firewall add rule name="$ruleName" dir=in action=allow protocol=TCP localport=3000
    Write-Host "[OK] Firewall rule added. Port 3000 is now open for LAN access." -ForegroundColor Green
} else {
    Write-Host "[INFO] Firewall rule already exists. Port 3000 is already open." -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Now starting DropShop server..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot"
node backend/server.js
