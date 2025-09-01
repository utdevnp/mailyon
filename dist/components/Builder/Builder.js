"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builder = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var react_dnd_1 = require("react-dnd");
var builderStore_1 = require("../../store/builderStore");
var DraggableComponent_1 = require("./DraggableComponent");
var DropZone_1 = require("./DropZone");
var Builder = function () {
    var _a = (0, react_1.useState)('editor'), activeTab = _a[0], setActiveTab = _a[1];
    var _b = (0, react_1.useState)(false), isCanvasSelected = _b[0], setIsCanvasSelected = _b[1];
    var _c = (0, builderStore_1.useBuilderStore)(), template = _c.template, addComponent = _c.addComponent, selectComponent = _c.selectComponent, selectedComponent = _c.selectedComponent, moveComponent = _c.moveComponent, deleteComponent = _c.deleteComponent, insertComponentAt = _c.insertComponentAt;
    // Main Builder drop zone for dropping anywhere in the canvas
    var _d = (0, react_dnd_1.useDrop)({
        accept: 'COMPONENT',
        drop: function (item, monitor) {
            // Only handle drops when not over individual drop zones
            if (!monitor.didDrop()) {
                var newComponent = {
                    id: Math.random().toString(36).substr(2, 9),
                    type: item.type,
                    props: getDefaultProps(item.type),
                    children: [],
                    style: {},
                };
                addComponent(newComponent);
            }
        },
        collect: function (monitor) { return ({
            isOver: monitor.isOver({ shallow: true }),
        }); },
    }), isOver = _d[0].isOver, drop = _d[1];
    var getDefaultProps = function (type) {
        switch (type) {
            case 'header':
                return {
                    logo: '',
                    logoWidth: '200px',
                    logoHeight: '60px',
                    title: 'Company Name',
                    subtitle: 'Your tagline here',
                    backgroundColor: 'transparent',
                    textColor: '#000000',
                    logoVisible: true,
                    titleVisible: true,
                    subtitleVisible: true,
                    padding: '5px',
                };
            case 'text':
                return {
                    content: 'Welcome to templify! This is a sample text block where you can add your content. You can customize the font size, weight, alignment, and colors to match your brand.',
                    fontSize: '16px',
                    fontWeight: 'normal',
                    textAlign: 'left',
                    color: '#000000',
                    lineHeight: '1.5',
                    backgroundColor: 'transparent',
                    textVisible: true,
                    padding: '5px',
                };
            case 'image':
                return {
                    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=300&fit=crop&crop=center',
                    alt: 'Professional business image - perfect for your email content',
                    width: '600px',
                    height: '300px',
                    align: 'center',
                    borderRadius: '0px',
                    imageVisible: true,
                    padding: '5px',
                };
            case 'button':
                return {
                    text: 'Click Here',
                    url: '#',
                    backgroundColor: '#3b82f6',
                    textColor: '#ffffff',
                    borderRadius: '6px',
                    padding: '12px 24px',
                    canvasPadding: '5px',
                    fontSize: '16px',
                    buttonVisible: true,
                };
            case 'divider':
                return {
                    color: '#e5e7eb',
                    height: '1px',
                    margin: '2px 2px',
                    padding: '5px',
                };
            case 'footer':
                return {
                    companyName: 'Company Name',
                    address: '123 Main St, City, State 12345',
                    phone: '+1 (555) 123-4567',
                    email: 'info@company.com',
                    socialLinks: [
                        { title: 'Facebook', imageUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/facebook.svg', url: '#' },
                        { title: 'Twitter', imageUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/twitter.svg', url: '#' },
                        { title: 'LinkedIn', imageUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/linkedin.svg', url: '#' },
                    ],
                    unsubscribeText: 'Click here to unsubscribe',
                    unsubscribeUrl: 'https://company.com/unsubscribe',
                    backgroundColor: 'transparent',
                    padding: '5px',
                    contentAlignment: 'center',
                };
            case 'spacer':
                return {
                    height: '20px',
                    padding: '5px',
                };
            case 'socialMedia':
                return {
                    platforms: [
                        {
                            platform: 'Facebook',
                            title: 'Facebook',
                            imageUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/facebook.svg',
                            url: '#'
                        },
                        {
                            platform: 'Twitter',
                            title: 'Twitter',
                            imageUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/twitter.svg',
                            url: '#'
                        },
                        {
                            platform: 'Instagram',
                            title: 'Instagram',
                            imageUrl: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/instagram.svg',
                            url: '#'
                        }
                    ],
                    alignment: 'horizontal',
                    type: 'icon',
                    spacing: '16px',
                    iconSize: '24px',
                    backgroundColor: 'transparent',
                    padding: '5px',
                };
            default:
                return {};
        }
    };
    var handleComponentClick = function (component) {
        console.log('Component clicked:', component);
        selectComponent(component);
        setIsCanvasSelected(false); // Deselect canvas when component is clicked
    };
    var handleCanvasClick = function () {
        setIsCanvasSelected(true);
        // Don't deselect component when clicking canvas - let user keep component selected
    };
    var renderPreviewComponent = function (component) {
        switch (component.type) {
            case 'header':
                return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "w-full text-center py-6", style: { backgroundColor: component.props.backgroundColor || 'transparent' } }, { children: [component.props.logo && component.props.logoVisible !== false && ((0, jsx_runtime_1.jsx)("img", { src: component.props.logo, alt: "Logo", className: "mx-auto mb-4 logo-custom-size", style: {
                                '--logo-width': component.props.logoWidth || '200px',
                                '--logo-height': component.props.logoHeight || '60px',
                            } })), component.props.titleVisible !== false && ((0, jsx_runtime_1.jsx)("h1", __assign({ className: "text-2xl font-bold mb-2", style: { color: component.props.textColor || '#000000' } }, { children: component.props.title }))), component.props.subtitle !== undefined && component.props.subtitleVisible !== false && ((0, jsx_runtime_1.jsx)("p", __assign({ className: "text-lg", style: { color: component.props.textColor || '#000000' } }, { children: component.props.subtitle })))] })));
            case 'text':
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "w-full py-4 px-6" }, { children: component.props.textVisible !== false && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "prose max-w-none", style: {
                            fontSize: component.props.fontSize || '16px',
                            fontWeight: component.props.fontWeight || 'normal',
                            textAlign: component.props.textAlign || 'left',
                            color: component.props.color || '#000000',
                            lineHeight: component.props.lineHeight || '1.5',
                            backgroundColor: component.props.backgroundColor || 'transparent',
                        } }, { children: component.props.content }))) })));
            case 'image':
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "w-full py-4 px-6" }, { children: component.props.imageVisible !== false && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "flex", style: {
                            justifyContent: component.props.align === 'left' ? 'flex-start' :
                                component.props.align === 'right' ? 'flex-end' : 'center'
                        } }, { children: (0, jsx_runtime_1.jsx)("img", { src: component.props.src, alt: component.props.alt, className: "max-w-full h-auto", style: {
                                width: component.props.width || '100%',
                                height: component.props.height || 'auto',
                                borderRadius: component.props.borderRadius || '0px',
                            } }) }))) })));
            case 'button':
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "w-full py-4 px-6 text-center" }, { children: component.props.buttonVisible !== false && ((0, jsx_runtime_1.jsx)("a", __assign({ href: component.props.url, className: "inline-block px-6 py-3 rounded-lg font-medium text-center transition-colors", style: {
                            backgroundColor: component.props.backgroundColor || '#3b82f6',
                            color: component.props.textColor || '#ffffff',
                            borderRadius: component.props.borderRadius || '6px',
                            padding: component.props.padding || '12px 24px',
                            fontSize: component.props.fontSize || '16px',
                        } }, { children: component.props.text }))) })));
            case 'divider':
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "w-full py-2 px-6" }, { children: (0, jsx_runtime_1.jsx)("hr", { style: {
                            borderColor: component.props.color || '#e5e7eb',
                            borderWidth: component.props.height || '1px',
                            margin: component.props.margin || '20px 0',
                        } }) })));
            case 'footer':
                return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "w-full py-6 px-6", style: { backgroundColor: component.props.backgroundColor || 'transparent' } }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "mb-4 ".concat(component.props.contentAlignment === 'left' ? 'text-left' : component.props.contentAlignment === 'right' ? 'text-right' : 'text-center') }, { children: [(0, jsx_runtime_1.jsx)("h3", __assign({ className: "text-lg font-semibold text-gray-900 mb-2" }, { children: component.props.companyName || 'Company Name' })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-gray-600 text-sm mb-2" }, { children: component.props.address || '123 Main St, City, State 12345' })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-gray-600 text-sm mb-2" }, { children: component.props.phone || '+1 (555) 123-4567' })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-gray-600 text-sm mb-4" }, { children: component.props.email || 'info@company.com' }))] })), component.props.socialLinks && component.props.socialLinks.length > 0 && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "flex space-x-4 mb-4 ".concat(component.props.contentAlignment === 'left' ? 'justify-start' : component.props.contentAlignment === 'right' ? 'justify-end' : 'justify-center') }, { children: component.props.socialLinks.map(function (link, index) { return ((0, jsx_runtime_1.jsxs)("a", __assign({ href: link.url, className: "inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors", target: "_blank", rel: "noopener noreferrer" }, { children: [(0, jsx_runtime_1.jsx)("img", { src: link.imageUrl || '#', alt: link.title || link.platform || 'Social Link', className: "w-5 h-5", style: {
                                            filter: (link.imageUrl && link.imageUrl.includes('simple-icons'))
                                                ? "brightness(0) saturate(100%) invert(0.6) sepia(0) saturate(0) hue-rotate(0deg) brightness(0.8) contrast(1)"
                                                : 'none'
                                        } }), (0, jsx_runtime_1.jsx)("span", __assign({ className: "text-sm font-medium" }, { children: link.title || link.platform || 'Social Link' }))] }), index)); }) }))), component.props.unsubscribeText && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "".concat(component.props.contentAlignment === 'left' ? 'text-left' : component.props.contentAlignment === 'right' ? 'text-right' : 'text-center') }, { children: (0, jsx_runtime_1.jsx)("a", __assign({ href: "#", className: "text-sm text-gray-500 hover:text-gray-700 underline" }, { children: component.props.unsubscribeText })) })))] })));
            case 'spacer':
                return ((0, jsx_runtime_1.jsx)("div", { className: "w-full", style: { height: component.props.height || '20px' } }));
            case 'socialMedia':
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "w-full", style: {
                        backgroundColor: component.props.backgroundColor || 'transparent',
                        padding: component.props.padding || '5px'
                    } }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "flex justify-center", style: {
                            flexDirection: component.props.alignment === 'vertical' ? 'column' : 'row',
                            gap: component.props.spacing || '16px',
                            alignItems: 'center'
                        } }, { children: component.props.platforms && component.props.platforms.map(function (platform, index) { return ((0, jsx_runtime_1.jsxs)("a", __assign({ href: platform.url, className: "inline-flex items-center justify-center transition-transform hover:scale-110", style: {
                                color: platform.color,
                                width: component.props.iconSize || '24px',
                                height: component.props.iconSize || '24px'
                            }, target: "_blank", rel: "noopener noreferrer" }, { children: [platform.platform === 'Facebook' && ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-full h-full", fill: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" }) }))), platform.platform === 'Twitter' && ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-full h-full", fill: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.665 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" }) }))), platform.platform === 'Instagram' && ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-full h-full", fill: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.875-1.418-2.026-1.418-3.323s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323z" }) }))), platform.platform === 'LinkedIn' && ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-full h-full", fill: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) }))), platform.platform === 'YouTube' && ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-full h-full", fill: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }) }))), platform.platform === 'TikTok' && ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-full h-full", fill: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" }) }))), platform.platform === 'Pinterest' && ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-full h-full", fill: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.875-1.418-2.026-1.418-3.323s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323z" }) }))), platform.platform === 'Snapchat' && ((0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-full h-full", fill: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.875-1.418-2.026-1.418-3.323s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323z" }) })))] }), index)); }) })) })));
            default:
                return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "w-full py-4 px-6 text-center text-gray-500" }, { children: ["Unknown component type: ", component.type] })));
        }
    };
    var handleDragEnd = function (result) {
        if (!result.destination)
            return;
        var sourceIndex = result.source.index;
        var destinationIndex = result.destination.index;
        if (sourceIndex !== destinationIndex) {
            moveComponent(result.draggableId, destinationIndex);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "p-6 pt-2" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "mb-4" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "border-b border-gray-200" }, { children: (0, jsx_runtime_1.jsxs)("nav", __assign({ className: "-mb-px flex space-x-8" }, { children: [(0, jsx_runtime_1.jsxs)("button", __assign({ onClick: function () { return setActiveTab('editor'); }, className: "py-2 px-1 border-b-2 font-medium text-sm transition-colors ".concat(activeTab === 'editor'
                                    ? 'border-primary-500 text-primary-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300') }, { children: [(0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-4 h-4 mr-2 inline", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) })), "Editor"] })), (0, jsx_runtime_1.jsxs)("button", __assign({ onClick: function () { return setActiveTab('pc'); }, disabled: template.components.length === 0, className: "py-2 px-1 border-b-2 font-medium text-sm transition-colors ".concat(activeTab === 'pc'
                                    ? 'border-primary-500 text-primary-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed') }, { children: [(0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-4 h-4 mr-2 inline", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) })), "Desktop"] })), (0, jsx_runtime_1.jsxs)("button", __assign({ onClick: function () { return setActiveTab('mobile'); }, disabled: template.components.length === 0, className: "py-2 px-1 border-b-2 font-medium text-sm transition-colors ".concat(activeTab === 'mobile'
                                    ? 'border-primary-500 text-primary-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed') }, { children: [(0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-4 h-4 mr-2 inline", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" }) })), "Mobile"] }))] })) })) })), activeTab === 'editor' && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "flex justify-center" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ ref: drop, className: "min-h-[600px] border-2 border-dashed border-gray-300 w-[700px] cursor-pointer", style: {
                        backgroundColor: template.settings.backgroundColor || 'transparent',
                    } }, { children: template.components.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col items-center justify-center h-full py-20" }, { children: [(0, jsx_runtime_1.jsx)("svg", __assign({ className: "w-16 h-16 text-gray-300 mb-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" }) })), (0, jsx_runtime_1.jsx)("h3", __assign({ className: "text-lg font-medium text-gray-900 mb-2" }, { children: "Start building your email" })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-gray-500 text-center max-w-sm" }, { children: "Drag components from the left sidebar to start creating your email template" })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "mt-8" }, { children: (0, jsx_runtime_1.jsx)(DropZone_1.DropZone, { index: 0, onDrop: function (type, index) {
                                        var defaultProps = getDefaultProps(type);
                                        insertComponentAt(type, index, defaultProps);
                                    } }) }))] }))) : ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "p-4 space-y-1" }, { children: [template.components.map(function (component, index) { return ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [index === 0 && ((0, jsx_runtime_1.jsx)(DropZone_1.DropZone, { index: 0, onDrop: function (type, index) {
                                            var defaultProps = getDefaultProps(type);
                                            insertComponentAt(type, index, defaultProps);
                                        } })), (0, jsx_runtime_1.jsx)(DraggableComponent_1.DraggableComponent, { component: component, index: index, onClick: function () { return handleComponentClick(component); }, isSelected: (selectedComponent === null || selectedComponent === void 0 ? void 0 : selectedComponent.id) === component.id, onMove: moveComponent, onDelete: deleteComponent }), (0, jsx_runtime_1.jsx)(DropZone_1.DropZone, { index: index + 1, onDrop: function (type, index) {
                                            var defaultProps = getDefaultProps(type);
                                            insertComponentAt(type, index, defaultProps);
                                        } })] }, component.id)); }), (0, jsx_runtime_1.jsx)(DropZone_1.DropZone, { index: template.components.length, onDrop: function (type, index) {
                                    var defaultProps = getDefaultProps(type);
                                    insertComponentAt(type, index, defaultProps);
                                } })] }))) })) }))), activeTab === 'pc' && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "min-h-[600px]" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "flex justify-center" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ style: {
                            width: template.settings.width || '600px',
                            backgroundColor: template.settings.backgroundColor || 'transparent',
                            fontFamily: template.settings.fontFamily || 'Arial, sans-serif',
                        } }, { children: template.components.length === 0 ? ((0, jsx_runtime_1.jsx)("div", __assign({ className: "py-20 text-center text-gray-500" }, { children: "Add components in the Editor tab to see preview" }))) : (template.components.map(function (component, index) { return ((0, jsx_runtime_1.jsx)("div", { children: renderPreviewComponent(component) }, "".concat(component.id, "-").concat(index))); })) })) })) }))), activeTab === 'mobile' && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "min-h-[600px]" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "flex justify-center" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ style: {
                            maxWidth: '375px',
                            backgroundColor: template.settings.backgroundColor || 'transparent',
                            fontFamily: template.settings.fontFamily || 'Arial, sans-serif',
                        } }, { children: template.components.length === 0 ? ((0, jsx_runtime_1.jsx)("div", __assign({ className: "py-20 text-center text-gray-500" }, { children: "Add components in the Editor tab to see preview" }))) : (template.components.map(function (component, index) { return ((0, jsx_runtime_1.jsx)("div", { children: renderPreviewComponent(component) }, "".concat(component.id, "-").concat(index))); })) })) })) })))] })));
};
exports.Builder = Builder;
