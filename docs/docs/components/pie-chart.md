---
title: Pie Chart
layout: component
---

```html {.example}
<quiet-pie-chart
  chart-title="Monthly Sales" 
  legend-position="left"
  with-animation
  with-tooltips
  style="max-width: 500px; margin-inline: auto;"
  id="chart__overview"
>
</quiet-pie-chart>

<script>
  const chart = document.getElementById('chart__overview');
  chart.data = [300, 150, 100, 75, 125, 85];
  chart.labels = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Product F'];
</script>
```

## Drawbacks and notes about Chart.js

- Lots of computation to parse custom properties (and they also aren't reactive to changes)
- Hard to configure things, especially fonts
- Customizing the tooltip content is tricky. Sometimes you want a formatted value. Sometimes you want values. Sometimes percentages. Sometimes both. This should probably be a formatter function.
