---
layout: page
---

<div id="c1"></div>
<div id="c2"></div>

<script type="module">
  import { burrow, html, state } from '/dist/burrow.js';
  
  // Create local state for this burrow
  const data = state({
    message: 'WELCOME TO NBA JAM',
    count: 0
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
  
  function resetClick() {
    data.message = 'WELCOME TO NBA JAM';
    data.count = 0;
  }
  
  // C1
  burrow(() => html`
    <div style="border: solid 2px dodgerblue; padding: 1rem; margin-block-start: 2rem;">
      <button @click=${handleClick}>
        Clicks: ${data.count}
      </button>
      
      <p style="margin-block-start: 1rem;">${data.message}</p>
    </div>
  `, {
    host: 'c1'
  });
  
  // C2
  burrow(() => html`
    <div style="border: solid 2px dodgerblue; padding: 1rem; margin-block-start: 2rem;">
      <button @click=${resetClick} ?disabled=${data.count === 0}>
        Reset clicks
      </button>
      
      <p style="margin-block-start: 1rem;">Total count: ${data.count}</p>
    </div>
  `, {
    host: 'c2'
  });  
</script>
