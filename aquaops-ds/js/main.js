/**
 * AquaOps Design System — Main Controller & Component Registry
 * Initializes and coordinates all Atomic components across the application
 */

import { AquaSelect } from './aqua-select.js';
import { AquaCalendar } from './aqua-calendar.js';
import { AquaSidebar } from './aqua-sidebar.js';
import { AquaToast } from './aqua-toast.js';
import { AquaTable, AquaPager } from './aqua-table.js';
import { AquaCharts } from './aqua-charts.js';
import { AquaDrawer } from './aqua-drawer.js';
import { AquaMotion } from './aqua-motion.js';
import { AquaTooltip } from './aqua-tooltip.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 1b. Initialize Kinetic Motion & Micro-Physics
  AquaMotion.init();

  // 1c. Initialize Calendar Date Picker (Image 3)
  AquaCalendar.init();

  // 1d. Initialize AquaTooltip Engine (MUI followCursor & Anchored)
  AquaTooltip.init();

  // 2. Component: Rich Select Dropdowns
  document.querySelectorAll('.rich-select').forEach((el) => {
    new AquaSelect(el);
  });

  // 2b. Global Custom Select Dropdown Enhancer (Image 2)
  function upgradeNativeSelects() {
    document.querySelectorAll('select.input:not([data-enhanced])').forEach((sel) => {
      sel.setAttribute('data-enhanced', 'true');
      sel.style.display = 'none';

      const isSm = sel.classList.contains('input-sm');
      const isLg = sel.classList.contains('input-lg');
      const isDisabled = sel.disabled;

      const wrap = document.createElement('div');
      wrap.className = `custom-select ${isSm ? 'input-sm' : ''} ${isLg ? 'input-lg' : ''}`;

      const selectedOpt = sel.options[sel.selectedIndex] || sel.options[0];
      const initialText = selectedOpt ? selectedOpt.textContent : 'Select...';

      const trigger = document.createElement('div');
      trigger.className = 'custom-select-trigger';
      if (isDisabled) {
        trigger.style.opacity = '0.6';
        trigger.style.cursor = 'not-allowed';
      }
      trigger.innerHTML = `
        <span class="custom-select-current"><span>${initialText}</span></span>
        <svg class="custom-select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      `;

      const menu = document.createElement('div');
      menu.className = 'custom-select-menu';
      const list = document.createElement('div');
      list.className = 'custom-select-list';

      Array.from(sel.options).forEach((opt, idx) => {
        if (opt.disabled && idx === 0 && !opt.value) return; // placeholder
        const item = document.createElement('div');
        item.className = `custom-select-option ${idx === sel.selectedIndex ? 'selected' : ''}`;
        item.innerHTML = `
          <span>${opt.textContent}</span>
          <svg class="custom-select-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        `;
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          sel.selectedIndex = idx;
          sel.dispatchEvent(new Event('change', { bubbles: true }));
          trigger.querySelector('.custom-select-current span').textContent = opt.textContent;
          list.querySelectorAll('.custom-select-option').forEach(o => o.classList.remove('selected'));
          item.classList.add('selected');
          wrap.classList.remove('open');
          AquaToast.show(`Selected: ${opt.textContent}`, 'teal');
        });
        list.appendChild(item);
      });

      menu.appendChild(list);
      wrap.appendChild(trigger);
      wrap.appendChild(menu);

      if (!isDisabled) {
        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          const isOpen = wrap.classList.contains('open');
          document.querySelectorAll('.custom-select.open, .rich-select.open').forEach(el => el.classList.remove('open'));
          if (!isOpen) wrap.classList.add('open');
        });
      }

      sel.parentNode.insertBefore(wrap, sel.nextSibling);
    });

    document.addEventListener('click', () => {
      document.querySelectorAll('.custom-select.open').forEach(el => el.classList.remove('open'));
    });
    initStaticCustomSelects();
  }

  function initStaticCustomSelects() {
    document.querySelectorAll('.custom-select').forEach((cs) => {
      const trigger = cs.querySelector('.custom-select-trigger');
      const menu = cs.querySelector('.custom-select-menu');
      if (!trigger || !menu || cs.hasAttribute('data-bound')) return;
      cs.setAttribute('data-bound', 'true');

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = cs.classList.contains('open');
        document.querySelectorAll('.custom-select.open, .rich-select.open').forEach(el => el.classList.remove('open'));
        if (!isOpen) cs.classList.add('open');
      });

      cs.querySelectorAll('.custom-select-option').forEach((opt) => {
        opt.addEventListener('click', (e) => {
          e.stopPropagation();
          const text = opt.querySelector('span')?.textContent || opt.textContent.trim();
          const currSpan = cs.querySelector('.custom-select-current span');
          if (currSpan) currSpan.textContent = text;
          cs.querySelectorAll('.custom-select-option').forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
          cs.classList.remove('open');
          AquaToast.show(`Selected: ${text}`, 'teal');
        });
      });
    });
  }

  upgradeNativeSelects();
  initStaticCustomSelects();

  // Rich Select Change Handlers & Toasts
  document.getElementById('richSpeciesSelect')?.addEventListener('aqua-change', (e) => {
    AquaToast.show(`Active species updated: ${e.detail.value}`, 'teal');
  });

  document.getElementById('richTargetSelect')?.addEventListener('aqua-change', (e) => {
    AquaToast.show(`Harvest target set: ${e.detail.value}`, 'teal');
  });

  document.getElementById('richMultiPondSelect')?.addEventListener('aqua-change', (e) => {
    const count = e.detail.values?.length || 0;
    AquaToast.show(`Monitored ponds updated (${count} selected)`, 'teal');
  });

  document.getElementById('richMetricSelect')?.addEventListener('aqua-change', (e) => {
    AquaToast.show(`Telemetry focus: ${e.detail.value}`, 'teal');
  });

  document.getElementById('entRowsSelect')?.addEventListener('aqua-change', (e) => {
    AquaToast.show(`Page size set to ${e.detail.value}`, 'teal');
  });

  document.getElementById('tblClusterSelect')?.addEventListener('aqua-change', (e) => {
    const val = e.detail.value;
    AquaToast.show(`Filtered table to ${val}`, 'teal');
    const targetTable = document.getElementById('enterpriseTable');
    if (!targetTable) return;
    targetTable.querySelectorAll('tbody tr:not(.detail-row)').forEach((row) => {
      const text = row.textContent;
      if (val === 'All Clusters' || 
         (val === 'Cluster Alpha' && (text.includes('POND-101') || text.includes('POND-102') || text.includes('POND-103') || text.includes('POND-104'))) || 
         (val === 'Cluster Delta' && (text.includes('POND-105') || text.includes('POND-106')))) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });

  // 3. Component: Floating Sidebar
  const sidebarEl = document.getElementById('demoSidebar');
  if (sidebarEl) {
    new AquaSidebar(sidebarEl);
  }

  // 4. Component: Data Tables & Pagination
  document.querySelectorAll('table.tbl').forEach((table) => {
    const bulk = table.closest('.table-wrap')?.querySelector('.bulk') || document.getElementById('bulk');
    new AquaTable(table, bulk);
  });

  const specPagerEl = document.getElementById('specPager');
  if (specPagerEl) {
    new AquaPager(specPagerEl);
  }
  const entPagerEl = document.getElementById('entPager');
  if (entPagerEl) {
    new AquaPager(entPagerEl);
  }

  // Table Density Switcher
  document.querySelectorAll('[data-density]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const density = btn.dataset.density;
      const targetTable = document.getElementById('enterpriseTable');
      if (!targetTable) return;
      targetTable.classList.remove('tbl-compact', 'tbl-standard', 'tbl-spacious');
      targetTable.classList.add(`tbl-${density}`);
      btn.parentElement.querySelectorAll('[data-density]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Table Filter Tabs
  document.querySelectorAll('[data-tbl-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.tblFilter;
      const targetTable = document.getElementById('enterpriseTable');
      if (!targetTable) return;
      btn.parentElement.querySelectorAll('[data-tbl-filter]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      targetTable.querySelectorAll('tbody tr:not(.detail-row)').forEach((row) => {
        const status = row.dataset.status || '';
        if (filter === 'all' || status === filter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
          const detailId = row.dataset.detailId;
          if (detailId) {
            const detailRow = document.getElementById(detailId);
            if (detailRow) detailRow.style.display = 'none';
          }
        }
      });
    });
  });

  // 5. Component: Charts & Telemetry (Interactive World-Class Visualizations)
  AquaCharts.renderBars('cBars', [
    { l: 'Mon', v: 52 }, { l: 'Tue', v: 68 }, { l: 'Wed', v: 61 },
    { l: 'Thu', v: 84 }, { l: 'Fri', v: 72 }, { l: 'Sat', v: 92 }, { l: 'Sun', v: 66 },
  ], 85);

  AquaCharts.renderBars('pBars', [
    { l: 'Mon', v: 44 }, { l: 'Tue', v: 62 }, { l: 'Wed', v: 58 },
    { l: 'Thu', v: 80 }, { l: 'Fri', v: 66 }, { l: 'Sat', v: 90 }, { l: 'Sun', v: 60 },
  ], 85);

  AquaCharts.renderHorizontal('cH', [
    { l: 'Vannamei', v: 78, kg: 28450 }, { l: 'Monodon', v: 52, kg: 14800 },
    { l: 'Tilapia', v: 34, kg: 9200 }, { l: 'Scampi', v: 61, kg: 17200 }, { l: 'Nursery', v: 22, kg: 5400 },
  ]);

  AquaCharts.renderLine('cPath', 'cArea', 'cDots', [30, 45, 38, 62, 55, 78, 70, 85, 72, 90]);
  AquaCharts.renderDonut('cDonut');
  AquaCharts.renderDonut('pDonut', 'pDonutVal', 'pDonutSub');

  // New Data Visualizations
  AquaCharts.renderGauge('cGauge', 94.2);
  AquaCharts.renderHeatmap('cHeatmap');
  AquaCharts.renderDualLine('cDualLine');

  // 6. Tabs Molecule
  document.querySelectorAll('[data-tabs]').forEach((group) => {
    group.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      group.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // 7. Searchbar Clear Molecule
  const clearBtn = document.getElementById('sClear');
  const sInput = document.getElementById('sInput');
  if (clearBtn && sInput) {
    clearBtn.addEventListener('click', () => {
      sInput.value = '';
      sInput.focus();
    });
  }

  // 8. Action Dropdown Menu Molecule
  const dd = document.getElementById('dd');
  const ddBtn = document.getElementById('ddBtn');
  if (dd && ddBtn) {
    ddBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dd.classList.toggle('open');
    });
    dd.querySelectorAll('.menu button').forEach((btn) => {
      btn.addEventListener('click', () => {
        dd.classList.remove('open');
        AquaToast.show(`Action executed: ${btn.textContent.trim()}`, 'teal');
      });
    });
    document.addEventListener('click', () => dd.classList.remove('open'));
  }

  // 9. Toast Triggers
  document.getElementById('toastTealBtn')?.addEventListener('click', () => {
    AquaToast.show('Settings saved successfully', 'teal');
  });
  document.getElementById('toastDarkBtn')?.addEventListener('click', () => {
    AquaToast.show('Scheduled task completed', '');
  });

  // 10. Accordion Organism
  document.querySelectorAll('#acc .acc-h').forEach((h) => {
    h.addEventListener('click', () => {
      h.closest('.acc-item').classList.toggle('open');
    });
  });

  // 11. Modal Dialog Organism
  const ov = document.getElementById('ov');
  document.getElementById('openModal')?.addEventListener('click', () => ov?.classList.add('show'));
  document.getElementById('mCancel')?.addEventListener('click', () => ov?.classList.remove('show'));
  document.getElementById('mOk')?.addEventListener('click', () => {
    ov?.classList.remove('show');
    AquaToast.show('Intake confirmed & biosecurity ledger updated', 'teal');
  });
  ov?.addEventListener('click', (e) => {
    if (e.target === ov) ov.classList.remove('show');
  });

  // 12. Stepper Molecule
  const steps = ['Details', 'Inventory', 'Review', 'Confirm'];
  let curStep = 1;
  const stepperEl = document.getElementById('stepper');
  function drawSteps() {
    if (!stepperEl) return;
    stepperEl.innerHTML = '';
    steps.forEach((s, i) => {
      const d = document.createElement('div');
      d.className = `step ${i < curStep ? 'done' : i === curStep ? 'now' : ''}`;
      d.innerHTML = `<i>${
        i < curStep
          ? '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
          : i + 1
      }</i><span>${s}</span>`;
      stepperEl.appendChild(d);
      if (i < steps.length - 1) {
        const l = document.createElement('div');
        l.className = 'step-line';
        stepperEl.appendChild(l);
      }
    });
  }
  document.getElementById('stNext')?.addEventListener('click', () => {
    if (curStep < steps.length - 1) {
      curStep++;
      drawSteps();
    }
  });
  document.getElementById('stBack')?.addEventListener('click', () => {
    if (curStep > 0) {
      curStep--;
      drawSteps();
    }
  });
  drawSteps();

  // 13. Enterprise Organism: Inspector Drawer
  const inspectorDrawer = new AquaDrawer('inspectorDrawer');
  document.querySelectorAll('[data-open-drawer]').forEach((btn) => {
    btn.addEventListener('click', () => inspectorDrawer.open());
  });

  // 14. Enterprise Atom: Segmented Controls
  document.querySelectorAll('.segmented-control').forEach((sc) => {
    sc.addEventListener('click', (e) => {
      const btn = e.target.closest('.segment-btn');
      if (!btn) return;
      sc.querySelectorAll('.segment-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // 15. Enterprise Molecule: Filter Clear All & Chip Removal
  document.querySelectorAll('.filter-clear-all').forEach((btn) => {
    btn.addEventListener('click', () => {
      const bar = btn.closest('.filter-bar');
      if (bar) {
        bar.querySelectorAll('.tag, .filter-chip').forEach((t) => {
          t.style.opacity = '0';
          t.style.transform = 'scale(0.9)';
          setTimeout(() => t.remove(), 180);
        });
        const badge = bar.querySelector('.filter-bar-badge');
        if (badge) badge.textContent = '0';
        AquaToast.show('All query filters reset', 'teal');
      }
    });
  });

  document.querySelectorAll('.filter-chip-remove').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const chip = btn.closest('.filter-chip');
      if (chip) {
        chip.style.opacity = '0';
        chip.style.transform = 'scale(0.9)';
        chip.style.transition = 'all 0.15s ease';
        setTimeout(() => {
          const bar = chip.closest('.filter-bar');
          chip.remove();
          if (bar) {
            const count = bar.querySelectorAll('.filter-chip').length;
            const badge = bar.querySelector('.filter-bar-badge');
            if (badge) badge.textContent = count;
          }
        }, 150);
      }
    });
  });

  document.querySelectorAll('.filter-preset-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.parentElement.querySelectorAll('.filter-preset-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      AquaToast.show(`Preset activated: ${btn.textContent.trim()}`, 'teal');
    });
  });

  document.querySelectorAll('.filter-add-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      AquaToast.show('Choose a filter parameter to add', 'teal');
    });
  });

  // 15b. Action Icon Toolbar & View Mode Switcher
  document.querySelectorAll('#demoViewSwitcher .view-mode-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.parentElement.querySelectorAll('.view-mode-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const title = btn.getAttribute('title') || 'View mode';
      AquaToast.show(`Layout changed: ${title}`, 'teal');
    });
  });

  document.querySelectorAll('.action-icon-bar .icon-action-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const label = btn.getAttribute('aria-label') || 'Action';
      AquaToast.show(`${label} executed`, 'teal');
    });
  });

  // 15b. Enterprise Molecule: Command Palette (⌘K)
  const triggerCmdK = () => {
    AquaToast.show('Quick jump active: Type to find any page or item', 'teal');
  };
  document.getElementById('demoCmdK')?.addEventListener('click', triggerCmdK);
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      triggerCmdK();
    }
  });

  // 15c. Enterprise Molecule: Lab QC Dropzone Click
  document.getElementById('demoDropzone')?.addEventListener('click', () => {
    AquaToast.show('Upload ready: Drag or choose files to upload', 'teal');
  });

  // 16. Enterprise Molecule: Property Copy Buttons
  document.querySelectorAll('.prop-copy').forEach((btn) => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.copy || btn.closest('.prop-row')?.querySelector('.prop-val')?.textContent?.trim();
      if (val) {
        navigator.clipboard?.writeText(val);
        AquaToast.show(`Copied to clipboard: ${val}`, 'teal');
      }
    });
  });

  // 17. Complete Icon Library Controller (Category Filter & Copy)
  const iconCatBtns = document.querySelectorAll('.icon-cat-btn');
  const masterGrid = document.getElementById('masterIconGrid');
  const iconCountBadge = document.getElementById('iconVisibleCount');

  let activeCat = 'all';

  const filterIcons = () => {
    if (!masterGrid) return;
    const units = masterGrid.querySelectorAll('.ic-unit');
    let count = 0;
    units.forEach((u) => {
      const cat = u.dataset.cat || '';
      const matchesCat = activeCat === 'all' || cat === activeCat;

      if (matchesCat) {
        u.style.display = 'flex';
        count++;
      } else {
        u.style.display = 'none';
      }
    });
    if (iconCountBadge) iconCountBadge.textContent = count;
  };

  iconCatBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      iconCatBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.cat;
      filterIcons();
    });
  });

  masterGrid?.addEventListener('click', (e) => {
    const unit = e.target.closest('.ic-unit');
    if (!unit) return;
    const iconName = unit.dataset.iconName;
    if (iconName) {
      const markup = `<i data-lucide="${iconName}"></i>`;
      navigator.clipboard?.writeText(markup);
      AquaToast.show(`Copied: ${markup}`, 'teal');
    }
  });

  // 17b. Interactive Atoms: Color Swatches Click-to-Copy
  document.querySelectorAll('.sw-card').forEach((card) => {
    card.addEventListener('click', () => {
      const hex = card.dataset.hex;
      if (hex) {
        navigator.clipboard?.writeText(hex);
        AquaToast.show(`Copied ${hex} to clipboard`, 'teal');
      }
    });
  });

  // 17c. Interactive Atoms: Buttons Showcase
  const stage1 = document.getElementById('stage1');
  if (stage1) {
    stage1.querySelectorAll('.btn').forEach((btn) => {
      if (btn.disabled || btn.getAttribute('data-bound')) return;
      btn.setAttribute('data-bound', 'true');
      btn.addEventListener('click', (e) => {
        const text = btn.textContent.trim();
        if (text.includes('Save changes')) {
          AquaToast.show('Changes saved successfully', 'teal');
        } else if (text.includes('New item')) {
          AquaToast.show('New item created', 'teal');
        } else if (text.includes('Delete')) {
          AquaToast.show('Item deleted', 'ruby');
        } else if (text.includes('Pill')) {
          AquaToast.show('Pill mode activated', 'teal');
        }
      });
    });

    // Bell notification toggle
    stage1.querySelectorAll('.iconbtn').forEach((btn) => {
      if (btn.title?.includes('Notifications') || btn.title?.includes('Alerts')) {
        btn.addEventListener('click', () => {
          const dot = btn.querySelector('.ndot');
          if (dot) {
            const isHidden = dot.style.display === 'none';
            dot.style.display = isHidden ? 'block' : 'none';
            AquaToast.show(isHidden ? '1 unread notification' : 'Notifications marked as read', 'teal');
          }
        });
      }
    });

    // Tag removal (.tag-remove)
    stage1.querySelectorAll('.tag-remove').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const tag = btn.closest('.tag');
        if (tag) {
          tag.style.opacity = '0';
          tag.style.transform = 'scale(0.85)';
          tag.style.transition = 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)';
          setTimeout(() => {
            const label = tag.textContent.trim();
            tag.remove();
            AquaToast.show(`Filter removed: ${label}`, 'teal');
          }, 180);
        }
      });
    });

    // Switch toggles
    stage1.querySelectorAll('.switch input').forEach((sw) => {
      sw.addEventListener('change', () => {
        const label = sw.closest('.line-row')?.querySelector('span')?.textContent?.trim() || 'Setting';
        AquaToast.show(`${label}: ${sw.checked ? 'Enabled' : 'Disabled'}`, 'teal');
      });
    });

    // Inline Calendar Specimen Interaction
    const inlineCal = stage1.querySelector('.calendar-popover');
    if (inlineCal) {
      inlineCal.querySelectorAll('.calendar-preset-btn').forEach((pbtn) => {
        pbtn.addEventListener('click', () => {
          inlineCal.querySelectorAll('.calendar-preset-btn').forEach(b => b.classList.remove('active'));
          pbtn.classList.add('active');
          const pText = pbtn.textContent.trim();
          const days = inlineCal.querySelectorAll('.calendar-day-btn');
          days.forEach(d => d.classList.remove('selected'));
          if (pText === 'Today') {
            days.forEach(d => { if (d.textContent.trim() === '14' && !d.classList.contains('other-month')) d.classList.add('selected'); });
            AquaToast.show('Calendar set to Today (Oct 14)', 'teal');
          } else if (pText === 'Yesterday') {
            days.forEach(d => { if (d.textContent.trim() === '13' && !d.classList.contains('other-month')) d.classList.add('selected'); });
            AquaToast.show('Calendar set to Yesterday (Oct 13)', 'teal');
          } else if (pText === '1st of Month') {
            days.forEach(d => { if (d.textContent.trim() === '1' && !d.classList.contains('other-month')) d.classList.add('selected'); });
            AquaToast.show('Calendar set to Oct 1', 'teal');
          } else if (pText === 'Clear') {
            AquaToast.show('Calendar selection cleared', '');
          }
        });
      });

      inlineCal.querySelectorAll('.calendar-day-btn:not(.other-month)').forEach((dbtn) => {
        dbtn.addEventListener('click', () => {
          inlineCal.querySelectorAll('.calendar-day-btn').forEach(d => d.classList.remove('selected'));
          inlineCal.querySelectorAll('.calendar-preset-btn').forEach(b => b.classList.remove('active'));
          dbtn.classList.add('selected');
          const day = dbtn.textContent.trim();
          AquaToast.show(`Selected date: October ${day}, 2026`, 'teal');
        });
      });
    }
  }

  // 17d. Live Interactive Field Validation Demo
  const errDoField = document.getElementById('errDoField');
  const liveValMsg = document.getElementById('liveValMsg');
  if (errDoField && liveValMsg) {
    errDoField.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val >= 4.0) {
        errDoField.className = 'input succ';
        liveValMsg.className = 'msg ok';
        liveValMsg.innerHTML = '<i data-lucide="check-circle-2"></i><span>Looks good! Value is within safety limits.</span>';
      } else {
        errDoField.className = 'input err';
        liveValMsg.className = 'msg err';
        liveValMsg.innerHTML = '<i data-lucide="alert-triangle"></i><span>Value must be at least 4.0 mg/L. (Try typing 4.0 or more)</span>';
      }
      if (window.lucide) window.lucide.createIcons();
    });
  }

  // 17e. System Alerts & Offline Card Reconnect
  document.getElementById('btnReconnectSensor')?.addEventListener('click', (e) => {
    const btn = e.currentTarget;
    btn.innerHTML = '<span class="spinner"></span>Connecting...';
    btn.disabled = true;
    setTimeout(() => {
      const alert = document.getElementById('demoCriticalAlert');
      if (alert) {
        alert.className = 'callout callout-success';
        alert.innerHTML = `
          <i data-lucide="check-circle-2"></i>
          <div class="callout-content">
            <div class="callout-title">Sensor 104 Reconnected</div>
            <div>Live telemetry stream restored and transmitting normally.</div>
          </div>
        `;
        if (window.lucide) window.lucide.createIcons();
      }
      AquaToast.show('Sensor 104 reconnected successfully', 'teal');
    }, 900);
  });

  document.getElementById('btnRetryOffline')?.addEventListener('click', (e) => {
    const btn = e.currentTarget;
    btn.innerHTML = '<span class="spinner"></span>Connecting...';
    btn.disabled = true;
    setTimeout(() => {
      const card = document.getElementById('demoOfflineCard');
      const iconWrap = document.getElementById('offlineIconWrap');
      const title = document.getElementById('offlineTitle');
      const desc = document.getElementById('offlineDesc');
      if (card && iconWrap && title && desc) {
        card.style.background = '#f0fafc';
        card.style.border = '1px solid #b2ecf3';
        iconWrap.style.background = '#d8f4f8';
        iconWrap.style.color = '#004d57';
        iconWrap.innerHTML = '<i data-lucide="wifi"></i>';
        title.textContent = 'Device Online';
        desc.textContent = 'Station Delta is connected and synchronizing local telemetry records.';
        btn.innerHTML = '<i data-lucide="check"></i>Connected';
        btn.className = 'btn btn-primary btn-sm';
        btn.disabled = true;
        if (window.lucide) window.lucide.createIcons();
      }
      AquaToast.show('Station Delta connection restored', 'teal');
    }, 1000);
  });

  // 18. Robust Live Viewport ScrollSpy & Stage Progress Tracker
  const stageNav = document.querySelector('.stage-nav');
  const stageNavBtns = Array.from(document.querySelectorAll('.stage-nav-btn'));
  const navInner = document.querySelector('.stage-nav-inner');

  // Insert progress bar indicator along bottom edge of sticky stage-nav
  let navProgressBar = document.querySelector('.stage-nav-progress');
  if (!navProgressBar && stageNav) {
    navProgressBar = document.createElement('div');
    navProgressBar.className = 'stage-nav-progress';
    stageNav.appendChild(navProgressBar);
  }

  // Map each button to its target element and anchor ID
  const navTargets = stageNavBtns.map((btn) => {
    const href = btn.getAttribute('href');
    if (href && href.startsWith('#')) {
      const el = document.getElementById(href.slice(1));
      return el ? { btn, el, id: href.slice(1) } : null;
    }
    return null;
  }).filter(Boolean);

  const updateScrollSpy = () => {
    // 1. Live scroll progress percentage
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    if (navProgressBar) {
      navProgressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }

    // 2. Active Section Detection using live viewport coordinates
    const headerHeight = 120; // sticky header offset
    let activeTarget = null;

    // Check if at the very bottom
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 50) {
      activeTarget = navTargets[navTargets.length - 1];
    } else if (window.scrollY < 200) {
      // At the top of the page
      activeTarget = navTargets[0];
    } else {
      // Find the target whose top is <= headerHeight and bottom > headerHeight
      for (const target of navTargets) {
        const rect = target.el.getBoundingClientRect();
        if (rect.top <= headerHeight && rect.bottom > headerHeight) {
          activeTarget = target;
          break;
        }
      }

      // Fallback: target closest to top of viewport
      if (!activeTarget) {
        let minDiff = Infinity;
        for (const target of navTargets) {
          const rect = target.el.getBoundingClientRect();
          const diff = Math.abs(rect.top - headerHeight);
          if (diff < minDiff) {
            minDiff = diff;
            activeTarget = target;
          }
        }
      }
    }

    if (activeTarget) {
      stageNavBtns.forEach((b) => b.classList.remove('active'));
      activeTarget.btn.classList.add('active');

      if (navInner) {
        const btnRect = activeTarget.btn.getBoundingClientRect();
        const innerRect = navInner.getBoundingClientRect();
        if (btnRect.left < innerRect.left || btnRect.right > innerRect.right) {
          activeTarget.btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    }
  };

  window.addEventListener('scroll', updateScrollSpy, { passive: true });
  window.addEventListener('resize', updateScrollSpy, { passive: true });
  updateScrollSpy();

  // Smooth scroll with sticky header offset on button click
  stageNavBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.getElementById(href.slice(1));
        if (target) {
          e.preventDefault();
          const targetTop = target.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top: targetTop, behavior: 'smooth' });
          stageNavBtns.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          if (navInner) {
            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        }
      }
    });
  });

  // 19. Re-initialize Lucide Icons for dynamic additions
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// Export globally for inline triggers if needed
window.AquaToast = AquaToast;
window.AquaTooltip = AquaTooltip;

