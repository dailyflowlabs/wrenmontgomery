/**
 * WREN MONTGOMERY — Audio Engine & Visualizer
 * HTML5 Audio + Web Audio API Canvas Visualizer
 */

(function () {
  'use strict';

  const lyricsRodeo = `[Intro]
[Driving Stomp-Clap Rhythm & Fast Telecaster Riff]
Yeah, my mama told me watch out for the boots and the hat...
She just forgot to mention what was under all that.

[Verse 1]
You rolled up in a lifted two-tone Chevrolet
Spittin' lines smoother than sweet tea in May
Talkin' big about your ranch out in Abilene
Boy, you sold a fairytale right out of a magazine
Bought my drink, pulled my chair, talked a real good game
'Til I caught you two-steppin' with another name.

[Pre-Chorus]
Now you're textin' me apologies at two in the morn?
Honey, save your breath, that saddle’s already worn.

[Chorus]
Ain't my first rodeo, just my first clown!
Thought you’d take my little heart and turn it upside down!
You’re all buckle, no belt, all hat and no herd,
Talkin' ninety miles an hour, not a single true word!
So pack up your circus and take it out of town—
Yeah, it ain't my first rodeo,
Just my first clown!
[Fast Fiddle Breakdown]

[Verse 2]
Left your cheap cologne all over my passenger seat
Now you're tellin' your buddies you swept me off my feet
Go ahead and talk, boy, make yourself feel tall
You’re a ten-dollar haircut against a brick wall.
I ain't crying in my pillow, I ain't missin' your calls
I’m out kickin' up sawdust in these cedar halls!

[Pre-Chorus]
If you think I’m comin' back, you got it all confused
I don't look good in tears, and baby, I don't lose.

[Chorus]
'Cause it ain't my first rodeo, just my first clown!
Thought you’d take my little heart and turn it upside down!
You’re all buckle, no belt, all hat and no herd,
Talkin' ninety miles an hour, not a single true word!
So pack up your circus and take it out of town—
Yeah, it ain't my first rodeo,
Just my first clown!

[Bridge]
[Acoustic Strum and Claps Only]
(One, two, three, let's go!)
I’ve seen wild horses, I’ve seen bulls break loose
Ain't nothin' quite as reckless as a cowboy with an excuse!
(Hey! Woo!)

[Guitar and Fiddle Solo]

[Chorus]
Ain't my first rodeo, just my first clown!
Thought you’d take my little heart and turn it upside down!
You’re all buckle, no belt, all hat and no herd,
Talkin' ninety miles an hour, not a single true word!
So pack up your circus and take it out of town—
Yeah, it ain't my first rodeo,
Just my first clown!

[Outro]
Yeah, just my first clown.
Honk your horn on the way out, baby!
[Laugh & Final Fiddle Stab]`;

  const tracks = [
    {
      id: 'rodeo-master',
      title: "Ain't My First Rodeo",
      subtitle: "Debut Single • Studio Master",
      tag: "Lead Single",
      duration: "2:26",
      src: "music/01-aint-my-first-rodeo-master.mp3",
      artwork: "music/01-aint-my-first-rodeo.jpg",
      lyrics: lyricsRodeo
    },
    {
      id: 'rodeo-vocal',
      title: "Ain't My First Rodeo (Acoustic Lead Vocal)",
      subtitle: "Raw Vocal Take • Studio Session",
      tag: "Acoustic Take",
      duration: "2:06",
      src: "music/02-aint-my-first-rodeo-vocal.mp3",
      artwork: "music/02-aint-my-first-rodeo.jpg",
      lyrics: lyricsRodeo
    },
    {
      id: 'rodeo-karaoke',
      title: "Ain't My First Rodeo (Tailgate Backing)",
      subtitle: "Instrumental Singalong • Barn Dance Edition",
      tag: "Instrumental",
      duration: "2:26",
      src: "music/03-aint-my-first-rodeo-karaoke.mp3",
      artwork: "music/03-aint-my-first-rodeo.jpg",
      lyrics: lyricsRodeo
    }
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;
  let isLooping = false;
  let audioCtx = null;
  let analyser = null;
  let source = null;
  let visualizerActive = false;

  // DOM Elements
  const audio = document.getElementById('mainAudio');
  const playPauseMasterBtn = document.getElementById('playPauseMasterBtn');
  const heroStreamNowBtn = document.getElementById('heroStreamNowBtn');
  const navStreamBtn = document.getElementById('navStreamBtn');
  const prevTrackBtn = document.getElementById('prevTrackBtn');
  const nextTrackBtn = document.getElementById('nextTrackBtn');
  const loopTrackBtn = document.getElementById('loopTrackBtn');
  const openLyricsBtn = document.getElementById('openLyricsBtn');
  const volumeSlider = document.getElementById('volumeSlider');
  const scrubberTrack = document.getElementById('scrubberTrack');
  const scrubberFill = document.getElementById('scrubberFill');
  const currentTimeEl = document.getElementById('currentTime');
  const totalDurationEl = document.getElementById('totalDuration');
  const playerArtImg = document.getElementById('playerArtImg');
  const playerTrackTitle = document.getElementById('playerTrackTitle');
  const playerTrackArtist = document.getElementById('playerTrackArtist');
  const audioActiveBadge = document.getElementById('audioActiveBadge');
  const playlistContainer = document.getElementById('playlistContainer');

  // Mini Player Elements
  const persistentMiniPlayer = document.getElementById('persistentMiniPlayer');
  const heroMiniThumb = document.getElementById('heroMiniThumb');
  const heroMiniTitle = document.getElementById('heroMiniTitle');
  const heroMiniSubtitle = document.getElementById('heroMiniSubtitle');
  const heroMiniPlayBtn = document.getElementById('heroMiniPlayBtn');

  // Canvas
  const canvas = document.getElementById('visualizerCanvas');
  const canvasCtx = canvas ? canvas.getContext('2d') : null;

  function initAudioContext() {
    if (audioCtx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source = audioCtx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      visualizerActive = true;
      renderVisualizer();
    } catch (e) {
      console.warn('Web Audio API not supported or autoplay restricted:', e);
    }
  }

  function renderVisualizer() {
    if (!visualizerActive || !canvasCtx || !analyser) return;
    requestAnimationFrame(renderVisualizer);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    const width = canvas.width = canvas.parentElement.offsetWidth;
    const height = canvas.height = canvas.parentElement.offsetHeight;

    canvasCtx.clearRect(0, 0, width, height);

    const barWidth = (width / bufferLength) * 1.8;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * height * 0.85;
      const gradient = canvasCtx.createLinearGradient(0, height - barHeight, 0, height);
      gradient.addColorStop(0, '#fbbf24');
      gradient.addColorStop(1, '#b45309');

      canvasCtx.fillStyle = gradient;
      canvasCtx.fillRect(x, height - barHeight, barWidth - 2, barHeight);
      x += barWidth;
    }
  }

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function loadTrack(index) {
    if (index < 0 || index >= tracks.length) return;
    currentTrackIndex = index;
    const track = tracks[currentTrackIndex];

    audio.src = track.src;
    audio.load();

    if (playerArtImg) playerArtImg.src = track.artwork;
    if (playerTrackTitle) playerTrackTitle.textContent = track.title;
    if (playerTrackArtist) playerTrackArtist.textContent = `Wren Montgomery • ${track.subtitle}`;
    if (totalDurationEl) totalDurationEl.textContent = track.duration;

    if (heroMiniThumb) heroMiniThumb.src = track.artwork;
    if (heroMiniTitle) heroMiniTitle.textContent = track.title;
    if (heroMiniSubtitle) heroMiniSubtitle.textContent = track.subtitle;

    updatePlaylistActiveState();
  }

  function playTrack() {
    initAudioContext();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    audio.play().then(() => {
      isPlaying = true;
      updatePlayPauseIcons(true);
    }).catch(err => {
      console.warn('Playback blocked or pending interaction:', err);
    });
  }

  function pauseTrack() {
    audio.pause();
    isPlaying = false;
    updatePlayPauseIcons(false);
  }

  function togglePlayPause() {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  }

  function updatePlayPauseIcons(playing) {
    const playIconSvg = '<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    const pauseIconSvg = '<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
    const miniPlaySvg = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    const miniPauseSvg = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';

    if (playPauseMasterBtn) playPauseMasterBtn.innerHTML = playing ? pauseIconSvg : playIconSvg;
    if (heroMiniPlayBtn) heroMiniPlayBtn.innerHTML = playing ? miniPauseSvg : miniPlaySvg;
    if (audioActiveBadge) {
      audioActiveBadge.style.opacity = playing ? '1' : '0.4';
    }
  }

  function renderPlaylist() {
    if (!playlistContainer) return;
    playlistContainer.innerHTML = '';

    tracks.forEach((track, idx) => {
      const item = document.createElement('div');
      item.className = `playlist-item ${idx === currentTrackIndex ? 'active' : ''}`;
      item.dataset.index = idx;

      item.innerHTML = `
        <div class="playlist-track-left">
          <span class="track-num">${idx + 1}</span>
          <div class="track-info">
            <div class="track-info-name">${track.title}</div>
            <div class="track-info-sub">${track.subtitle}</div>
          </div>
        </div>
        <div class="track-dur">${track.duration}</div>
      `;

      item.addEventListener('click', () => {
        loadTrack(idx);
        playTrack();
      });

      playlistContainer.appendChild(item);
    });
  }

  function updatePlaylistActiveState() {
    if (!playlistContainer) return;
    const items = playlistContainer.querySelectorAll('.playlist-item');
    items.forEach((item, idx) => {
      if (idx === currentTrackIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // Audio Event Listeners
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      const progress = (audio.currentTime / audio.duration) * 100;
      if (scrubberFill) scrubberFill.style.width = `${progress}%`;
      if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    if (totalDurationEl && audio.duration) {
      totalDurationEl.textContent = formatTime(audio.duration);
    }
  });

  audio.addEventListener('ended', () => {
    if (isLooping) {
      audio.currentTime = 0;
      playTrack();
    } else {
      nextTrack();
    }
  });

  function prevTrack() {
    let newIndex = currentTrackIndex - 1;
    if (newIndex < 0) newIndex = tracks.length - 1;
    loadTrack(newIndex);
    playTrack();
  }

  function nextTrack() {
    let newIndex = currentTrackIndex + 1;
    if (newIndex >= tracks.length) newIndex = 0;
    loadTrack(newIndex);
    playTrack();
  }

  // Scrubber Seek
  if (scrubberTrack) {
    scrubberTrack.addEventListener('click', (e) => {
      const rect = scrubberTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      if (audio.duration) {
        audio.currentTime = ratio * audio.duration;
      }
    });
  }

  // Volume
  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      audio.volume = parseFloat(e.target.value);
    });
  }

  // Controls Event Listeners
  if (playPauseMasterBtn) playPauseMasterBtn.addEventListener('click', togglePlayPause);
  if (heroMiniPlayBtn) heroMiniPlayBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePlayPause();
  });
  if (prevTrackBtn) prevTrackBtn.addEventListener('click', prevTrack);
  if (nextTrackBtn) nextTrackBtn.addEventListener('click', nextTrack);

  if (loopTrackBtn) {
    loopTrackBtn.addEventListener('click', () => {
      isLooping = !isLooping;
      loopTrackBtn.classList.toggle('active', isLooping);
    });
  }

  if (heroStreamNowBtn) {
    heroStreamNowBtn.addEventListener('click', () => {
      const musicSec = document.getElementById('music');
      if (musicSec) musicSec.scrollIntoView({ behavior: 'smooth' });
      playTrack();
    });
  }

  if (navStreamBtn) {
    navStreamBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const musicSec = document.getElementById('music');
      if (musicSec) musicSec.scrollIntoView({ behavior: 'smooth' });
      playTrack();
    });
  }

  // Floating Mini Player Click -> Scroll to Vault
  if (persistentMiniPlayer) {
    persistentMiniPlayer.addEventListener('click', (e) => {
      if (e.target.closest('#heroMiniPlayBtn')) return;
      const musicSec = document.getElementById('music');
      if (musicSec) musicSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Lyrics Modal
  const lyricsModal = document.getElementById('lyricsModal');
  const lyricsModalTitle = document.getElementById('lyricsModalTitle');
  const lyricsModalContent = document.getElementById('lyricsModalContent');

  if (openLyricsBtn && lyricsModal) {
    openLyricsBtn.addEventListener('click', () => {
      const track = tracks[currentTrackIndex];
      if (lyricsModalTitle) lyricsModalTitle.textContent = `${track.title} — Lyrics`;
      if (lyricsModalContent) lyricsModalContent.textContent = track.lyrics || 'Lyrics coming soon.';
      lyricsModal.classList.add('active');
    });
  }

  // Close modals
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-overlay').forEach(modal => modal.classList.remove('active'));
    });
  });

  // Init
  loadTrack(0);
  renderPlaylist();

  // Expose global controller if needed
  window.wrenPlayer = {
    loadTrack,
    playTrack,
    pauseTrack,
    togglePlayPause
  };
})();
