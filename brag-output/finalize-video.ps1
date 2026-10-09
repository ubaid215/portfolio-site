$ErrorActionPreference = 'Stop'
$videoOutputRoot = $PSScriptRoot
$videoSource = Join-Path $videoOutputRoot 'brag.mp4'
$videoPosterTemp = Join-Path $videoOutputRoot 'poster-corrected.jpg'
$videoPosterFinal = Join-Path $videoOutputRoot 'brag.jpg'
$videoFinalTemp = Join-Path $videoOutputRoot 'brag.corrected.mp4'

# JPEG viewers expect the BT.601 matrix; keep the video in BT.709.
& ffmpeg -hide_banner -loglevel error -y -ss 19.5 -i $videoSource -vf 'scale=in_color_matrix=bt709:out_color_matrix=bt601' -frames:v 1 -q:v 2 -colorspace smpte170m $videoPosterTemp
if ($LASTEXITCODE -ne 0) { throw 'Poster extraction failed.' }

& ffmpeg -hide_banner -loglevel error -y -i $videoSource -i $videoPosterTemp -filter_complex "[1:v]scale=in_color_matrix=bt601:out_color_matrix=bt709[poster];[0:v][poster]overlay=0:0:enable='eq(n,0)'[v]" -map '[v]' -map '0:a?' -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -color_primaries bt709 -color_trc bt709 -colorspace bt709 -c:a copy -movflags +faststart $videoFinalTemp
if ($LASTEXITCODE -ne 0) { throw 'Poster baking failed.' }

Move-Item -LiteralPath $videoFinalTemp -Destination $videoSource -Force
Copy-Item -LiteralPath $videoPosterTemp -Destination $videoPosterFinal -Force
