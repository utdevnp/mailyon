# React Hooks

Mailyon provides three powerful React hooks that give you complete programmatic control over the email template builder. Use these hooks to integrate the builder into your application and control it from your own code.

## useEmailTemplateBuilder

The main hook for controlling the template builder.

### What You Get
- **Template state** - Current template and selected component
- **Component actions** - Add, update, delete, and reorder components
- **History management** - Undo and redo functionality

### Basic Usage
```tsx
import { useEmailTemplateBuilder } from 'mailyon';

function MyComponent() {
  const { 
    template, 
    selectedComponent, 
    addComponent, 
    updateComponent,
    deleteComponent 
  } = useEmailTemplateBuilder();

  return (
    <div>
      <p>Components: {template.components.length}</p>
      <p>Selected: {selectedComponent?.type || 'None'}</p>
    </div>
  );
}
```

### Adding Components Programmatically
```tsx
function AddComponentButton() {
  const { addComponent } = useEmailTemplateBuilder();

  const addHeader = () => {
    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'header',
      props: {
        title: 'My Company',
        subtitle: 'Professional Solutions',
        backgroundColor: '#3b82f6',
        textColor: '#ffffff'
      },
      children: [],
      style: {}
    });
  };

  return (
    <button onClick={addHeader}>
      Add Header
    </button>
  );
}
```

### Updating Component Properties
```tsx
function ComponentEditor() {
  const { selectedComponent, updateComponent } = useEmailTemplateBuilder();

  const updateTitle = (newTitle) => {
    if (selectedComponent) {
      updateComponent(selectedComponent.id, {
        props: { ...selectedComponent.props, title: newTitle }
      });
    }
  };

  return (
    <div>
      {selectedComponent && (
        <input
          type="text"
          value={selectedComponent.props.title || ''}
          onChange={(e) => updateTitle(e.target.value)}
          placeholder="Component title"
        />
      )}
    </div>
  );
}
```

## useEmailExport

Export your templates in various formats.

### What You Get
- **Export functions** - Get HTML, JSON, or MJML
- **Download functions** - Download files directly
- **Template data** - Access to current template

### Basic Usage
```tsx
import { useEmailExport } from 'mailyon';

function ExportControls() {
  const { exportAsHTML, exportAsJSON, downloadHTML } = useEmailExport();

  const handleExport = () => {
    const html = exportAsHTML();
    console.log('Generated HTML:', html);
  };

  const handleDownload = () => {
    downloadHTML('my-template.html');
  };

  return (
    <div>
      <button onClick={handleExport}>Export HTML</button>
      <button onClick={handleDownload}>Download HTML</button>
    </div>
  );
}
```

### Sending to API
```tsx
function SaveToAPI() {
  const { exportAsHTML, template } = useEmailExport();

  const saveTemplate = async () => {
    const html = exportAsHTML();
    
    try {
      await fetch('/api/email-templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          html, 
          name: template.name,
          components: template.components 
        })
      });
      alert('Template saved successfully!');
    } catch (error) {
      console.error('Failed to save template:', error);
    }
  };

  return (
    <button onClick={saveTemplate}>
      Save Template
    </button>
  );
}
```

### Preview in Modal
```tsx
function PreviewModal() {
  const { exportAsHTML } = useEmailExport();
  const [showPreview, setShowPreview] = useState(false);
  const [previewHTML, setPreviewHTML] = useState('');

  const showPreview = () => {
    const html = exportAsHTML();
    setPreviewHTML(html);
    setShowPreview(true);
  };

  return (
    <div>
      <button onClick={showPreview}>Preview Email</button>
      
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl max-h-96 overflow-auto">
            <div dangerouslySetInnerHTML={{ __html: previewHTML }} />
            <button 
              onClick={() => setShowPreview(false)}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```

## useEmailTemplateManager

Manage template loading, saving, and validation.

### What You Get
- **Loading functions** - Load templates from JSON or objects
- **Creation functions** - Create new templates or clone existing ones
- **Validation** - Check template structure
- **Storage** - Save to localStorage

### Basic Usage
```tsx
import { useEmailTemplateManager } from 'mailyon';

function TemplateManager() {
  const { 
    loadTemplateFromJSON, 
    createNewTemplate, 
    validateTemplate,
    template 
  } = useEmailTemplateManager();

  return (
    <div>
      <p>Current Template: {template.name}</p>
      <button onClick={() => createNewTemplate('My New Template')}>
        New Template
      </button>
    </div>
  );
}
```

### Loading from File Upload
```tsx
function FileUploader() {
  const { loadTemplateFromJSON } = useEmailTemplateManager();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const jsonString = e.target.result;
        const success = loadTemplateFromJSON(jsonString);
        if (success) {
          alert('Template loaded successfully!');
        } else {
          alert('Failed to load template. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <input 
      type="file" 
      accept=".json" 
      onChange={handleFileUpload}
      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />
  );
}
```

### Template Validation
```tsx
function TemplateValidator() {
  const { validateTemplate, template } = useEmailTemplateManager();

  const validateCurrent = () => {
    const result = validateTemplate(template);
    
    if (result.isValid) {
      alert('Template is valid! ✅');
    } else {
      alert(`Template has errors:\n${result.errors.join('\n')}`);
    }
  };

  return (
    <button 
      onClick={validateCurrent}
      className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
    >
      Validate Template
    </button>
  );
}
```

## Combining Hooks

### Complete Email Builder
```tsx
function CompleteEmailBuilder() {
  const { template, addComponent, selectedComponent } = useEmailTemplateBuilder();
  const { exportAsHTML, downloadHTML } = useEmailExport();
  const { createNewTemplate, loadTemplateFromJSON } = useEmailTemplateManager();

  const handleSave = async () => {
    const html = exportAsHTML();
    // Save to your backend
    await fetch('/api/templates', {
      method: 'POST',
      body: JSON.stringify({ html, template })
    });
  };

  const handleExport = () => {
    downloadHTML(`${template.name || 'template'}.html`);
  };

  return (
    <div>
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Email Builder</h1>
          <div className="space-x-3">
            <button onClick={() => createNewTemplate()}>New</button>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleExport}>Export</button>
          </div>
        </div>
        <div className="text-sm text-gray-600 mt-2">
          Components: {template.components.length} | 
          Selected: {selectedComponent?.type || 'None'}
        </div>
      </div>
      
      <EmailTemplateBuilder />
    </div>
  );
}
```

## Best Practices

1. **Use hooks in components** - Hooks only work inside React components
2. **Handle errors** - Always wrap async operations in try-catch
3. **Validate templates** - Use validation before saving or exporting
4. **Provide feedback** - Show users when operations succeed or fail
5. **Test thoroughly** - Test all hook functions with different scenarios

## Next Steps

- **[Examples](Examples)** - See real-world hook implementations
- **[Integration](Integration)** - Learn advanced integration patterns
- **[Components](Components)** - Understand available email components