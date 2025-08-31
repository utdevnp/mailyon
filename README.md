# 🎯 Mailyon - Email Template Builder

A professional, headerless email template builder built with React, TypeScript, and modern web technologies. Create beautiful email templates without the generic header - perfect for seamless integration into your applications.

## ✨ Features

- **Headerless Design** - Seamless integration into your app
- **8 Pre-built Components** - All fully functional and customizable
- **Custom React Hooks** - Easy access to all functionality
- **Real-time Preview** - See changes as you build
- **Export Options** - HTML, JSON, and MJML formats
- **Template Management** - Save, load, and validate templates
- **Cross-client Compatibility** - Works with all major email clients

## 🚀 Quick Start

### Installation
```bash
npm install mailyon
```

### Basic Usage
```tsx
import { EmailTemplateBuilder } from 'mailyon';

function MyApp() {
  return (
    <div>
      <h1>My Email App</h1>
      <EmailTemplateBuilder />
    </div>
  );
}
```

## Get Started Right Now

> **[Try the Live Demo](https://utdevnp.github.io/mailyon/)** - See it in action!
> **[Read the Full Documentation](https://github.com/utdevnp/mailyon/wiki)** - Everything you need to know

## Quick Links

> **[Live Demo](https://utdevnp.github.io/mailyon/)** - Try it out now!
> **[Documentation](https://github.com/utdevnp/mailyon/wiki)** - Complete guide & examples

- **[GitHub Repository](https://github.com/utdevnp/mailyon)** - Source code
- **[NPM Package](https://www.npmjs.com/package/mailyon)** - Install

## 🧩 Available Components

| Component | Type | Description |
|-----------|------|-------------|
| **Header** | `header` | Company branding and navigation |
| **Text** | `text` | Rich text content with formatting |
| **Image** | `image` | Responsive images with alignment |
| **Button** | `button` | Call-to-action buttons |
| **Divider** | `divider` | Horizontal lines and separators |
| **Footer** | `footer` | Company info and social links |
| **Spacer** | `spacer` | Vertical spacing elements |
| **Social Media** | `socialMedia` | Social platform icons and links |

**Note**: These are pre-built, fully functional components. Custom component types are not currently supported.

## 🪝 Custom React Hooks

### useEmailTemplateBuilder
Main hook for template building functionality:
```tsx
const { template, addComponent, updateComponent, deleteComponent } = useEmailTemplateBuilder();
```

### useEmailExport
Export templates in various formats:
```tsx
const { exportAsHTML, exportAsJSON, exportAsMJML } = useEmailExport();
```

### useEmailTemplateManager
Manage template loading, saving, and validation:
```tsx
const { loadTemplateFromJSON, createNewTemplate, validateTemplate } = useEmailTemplateManager();
```

## 📦 Package Exports

```tsx
// Main component
import { EmailTemplateBuilder } from 'mailyon';

// Custom hooks
import { useEmailTemplateBuilder, useEmailExport, useEmailTemplateManager } from 'mailyon';

// Utility functions
import { exportEmailTemplate, generateMJML, convertMJMLToHTML } from 'mailyon';
```

## 🔧 Requirements

- **React** 16.8+ (for hooks support)
- **Node.js** 16+
- **Tailwind CSS** (for styling)

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see [LICENSE](https://github.com/utdevnp/mailyon/blob/main/LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/utdevnp/mailyon/issues)
- **Documentation**: [Wiki](https://github.com/utdevnp/mailyon/wiki)
- **Live Demo**: [Try it out](https://utdevnp.github.io/mailyon/)

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

**Mailyon** - Professional email templates without the generic header!
