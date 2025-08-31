# 🪝 Hooks

The Email Template Builder provides **3 custom React hooks** that give you complete programmatic control over the email template building process.

## 📋 Hooks Overview

| Hook | Purpose | Key Functions |
|------|---------|---------------|
| **useEmailTemplateBuilder** | Main template building functionality | Add, update, delete, select components |
| **useEmailExport** | Template export and download | HTML, JSON, MJML export |
| **useEmailTemplateManager** | Template management operations | Load, save, validate templates |

## 🏗️ useEmailTemplateBuilder

**Purpose**: Main hook for template building functionality

**Import**:
```tsx
import { useEmailTemplateBuilder } from 'email-template-builder';
```

**Usage**:
```tsx
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

### **State Properties**

| Property | Type | Description |
|----------|------|-------------|
| `template` | `EmailTemplate` | Current template object |
| `selectedComponent` | `EmailComponent \| null` | Currently selected component |
| `isDragging` | `boolean` | Whether a component is being dragged |
| `history` | `EmailTemplate[]` | Template history for undo/redo |
| `historyIndex` | `number` | Current position in history |

### **Template Actions**

#### **addComponent(component, parentId?)**
Add a new component to the template.

```tsx
const { addComponent } = useEmailTemplateBuilder();

const handleAddHeader = () => {
  addComponent({
    id: Math.random().toString(36).substr(2, 9),
    type: 'header',
    props: {
      title: 'My Company',
      subtitle: 'Professional Solutions',
      backgroundColor: '#3b82f6',
      textColor: '#ffffff',
    },
    children: [],
    style: {},
  });
};
```

#### **updateComponent(id, updates)**
Update component properties.

```tsx
const { updateComponent } = useEmailTemplateBuilder();

const handleUpdateTitle = (newTitle: string) => {
  updateComponent(selectedComponent.id, {
    props: { ...selectedComponent.props, title: newTitle }
  });
};
```

#### **deleteComponent(id)**
Remove a component from the template.

```tsx
const { deleteComponent } = useEmailTemplateBuilder();

const handleDelete = () => {
  if (selectedComponent) {
    deleteComponent(selectedComponent.id);
  }
};
```

#### **selectComponent(component)**
Select a component for editing.

```tsx
const { selectComponent } = useEmailTemplateBuilder();

const handleSelect = (component) => {
  selectComponent(component);
};
```

#### **moveComponent(id, newIndex)**
Reorder components in the template.

```tsx
const { moveComponent } = useEmailTemplateBuilder();

const handleMoveUp = () => {
  if (selectedComponent) {
    const currentIndex = template.components.findIndex(c => c.id === selectedComponent.id);
    if (currentIndex > 0) {
      moveComponent(selectedComponent.id, currentIndex - 1);
    }
  }
};
```

#### **duplicateComponent(id)**
Create a copy of an existing component.

```tsx
const { duplicateComponent } = useEmailTemplateBuilder();

const handleDuplicate = () => {
  if (selectedComponent) {
    duplicateComponent(selectedComponent.id);
  }
};
```

### **History Management**

#### **undo()**
Revert to the previous template state.

```tsx
const { undo, historyIndex } = useEmailTemplateBuilder();

const handleUndo = () => {
  if (historyIndex > 0) {
    undo();
  }
};
```

#### **redo()**
Restore a previously undone template state.

```tsx
const { redo, historyIndex, history } = useEmailTemplateBuilder();

const handleRedo = () => {
  if (historyIndex < history.length - 1) {
    redo();
  }
};
```

## 📤 useEmailExport

**Purpose**: Export templates in various formats and download files

**Import**:
```tsx
import { useEmailExport } from 'email-template-builder';
```

**Usage**:
```tsx
function ExportControls() {
  const { 
    exportAsJSON, 
    exportAsHTML, 
    exportAsMJML,
    downloadJSON,
    downloadHTML,
    downloadMJML 
  } = useEmailExport();
  
  // Use the functions...
}
```

### **Export Functions**

#### **exportAsJSON()**
Get template as JSON string.

```tsx
const { exportAsJSON } = useEmailExport();

const handleExport = () => {
  const json = exportAsJSON();
  console.log('Template JSON:', json);
  // Send to API, save to database, etc.
};
```

#### **exportAsHTML()**
Get template as HTML string.

```tsx
const { exportAsHTML } = useEmailExport();

const handleExport = () => {
  const html = exportAsHTML();
  console.log('Generated HTML:', html);
  // Preview in modal, send to email service, etc.
};
```

#### **exportAsMJML()**
Get template as MJML string.

```tsx
const { exportAsMJML } = useEmailExport();

const handleExport = () => {
  const mjml = exportAsMJML();
  console.log('Generated MJML:', mjml);
  // Send to MJML service, convert to HTML, etc.
};
```

### **Download Functions**

#### **downloadJSON(filename)**
Download template as JSON file.

```tsx
const { downloadJSON } = useEmailExport();

const handleDownload = () => {
  downloadJSON('my-template.json');
};
```

#### **downloadHTML(filename)**
Download template as HTML file.

```tsx
const { downloadHTML } = useEmailExport();

const handleDownload = () => {
  downloadHTML('my-template.html');
};
```

#### **downloadMJML(filename)**
Download template as MJML file.

```tsx
const { downloadMJML } = useEmailExport();

const handleDownload = () => {
  downloadMJML('my-template.mjml');
};
```

## 🗂️ useEmailTemplateManager

**Purpose**: Manage template loading, saving, and validation

**Import**:
```tsx
import { useEmailTemplateManager } from 'email-template-builder';
```

**Usage**:
```tsx
function TemplateManager() {
  const { 
    loadTemplateFromJSON, 
    createNewTemplate, 
    cloneTemplate,
    resetTemplate,
    validateTemplate 
  } = useEmailTemplateManager();
  
  // Use the functions...
}
```

### **Template Management Functions**

#### **loadTemplateFromJSON(jsonString)**
Load template from JSON string.

```tsx
const { loadTemplateFromJSON } = useEmailTemplateManager();

const handleLoad = (jsonString: string) => {
  const success = loadTemplateFromJSON(jsonString);
  if (success) {
    console.log('Template loaded successfully!');
  } else {
    console.error('Failed to load template');
  }
};
```

#### **loadTemplateFromObject(template)**
Load template from template object.

```tsx
const { loadTemplateFromObject } = useEmailTemplateManager();

const handleLoad = (templateObject: EmailTemplate) => {
  loadTemplateFromObject(templateObject);
};
```

#### **createNewTemplate(name?)**
Create a new empty template.

```tsx
const { createNewTemplate } = useEmailTemplateManager();

const handleNew = () => {
  createNewTemplate('My New Template');
};
```

#### **cloneTemplate(newName?)**
Clone the current template.

```tsx
const { cloneTemplate } = useEmailTemplateManager();

const handleClone = () => {
  cloneTemplate('Template Copy');
};
```

#### **resetTemplate()**
Reset template to default state.

```tsx
const { resetTemplate } = useEmailTemplateManager();

const handleReset = () => {
  if (confirm('Are you sure you want to reset the template?')) {
    resetTemplate();
  }
};
```

### **Utility Functions**

#### **validateTemplate(template)**
Validate template structure.

```tsx
const { validateTemplate } = useEmailTemplateManager();

const handleValidate = () => {
  const result = validateTemplate(template);
  
  if (result.isValid) {
    console.log('Template is valid!');
  } else {
    console.error('Validation errors:', result.errors);
  }
};
```

## 🔄 Hook Integration

### **Using Multiple Hooks Together**
```tsx
function EmailBuilder() {
  const { template, addComponent, selectedComponent } = useEmailTemplateBuilder();
  const { exportAsHTML, downloadHTML } = useEmailExport();
  const { loadTemplateFromJSON, createNewTemplate } = useEmailTemplateManager();
  
  const handleExportAndDownload = () => {
    const html = exportAsHTML();
    downloadHTML('email-template.html');
  };
  
  const handleLoadFromFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        loadTemplateFromJSON(e.target.result);
      };
      reader.readAsText(file);
    }
  };
  
  return (
    <div>
      <input type="file" accept=".json" onChange={handleLoadFromFile} />
      <button onClick={handleExportAndDownload}>Export & Download</button>
      <button onClick={() => createNewTemplate()}>New Template</button>
      
      <p>Components: {template.components.length}</p>
      <p>Selected: {selectedComponent?.type || 'None'}</p>
    </div>
  );
}
```

### **Hook Dependencies**
All hooks use the same Zustand store, so:
- **State is shared** between all hooks
- **Changes are reflected** in real-time across all hooks
- **No need for context providers** or prop drilling

## 🚨 Important Notes

- **Hook Order**: Hooks can be used in any order
- **Component Scope**: Hooks work in any React component
- **State Persistence**: State persists across component re-renders
- **Performance**: Hooks are optimized for performance

## 🔗 Next Steps

- **[Integration](Integration)** - See how to integrate hooks into your app
- **[Examples](Examples)** - View real-world hook usage examples
- **[API Reference](API-Reference)** - Complete hook function documentation

---

**Need help with hooks?** Check the [Issues](https://github.com/utdevnp/mailyon/issues) page.
