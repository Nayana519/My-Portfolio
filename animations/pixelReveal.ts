/**
 * Draws an image onto a canvas as a grid of pixel blocks, then animates
 * the block size down from large "pixelated" cells to fully resolved,
 * giving a glitch/pixel-reveal effect on load.
 */
export function runPixelReveal(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  onComplete?: () => void
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { width, height } = canvas;
  const startBlock = 28;
  const endBlock = 1;
  const durationMs = 1400;
  const startTime = performance.now();

  ctx.imageSmoothingEnabled = false;

  function draw(now: number) {
    if (!ctx) return;
    const elapsed = now - startTime;
    const t = Math.min(elapsed / durationMs, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const blockSize = Math.max(
      endBlock,
      Math.round(startBlock - (startBlock - endBlock) * eased)
    );

    const scaledW = Math.max(1, Math.floor(width / blockSize));
    const scaledH = Math.max(1, Math.floor(height / blockSize));

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(image, 0, 0, scaledW, scaledH);
    ctx.drawImage(
      canvas,
      0,
      0,
      scaledW,
      scaledH,
      0,
      0,
      width,
      height
    );

    if (t < 1) {
      requestAnimationFrame(draw);
    } else {
      ctx.imageSmoothingEnabled = true;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(image, 0, 0, width, height);
      onComplete?.();
    }
  }

  requestAnimationFrame(draw);
}
