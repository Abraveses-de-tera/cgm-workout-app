param (
    [int]$Port = 8080
)

$appDir = $PSScriptRoot
if (-not $appDir) { $appDir = (Get-Location).Path }

# Get local IP addresses for mobile connection
$localIps = @()
try {
    $hostName = [System.Net.Dns]::GetHostName()
    $addresses = [System.Net.Dns]::GetHostAddresses($hostName)
    foreach ($addr in $addresses) {
        if ($addr.AddressFamily -eq [System.Net.Sockets.AddressFamily]::InterNetwork) {
            $ipStr = $addr.IPAddressToString
            if ($ipStr -notlike "127.*" -and $ipStr -notlike "169.254*") {
                $localIps += $ipStr
            }
        }
    }
} catch { }

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

# Try adding IP prefix if permissions allow
foreach ($ip in $localIps) {
    try {
        $listener.Prefixes.Add("http://${ip}:${Port}/")
    } catch { }
}

try {
    $listener.Start()
} catch {
    # If specific IP binding failed, try with localhost only
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$Port/")
    $listener.Start()
}

Clear-Host
Write-Host "==========================================================" -ForegroundColor DarkYellow
Write-Host "   CGM PERFORMANCE · SERVIDOR LOCAL RÁPIDO PARA MÓVIL    " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor DarkYellow
Write-Host ""
Write-Host "💻 En este ordenador abre:" -ForegroundColor Cyan
Write-Host "   http://localhost:$Port" -ForegroundColor Green
Write-Host ""
if ($localIps.Count -gt 0) {
    Write-Host "📱 En tu móvil (conectado a la misma red Wi-Fi) abre:" -ForegroundColor Cyan
    foreach ($ip in $localIps) {
        Write-Host "   http://${ip}:$Port" -ForegroundColor Yellow
    }
    Write-Host ""
    Write-Host "💡 Consejo móvil: En el navegador de tu teléfono toca" -ForegroundColor Gray
    Write-Host "   'Añadir a pantalla de inicio' para tenerla como app nativa." -ForegroundColor Gray
} else {
    Write-Host "📱 Para verla en el móvil:" -ForegroundColor Cyan
    Write-Host "   Asegúrate de estar en la misma red Wi-Fi y usa la IP de tu PC." -ForegroundColor Gray
}
Write-Host ""
Write-Host "Pulsa Ctrl + C para detener el servidor." -ForegroundColor DarkGray
Write-Host "----------------------------------------------------------" -ForegroundColor DarkYellow

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".webmanifest" = "application/manifest+json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".ico"  = "image/x-icon"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($urlPath)) {
            $urlPath = "index.html"
        }

        $filePath = Join-Path $appDir $urlPath

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = "application/octet-stream"
            if ($mimeTypes.ContainsKey($ext)) {
                $mime = $mimeTypes[$ext]
            }

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $mime
            $response.ContentLength64 = $bytes.Length
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
            $response.Headers.Add("Cache-Control", "no-cache")
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 - Not Found")
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }

        $response.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
