# Custom HTML Audio Player

## Overview
A lightweight, dependency-free HTML5 audio player built with vanilla HTML, CSS, and JavaScript. It features a modern, responsive UI with essential controls for music playback, including a playlist, progress bar, and volume adjustments. Ideal for embedding audio with a clean, user-friendly interface.

## Features
- **Play/Pause**: Toggle playback with a button.
- **Progress Bar**: Seek to specific points with click and hover time preview.
- **Volume Control**: Adjust volume via slider; mute/unmute with a button.
- **Loop Toggle**: Enable/disable looping of the current track.
- **Playlist**: Switch between tracks with dynamic title, artist, and album art updates.
- **Fallback Image**: Displays a placeholder image if album art fails to load.
- **Loading Spinner**: Visual feedback during audio buffering.
- **Responsive Design**: Adapts to various screen sizes with a sleek UI.

## Setup Instructions
1. **Clone or Download**: Copy the `index.html` file to your project directory.
2. **Audio Sources**: Replace the `data-src` attributes in `.playlist-item` elements with your MP3 file URLs or paths (default uses SoundHelix samples).
3. **Serve the File**: Host on a web server for full functionality (e.g., audio playback requires HTTP/HTTPS due to browser restrictions):
   ```bash
   npm install -g http-server
   http-server .
   ```
   Open `http://localhost:8080` in your browser.
4. **Browser Compatibility**: Works in modern browsers (Chrome, Firefox, Edge).

## Usage
- **Play/Pause**: Click the play button (▶/❚❚) to start/stop playback.
- **Seek**: Click the progress bar to jump to a time; hover for time preview.
- **Volume**: Adjust with the slider or mute with the button (🔊/🔇).
- **Loop**: Toggle looping with the loop button (🔁).
- **Playlist**: Click a track in the playlist to load and play it.
- **Fallback Image**: If album art fails, a "No Album Art" placeholder appears.

## Customization
- **Audio Tracks**: Update `data-src`, `data-title`, and `data-artist` in `.playlist-item` elements to add your tracks.
- **Album Art**: Modify the `albumArt.src` in the `loadTrack` function to use custom image URLs.
- **Fallback Image**: Change the `onerror` URL in the `.album-art` `<img>` tag for a custom fallback.
- **Styling**: Edit CSS variables in `:root` (e.g., `--primary-color`) to adjust the theme.

## Notes
- **No Dependencies**: Built with vanilla HTML, CSS, and JavaScript.
- **Browser Restrictions**: Audio playback requires user interaction (e.g., clicking play) and a server-hosted file due to browser policies.
- **Debugging**: Check the browser console (F12) for errors if audio fails to play or images don’t load.
- **Tested**: Verified in Chrome, Firefox, and Edge as of July 27, 2025.

## Troubleshooting
- **Audio Not Playing**: Ensure audio URLs are valid, served over HTTP/HTTPS, and click the play button first. Check console for `MediaError` or `DOMException`.
- **Image Issues**: Verify album art URLs; the fallback image (`No Album Art`) appears if they fail.
- **Controls Not Working**: Check console for JavaScript errors and ensure a modern browser is used.