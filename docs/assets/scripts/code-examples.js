document.addEventListener('click', event => {
  const toggle = event.target?.closest('.code-example-toggle');
  const pen = event.target?.closest('.code-example-pen');
  const dir = event.target?.closest('.code-example-dir');

  // Toggle source
  if (toggle) {
    const codeExample = toggle.closest('.code-example');
    const isOpen = !codeExample.classList.contains('open');

    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    codeExample.classList.toggle('open', isOpen);
  }

  // Directionality
  if (dir) {
    const codeExample = dir.closest('.code-example');
    const preview = codeExample.querySelector('.code-example-preview');

    preview.dir = preview.dir === 'rtl' ? 'ltr' : 'rtl';
  }

  // Edit in CodePen
  if (pen) {
    const codeExample = pen.closest('.code-example');
    const code = codeExample.querySelector('code');
    const version = document.documentElement.dataset.version;
    const html =
      `<script type="module" src="https://cdn.jsdelivr.net/npm/@quietui/quiet@${version}/dist/quiet.loader.js"></script>` +
      `\n\n` +
      `${code.textContent}`;
    const css = 'body {\n  font: 16px sans-serif;\n  padding: 1rem;\n}\n';
    const js = '';

    const form = document.createElement('form');
    form.action = 'https://codepen.io/pen/define';
    form.method = 'POST';
    form.target = '_blank';

    const data = {
      title: '',
      description: '',
      tags: ['quietui', 'custom elements', 'web-components'],
      editors: '1000',
      head: '<meta name="viewport" content="width=device-width">',
      html_classes: '',
      css_external: '',
      js_external: '',
      js_module: true,
      js_pre_processor: 'none',
      html,
      css,
      js
    };

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'data';
    input.value = JSON.stringify(data);
    form.append(input);

    document.documentElement.append(form);
    form.submit();
    form.remove();
  }
});
