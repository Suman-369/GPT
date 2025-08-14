# Nokat AI Chat Interface

A modern, responsive AI chat interface built with Node.js, Express, and EJS templates. Features a beautiful dark/light theme toggle and fully responsive design for all devices.

## Features

- 🎨 **Modern UI Design**: Clean, professional interface inspired by modern AI chat applications
- 🌓 **Theme Toggle**: Switch between light and dark themes with persistent storage
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- 💬 **Chat Interface**: Interactive chat with user and AI message bubbles
- 🔧 **Interactive Elements**: Action buttons, navigation, and smooth animations
- 🎯 **Mobile-First**: Collapsible sidebar for mobile devices with overlay support

## Screenshots

The interface includes:
- Header with logo, version info, and authentication buttons
- Left sidebar with navigation and chat history
- Main chat area with message bubbles
- Responsive design that adapts to all screen sizes
- Beautiful gradient accents and smooth transitions

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open your browser and navigate to `http://localhost:3000`

## File Structure

```
├── public/
│   ├── styles/
│   │   ├── theme.css          # Theme variables and global styles
│   │   └── home.css           # Home page specific styles
│   └── scripts/
│       └── home.js            # Interactive functionality
├── views/
│   └── home.ejs               # Main layout template
├── server.js                  # Express server
└── package.json
```

## Key Features

### Theme System
- CSS custom properties for consistent theming
- Automatic system preference detection
- Persistent theme storage in localStorage
- Smooth transitions between themes

### Responsive Design
- **Desktop**: Full sidebar and chat area layout
- **Tablet**: Adjusted spacing and sizing
- **Mobile**: Collapsible sidebar with overlay
- Breakpoints: 1024px, 768px, 480px

### Interactive Elements
- Theme toggle button
- Sign In/Sign Up buttons
- Mobile menu toggle
- Chat input with auto-resize
- Message action buttons (like, dislike, copy, regenerate)
- Navigation menu with active states

### Chat Functionality
- User and AI message bubbles
- Auto-scrolling chat area
- Message input with send button
- Simulated AI responses
- New chat creation
- Chat history navigation

## Customization

### Colors and Themes
Modify the CSS variables in `public/styles/theme.css`:
```css
:root {
  --primary-bg: #f6f8fa;
  --primary-color: #1a1a1a;
  --accent: #2563eb;
  /* ... more variables */
}
```

### Layout
Adjust the responsive breakpoints in `public/styles/home.css`:
```css
@media (max-width: 768px) {
  /* Mobile styles */
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: EJS templates, vanilla JavaScript
- **Styling**: CSS3 with custom properties
- **Icons**: Font Awesome 6
- **Responsive**: CSS Grid and Flexbox

## Development

To run in development mode:
```bash
npm run dev
```

## License

This project is open source and available under the [MIT License](LICENSE).
