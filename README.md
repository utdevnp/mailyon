# 🎯 Email Template Builder

A complete email template builder that combines:
- **JSON Structure** (flexible component system)
- **MJML Integration** (cross-client compatible output) 
- **Visual Drag & Drop Builder** (intuitive interface)

## ✨ Features

### 🎨 **Visual Builder**
- **Drag & Drop Interface**: Intuitive component placement
- **Real-time Preview**: See changes as you build
- **Component Library**: Pre-built email components
- **Property Inspector**: Edit component properties

### 🧩 **Component Library**
- **Header**: Company logo, navigation, hero sections
- **Text Block**: Paragraphs, headings, rich text
- **Image**: Single images with responsive behavior
- **Button**: Call-to-action buttons
- **Divider**: Horizontal lines and spacers
- **Columns**: Multi-column layouts
- **Footer**: Contact info, social links, unsubscribe
- **Spacer**: Vertical spacing elements

### 💾 **Template Management**
- **Save/Load**: Local storage for templates
- **Undo/Redo**: Full history management
- **Export Options**: JSON and MJML formats
- **Version Control**: Track template changes

### 🎯 **Cross-Client Compatibility**
- **MJML Integration**: Ensures email compatibility
- **Responsive Design**: Works on all devices
- **Email Client Support**: Gmail, Outlook, Apple Mail, etc.

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd email-template-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Development

### Project Structure
```
src/
├── components/           # React components
│   ├── Builder/         # Main drag & drop canvas
│   ├── ComponentLibrary/ # Available components sidebar
│   ├── Inspector/       # Component properties panel
│   └── Toolbar/         # Save, export, undo/redo
├── store/               # State management (Zustand)
├── types/               # TypeScript interfaces
└── index.css            # Tailwind CSS styles
```

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run build:package` - Build package for distribution
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Technology Stack

- **Frontend**: React 18 + TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Drag & Drop**: React DnD
- **Build Tool**: Create React App

## 📱 Usage

### Building a Template

1. **Drag Components**: From the left sidebar to the canvas
2. **Select Components**: Click on any component to select it
3. **Edit Properties**: Use the right sidebar inspector
4. **Reorder Components**: Use the up/down arrows
5. **Save Template**: Click the Save button in the toolbar

### Component Properties

Each component type has specific properties:

- **Header**: Logo URL, title, subtitle, colors
- **Text**: Content, font size, alignment, color
- **Image**: Source URL, alt text, dimensions, alignment
- **Button**: Text, URL, colors, styling
- **Footer**: Company info, social links, unsubscribe

### Export Options

- **JSON Export**: Raw template data structure
- **MJML Export**: Email-ready markup (coming soon)

## 🔧 Configuration

### Tailwind CSS
Custom colors and components are defined in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      }
    }
  }
}
```

### Component Types
Add new component types in `src/types/index.ts`:

```typescript
export type ComponentType = 
  | 'header'
  | 'text'
  | 'image'
  | 'button'
  | 'divider'
  | 'columns'
  | 'footer'
  | 'spacer'
  | 'your-new-component'; // Add here
```

## 📦 Building for Production

### Create Package
```bash
npm run build:package
```

This creates a distributable package in the `dist/` folder.

### Deploy
```bash
npm run build
```

The production build is created in the `build/` folder.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Issues**: Create an issue on GitHub
- **Documentation**: Check the README and code comments
- **Community**: Join our discussions

## 🔮 Roadmap

- [ ] MJML Integration
- [ ] Template Gallery
- [ ] Advanced Styling Options
- [ ] Component Nesting
- [ ] Real-time Collaboration
- [ ] Email Preview Testing
- [ ] Template Analytics
- [ ] API Integration

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
# mailyon
