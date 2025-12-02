# Agent Development Process

## Project: Bill Wurtz Radio

### Concept
Web-based video player that plays Bill Wurtz music videos from a YouTube playlist in shuffle mode with all UI elements and video titles displayed as emojis only. Features penalty mode to discourage excessive skipping.

### Challenge Requirements
- ✅ Emoji-only UI (no text in interactive elements)
- ✅ Functional application (music player with 98 videos)
- ✅ Containerized with Chainguard Containers (nginx, 16.9MB)
- ✅ Web app accessible via port 8080
- ✅ Gets weird (penalty mode, emoji-only, Bill Wurtz)

### Technical Specifications

#### Playlist Details
- **Source**: Bill Wurtz YouTube playlist
- **Playlist ID**: `PLo7FOXNe7Yt8uSjFvUT4-DNdQYR1qU3aC`
- **URL**: https://www.youtube.com/playlist?list=PLo7FOXNe7Yt8uSjFvUT4-DNdQYR1qU3aC
- **Total Videos**: 98 videos (95 music videos + 3 history videos)
- **Data Extraction**: Parsed from YouTube playlist page HTML (no API key required)
- **All Videos**: Stored in `playlist-data.js` with emoji translations

#### Architecture
**Type**: Single Page Application (SPA) with YouTube IFrame API integration

**Why SPA?**
- Single music player interface with no page navigation
- All interactions happen on one page
- State management for current video, shuffle order, play/pause, penalty mode
- Real-time UI updates without page reloads
- No routing or multiple views needed
- localStorage for persistence across sessions

**Components**:
1. Frontend (HTML/CSS/JavaScript + Alpine.js)
   - YouTube IFrame Player API integration
   - Alpine.js for reactive state management
   - Shuffle logic (always enabled, weighted for loved songs)
   - Emoji-only UI controls
   - Video title emoji translation display
   - Penalty mode (skip detection and enforcement)
   - localStorage persistence (plays, loves, skip tracking)
   - Keyboard shortcuts (Space, Arrows, V, M, C, X)
   - Auto-hide controls (5 seconds when playing)
   - Page title updates with current song

2. Data Layer
   - 98 videos pre-fetched (no API key needed)
   - Video titles converted to emoji representations
   - Shuffled playlist order in memory
   - Recent plays history (up to 50 songs)
   - Loved songs set for weighted shuffle

3. Container
   - Chainguard nginx base image (cgr.dev/chainguard/nginx:latest)
   - Serve static files (HTML, CSS, JS)
   - Expose port 8080
   - Minimal size (16.9MB)

#### Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Reactivity**: Alpine.js v3.x (CDN, no build step)
- **CSS Reset**: modern-normalize v3.0.1
- **APIs**: YouTube IFrame Player API (no API key required)
- **Storage**: localStorage (plays, loves, skip tracking)
- **Server**: Nginx (Chainguard image)
- **Container**: Dockerfile with Chainguard nginx base (16.9MB)

#### Alpine.js Integration
**Why Alpine.js?**
- Lightweight and perfect for simple SPAs
- Declarative reactive data binding
- No build process required
- Ideal for player state management

**Usage**:
- `x-data`: Player state (currentIndex, isPlaying, shuffledPlaylist, currentVideo, recentPlays, lovedSongs, consecutiveSkips, songsUntilNextEnabled)
- `x-show`: Toggle play/pause button visibility, penalty countdown
- `x-bind:class`: Highlight active video in recent plays, penalty state
- `x-on:click`: Handle control button clicks
- `x-text`: Display emoji titles dynamically, penalty countdown
- `@keydown`: Keyboard shortcuts (Space, Arrows, V, M, C, X)
- `:disabled`: Disable buttons during penalty or at history boundaries

### Implementation Plan

#### Phase 1: Project Setup
1. Create project structure in `round_1/` directory
   ```
   round_1/
   ├── index.html
   ├── style.css
   ├── app.js
   ├── playlist-data.js
   ├── Dockerfile
   └── README.md
   ```

2. Initialize basic HTML structure with:
   - Alpine.js CDN script
   - YouTube IFrame API script
   - Alpine.js `x-data` directive on root element

#### Phase 2: Data Collection

**API Key Approach**:
- YouTube Data API v3 requires API key for fetching playlist
- YouTube IFrame Player API does NOT require API key (public)
- **Solution**: Pre-fetch playlist data once, embed as static JSON
- No runtime API calls = no API key needed in production

**Steps**:
1. One-time fetch using YouTube Data API v3 (developer provides key temporarily)
   - Endpoint: `GET https://www.googleapis.com/youtube/v3/playlistItems`
   - Parameters: `playlistId=PLo7FOXNe7Yt8uSjFvUT4-DNdQYR1qU3aC`, `part=snippet`, `maxResults=50`
   
2. Extract video data:
   - Video IDs
   - Video titles
   - Thumbnail URLs (optional)

3. Convert titles to emojis:
   - Use keyword mapping (e.g., "history" → 🏛️, "world" → 🌍)
   - Use AI/LLM for creative emoji translation
   - Fallback to generic music emojis (🎵 🎶 🎸)

4. Store as static JavaScript data file (`playlist-data.js`)
   - No API key embedded in code
   - No runtime API dependencies

#### Phase 3: Player Implementation
1. **Alpine.js State Setup**
   - Define reactive data object:
     ```javascript
     {
       player: null,
       isPlaying: false,
       currentIndex: 0,
       shuffledPlaylist: [],
       currentVideo: {}
     }
     ```
   - Initialize shuffle on Alpine.init()

2. **YouTube Player Setup (Custom Controls)**
   - Initialize IFrame player in Alpine component
   - Configure player parameters for custom player:
     ```javascript
     playerVars: {
       controls: 0,        // Hide YouTube controls
       modestbranding: 1,  // Minimal YouTube logo
       rel: 0,             // No related videos
       fs: 0,              // No fullscreen button
       iv_load_policy: 3,  // No annotations
       disablekb: 1        // Disable keyboard controls (we handle them)
     }
     ```
   - Build completely custom emoji controls (no YouTube UI)
   - Handle player state changes (update isPlaying)
   - Sync player events with Alpine state
   - Style player container to hide any remaining YouTube branding

3. **Shuffle Logic**
   - Create shuffled array of video indices on load
   - Maintain current position in shuffled array
   - No option to disable shuffle
   - Fisher-Yates shuffle algorithm

4. **UI Controls** (emoji-only, Alpine.js reactive)
   - ⏮️ Previous: `x-on:click="previous()"`
   - ▶️/⏸️ Play/Pause: `x-show="!isPlaying"` / `x-show="isPlaying"`
   - ⏭️ Next: `x-on:click="next()"`
   - 🔀 Shuffle indicator (always visible, not clickable)
   - 🎵 Current video title: `x-text="currentVideo.emojiTitle"`

5. **Playlist Display**
   - Loop through shuffledPlaylist with `x-for`
   - Highlight currently playing: `x-bind:class="{ 'active': index === currentIndex }"`
   - Display emoji titles: `x-text="video.emojiTitle"`
   - Optional: click to jump with `x-on:click="playVideo(index)"`

#### Phase 4: Styling
1. Design emoji-centric interface
   - Large, clear emoji buttons
   - Responsive layout
   - Dark theme (music player aesthetic)
   - Minimal text (only in README/comments)
   - **Custom player aesthetic** (not YouTube-y)

2. Hide YouTube branding
   - Use `controls=0` to remove YouTube UI
   - CSS to hide/overlay any remaining YouTube elements
   - Custom control bar with emoji buttons only
   - Video player as background element

3. Visual feedback
   - Hover effects on emoji buttons
   - Active state for current video
   - Loading states
   - Smooth transitions

#### Phase 5: Containerization
1. Create Dockerfile
   - Base: Chainguard nginx or node image
   - Copy static files
   - Configure nginx to serve on port 8080
   - Set proper permissions

2. Build and test locally
   ```bash
   docker build -t bill-wurtz-player .
   docker run -p 8080:8080 bill-wurtz-player
   ```

#### Phase 6: Documentation
1. Update README.md with:
   - Project description (emoji-heavy)
   - Build instructions
   - Run instructions
   - Port information (8080)
   - Features list

2. Include emoji legend if needed

### Key Features

#### Core Functionality
- 🔀 **Permanent Shuffle**: Playlist always plays in random order, no way to disable
- ⏭️ **Next Video**: Skip to next video in shuffled queue
- ⏮️ **Previous Video**: Go back to previous video in shuffled queue
- ▶️/⏸️ **Play/Pause**: Control playback
- 🎵 **Emoji Titles**: All video titles converted to emoji representations
- ⚠️ **Penalty Mode**: Skip detection - 5 skips under 10 seconds locks next button for 3 songs
- 🍞 **Toast Notifications**: Emoji-only feedback (❤️ / 💔) when loving/unloving songs
- ❤️ **Loved Indicator**: Browser tab title shows ❤️ emoji when playing a loved song

#### UI Elements (All Emoji)
- Control buttons: ⏮️ ▶️/⏸️ ⏭️
- Love button: ❤️ (filled) / 🤍 (empty)
- Mute button: 🔊 (unmuted) / 🔇 (muted)
- Recent plays toggle: 📜
- Clear history: 🗑️
- Current video: [emoji title] displayed at bottom center
- Recent plays sidebar: Collapsible list with emoji titles
- Penalty countdown: 1️⃣2️⃣3️⃣ (replaces ⏭️ during penalty)
- Currently playing indicator: 🔊 in recent plays list
- Toast notification: ❤️ (loved) / 💔 (unloved) - appears at top center for 2 seconds
- Browser tab title: Shows ❤️ emoji when playing a loved song

### Technical Challenges & Solutions

#### Challenge 1: YouTube API Key
**Problem**: YouTube Data API v3 requires API key for fetching playlist data
**Solution**: 
- YouTube IFrame Player API is public (no key needed for playback)
- Extract playlist data directly from YouTube playlist page HTML
- Parse ytInitialData JSON embedded in page source using Python
- Embed playlist as static JSON in `playlist-data.js`
- **Result**: No API key needed at all, no runtime API dependencies
- **Implementation**: Used curl + Python to extract all 95 videos with titles

#### Challenge 2: Custom Player (Not YouTube-y)
**Problem**: Default YouTube player looks too much like YouTube
**Solution**:
- Use `controls=0` parameter to hide all YouTube controls
- Build completely custom control interface with emoji buttons
- Use CSS to hide/minimize any remaining YouTube branding
- Style video player as background element with custom overlay
- **Result**: Looks like custom emoji player, not YouTube embed

#### Challenge 3: Emoji Translation
**Problem**: Converting video titles to meaningful emojis
**Solution**:
- Manual mapping for Bill Wurtz videos (limited playlist)
- Keyword-based translation (history → 🏛️, japan → 🇯🇵)
- AI-assisted translation for creative results
- Fallback to music emojis

#### Challenge 4: Shuffle Persistence
**Problem**: Maintaining shuffle order across video changes
**Solution**:
- Generate shuffled array on page load
- Store current index in shuffled array
- Increment/decrement index for next/previous
- Re-shuffle only on page reload

#### Challenge 5: Chainguard Container
**Problem**: Using Chainguard base images (minimal, distroless)
**Solution**:
- Use `cgr.dev/chainguard/nginx:latest` for static hosting
- Or `cgr.dev/chainguard/node:latest` if server-side needed
- Keep dependencies minimal

### Development Workflow

1. **Fetch Playlist Data** ✅ COMPLETED
   - Extracted playlist data directly from YouTube playlist page HTML
   - Used Python to parse ytInitialData JSON from page source
   - Retrieved all 95 videos with IDs and titles
   - Added 3 additional history videos (history of the entire world, history of the world, history of japan)
   - No API key required for this approach

2. **Create Emoji Mappings** ✅ COMPLETED
   - Created emoji translations for all 98 video titles
   - Used keyword-based mapping for Bill Wurtz song themes
   - Stored in `playlist-data.js` with structure:
     ```javascript
     {
       id: 'video_id',
       title: 'original title',
       emojiTitle: '🎵🎶✨'
     }
     ```
   - Examples:
     - "Mount St. Helens is about to Blow Up" → 🌋💥⚠️
     - "the Moon is made of Cheese (but i can't taste it)" → 🌙🧀👅❌
     - "i'm a huge gamer most of the time" → 🎮🕹️⏰
     - "9 8 7" → 9️⃣8️⃣7️⃣

3. **Build Player Interface** ✅ COMPLETED
   - HTML structure with Alpine.js
   - CSS styling (custom, not YouTube-y)
   - JavaScript player logic with YouTube IFrame API
   - Penalty mode implementation (skip detection and enforcement)

4. **Implement Shuffle** ✅ COMPLETED
   - Fisher-Yates shuffle algorithm (already in playlist-data.js)
   - Navigation logic (next/previous in shuffled order)
   - Always-on shuffle (no disable option)
   - Weighted shuffle for loved songs (3x chance)

5. **Test Locally** ✅ COMPLETED
   - Tested in browser with Python HTTP server
   - All controls verified working
   - Shuffle behavior confirmed
   - Emoji-only UI validated
   - Penalty mode tested
   - Keyboard shortcuts verified
   - localStorage persistence confirmed

6. **Containerize** ✅ COMPLETED
   - Dockerfile created with Chainguard nginx
   - Image built successfully (16.9MB)
   - Container tested on port 8080
   - Docker preview server running

7. **Document** ✅ COMPLETED
   - README.md created with creative formatting
   - Build/run instructions included
   - All features documented
   - Port information added
   - Penalty mode explained

### File Structure

```
round_1/
├── AGENTS.md           # This file - development documentation
├── README.md           # User-facing instructions with creative formatting
├── Dockerfile          # Chainguard nginx container config
├── index.html          # Main HTML file with Alpine.js
├── style.css           # Custom styling with modern-normalize
├── app.js              # Player logic, shuffle, penalty mode, localStorage
├── playlist-data.js    # 98 videos with emoji titles
```

### Testing Checklist

- [x] Player loads and displays YouTube video
- [x] Shuffle is active on load (98 videos shuffled)
- [x] Next button advances to next video in shuffled order
- [x] Previous button goes to previous shuffled video
- [x] Play/Pause works correctly
- [x] All UI elements are emoji-only (no text)
- [x] Video titles display as emojis
- [x] Recent plays sidebar shows history (collapsible)
- [x] Current video is highlighted in recent plays
- [x] Custom player controls (not YouTube-y)
- [x] Auto-hide controls after 5 seconds when playing
- [x] Love button toggles and persists to localStorage
- [x] Weighted shuffle (loved songs 3x more frequent)
- [x] Smart navigation through play history
- [x] Resume from last played song on reload
- [x] Clear history button works
- [x] Penalty mode: Skip detection (5 skips under 10s)
- [x] Penalty mode: Next button locks for 3 songs
- [x] Penalty countdown displays with emoji (1️⃣2️⃣3️⃣)
- [x] Keyboard shortcuts work (Space, Arrows, V, M, C, X)
- [x] Mute/unmute functionality (M key)
- [x] Page title updates with song emoji when playing
- [x] Page title shows ❤️ emoji for loved songs
- [x] Toast notification on love/unlove (❤️ / 💔)
- [x] Toast is emoji-only (no text)
- [x] Toast auto-hides after 2 seconds
- [x] Responsive layout (mobile, tablet, desktop)
- [x] Container builds successfully with Chainguard nginx
- [x] Container runs and serves on port 8080
- [x] Accessible via browser and Docker preview URL

### Emoji Translation Examples

Bill Wurtz video titles → emoji translations (from actual playlist):
- "might quit" → 🚪👋😔
- "La de da de da de da de day oh" → 🎵🎶🎤✨
- "i don't wanna go to school" → 🏫❌😫
- "here comes the sun" → ☀️🌅🎵
- "i just did a bad thing" → 😈🙊💔
- "Mount St. Helens is about to Blow Up" → 🌋💥⚠️
- "and the day goes on" → ☀️🔄⏰
- "alphabet shuffle" → 🔤🔀🎲
- "outside" → 🌳🌤️🚪
- "i'm a princess" → 👸✨💎
- "the Moon is made of Cheese (but i can't taste it)" → 🌙🧀👅❌
- "i'm a huge gamer most of the time" → 🎮🕹️⏰
- "9 8 7" → 9️⃣8️⃣7️⃣
- "grow mushrooms on the sidewalk" → 🍄🚶🌆
- "i know, but i can't say" → 🤐💭🤷

### Implementation Highlights

**localStorage Integration:**
- Recent plays saved and restored on page load (up to 50 songs)
- Loved songs persisted across sessions
- Skip tracking persisted (consecutive skips, penalty countdown)
- Resume playback from last song
- Clear history removes play history but keeps current song

**Weighted Shuffle Algorithm:**
```javascript
// Loved songs get 3x weight in shuffle
const weighted = [];
playlist.forEach(video => {
  const weight = lovedSongs.has(video.id) ? 3 : 1;
  for (let i = 0; i < weight; i++) {
    weighted.push(video);
  }
});
```

**Smart Navigation:**
- Previous: Navigate back through recent plays history
- Next: Continue forward in history, then shuffle new songs
- Playing indicator moves to show current position
- Previous button disabled at first song

**Keyboard Shortcuts:**
- Space: Play/Pause
- Arrow Left: Previous (navigate back in history)
- Arrow Right: Next (continue forward or shuffle new)
- V: Love/Unlove current song
- M: Mute/Unmute audio
- C: Toggle recent plays sidebar
- X: Clear history (keeps current song)

**Responsive Layout:**
- Desktop: Recent plays on right, love button 80px from edge
- Mobile: Recent plays on bottom, love button above playlist toggle
- Collapsed playlist completely hidden on desktop (width: 0)
- Controls auto-hide after 5 seconds when playing

**Pointer Events Management:**
- YouTube iframe has `pointer-events: none`
- Invisible overlay captures clicks/touches
- Shows controls without pausing video
- User must explicitly click pause button

**Penalty Mode (Skip Detection):**
- Tracks consecutive skips under 10 seconds (only at current song position)
- After 5 rapid skips, next button locks for 3 songs
- Counter resets when song plays for 10+ seconds
- Counter resets when song ends naturally (auto-advance)
- Penalty countdown displayed with emoji (1️⃣2️⃣3️⃣)
- Next button disabled and shows countdown during penalty
- Previous button also disabled during penalty
- Songs auto-advance during penalty, decrementing counter
- Skip tracking persisted in localStorage
- Penalty enforces listening to full songs

### Notes

- **SPA Architecture**: Single page is sufficient - no routing or multiple views needed
- **Alpine.js**: Adds reactivity without complexity, perfect for this use case
- **No API Key in Production**: Pre-fetch playlist data, embed as static JSON
- **Custom Player**: Use `controls=0` and build custom emoji controls (not YouTube-y)
- **localStorage**: Persist user preferences and history (plays, loves, skip tracking)
- **Weighted Shuffle**: Loved songs appear 3x more frequently
- **Penalty Mode**: Discourage excessive skipping with temporary next button lock
- **Page Title**: Updates with song emoji when playing, shows project name when paused
- **Mute Control**: M key toggles mute/unmute
- Keep it simple: static files, minimal dependencies, no build step
- Embrace the weirdness: Bill Wurtz + emoji-only UI + penalty mode = perfect match
- No text escape hatches: commit to emoji-only interface
- Shuffle is permanent: no toggle, no disable option
- Focus on functionality: player must actually work
- Chainguard containers: use official images from cgr.dev
- History videos included: 3 legendary Bill Wurtz history videos added to playlist

### Current Status

**✅ COMPLETED - All Features Implemented**

**Core Features:**
- ✅ Fullscreen immersive video player (100vh)
- ✅ 98 Bill Wurtz videos with emoji titles (95 music + 3 history)
- ✅ Permanent shuffle mode (no disable option)
- ✅ Custom player controls (YouTube UI hidden)
- ✅ Auto-hide controls (5 seconds when playing)
- ✅ Alpine.js reactive state management
- ✅ Modern-normalize CSS reset

**Advanced Features:**
- ✅ localStorage persistence (recent plays, loved songs, skip tracking)
- ✅ Resume from last played song
- ✅ Love button with weighted shuffle (3x chance)
- ✅ Toast notifications (emoji-only: ❤️ / 💔)
- ✅ Loved song indicator in browser tab title (❤️ emoji)
- ✅ Smart navigation (previous/next through history)
- ✅ Penalty mode (skip detection and enforcement)
- ✅ Keyboard shortcuts (Space, Arrows, V, M, C, X)
- ✅ Recent plays sidebar (collapsible, right on desktop, bottom on mobile)
- ✅ Clear history button
- ✅ Currently playing indicator in history

**Files Created:**
- `round_1/AGENTS.md` - This planning document
- `round_1/README.md` - User instructions and features
- `round_1/index.html` - Main player interface
- `round_1/style.css` - Custom styling with modern-normalize
- `round_1/app.js` - Player logic with Alpine.js
- `round_1/playlist-data.js` - 98 videos with emoji titles
- `round_1/Dockerfile` - Chainguard nginx container

**Technical Achievements:**
- No build process required (vanilla JS, Alpine.js CDN)
- localStorage for persistence across sessions (plays, loves, skip tracking)
- Weighted shuffle algorithm for loved songs
- Smart navigation through play history
- Skip detection and penalty enforcement
- Toast notification system (emoji-only, auto-hide)
- Dynamic page title with loved song indicator
- Responsive design (mobile/tablet/desktop)
- Keyboard shortcuts for power users
- Pointer events management to prevent YouTube player interaction
