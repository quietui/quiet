function restore() {
  const importTabLists = document.querySelectorAll('.import-tabs');

  importTabLists.forEach(tabList => {
    tabList.setAttribute('tab', localStorage.getItem('import-tab') || 'cdn');
  });
}

function save(tab) {
  localStorage.setItem('import-tab', tab);
}

// Listen for tab clicks
document.addEventListener('click', async event => {
  const importTabs = event.target.closest('.import-tabs');
  console.log(importTabs);
  if (!importTabs) return;
  await importTabs.updateComplete;
  save(importTabs.tab);
});

// Restore it on page load
document.addEventListener('turbo:load', restore);
document.addEventListener('turbo:render', restore);
