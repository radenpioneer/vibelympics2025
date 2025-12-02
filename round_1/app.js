// Alpine.js player component
function player() {
  return {
    // State
    ytPlayer: null,
    playerReady: false,
    isPlaying: false,
    isMuted: false,
    currentIndex: 0,
    shuffledPlaylist: [],
    currentVideo: {},
    recentPlays: [],
    recentCollapsed: true,
    controlsVisible: true,
    controlsTimeout: null,
    lovedSongs: new Set(),
    recentPlaysIndex: 0, // Track position in recent plays for navigation
    projectName: '🎵📻🎨',
    
    // Skip tracking
    consecutiveSkips: 0,
    songsUntilNextEnabled: 0,
    currentSongStartTime: null,
    skipThreshold: 10000, // 10 seconds in milliseconds
    maxSkips: 5,
    penaltySongs: 3,
    autoAdvancing: false, // Flag to indicate auto-advance vs manual skip

    // Initialize
    init() {
      // Load loved songs from localStorage
      this.loadLovedSongs();
      
      // Load recent plays from localStorage
      this.loadRecentPlays();

      // Load skip tracking from localStorage
      this.loadSkipTracking();

      // Shuffle playlist with weighted algorithm
      this.shuffledPlaylist = this.weightedShuffle(PLAYLIST_DATA);
      
      // Resume from most recent or start fresh
      if (this.recentPlays.length > 0) {
        // Resume from most recent song
        const mostRecent = this.recentPlays[0];
        const videoIndex = this.shuffledPlaylist.findIndex(v => v.id === mostRecent.id);
        if (videoIndex !== -1) {
          this.currentIndex = videoIndex;
          this.currentVideo = this.shuffledPlaylist[this.currentIndex];
        } else {
          this.currentVideo = this.shuffledPlaylist[0];
        }
        this.recentPlaysIndex = 0;
      } else {
        // Start fresh
        this.currentVideo = this.shuffledPlaylist[0];
        this.addToRecent(this.currentVideo);
      }

      // Update page title with current song
      this.updatePageTitle();

      // Load YouTube IFrame API
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }

      // Set up YouTube API ready callback
      window.onYouTubeIframeAPIReady = () => {
        this.createPlayer();
      };

      // If API already loaded
      if (window.YT && window.YT.Player) {
        this.createPlayer();
      }

      // Auto-focus the app div so keyboard shortcuts work immediately
      this.$nextTick(() => {
        this.$el.focus();
      });
    },

    // Create YouTube player
    createPlayer() {
      this.ytPlayer = new YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: this.currentVideo.id,
        playerVars: {
          controls: 0,           // Hide YouTube controls
          modestbranding: 1,     // Minimal YouTube logo
          rel: 0,                // No related videos
          fs: 0,                 // No fullscreen button
          iv_load_policy: 3,     // No annotations
          disablekb: 1,          // Disable keyboard controls
          autoplay: 0,           // Don't autoplay
          playsinline: 1         // Play inline on mobile
        },
        events: {
          onReady: (event) => {
            this.playerReady = true;
            this.isPlaying = false;
            // Keep controls visible when paused
            this.controlsVisible = true;
          },
          onStateChange: (event) => {
            this.handleStateChange(event);
          }
        }
      });
    },

    // Handle player state changes
    handleStateChange(event) {
      // YT.PlayerState.PLAYING = 1
      // YT.PlayerState.PAUSED = 2
      // YT.PlayerState.ENDED = 0
      
      if (event.data === YT.PlayerState.PLAYING) {
        this.isPlaying = true;
        this.updatePageTitle();
        // Start tracking play time
        if (!this.currentSongStartTime) {
          this.currentSongStartTime = Date.now();
        }
      } else if (event.data === YT.PlayerState.PAUSED) {
        this.isPlaying = false;
        this.updatePageTitle();
      } else if (event.data === YT.PlayerState.ENDED) {
        // Song finished naturally - reset skip counter
        // This handles short Bill Wurtz songs that end before 10s
        this.consecutiveSkips = 0;
        this.saveSkipTracking();
        
        // Reset song start time
        this.currentSongStartTime = null;
        
        // If in penalty mode, decrement counter and play next
        if (this.songsUntilNextEnabled > 0) {
          this.songsUntilNextEnabled--;
          this.saveSkipTracking();
          
          // If penalty is over, reset skip counter
          if (this.songsUntilNextEnabled === 0) {
            this.consecutiveSkips = 0;
            this.saveSkipTracking();
          }
          
          // Play next song
          this.currentIndex = (this.currentIndex + 1) % this.shuffledPlaylist.length;
          this.recentPlaysIndex = 0;
          this.loadVideoWithoutPenaltyCheck();
        } else {
          // Normal auto-advance - mark as not a skip
          this.autoAdvancing = true;
          this.next();
          this.autoAdvancing = false;
        }
      }
    },

    // Show controls temporarily
    showControls() {
      this.controlsVisible = true;
      
      // Clear existing timeout
      if (this.controlsTimeout) {
        clearTimeout(this.controlsTimeout);
      }

      // Hide controls after 5 seconds if playing
      if (this.isPlaying) {
        this.controlsTimeout = setTimeout(() => {
          this.controlsVisible = false;
        }, 5000);
      }
    },

    // Toggle play/pause
    togglePlay() {
      if (!this.playerReady) return;

      if (this.isPlaying) {
        this.ytPlayer.pauseVideo();
        this.controlsVisible = true; // Keep controls visible when paused
        if (this.controlsTimeout) {
          clearTimeout(this.controlsTimeout);
        }
      } else {
        this.ytPlayer.playVideo();
        this.showControls(); // Start auto-hide timer
      }
      
      // Update title after state change
      this.$nextTick(() => {
        this.updatePageTitle();
      });
    },

    // Next video - smart navigation with skip detection
    next() {
      if (!this.playerReady) return;

      // Check if next is disabled due to penalty - don't do anything
      if (this.songsUntilNextEnabled > 0) {
        // Show controls to display penalty countdown
        this.showControls();
        return;
      }

      // Detect if this is a skip (pressed next before 10 seconds)
      // Only count as skip if we're at the current song (recentPlaysIndex === 0)
      // AND it's not an auto-advance from song ending
      const isSkip = !this.autoAdvancing &&
                     this.recentPlaysIndex === 0 && 
                     this.currentSongStartTime && 
                     (Date.now() - this.currentSongStartTime) < this.skipThreshold;

      if (isSkip) {
        this.consecutiveSkips++;
        
        // If reached max skips, apply penalty
        if (this.consecutiveSkips >= this.maxSkips) {
          this.songsUntilNextEnabled = this.penaltySongs;
          this.consecutiveSkips = 0;
          this.saveSkipTracking();
          // Show controls to display penalty
          this.showControls();
          // Don't skip - let current song continue
          return;
        } else {
          this.saveSkipTracking();
        }
      } else if (this.recentPlaysIndex === 0 && !this.autoAdvancing && this.currentSongStartTime) {
        // Not a skip (played >10s) - reset counter
        this.consecutiveSkips = 0;
        this.saveSkipTracking();
      }

      // Reset song start time
      this.currentSongStartTime = null;

      // If we're navigating through recent plays
      if (this.recentPlaysIndex > 0) {
        this.recentPlaysIndex--;
        const video = this.recentPlays[this.recentPlaysIndex];
        const videoIndex = this.shuffledPlaylist.findIndex(v => v.id === video.id);
        if (videoIndex !== -1) {
          this.currentIndex = videoIndex;
          this.currentVideo = this.shuffledPlaylist[this.currentIndex];
          this.updatePageTitle();
          this.ytPlayer.loadVideoById(this.currentVideo.id);
          this.isPlaying = true;
          this.showControls();
          return;
        }
      }

      // Otherwise, play next in shuffled playlist
      this.currentIndex = (this.currentIndex + 1) % this.shuffledPlaylist.length;
      this.recentPlaysIndex = 0;
      this.loadVideo();
      this.showControls();
    },

    // Check if next button should be disabled
    canGoNext() {
      return this.songsUntilNextEnabled === 0;
    },

    // Get emoji for penalty countdown
    getPenaltyEmoji() {
      const emojiMap = {
        1: '1️⃣',
        2: '2️⃣',
        3: '3️⃣',
        4: '4️⃣',
        5: '5️⃣'
      };
      return emojiMap[this.songsUntilNextEnabled] || '⏭️';
    },

    // Previous video - navigate back in recent plays
    previous() {
      if (!this.playerReady) return;

      // Can't go back if at the very first song
      if (this.recentPlaysIndex >= this.recentPlays.length - 1) {
        return;
      }

      this.recentPlaysIndex++;
      const video = this.recentPlays[this.recentPlaysIndex];
      
      // Find video in shuffled playlist
      const videoIndex = this.shuffledPlaylist.findIndex(v => v.id === video.id);
      if (videoIndex !== -1) {
        this.currentIndex = videoIndex;
        this.currentVideo = this.shuffledPlaylist[this.currentIndex];
        this.ytPlayer.loadVideoById(this.currentVideo.id);
        this.isPlaying = true;
        this.showControls();
      }
    },

    // Check if previous button should be disabled
    canGoPrevious() {
      return this.recentPlaysIndex < this.recentPlays.length - 1;
    },

    // Load video
    loadVideo() {
      this.currentVideo = this.shuffledPlaylist[this.currentIndex];
      
      // Add to recent plays BEFORE loading video
      this.addToRecent(this.currentVideo);
      
      // Update page title
      this.updatePageTitle();
      
      this.ytPlayer.loadVideoById(this.currentVideo.id);
      this.isPlaying = true;

      // Reset song start time for new song
      this.currentSongStartTime = null;

      // Show controls briefly when changing videos
      this.showControls();
    },

    // Load video without penalty check (used during auto-advance in penalty mode)
    loadVideoWithoutPenaltyCheck() {
      this.currentVideo = this.shuffledPlaylist[this.currentIndex];
      
      // Add to recent plays BEFORE loading video
      this.addToRecent(this.currentVideo);
      
      // Update page title
      this.updatePageTitle();
      
      this.ytPlayer.loadVideoById(this.currentVideo.id);
      this.isPlaying = true;

      // Reset song start time for new song
      this.currentSongStartTime = null;

      // Show controls briefly when changing videos
      this.showControls();
    },

    // Update page title with current song (only when playing)
    updatePageTitle() {
      if (this.isPlaying) {
        document.title = `${this.currentVideo.emojiTitle} - ${this.projectName}`;
      } else {
        document.title = this.projectName;
      }
    },

    // LocalStorage functions
    loadRecentPlays() {
      const saved = localStorage.getItem('recentPlays');
      if (saved) {
        this.recentPlays = JSON.parse(saved);
      }
    },

    saveRecentPlays() {
      localStorage.setItem('recentPlays', JSON.stringify(this.recentPlays));
    },

    clearRecentPlays() {
      // Keep only the currently playing song
      if (this.currentVideo && this.currentVideo.id) {
        this.recentPlays = [{
          id: this.currentVideo.id,
          emojiTitle: this.currentVideo.emojiTitle,
          timestamp: Date.now()
        }];
        this.saveRecentPlays();
      } else {
        this.recentPlays = [];
        localStorage.removeItem('recentPlays');
      }
      this.recentPlaysIndex = 0;
    },

    loadLovedSongs() {
      const saved = localStorage.getItem('lovedSongs');
      if (saved) {
        this.lovedSongs = new Set(JSON.parse(saved));
      }
    },

    saveLovedSongs() {
      localStorage.setItem('lovedSongs', JSON.stringify([...this.lovedSongs]));
    },

    loadSkipTracking() {
      const saved = localStorage.getItem('skipTracking');
      if (saved) {
        const data = JSON.parse(saved);
        this.consecutiveSkips = data.consecutiveSkips || 0;
        this.songsUntilNextEnabled = data.songsUntilNextEnabled || 0;
      }
    },

    saveSkipTracking() {
      localStorage.setItem('skipTracking', JSON.stringify({
        consecutiveSkips: this.consecutiveSkips,
        songsUntilNextEnabled: this.songsUntilNextEnabled
      }));
    },

    toggleLove() {
      if (this.lovedSongs.has(this.currentVideo.id)) {
        this.lovedSongs.delete(this.currentVideo.id);
      } else {
        this.lovedSongs.add(this.currentVideo.id);
      }
      this.saveLovedSongs();
    },

    isLoved(videoId) {
      return this.lovedSongs.has(videoId);
    },

    toggleMute() {
      if (!this.playerReady) return;
      
      // Sync state with actual player state
      const actualMuteState = this.ytPlayer.isMuted();
      
      if (actualMuteState) {
        this.ytPlayer.unMute();
        this.isMuted = false;
      } else {
        this.ytPlayer.mute();
        this.isMuted = true;
      }
    },

    // Weighted shuffle - loved songs appear more frequently
    weightedShuffle(playlist) {
      const weighted = [];
      playlist.forEach(video => {
        // Loved songs get 3x weight
        const weight = this.lovedSongs.has(video.id) ? 3 : 1;
        for (let i = 0; i < weight; i++) {
          weighted.push(video);
        }
      });
      
      // Shuffle the weighted array
      const shuffled = shuffleArray(weighted);
      
      // Remove duplicates while maintaining weighted distribution
      const seen = new Set();
      const result = [];
      for (const video of shuffled) {
        if (!seen.has(video.id)) {
          seen.add(video.id);
          result.push(video);
        }
      }
      
      return result;
    },

    // Add video to recent plays
    addToRecent(video) {
      // Add to beginning (most recent at top)
      this.recentPlays.unshift({
        id: video.id,
        emojiTitle: video.emojiTitle,
        timestamp: Date.now()
      });

      // Keep only last 50
      if (this.recentPlays.length > 50) {
        this.recentPlays = this.recentPlays.slice(0, 50);
      }

      // Save to localStorage
      this.saveRecentPlays();
    },



    // Toggle playlist visibility
    togglePlaylist() {
      this.recentCollapsed = !this.recentCollapsed;
    },
  };
}
