# Email Components

Mailyon provides 8 pre-built email components that you can drag and drop to create professional email templates. Each component is fully customizable and designed for email marketing best practices.

## Component Overview

| Component | Purpose | Best For |
|-----------|---------|----------|
| **Header** | Company branding and navigation | Logo, company name, navigation |
| **Text** | Rich text content | Paragraphs, headings, announcements |
| **Image** | Visual content | Product photos, banners, illustrations |
| **Button** | Call-to-action | "Shop Now", "Learn More", "Sign Up" |
| **Divider** | Visual separation | Section breaks, content organization |
| **Footer** | Contact information | Company details, social links, unsubscribe |
| **Spacer** | Layout spacing | Vertical spacing between sections |
| **Social Media** | Social platform links | Facebook, Twitter, Instagram, LinkedIn |

## Header Component

Perfect for company branding and navigation.

### Properties You Can Customize
- **Logo** - Upload your company logo
- **Title** - Company or campaign name
- **Subtitle** - Tagline or description
- **Colors** - Background and text colors
- **Visibility** - Show/hide logo, title, or subtitle

### Example Usage
```tsx
// The component will automatically include these properties
// when you drag it from the component library
const headerComponent = {
  type: 'header',
  props: {
    logo: 'https://yourcompany.com/logo.png',
    title: 'Your Company',
    subtitle: 'Professional Solutions',
    backgroundColor: '#3b82f6',
    textColor: '#ffffff'
  }
};
```

## Text Component

Add rich text content to your emails.

### Properties You Can Customize
- **Content** - Your text content
- **Font Size** - Text size (12px to 24px)
- **Font Weight** - Normal, bold, or light
- **Alignment** - Left, center, or right
- **Colors** - Text and background colors
- **Line Height** - Spacing between lines

### Best Practices
- Keep paragraphs short (2-3 sentences)
- Use bullet points for lists
- Make important text bold
- Use center alignment for headlines

## Image Component

Add visual content to your emails.

### Properties You Can Customize
- **Image Source** - URL to your image
- **Alt Text** - Description for accessibility
- **Dimensions** - Width and height
- **Alignment** - Left, center, or right
- **Border Radius** - Rounded corners

### Best Practices
- Use high-quality images (but optimize for web)
- Always include alt text for accessibility
- Keep images under 1MB for fast loading
- Use center alignment for hero images

## Button Component

Create compelling call-to-action buttons.

### Properties You Can Customize
- **Button Text** - Your call-to-action text
- **Link URL** - Where the button leads
- **Colors** - Background and text colors
- **Border Radius** - Button shape
- **Padding** - Button size
- **Font Size** - Text size

### Best Practices
- Use action words: "Shop Now", "Learn More", "Get Started"
- Make buttons prominent with contrasting colors
- Keep button text short and clear
- Test all links before sending

## Divider Component

Add visual separation between sections.

### Properties You Can Customize
- **Color** - Line color
- **Height** - Line thickness
- **Margins** - Spacing around the divider

### Best Practices
- Use subtle colors (light gray)
- Add spacing above and below
- Use sparingly to avoid clutter

## Footer Component

Include company information and legal requirements.

### Properties You Can Customize
- **Company Name** - Your business name
- **Address** - Physical address
- **Phone** - Contact number
- **Email** - Contact email
- **Social Links** - Social media profiles
- **Unsubscribe** - Unsubscribe link and text

### Best Practices
- Always include unsubscribe link
- Add your physical address (required by law)
- Include social media links
- Keep footer information up to date

## Spacer Component

Control vertical spacing in your emails.

### Properties You Can Customize
- **Height** - Amount of vertical space

### Best Practices
- Use for breathing room between sections
- Don't overuse - too much spacing looks unprofessional
- Test on mobile devices

## Social Media Component

Add social media links to your emails.

### Properties You Can Customize
- **Platforms** - Which social networks to include
- **Alignment** - Horizontal or vertical layout
- **Icon Size** - Size of social media icons
- **Spacing** - Space between icons

### Best Practices
- Include your most active social platforms
- Use horizontal layout for most emails
- Keep icon sizes consistent
- Link to your actual social profiles

## Component Combinations

### Email Marketing Campaign
```
Header (logo + title)
Text (campaign message)
Image (product photo)
Button (call-to-action)
Divider
Footer (company info + social)
```

### Newsletter
```
Header (newsletter title)
Text (welcome message)
Image (featured article)
Text (article summary)
Button (read more)
Spacer
Social Media (social links)
Footer (unsubscribe)
```

### Transactional Email
```
Header (company logo)
Text (order confirmation)
Text (order details)
Button (track order)
Footer (contact info)
```

## Tips for Better Emails

1. **Start with a clear header** - Include your logo and company name
2. **Use compelling images** - Visual content gets more engagement
3. **Write clear copy** - Keep text concise and scannable
4. **Include strong CTAs** - Make it obvious what you want readers to do
5. **End with a footer** - Include contact info and unsubscribe link
6. **Test on mobile** - Most emails are read on mobile devices
7. **Keep it simple** - Don't overcrowd your email with too many elements

## Next Steps

- **[Hooks](Hooks)** - Learn how to control components programmatically
- **[Examples](Examples)** - See real-world email templates
- **[Integration](Integration)** - Customize the builder for your needs