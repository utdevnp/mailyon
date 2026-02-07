// Base component interface
export interface EmailComponent {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  children?: EmailComponent[];
  style?: Record<string, any>;
}

// Component types
export type ComponentType =
  | 'header'
  | 'text'
  | 'image'
  | 'button'
  | 'divider'
  | 'socialMedia'
  | 'footer'
  | 'spacer'
  | 'columns'
  | 'column';

// Specific component props
export interface HeaderProps {
  logo?: string;
  logoWidth?: string;
  logoHeight?: string;
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
  textColor?: string;
  logoVisible?: boolean;
  titleVisible?: boolean;
  subtitleVisible?: boolean;
  padding?: string;
}

export interface TextProps {
  content: string; // HTML content from Quill editor
  fontSize?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  color?: string;
  lineHeight?: string;
  backgroundColor?: string;
  textVisible?: boolean;
  padding?: string;
}

export interface ImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  align?: 'left' | 'center' | 'right';
  borderRadius?: string;
  imageVisible?: boolean;
  padding?: string;
}

export interface ButtonProps {
  text: string;
  url?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
  padding?: string;
  canvasPadding?: string;
  fontSize?: string;
  buttonVisible?: boolean;
}

export interface DividerProps {
  color?: string;
  height?: string;
  margin?: string;
  padding?: string;
}



export interface FooterProps {
  companyName?: string;
  address?: string;
  phone?: string;
  email?: string;
  socialLinks?: Array<{ title: string; imageUrl: string; url: string }>;
  unsubscribeText?: string;
  unsubscribeUrl?: string;
  backgroundColor?: string;
  companyNameColor?: string;
  contactTextColor?: string;
  socialTextColor?: string;
  unsubscribeTextColor?: string;
  padding?: string;
  contentAlignment?: 'left' | 'center' | 'right';
}

export interface SpacerProps {
  height: string;
  padding?: string;
}

export interface SocialMediaProps {
  platforms: Array<{
    platform: string;
    title: string;
    imageUrl: string;
    url: string;
  }>;
  alignment: 'horizontal' | 'vertical';
  type: 'icon' | 'text' | 'iconText';
  spacing: string;
  iconSize: string;
  backgroundColor?: string;
  padding?: string;
}

// Template structure
export interface EmailTemplate {
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

// Drag and drop types
export interface DragItem {
  type: ComponentType;
  component?: EmailComponent;
}

// Store state
export interface BuilderState {
  template: EmailTemplate;
  selectedComponent: EmailComponent | null;
  hoveredComponentId: string | null;
  isDragging: boolean;
  history: EmailTemplate[];
  historyIndex: number;
}

// Actions
export interface BuilderActions {
  addComponent: (component: EmailComponent, parentId?: string) => void;
  updateComponent: (id: string, updates: Partial<EmailComponent>) => void;
  deleteComponent: (id: string) => void;
  selectComponent: (component: EmailComponent | null) => void;
  setHoveredComponentId: (id: string | null) => void;
  moveComponent: (id: string, newIndex: number, newParentId?: string) => void;
  insertComponentAt: (type: ComponentType, index: number, defaultProps?: Record<string, any>, parentId?: string) => void;
  duplicateComponent: (id: string) => void;
  undo: () => void;
  redo: () => void;
  saveTemplate: () => void;
  loadTemplate: (template: EmailTemplate) => void;
  exportJSON: () => string;
  exportMJML: () => string;
  updateTemplateSettings: (settings: Partial<EmailTemplate['settings']>) => void;
  setFullTemplate: (template: EmailTemplate) => void;
}
