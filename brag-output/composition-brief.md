# Composition brief — ubaid.dev

Create a 22-second, 1920×1080 launch film at 30 fps. Use the source-grounded storyboard in brag-plan.md. Readability outranks transition spectacle.

## Art direction
Ink canvas, parchment lettering, jade accents. Space Grotesk for large display lines, Geist for supporting copy. Preserve the sans-serif requirement. Use a persistent architectural edge, restrained image depth, and large typography anchored to the frame. Treat the actual commerce screenshot as an interface artifact, with no fabricated interactions or numbers.

## Assets
Copy only the selected artwork, real commerce screen, fonts, local GSAP runtime, music, and four sound effects into composition/assets. Runtime must work offline and seek deterministically. Do not change portfolio source files or run its build.

## Motion
One paused GSAP timeline registered after construction. Separate timed scene clips; animate their inner wrappers. Use masked line reveals, a composed interface entrance, SVG connection tracing, and a slow final image reframe. Motion should move content itself, then settle. Hold labels at least 0.8 seconds and sentences at least 0.3 seconds per word. Final state remains on screen until the end.

## Timing and audio
Scenes begin at 0, 3.27, 8.74, 13.11, 17.47. Workflow steps start at 9.29, 9.83, 10.37, 10.93. Music gain 0.34; native automation for fades. Sparse impact/click accents. Precompute bass energy and use it only for an architectural jade edge glow. No voiceover, runtime audio analysis, infinite loops, or random motion.

## Verification and delivery
Run Hyperframes check with snapshots and inspect settled frames, particularly the real interface and closing lockup. Fix runtime, contrast, and layout defects. Render locally with delivery quality, verify dimensions, frame rate, duration, and audio. Extract the best settled closing frame as brag.jpg and bake it as MP4 frame zero without changing timing or audio. Deliver brag.mp4, brag.jpg, share-copy.txt, and the editable composition.
