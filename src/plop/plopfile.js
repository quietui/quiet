export default function (plop) {
  plop.setHelper('removePrefix', tag => tag.replace(/^quiet-/, ''));

  plop.setHelper('tagToClassName', tag => {
    const properCase = plop.getHelper('properCase');
    return properCase(tag.replace(/-/g, ' '));
  });

  plop.setHelper('tagToTitleCase', tag => {
    const removePrefix = plop.getHelper('removePrefix');
    const titleCase = plop.getHelper('titleCase');
    return titleCase(removePrefix(tag).replace(/-/g, ' '));
  });

  plop.setGenerator('component', {
    description: `Create a new component`,
    prompts: [
      {
        type: 'input',
        name: 'tag',
        message: `What's the tag name? (e.g. quiet-button)`,
        validate: value => {
          // Start with quiet- and include only a-z + dashes
          if (!/^quiet-[a-z-+]+/.test(value)) {
            return false;
          }

          // Don't allow
          if (value.includes('--') || value.endsWith('-')) {
            return false;
          }

          return true;
        }
      }
    ],
    actions: [
      // Component
      {
        type: 'add',
        path: '../../src/components/{{ removePrefix tag }}/{{ removePrefix tag }}.ts',
        templateFile: './component/component.hbs'
      },
      // Styles
      {
        type: 'add',
        path: '../../src/components/{{ removePrefix tag }}/{{ removePrefix tag }}.styles.ts',
        templateFile: './component/component.styles.hbs'
      },
      // Tests
      {
        type: 'add',
        path: '../../src/components/{{ removePrefix tag }}/{{ removePrefix tag }}.test.ts',
        templateFile: './component/component.test.hbs'
      },
      // Docs
      {
        type: 'add',
        path: '../../docs/docs/components/{{ removePrefix tag }}.md',
        templateFile: './component/docs.hbs'
      },
      // Sidebar
      {
        type: 'modify',
        path: '../../docs/_includes/sidebar.njk',
        pattern: /\{# PLOP_NEW_COMPONENT_PLACEHOLDER #\}/,
        template: `<li><a href="/docs/components/{{ removePrefix tag }}">{{ tagToTitleCase tag }}</a></li>\n  {# PLOP_NEW_COMPONENT_PLACEHOLDER #}`
      }
    ]
  });
}
