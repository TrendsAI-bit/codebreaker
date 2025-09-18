// Puzzle data and validation logic
export interface Puzzle {
  id: number;
  title: string;
  description: string;
  image: string;
  answerHash: string;
  fragment: string;
}

export const puzzles: Puzzle[] = [
  {
    id: 1,
    title: "Puzzle I: The Gateway",
    description: "What ancient structure marks the boundary between the sacred and the profane?",
    image: "/art/puzzle-1.jpg",
    answerHash: "bf4a7f3362a2f8a571a1dff76500ec7622e54257d7abedec341d2e9ac369b963", // "TORII" in SHA-256
    fragment: "5K"
  },
  {
    id: 2,
    title: "Puzzle II: The Knowledge",
    description: "What illuminates the path to wisdom in the darkest of times?",
    image: "/art/puzzle-2.jpg",
    answerHash: "5818428b08945d56dfce0f7d4472f2ec8367d629e7f77b4ea6371ea63466d3cb", // "LIGHT" in SHA-256
    fragment: "J8"
  },
  {
    id: 3,
    title: "Puzzle III: The Inscription",
    description: "What three characters are carved into the ancient stone?",
    image: "/art/puzzle-3.jpg",
    answerHash: "5a7f5e754c38864a09abe479d38cdfc61a04357df075b67e40c2e86dbd0fd3d9", // "3UZ" in SHA-256
    fragment: "9M"
  },
  {
    id: 4,
    title: "Puzzle IV: The Garden",
    description: "What grows in the garden of infinite pieces?",
    image: "/art/puzzle-4.jpg",
    answerHash: "9d9775f4bf6c1202b9479b34e20145d880e1ba7c5af2622c2d178a33f4f00baf", // "PUZZLE" in SHA-256
    fragment: "2N"
  },
  {
    id: 5,
    title: "Puzzle V: The Final Test",
    description: "What is the sum of all previous fragments?",
    image: "/art/puzzle-5.svg",
    answerHash: "c308872f46e1e357f69c0068afe1f1b6bcffc9cc7709a4bdc39ad385fa16d864", // "5KJ89M2N" in SHA-256
    fragment: "7Q"
  }
];

export async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function validateAnswer(answer: string, expectedHash: string): Promise<boolean> {
  const normalizedAnswer = answer.trim().toUpperCase();
  return hashString(normalizedAnswer).then(hash => hash === expectedHash);
}

export function getProgress(): number[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('vq_progress_v1');
  return stored ? JSON.parse(stored) : [];
}

export function saveProgress(completedPuzzles: number[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('vq_progress_v1', JSON.stringify(completedPuzzles));
}

export function getUnlockedFragments(): string[] {
  const completedPuzzles = getProgress();
  return puzzles
    .filter(puzzle => completedPuzzles.includes(puzzle.id))
    .map(puzzle => puzzle.fragment)
    .sort();
}

export function buildFinalKey(): string {
  return getUnlockedFragments().join('');
}
