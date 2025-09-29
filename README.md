# AstroBioHub Frontend

A modern React application for exploring and analyzing space biology research papers with an intelligent chat interface and interactive paper exploration features.

## 🚀 Features

### 📊 Research Paper Analysis

- **Interactive Paper Overview**: Comprehensive summaries of academic research papers
- **Smart Citations**: Click-to-highlight citation references with automatic paper card navigation
- **Paper Cards**: Visual cards showing paper details including authors, publication info, and abstracts
- **Auto-scroll Navigation**: Smooth scrolling to relevant paper cards when hovering over citations

### 💬 AI-Powered Chat Interface

- **Intelligent Q&A**: Ask questions about research topics with AI-generated responses
- **Real-time Crafting**: Visual feedback during AI response generation
- **Contextual Responses**: AI responses tailored to space biology and research content
- **Smooth UX**: Hover-to-highlight citations with instant paper navigation

### 🎨 Modern UI/UX

- **Responsive Design**: Optimized for desktop and tablet viewing
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Custom Styling**: Tailwind CSS with custom design tokens from Figma
- **Minimal Scrollbars**: Custom ultra-minimal scrollbar styling

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + Custom Design System
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Routing**: React Router
- **Icons**: Custom SVG Icon System
- **Package Manager**: Bun

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── icons/           # SVG icon components
│   ├── AuthorList.jsx   # Author display component
│   ├── Button.jsx       # Custom button component
│   ├── SearchBar.jsx    # Search input component
│   └── Toggle.jsx       # Toggle switch component
├── pages/
│   └── SummaryPage/     # Main summary page components
│       ├── components/  # Page-specific components
│       │   ├── Chat.jsx              # AI chat interface
│       │   ├── HighligthedText.jsx   # Citation highlighting
│       │   ├── PaperAcademicCard.jsx # Paper display cards
│       │   └── TableOfContents.jsx   # Navigation sidebar
│       ├── SummaryAcademicPage.jsx   # Academic paper summary view
│       └── SummaryDiscoverPage.jsx   # Discovery page view
├── store/               # Zustand state management
│   ├── useAppStore.js           # Global app state
│   └── useSummaryPageStore.js   # Summary page state
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
└── styles/              # Global styles and CSS
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd astrobiohub-frontend
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Start development server**

   ```bash
   bun dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Key Features Implementation

### Citation Highlighting System

- **Hover Activation**: Citations highlight on mouse hover
- **Auto-scroll**: Automatically scrolls to relevant paper cards
- **State Management**: Tracks highlighted segments and selected papers
- **Visual Feedback**: Color-coded highlighting with smooth transitions

### AI Chat Integration

- **Simulated Backend**: 4-second response simulation with realistic delays
- **Contextual Responses**: Pre-defined responses related to space biology research
- **Loading States**: "Crafting..." indicator with animated dots
- **Message History**: Persistent chat history with user/assistant role differentiation

### Paper Navigation

- **Sticky Sidebar**: Paper cards remain visible during scroll
- **Smooth Scrolling**: Custom scroll behavior for paper card container
- **Visual Selection**: Selected paper cards highlight with background color
- **Responsive Layout**: Adaptive layout for different screen sizes

## 🎨 Design System

The project uses a custom design system built from Figma variables:

- **Typography**: Custom text styles with semantic naming
- **Spacing**: Consistent spacing tokens
- **Colors**: Carefully curated color palette
- **Components**: Reusable component library
- **Animations**: Smooth transitions and micro-interactions

## 📱 Responsive Design

- **Desktop First**: Optimized for desktop viewing experience
- **Tablet Support**: Responsive layout for tablet devices
- **Mobile Considerations**: Touch-friendly interactions and sizing

## 🔧 Development

### Available Scripts

```bash
# Development
bun dev          # Start development server
bun build        # Build for production
bun preview      # Preview production build

# Code Quality
bun lint         # Run ESLint
bun lint:fix     # Fix ESLint issues
```

### Code Style

- **ESLint**: Configured for React best practices
- **Prettier**: Code formatting (if configured)
- **Component Structure**: Functional components with hooks
- **State Management**: Zustand for global state

## 🚀 Deployment

### Build for Production

```bash
bun run build
```

### Deploy

The built files in the `dist/` directory can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Research Data**: Sample data for space biology research papers
- **Design System**: Custom design tokens and components
- **UI Inspiration**: Modern academic and research platform interfaces

---

**AstroBioHub Frontend** - Bridging space biology research with intelligent interfaces 🚀🧬
