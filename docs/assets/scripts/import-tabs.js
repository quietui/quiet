function restore() {
  const importTabs = document.getElementById('import-tabs');
  if (importTabs) {
    importTabs.setAttribute('tab', localStorage.getItem('import-tab') || 'cdn');
  }
}

function save(tab) {
  localStorage.setItem('import-tab', tab);
}

// Listen for tab clicks
document.addEventListener('click', async event => {
  const importTabs = event.target.closest('#import-tabs');
  if (!importTabs) return;
  await importTabs.updateComplete;
  save(importTabs.tab);
});

// Restore it on page load
document.addEventListener('turbo:load', restore);
document.addEventListener('turbo:render', restore);
