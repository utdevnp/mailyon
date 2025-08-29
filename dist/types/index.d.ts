export interface EmailComponent {
    id: string;
    type: ComponentType;
    props: Record<string, any>;
    children?: EmailComponent[];
    style?: Record<string, any>;
}
export type ComponentType = 'header' | 'text' | 'image' | 'button' | 'divider' | 'columns' | 'footer' | 'spacer';
export interface HeaderProps {
    logo?: string;
    title?: string;
    subtitle?: string;
    backgroundColor?: string;
    textColor?: string;
}
export interface TextProps {
    content: string;
    fontSize?: string;
    fontWeight?: string;
    textAlign?: 'left' | 'center' | 'right';
    color?: string;
    lineHeight?: string;
}
export interface ImageProps {
    src: string;
    alt: string;
    width?: string;
    height?: string;
    align?: 'left' | 'center' | 'right';
    borderRadius?: string;
}
export interface ButtonProps {
    text: string;
    url?: string;
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: string;
    padding?: string;
    fontSize?: string;
}
export interface DividerProps {
    color?: string;
    height?: string;
    margin?: string;
}
export interface ColumnsProps {
    columns: number;
    gap?: string;
    backgroundColor?: string;
}
export interface FooterProps {
    companyName?: string;
    address?: string;
    phone?: string;
    email?: string;
    socialLinks?: Array<{
        platform: string;
        url: string;
    }>;
    unsubscribeText?: string;
}
export interface SpacerProps {
    height: string;
}
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
export interface DragItem {
    type: ComponentType;
    component?: EmailComponent;
}
export interface BuilderState {
    template: EmailTemplate;
    selectedComponent: EmailComponent | null;
    isDragging: boolean;
    history: EmailTemplate[];
    historyIndex: number;
}
export interface BuilderActions {
    addComponent: (component: EmailComponent, parentId?: string) => void;
    updateComponent: (id: string, updates: Partial<EmailComponent>) => void;
    deleteComponent: (id: string) => void;
    selectComponent: (component: EmailComponent | null) => void;
    moveComponent: (id: string, newIndex: number) => void;
    duplicateComponent: (id: string) => void;
    undo: () => void;
    redo: () => void;
    saveTemplate: () => void;
    loadTemplate: (template: EmailTemplate) => void;
    exportJSON: () => string;
    exportMJML: () => string;
}
