# ubaid.dev launch film

22-second landscape launch video, 1920×1080 at 30 fps, with music and sparse sound effects. No voiceover.

## Deliverables

- `brag.mp4` — shareable H.264/AAC video with a settled brand frame baked into frame zero.
- `brag.jpg` — custom thumbnail.
- `share-copy.txt` — caption to accompany the video.
- `composition/index.html` — editable, offline HTML/GSAP composition.
- `brag-plan.md` and `composition-brief.md` — story and art direction.

## Story

Homepage hook → actual commerce project → example AI workflow → SEO and digital marketing → invitation to start a conversation. The AI workflow is an illustration of service scope, clearly labeled as an example. No invented client outcomes or performance statistics are used.

## Assets

Artwork and project screen are copied from the portfolio. Display font: Space Grotesk from Google Fonts. Body font: Geist from the installed portfolio package. Music and sound effects are from Brag's bundled asset library. All runtime files are local to `composition/assets`.

## Preview and render

From `composition/`, use the pinned Hyperframes commands in package.json. FFmpeg and FFprobe must be on PATH.

```powershell
npm run dev
npm run check
npm run render -- --output ../brag.mp4 --quality delivery --fps 30 --workers 2
../finalize-video.ps1
```

No portfolio build command was run, and no portfolio page source was changed for this film.

## Verification

Hyperframes check passed with no runtime, layout, motion, or contrast errors; 59 contrast samples passed. Four settled scene snapshots and six frames extracted from the MP4 were reviewed, including the commerce entrance and final frame. The linter's six warnings concern repeated use of the same static artwork and flat scene organization; both are deliberate in this short single-timeline film.

Poster selected from the settled final brand lockup at 19.5 seconds. Only frame zero is replaced during thumbnail baking; audio is copied unchanged. Explicit JPEG BT.601 and video BT.709 matrix conversions preserve the jade branding in the thumbnail and video.

Final export verified: H.264, 1920×1080, 30 fps, 660 frames, exactly 22 seconds; stereo AAC audio. Extracted frame zero confirms the thumbnail is baked into the video.
