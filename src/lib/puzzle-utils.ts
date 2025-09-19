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
    title: "Puzzle I: The Vermilion Gate",
    description: "In the mystical forest where shadows dance, a guardian stands at the sacred entrance. What ancient structure marks the boundary between realms?",
    image: "/art/puzzle-1.jpg",
    answerHash: "ab21e22322938ac8e9d080f4a7994b9cf7ec05bd2a55e5b0bcfac4e507ff63b9",
    fragment: "DF4bfC8peVrqwYGGcr"
  },
  {
    id: 2,
    title: "Puzzle II: The Silent Ledger",
    description: "In the realm of letters, a faithful companion hides within the shadows. Find the hidden word and transform it through the ancient cipher.",
    image: "/art/puzzle-2.jpg",
    answerHash: "423d3d2a91d23725a131774b0b71586499d5d1a5ef785c585955cc9d7096a535",
    fragment: "gK1knXAiW36f3au1z"
  },
  {
    id: 3,
    title: "Puzzle III: Remainders Riddle",
    description: "Three ancient sages speak in numbers. One says '7', another '5', the third '3'. Find the number that satisfies all their conditions.",
    image: "/art/puzzle-3.jpg",
    answerHash: "da70dfa4d9f95ac979f921e8e623358236313f334afcd06cddf8a5621cf6a1e9",
    fragment: "2SX7ugQcaarSSMzSDw"
  },
  {
    id: 4,
    title: "Puzzle IV: Moon Cipher",
    description: "Under the silver moon's glow, a message awaits. The second word holds the key to your next fragment.",
    image: "/art/puzzle-4.jpg",
    answerHash: "dd3bfe5f7da1dd252da75ad13a4ec8c5ff78a68aa1677a1adae1e934f1a76057",
    fragment: "S4QYgf3W8Zv6dy4Yw"
  },
  {
    id: 5,
    title: "Puzzle V: Hex Whisper",
    description: "In the digital realm, numbers speak in whispers. Decode the hidden message to reveal the final word.",
    image: "/art/puzzle-5.jpg",
    answerHash: "4c314c6a042e74c217edfe717891bc2033ddfbf11e00be7340bdabe9e6b7e887",
    fragment: "FD8psZ3bM2ijSzkXuX"
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
  const completedPuzzles = getProgress();
  const fragments = puzzles
    .filter(puzzle => completedPuzzles.includes(puzzle.id))
    .map(puzzle => puzzle.fragment);
  
  const secretOrder = [3, 5, 1, 4, 2];
  const orderedFragments: string[] = [];
  
  secretOrder.forEach(puzzleId => {
    const puzzle = puzzles.find(p => p.id === puzzleId);
    if (puzzle && completedPuzzles.includes(puzzleId)) {
      orderedFragments.push(puzzle.fragment);
    }
  });
  
  return orderedFragments.join('');
}
