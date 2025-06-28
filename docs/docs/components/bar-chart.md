---
title: Bar Chart
layout: component
---

```html {.example}
<quiet-bar-chart 
  title="Monthly Sales"
  color="#e74c3c"
  with-legend
  with-grid
></quiet-bar-chart>

<script>
  // Simple chart
  const chart = document.querySelector('quiet-bar-chart');
  chart.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  chart.values = [10, 20, 15, 25, 30];

  // Complex multi-dataset chart
  chart.data = {
    labels: ['Product A', 'Product B', 'Product C'],
    datasets: [
      {
        label: 'Q1',
        data: [12, 19, 3],
        // backgroundColor: '#3498db'
      },
      {
        label: 'Q2',
        data: [15, 22, 8],
        // backgroundColor: '#e74c3c'
      }
    ]
  };
</script>
```

## Examples

TODO
