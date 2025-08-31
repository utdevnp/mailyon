# 🎯 Email Template Builder

A **complete, professional email template builder** built with React, TypeScript, and modern web technologies. Features a headerless design for seamless integration into your applications.

## ✨ **Features**

### 🎨 **Visual Builder Interface**
- **Drag & Drop Canvas**: Intuitive component placement with visual feedback
- **Component Library**: 8 pre-built email components with full customization
- **Property Inspector**: Real-time editing of component properties
- **Real-time Preview**: See changes as you build
- **Responsive Design**: Works on all device sizes

### 🧩 **Component Library**
- **Header**: Logo, title, subtitle with customizable colors and visibility
- **Text Block**: Rich text with font size, alignment, color, and line height
- **Image**: Responsive images with alignment, border radius, and sizing
- **Button**: Call-to-action buttons with custom styling and URLs
- **Divider**: Horizontal lines and spacers with color and margin control
- **Footer**: Company info, social links, unsubscribe with alignment options
- **Spacer**: Vertical spacing elements with customizable height
- **Social Media**: Social platform icons with alignment and spacing options

**Note**: These are pre-built, fully functional components. Custom component types are not currently supported.

### 💾 **Template Management**
- **Local Storage**: Automatic template saving
- **History Management**: Full undo/redo functionality
- **JSON Export**: Raw template data structure
- **Template Loading**: Programmatic template creation and loading
- **Version Control**: Track creation and update timestamps

### 🔧 **Technical Features**
- **TypeScript**: Full type safety and IntelliSense
- **State Management**: Zustand store for efficient state handling
- **Drag & Drop**: React DnD for smooth interactions
- **Responsive UI**: Tailwind CSS for modern, responsive design
- **Component Architecture**: Modular, reusable components

## 🚀 **Quick Start**

### **Installation**
```bash
npm install email-template-builder
```

### **Basic Usage**
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

## 🪝 **Custom React Hooks**

### **1. useEmailTemplateBuilder()**
Main hook for template building functionality:

```tsx
import { useEmailTemplateBuilder } from 'email-template-builder';

function MyComponent() {
  const { 
    template, 
    selectedComponent, 
    addComponent, 
    updateComponent,
    deleteComponent,
    selectComponent,
    undo,
    redo 
  } = useEmailTemplateBuilder();
  
  // Use the functions...
}
```

**Available Functions:**
- `addComponent(component, parentId?)` - Add new component
- `updateComponent(id, updates)` - Update component properties
- `deleteComponent(id)` - Remove component
- `selectComponent(component)` - Select component for editing
- `moveComponent(id, newIndex)` - Reorder components
- `duplicateComponent(id)` - Clone component
- `undo()` / `redo()` - History management

### **2. useEmailExport()**
Export templates in various formats:

```tsx
import { useEmailExport } from 'email-template-builder';

function ExportControls() {
  const { 
    exportAsJSON, 
    exportAsHTML, 
    exportAsMJML,
    downloadJSON,
    downloadHTML,
    downloadMJML 
  } = useEmailExport();
  
  const handleExport = () => {
    const html = exportAsHTML();
    console.log('Generated HTML:', html);
    downloadHTML('my-template.html');
  };
  
  return <button onClick={handleExport}>Export HTML</button>;
}
```

**Available Functions:**
- `exportAsJSON()` - Get template as JSON string
- `exportAsHTML()` - Get template as HTML string
- `exportAsMJML()` - Get template as MJML string
- `downloadJSON(filename)` - Download JSON file
- `downloadHTML(filename)` - Download HTML file
- `downloadMJML(filename)` - Download MJML file

### **3. useEmailTemplateManager()**
Manage template loading, saving, and validation:

```tsx
import { useEmailTemplateManager } from 'email-template-builder';

function TemplateManager() {
  const { 
    loadTemplateFromJSON, 
    createNewTemplate, 
    cloneTemplate,
    resetTemplate,
    validateTemplate 
  } = useEmailTemplateManager();
  
  const handleLoadTemplate = (jsonString: string) => {
    const success = loadTemplateFromJSON(jsonString);
    if (success) {
      console.log('Template loaded successfully!');
    }
  };
  
  return <button onClick={() => createNewTemplate()}>New Template</button>;
}
```

**Available Functions:**
- `loadTemplateFromJSON(jsonString)` - Load from JSON string
- `loadTemplateFromObject(template)` - Load from template object
- `createNewTemplate(name?)` - Create empty template
- `cloneTemplate(newName?)` - Clone current template
- `resetTemplate()` - Reset to default
- `validateTemplate(template)` - Validate template structure

## 🧩 **Individual Components**

Build your own custom layout:

```tsx
import { 
  Builder, 
  ComponentLibrary, 
  Inspector, 
  Toolbar 
} from 'email-template-builder';

function CustomLayout() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-3">
        <ComponentLibrary />
      </div>
      <div className="col-span-6">
        <Builder />
      </div>
      <div className="col-span-3">
        <Inspector />
      </div>
    </div>
  );
}
```

## 📤 **Export Examples**

### **Export to API**
```tsx
const { exportAsHTML } = useEmailExport();

const sendToAPI = async () => {
  const html = exportAsHTML();
  
  try {
    await fetch('/api/email-templates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html, template: template })
    });
  } catch (error) {
    console.error('Failed to send template:', error);
  }
};
```

### **Save to Database**
```tsx
const { exportAsJSON } = useEmailExport();

const saveToDatabase = async () => {
  const json = exportAsJSON();
  
  try {
    await db.emailTemplates.create({
      name: template.name,
      data: json,
      createdAt: new Date()
    });
  } catch (error) {
    console.error('Failed to save template:', error);
  }
};
```

### **Preview in Modal**
```tsx
const { exportAsHTML } = useEmailExport();
const [showPreview, setShowPreview] = useState(false);
const [previewHTML, setPreviewHTML] = useState('');

const showPreviewModal = () => {
  const html = exportAsHTML();
  setPreviewHTML(html);
  setShowPreview(true);
};

// In your JSX:
{showPreview && (
  <div className="modal">
    <div dangerouslySetInnerHTML={{ __html: previewHTML }} />
  </div>
)}
```

## 🔄 **Template Loading Examples**

### **Load from File Upload**
```tsx
const { loadTemplateFromJSON } = useEmailTemplateManager();

const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const jsonString = e.target?.result as string;
      loadTemplateFromJSON(jsonString);
    };
    reader.readAsText(file);
  }
};

return <input type="file" accept=".json" onChange={handleFileUpload} />;
```

### **Load from URL**
```tsx
const { loadTemplateFromJSON } = useEmailTemplateManager();

const loadFromURL = async (url: string) => {
  try {
    const response = await fetch(url);
    const jsonString = await response.text();
    loadTemplateFromJSON(jsonString);
  } catch (error) {
    console.error('Failed to load template from URL:', error);
  }
};
```

### **Load from Local Storage**
```tsx
const { loadTemplateFromStorage } = useEmailTemplateManager();

// Load automatically on component mount
useEffect(() => {
  loadTemplateFromStorage('myEmailTemplates');
}, []);
```

## 🎨 **Customization Examples**

### **Custom Styling**
```tsx
<EmailTemplateBuilder 
  className="my-custom-builder"
  style={{ 
    backgroundColor: '#f8f9fa',
    borderRadius: '12px'
  }}
/>
```

### **Custom Header Integration**
```tsx
function MyApp() {
  const [showBuilder, setShowBuilder] = useState(false);
  
  return (
    <div>
      <header className="my-custom-header">
        <h1>My Company Email Builder</h1>
        <button onClick={() => setShowBuilder(!showBuilder)}>
          {showBuilder ? 'Hide' : 'Show'} Builder
        </button>
      </header>
      
      {showBuilder && <EmailTemplateBuilder />}
    </div>
  );
}
```

### **Conditional Rendering**
```tsx
function ConditionalBuilder() {
  const { template } = useEmailTemplateBuilder();
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div>
      {isEditing ? (
        <EmailTemplateBuilder />
      ) : (
        <div>
          <h2>Template Preview</h2>
          <p>Components: {template.components.length}</p>
          <button onClick={() => setIsEditing(true)}>Edit Template</button>
        </div>
      )}
    </div>
  );
}
```

## 🚨 **Important Notes**

### **JSON Loading**
- **YES, it works directly!** ✅
- Use `loadTemplateFromJSON(jsonString)` to load templates
- Templates are immediately available in the builder
- All component properties and settings are preserved

### **State Management**
- All hooks use the same Zustand store
- State is shared between components
- Changes are reflected in real-time across all hooks

### **Error Handling**
- Export functions include error handling
- Template validation provides detailed error messages
- Failed operations return appropriate error states

## 🔧 **Advanced Usage**

### **Available Component Types**
Currently, the email template builder supports these **8 pre-built components**:

```typescript
export type ComponentType = 
  | 'header'      // Logo, title, subtitle
  | 'text'        // Rich text content
  | 'image'       // Responsive images
  | 'button'      // Call-to-action buttons
  | 'divider'     // Horizontal lines
  | 'footer'      // Company info, social links
  | 'spacer'      // Vertical spacing
  | 'socialMedia' // Social platform icons
```

**Note**: Custom component types are not currently supported. All components are pre-built with specific properties and rendering logic.

### **Template Validation**
```tsx
const { validateTemplate } = useEmailTemplateManager();

const validateCurrentTemplate = () => {
  const result = validateTemplate(template);
  
  if (result.isValid) {
    console.log('Template is valid!');
  } else {
    console.error('Template validation errors:', result.errors);
  }
};
```

## 🏗️ **Project Structure**

```
src/
├── components/           # React components
│   ├── Builder/         # Main drag & drop canvas
│   ├── ComponentLibrary/ # Available components sidebar
│   ├── Inspector/       # Component properties panel
│   └── Toolbar/         # Save, export, undo/redo
├── hooks/               # Custom React hooks
│   ├── useEmailTemplateBuilder.ts
│   ├── useEmailExport.ts
│   └── useEmailTemplateManager.ts
├── store/               # State management (Zustand)
├── types/               # TypeScript interfaces
└── utils/               # MJML export utilities
```

## 🚀 **Development**

### **Prerequisites**
- Node.js 16+ 
- npm or yarn

### **Installation**
```bash
git clone <repository-url>
cd email-template-builder
npm install
```

### **Start Development Server**
```bash
npm start
```

### **Build for Production**
```bash
npm run build
```

### **Build Package**
```bash
npm run build:package
```

## 🎯 **Use Cases**

This builder is perfect for:
- **Email Marketing**: Campaign templates
- **Newsletters**: Corporate communications
- **Marketing Automation**: Automated email sequences
- **Design Teams**: Visual email creation
- **Content Creators**: Professional email templates

## 🎉 **Benefits**

1. **No Branding Conflicts** - Integrate seamlessly into your app
2. **Flexible Layout** - Build your own UI around the components
3. **Professional Look** - Looks like a proper component library
4. **Easy Integration** - Simple hooks for all functionality
5. **Customizable** - Adapt to your design system
6. **Headerless Design** - Perfect for package distribution

## 📦 **Package Exports**

```typescript
// Main component (headerless)
export { default as EmailTemplateBuilder } from './components/EmailTemplateBuilder';

// Custom hooks
export { useEmailTemplateBuilder } from './hooks/useEmailTemplateBuilder';
export { useEmailExport } from './hooks/useEmailExport';
export { useEmailTemplateManager } from './hooks/useEmailTemplateManager';

// Individual components
export { Builder, ComponentLibrary, Inspector, Toolbar } from './components';

// Utility functions
export { exportEmailTemplate, generateMJML, convertMJMLToHTML } from './utils/mjmlExport';
```

---

**Ready to build professional email templates without the generic header!** 🚀

Built with ❤️ using React, TypeScript, and Tailwind CSS
