// Chart.js Helper Helpers for ERP Dashboards

export const Charts = {
  instances: {},

  destroy(canvasId) {
    if (this.instances[canvasId]) {
      this.instances[canvasId].destroy();
      delete this.instances[canvasId];
    }
  },

  renderLineChart(canvasId, labels, datasets, options = {}) {
    this.destroy(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: datasets.map(d => ({
          tension: 0.35,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
          ...d
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 12,
              font: { size: 11, family: 'Inter' },
              color: '#42526E'
            }
          },
          tooltip: {
            backgroundColor: '#172B4D',
            titleFont: { size: 12, family: 'Inter', weight: 'bold' },
            bodyFont: { size: 11, family: 'Inter' },
            padding: 8,
            cornerRadius: 4
          }
        },
        scales: {
          x: {
            grid: { color: '#EBECF0' },
            ticks: { color: '#6B778C', font: { size: 10, family: 'Inter' } }
          },
          y: {
            grid: { color: '#EBECF0' },
            ticks: { color: '#6B778C', font: { size: 10, family: 'Inter' } }
          }
        },
        ...options
      }
    });

    this.instances[canvasId] = chart;
    return chart;
  },

  renderBarChart(canvasId, labels, datasets, options = {}) {
    this.destroy(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 12,
              font: { size: 11, family: 'Inter' },
              color: '#42526E'
            }
          },
          tooltip: {
            backgroundColor: '#172B4D',
            padding: 8,
            cornerRadius: 4
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#6B778C', font: { size: 10 } }
          },
          y: {
            grid: { color: '#EBECF0' },
            ticks: { color: '#6B778C', font: { size: 10 } }
          }
        },
        ...options
      }
    });

    this.instances[canvasId] = chart;
    return chart;
  },

  renderDonutChart(canvasId, labels, data, bgColors, options = {}) {
    this.destroy(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: bgColors || ['#0284C7', '#36B37E', '#0EA5E9', '#6554C0', '#00B8D9'],
          borderWidth: 2,
          borderColor: '#FFFFFF'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 10,
              font: { size: 11, family: 'Inter' },
              color: '#42526E'
            }
          }
        },
        ...options
      }
    });

    this.instances[canvasId] = chart;
    return chart;
  }
};
