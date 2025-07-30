# HTML Audio Player 

A lightweight, dependency-free HTML5 audio player built with vanilla HTML, CSS, and JavaScript. It features a modern, responsive UI for seamless music playback with intuitive controls and playlist support.

## Features
- **Play/Pause**: Start or stop playback with a single click.
- **Progress Bar**: Seek to any point in the track with click and hover time preview.
- **Volume Control**: Adjust volume via slider or mute/unmute with a button.
- **Loop Toggle**: Enable/disable looping of the current track.
- **Playlist**: Select tracks with dynamic updates to title, artist, and album art.
- **Fallback Image**: Displays a "No Album Art" placeholder if album art fails to load.
- **Loading Spinner**: Visual feedback during audio buffering.
- **Responsive Design**: Adapts to all screen sizes with a clean, modern look.

## Setup
1. **Clone or Download**: Clone the repository or download `index.html` to your project folder:
   ```bash
   git clone https://github.com/aneesh-acharyeah/html-audio-player.git
   ```
2. **Audio Files**: Replace `data-src` attributes in `.playlist-item` elements in `index.html` with your MP3 URLs or local paths (defaults to SoundHelix samples).
3. **Serve**: Host on a web server to bypass browser audio restrictions:
   ```bash
   npm install -g http-server
   http-server .
   ```
   Open `http://localhost:8080` in your browser.
4. **Browser Support**: Compatible with Chrome, Firefox, and Edge.

## Usage
- **Play/Pause**: Click the play button (▶/❚❚) to toggle playback.
- **Seek**: Click the progress bar to jump to a specific time; hover for time preview.
- **Volume**: Use the slider or mute button (🔊/🔇) to control audio.
- **Loop**: Toggle looping with the loop button (🔁).
- **Playlist**: Click a track in the playlist to play it and update the UI.
- **Fallback Image**: A placeholder appears if album art is unavailable.

## Customization
- **Tracks**: Edit `data-src`, `data-title`, and `data-artist` in `.playlist-item` elements to add your tracks.
- **Album Art**: Update `albumArt.src` in the `loadTrack` function in `index.html` for custom images.
- **Fallback Image**: Change the `onerror` URL in the `.album-art` `<img>` tag for a custom fallback.
- **Theme**: Modify CSS variables in `:root` (e.g., `--primary-color`) to adjust colors.

## Notes
- No external dependencies required.
- Audio playback requires user interaction (e.g., clicking play) and a server-hosted file due to browser policies.
- Use the browser console (F12) to debug audio or image loading issues.

## Troubleshooting
- **Audio Not Playing**: Ensure MP3 URLs are valid, use a web server, and click play first. Check console for `MediaError` or `DOMException`.
- **Image Issues**: Verify album art URLs; the fallback image appears if they fail.
- **Controls Not Working**: Check for JavaScript errors in the console and ensure a modern browser.

```
