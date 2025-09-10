# SoulvexAI ChatWidget (Standalone)

This is a standalone embeddable chat widget based on SoulvexAI's ChatWidget.

## Features
- No dependencies on your main project
- Easy integration into WordPress, PHP, or any site
- Minimal setup: just React, ReactDOM, framer-motion

## Usage
1. Build the widget to produce a single JS file (e.g., `chatwidget-embed.js`).
2. Add to your site:
   ```html
   <div id="soulvex-chat"></div>
   <script src="/path/to/chatwidget-embed.js"></script>
   <script>
     SoulvexChatWidget.mount({ target: '#soulvex-chat' });
   </script>
   ```
3. Customize options as needed.

## Development
- Edit `src/ChatWidget.js` for widget logic.
- Edit `src/index.js` for UMD/ESM entry.

## Demo
See `public/demo.html` for a ready-to-use example.
