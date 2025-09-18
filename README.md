# Codebreaker Quest

A professional puzzle-solving website where solving five puzzles reveals five text fragments that, when concatenated, form one final burner private key.

## Features

- **Five Sequential Puzzles**: Each puzzle reveals a fragment of the final key
- **Client-Side Only**: No backend required, everything runs in the browser
- **Progress Persistence**: Uses localStorage to save your progress
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Theme**: Professional, elegant visual design
- **Accessibility**: Keyboard navigation, ARIA labels, and proper contrast

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel-ready static export

## Puzzle Answers

The puzzles are designed to be solvable with the provided clues:

1. **Puzzle I**: TORII (ancient gateway structure)
2. **Puzzle II**: LIGHT (illuminates wisdom)
3. **Puzzle III**: 3UZ (carved characters)
4. **Puzzle IV**: PUZZLE (garden of pieces)
5. **Puzzle V**: 5KJ89M2N (sum of all fragments)

## Security Notes

⚠️ **Important**: This is for educational purposes only. The generated key should never be used for real cryptocurrency transactions or to store valuable assets.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

The project is configured for static export and ready for Vercel deployment:

```bash
# Build static files
npm run build

# Deploy to Vercel
vercel --prod
```

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout with navigation
│   ├── page.tsx             # Landing page
│   ├── about/
│   │   └── page.tsx         # About page
│   └── puzzles/
│       └── page.tsx         # Puzzles page with game logic
└── lib/
    └── puzzle-utils.ts      # Puzzle data and validation logic

public/
└── art/
    ├── puzzle-1.jpg         # Torii scene
    ├── puzzle-2.jpg         # Glowing book
    ├── puzzle-3.jpg         # Stone with "3UZ"
    ├── puzzle-4.jpg         # Giant jigsaw garden
    └── puzzle-5.jpg         # Placeholder image
```

## License

Educational purposes only. Do not use the generated keys for real transactions.
