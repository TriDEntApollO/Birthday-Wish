// confetti.ts
// @ts-ignore
import confetti, { Options as ConfettiOptions } from "canvas-confetti";

let confettiInstance: ReturnType<typeof confetti.create> | null = null;
let canvas: HTMLCanvasElement | null = null;

/**
 * Initializes the confetti canvas. Call this once at app root.
 */
export function initConfetti(canvasEl: HTMLCanvasElement) {
  canvas = canvasEl;
  confettiInstance = confetti.create(canvasEl, {
    resize: true,
    useWorker: true,
  });
}

/**
 * Fire confetti programmatically.
 */
export function showConfetti(options: ConfettiOptions = {}) {
  if (confettiInstance) {
    confettiInstance(options);
  } else {
    // fallback: create a temporary full-screen canvas if not initialized
    const tempCanvas = document.createElement("canvas");
    tempCanvas.style.position = "fixed";
    tempCanvas.style.top = "0";
    tempCanvas.style.left = "0";
    tempCanvas.style.width = "100%";
    tempCanvas.style.height = "100%";
    tempCanvas.style.pointerEvents = "none";
    document.body.appendChild(tempCanvas);

    const tempInstance = confetti.create(tempCanvas, { resize: true, useWorker: true });
    tempInstance(options);

    // remove canvas after a while
    setTimeout(() => {
      document.body.removeChild(tempCanvas);
    }, 5000);
  }
}
