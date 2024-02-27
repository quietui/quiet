import { customElementVsCodePlugin } from 'custom-element-vs-code-integration';
import { parse } from 'comment-parser';
import { readFileSync } from 'fs';

const packageData = JSON.parse(readFileSync('./package.json', 'utf8'));
const { name, description, version, author, homepage, license } = packageData;
const outdir = 'dist';

export default {
  globs: ['src/components/**/*.ts'],
  exclude: ['**/*.styles.ts', '**/*.test.ts'],
  litelement: true,
  outdir,
  packagejson: false,
  plugins: [
    // Append package data
    {
      name: 'append-package-data',
      packageLinkPhase({ customElementsManifest }) {
        customElementsManifest.package = { name, description, version, author, homepage, license };
      }
    },

    // Parse custom jsDoc tags
    {
      name: 'parse-custom-tags',
      analyzePhase({ ts, node, moduleDoc }) {
        switch (node.kind) {
          case ts.SyntaxKind.ClassDeclaration: {
            const className = node.name.getText();
            const classDoc = moduleDoc?.declarations?.find(declaration => declaration.name === className);
            const customTags = ['dependency', 'documentation', 'since', 'state', 'status', 'title'];
            let customComments = '/**';

            node.jsDoc?.forEach(jsDoc => {
              jsDoc?.tags?.forEach(tag => {
                const tagName = tag.tagName.getText();

                if (customTags.includes(tagName)) {
                  customComments += `\n * @${tagName} ${tag.comment}`;
                }
              });
            });

            const parsed = parse(`${customComments}\n */`);
            parsed[0].tags?.forEach(t => {
              switch (t.tag) {
                // Dependencies
                case 'dependency':
                  if (!Array.isArray(classDoc['dependencies'])) {
                    classDoc['dependencies'] = [];
                  }
                  classDoc['dependencies'].push(t.name);
                  break;

                case 'state':
                  if (!Array.isArray(classDoc['states'])) {
                    classDoc['states'] = [];
                  }
                  classDoc['states'].push({
                    name: t.name,
                    description: t.description.replace(/^-/, '')
                  });
                  break;

                // Value-only metadata tags
                case 'documentation':
                case 'since':
                case 'status':
                  classDoc[t.tag] = t.name;
                  break;

                // All other tags
                default:
                  if (!Array.isArray(classDoc[t.tag])) {
                    classDoc[t.tag] = [];
                  }

                  classDoc[t.tag].push({
                    name: t.name,
                    description: t.description,
                    type: t.type || undefined
                  });
              }
            });
          }
        }
      }
    },

    // Custom data for VS Code
    customElementVsCodePlugin({
      outdir,
      cssFileName: null,
      referencesTemplate: (_, tag) => [
        {
          name: 'Documentation',
          url: `https://quietui.com/components/${tag.replace('quiet-', '')}`
        }
      ]
    })
  ]
};
