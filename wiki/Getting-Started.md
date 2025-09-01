# Getting Started

Get up and running with Mailyon in minutes. This guide will help you integrate the email template builder into your React application.

## Prerequisites

- **React 16.8+** (for hooks support)
- **Node.js 16+**
- **Tailwind CSS** (for styling)

## Installation

### 1. Install Mailyon
```bash
npm install mailyon
```

### 2. Install Peer Dependencies
```bash
npm install react-dnd react-dnd-html5-backend
```

### 3. Setup Tailwind CSS
```bash
npm install tailwindcss
```

Add to your CSS file:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Basic Integration

### Simple Integration
```tsx
import { EmailTemplateBuilder } from 'mailyon';

function MyEmailApp() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">My Email Platform</h1>
        </div>
      </header>
      
      <EmailTemplateBuilder />
    </div>
  );
}
```

### With Custom Controls
```tsx
import { EmailTemplateBuilder, useEmailExport } from 'mailyon';

function EmailBuilderWithControls() {
  const { exportAsHTML, downloadHTML } = useEmailExport();

  const handleExport = () => {
    const html = exportAsHTML();
    console.log('Generated HTML:', html);
  };

  const handleDownload = () => {
    downloadHTML('my-email-template.html');
  };

  return (
    <div>
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Email Builder</h1>
          <div className="space-x-3">
            <button 
              onClick={handleExport}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Export HTML
            </button>
            <button 
              onClick={handleDownload}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Download
            </button>
          </div>
        </div>
      </div>
      
      <EmailTemplateBuilder />
    </div>
  );
}
```

## Common Use Cases

### Email Marketing Platform
```tsx
function MarketingPlatform() {
  const [campaigns, setCampaigns] = useState([]);
  const { exportAsHTML } = useEmailExport();

  const saveCampaign = async () => {
    const html = exportAsHTML();
    // Save to your backend
    await fetch('/api/campaigns', {
      method: 'POST',
      body: JSON.stringify({ html, name: 'New Campaign' })
    });
  };

  return (
    <div>
      <EmailTemplateBuilder />
      <button onClick={saveCampaign}>Save Campaign</button>
    </div>
  );
}
```

### Newsletter Builder
```tsx
function NewsletterBuilder() {
  const { template, createNewTemplate } = useEmailTemplateManager();

  const startNewsletter = () => {
    createNewTemplate('Weekly Newsletter');
  };

  return (
    <div>
      <div className="p-4 bg-white border-b">
        <button 
          onClick={startNewsletter}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          New Newsletter
        </button>
      </div>
      <EmailTemplateBuilder />
    </div>
  );
}
```

## Styling & Customization

### Custom Styling
```tsx
<EmailTemplateBuilder 
  className="my-custom-builder"
  style={{ 
    backgroundColor: '#f8f9fa',
    borderRadius: '12px'
  }}
/>
```

### Conditional Rendering
```tsx
function ConditionalBuilder() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <EmailTemplateBuilder />
      ) : (
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Email Templates</h2>
          <button 
            onClick={() => setIsEditing(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg"
          >
            Create New Template
          </button>
        </div>
      )}
    </div>
  );
}
```

## Next Steps

- **[Components](Components)** - Learn about available email components
- **[Hooks](Hooks)** - Understand programmatic control
- **[Examples](Examples)** - See real-world implementations

## Troubleshooting

### Drag & Drop Not Working
Make sure you have the required dependencies:
```bash
npm install react-dnd react-dnd-html5-backend
```

### Styling Issues
Ensure Tailwind CSS is properly configured and imported in your project.

### TypeScript Errors
Make sure you're using compatible versions of React and TypeScript.

## Need Help?

- **[GitHub Issues](https://github.com/utdevnp/mailyon/issues)** - Report bugs or ask questions
- **[Live Demo](https://utdevnp.github.io/mailyon/)** - See it in action