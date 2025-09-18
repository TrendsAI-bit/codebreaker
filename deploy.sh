#!/bin/bash

echo "🚀 Deploying Codebreaker Quest to Vercel..."

# Clean any existing builds
rm -rf .next
rm -rf .vercel

# Install dependencies
npm install

# Build the project
npm run build

# Deploy to Vercel
npx vercel --prod --yes

echo "✅ Deployment complete!"
