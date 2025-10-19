---
layout: page
---

<div id="abc"></div>

<script type="module">
  import { burrow, html } from '/dist/burrow.js';
  
  function handleClick() {
    console.log('click');
  }

  const b = burrow({
    host: 'abc',
    connect() {
      // Use `this` to access the Burrow instance
      console.log('connected', this.host); 
    },
    disconnect() {
      // Use `this` to access the Burrow instance
      console.log('disconnected', this  );
    }
  }, html`
    <button @click=${handleClick}>
      Click me
    </button>
  `);
</script>
