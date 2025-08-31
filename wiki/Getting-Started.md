# 🚀 Getting Started

## 📋 Prerequisites

Before you begin, make sure you have:

- **Node.js** 16+ installed
- **npm** or **yarn** package manager
- **React** 16.8+ in your project (for hooks support)

## 📦 Installation

### **Install the Package**
```bash
npm install email-template-builder
```

### **Install Peer Dependencies**
The package requires these peer dependencies:
```bash
npm install react react-dom react-dnd react-dnd-html5-backend
```

## 🎯 Quick Start

### **1. Basic Integration**
```tsx
import { EmailTemplateBuilder } from 'email-template-builder';

function MyApp() {
  return (
    <div>
      <h1>My Email App</h1>
      <EmailTemplateBuilder />
    </div>
  );
}
```

### **2. Using Custom Hooks**
```tsx
import { useEmailTemplateBuilder, useEmailExport } from 'email-template-builder';

function MyComponent() {
  const { template, addComponent } = useEmailTemplateBuilder();
  const { exportAsHTML } = useEmailExport();
  
  const handleExport = () => {
    const html = exportAsHTML();
    console.log('Generated HTML:', html);
  };
  
  return (
    <div>
      <p>Components: {template.components.length}</p>
      <button onClick={handleExport}>Export HTML</button>
    </div>
  );
}
```

## 🔧 Setup Requirements

### **Tailwind CSS**
The package uses Tailwind CSS for styling. Make sure you have Tailwind configured in your project:

```bash
npm install tailwindcss
```

```css
/* In your CSS file */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### **TypeScript (Recommended)**
For the best development experience, use TypeScript:

```bash
npm install --save-dev typescript @types/react @types/react-dom
```

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🚨 Common Issues

### **Drag & Drop Not Working**
Make sure you have the required dependencies:
```bash
npm install react-dnd react-dnd-html5-backend
```

### **Styling Issues**
Ensure Tailwind CSS is properly configured and imported.

### **TypeScript Errors**
Make sure you're using compatible versions of React and TypeScript.

## 🔗 Next Steps

- **[Components](Components)** - Learn about available email components
- **[Hooks](Hooks)** - Understand custom React hooks
- **[Integration](Integration)** - See integration examples
- **[Examples](Examples)** - View real-world usage examples

---

**Need help?** Check the [Issues](https://github.com/utdevnp/mailyon/issues) page or create a new one.
