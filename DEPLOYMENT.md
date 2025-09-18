# Deployment Guide

## Vercel Deployment

This project is ready for deployment to Vercel. Follow these steps:

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy from the project directory:
   ```bash
   cd /Users/chuachengwei/Desktop/codebreaker
   vercel --prod
   ```

3. Follow the prompts to link to your Vercel account

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository or drag and drop the project folder
4. Vercel will automatically detect Next.js and configure the build settings
5. Click "Deploy"

### Build Configuration

The project is already configured with:
- `next.config.js` with static export settings
- `vercel.json` with deployment configuration
- All necessary dependencies in `package.json`

### Environment Variables

No environment variables are required for this project.

### Custom Domain (Optional)

After deployment, you can add a custom domain in the Vercel dashboard under Project Settings > Domains.

## Local Testing

Before deploying, test locally:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test production build
npm run build
npm start
```

## Post-Deployment

After deployment:

1. Test all puzzle functionality
2. Verify progress persistence works
3. Check responsive design on mobile devices
4. Upload the actual puzzle-5.jpg image to replace the placeholder

## Troubleshooting

- If build fails, check that all dependencies are installed
- Ensure all image files are in the correct `/public/art/` directory
- Verify TypeScript compilation passes with `npm run build`
