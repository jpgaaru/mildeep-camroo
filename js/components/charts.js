// Chart.js Helper Helpers for ERP Dashboards (AquaPulse Architecture)

export const CHART_PALETTE = {
  tealPrimary: '#00A4B7',
  tealDark: '#006C7A',
  tealDeep: '#005662',
  tealLight: '#4FCFE0',
  tealSoft: '#84DFEB',
  tealTonal: ['#006C7A', '#00A4B7', '#1ABDD2', '#4FCFE0', '#84DFEB'],
  emerald: '#056A38',
  amber: '#D97706',
  ruby: '#B5152B',
  slate: '#475569'
};

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
        datasets: datasets.map((d, idx) => ({
          tension: 0.35,
          borderWidth: 2.5,
          pointRadius: 3,
          pointHoverRadius: 6,
          borderColor: d.borderColor || CHART_PALETTE.tealTonal[idx % CHART_PALETTE.tealTonal.length],
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
              font: { size: 11.5, weight: '600' },
              color: '#475569',
              padding: 12
            }
          },
          tooltip: {
            backgroundColor: '#0F172A',
            titleColor: '#FFFFFF',
            bodyColor: '#F8FAFC',
            titleFont: { size: 12, weight: 'bold' },
            bodyFont: { size: 11 },
            padding: 10,
            cornerRadius: 8,
            boxPadding: 4,
            borderWidth: 1,
            borderColor: '#334155'
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#64748B', font: { size: 10.5 } }
          },
          y: {
            grid: { color: '#F1F5F9' },
            ticks: { color: '#64748B', font: { size: 10.5 } }
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
      data: {
        labels,
        datasets: datasets.map((d, idx) => ({
          borderRadius: 6,
          backgroundColor: d.backgroundColor || CHART_PALETTE.tealTonal[idx % CHART_PALETTE.tealTonal.length],
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
              font: { size: 11.5, weight: '600' },
              color: '#475569',
              padding: 12
            }
          },
          tooltip: {
            backgroundColor: '#0F172A',
            titleColor: '#FFFFFF',
            bodyColor: '#F8FAFC',
            titleFont: { size: 12, weight: 'bold' },
            bodyFont: { size: 11 },
            padding: 10,
            cornerRadius: 8,
            borderWidth: 1,
            borderColor: '#334155'
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#64748B', font: { size: 10.5 } }
          },
          y: {
            grid: { color: '#F1F5F9' },
            ticks: { color: '#64748B', font: { size: 10.5 } }
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
          backgroundColor: bgColors || CHART_PALETTE.tealTonal,
          borderWidth: 2,
          borderColor: '#FFFFFF'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 10,
              font: { size: 11.5, weight: '600' },
              color: '#475569',
              padding: 10
            }
          },
          tooltip: {
            backgroundColor: '#0F172A',
            titleColor: '#FFFFFF',
            bodyColor: '#F8FAFC',
            padding: 10,
            cornerRadius: 8,
            borderWidth: 1,
            borderColor: '#334155'
          }
        },
        ...options
      }
    });

    this.instances[canvasId] = chart;
    return chart;
  }
};
