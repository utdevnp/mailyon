import mjml2html from 'mjml-browser';
import { EmailComponent, EmailTemplate } from '../types';

// MJML Component Templates - Each matches the preview styling exactly
export const generateMJML = (template: EmailTemplate): string => {
  const generateComponentMJML = (component: EmailComponent): string => {
    const props = component.props;
    
    switch (component.type) {
      case 'header':
        return `
          <mj-section padding="${props.padding || '0px'}" background-color="${props.backgroundColor || 'transparent'}">
            <mj-column>
              ${props.logo && props.logoVisible !== false ? `
                <mj-image 
                  src="${props.logo}" 
                  alt="Logo" 
                  width="${props.logoWidth || '200px'}" 
                  height="${props.logoHeight || '60px'}"
                  padding="0 0 10px 0"
                  border-radius="0"
                />
              ` : ''}
              ${props.title && props.titleVisible !== false ? `
                <mj-text 
                  font-size="24px" 
                  font-weight="bold" 
                  color="${props.textColor || '#000000'}"
                  align="center"
                  padding="0"
                  line-height="1.2"
                >
                  ${props.title}
                </mj-text>
              ` : ''}
              ${props.subtitle && props.subtitleVisible !== false ? `
                <mj-text 
                  font-size="16px" 
                  color="${props.textColor || '#000000'}"
                  align="center"
                  padding="10px 0 0 0"
                  line-height="1.4"
                >
                  ${props.subtitle}
                </mj-text>
              ` : ''}
            </mj-column>
          </mj-section>
        `;
      
      case 'text':
        return `
          <mj-section padding="${props.padding || '0px'}" background-color="${props.backgroundColor || 'transparent'}">
            <mj-column>
              ${props.textVisible !== false ? `
                <mj-text 
                  font-size="${props.fontSize || '16px'}"
                  font-weight="${props.fontWeight || 'normal'}"
                  color="${props.color || '#000000'}"
                  align="${props.textAlign || 'left'}"
                  line-height="${props.lineHeight || '1.5'}"
                  padding="0"
                >
                  ${props.content || ''}
                </mj-text>
              ` : ''}
            </mj-column>
          </mj-section>
        `;
      
      case 'image':
        return `
          <mj-section padding="${props.padding || '0px'}" background-color="${props.backgroundColor || 'transparent'}">
            <mj-column>
              ${props.imageVisible !== false ? `
                <mj-image 
                  src="${props.src || ''}" 
                  alt="${props.alt || ''}"
                  width="${props.width || '100%'}"
                  height="auto"
                  border-radius="${props.borderRadius || '0px'}"
                  align="${props.align || 'center'}"
                  padding="0"
                  border="0"
                  style="display: block; max-width: 100%;"
                />
              ` : ''}
            </mj-column>
          </mj-section>
        `;
      
      case 'button':
        return `
          <mj-section padding="${props.canvasPadding || '0px'}">
            <mj-column>
              ${props.buttonVisible !== false ? `
                <mj-button 
                  href="${props.url || '#'}"
                  background-color="${props.backgroundColor || '#3b82f6'}"
                  color="${props.textColor || '#ffffff'}"
                  border-radius="${props.borderRadius || '6px'}"
                  font-weight="bold"
                  font-size="${props.fontSize || '16px'}"
                  padding="${props.padding || '12px 24px'}"
                  text-align="center"
                >
                  ${props.text || 'Click me'}
                </mj-button>
              ` : ''}
            </mj-column>
          </mj-section>
        `;
      
      case 'divider':
        return `
          <mj-section padding="${props.padding || '0px'}" background-color="${props.backgroundColor || 'transparent'}">
            <mj-column>
              <mj-divider 
                border-color="${props.color || '#e5e7eb'}" 
                border-width="${props.height || '1px'}"
                padding="20px 0"
              />
            </mj-column>
          </mj-section>
        `;
      

      
      case 'spacer':
        return `
          <mj-section padding="${props.padding || '0px'}" background-color="${props.backgroundColor || 'transparent'}">
            <mj-column>
              <mj-spacer height="${props.height || '20px'}" />
            </mj-column>
          </mj-section>
        `;
      
      case 'footer':
        // Debug: Log footer alignment
        console.log('🔍 Footer component alignment:', props.contentAlignment);
        console.log('🔍 Footer props:', props);
        
        return `
          <mj-section padding="${props.padding || '0px'}" background-color="${props.backgroundColor || 'transparent'}">
            <mj-column>
              ${props.companyName ? `
                <mj-text 
                  font-size="18px" 
                  font-weight="bold" 
                  color="#333"
                  align="${props.contentAlignment || 'center'}"
                  padding="0 0 15px 0"
                >
                  ${props.companyName}
                </mj-text>
              ` : ''}
              ${props.address ? `
                <mj-text 
                  font-size="14px" 
                  color="#666"
                  align="${props.contentAlignment || 'center'}"
                  padding="5px 0"
                >
                  ${props.address}
                </mj-text>
              ` : ''}
              ${props.phone ? `
                <mj-text 
                  font-size="14px" 
                  color="#666"
                  align="${props.contentAlignment || 'center'}"
                  padding="5px 0"
                >
                  ${props.phone}
                </mj-text>
              ` : ''}
              ${props.email ? `
                <mj-text 
                  font-size="14px" 
                  color="#666"
                  align="${props.contentAlignment || 'center'}"
                  padding="5px 0"
                >
                  ${props.email}
                </mj-text>
              ` : ''}
              ${props.socialLinks && props.socialLinks.length > 0 ? `
                <mj-text 
                  font-size="14px" 
                  align="${props.contentAlignment || 'center'}"
                  padding="15px 0"
                >
                  ${props.socialLinks.map((link: { title: string; imageUrl: string; url: string }) => 
                    `<a href="${link.url}" style="margin: 0 10px; color: #3b82f6; text-decoration: none; display: inline-block; vertical-align: middle;">
                      <img src="${link.imageUrl}" alt="${link.title}" width="16" height="16" style="display: inline-block; vertical-align: middle; margin-right: 5px;">
                      ${link.title}
                    </a>`
                  ).join('')}
                </mj-text>
              ` : ''}
              ${props.unsubscribeText ? `
                <mj-text 
                  font-size="12px" 
                  color="#999"
                  align="${props.contentAlignment || 'center'}"
                  padding="15px 0 0 0"
                >
                  <a href="${props.unsubscribeUrl || '#'}" style="color: #999; text-decoration: none;">${props.unsubscribeText}</a>
                </mj-text>
              ` : ''}
            </mj-column>
          </mj-section>
        `;
      
      case 'socialMedia':
        return `
          <mj-section padding="${props.padding || '0px'}" background-color="${props.backgroundColor || 'transparent'}">
            <mj-column>
              <mj-text 
                align="center"
                padding="0"
              >
                ${props.platforms && props.platforms.map((platform: any) => `
                  <a href="${platform.url || '#'}" style="
                    display: inline-block;
                    width: ${props.iconSize || '24px'}; 
                    height: ${props.iconSize || '24px'};
                    margin: 0 ${parseInt(props.spacing || '16px') / 2}px;
                    text-decoration: none;
                  ">
                    <img src="${platform.imageUrl || '#'}" alt="${platform.title || 'Social Platform'}" width="${props.iconSize || '24px'}" height="${props.iconSize || '24px'}" style="display: inline-block; vertical-align: middle;">
                  </a>
                `).join('')}
              </mj-text>
            </mj-column>
          </mj-section>
        `;
      
      default:
        return `
          <mj-section padding="${props.padding || '0px'}">
            <mj-column>
              <mj-text color="#666" text-align="center">
                Component type: ${component.type}
              </mj-text>
            </mj-column>
          </mj-section>
        `;
    }
  };

  // Generate complete MJML document
  const mjmlTemplate = `
    <mjml>
      <mj-head>
        <mj-title>${template.name}</mj-title>
        <mj-font name="Arial" href="https://fonts.googleapis.com/css?family=Arial" />
        <mj-attributes>
          <mj-all font-family="Arial, sans-serif" />
        </mj-attributes>
        <mj-style>
          .email-container {
            max-width: ${template.settings.width || '600px'};
            margin: 0 auto;
          }
        </mj-style>
      </mj-head>
      <mj-body background-color="${template.settings.backgroundColor || '#ffffff'}">
        ${template.components.map(generateComponentMJML).join('')}
      </mj-body>
    </mjml>
  `;
  
  return mjmlTemplate.trim();
};

// Convert MJML to HTML with perfect styling
export const convertMJMLToHTML = (mjmlContent: string): string => {
  try {
    console.log('Converting MJML to HTML:', mjmlContent);
    
    const result = mjml2html(mjmlContent, {
      keepComments: false,
      beautify: true,
      minify: false,
      validationLevel: 'soft'
    });
    
    if (result.errors && result.errors.length > 0) {
      console.warn('MJML conversion warnings:', result.errors);
    }
    
    console.log('Generated HTML:', result.html);
    
    // Check if center alignment is preserved
    const hasCenterAlign = result.html.includes('text-align: center') || 
                          result.html.includes('text-align:center') ||
                          result.html.includes('align="center"');
    
    if (!hasCenterAlign) {
      console.warn('⚠️ Center alignment NOT found in generated HTML!');
    } else {
      console.log('✅ Center alignment found in generated HTML');
    }
    
    // Ensure center alignment is preserved for header components
    let finalHtml = result.html;
    
    // If center alignment is missing, add it manually
    if (!hasCenterAlign) {
      console.warn('⚠️ Adding center alignment manually to HTML');
      // This is a fallback - ideally MJML should handle this
      finalHtml = finalHtml.replace(
        /<mj-text[^>]*>/g,
        (match) => {
          if (match.includes('font-size="24px"') || match.includes('font-size="16px"')) {
            return match.replace('>', ' style="text-align: center;">');
          }
          return match;
        }
      );
    }
    
    return finalHtml;
  } catch (error) {
    console.error('MJML conversion error:', error);
    // Fallback to basic HTML if MJML fails
    return `<div style="color: red; padding: 20px;">Error generating HTML. Please check your template.</div>`;
  }
};

// Main export function - generates both MJML and HTML
export const exportEmailTemplate = (template: EmailTemplate) => {
  const mjml = generateMJML(template);
  const html = convertMJMLToHTML(mjml);
  
  return {
    mjml,
    html,
    template
  };
};
