/* ================================================================
   CHARTS INITIALIZATION — SHADCN UI THEME (YELLOW DESIGN SYSTEM)
   ================================================================ */
Chart.defaults.font.family = "'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
Chart.defaults.font.size = 11;
Chart.defaults.font.weight = '500';
Chart.defaults.color = '#64748B';

// Shadcn Floating Card Tooltip Preset
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(255, 255, 255, 0.98)';
Chart.defaults.plugins.tooltip.titleColor = '#0F172A';
Chart.defaults.plugins.tooltip.titleFont = { family: "'Sora', sans-serif", size: 12, weight: '700' };
Chart.defaults.plugins.tooltip.bodyColor = '#334155';
Chart.defaults.plugins.tooltip.bodyFont = { family: "'Sora', sans-serif", size: 11, weight: '500' };
Chart.defaults.plugins.tooltip.borderColor = '#E2E8F0';
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.padding = 10;
Chart.defaults.plugins.tooltip.cornerRadius = 8;
Chart.defaults.plugins.tooltip.boxPadding = 5;
Chart.defaults.plugins.tooltip.usePointStyle = true;

// Shadcn Grid Presets
const shadcnGridY = {
  color: 'rgba(226, 232, 240, 0.6)',
  borderDash: [4, 4],
  drawBorder: false,
  drawTicks: false
};

const shadcnGridX = {
  display: false,
  drawBorder: false
};

const CB = '#0F172A', CG = '#FACC15', CA = '#CA8A04', CY = '#64748B';
const months = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];

const mk = (id, cfg) => { 
  const el = document.getElementById(id);
  if (!el) return;
  if (state.charts && state.charts[id]) {
    try { state.charts[id].destroy(); } catch(e) {}
  }
  if (!state.charts) state.charts = {};
  try {
    state.charts[id] = new Chart(el, cfg);
  } catch(e) {
    console.error('Error initializing chart', id, e);
  }
};

function initDashboardCharts() {
  mk('invoiceVsShipments', { 
    type: 'bar', 
    data: { 
      labels: months, 
      datasets: [ 
        { label: 'Invoices', data: [170,160,185,200,110,0,0,0,0,0,0,0], backgroundColor: CY, borderRadius: 6, barPercentage: 0.6 }, 
        { label: 'Shipments', data: [175,165,190,210,100,0,0,0,0,0,0,0], backgroundColor: CG, borderRadius: 6, barPercentage: 0.6 } 
      ] 
    }, 
    options: { 
      responsive: true, 
      maintainAspectRatio: false, 
      scales: { 
        x: { grid: { display: false } }, 
        y: { beginAtZero: true, max: 250, grid: { color: '#F3F4F6' } } 
      } 
    } 
  });

  mk('plantWiseOrders', { 
    type: 'bar', 
    data: { 
      labels: ['U-1','U-2','U-3','U-4','U-5','U-6','U-7','All'], 
      datasets: [ 
        { label: 'Total', data: [7,4,3,10,80,180,320,1200], backgroundColor: CB, borderRadius: 6, barPercentage: 0.7 }, 
        { label: 'Shipped', data: [5,3,2,8,60,150,280,800], backgroundColor: CG, borderRadius: 6, barPercentage: 0.7 } 
      ] 
    }, 
    options: { 
      responsive: true, 
      maintainAspectRatio: false, 
      scales: { 
        x: { grid: { display: false } }, 
        y: { beginAtZero: true, grid: { color: '#F3F4F6' } } 
      } 
    } 
  });

  mk('countryWise', { 
    type: 'doughnut', 
    data: { 
      labels: ['USA','China','Belgium','Russia','Canada','Others'], 
      datasets: [{ data: [75,16,3,2,1,3], backgroundColor: [CB,CG,'#4B5563',CA,'#6B7280',CY], borderWidth: 2, borderColor: '#fff' }] 
    }, 
    options: { 
      responsive: true, 
      maintainAspectRatio: false, 
      cutout: '60%', 
      plugins: { 
        legend: { display: true, position: 'bottom', labels: { boxWidth: 9, padding: 8, font: { size: 10 } } } 
      } 
    } 
  });

  mk('portWise', { 
    type: 'doughnut', 
    data: { 
      labels: ['Savannah','LA','Shanghai','NY','Others'], 
      datasets: [{ data: [225,131,118,112,414], backgroundColor: [CG,CB,'#4B5563',CA,CY], borderWidth: 2, borderColor: '#fff' }] 
    }, 
    options: { 
      responsive: true, 
      maintainAspectRatio: false, 
      cutout: '60%', 
      plugins: { 
        legend: { display: true, position: 'bottom', labels: { boxWidth: 9, padding: 8, font: { size: 10 } } } 
      } 
    } 
  });

  mk('revenueByProduct', { 
    type: 'doughnut', 
    data: { 
      labels: ['Shrimp','Salmon','Tuna','Squid','Others'], 
      datasets: [{ data: [45,25,15,10,5], backgroundColor: [CG,CB,CA,'#4B5563',CY], borderWidth: 2, borderColor: '#fff' }] 
    }, 
    options: { 
      responsive: true, 
      maintainAspectRatio: false, 
      cutout: '60%', 
      plugins: { 
        legend: { display: true, position: 'bottom', labels: { boxWidth: 9, padding: 8, font: { size: 10 } } } 
      } 
    } 
  });

  mk('shippedQty', { 
    type: 'bar', 
    data: { 
      labels: ['800026','4/6','6/8','8/12','13/15','16/22','18/22','20/44','22/32','22/52','30/52'], 
      datasets: [ 
        { label: 'To be shipped', data: [5000,20000,30000,50000,80000,150000,100000,200000,250000,300000,800000], backgroundColor: CB, borderRadius: 4, barPercentage: 0.7 }, 
        { label: 'Shipped', data: [2000,10000,15000,30000,50000,100000,80000,150000,200000,250000,600000], backgroundColor: CG, borderRadius: 4, barPercentage: 0.7 } 
      ] 
    }, 
    options: { 
      responsive: true, 
      maintainAspectRatio: false, 
      scales: { 
        x: { grid: { display: false } }, 
        y: { beginAtZero: true, grid: { color: '#F3F4F6' }, ticks: { callback: v => (v/1e6).toFixed(1) + 'M' } } 
      } 
    } 
  });
}

function initSalesCharts() {
  mk('revenueTrend', { 
    type: 'line', 
    data: { 
      labels: months, 
      datasets: [{ label: 'Revenue ($K)', data: [450,520,610,580,640,720,780,820,890,940,980,1020], borderColor: CG, backgroundColor: 'rgba(230,168,23,0.1)', tension: 0.4, fill: true, pointRadius: 4 }] 
    }, 
    options: { 
      responsive: true, 
      maintainAspectRatio: false, 
      scales: { y: { beginAtZero: true, grid: { color: '#F3F4F6' } }, x: { grid: { display: false } } } 
    } 
  });

  mk('customerAcq', { 
    type: 'bar', 
    data: { 
      labels: months, 
      datasets: [{ label: 'New Customers', data: [3,5,4,6,8,7,9,11,10,12,14,15], backgroundColor: CG, borderRadius: 6 }] 
    }, 
    options: { 
      responsive: true, 
      maintainAspectRatio: false, 
      scales: { y: { beginAtZero: true, grid: { color: '#F3F4F6' } }, x: { grid: { display: false } } } 
    } 
  });

  const topCust = document.getElementById('topCustomersBody');
  if (topCust) {
    topCust.innerHTML = BUYERS.slice(0, 6).map((b, i) => `<tr><td><strong>${i+1}</strong></td><td>${b.flag} <strong>${b.name}</strong></td><td>${b.orders}</td><td><strong>$${(b.revenue/1e6).toFixed(2)}M</strong></td><td>${(b.revenue/87e5*100).toFixed(1)}%</td><td>${badge('success','+' + (8 + i * 3) + '%')}</td></tr>`).join('');
  }
}

function initPaymentCharts() {
  mk('paymentAging', { 
    type: 'bar', 
    data: { 
      labels: ['0-30','31-60','61-90','90+'], 
      datasets: [{ data: [245,112,58,82], backgroundColor: ['#059669','#FAAD14','#D97706','#DC2626'], borderRadius: 6 }] 
    }, 
    options: { 
      responsive: true, 
      maintainAspectRatio: false, 
      indexAxis: 'y', 
      scales: { x: { grid: { color: '#F3F4F6' } }, y: { grid: { display: false } } } 
    } 
  });

  mk('cashFlow', { 
    type: 'line', 
    data: { 
      labels: months, 
      datasets: [{ label: 'Cash Flow ($K)', data: [320,380,410,390,440,470,510,540,580,620,650,680], borderColor: '#059669', backgroundColor: 'rgba(5,150,105,0.1)', tension: 0.4, fill: true }] 
    }, 
    options: { 
      responsive: true, 
      maintainAspectRatio: false, 
      scales: { y: { beginAtZero: true, grid: { color: '#F3F4F6' } }, x: { grid: { display: false } } } 
    } 
  });
}

function initQCChart() {
  mk('qcMetrics', { 
    type: 'line', 
    data: { 
      labels: ['W1','W2','W3','W4'], 
      datasets: [ 
        { label: 'Pass Rate %', data: [95,96,97,96.8], borderColor: '#059669', backgroundColor: 'rgba(5,150,105,0.1)', tension: 0.4, fill: true }, 
        { label: 'Inspections', data: [18,22,25,24], borderColor: CG, tension: 0.4, yAxisID: 'y1' } 
      ] 
    }, 
    options: { 
      responsive: true, 
      maintainAspectRatio: false, 
      scales: { 
        y: { min: 90, max: 100, grid: { color: '#F3F4F6' } }, 
        y1: { position: 'right', beginAtZero: true, grid: { display: false } }, 
        x: { grid: { display: false } } 
      } 
    } 
  });
}

function initTempChart() {
  mk('tempHistory', { 
    type: 'line', 
    data: { 
      labels: Array.from({length: 24}, (_, i) => i + ':00'), 
      datasets: [ 
        { label: 'CR-01', data: Array.from({length: 24}, () => -22 + (Math.random() - 0.5)), borderColor: CG, tension: 0.35, pointRadius: 0 }, 
        { label: 'CR-03', data: Array.from({length: 24}, () => -19 + (Math.random() - 0.5) * 2), borderColor: CA, tension: 0.35, pointRadius: 0 }, 
        { label: 'CR-04', data: Array.from({length: 24}, (_, i) => -20 + i * 0.2), borderColor: '#DC2626', tension: 0.35, pointRadius: 0 } 
      ] 
    }, 
    options: { 
      responsive: true, 
      maintainAspectRatio: false, 
      plugins: { 
        legend: { display: true, position: 'top', align: 'end', labels: { boxWidth: 10, usePointStyle: true, font: { size: 10 } } } 
      }, 
      scales: { 
        y: { grid: { color: '#F3F4F6' }, ticks: { callback: v => v + '°C' } }, 
        x: { grid: { display: false } } 
      } 
    } 
  });
}

/* ================= QA SCREENSHOT CHARTS — SHADCN UI YELLOW THEME ================= */
function initSalesDashboardCharts() {
  // 1. Invoice Vs Shipments (Shadcn Bar Chart)
  mk('invoiceVsShipmentsSales', {
    type: 'bar',
    data: {
      labels: ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'],
      datasets: [
        { 
          label: 'Invoices', 
          data: [170, 160, 185, 200, 155, 110, 15, 12, 10, 14, 18, 22], 
          backgroundColor: '#0F172A', 
          hoverBackgroundColor: '#1E293B',
          borderRadius: 6, 
          barPercentage: 0.55,
          categoryPercentage: 0.75
        },
        { 
          label: 'Shipments', 
          data: [175, 165, 190, 210, 150, 105, 12, 10, 8, 12, 16, 20], 
          backgroundColor: '#FACC15',
          hoverBackgroundColor: '#EAB308',
          borderRadius: 6, 
          barPercentage: 0.55,
          categoryPercentage: 0.75
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            usePointStyle: true,
            pointStyle: 'rectRounded',
            font: { family: "'Sora', sans-serif", size: 11, weight: '600' },
            padding: 16
          }
        }
      },
      scales: {
        x: { grid: shadcnGridX, border: { display: false }, ticks: { font: { family: "'Sora', sans-serif", size: 11 } } },
        y: { beginAtZero: true, max: 250, grid: shadcnGridY, border: { display: false }, ticks: { font: { family: "'Sora', sans-serif", size: 11 } } }
      }
    }
  });

  // 2. Plant Wise Orders (Shadcn Grouped Bar Chart)
  mk('plantWiseOrdersSales', {
    type: 'bar',
    data: {
      labels: ['Unit 1(853)', 'Unit 2(857)', 'Unit 3(990)', 'Unit 4(1936)', 'Unit 5(1888)', 'Unit 6(1978)', 'All'],
      datasets: [
        { 
          label: 'Total', 
          data: [44, 20, 180, 280, 520, 240, 1527], 
          backgroundColor: '#0F172A', 
          hoverBackgroundColor: '#1E293B',
          borderRadius: 6, 
          barPercentage: 0.65,
          categoryPercentage: 0.8
        },
        { 
          label: 'Shipped', 
          data: [32, 15, 140, 210, 410, 180, 1120], 
          backgroundColor: '#FACC15', 
          hoverBackgroundColor: '#EAB308',
          borderRadius: 6, 
          barPercentage: 0.65,
          categoryPercentage: 0.8
        },
        { 
          label: 'Pending', 
          data: [12, 5, 40, 70, 110, 60, 407], 
          backgroundColor: '#FEF08A', 
          borderColor: '#EAB308',
          borderWidth: 1,
          hoverBackgroundColor: '#FDE047',
          borderRadius: 6, 
          barPercentage: 0.65,
          categoryPercentage: 0.8
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            usePointStyle: true,
            pointStyle: 'rectRounded',
            font: { family: "'Sora', sans-serif", size: 11, weight: '600' },
            padding: 16
          }
        }
      },
      scales: {
        x: { grid: shadcnGridX, border: { display: false }, ticks: { font: { family: "'Sora', sans-serif", size: 11 } } },
        y: { beginAtZero: true, max: 1600, grid: shadcnGridY, border: { display: false }, ticks: { font: { family: "'Sora', sans-serif", size: 11 } } }
      }
    }
  });

  // 3. Country Wise Details (Shadcn Donut Chart)
  mk('countryWiseSales', {
    type: 'doughnut',
    data: {
      labels: ['U.S.A.: 735 (75.62%)', 'CHINA: 145 (14.92%)', 'BELGIUM: 39 (4.01%)', 'RUSSIA: 22 (2.26%)', 'CANADA: 7 (0.72%)', 'UNITED KINGDOM: 7 (0.72%)', 'FRANCE: 7 (0.72%)', 'OTHERS: 5 (0.51%)'],
      datasets: [{
        data: [735, 145, 39, 22, 7, 7, 7, 5],
        backgroundColor: [
          '#FACC15', // U.S.A (Vibrant Golden Yellow)
          '#0F172A', // CHINA (Jet Slate Black)
          '#CA8A04', // BELGIUM (Amber Gold)
          '#3F3F46', // RUSSIA (Charcoal Zinc)
          '#FDE047', // CANADA (Light Pastel Yellow)
          '#713F12', // UK (Deep Warm Brown-Yellow)
          '#1E293B', // FRANCE (Dark Slate)
          '#FEF08A'  // OTHERS (Soft Cream)
        ],
        borderWidth: 2,
        borderColor: '#FFFFFF',
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            boxWidth: 8,
            boxHeight: 8,
            usePointStyle: true,
            font: { family: "'Sora', sans-serif", size: 10, weight: '500' },
            padding: 8
          }
        }
      }
    }
  });

  // 4. Shipped Containers Port Wise (Shadcn Donut Chart)
  mk('shippedContainersPortSales', {
    type: 'doughnut',
    data: {
      labels: ['SAVANNAH: 271', 'LOS ANGELES: 147', 'NEW YORK: 131', 'ZHANJIANG: 131', 'BALTIMORE: 84', 'ANTWERP: 39', 'NEWARK: 38', 'SEATTLE: 24', 'OTHERS: 85'],
      datasets: [{
        data: [271, 147, 131, 131, 84, 39, 38, 24, 85],
        backgroundColor: [
          '#FACC15', // SAVANNAH (Vibrant Golden Yellow)
          '#0F172A', // LOS ANGELES (Jet Black)
          '#EAB308', // NEW YORK (Rich Golden Yellow)
          '#27272A', // ZHANJIANG (Dark Zinc Black)
          '#CA8A04', // BALTIMORE (Amber Gold)
          '#FDE047', // ANTWERP (Light Yellow)
          '#52525B', // NEWARK (Medium Charcoal)
          '#854D0E', // SEATTLE (Deep Ochre Yellow)
          '#FEF08A'  // OTHERS (Soft Cream)
        ],
        borderWidth: 2,
        borderColor: '#FFFFFF',
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            boxWidth: 8,
            boxHeight: 8,
            usePointStyle: true,
            font: { family: "'Sora', sans-serif", size: 10, weight: '500' },
            padding: 8
          }
        }
      }
    }
  });

  // 5. To be shipped Qty vs Shipped Qty (Shadcn Bar Chart)
  mk('toBeShippedVsShippedQtySales', {
    type: 'bar',
    data: {
      labels: ['BROKEN', '4/6', '6/8', '8/12', '13/15', '16/20', '20/40', '20/30', '21/25', '21/30', '26/30', '31/35', '32/37', '36/40', '40/60', '41/50', '50/70', '90/120', '100/150', '200/250'],
      datasets: [
        { 
          label: 'To be shipped Qty - Tons', 
          data: [120, 80, 150, 450, 320, 1850, 240, 180, 1200, 420, 2100, 480, 210, 290, 110, 750, 680, 280, 190, 80], 
          backgroundColor: '#0F172A', 
          hoverBackgroundColor: '#1E293B',
          borderRadius: 4,
          barPercentage: 0.6
        },
        { 
          label: 'Shipped Qty - Tons', 
          data: [150, 90, 180, 600, 480, 2450, 310, 220, 1820, 580, 3420, 620, 260, 380, 140, 1150, 940, 390, 240, 110], 
          backgroundColor: '#FACC15', 
          hoverBackgroundColor: '#EAB308',
          borderRadius: 4,
          barPercentage: 0.6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            usePointStyle: true,
            pointStyle: 'rectRounded',
            font: { family: "'Sora', sans-serif", size: 11, weight: '600' },
            padding: 16
          }
        }
      },
      scales: {
        x: { grid: shadcnGridX, border: { display: false }, ticks: { font: { family: "'Sora', sans-serif", size: 10 } } },
        y: { 
          beginAtZero: true, 
          grid: shadcnGridY, 
          border: { display: false }, 
          ticks: { 
            font: { family: "'Sora', sans-serif", size: 11 },
            callback: v => (v >= 1000 ? (v/1000).toLocaleString() + 'k' : v)
          } 
        }
      }
    }
  });

  // 6. Freight Rates Line Chart with Shadcn Area Glow
  mk('freightRatesSampleSales', {
    type: 'line',
    data: {
      labels: ['24-07-2026', '01-08-2026', '04-08-2026', '05-08-2026', '15-08-2026', '01-09-2026', '15-09-2026'],
      datasets: [
        { 
          label: 'MAERSK LINE - 8958', 
          data: [6958, 8958, 8958, 8958, 9958, 10958, 7164], 
          borderColor: '#FACC15', 
          backgroundColor: 'rgba(250, 204, 21, 0.12)', 
          fill: true,
          tension: 0.35, 
          pointRadius: 4,
          pointHoverRadius: 7,
          pointBackgroundColor: '#FFFFFF',
          pointBorderColor: '#FACC15',
          pointBorderWidth: 2
        },
        { 
          label: 'MSC LINE - 7737', 
          data: [6251, 7737, 7737, 7737, 7737, 8337, 7164], 
          borderColor: '#0F172A', 
          backgroundColor: 'transparent', 
          tension: 0.35, 
          pointRadius: 4,
          pointHoverRadius: 7,
          pointBackgroundColor: '#FFFFFF',
          pointBorderColor: '#0F172A',
          pointBorderWidth: 2
        },
        { 
          label: 'HAPAG LLOYD - 7164', 
          data: [6251, 7164, 7164, 7164, 7164, 7151, 7164], 
          borderColor: '#CA8A04', 
          backgroundColor: 'transparent', 
          tension: 0.35, 
          pointRadius: 4,
          pointHoverRadius: 7,
          pointBackgroundColor: '#FFFFFF',
          pointBorderColor: '#CA8A04',
          pointBorderWidth: 2
        },
        { 
          label: 'ONE LINE - 6143', 
          data: [6251, 6251, 6143, 6143, 6143, 6143, 6143], 
          borderColor: '#52525B', 
          backgroundColor: 'transparent', 
          tension: 0.35, 
          pointRadius: 4,
          pointHoverRadius: 7,
          pointBackgroundColor: '#FFFFFF',
          pointBorderColor: '#52525B',
          pointBorderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 8,
            boxHeight: 8,
            usePointStyle: true,
            font: { family: "'Sora', sans-serif", size: 11, weight: '600' },
            padding: 16
          }
        }
      },
      scales: {
        x: { grid: shadcnGridX, border: { display: false }, ticks: { font: { family: "'Sora', sans-serif", size: 11 } } },
        y: { 
          beginAtZero: true, 
          max: 13000, 
          grid: shadcnGridY, 
          border: { display: false }, 
          ticks: { 
            font: { family: "'Sora', sans-serif", size: 11 },
            callback: v => '$' + v.toLocaleString()
          } 
        }
      }
    }
  });
}

function initPurchaseDashboardCharts() {
  const purchaseDates = ['01-09-26', '02-09-26', '03-09-26', '04-09-26', '05-09-26', '06-09-26', '07-09-26', '08-09-26', '09-09-26', '10-09-26', '11-09-26', '12-09-26', '14-09-26', '15-09-26', '16-09-26', '17-09-26', '18-09-26', '19-09-26', '20-09-26', '21-09-26'];
  const dailyPurchaseData = [25.0, 170.0, 172.0, 148.0, 140.0, 122.0, 152.0, 128.0, 160.0, 128.0, 132.0, 120.0, 128.0, 60.0, 100.0, 124.0, 132.0, 146.0, 145.0, 42.0];

  // 1. Daily Purchase Analytics
  mk('dailyPurchaseAnalyticsChart', {
    type: 'bar',
    data: {
      labels: purchaseDates,
      datasets: [{
        label: 'Purchase Volume (T)',
        data: dailyPurchaseData,
        backgroundColor: '#FACC15',
        hoverBackgroundColor: '#EAB308',
        borderRadius: 4,
        barPercentage: 0.6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            usePointStyle: true,
            pointStyle: 'rectRounded',
            font: { family: "'Sora', sans-serif", size: 11, weight: '600' },
            padding: 16
          }
        }
      },
      scales: {
        x: { 
          grid: shadcnGridX, 
          border: { display: false }, 
          ticks: { font: { family: "'Sora', sans-serif", size: 10 } } 
        },
        y: { 
          beginAtZero: true, 
          max: 200, 
          grid: shadcnGridY, 
          border: { display: false }, 
          ticks: { font: { family: "'Sora', sans-serif", size: 11 } } 
        }
      }
    }
  });

  // 2. Headless Details
  const headlessData = [10.5, 12.0, 15.0, 24.0, 118.0, 18.0, 96.0, 78.0, 18.0, 168.0, 16.0, 85.0, 20.0, 38.0, 14.0, 68.0, 18.0, 36.0, 14.0, 12.0];
  mk('headlessDetailsChart', {
    type: 'bar',
    data: {
      labels: purchaseDates,
      datasets: [
        {
          label: 'Hon Qty (T)',
          data: headlessData,
          backgroundColor: '#0F172A',
          hoverBackgroundColor: '#1E293B',
          borderRadius: 4,
          barPercentage: 0.6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            usePointStyle: true,
            pointStyle: 'rectRounded',
            font: { family: "'Sora', sans-serif", size: 11, weight: '600' },
            padding: 16
          }
        }
      },
      scales: {
        x: { 
          grid: shadcnGridX, 
          border: { display: false }, 
          ticks: { font: { family: "'Sora', sans-serif", size: 10 } } 
        },
        y: { 
          beginAtZero: true, 
          max: 200, 
          grid: shadcnGridY, 
          border: { display: false }, 
          ticks: { font: { family: "'Sora', sans-serif", size: 11 } } 
        }
      }
    }
  });

  // 3. Purchase Quantity
  mk('purchaseQuantityChart', {
    type: 'doughnut',
    data: {
      labels: ['Site Weightment', 'Plant Weightment'],
      datasets: [{
        data: [2239.35, 315.04],
        backgroundColor: ['#FACC15', '#0F172A'],
        borderWidth: 2,
        borderColor: '#FFFFFF',
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            boxWidth: 8,
            boxHeight: 8,
            usePointStyle: true,
            font: { family: "'Sora', sans-serif", size: 10, weight: '500' },
            padding: 8
          }
        }
      }
    }
  });

  // 4. Suppliers Supplied Lots
  mk('suppliersSuppliedLotsChart', {
    type: 'doughnut',
    data: {
      labels: [
        'PERICHERLA AVINASH: 44 Lots',
        'MGR HIMALAYA AQUA: 42 Lots',
        'VENKATA CHARAN: 26 Lots',
        'P BABUJI: 24 Lots',
        'VARSHITHA AQUA: 24 Lots',
        'MAASAREI TRADERS: 23 Lots',
        'Others: 643 Lots'
      ],
      datasets: [{ 
        data: [44, 42, 26, 24, 24, 23, 643], 
        backgroundColor: [
          '#FACC15', '#0F172A', '#EAB308', '#27272A', '#CA8A04', '#52525B', '#FEF08A'
        ],
        borderWidth: 2,
        borderColor: '#FFFFFF',
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            boxWidth: 8,
            boxHeight: 8,
            usePointStyle: true,
            font: { family: "'Sora', sans-serif", size: 10, weight: '500' },
            padding: 8
          }
        }
      }
    }
  });
}

function initQCDashboardCharts() {
  mk('qcCodeStatusChart', {
    type: 'doughnut',
    data: {
      labels: ['Completed (65.2%)', 'Pending (34.8%)'],
      datasets: [{ data: [65.2, 34.8], backgroundColor: ['#FACC15', '#0F172A'], borderWidth: 3, borderColor: '#fff' }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: { legend: { display: true, position: 'bottom' } }
    }
  });

  mk('labCoverageChart', {
    type: 'doughnut',
    data: {
      labels: ['Internal (20.0%)', 'External (13.2%)', 'No Lab (66.8%)'],
      datasets: [{ data: [20.0, 13.2, 66.8], backgroundColor: ['#0F172A', '#FACC15', '#52525B'], borderWidth: 3, borderColor: '#fff' }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: { legend: { display: true, position: 'bottom' } }
    }
  });

  mk('productionReadinessChart', {
    type: 'bar',
    data: {
      labels: ['0-49%', '50-79%', '80-99%', '100%+'],
      datasets: [
        { label: 'Unassigned', data: [380, 90, 80, 50], backgroundColor: '#0F172A', borderRadius: 4 },
        { label: 'Assigned', data: [720, 180, 170, 190], backgroundColor: '#FACC15', borderRadius: 4 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, beginAtZero: true, max: 1200, grid: { color: '#F1F5F9' } } }
    }
  });

  mk('buyerPendingRiskChart', {
    type: 'bar',
    data: {
      labels: ['DEVI INC', 'STANLEY', 'EAST WEST CO. LTD', 'MARK FOODS LLC', 'C.P. FOOD', 'VALENCIA', 'ZHEJIANG YIWU', 'NORDIC', 'ZHANJIANG ZHANXIN', 'ESCAL S.A.'],
      datasets: [{ label: 'Risk Count', data: [380, 240, 190, 140, 100, 50, 50, 50, 50, 30], backgroundColor: '#713F12', borderRadius: 4 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      scales: { x: { beginAtZero: true, max: 450, grid: { color: '#F1F5F9' } }, y: { grid: { display: false } } }
    }
  });

  mk('destinationPendingRiskChart', {
    type: 'bar',
    data: {
      labels: ['U.S.A.', 'RUSSIA', 'CHINA', 'BELGIUM', 'CANADA', 'NEW ZEALAND', 'IRELAND', 'BAHAMAS', 'FRANCE', 'UNITED KINGDOM'],
      datasets: [{ label: 'Risk Count', data: [940, 180, 160, 110, 40, 30, 20, 20, 15, 10], backgroundColor: '#CA8A04', borderRadius: 4 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      scales: { x: { beginAtZero: true, max: 1000, grid: { color: '#F1F5F9' } }, y: { grid: { display: false } } }
    }
  });

  mk('qcCompletedVsPendingChart', {
    type: 'bar',
    data: {
      labels: ['Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026', 'Aug 2026', 'Sep 2026'],
      datasets: [
        { label: 'QC Completed', data: [160, 150, 170, 180, 150, 120], backgroundColor: '#FACC15', borderRadius: 4, barPercentage: 0.5 },
        { label: 'QC Pending', data: [20, 18, 22, 16, 25, 30], backgroundColor: '#0F172A', borderRadius: 4, barPercentage: 0.5 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: true, position: 'bottom' } },
      scales: { x: { grid: { display: false } }, y: { beginAtZero: true, max: 200, grid: { color: '#F1F5F9' } } }
    }
  });

  mk('centerWiseQuantityChart', {
    type: 'bar',
    data: {
      labels: ['KAKINADA LOCAL', 'AMALAPURAM', 'ORISSA', 'SRIKAKULAM', 'MALIKIPURAM'],
      datasets: [
        { label: 'Positive', data: [680, 520, 910, 480, 390], backgroundColor: '#FACC15', borderRadius: 4, barPercentage: 0.5 },
        { label: 'Negative', data: [12, 8, 15, 6, 4], backgroundColor: '#0F172A', borderRadius: 4, barPercentage: 0.5 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: true, position: 'bottom' } },
      scales: { x: { grid: { display: false } }, y: { beginAtZero: true, max: 1000, grid: { color: '#F1F5F9' } } }
    }
  });

  mk('supplierWiseQuantityChart', {
    type: 'bar',
    data: {
      labels: ['ASHODA ENTER...', 'PERICHERLA AVIN...', 'K.S.V.RAYAPA RAJU', 'MAASATALAFISHC...', 'SWARGADHAM FISH...'],
      datasets: [
        { label: 'Positive', data: [20, 100, 5, 140, 150], backgroundColor: '#FACC15', borderRadius: 4, barPercentage: 0.5 },
        { label: 'Negative', data: [1, 2, 0, 3, 2], backgroundColor: '#0F172A', borderRadius: 4, barPercentage: 0.5 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: true, position: 'bottom' } },
      scales: { x: { grid: { display: false } }, y: { beginAtZero: true, max: 160, grid: { color: '#F1F5F9' } } }
    }
  });
}

/* ================= DYNAMIC PERIOD FILTER HANDLER ================= */
function handlePeriodChange(selectEl, chartId) {
  const period = selectEl.value;
  const chart = state.charts && state.charts[chartId];
  if (!chart) return;

  if (chartId === 'invoiceVsShipmentsSales') {
    if (period === 'monthly') {
      chart.data.labels = ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'];
      chart.data.datasets[0].data = [170, 160, 185, 200, 155, 110, 15, 12, 10, 14, 18, 22];
      chart.data.datasets[1].data = [175, 165, 190, 210, 150, 105, 12, 10, 8, 12, 16, 20];
    } else if (period === 'quarterly') {
      chart.data.labels = ['Q1 (Apr-Jun)', 'Q2 (Jul-Sep)', 'Q3 (Oct-Dec)', 'Q4 (Jan-Mar)'];
      chart.data.datasets[0].data = [515, 465, 37, 54];
      chart.data.datasets[1].data = [530, 465, 30, 48];
    } else if (period === 'yearly') {
      chart.data.labels = ['FY 2024-25', 'FY 2025-26', 'FY 2026-27 (YTD)'];
      chart.data.datasets[0].data = [1840, 2150, 1071];
      chart.data.datasets[1].data = [1910, 2200, 1073];
    }
  } else if (chartId === 'plantWiseOrdersSales') {
    if (period === 'monthly') {
      chart.data.datasets[0].data = [44, 20, 180, 280, 520, 240, 1527];
      chart.data.datasets[1].data = [32, 15, 140, 210, 410, 180, 1120];
      chart.data.datasets[2].data = [12, 5, 40, 70, 110, 60, 407];
    } else if (period === 'quarterly') {
      chart.data.datasets[0].data = [132, 60, 540, 840, 1560, 720, 4580];
      chart.data.datasets[1].data = [96, 45, 420, 630, 1230, 540, 3360];
      chart.data.datasets[2].data = [36, 15, 120, 210, 330, 180, 1220];
    } else if (period === 'yearly') {
      chart.data.datasets[0].data = [520, 240, 2160, 3360, 6240, 2880, 18320];
      chart.data.datasets[1].data = [380, 180, 1680, 2520, 4920, 2160, 13440];
      chart.data.datasets[2].data = [140, 60, 480, 840, 1320, 720, 4880];
    }
  } else if (chartId === 'countryWiseSales') {
    if (period === 'monthly') {
      chart.data.datasets[0].data = [62, 12, 3, 2, 1, 1, 1, 1];
    } else if (period === 'yearly' || period === 'ytd') {
      chart.data.datasets[0].data = [735, 145, 39, 22, 7, 7, 7, 5];
    }
  } else if (chartId === 'shippedContainersPortSales') {
    if (period === 'monthly') {
      chart.data.datasets[0].data = [23, 12, 11, 11, 7, 3, 3, 2, 7];
    } else if (period === 'yearly' || period === 'ytd') {
      chart.data.datasets[0].data = [271, 147, 131, 131, 84, 39, 38, 24, 85];
    }
  } else if (chartId === 'toBeShippedVsShippedQtySales') {
    const factor = period === 'quarterly' ? 2.8 : (period === 'yearly' ? 10.5 : 1);
    chart.data.datasets[0].data = [120, 80, 150, 450, 320, 1850, 240, 180, 1200, 420, 2100, 480, 210, 290, 110, 750, 680, 280, 190, 80].map(v => Math.round(v * factor));
    chart.data.datasets[1].data = [150, 90, 180, 600, 480, 2450, 310, 220, 1820, 580, 3420, 620, 260, 380, 140, 1150, 940, 390, 240, 110].map(v => Math.round(v * factor));
  } else if (chartId === 'freightRatesSampleSales') {
    if (period === 'quarterly') {
      chart.data.labels = ['Jun-2026', 'Jul-2026', 'Aug-2026', 'Sep-2026'];
      chart.data.datasets[0].data = [6500, 7800, 8958, 7164];
      chart.data.datasets[1].data = [5900, 7200, 7737, 7164];
      chart.data.datasets[2].data = [5800, 6800, 7164, 7164];
      chart.data.datasets[3].data = [5600, 6100, 6143, 6143];
    } else if (period === 'yearly') {
      chart.data.labels = ['FY 2024-25', 'FY 2025-26', 'FY 2026-27'];
      chart.data.datasets[0].data = [7200, 8400, 8958];
      chart.data.datasets[1].data = [6800, 7500, 7737];
      chart.data.datasets[2].data = [6500, 7000, 7164];
      chart.data.datasets[3].data = [5800, 6200, 6143];
    } else {
      chart.data.labels = ['24-07-2026', '01-08-2026', '04-08-2026', '05-08-2026', '15-08-2026', '01-09-2026', '15-09-2026'];
      chart.data.datasets[0].data = [6958, 8958, 8958, 8958, 9958, 10958, 7164];
      chart.data.datasets[1].data = [6251, 7737, 7737, 7737, 7737, 8337, 7164];
      chart.data.datasets[2].data = [6251, 7164, 7164, 7164, 7164, 7151, 7164];
      chart.data.datasets[3].data = [6251, 6251, 6143, 6143, 6143, 6143, 6143];
    }
  } else if (chartId === 'qcCodeStatusChart') {
    if (period === 'monthly') {
      chart.data.datasets[0].data = [72.4, 27.6];
    } else if (period === 'quarterly') {
      chart.data.datasets[0].data = [68.1, 31.9];
    } else {
      chart.data.datasets[0].data = [65.2, 34.8];
    }
  } else if (chartId === 'labCoverageChart') {
    if (period === 'monthly') {
      chart.data.datasets[0].data = [28.5, 18.0, 53.5];
    } else if (period === 'quarterly') {
      chart.data.datasets[0].data = [24.0, 15.5, 60.5];
    } else {
      chart.data.datasets[0].data = [20.0, 13.2, 66.8];
    }
  } else if (chartId === 'productionReadinessChart') {
    const factor = period === 'quarterly' ? 2.5 : (period === 'yearly' ? 7.2 : 1);
    chart.data.datasets[0].data = [380, 90, 80, 50].map(v => Math.round(v * factor));
    chart.data.datasets[1].data = [720, 180, 170, 190].map(v => Math.round(v * factor));
  } else if (chartId === 'buyerPendingRiskChart') {
    if (period === 'monthly') {
      chart.data.datasets[0].data = [85, 52, 41, 30, 22, 12, 10, 10, 9, 6];
    } else if (period === 'quarterly') {
      chart.data.datasets[0].data = [195, 120, 98, 70, 52, 28, 25, 24, 22, 15];
    } else {
      chart.data.datasets[0].data = [380, 240, 190, 140, 100, 50, 50, 50, 50, 30];
    }
  } else if (chartId === 'destinationPendingRiskChart') {
    if (period === 'monthly') {
      chart.data.datasets[0].data = [210, 42, 38, 26, 10, 8, 5, 5, 4, 2];
    } else if (period === 'quarterly') {
      chart.data.datasets[0].data = [480, 92, 84, 58, 21, 15, 11, 10, 8, 5];
    } else {
      chart.data.datasets[0].data = [940, 180, 160, 110, 40, 30, 20, 20, 15, 10];
    }
  } else if (chartId === 'qcCompletedVsPendingChart') {
    if (period === 'quarterly') {
      chart.data.labels = ['Q1 (Apr-Jun)', 'Q2 (Jul-Sep)'];
      chart.data.datasets[0].data = [480, 450];
      chart.data.datasets[1].data = [60, 71];
    } else if (period === 'yearly') {
      chart.data.labels = ['FY 2024-25', 'FY 2025-26', 'FY 2026-27 (YTD)'];
      chart.data.datasets[0].data = [1820, 1940, 930];
      chart.data.datasets[1].data = [210, 240, 131];
    } else {
      chart.data.labels = ['Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026', 'Aug 2026', 'Sep 2026'];
      chart.data.datasets[0].data = [160, 150, 170, 180, 150, 120];
      chart.data.datasets[1].data = [20, 18, 22, 16, 25, 30];
    }
  } else if (chartId === 'centerWiseQuantityChart' || chartId === 'supplierWiseQuantityChart') {
    const factor = period === 'quarterly' ? 2.6 : (period === 'yearly' ? 8.4 : 1);
    chart.data.datasets.forEach(ds => {
      ds.data = ds.data.map(v => Math.round(v * factor));
    });
  } else if (chartId === 'dailyPurchaseAnalyticsChart') {
    if (period === 'quarterly') {
      chart.data.labels = ['Q1 (Apr-Jun)', 'Q2 (Jul-Sep)', 'Q3 (Oct-Dec)', 'Q4 (Jan-Mar)'];
      chart.data.datasets[0].data = [1240, 2554.39, 850, 1120];
      chart.options.scales.y.max = 3000;
    } else if (period === 'yearly') {
      chart.data.labels = ['FY 2024-25', 'FY 2025-26', 'FY 2026-27 (YTD)'];
      chart.data.datasets[0].data = [8420, 9650, 5764.39];
      chart.options.scales.y.max = 12000;
    } else {
      chart.data.labels = ['01-09-26', '02-09-26', '03-09-26', '04-09-26', '05-09-26', '06-09-26', '07-09-26', '08-09-26', '09-09-26', '10-09-26', '11-09-26', '12-09-26', '14-09-26', '15-09-26', '16-09-26', '17-09-26', '18-09-26', '19-09-26', '20-09-26', '21-09-26'];
      chart.data.datasets[0].data = [25.0, 170.0, 172.0, 148.0, 140.0, 122.0, 152.0, 128.0, 160.0, 128.0, 132.0, 120.0, 128.0, 60.0, 100.0, 124.0, 132.0, 146.0, 145.0, 42.0];
      chart.options.scales.y.max = 200;
    }
  } else if (chartId === 'headlessDetailsChart') {
    const factor = period === 'quarterly' ? 2.8 : (period === 'yearly' ? 9.2 : 1);
    const baseHeadless = [10.5, 12.0, 15.0, 24.0, 118.0, 18.0, 96.0, 78.0, 18.0, 168.0, 16.0, 85.0, 20.0, 38.0, 14.0, 68.0, 18.0, 36.0, 14.0, 12.0];
    chart.data.datasets[0].data = baseHeadless.map(v => Math.round(v * factor * 10) / 10);
    chart.options.scales.y.max = Math.round(200 * factor);
  } else if (chartId === 'purchaseQuantityChart') {
    if (period === 'quarterly') {
      chart.data.datasets[0].data = [6240.5, 915.2];
    } else if (period === 'yearly') {
      chart.data.datasets[0].data = [24500.0, 3820.0];
    } else {
      chart.data.datasets[0].data = [2239.35, 315.04];
    }
  } else if (chartId === 'suppliersSuppliedLotsChart') {
    const factor = period === 'quarterly' ? 2.5 : (period === 'yearly' ? 8.0 : 1);
    const baseLots = [44, 42, 26, 24, 24, 23, 19, 16, 12, 12, 11, 11, 11, 10, 550];
    chart.data.datasets[0].data = baseLots.map(v => Math.round(v * factor));
  }

  chart.update();
  if (window.showToast) showToast('success', 'Period Filter', `Updated ${selectEl.options[selectEl.selectedIndex].text} view`);
}
