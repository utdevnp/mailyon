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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inspector = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var builderStore_1 = require("../../store/builderStore");
var TemplateSettings_1 = require("./TemplateSettings");
var ComponentInspector_1 = require("./ComponentInspector");
var CodeExport_1 = require("./CodeExport");
var Inspector = function () {
    var _a = (0, builderStore_1.useBuilderStore)(), selectedComponent = _a.selectedComponent, updateComponent = _a.updateComponent, deleteComponent = _a.deleteComponent, duplicateComponent = _a.duplicateComponent, template = _a.template, updateTemplateSettings = _a.updateTemplateSettings, exportJSON = _a.exportJSON, exportMJML = _a.exportMJML;
    var _b = react_1.default.useState('template'), activeTab = _b[0], setActiveTab = _b[1];
    // Debug logging
    react_1.default.useEffect(function () {
        console.log('Inspector selectedComponent changed:', selectedComponent);
    }, [selectedComponent]);
    // Generate HTML from MJML for perfect styling match
    var generateHTML = function () {
        try {
            var _a = require('../../utils/mjmlExport'), generateMJML = _a.generateMJML, convertMJMLToHTML = _a.convertMJMLToHTML;
            var mjml = generateMJML(template);
            var html = convertMJMLToHTML(mjml);
            return html;
        }
        catch (error) {
            console.error('HTML generation error:', error);
            return "<div style=\"color: red; padding: 20px;\">Error generating HTML. Please check your template.</div>";
        }
    };
    // Copy to clipboard function
    var copyToClipboard = function (text, type) { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, navigator.clipboard.writeText(text)];
                case 1:
                    _a.sent();
                    console.log("".concat(type, " copied to clipboard!"));
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error('Failed to copy: ', err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Tab content for Template & Inspector
    var renderTemplateAndInspector = function () { return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "space-y-2" }, { children: [(0, jsx_runtime_1.jsx)(TemplateSettings_1.TemplateSettings, { template: template, updateTemplateSettings: updateTemplateSettings }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "card p-2" }, { children: (0, jsx_runtime_1.jsx)("div", { children: !selectedComponent ? ((0, jsx_runtime_1.jsx)("p", __assign({ className: "text-gray-500 text-xs" }, { children: "Select a component to edit its properties" }))) : ((0, jsx_runtime_1.jsx)(ComponentInspector_1.ComponentInspector, { selectedComponent: selectedComponent, updateComponent: updateComponent, deleteComponent: deleteComponent, duplicateComponent: duplicateComponent })) }) }))] }))); };
    // Main render function with tabs
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "space-y-2" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex border-b border-gray-200" }, { children: [(0, jsx_runtime_1.jsx)("button", __assign({ onClick: function () { return setActiveTab('template'); }, className: "px-3 py-1.5 text-sm font-medium border-b-2 transition-colors bg-white ".concat(activeTab === 'template'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300') }, { children: "Inspector" })), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: function () { return setActiveTab('code'); }, className: "px-3 py-1.5 text-sm font-medium border-b-2 transition-colors bg-white ".concat(activeTab === 'code'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300') }, { children: "Export" }))] })), activeTab === 'template' ? (renderTemplateAndInspector()) : ((0, jsx_runtime_1.jsx)(CodeExport_1.CodeExport, { template: template, exportJSON: exportJSON, exportMJML: exportMJML, generateHTML: generateHTML, copyToClipboard: copyToClipboard }))] })));
};
exports.Inspector = Inspector;
