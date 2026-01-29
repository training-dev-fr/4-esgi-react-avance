# create-react-item.ps1
# Lancer depuis la racine du projet (src/ doit exister)
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Select-ArrowMenu {
    param(
        [Parameter(Mandatory=$true)][string]$Title,
        [Parameter(Mandatory=$true)][string[]]$Options
    )

    $index = 0

    # Petites helpers pour ré-afficher le menu
    function Render {
        Clear-Host
        Write-Host $Title -ForegroundColor Cyan
        Write-Host "Utilise  puis Entrée" -ForegroundColor DarkGray
        Write-Host ""

        for ($i=0; $i -lt $Options.Count; $i++) {
            if ($i -eq $index) {
                Write-Host ("+ " + $Options[$i]) -ForegroundColor Black -BackgroundColor Gray
            } else {
                Write-Host ("- " + $Options[$i])
            }
        }
    }

    Render

    while ($true) {
        $key = [Console]::ReadKey($true)

        switch ($key.Key) {
            "UpArrow" {
                $index = ($index - 1 + $Options.Count) % $Options.Count
                Render
            }
            "DownArrow" {
                $index = ($index + 1) % $Options.Count
                Render
            }
            "Enter" {
                Clear-Host
                return $Options[$index]
            }
            default { }
        }
    }
}

function Ask-ComponentName {
    while ($true) {
        $name = Read-Host "Nom du composant / de la page (PascalCase recommandé)"
        $name = $name.Trim()

        if ([string]::IsNullOrWhiteSpace($name)) {
            Write-Host "❌ Le nom ne peut pas être vide." -ForegroundColor Yellow
            continue
        }

        if ($name -notmatch '^[A-Za-z][A-Za-z0-9_]*$') {
            Write-Host "❌ Nom invalide (ex: Home, ProductList, AdminDashboard)." -ForegroundColor Yellow
            continue
        }

        return $name
    }
}

# 1) Menus flèches
$type  = Select-ArrowMenu -Title "Que veux-tu créer ?" -Options @("Page", "Composant")
$scope = Select-ArrowMenu -Title "Dans quel scope ?" -Options @("Public", "Admin")
$name  = Ask-ComponentName

# 2) Chemins
$root = Join-Path (Get-Location) "src"
$baseFolder = if ($type -eq "Page") { "Page" } else { "Component" }
$targetDir = Join-Path $root (Join-Path $baseFolder (Join-Path $scope $name))

# 3) Création
if (Test-Path $targetDir) {
    Write-Host "❌ Le dossier existe déjà : $targetDir" -ForegroundColor Red
    exit 1
}

New-Item -ItemType Directory -Path $targetDir | Out-Null

# 4) Fichiers
$cssPath = Join-Path $targetDir "$name.css"
$jsxPath = Join-Path $targetDir "$name.jsx"

New-Item -ItemType File -Path $cssPath | Out-Null

$jsxContent = @"
import './$name.css';

export default function $name(){
    return (
        <>
            
        </>
    )
}
"@

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($jsxPath, $jsxContent, $utf8NoBom)

Write-Host "✅ Créé :" -ForegroundColor Green
Write-Host " - $targetDir"
Write-Host " - $cssPath"
Write-Host " - $jsxPath"
