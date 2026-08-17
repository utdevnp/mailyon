import mjml2html from 'mjml-browser';
import { EmailComponent, EmailTemplate } from '../types';

// MJML Component Templates - Each matches the preview styling exactly
export const generateMJML = (template: EmailTemplate): string => {
  const generateComponentMJML = (component: EmailComponent, insideColumn = false): string => {
    const props = component.props;

    // Body-level elements are wrapped in <mj-section><mj-column>; elements nested
    // inside a column must be emitted bare (mj-section is invalid inside mj-column).
    const section = (inner: string, padding = '0px', backgroundColor?: string) => `
      <mj-section padding="${padding}"${backgroundColor ? ` background-color="${backgroundColor}"` : ''}>
        <mj-column>
          ${inner}
        </mj-column>
      </mj-section>
    `;
    const wrap = (inner: string, padding = '0px', backgroundColor?: string) =>
      insideColumn ? inner : section(inner, padding, backgroundColor);

    switch (component.type) {
      case 'columns': {
        const columns = component.children?.map(column => generateComponentMJML(column, true)).join('') || '';
        const sectionAttrs = [
          `padding="${props.padding || '0px'}"`,
          `background-color="${props.backgroundColor || 'transparent'}"`,
          props.border ? `border="${props.border}"` : '',
          props.borderRadius ? `border-radius="${props.borderRadius}"` : '',
        ].filter(Boolean).join(' ');
        return insideColumn
          ? columns
          : `
            <mj-section ${sectionAttrs}>
              ${columns}
            </mj-section>
          `;
      }

      case 'column': {
        const columnAttrs = [
          `width="${props.width || '50%'}"`,
          `padding="${props.padding || '0px'}"`,
          `background-color="${props.backgroundColor || 'transparent'}"`,
          `vertical-align="${props.verticalAlign || 'top'}"`,
          props.border ? `border="${props.border}"` : '',
          props.borderRadius ? `border-radius="${props.borderRadius}"` : '',
        ].filter(Boolean).join(' ');
        return `
          <mj-column ${columnAttrs}>
            ${component.children?.map(child => generateComponentMJML(child, true)).join('') || ''}
          </mj-column>
        `;
      }

      case 'header': {
        const inner = `
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
        `;
        return wrap(inner, props.padding || '0px', props.backgroundColor || 'transparent');
      }

      case 'text': {
        const inner = `
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
        `;
        return wrap(inner, props.padding || '0px', props.backgroundColor || 'transparent');
      }

      case 'image': {
        const inner = `
          ${props.imageVisible !== false ? `
            <mj-image 
              src="${props.src || ''}" 
              alt="${props.alt || ''}"
              ${props.width ? `width="${props.width}"` : ''}
              height="auto"
              border-radius="${props.borderRadius || '0px'}"
              align="${props.align || 'center'}"
              padding="0"
              border="0"
            />
          ` : ''}
        `;
        return wrap(inner, props.padding || '0px', props.backgroundColor || 'transparent');
      }

      case 'button': {
        const inner = `
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
        `;
        return wrap(inner, props.canvasPadding || '0px');
      }

      case 'divider': {
        const inner = `
          <mj-divider 
            border-color="${props.color || '#e5e7eb'}" 
            border-width="${props.height || '1px'}"
            padding="20px 0"
          />
        `;
        return wrap(inner, props.padding || '0px', props.backgroundColor || 'transparent');
      }

      case 'spacer': {
        const inner = `
          <mj-spacer height="${props.height || '20px'}" />
        `;
        return wrap(inner, props.padding || '0px', props.backgroundColor || 'transparent');
      }

      case 'footer': {
        const inner = `
          ${props.companyName ? `
            <mj-text 
              font-size="18px" 
              font-weight="bold" 
              color="${props.companyNameColor || '#111827'}"
              align="${props.contentAlignment || 'center'}"
              padding="0 0 15px 0"
            >
              ${props.companyName}
            </mj-text>
          ` : ''}
          ${props.address ? `
            <mj-text 
              font-size="14px" 
              color="${props.contactTextColor || '#6b7280'}"
              align="${props.contentAlignment || 'center'}"
              padding="5px 0"
            >
              ${props.address}
            </mj-text>
          ` : ''}
          ${props.phone ? `
            <mj-text 
              font-size="14px" 
              color="${props.contactTextColor || '#6b7280'}"
              align="${props.contentAlignment || 'center'}"
              padding="5px 0"
            >
              ${props.phone}
            </mj-text>
          ` : ''}
          ${props.email ? `
            <mj-text 
              font-size="14px" 
              color="${props.contactTextColor || '#6b7280'}"
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
      `<a href="${link.url}" style="margin: 0 10px; color: ${props.socialTextColor || '#6b7280'}; text-decoration: none; display: inline-block; vertical-align: middle;">
                  <img src="${link.imageUrl}" alt="${link.title}" width="16" height="16" style="display: inline-block; vertical-align: middle; margin-right: 5px;">
                  ${link.title}
                </a>`
    ).join('')}
            </mj-text>
          ` : ''}
          ${props.unsubscribeText ? `
            <mj-text 
              font-size="12px" 
              color="${props.unsubscribeTextColor || '#9ca3af'}"
              align="${props.contentAlignment || 'center'}"
              padding="15px 0 0 0"
            >
              <a href="${props.unsubscribeUrl || '#'}" style="color: ${props.unsubscribeTextColor || '#9ca3af'}; text-decoration: none;">${props.unsubscribeText}</a>
            </mj-text>
          ` : ''}
        `;
        return wrap(inner, props.padding || '0px', props.backgroundColor || 'transparent');
      }

      case 'socialMedia': {
        const inner = `
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
        `;
        return wrap(inner, props.padding || '0px', props.backgroundColor || 'transparent');
      }

      default: {
        const inner = `
          <mj-text color="#666" text-align="center">
            Component type: ${component.type}
          </mj-text>
        `;
        return wrap(inner, props.padding || '0px');
      }
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
      <mj-body background-color="${template.settings.backgroundColor || 'transparent'}">
        ${template.components.map(component => generateComponentMJML(component)).join('')}
      </mj-body>
    </mjml>
  `;

  return mjmlTemplate.trim();
};

// Convert MJML to HTML with perfect styling
export const convertMJMLToHTML = (mjmlContent: string): string => {
  try {
    const result = mjml2html(mjmlContent, {
      keepComments: false,
      beautify: true,
      minify: false,
      validationLevel: 'soft'
    });

    if (result.errors && result.errors.length > 0) {
      console.warn('MJML conversion warnings:', result.errors);
    }

    return result.html;
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
