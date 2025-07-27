        document.addEventListener('DOMContentLoaded', () => {
            const audio = document.querySelector('.audio');
            const playBtn = document.querySelector('.play-btn');
            const muteBtn = document.querySelector('.mute-btn');
            const volumeSlider = document.querySelector('.volume-slider');
            const progressContainer = document.querySelector('.progress-container');
            const progressBar = document.querySelector('.progress-bar');
            const progressTime = document.querySelector('.progress-time');
            const timeDisplay = document.querySelector('.time-display');
            const loopBtn = document.querySelector('.loop-btn');
            const playlistItems = document.querySelectorAll('.playlist-item');
            const trackTitle = document.querySelector('.track-title');
            const trackArtist = document.querySelector('.track-artist');
            const albumArt = document.querySelector('.album-art');
            const loadingSpinner = document.querySelector('.loading-spinner');

            let isPlaying = false;
            let isMuted = false;
            let isLooping = false;

            function loadTrack(item) {
                const src = item.dataset.src;
                const title = item.dataset.title;
                const artist = item.dataset.artist;
                audio.src = src;
                trackTitle.textContent = title;
                trackArtist.textContent = artist;
                // Reset album art to trigger onerror if needed
                albumArt.src = `https://via.placeholder.com/600x200?text=${encodeURIComponent(title)}`;
                playlistItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                audio.load();
                console.log(`Loading track: ${title} - ${src}`);
                if (isPlaying) {
                    audio.play().then(() => {
                        console.log('Playback started');
                    }).catch(e => {
                        console.error('Playback failed:', e);
                        alert('Failed to play audio. Ensure the source is valid and try again.');
                    });
                }
            }

            if (playlistItems.length > 0) {
                loadTrack(playlistItems[0]);
            }

            function togglePlay() {
                if (isPlaying) {
                    audio.pause();
                    playBtn.textContent = '▶';
                    playBtn.title = 'Play';
                    isPlaying = false;
                } else {
                    audio.play().then(() => {
                        playBtn.textContent = '❚❚';
                        playBtn.title = 'Pause';
                        isPlaying = true;
                    }).catch(e => {
                        console.error('Playback failed:', e);
                        alert('Failed to play audio. Ensure the source is valid and try again after clicking the play button.');
                    });
                }
            }

            function toggleMute() {
                audio.muted = !audio.muted;
                isMuted = audio.muted;
                muteBtn.textContent = isMuted ? '🔇' : '🔊';
                muteBtn.title = isMuted ? 'Unmute' : 'Mute';
                volumeSlider.value = isMuted ? 0 : audio.volume;
            }

            function updateVolume() {
                const volume = parseFloat(volumeSlider.value);
                audio.volume = volume;
                audio.muted = volume === 0;
                isMuted = audio.muted;
                muteBtn.textContent = isMuted ? '🔇' : '🔊';
                muteBtn.title = isMuted ? 'Unmute' : 'Mute';
            }

            function updateProgress() {
                if (audio.duration && !isNaN(audio.duration)) {
                    const percent = (audio.currentTime / audio.duration) * 100;
                    progressBar.style.width = `${percent}%`;
                    timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
                }
            }

            function setProgress(e) {
                const width = progressContainer.clientWidth;
                const clickX = e.offsetX;
                const duration = audio.duration;
                if (duration && !isNaN(duration)) {
                    audio.currentTime = (clickX / width) * duration;
                    updateProgress();
                }
            }

            function showProgressTime(e) {
                const width = progressContainer.clientWidth;
                const clickX = e.offsetX;
                const duration = audio.duration;
                if (duration && !isNaN(duration)) {
                    const previewTime = (clickX / width) * duration;
                    progressTime.textContent = formatTime(previewTime);
                    progressTime.style.left = `${(clickX / width) * 100}%`;
                }
            }

            function formatTime(seconds) {
                if (isNaN(seconds)) return '00:00';
                const minutes = Math.floor(seconds / 60);
                seconds = Math.floor(seconds % 60);
                return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }

            playBtn.addEventListener('click', togglePlay);
            muteBtn.addEventListener('click', toggleMute);
            volumeSlider.addEventListener('input', updateVolume);
            loopBtn.addEventListener('click', () => {
                isLooping = !isLooping;
                audio.loop = isLooping;
                loopBtn.style.color = isLooping ? 'var(--primary-color)' : 'var(--text-color)';
                loopBtn.title = isLooping ? 'Disable Loop' : 'Enable Loop';
            });
            progressContainer.addEventListener('click', setProgress);
            progressContainer.addEventListener('mousemove', showProgressTime);
            progressContainer.addEventListener('mouseleave', () => {
                progressTime.style.display = 'none';
            });
            audio.addEventListener('loadedmetadata', () => {
                timeDisplay.textContent = `00:00 / ${formatTime(audio.duration)}`;
                console.log('Metadata loaded, duration:', audio.duration);
            });
            audio.addEventListener('waiting', () => {
                loadingSpinner.style.display = 'block';
                console.log('Audio buffering...');
            });
            audio.addEventListener('playing', () => {
                loadingSpinner.style.display = 'none';
                console.log('Audio playing');
            });
            audio.addEventListener('error', (e) => {
                console.error('Audio error:', e);
                alert('Error loading audio. Check the source URL or network connection.');
            });
            audio.addEventListener('ended', () => {
                if (!isLooping) {
                    const currentIndex = Array.from(playlistItems).findIndex(item => item.classList.contains('active'));
                    const nextIndex = (currentIndex + 1) % playlistItems.length;
                    loadTrack(playlistItems[nextIndex]);
                    audio.play().then(() => {
                        playBtn.textContent = '❚❚';
                        playBtn.title = 'Pause';
                        isPlaying = true;
                    }).catch(e => console.error('Playback failed:', e));
                }
            });

            playlistItems.forEach(item => {
                item.addEventListener('click', () => {
                    loadTrack(item);
                    audio.play().then(() => {
                        playBtn.textContent = '❚❚';
                        playBtn.title = 'Pause';
                        isPlaying = true;
                    }).catch(e => {
                        console.error('Playback failed:', e);
                        alert('Failed to play audio. Ensure the source is valid and try again.');
                    });
                });
            });
        });
