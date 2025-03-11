import { writeFileSync } from 'fs';
import { mkdir, rm } from 'fs/promises';
import { join } from 'path';
import { getComponents } from '../docs/_utils/manifest.js';

const distDir = 'dist/llm';
const preamble = `
Quiet UI (https://quietui.org/) is a modern UI library containing the following web components (custom elements). All
components use shadow DOM. The form controls are form-associated elements that follow patterns from the Constraint
Validation API. Use the documentation below to learn how to use Quiet components in an HTML environment.
`.trim();

// Helper function to convert PascalCase to Title Case
function toTitleCase(str) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/^./, str => str.toUpperCase());
}

// Helper function to remove newlines from text
function removeNewlines(str) {
  return str ? str.replace(/\n/g, ' ') : str;
}

// Script to output component details to separate files and generate an index
function generateFiles() {
  const components = getComponents();
  let indexOutput = `${preamble}\n\n`;

  components.forEach(component => {
    const titleCaseName = toTitleCase(component.name);
    const fileName = `${component.tagName}.txt`; // e.g., button-group.txt
    const filePath = join(distDir, fileName);
    let componentOutput = `${titleCaseName} <${component.tagName}>\n`;
    componentOutput += `  Description: ${removeNewlines(component.summary) || 'No description available.'}\n`;

    // Slots
    componentOutput += `  Slots: ${component.slots?.length ? '' : 'None'}\n`;
    if (component.slots?.length) {
      component.slots.forEach(slot => {
        componentOutput += `    ${slot.name ? `"${slot.name}"` : '(default)'}: ${removeNewlines(slot.description)}\n`;
      });
    }

    // Properties + Attributes
    componentOutput += `  Properties + Attributes: ${component.properties?.length ? '' : 'None'}\n`;
    if (component.properties?.length) {
      component.properties.forEach(prop => {
        const attr = prop.attribute && prop.attribute !== prop.name ? ` (attribute: "${prop.attribute}")` : '';
        componentOutput += `    ${prop.name}${attr}: ${removeNewlines(prop.description)} (Type: ${removeNewlines(prop.type?.text) || ''}${prop.default ? `, Default: ${prop.default}` : ''})\n`;
      });
    }

    // Methods
    componentOutput += `  Methods: ${component.methods?.length ? '' : 'None'}\n`;
    if (component.methods?.length) {
      component.methods.forEach(method => {
        const params = method.parameters?.length
          ? `(${method.parameters.map(p => `${p.name}: ${removeNewlines(p.type?.text) || ''}`).join(', ')})`
          : '()';
        componentOutput += `    ${method.name}${params}: ${removeNewlines(method.description)}\n`;
      });
    }

    // Events
    componentOutput += `  Events: ${component.events?.length ? '' : 'None'}\n`;
    if (component.events?.length) {
      component.events.forEach(event => {
        if (event.name) {
          componentOutput += `    "${event.name}": ${removeNewlines(event.description) || 'No description available.'}\n`;
        }
      });
    }

    // Custom Properties
    componentOutput += `  Custom Properties: ${component.cssProperties?.length ? '' : 'None'}\n`;
    if (component.cssProperties?.length) {
      component.cssProperties.forEach(cssProp => {
        componentOutput += `    ${cssProp.name}: ${removeNewlines(cssProp.description)}${cssProp.default ? ` (Default: ${cssProp.default})` : ''}\n`;
      });
    }

    // CSS Parts
    componentOutput += `  CSS Parts: ${component.cssParts?.length ? '' : 'None'}\n`;
    if (component.cssParts?.length) {
      component.cssParts.forEach(part => {
        componentOutput += `    ${part.name}: ${removeNewlines(part.description)}\n`;
      });
    }

    // Custom States
    componentOutput += `  Custom States: ${component.cssStates?.length ? '' : 'None'}\n`;
    if (component.cssStates?.length) {
      component.cssStates.forEach(state => {
        componentOutput += `    ${state.name}: ${removeNewlines(state.description)}\n`;
      });
    }

    // Write individual component file
    writeFileSync(filePath, componentOutput.trim(), 'utf8');

    // Add to index with description
    indexOutput += `${titleCaseName} <${component.tagName}>\n`;
    indexOutput += `  Description: ${removeNewlines(component.summary) || 'No description available.'}\n`;
    indexOutput += `  See ${fileName}\n\n`;
  });

  // Write index file
  const indexPath = join(distDir, 'index.txt');
  writeFileSync(indexPath, indexOutput.trim(), 'utf8');
}

// Cleanup the directory
await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

// Generate the files
generateFiles();
