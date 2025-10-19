---
layout: page
---

<div id="c1"></div>
<div id="c2"></div>
<div id="c3"></div>

<script type="module">
  import { burrow, html, state } from '/dist/burrow.js';
  
  // Create local state for this burrow
  const data = state({
    count: 0,
    message: 'WELCOME TO NBA JAM'
  });
  
  function handleClick() {
    data.count++;
    if (data.count >= 2) {
      data.message = 'HE’S HEATING UP';
    }
    if (data.count >= 3) {
      data.message = 'HE’S ON FIRE!';
    }
  }
  
  const b = burrow(() => html`
    <button @click=${handleClick}>
      Clicks: ${data.count}
    </button>
    
    <p style="margin-block-start: 1rem;">${data.message}</p>
  `, {
    host: 'c1'
  });
</script>
