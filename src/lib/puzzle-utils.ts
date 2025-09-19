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
    description: "Decode this Base64, then reverse the result to plain text: TldBRCBGTyBFVEFH",
    image: "/art/puzzle-1.jpg",
    answerHash: "ab21e22322938ac8e9d080f4a7994b9cf7ec05bd2a55e5b0bcfac4e507ff63b9", // "GATE OF DAWN" in SHA-256
    fragment: "DF4bfC8peVrqwYGGcr"
  },
  {
    id: 2,
    title: "Puzzle II: The Silent Ledger",
    description: "Find the hidden word in the mini word-search: BLACKDOG. Apply ROT13 and enter the result.",
    image: "/art/puzzle-2.jpg",
    answerHash: "423d3d2a91d23725a131774b0b71586499d5d1a5ef785c585955cc9d7096a535", // "ONYPXQBT" in SHA-256
    fragment: "gK1knXAiW36f3au1z"
  },
  {
    id: 3,
    title: "Puzzle III: Remainders Riddle",
    description: "Find the unique integer x in 0..999 such that x ≡ 7 (mod 13), x ≡ 5 (mod 17), x ≡ 3 (mod 19).",
    image: "/art/puzzle-3.jpg",
    answerHash: "da70dfa4d9f95ac979f921e8e623358236313f334afcd06cddf8a5621cf6a1e9", // "345" in SHA-256
    fragment: "2SX7ugQcaarSSMzSDw"
  },
  {
    id: 4,
    title: "Puzzle IV: Moon Cipher",
    description: "Vigenère cipher with key MOON. Decrypt: HSFZUZZVAB UNFS. Enter the second word.",
    image: "/art/puzzle-4.jpg",
    answerHash: "dd3bfe5f7da1dd252da75ad13a4ec8c5ff78a68aa1677a1adae1e934f1a76057", // "GATE" in SHA-256
    fragment: "S4QYgf3W8Zv6dy4Yw"
  },
  {
    id: 5,
    title: "Puzzle V: Hex Whisper",
    description: "Convert this hex to ASCII and enter the word: 536f6c616e61.",
    image: "/art/puzzle-5.svg",
    answerHash: "4c314c6a042e74c217edfe717891bc2033ddfbf11e00be7340bdabe9e6b7e887", // "SOLANA" in SHA-256
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
  
  // Secret assembly order: Puzzle 3 → Puzzle 5 → Puzzle 1 → Puzzle 4 → Puzzle 2
  // This is the correct order for the true private key
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
