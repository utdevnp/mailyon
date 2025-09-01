"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEmailExport = void 0;
var builderStore_1 = require("../store/builderStore");
var mjmlExport_1 = require("../utils/mjmlExport");
var useEmailExport = function () {
    var _a = (0, builderStore_1.useBuilderStore)(), template = _a.template, exportJSON = _a.exportJSON, exportMJML = _a.exportMJML;
    // Export as JSON string
    var exportAsJSON = function () {
        return exportJSON();
    };
    // Export as MJML string
    var exportAsMJML = function () {
        return exportMJML();
    };
    // Export as HTML string
    var exportAsHTML = function () {
        try {
            var mjml = exportMJML();
            var html = (0, mjmlExport_1.convertMJMLToHTML)(mjml);
            return html;
        }
        catch (error) {
            console.error('HTML export error:', error);
            return "<div style=\"color: red; padding: 20px;\">Error generating HTML. Please check your template.</div>";
        }
    };
    // Export complete template with all formats
    var exportComplete = function () {
        return (0, mjmlExport_1.exportEmailTemplate)(template);
    };
    // Download functions
    var downloadJSON = function (filename) {
        if (filename === void 0) { filename = 'email-template.json'; }
        var json = exportAsJSON();
        downloadFile(json, filename, 'application/json');
    };
    var downloadHTML = function (filename) {
        if (filename === void 0) { filename = 'email-template.html'; }
        var html = exportAsHTML();
        downloadFile(html, filename, 'text/html');
    };
    var downloadMJML = function (filename) {
        if (filename === void 0) { filename = 'email-template.mjml'; }
        var mjml = exportAsMJML();
        downloadFile(mjml, filename, 'text/plain');
    };
    return {
        // Export functions
        exportAsJSON: exportAsJSON,
        exportAsMJML: exportAsMJML,
        exportAsHTML: exportAsHTML,
        exportComplete: exportComplete,
        // Download functions
        downloadJSON: downloadJSON,
        downloadHTML: downloadHTML,
        downloadMJML: downloadMJML,
        // Current template
        template: template,
    };
};
exports.useEmailExport = useEmailExport;
// Helper function to download files
var downloadFile = function (content, filename, mimeType) {
    var blob = new Blob([content], { type: mimeType });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
