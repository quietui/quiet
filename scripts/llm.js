import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { getComponents } from '../docs/_utils/manifest.js';
import { distDir, rootDir } from './utils.js';

const packageData = JSON.parse(await readFile(join(rootDir, 'package.json'), 'utf-8'));
const version = packageData.version;

// Optional links configuration
const optionalLinks = [
  { title: 'Documentation', description: "The project's website.", url: 'https://quietui.org/' },
  {
    title: 'Theming & Design Tokens',
    description:
      "Theme documentation, including details about light/dark color schemes and a comprehensive list of design tokens (as CSS custom properties) to learn how to customize the library's overall appearance.",
    url: 'https://quietui.org/docs/theming'
  },
  {
    title: 'Quiet Restyle',
    description: "An opinionated CSS reset you can use with or without Quiet's components.",
    url: 'https://quietui.org/docs/restyle'
  },
  {
    title: 'GitHub Repository',
    description: 'Source code and development information',
    url: 'https://github.com/quietui/quiet'
  },
  { title: 'X / Twitter', description: 'Follow the project on X', url: 'https://x.com/quiet_ui' },
  { title: 'Bluesky', description: 'Follow the project on Bluesky', url: 'https://bsky.app/profile/quietui.org' }
];

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

/**
 * Generates the llms.txt file, based on https://llmstxt.org/
 */
async function generateFiles() {
  const components = getComponents();

  // H1 title (required)
  let output = `# Quiet UI\n\n`;

  // Blockquote summary
  output += `> ${packageData.description}\n\n`;

  // Optional details section
  output += `
Quiet UI provides a comprehensive set of accessible, customizable web components for building modern web applications.
All of its custom elements use shadow DOM. Its form controls are form-associated elements that follow native form
control patterns such as the Constraint Validation API.

The current version of Quiet UI is: ${version}

Quiet offers an optional, opinionated, classless CSS reset called Quiet Restyle that's good for building out new
websites and apps.

The default icon library is Tabler: https://tabler.io/icons

When installing Quiet, follow the instructions on https://quietui.org/docs/ to install the components, theme, and the
optional CSS reset. Users can install the library using the Autoloader via CDN (recommended) or via npm (bundlers and
advanced use cases).

\n`.trimStart();

  // Components section
  output += `## Components\n\n`;

  components.forEach(component => {
    const titleCaseName = toTitleCase(component.name);
    const tagWithoutPrefix = component.tagName.replace(/^quiet-/, '');

    output += `- [${titleCaseName}](https://quietui.org/docs/components/${tagWithoutPrefix}): ${removeNewlines(component.summary) || 'No description available.'}\n`;
  });

  output += `\n## Optional\n\n`;

  // Add optional/secondary documentation links
  optionalLinks.forEach(link => {
    output += `- [${link.title}](${link.url}): ${link.description}\n`;
  });

  output += '\n';

  // Detailed API documentation for each component
  components.forEach(component => {
    const tagWithoutPrefix = component.tagName.replace(/^quiet-/, '');

    output += `### \`<${component.tagName}>\`\n\n`;
    output += `**Description:** ${removeNewlines(component.summary) || 'No description available.'}\n\n`;
    output += `**Documentation:** https://quietui.org/docs/components/${tagWithoutPrefix}\n\n`;

    // Slots
    if (component.slots?.length) {
      output += `**Slots:**\n`;
      component.slots.forEach(slot => {
        output += `- \`${slot.name || '(default)'}\`: ${removeNewlines(slot.description)}\n`;
      });
      output += `\n`;
    }

    // Properties + Attributes
    if (component.properties?.length) {
      output += `**Properties:**\n`;
      component.properties.forEach(prop => {
        const attr = prop.attribute && prop.attribute !== prop.name ? ` (attribute: \`${prop.attribute}\`)` : '';
        output += `- \`${prop.name}\`${attr}: ${removeNewlines(prop.description)} (Type: \`${removeNewlines(prop.type?.text) || 'unknown'}\`${prop.default ? `, Default: \`${prop.default}\`` : ''})\n`;
      });
      output += `\n`;
    }

    // Methods
    if (component.methods?.length) {
      output += `**Methods:**\n`;
      component.methods.forEach(method => {
        const params = method.parameters?.length
          ? `(${method.parameters.map(p => `${p.name}: ${removeNewlines(p.type?.text) || 'unknown'}`).join(', ')})`
          : '()';
        output += `- \`${method.name}${params}\`: ${removeNewlines(method.description)}\n`;
      });
      output += `\n`;
    }

    // Events
    if (component.events?.length) {
      output += `**Events:**\n`;
      component.events.forEach(event => {
        if (event.name) {
          output += `- \`${event.name}\`: ${removeNewlines(event.description) || 'No description available.'}\n`;
        }
      });
      output += `\n`;
    }

    // Custom Properties
    if (component.cssProperties?.length) {
      output += `**CSS Custom Properties:**\n`;
      component.cssProperties.forEach(cssProp => {
        output += `- \`${cssProp.name}\`: ${removeNewlines(cssProp.description)}${cssProp.default ? ` (Default: \`${cssProp.default}\`)` : ''}\n`;
      });
      output += `\n`;
    }

    // CSS Parts
    if (component.cssParts?.length) {
      output += `**CSS Parts:**\n`;
      component.cssParts.forEach(part => {
        output += `- \`${part.name}\`: ${removeNewlines(part.description)}\n`;
      });
      output += `\n`;
    }

    // Custom States
    if (component.cssStates?.length) {
      output += `**CSS Custom States:**\n`;
      component.cssStates.forEach(state => {
        output += `- \`${state.name}\`: ${removeNewlines(state.description)}\n`;
      });
      output += `\n`;
    }
  });

  // Write single file
  const filePath = join(distDir, 'llms.txt');
  await writeFile(filePath, output.trim(), 'utf8');
}

// Execute the main function
generateFiles().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
