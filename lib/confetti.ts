// lib/confetti.ts
import confetti from "canvas-confetti";

export const triggerTetConfetti = () => {
  const duration = 4 * 1000; 
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: NodeJS.Timeout = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    
    const tetColors = ['#ff0000', '#ffeb3b', '#ff9800']; 

    confetti({
      ...defaults,
      particleCount,
      colors: tetColors,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      colors: tetColors,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
};