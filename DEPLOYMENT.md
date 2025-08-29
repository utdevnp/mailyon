# 🚀 GitHub Pages Deployment Guide

## 📋 Prerequisites

1. **GitHub Repository**: Your project must be on GitHub
2. **Node.js & npm**: Installed on your machine
3. **Git**: Configured with your GitHub credentials

## 🔧 Setup Steps

### 1. Update Repository Settings

1. Go to your GitHub repository
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **gh-pages** branch
6. Click **Save**

### 2. Update Homepage URL

In `package.json`, update the homepage URL:

```json
{
  "homepage": "https://YOUR_USERNAME.github.io/REPOSITORY_NAME"
}
```

**Replace:**
- `YOUR_USERNAME` with your GitHub username
- `REPOSITORY_NAME` with your repository name

### 3. Deploy Commands

```bash
# Build and deploy to GitHub Pages
npm run deploy

# Or manually:
npm run build
npm run deploy
```

## 📁 What Gets Deployed

- **Source**: `build/` folder (created by `npm run build`)
- **Branch**: `gh-pages` (automatically created)
- **URL**: `https://yourusername.github.io/repository-name`

## 🔄 Deployment Process

1. **Build**: `npm run build` creates optimized production files
2. **Deploy**: `gh-pages` pushes `build/` folder to `gh-pages` branch
3. **GitHub Pages**: Automatically serves files from `gh-pages` branch

## ⚠️ Important Notes

- **Build folder is tracked**: We commented out `build/` in `.gitignore`
- **Auto-deploy**: Every `npm run deploy` updates the live site
- **Branch protection**: Don't manually edit `gh-pages` branch
- **Cache**: Changes may take a few minutes to appear

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deploy Fails
```bash
# Check git status
git status

# Ensure you're on main branch
git checkout main

# Try deploying again
npm run deploy
```

### Site Not Loading
1. Check **Settings > Pages** in GitHub
2. Verify **gh-pages** branch exists
3. Wait 5-10 minutes for changes to propagate

## 🎯 Next Steps

1. **First deployment**: `npm run deploy`
2. **Check GitHub Pages**: Visit your site URL
3. **Future updates**: Just run `npm run deploy` after changes

Your email template builder will be live at: `https://yourusername.github.io/email-temp-453` 🎉
