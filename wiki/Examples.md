# Real-World Examples

See how Mailyon is used in real applications. These examples show practical implementations for common email marketing scenarios.

## Email Marketing Platform

A complete email marketing platform with campaign management.

```tsx
import { EmailTemplateBuilder, useEmailTemplateBuilder, useEmailExport } from 'mailyon';

function EmailMarketingPlatform() {
  const [campaigns, setCampaigns] = useState([]);
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const { template, addComponent } = useEmailTemplateBuilder();
  const { exportAsHTML } = useEmailExport();

  const saveCampaign = async () => {
    const html = exportAsHTML();
    const campaign = {
      id: Date.now(),
      name: template.name || 'Untitled Campaign',
      html,
      template: template,
      createdAt: new Date().toISOString(),
      status: 'draft'
    };

    try {
      await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaign)
      });
      
      setCampaigns([...campaigns, campaign]);
      alert('Campaign saved successfully!');
    } catch (error) {
      console.error('Failed to save campaign:', error);
    }
  };

  const loadCampaign = (campaign) => {
    setCurrentCampaign(campaign);
    // Load template into builder
    loadTemplateFromObject(campaign.template);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Campaign List Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Campaigns</h2>
          <button 
            onClick={() => setCurrentCampaign(null)}
            className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded"
          >
            New Campaign
          </button>
        </div>
        
        <div className="p-4">
          {campaigns.map(campaign => (
            <div 
              key={campaign.id}
              onClick={() => loadCampaign(campaign)}
              className="p-3 border rounded cursor-pointer hover:bg-gray-50 mb-2"
            >
              <h3 className="font-medium">{campaign.name}</h3>
              <p className="text-sm text-gray-500">
                {new Date(campaign.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        <div className="bg-white shadow-sm border-b p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">
              {currentCampaign ? currentCampaign.name : 'New Campaign'}
            </h1>
            <div className="space-x-3">
              <button 
                onClick={saveCampaign}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save Campaign
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Send Test
              </button>
            </div>
          </div>
        </div>
        
        <EmailTemplateBuilder />
      </div>
    </div>
  );
}
```

## Newsletter Builder

A newsletter creation tool with template management.

```tsx
function NewsletterBuilder() {
  const [newsletters, setNewsletters] = useState([]);
  const { template, createNewTemplate } = useEmailTemplateBuilder();
  const { exportAsHTML, downloadHTML } = useEmailExport();

  const createNewsletter = () => {
    createNewTemplate('Weekly Newsletter');
    
    // Add newsletter components automatically
    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'header',
      props: {
        title: 'Weekly Newsletter',
        subtitle: 'Stay updated with our latest news',
        backgroundColor: '#1f2937',
        textColor: '#ffffff'
      },
      children: [],
      style: {}
    });

    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'text',
      props: {
        content: 'Welcome to our weekly newsletter! Here\'s what\'s new this week.',
        fontSize: '18px',
        textAlign: 'center',
        color: '#374151'
      },
      children: [],
      style: {}
    });
  };

  const sendNewsletter = async () => {
    const html = exportAsHTML();
    
    try {
      await fetch('/api/newsletters/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          html, 
          subject: template.name,
          recipients: 'all_subscribers'
        })
      });
      alert('Newsletter sent successfully!');
    } catch (error) {
      console.error('Failed to send newsletter:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Newsletter Builder</h1>
          <div className="space-x-3">
            <button 
              onClick={createNewsletter}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              New Newsletter
            </button>
            <button 
              onClick={() => downloadHTML('newsletter.html')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Download
            </button>
            <button 
              onClick={sendNewsletter}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Send Newsletter
            </button>
          </div>
        </div>
      </div>
      
      <EmailTemplateBuilder />
    </div>
  );
}
```

## E-commerce Transactional Emails

Order confirmation and receipt emails.

```tsx
function OrderConfirmationBuilder() {
  const { template, addComponent } = useEmailTemplateBuilder();
  const { exportAsHTML } = useEmailExport();

  const createOrderConfirmation = (orderData) => {
    // Clear existing components
    template.components = [];

    // Add order confirmation components
    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'header',
      props: {
        title: 'Order Confirmation',
        subtitle: `Order #${orderData.orderNumber}`,
        backgroundColor: '#059669',
        textColor: '#ffffff'
      },
      children: [],
      style: {}
    });

    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'text',
      props: {
        content: `Thank you for your order, ${orderData.customerName}! Your order has been confirmed and will be processed shortly.`,
        fontSize: '16px',
        textAlign: 'left',
        color: '#374151'
      },
      children: [],
      style: {}
    });

    // Add order details
    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'text',
      props: {
        content: `
          <h3>Order Details:</h3>
          <p><strong>Order Number:</strong> ${orderData.orderNumber}</p>
          <p><strong>Total:</strong> $${orderData.total}</p>
          <p><strong>Shipping Address:</strong> ${orderData.shippingAddress}</p>
        `,
        fontSize: '14px',
        textAlign: 'left',
        color: '#374151'
      },
      children: [],
      style: {}
    });

    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'button',
      props: {
        text: 'Track Your Order',
        url: `${orderData.trackingUrl}`,
        backgroundColor: '#3b82f6',
        textColor: '#ffffff'
      },
      children: [],
      style: {}
    });
  };

  const sendOrderConfirmation = async (orderData) => {
    createOrderConfirmation(orderData);
    const html = exportAsHTML();
    
    try {
      await fetch('/api/emails/send-order-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          html, 
          to: orderData.customerEmail,
          subject: `Order Confirmation #${orderData.orderNumber}`
        })
      });
    } catch (error) {
      console.error('Failed to send order confirmation:', error);
    }
  };

  return (
    <div>
      <div className="bg-white shadow-sm border-b p-4">
        <h1 className="text-xl font-semibold">Order Confirmation Builder</h1>
        <button 
          onClick={() => createOrderConfirmation({
            orderNumber: '12345',
            customerName: 'John Doe',
            total: '99.99',
            shippingAddress: '123 Main St, City, State 12345',
            trackingUrl: 'https://tracking.example.com/12345'
          })}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
        >
          Generate Sample Order
        </button>
      </div>
      
      <EmailTemplateBuilder />
    </div>
  );
}
```

## Event Invitation System

Create and send event invitations.

```tsx
function EventInvitationBuilder() {
  const { template, addComponent } = useEmailTemplateBuilder();
  const { exportAsHTML } = useEmailExport();

  const createEventInvitation = (eventData) => {
    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'header',
      props: {
        title: eventData.eventName,
        subtitle: 'You\'re Invited!',
        backgroundColor: '#7c3aed',
        textColor: '#ffffff'
      },
      children: [],
      style: {}
    });

    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'image',
      props: {
        src: eventData.eventImage,
        alt: eventData.eventName,
        width: '600px',
        height: '300px',
        align: 'center'
      },
      children: [],
      style: {}
    });

    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'text',
      props: {
        content: `
          <h2>${eventData.eventName}</h2>
          <p><strong>Date:</strong> ${eventData.date}</p>
          <p><strong>Time:</strong> ${eventData.time}</p>
          <p><strong>Location:</strong> ${eventData.location}</p>
          <p>${eventData.description}</p>
        `,
        fontSize: '16px',
        textAlign: 'center',
        color: '#374151'
      },
      children: [],
      style: {}
    });

    addComponent({
      id: Math.random().toString(36).substr(2, 9),
      type: 'button',
      props: {
        text: 'RSVP Now',
        url: eventData.rsvpUrl,
        backgroundColor: '#dc2626',
        textColor: '#ffffff'
      },
      children: [],
      style: {}
    });
  };

  return (
    <div>
      <div className="bg-white shadow-sm border-b p-4">
        <h1 className="text-xl font-semibold">Event Invitation Builder</h1>
        <button 
          onClick={() => createEventInvitation({
            eventName: 'Annual Company Meeting',
            eventImage: 'https://example.com/event-image.jpg',
            date: 'March 15, 2024',
            time: '2:00 PM - 5:00 PM',
            location: 'Conference Center, 123 Business Ave',
            description: 'Join us for our annual company meeting where we\'ll discuss the year ahead and celebrate our achievements.',
            rsvpUrl: 'https://rsvp.example.com/meeting'
          })}
          className="mt-2 px-4 py-2 bg-purple-600 text-white rounded"
        >
          Create Sample Invitation
        </button>
      </div>
      
      <EmailTemplateBuilder />
    </div>
  );
}
```

## Multi-tenant SaaS Platform

Email builder for different clients with branding.

```tsx
function MultiTenantEmailBuilder() {
  const [currentClient, setCurrentClient] = useState(null);
  const [clients, setClients] = useState([]);
  const { template, updateTemplateSettings } = useEmailTemplateBuilder();
  const { exportAsHTML } = useEmailExport();

  const loadClient = (client) => {
    setCurrentClient(client);
    
    // Update template settings with client branding
    updateTemplateSettings({
      width: '700px',
      backgroundColor: client.brandColor || '#ffffff',
      fontFamily: client.fontFamily || 'Arial, sans-serif'
    });
  };

  const saveClientTemplate = async () => {
    const html = exportAsHTML();
    
    try {
      await fetch(`/api/clients/${currentClient.id}/templates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          html, 
          template,
          clientId: currentClient.id
        })
      });
      alert('Template saved for client!');
    } catch (error) {
      console.error('Failed to save template:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Client Selector */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">Multi-Client Email Builder</h1>
            <select 
              onChange={(e) => {
                const client = clients.find(c => c.id === e.target.value);
                if (client) loadClient(client);
              }}
              className="mt-2 px-3 py-2 border border-gray-300 rounded"
            >
              <option value="">Select a client</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
          
          {currentClient && (
            <button 
              onClick={saveClientTemplate}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save for {currentClient.name}
            </button>
          )}
        </div>
      </div>

      {currentClient && (
        <div className="p-4">
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h3 className="font-semibold">Client Branding</h3>
            <p><strong>Name:</strong> {currentClient.name}</p>
            <p><strong>Brand Color:</strong> {currentClient.brandColor}</p>
            <p><strong>Font:</strong> {currentClient.fontFamily}</p>
          </div>
          
          <EmailTemplateBuilder />
        </div>
      )}
    </div>
  );
}
```

## Best Practices from Examples

1. **Save templates** - Always provide a way to save work
2. **Handle errors** - Wrap API calls in try-catch blocks
3. **Provide feedback** - Show success/error messages to users
4. **Auto-populate** - Use data to automatically create relevant content
5. **Brand consistency** - Apply client branding to templates
6. **Mobile-first** - Design emails that work on mobile devices
7. **Test before sending** - Always preview emails before sending

## Next Steps

- **[Integration](Integration)** - Learn advanced integration patterns
- **[Hooks](Hooks)** - Understand programmatic control
- **[Components](Components)** - Explore available email components