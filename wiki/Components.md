# 🧩 Components

The Email Template Builder provides **8 pre-built, fully functional email components**. Each component is designed for specific use cases and comes with comprehensive customization options.

## 📋 Component Overview

| Component | Type | Description | Customizable Properties |
|-----------|------|-------------|-------------------------|
| **Header** | `header` | Logo, title, subtitle | Colors, visibility, sizing |
| **Text** | `text` | Rich text content | Font, alignment, colors |
| **Image** | `image` | Responsive images | Sizing, alignment, borders |
| **Button** | `button` | Call-to-action buttons | Styling, colors, typography |
| **Divider** | `divider` | Horizontal lines | Color, height, margins |
| **Footer** | `footer` | Company info, social links | Content, alignment, styling |
| **Spacer** | `spacer` | Vertical spacing | Height, padding |
| **Social Media** | `socialMedia` | Social platform icons | Platforms, alignment, sizing |

## 🎯 Header Component

**Type**: `header`

**Purpose**: Company branding and navigation section

**Properties**:
```typescript
interface HeaderProps {
  logo?: string;              // Logo image URL
  logoWidth?: string;         // Logo width (e.g., "200px")
  logoHeight?: string;        // Logo height (e.g., "60px")
  title?: string;             // Company name
  subtitle?: string;          // Company tagline
  backgroundColor?: string;    // Background color
  textColor?: string;         // Text color
  logoVisible?: boolean;      // Show/hide logo
  titleVisible?: boolean;     // Show/hide title
  subtitleVisible?: boolean;  // Show/hide subtitle
  padding?: string;           // Component padding
}
```

**Example Usage**:
```tsx
const headerComponent = {
  type: 'header',
  props: {
    logo: 'https://example.com/logo.png',
    title: 'My Company',
    subtitle: 'Professional Email Solutions',
    backgroundColor: '#3b82f6',
    textColor: '#ffffff',
    logoVisible: true,
    titleVisible: true,
    subtitleVisible: true,
    padding: '20px'
  }
};
```

## 📝 Text Component

**Type**: `text`

**Purpose**: Rich text content with formatting

**Properties**:
```typescript
interface TextProps {
  content: string;            // Text content
  fontSize?: string;          // Font size (e.g., "16px")
  fontWeight?: string;        // Font weight (e.g., "bold")
  textAlign?: 'left' | 'center' | 'right';
  color?: string;             // Text color
  lineHeight?: string;        // Line height (e.g., "1.5")
  backgroundColor?: string;    // Background color
  textVisible?: boolean;      // Show/hide text
  padding?: string;           // Component padding
}
```

**Example Usage**:
```tsx
const textComponent = {
  type: 'text',
  props: {
    content: 'Welcome to our newsletter! This is a sample text block.',
    fontSize: '18px',
    fontWeight: 'normal',
    textAlign: 'center',
    color: '#333333',
    lineHeight: '1.6',
    padding: '20px'
  }
};
```

## 🖼️ Image Component

**Type**: `image`

**Purpose**: Responsive images with alignment options

**Properties**:
```typescript
interface ImageProps {
  src: string;                // Image source URL
  alt: string;                // Alt text for accessibility
  width?: string;             // Image width
  height?: string;            // Image height
  align?: 'left' | 'center' | 'right';
  borderRadius?: string;      // Border radius (e.g., "8px")
  imageVisible?: boolean;     // Show/hide image
  padding?: string;           // Component padding
}
```

**Example Usage**:
```tsx
const imageComponent = {
  type: 'image',
  props: {
    src: 'https://example.com/image.jpg',
    alt: 'Professional business image',
    width: '600px',
    height: '300px',
    align: 'center',
    borderRadius: '8px',
    padding: '20px'
  }
};
```

## 🔘 Button Component

**Type**: `button`

**Purpose**: Call-to-action buttons with custom styling

**Properties**:
```typescript
interface ButtonProps {
  text: string;               // Button text
  url?: string;               // Button link URL
  backgroundColor?: string;    // Button background color
  textColor?: string;         // Button text color
  borderRadius?: string;      // Border radius (e.g., "6px")
  padding?: string;           // Button padding
  canvasPadding?: string;     // Canvas padding around button
  fontSize?: string;          // Font size
  buttonVisible?: boolean;    // Show/hide button
}
```

**Example Usage**:
```tsx
const buttonComponent = {
  type: 'button',
  props: {
    text: 'Learn More',
    url: 'https://example.com',
    backgroundColor: '#3b82f6',
    textColor: '#ffffff',
    borderRadius: '6px',
    padding: '12px 24px',
    fontSize: '16px',
    buttonVisible: true
  }
};
```

## ➖ Divider Component

**Type**: `divider`

**Purpose**: Horizontal lines and visual separators

**Properties**:
```typescript
interface DividerProps {
  color?: string;             // Line color
  height?: string;            // Line height (e.g., "1px")
  margin?: string;            // Margins around divider
  padding?: string;           // Component padding
}
```

**Example Usage**:
```tsx
const dividerComponent = {
  type: 'divider',
  props: {
    color: '#e5e7eb',
    height: '2px',
    margin: '20px 0',
    padding: '10px'
  }
};
```

## 🦶 Footer Component

**Type**: `footer`

**Purpose**: Company information and social links

**Properties**:
```typescript
interface FooterProps {
  companyName?: string;       // Company name
  address?: string;           // Company address
  phone?: string;             // Phone number
  email?: string;             // Email address
  socialLinks?: Array<{       // Social media links
    title: string;
    imageUrl: string;
    url: string;
  }>;
  unsubscribeText?: string;   // Unsubscribe text
  unsubscribeUrl?: string;    // Unsubscribe URL
  backgroundColor?: string;    // Background color
  padding?: string;           // Component padding
  contentAlignment?: 'left' | 'center' | 'right';
}
```

**Example Usage**:
```tsx
const footerComponent = {
  type: 'footer',
  props: {
    companyName: 'My Company',
    address: '123 Main St, City, State 12345',
    phone: '+1 (555) 123-4567',
    email: 'info@company.com',
    socialLinks: [
      {
        title: 'Facebook',
        imageUrl: 'https://example.com/facebook.svg',
        url: 'https://facebook.com/company'
      }
    ],
    unsubscribeText: 'Click here to unsubscribe',
    unsubscribeUrl: 'https://company.com/unsubscribe',
    contentAlignment: 'center',
    padding: '30px'
  }
};
```

## 📏 Spacer Component

**Type**: `spacer`

**Purpose**: Vertical spacing between components

**Properties**:
```typescript
interface SpacerProps {
  height: string;             // Spacer height (e.g., "20px")
  padding?: string;           // Component padding
}
```

**Example Usage**:
```tsx
const spacerComponent = {
  type: 'spacer',
  props: {
    height: '40px',
    padding: '10px'
  }
};
```

## 📱 Social Media Component

**Type**: `socialMedia`

**Purpose**: Social platform icons and links

**Properties**:
```typescript
interface SocialMediaProps {
  platforms: Array<{          // Social media platforms
    platform: string;
    title: string;
    imageUrl: string;
    url: string;
  }>;
  alignment: 'horizontal' | 'vertical';
  type: 'icon' | 'text' | 'iconText';
  spacing: string;            // Space between icons
  iconSize: string;           // Icon size
  backgroundColor?: string;    // Background color
  padding?: string;           // Component padding
}
```

**Example Usage**:
```tsx
const socialMediaComponent = {
  type: 'socialMedia',
  props: {
    platforms: [
      {
        platform: 'Facebook',
        title: 'Facebook',
        imageUrl: 'https://example.com/facebook.svg',
        url: 'https://facebook.com/company'
      },
      {
        platform: 'Twitter',
        title: 'Twitter',
        imageUrl: 'https://example.com/twitter.svg',
        url: 'https://twitter.com/company'
      }
    ],
    alignment: 'horizontal',
    type: 'icon',
    spacing: '20px',
    iconSize: '24px',
    padding: '20px'
  }
};
```

## 🔧 Component Customization

### **Visibility Controls**
Most components have visibility properties (e.g., `logoVisible`, `textVisible`) that allow you to show/hide specific elements.

### **Responsive Design**
All components are designed to work across different screen sizes and email clients.

### **Color Customization**
Every component supports custom colors for backgrounds, text, and borders.

### **Spacing Control**
Use padding and margin properties to control spacing around and within components.

## 🚨 Important Notes

- **Pre-built Components**: These are the only component types currently supported
- **No Custom Types**: Cannot create new component types
- **Full Customization**: All properties are customizable within the defined interfaces
- **Email Compatibility**: All components generate email-compatible HTML

## 🔗 Next Steps

- **[Hooks](Hooks)** - Learn how to use components programmatically
- **[Integration](Integration)** - See how to integrate components into your app
- **[Examples](Examples)** - View real-world component usage examples

---

**Need help with a specific component?** Check the [Issues](https://github.com/utdevnp/mailyon/issues) page.
