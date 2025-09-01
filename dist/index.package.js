"use strict";
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateBuilder = exports.convertMJMLToHTML = exports.generateMJML = exports.exportEmailTemplate = exports.useEmailTemplateManager = exports.useEmailExport = exports.useEmailTemplateBuilder = exports.DraggableComponent = exports.ComponentRenderer = exports.Toolbar = exports.Inspector = exports.ComponentLibrary = exports.Builder = exports.useBuilderStore = void 0;
// Main package exports
var builderStore_1 = require("./store/builderStore");
Object.defineProperty(exports, "useBuilderStore", { enumerable: true, get: function () { return builderStore_1.useBuilderStore; } });
__exportStar(require("./types"), exports);
// Component exports (headerless)
var Builder_1 = require("./components/Builder/Builder");
Object.defineProperty(exports, "Builder", { enumerable: true, get: function () { return Builder_1.Builder; } });
var ComponentLibrary_1 = require("./components/ComponentLibrary/ComponentLibrary");
Object.defineProperty(exports, "ComponentLibrary", { enumerable: true, get: function () { return ComponentLibrary_1.ComponentLibrary; } });
var Inspector_1 = require("./components/Inspector/Inspector");
Object.defineProperty(exports, "Inspector", { enumerable: true, get: function () { return Inspector_1.Inspector; } });
var Toolbar_1 = require("./components/Toolbar/Toolbar");
Object.defineProperty(exports, "Toolbar", { enumerable: true, get: function () { return Toolbar_1.Toolbar; } });
var ComponentRenderer_1 = require("./components/Builder/ComponentRenderer");
Object.defineProperty(exports, "ComponentRenderer", { enumerable: true, get: function () { return ComponentRenderer_1.ComponentRenderer; } });
var DraggableComponent_1 = require("./components/Builder/DraggableComponent");
Object.defineProperty(exports, "DraggableComponent", { enumerable: true, get: function () { return DraggableComponent_1.DraggableComponent; } });
// Custom hooks for package users
var useEmailTemplateBuilder_1 = require("./hooks/useEmailTemplateBuilder");
Object.defineProperty(exports, "useEmailTemplateBuilder", { enumerable: true, get: function () { return useEmailTemplateBuilder_1.useEmailTemplateBuilder; } });
var useEmailExport_1 = require("./hooks/useEmailExport");
Object.defineProperty(exports, "useEmailExport", { enumerable: true, get: function () { return useEmailExport_1.useEmailExport; } });
var useEmailTemplateManager_1 = require("./hooks/useEmailTemplateManager");
Object.defineProperty(exports, "useEmailTemplateManager", { enumerable: true, get: function () { return useEmailTemplateManager_1.useEmailTemplateManager; } });
// Utility functions
var mjmlExport_1 = require("./utils/mjmlExport");
Object.defineProperty(exports, "exportEmailTemplate", { enumerable: true, get: function () { return mjmlExport_1.exportEmailTemplate; } });
Object.defineProperty(exports, "generateMJML", { enumerable: true, get: function () { return mjmlExport_1.generateMJML; } });
Object.defineProperty(exports, "convertMJMLToHTML", { enumerable: true, get: function () { return mjmlExport_1.convertMJMLToHTML; } });
// Headerless main component
var EmailTemplateBuilder_1 = require("./components/EmailTemplateBuilder");
Object.defineProperty(exports, "EmailTemplateBuilder", { enumerable: true, get: function () { return __importDefault(EmailTemplateBuilder_1).default; } });
