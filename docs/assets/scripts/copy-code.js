function setCopyData() {
  document.querySelectorAll('.copy-button').forEach(copyButton => {
    const pre = copyButton.closest('pre');
    const code = pre?.querySelector('code');

    if (code) {
      copyButton.data = code.textContent;
    }
  });
}

// Set data for all copy buttons when the page loads
setCopyData();

document.addEventListener('turbo:load', setCopyData);
