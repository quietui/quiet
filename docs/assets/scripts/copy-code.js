const timeouts = new WeakMap();

document.addEventListener('click', event => {
  const copyButton = event.target?.closest('.copy-code');

  // Copy code
  if (copyButton) {
    const pre = copyButton.closest('pre');
    const valueToCopy = pre.querySelector('code').textContent;

    clearTimeout(timeouts.get(copyButton));

    navigator.clipboard
      .writeText(valueToCopy)
      .then(() => {
        copyButton.classList.add('copied');

        const timeout = setTimeout(() => {
          copyButton.classList.remove('copied');
        }, 1000);

        timeouts.set(copyButton, timeout);
      })
      .catch(() => {
        // Failed
        alert(`Your browser has blocked the ability to copy this way. Please use keyboard shortcuts instead.`);
      });
  }
});
