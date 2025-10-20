# 🚀 Complete Setup Guide for EcoCity Challenge

## 📋 Pre-Submission Checklist

### Required Files and Structure
```
game_submission/
├── ✅ README.md
├── ✅ project_report.pdf
├── ✅ youtube_link.txt
├── ✅ prompts/
│   ├── ✅ concept_prompts.txt
│   ├── ✅ asset_generation_prompts.txt
│   ├── ✅ code_generation_prompts.txt
│   └── ✅ refinement_prompts.txt
├── ✅ game_app/
│   ├── ✅ index.html
│   ├── ✅ css/
│   │   └── ✅ style.css
│   └── ✅ js/
│       └── ✅ game.js
└── ✅ screenshots/
    ├── ✅ menu_screen.png
    ├── ✅ play_screen1.png
    ├── ✅ play_screen2.png
    ├── ✅ play_screen3.png
    └── ✅ results_screen.png
```

---

## 🎯 Step-by-Step Setup Instructions

### Step 1: Create Directory Structure

```bash
# Create main folder
mkdir game_submission
cd game_submission

# Create subfolders
mkdir prompts
mkdir game_app
mkdir game_app/css
mkdir game_app/js
mkdir screenshots
```

### Step 2: Add Game Files

1. **Copy index.html** to `game_app/index.html`
2. **Copy style.css** to `game_app/css/style.css`
3. **Copy game.js** to `game_app/js/game.js`

### Step 3: Add Documentation Files

1. **Copy README.md** to root folder
2. **Copy all prompt files** to `prompts/` folder:
    - concept_prompts.txt
    - asset_generation_prompts.txt
    - code_generation_prompts.txt
    - refinement_prompts.txt

### Step 4: Create Project Report

1. Use the project_report_outline.md as a template
2. Write your full report (3,000-4,000 words)
3. Convert to PDF
4. Save as `project_report.pdf` in root folder

**Report Writing Tips:**
- Be specific about your context (Vietnam or Australia)
- Include real statistics and citations
- Explain your design decisions
- Reflect honestly on challenges
- Proofread carefully

### Step 5: Take Screenshots

**How to capture screenshots:**

1. Open the game in browser (1920x1080 resolution recommended)
2. Use browser's screenshot tool or:
    - Windows: Windows Key + Shift + S
    - Mac: Command + Shift + 4
    - Linux: PrtScn or Shift + PrtScn

**Required screenshots:**

1. **menu_screen.png**
    - Show the main menu with title and buttons
    - Include a climate fact visible

2. **play_screen1.png**
    - Show the game screen with resources visible
    - Capture a decision card with all 4 choices

3. **play_screen2.png**
    - Show different decision category
    - Display city visualization clearly

4. **play_screen3.png**
    - Show an event notification appearing
    - Or show mid-game with changed resources

5. **results_screen.png**
    - Show the final results screen
    - Include score and impact summary

**Screenshot Tips:**
- Use PNG format for quality
- Ensure text is readable
- Capture full screen or crop cleanly
- Keep file sizes reasonable (<2MB each)

### Step 6: Create Demo Video

**Recording the Video:**

1. **Prepare script** (see youtube_link_template.txt)
2. **Set up recording:**
    - Close unnecessary tabs/applications
    - Set browser to 1920x1080
    - Test audio levels
    - Have notes ready

3. **Record in sections:**
    - Introduction
    - Game walkthrough
    - Live gameplay
    - Features highlight
    - Tech discussion
    - Conclusion

4. **Edit video:**
    - Add intro/outro
    - Include text overlays for key points
    - Add background music (optional)
    - Ensure smooth transitions

5. **Upload to YouTube:**
    - Title: "[Team Name] - EcoCity Challenge - Climate Game"
    - Set to Public or Unlisted
    - Add description with links
    - Upload early (allow processing time)

6. **Copy URL** to `youtube_link.txt`

### Step 7: Test the Game

**Local Testing:**

```bash
cd game_app

# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx http-server

# Option 3: PHP
php -S localhost:8000
```

**Test Checklist:**
- ✅ Menu screen loads correctly
- ✅ Instructions are readable
- ✅ Game starts properly
- ✅ All decisions work
- ✅ Resources update correctly
- ✅ Random events appear
- ✅ Game ends appropriately
- ✅ Results screen displays
- ✅ Sound toggle works
- ✅ Responsive on mobile

**Browser Testing:**
- Chrome/Edge (Chromium)
- Firefox
- Safari (if on Mac)
- Mobile browsers

### Step 8: Set Up GitHub Repository

**Create Repository:**

1. Go to GitHub.com
2. Click "New Repository"
3. Name: `[YourTeamName]_EcoCity_Challenge`
4. Set to **Public**
5. Don't initialize with README (you have one)

**Upload Files:**

```bash
# Initialize git in your folder
cd game_submission
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - EcoCity Challenge game"

# Add remote (replace with your URL)
git remote add origin https://github.com/yourusername/yourrepo.git

# Push
git branch -M main
git push -u origin main
```

**Enable GitHub Pages (Optional):**

1. Go to repository Settings
2. Navigate to Pages
3. Source: Deploy from branch
4. Branch: main, folder: /game_app
5. Save
6. Game will be live at: `https://yourusername.github.io/yourrepo/`

### Step 9: Final Verification

**Check Repository:**
- ✅ All files present
- ✅ Correct folder structure
- ✅ Correct file names (exact match required)
- ✅ Repository is Public
- ✅ README displays properly
- ✅ Game runs from GitHub Pages

**Check Documentation:**
- ✅ README is complete
- ✅ Project report is PDF
- ✅ All prompt files present
- ✅ YouTube link is valid
- ✅ Screenshots are clear

**Test Game:**
- ✅ Play complete game
- ✅ Test on different browsers
- ✅ Test on mobile device
- ✅ Verify no console errors

### Step 10: Submit

1. Copy your GitHub repository URL
2. Go to submission form: https://forms.office.com/r/1pLPWmYAdP
3. Enter team name (must match registration)
4. Paste repository URL
5. Submit
6. Verify submission confirmation

---

## 🔧 Troubleshooting

### Game Won't Load

**Problem:** Blank screen or errors
**Solutions:**
- Check browser console (F12) for errors
- Verify file paths in index.html are correct
- Ensure CSS and JS files are in correct folders
- Try different browser
- Clear browser cache

### Sound Not Working

**Problem:** No sound effects
**Solutions:**
- Check if sound is toggled ON in game
- Verify browser allows audio
- Check system volume
- Try clicking on page first (some browsers require user interaction)

### GitHub Pages Not Working

**Problem:** 404 error on GitHub Pages
**Solutions:**
- Wait 5-10 minutes after enabling
- Check Pages settings are correct
- Verify branch and folder are correct
- Ensure index.html is in specified folder

### Video Won't Upload

**Problem:** YouTube upload fails
**Solutions:**
- Check file size (<128GB, but aim for <1GB)
- Verify video format (MP4 recommended)
- Check internet connection
- Try different browser
- Upload during off-peak hours

### Repository Not Public

**Problem:** Can't access repository
**Solutions:**
- Go to Settings > General
- Scroll to "Danger Zone"
- Click "Change visibility"
- Select "Public"
- Confirm

---

## 📱 Mobile Testing Guide

### Test on Real Devices

**iOS:**
- Safari browser
- Chrome browser
- Test portrait and landscape

**Android:**
- Chrome browser
- Firefox browser
- Test portrait and landscape

### Mobile-Specific Checks
- ✅ Touch targets are large enough
- ✅ Text is readable without zooming
- ✅ Buttons are easily tappable
- ✅ Layout doesn't break
- ✅ Resources cards stack properly
- ✅ Decision choices are clear

---

## 🎨 Customization Guide

### Changing Colors

Edit `game_app/css/style.css`:

```css
/* Primary gradient - backgrounds */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Carbon/Success color */
background: linear-gradient(90deg, #48bb78, #38a169);

/* Budget/Warning color */
background: linear-gradient(90deg, #ed8936, #dd6b20);

/* Happiness/Info color */
background: linear-gradient(90deg, #9f7aea, #805ad5);
```

### Adding More Decisions

Edit `game_app/js/game.js`, find the `decisions` object:

```javascript
Energy: [
    // Add new decision here
    {
        title: "Your Decision Title",
        description: "Description of the situation",
        choices: [
            {
                text: "Choice 1",
                effects: { carbon: 10, budget: -15, happiness: 5 },
                description: "What this choice does"
            },
            // ... 3 more choices
        ]
    }
]
```

### Changing Game Duration

Edit `game_app/js/game.js`:

```javascript
let gameState = {
    year: 1,
    maxYears: 10,  // Change this number
    // ...
};
```

### Adjusting Difficulty

Edit starting values in `game_app/js/game.js`:

```javascript
// Easier game
carbon: 30,
budget: 150,
happiness: 80,

// Harder game
carbon: 70,
budget: 80,
happiness: 60,
```

---

## 📊 Performance Optimization

### File Size Optimization

**Minify CSS:**
```bash
# Use online tool or:
npx cssnano game_app/css/style.css game_app/css/style.min.css
```

**Minify JavaScript:**
```bash
# Use online tool or:
npx terser game_app/js/game.js -o game_app/js/game.min.js
```

**Update HTML to use minified files:**
```html
<link rel="stylesheet" href="css/style.min.css">
<script src="js/game.min.js"></script>
```

### Loading Speed

- Keep total size under 500KB
- No external dependencies = faster load
- Vanilla JS = no framework overhead
- CSS animations = GPU accelerated

---

## 🏆 Submission Checklist

### Before Submitting

- [ ] All files in correct structure
- [ ] Game tested and working
- [ ] Screenshots captured (5 total)
- [ ] Video uploaded and processed
- [ ] Project report completed (PDF)