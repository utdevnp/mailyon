# 📚 GitHub Pages with `/docs` Folder Deployment

## 🎯 **Why `/docs` folder?**

- ✅ **Default GitHub Pages folder** - no branch switching needed
- ✅ **Serves from main branch** - simpler workflow
- ✅ **Automatic deployment** - just push to main branch
- ✅ **No gh-pages package needed** - built-in GitHub feature

## 🔧 **Setup Steps:**

### **1. Build into docs folder:**
```bash
# Build your React app into docs folder
npm run build:docs

# This command:
# 1. Runs: npm run build (creates build/ folder)
# 2. Moves: build/ → docs/ folder
```

### **2. Add docs folder to Git:**
```bash
# Add the docs folder
git add docs/

# Commit the changes
git commit -m "Add docs folder for GitHub Pages"

# Push to GitHub
git push origin main
```

### **3. Configure GitHub Pages:**
1. Go to your repository: `https://github.com/YOUR_USERNAME/email-temp-453`
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch
6. **Folder**: Select **/docs**
7. Click **Save**

## 🚀 **Deployment Workflow:**

### **Every time you want to update:**
```bash
# 1. Build into docs folder
npm run build:docs

# 2. Add and commit changes
git add docs/
git commit -m "Update email builder"

# 3. Push to GitHub
git push origin main

# 4. GitHub Pages automatically updates!
```

## 📁 **What Gets Deployed:**

- **Source**: `/docs` folder in your main branch
- **URL**: `https://yourusername.github.io/email-temp-453`
- **Branch**: `main` (your default branch)

## ⚠️ **Important Notes:**

- **docs folder is tracked** in Git (not ignored)
- **Build command** automatically moves files to docs
- **No gh-pages package** needed
- **Automatic updates** when you push to main

## 🎉 **Benefits:**

1. **Simpler workflow** - just push to main branch
2. **No extra branches** - everything in one place
3. **Faster deployment** - no gh-pages processing
4. **Easier debugging** - see exactly what's deployed

## 🔄 **Complete Workflow Example:**

```bash
# Make your changes to the code
# Then deploy:

npm run build:docs
git add docs/
git commit -m "Add new email templates"
git push origin main

# Your site updates automatically in 5-10 minutes!
```

Your email template builder will be live at: `https://yourusername.github.io/email-temp-453` 🎉
