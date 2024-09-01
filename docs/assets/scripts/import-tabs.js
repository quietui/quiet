const tabs = document.getElementById('import-tabs');

// Remember the selected tab when it changes
tabs.addEventListener('quiet-tab-shown', event => {
  localStorage.setItem('import-tab', event.detail.tab.panel);
});

// Restore it on page load
tabs.setAttribute('tab', localStorage.getItem('import-tab') || 'cdn');
