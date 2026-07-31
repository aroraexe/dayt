Add-Type -AssemblyName System.Drawing
$imagePath = 'C:\Users\king4\Desktop\day\public\images\her\new\WhatsApp Image 2026-07-31 at 10.23.33 PM (2).jpeg'
$img = New-Object System.Drawing.Bitmap($imagePath)

$minY = $img.Height
$maxY = 0

for ($y = 0; $y -lt $img.Height; $y += 5) {
    $isBlackRow = $true
    for ($x = 0; $x -lt $img.Width; $x += 20) {
        $pixel = $img.GetPixel($x, $y)
        if ($pixel.R -gt 20 -or $pixel.G -gt 20 -or $pixel.B -gt 20) {
            $isBlackRow = $false
            break
        }
    }
    if (-not $isBlackRow) {
        if ($y -lt $minY) { $minY = $y }
        if ($y -gt $maxY) { $maxY = $y }
    }
}

# Add a little padding to the crop bounds
$minY = [Math]::Max(0, $minY - 10)
$maxY = [Math]::Min($img.Height - 1, $maxY + 10)

$newHeight = $maxY - $minY + 1
$newWidth = $img.Width

$rect = New-Object System.Drawing.Rectangle(0, $minY, $newWidth, $newHeight)
$cropped = $img.Clone($rect, $img.PixelFormat)
$img.Dispose()

$outPath = 'C:\Users\king4\Desktop\day\public\images\her\new\cropped_23.jpeg'
$cropped.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$cropped.Dispose()
Write-Host "Cropped successfully to $outPath"
