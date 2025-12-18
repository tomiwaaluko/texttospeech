# Text to Speech Web App

A modern, free text-to-speech web application built with Next.js and the Web Speech API. Paste any text and have it read back to you with adjustable speed, pitch, and volume controls.

## ✨ Features

- 🎙️ **Natural Speech Synthesis** - Uses your browser's built-in Web Speech API
- 🎚️ **Speed Control** - Adjust reading speed from 0.5x to 2x
- 🎵 **Pitch Control** - Modify voice pitch for different tones
- 🔊 **Volume Control** - Adjust audio volume
- 🌍 **Multiple Voices** - Choose from available system voices in different languages
- ⏸️ **Playback Controls** - Play, pause, resume, and stop functionality
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🆓 **Completely Free** - No API keys required, works offline
- 🎨 **Beautiful UI** - Modern gradient design with glassmorphism effects

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm package manager
- A modern browser (Chrome, Edge, Safari)

### Installation

1. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 🎯 How to Use

1. **Enter Text**: Type or paste your text into the text area
2. **Choose Voice**: Select from available voices in your system
3. **Adjust Settings**:
   - Use the **Speed** slider to control how fast the text is read (0.5x - 2x)
   - Use the **Pitch** slider to change voice tone (0.5 - 2.0)
   - Use the **Volume** slider to adjust loudness (0% - 100%)
4. **Control Playback**:
   - Click **Speak** to start reading
   - Click **Pause** to pause playback
   - Click **Resume** to continue from where you paused
   - Click **Stop** to stop completely
   - Click **Clear** to clear the text and stop playback

## 🧩 Project Structure

```
texttospeech/
├── src/
│   ├── pages/
│   │   ├── _app.tsx          # Next.js app wrapper
│   │   └── index.tsx          # Main TTS page
│   ├── hooks/
│   │   └── useTTS.ts          # Custom hook for speech synthesis
│   └── styles/
│       └── globals.css        # Global styles with Tailwind
├── public/                    # Static assets
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
└── next.config.js             # Next.js configuration
```

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Speech API**: [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

## 🌐 Browser Compatibility

The Web Speech API is supported in:

- ✅ Chrome/Chromium (desktop & mobile)
- ✅ Edge (desktop & mobile)
- ✅ Safari (desktop & mobile)
- ❌ Firefox (limited support)

## 🔄 Future Enhancements

Want to add more features? Here are some ideas:

### Option 1: Google Cloud Text-to-Speech (Recommended for you)

Since you have a Google API key, you can integrate [Google Cloud TTS](https://cloud.google.com/text-to-speech) for:

- Higher quality voices
- More voice options
- Multilingual support
- Custom voice training

**Setup:**

1. Enable Google Cloud Text-to-Speech API
2. Create API credentials
3. Install `@google-cloud/text-to-speech` package
4. Create API route in `src/pages/api/tts.ts`

### Option 2: Other Features

- Save/load text presets
- Export speech to audio file
- Highlight text as it's being read
- Word count and reading time estimates
- Dark/light mode toggle
- Keyboard shortcuts

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💡 Tips

- For best quality, use Chrome or Edge browsers
- Different operating systems have different voice options
- Longer texts may be split into chunks by the browser
- The app works completely offline once loaded

---

Built with ❤️ using Next.js and the Web Speech API
