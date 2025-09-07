# 🎉 EventHub - Community Events Discovery Platform

A modern, responsive React application for discovering and managing local community events. Built with React, TypeScript, and Tailwind CSS, featuring dark mode support and a beautiful, intuitive user interface.

![Screenshot](src/img//Screenshot%202025-09-07%20161728.png)
## 🚀 Live Demo

Experience EventHub in action! The application is fully responsive and optimized for all devices.

### 📸 Screenshots

**Light Mode - Event Discovery**
![Screenshot](src/img//Screenshot%202025-09-07%20161748.png)

**Dark Mode - Event Details**
![Dark Mode](src/img//Screenshot%202025-09-07%20161804.png)

## ✨ Features

### 🔍 **Event Discovery & Browsing**
- Responsive grid layout with beautiful event cards
- Pagination for optimal performance
- Comprehensive event information display
- Smooth animations and micro-interactions

### 🎛️ **Advanced Filtering System**
- Filter by event type (Workshop, Music, Sports, Meetup, Entertainment, Fitness, Social)
- Date range filtering with calendar picker
- Location-based filtering
- Real-time search functionality
- Combine multiple filters simultaneously
- Clear all filters with one click

### 📱 **Responsive Design**
- Mobile-first approach
- Optimized for all screen sizes (mobile, tablet, desktop)
- Touch-friendly interface
- Smooth transitions and animations

### 🌙 **Dark Mode Support**
- System preference detection
- Manual toggle with smooth transitions
- Persistent theme selection
- Comprehensive dark mode styling

### 💝 **RSVP Management**
- One-click RSVP functionality
- Visual confirmation modals
- Prevent duplicate registrations
- Track registered events
- Cancel RSVP capability

### 📝 **Event Creation**
- Comprehensive event creation form
- Real-time validation
- Auto-complete for locations
- Success confirmation
- Form error handling

### 🎨 **Modern UI Components**
- Reusable component library
- Consistent design system
- Loading states and error handling
- Accessible design (ARIA compliant)
- Beautiful icons from Lucide React

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:
- **Node.js** (version 16.0 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SHUBHAMKUMAR45/EventHub.git
   cd eventhub
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` to view the application.

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Button, Card, Input, etc.)
│   ├── EventCard.tsx    # Event display card
│   ├── FilterPanel.tsx  # Event filtering interface
│   ├── Header.tsx       # Navigation header
│   └── ...
├── contexts/            # React Context providers
│   ├── AppContext.tsx   # Application state management
│   └── ThemeContext.tsx # Dark mode theme management
├── data/               # Mock data and types
│   └── mockEvents.ts   # Sample event data
├── pages/              # Page components
│   ├── EventsPage.tsx  # Main events listing
│   ├── EventDetailPage.tsx # Individual event details
│   ├── CreateEventPage.tsx # Event creation form
│   └── MyEventsPage.tsx    # User's registered events
├── services/           # API services
│   └── eventService.ts # Event data operations
└── App.tsx            # Main application component
```

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library
- **Context API** - State management

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Main actions and links
- **Secondary**: Emerald (#10B981) - Success states and locations
- **Accent**: Orange (#F59E0B) - Highlights and hosts
- **Error**: Red (#EF4444) - Error states and cancellations
- **Warning**: Yellow (#F59E0B) - Warning states
- **Gray Scale**: Comprehensive gray palette for text and backgrounds

### Typography
- **Headings**: Bold, clear hierarchy
- **Body Text**: Readable with proper line spacing
- **Interactive Elements**: Medium weight for buttons and links

### Spacing
- **8px Grid System**: Consistent spacing throughout
- **Responsive Breakpoints**: Mobile (< 768px), Tablet (768-1024px), Desktop (> 1024px)

## 🔧 Key Features Implementation

### State Management
- **React Context** for global state
- **useReducer** for complex state logic
- **Local Storage** for theme persistence

### Performance Optimizations
- **Pagination** for large event lists
- **Debounced Search** to reduce API calls
- **Lazy Loading** for optimal bundle size
- **Memoized Components** where appropriate

### Accessibility
- **ARIA Labels** for screen readers
- **Keyboard Navigation** support
- **Focus Management** for modals
- **Color Contrast** compliance
- **Semantic HTML** structure

## 📱 Responsive Breakpoints

- **Mobile**: < 768px - Single column layout, touch-optimized
- **Tablet**: 768px - 1024px - Two-column grid, adapted navigation
- **Desktop**: > 1024px - Three-column grid, full feature set

## 🌙 Dark Mode Implementation

The application features a comprehensive dark mode with:
- **System Preference Detection** - Automatically detects user's system theme
- **Manual Toggle** - Theme toggle button in the header
- **Persistent Storage** - Remembers user's theme choice
- **Smooth Transitions** - Animated theme switching
- **Complete Coverage** - All components support dark mode

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## 🙏 Acknowledgments

- **Lucide React** for the beautiful icon set
- **Tailwind CSS** for the utility-first CSS framework
- **Unsplash** for the high-quality stock photos
- **React Team** for the amazing framework

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**