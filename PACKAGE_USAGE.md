# 📦 Email Template Builder - Package Usage Guide

This guide explains how to use the Email Template Builder as a package in your own React projects.

## 🚀 Installation

```bash
npm install email-template-builder
# or
yarn add email-template-builder
```

## 📋 Prerequisites

Make sure you have the required peer dependencies in your project:

```json
{
  "dependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  }
}
```

## 🎯 Basic Usage

### Option 1: Complete App (Recommended for most use cases)

```tsx
import React from 'react';
import { EmailTemplateBuilder } from 'email-template-builder';

function App() {
  return (
    <div>
      <h1>My Email App</h1>
      <EmailTemplateBuilder />
    </div>
  );
}
```

### Option 2: Individual Components (For custom layouts)

```tsx
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  Builder, 
  ComponentLibrary, 
  Inspector, 
  Toolbar 
} from 'email-template-builder';

function CustomEmailBuilder() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  Custom Email Builder
                </h1>
              </div>
              <Toolbar />
            </div>
          </div>
        </main>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Sidebar */}
            <div className="col-span-3">
              <ComponentLibrary />
            </div>

            {/* Center Canvas */}
            <div className="col-span-6">
              <Builder />
            </div>

            {/* Right Sidebar */}
            <div className="col-span-3">
              <Inspector />
            </div>
          </div>
        </main>
      </div>
    </DndProvider>
  );
}
```

## 🔧 Using the Store

The package provides a Zustand store that you can use to programmatically control the email builder:

```tsx
import React from 'react';
import { useBuilderStore } from 'email-template-builder';

function TemplateController() {
  const { 
    template, 
    addComponent, 
    updateComponent, 
    deleteComponent,
    exportJSON,
    loadTemplate 
  } = useBuilderStore();

  const addHeaderComponent = () => {
    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'header',
      props: {
        title: 'My Company',
        subtitle: 'Welcome!',
        backgroundColor: '#3b82f6',
        textColor: '#ffffff',
      },
      children: [],
      style: {},
    });
  };

  const exportTemplate = () => {
    const json = exportJSON();
    console.log('Template:', json);
    // Save to file or send to API
  };

  const loadCustomTemplate = () => {
    const customTemplate = {
      // ... your template data
    };
    loadTemplate(customTemplate);
  };

  return (
    <div>
      <button onClick={addHeaderComponent}>Add Header</button>
      <button onClick={exportTemplate}>Export</button>
      <button onClick={loadCustomTemplate}>Load Template</button>
      
      <div>
        <h3>Current Template: {template.name}</h3>
        <p>Components: {template.components.length}</p>
      </div>
    </div>
  );
}
```

## 🎨 Styling

The package uses Tailwind CSS. Make sure to include Tailwind in your project:

```bash
npm install tailwindcss
```

```css
/* In your CSS file */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 📱 Available Components

### Core Components

- **`EmailTemplateBuilder`** - Complete app with all features
- **`Builder`** - Main drag & drop canvas
- **`ComponentLibrary`** - Available components sidebar
- **`Inspector`** - Component properties panel
- **`Toolbar`** - Save, export, undo/redo actions
- **`ComponentRenderer`** - Renders individual components

### Component Types

- **Header** - Company logo, title, subtitle
- **Text** - Paragraphs, headings, rich text
- **Image** - Single images with responsive behavior
- **Button** - Call-to-action buttons
- **Divider** - Horizontal lines and spacers
- **Columns** - Multi-column layouts
- **Footer** - Contact info, social links
- **Spacer** - Vertical spacing elements

## 🔄 State Management

The store provides these main actions:

```tsx
const {
  // Template actions
  addComponent,
  updateComponent,
  deleteComponent,
  moveComponent,
  duplicateComponent,
  
  // Selection
  selectComponent,
  
  // History
  undo,
  redo,
  
  // Persistence
  saveTemplate,
  loadTemplate,
  
  // Export
  exportJSON,
  exportMJML,
} = useBuilderStore();
```

## 📊 Template Structure

Templates follow this structure:

```typescript
interface EmailTemplate {
  id: string;
  name: string;
  description?: string;
  components: EmailComponent[];
  metadata: {
    createdAt: string;
    updatedAt: string;
    version: string;
  };
  settings: {
    width: string;
    backgroundColor: string;
    fontFamily: string;
  };
}
```

## 🎯 Advanced Usage

### Custom Component Integration

```tsx
import React from 'react';
import { useBuilderStore } from 'email-template-builder';

function CustomIntegration() {
  const { template, updateComponent } = useBuilderStore();

  // Listen to template changes
  React.useEffect(() => {
    console.log('Template updated:', template);
  }, [template]);

  // Programmatically update template settings
  const updateTemplateWidth = (width: string) => {
    updateComponent(template.id, {
      settings: { ...template.settings, width }
    });
  };

  return (
    <div>
      <input
        type="text"
        value={template.settings.width}
        onChange={(e) => updateTemplateWidth(e.target.value)}
        placeholder="Template width"
      />
    </div>
  );
}
```

### Template Validation

```tsx
import React from 'react';
import { useBuilderStore } from 'email-template-builder';

function TemplateValidator() {
  const { template } = useBuilderStore();

  const validateTemplate = () => {
    const errors = [];
    
    if (template.components.length === 0) {
      errors.push('Template must have at least one component');
    }
    
    template.components.forEach((component, index) => {
      if (component.type === 'image' && !component.props.src) {
        errors.push(`Image component ${index + 1} is missing source URL`);
      }
      
      if (component.type === 'button' && !component.props.text) {
        errors.push(`Button component ${index + 1} is missing text`);
      }
    });
    
    return errors;
  };

  const errors = validateTemplate();

  return (
    <div>
      {errors.length > 0 ? (
        <div className="text-red-600">
          <h3>Validation Errors:</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-green-600">Template is valid!</div>
      )}
    </div>
  );
}
```

## 🚨 Error Handling

```tsx
import React from 'react';
import { useBuilderStore } from 'email-template-builder';

function ErrorBoundary() {
  const { template } = useBuilderStore();

  // Handle missing components gracefully
  if (!template || !template.components) {
    return <div>Loading template...</div>;
  }

  try {
    return (
      <div>
        {/* Your email builder components */}
      </div>
    );
  } catch (error) {
    console.error('Error rendering email builder:', error);
    return <div>Something went wrong. Please refresh the page.</div>;
  }
}
```

## 🔧 Configuration

### Customizing Default Props

```tsx
import React from 'react';
import { useBuilderStore } from 'email-template-builder';

function CustomDefaults() {
  const { addComponent } = useBuilderStore();

  const addCustomHeader = () => {
    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'header',
      props: {
        title: 'Default Company Name',
        subtitle: 'Default tagline',
        backgroundColor: '#1f2937', // Custom default color
        textColor: '#ffffff',
      },
      children: [],
      style: {},
    });
  };

  return (
    <button onClick={addCustomHeader}>
      Add Custom Header
    </button>
  );
}
```

## 📚 Examples

Check the `demo/usage-example.tsx` file for comprehensive examples of:

1. Complete app usage
2. Custom layout integration
3. Store manipulation
4. Programmatic template creation
5. Advanced customization

## 🆘 Troubleshooting

### Common Issues

1. **Drag & Drop not working**: Ensure `DndProvider` wraps your components
2. **Styling issues**: Make sure Tailwind CSS is properly configured
3. **Type errors**: Check that you're using the correct TypeScript versions

### Getting Help

- Check the main README.md for detailed documentation
- Review the demo examples
- Check the TypeScript types for component interfaces
- Ensure all peer dependencies are installed

## 🔮 Future Features

- MJML integration for email export
- Template gallery and sharing
- Advanced styling options
- Component nesting support
- Real-time collaboration
- Email preview testing

---

For more information, check the main project documentation and examples!
