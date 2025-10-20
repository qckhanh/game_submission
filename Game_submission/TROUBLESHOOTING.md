# 🔧 TROUBLESHOOTING GUIDE - EcoCity Challenge

## 🎮 Game Issues

### Game Won't Load / Blank Screen

**Symptoms:**
- White/blank screen
- Nothing happens when opening index.html
- Page loads but no content

**Solutions:**
1. **Check file paths:**
   ```html
   <!-- In index.html, verify these paths: -->
   <link rel="stylesheet" href="css/style.css">
   <script src="js/game.js"></script>
   ```

2. **Check folder structure:**
   ```
   game_app/
   ├── index.html  ← Must be here
   ├── css/
   │   └── style.css  ← Must be here
   └── js/
       └── game.js  ← Must be here
   ```

3. **Open browser console (F12):**
    - Look for red error messages
    - Common errors:
        - "Failed to load resource" → Wrong file path
        - "Unexpected token" → Syntax error in code
        - "Cannot read property" → JavaScript error

4. **Try different browser:**
    - Chrome/Edge
    - Firefox
    - Safari

5. **Clear cache:**
    - Ctrl+Shift+Delete (Windows/Linux)
    - Cmd+Shift+Delete (Mac)
    - Clear browsing data

### Buttons Don't Work

**Symptoms:**
- Clicking buttons does nothing
- No response to clicks

**Solutions:**
1. **Check JavaScript loaded:**
    - Open console (F12)
    - Type: `typeof startGame`
    - Should say "function", not "undefined"

2. **Check for errors:**
    - Console should have no red errors
    - If errors present, read the message

3. **Verify onclick attributes:**
   ```html
   <!-- Buttons should have onclick: -->
   <button onclick="startGame()">Start</button>
   ```

4. **Test in different browser**

### Resources Not Updating

**Symptoms:**
- Bars don't move
- Numbers don't change
- Game seems frozen

**Solutions:**
1. **Check console for errors**

2. **Verify updateUI() function exists:**
    - Search game.js for "function updateUI()"

3. **Check if game state is updating:**
    - Open console
    - Type: `gameState`
    - Should show current values

4. **Refresh page and try again**

### Sound Not Working

**Symptoms:**
- No sound effects
- Sound toggle doesn't help

**Solutions:**
1. **Check sound is enabled in game:**
    - Click sound button
    - Should show 🔊 when ON

2. **Check browser allows audio:**
    - Some browsers block audio until user interaction
    - Click anywhere on page first

3. **Check system volume:**
    - Ensure computer volume is up
    - Check browser isn't muted

4. **Try different browser:**
    - Safari sometimes blocks Web Audio API

5. **Check console for errors:**
    - Look for "AudioContext" errors

### City Visualization Missing

**Symptoms:**
- No buildings shown
- Empty city container

**Solutions:**
1. **Check CSS loaded:**
    - Buildings should appear after game starts

2. **Verify generateCity() is called:**
    - Should run when game starts

3. **Check console for errors**

4. **Inspect element (F12):**
    - Look for `<div class="building">` elements
    - If present but invisible, CSS issue
    - If missing, JavaScript issue

---

## 📁 File Structure Issues

### "File Not Found" Errors

**Symptoms:**
- 404 errors in console
- Resources fail to load

**Solutions:**
1. **Verify exact file structure:**
   ```
   game_submission/
   ├── README.md
   ├── project_report.pdf
   ├── youtube_link.txt
   ├── prompts/
   │   ├── concept_prompts.txt
   │   ├── asset_generation_prompts.txt
   │   ├── code_generation_prompts.txt
   │   └── refinement_prompts.txt
   ├── game_app/
   │   ├── index.html
   │   ├── css/
   │   │   └── style.css
   │   └── js/
   │       └── game.js
   └── screenshots/
       ├── menu_screen.png
       ├── play_screen1.png
       ├── play_screen2.png
       ├── play_screen3.png
       └── results_screen.png
   ```

2. **Check file names are EXACT:**
    - Case-sensitive!
    - `README.md` not `readme.md`
    - `game.js` not `Game.js`

3. **No extra folders:**
    - Don't nest game_app inside another folder
    - Don't add extra parent folders

### Wrong File Names

**Common Mistakes:**
- ❌ `readme.txt` → ✅ `README.md`
- ❌ `report.pdf` → ✅ `project_report.pdf`
- ❌ `youtube.txt` → ✅ `youtube_link.txt`
- ❌ `prompt/` → ✅ `prompts/`
- ❌ `screenshot/` → ✅ `screenshots/`

**Fix:**
- Rename files to exact names required
- Check submission requirements

---

## 🐙 GitHub Issues

### Repository Not Found / 404 Error

**Symptoms:**
- Can't access repository URL
- "404 This is not the