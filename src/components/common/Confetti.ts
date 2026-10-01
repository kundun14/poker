import confetti from 'canvas-confetti';

export function fireSuccessConfetti() {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.7 },
    colors: ['#10b981', '#34d399', '#6ee7b7', '#f59e0b', '#3b82f6'],
  });
}
