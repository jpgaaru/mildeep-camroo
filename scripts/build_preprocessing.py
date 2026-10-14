#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generator script to build the complete, self-contained preprocessing.html
for Devi Fisheries Limited Camaroo ERP v3.0.0.
Implements all 21 screens, 4 modals, 3 canvas charts, live search, and toast alerts.
"""

import os

HTML_CONTENT = r'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Devi Fisheries Limited — Pre-Processing | Camaroo v3.0.0</title>
<style>
/* ============================================
   RESET & BASE DESIGN SYSTEM TOKENS
   ============================================ */
:root {
  --primary: #14b8a6;
  --primary-hover: #0d9488;
  --primary-light: rgba(20, 184, 166, 0.12);
  --danger: #ef4444;
  --danger-light: rgba(239, 68, 68, 0.12);
  --warning: #f59e0b;
  --warning-light: rgba(245, 158, 11, 0.12);
  --success: #10b981;
  --success-light: rgba(16, 185, 129, 0.12);
  --info: #3b82f6;
  --info-light: rgba(59, 130, 246, 0.12);
  --bg-page: #f4f6f9;
  --bg-card: #ffffff;
  --border-card: #e2e8f0;
  --text-main: #0f172a;
  --text-body: #334155;
  --text-muted: #64748b;
  --text-label: #475569;
  --sidebar-start: #0a1f2c;
  --sidebar-end: #06141d;
  --sidebar-border: #0f2a3a;
  --sidebar-text: #94a3b8;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html, body {
  height: 100%;
  font-family: 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  background: var(--bg-page);
  color: var(--text-body);
  font-size: 14px;
}
button { cursor: pointer; font-family: inherit; }
input, select, textarea { font-family: inherit; }

/* ============================================
   LAYOUT: SIDEBAR + MAIN CONTENT
   ============================================ */
.app-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: linear-gradient(180deg, var(--sidebar-start) 0%, var(--sidebar-end) 100%);
  color: var(--sidebar-text);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow-y: auto;
  border-right: 1px solid var(--sidebar-border);
  transition: width 0.25s ease;
  user-select: none;
}
.sidebar-header {
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--sidebar-border);
}
.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit;
}
.brand-icon {
  width: 38px;
  height: 38px;
  background: linear-gradient(135deg, #14b8a6, #0d9488);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 2px 8px rgba(20, 184, 166, 0.4);
}
.brand-text h2 {
  font-size: 15px;
  color: #fff;
  font-weight: 700;
  letter-spacing: -0.2px;
}
.brand-text p {
  font-size: 10.5px;
  color: #64748b;
  margin-top: 1px;
}
.sidebar-toggle {
  background: none;
  border: none;
  color: #14b8a6;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
}
.sidebar-toggle:hover { background: rgba(255, 255, 255, 0.05); }

.sidebar-nav {
  padding: 10px 0;
  flex: 1;
}
.nav-section-title {
  padding: 14px 22px 6px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #475569;
  text-transform: uppercase;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  margin: 2px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
  font-size: 13px;
  font-weight: 500;
  color: #94a3b8;
  position: relative;
  text-decoration: none;
}
.nav-item:hover {
  background: #0f2a3a;
  color: #e2e8f0;
}
.nav-item.active {
  background: linear-gradient(90deg, rgba(20, 184, 166, 0.18), rgba(20, 184, 166, 0.04));
  color: #fff;
  font-weight: 600;
}
.nav-item.active::before {
  content: '';
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 22px;
  background: var(--primary);
  border-radius: 0 4px 4px 0;
}
.nav-item .dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #334155;
  flex-shrink: 0;
  transition: all 0.2s;
}
.nav-item.active .dot {
  background: var(--primary);
  box-shadow: 0 0 8px var(--primary);
}
.nav-item .icon {
  font-size: 15px;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}
.nav-item .label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-footer {
  padding: 14px 20px;
  border-top: 1px solid var(--sidebar-border);
  font-size: 11px;
  color: #475569;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Main Content */
.main-content {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.top-bar {
  background: #fff;
  padding: 12px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-card);
  position: sticky;
  top: 0;
  z-index: 40;
}
.breadcrumb {
  font-size: 13px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 6px;
}
.breadcrumb span.current {
  color: var(--primary);
  font-weight: 600;
}
.top-bar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}
.user-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 12px 5px 6px;
  background: #f1f5f9;
  border-radius: 20px;
  font-size: 12.5px;
  border: 1px solid #e2e8f0;
}
.user-avatar-sm {
  width: 26px;
  height: 26px;
  background: linear-gradient(135deg, var(--primary), var(--primary-hover));
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 11px;
}
.user-info-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}
.user-name { font-weight: 600; color: var(--text-main); font-size: 12px; }
.user-role { font-size: 10px; color: var(--text-muted); }

.content-area {
  padding: 24px 28px 40px;
  flex: 1;
}

/* ============================================
   SCREEN CONTAINER & TRANSITIONS
   ============================================ */
.screen { display: none; }
.screen.active {
  display: block;
  animation: fadeIn 0.22s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.screen-header {
  margin-bottom: 20px;
}
.screen-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-main);
  letter-spacing: -0.3px;
}
.screen-subtitle {
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 3px;
}

/* ============================================
   DASHBOARD TELEMETRY: KPIS, CHARTS, ALERTS
   ============================================ */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}
.kpi-card {
  background: var(--bg-card);
  border-radius: 12px;
  padding: 18px 20px;
  border: 1px solid var(--border-card);
  position: relative;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}
.kpi-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--primary);
}
.kpi-card.warning::before { background: var(--warning); }
.kpi-card.danger::before { background: var(--danger); }
.kpi-card.info::before { background: var(--info); }

.kpi-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin-bottom: 6px;
}
.kpi-value {
  font-size: 26px;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.1;
  margin-bottom: 4px;
}
.kpi-sub {
  font-size: 11.5px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}
.kpi-sub .up { color: var(--success); font-weight: 600; }
.kpi-sub .down { color: var(--danger); font-weight: 600; }

.dashboard-row-2col {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}
.dashboard-row-even {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}
.chart-card, .alert-card {
  background: var(--bg-card);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid var(--border-card);
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.card-title {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--text-main);
}
.chart-container {
  height: 240px;
  position: relative;
  width: 100%;
}
.chart-container canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}

.alert-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.alert-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 8px;
  background: #f8fafc;
  border-left: 3.5px solid var(--warning);
}
.alert-item.danger { border-left-color: var(--danger); background: #fef2f2; }
.alert-item.success { border-left-color: var(--success); background: #f0fdf4; }
.alert-icon { font-size: 17px; flex-shrink: 0; line-height: 1; margin-top: 1px; }
.alert-content { flex: 1; }
.alert-title { font-size: 12.5px; font-weight: 600; color: var(--text-main); margin-bottom: 2px; }
.alert-desc { font-size: 11.5px; color: var(--text-muted); }

.quick-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-top: 8px;
}
.action-btn {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 10px;
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text-main);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
}
.action-btn:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(20, 184, 166, 0.16);
  color: var(--primary);
}
.action-btn .act-icon { font-size: 22px; }

/* ============================================
   FORMS & INPUT DESIGN SYSTEM
   ============================================ */
.form-card {
  background: var(--bg-card);
  border-radius: 12px;
  padding: 22px 24px;
  border: 1px solid var(--border-card);
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}
.form-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.form-grid.grid-3col { grid-template-columns: repeat(3, 1fr); }
.form-grid.grid-2col { grid-template-columns: repeat(2, 1fr); }

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.form-group.col-span-2 { grid-column: span 2; }
.form-group.col-span-3 { grid-column: span 3; }
.form-group.col-span-4 { grid-column: span 4; }

.form-group label {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-label);
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.form-group label .req {
  color: var(--danger);
  margin-left: 2px;
}
.form-group input,
.form-group select,
.form-group textarea {
  padding: 8px 12px;
  border: 1.5px solid var(--border-card);
  border-radius: 8px;
  font-size: 13px;
  color: var(--text-main);
  background: #fff;
  transition: all 0.15s ease;
  outline: none;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.12);
}
.form-group input[readonly],
.form-group select[disabled] {
  background: #f1f5f9;
  color: #64748b;
  cursor: not-allowed;
}
.form-group input.error,
.form-group select.error {
  border-color: var(--danger) !important;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.12);
}
.form-group textarea {
  resize: vertical;
  min-height: 60px;
}

.form-actions-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid #f1f5f9;
}
.form-actions-row.centered { justify-content: center; }

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid transparent;
  transition: all 0.15s ease;
  line-height: 1.2;
}
.btn-primary {
  background: var(--primary);
  color: #fff;
  box-shadow: 0 1px 3px rgba(20, 184, 166, 0.25);
}
.btn-primary:hover {
  background: var(--primary-hover);
  box-shadow: 0 3px 8px rgba(20, 184, 166, 0.35);
}
.btn-danger {
  background: var(--danger);
  color: #fff;
}
.btn-danger:hover { background: #dc2626; }
.btn-info {
  background: var(--info);
  color: #fff;
}
.btn-info:hover { background: #2563eb; }
.btn-secondary {
  background: #f1f5f9;
  color: var(--text-body);
  border-color: #cbd5e1;
}
.btn-secondary:hover { background: #e2e8f0; }
.btn-outline {
  background: #fff;
  color: #059669;
  border-color: #10b981;
}
.btn-outline:hover {
  background: #ecfdf5;
}
.btn-search {
  background: var(--primary);
  color: #fff;
  padding: 8px 20px;
  font-weight: 600;
}
.btn-search:hover { background: var(--primary-hover); }
.btn-sm {
  padding: 5px 10px;
  font-size: 12px;
}

/* ============================================
   TABLE DESIGN SYSTEM
   ============================================ */
.table-card {
  background: var(--bg-card);
  border-radius: 12px;
  border: 1px solid var(--border-card);
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
  margin-bottom: 24px;
}
.table-header {
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid var(--border-card);
  background: #fff;
}
.table-search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 6px 12px;
  width: 260px;
}
.table-search-box input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 12.5px;
  width: 100%;
  color: var(--text-main);
}
.table-actions-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.table-wrapper {
  overflow-x: auto;
  width: 100%;
}
table.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12.5px;
  text-align: left;
}
table.data-table th {
  background: #f8fafc;
  color: #475569;
  font-weight: 700;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.35px;
  padding: 10px 14px;
  border-bottom: 1.5px solid var(--border-card);
  white-space: nowrap;
}
table.data-table th.sortable { cursor: pointer; user-select: none; }
table.data-table th.sortable:hover { color: var(--primary); }
table.data-table td {
  padding: 10px 14px;
  border-bottom: 1px solid #f1f5f9;
  color: var(--text-body);
  vertical-align: middle;
  white-space: nowrap;
}
table.data-table tr:hover td {
  background: #f8fafc;
}
table.data-table tr.highlight-teal td {
  background: rgba(20, 184, 166, 0.08);
}
table.data-table td.empty-cell {
  text-align: center;
  padding: 32px 14px;
  color: var(--text-muted);
  font-style: italic;
}

table.data-table input.tbl-input {
  padding: 4px 8px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 12px;
  width: 80px;
}
table.data-table input.tbl-input[readonly] {
  background: #f1f5f9;
  border-color: transparent;
}

/* Badges & Flags */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 9px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3px;
  line-height: 1;
}
.badge-pending {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.badge-received, .badge-success {
  background: #f0fdf4;
  color: #15803d;
  border: 1px solid #bbf7d0;
}
.badge-warning {
  background: #fffbeb;
  color: #b45309;
  border: 1px solid #fde68a;
}
.badge-teal {
  background: rgba(20, 184, 166, 0.12);
  color: #0f766e;
  border: 1px solid rgba(20, 184, 166, 0.25);
}

.text-teal-link {
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}
.text-teal-link:hover { text-decoration: underline; }
.diff-negative { color: #16a34a; font-weight: 600; }
.diff-positive { color: #dc2626; font-weight: 600; }

/* Multi-tier matrix tables */
table.matrix-table th {
  text-align: center;
  border: 1px solid #e2e8f0;
}
table.matrix-table td {
  border: 1px solid #e2e8f0;
  text-align: center;
}

/* ============================================
   MODALS & BACKDROP OVERLAY
   ============================================ */
.modal-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(10, 31, 44, 0.65);
  backdrop-filter: blur(4px);
  z-index: 1000;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.modal-overlay.show {
  display: flex;
  animation: modalFade 0.2s ease-out;
}
@keyframes modalFade {
  from { opacity: 0; transform: scale(0.97); }
  to { opacity: 1; transform: scale(1); }
}
.modal-content {
  background: #fff;
  border-radius: 14px;
  width: 100%;
  max-width: 760px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  padding: 24px 28px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.modal-breadcrumb {
  font-size: 11.5px;
  color: var(--text-muted);
  margin-bottom: 4px;
}
.modal-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-main);
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-card);
}
.modal-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 22px;
  padding-top: 14px;
  border-top: 1px solid #f1f5f9;
}

/* ============================================
   TOAST NOTIFICATION ENGINE
   ============================================ */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
}
.toast {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-radius: 10px;
  background: #0f172a;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  box-shadow: 0 10px 25px rgba(0,0,0,0.25);
  animation: toastSlide 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  transition: opacity 0.2s;
}
.toast.success { border-left: 4px solid var(--success); }
.toast.error { border-left: 4px solid var(--danger); }
.toast.info { border-left: 4px solid var(--info); }
@keyframes toastSlide {
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
}

/* ============================================
   RESPONSIVE BREAKPOINTS
   ============================================ */
@media (max-width: 1200px) {
  .kpi-grid { grid-template-columns: repeat(2, 1fr); }
  .dashboard-row-2col, .dashboard-row-even { grid-template-columns: 1fr; }
}
@media (max-width: 1024px) {
  .form-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .sidebar { width: 72px; }
  .sidebar .brand-text,
  .sidebar .nav-section-title,
  .sidebar .nav-item .label,
  .sidebar-footer { display: none; }
  .sidebar-header { justify-content: center; padding: 14px 0; }
  .nav-item { justify-content: center; padding: 12px 0; margin: 2px 6px; }
  .form-grid { grid-template-columns: 1fr; }
  .kpi-grid { grid-template-columns: 1fr; }
  .quick-actions { grid-template-columns: repeat(2, 1fr); }
  .top-bar { padding: 12px 16px; }
  .content-area { padding: 16px; }
}
</style>
</head>
<body>

<div class="app-layout">
  <!-- ============================================
       SIDEBAR NAVIGATION
       ============================================ -->
  <aside class="sidebar" id="app-sidebar">
    <div class="sidebar-header">
      <a href="javascript:void(0)" class="sidebar-brand" onclick="navigateTo('screen-dashboard')">
        <div class="brand-icon">🦐</div>
        <div class="brand-text">
          <h2>Pre-Processing</h2>
          <p>Devi Fisheries Ltd</p>
        </div>
      </a>
      <button class="sidebar-toggle" id="sidebar-toggle-btn" title="Toggle Navigation">❮</button>
    </div>

    <nav class="sidebar-nav">
      <!-- Section: MAIN -->
      <div class="nav-section-title">MAIN</div>
      <a class="nav-item active" data-screen="screen-dashboard" onclick="navigateTo('screen-dashboard')">
        <span class="dot"></span>
        <span class="icon">📊</span>
        <span class="label">Floor Overview</span>
      </a>

      <!-- Section: OPERATIONS -->
      <div class="nav-section-title">OPERATIONS</div>
      <a class="nav-item" data-screen="screen-rmreceived" onclick="navigateTo('screen-rmreceived')">
        <span class="dot"></span>
        <span class="icon">🚛</span>
        <span class="label">RM Received Trackid</span>
      </a>
      <a class="nav-item" data-screen="screen-deheading" onclick="navigateTo('screen-deheading')">
        <span class="dot"></span>
        <span class="icon">✂️</span>
        <span class="label">Deheading</span>
      </a>
      <a class="nav-item" data-screen="screen-grading" onclick="navigateTo('screen-grading')">
        <span class="dot"></span>
        <span class="icon">📏</span>
        <span class="label">Grading</span>
      </a>
      <a class="nav-item" data-screen="screen-deheadingtrackid" onclick="navigateTo('screen-deheadingtrackid')">
        <span class="dot"></span>
        <span class="icon">📋</span>
        <span class="label">De-Heading Trackid</span>
      </a>
      <a class="nav-item" data-screen="screen-gradingtrackid" onclick="navigateTo('screen-gradingtrackid')">
        <span class="dot"></span>
        <span class="icon">⚙️</span>
        <span class="label">Grading Trackid</span>
      </a>
      <a class="nav-item" data-screen="screen-valueaddition" onclick="navigateTo('screen-valueaddition')">
        <span class="dot"></span>
        <span class="icon">🥣</span>
        <span class="label">Value Addition Trackid</span>
      </a>
      <a class="nav-item" data-screen="screen-honqtytransfer" onclick="navigateTo('screen-honqtytransfer')">
        <span class="dot"></span>
        <span class="icon">🔄</span>
        <span class="label">Hon Qty Transfer After VA</span>
      </a>

      <!-- Section: CHEMICALS -->
      <div class="nav-section-title">CHEMICALS</div>
      <a class="nav-item" data-screen="screen-chemicalpos" onclick="navigateTo('screen-chemicalpos')">
        <span class="dot"></span>
        <span class="icon">📝</span>
        <span class="label">Chemical Pos</span>
      </a>
      <a class="nav-item" data-screen="screen-receivedchemicals" onclick="navigateTo('screen-receivedchemicals')">
        <span class="dot"></span>
        <span class="icon">📦</span>
        <span class="label">Received Chemicals</span>
      </a>
      <a class="nav-item" data-screen="screen-chemicalsconsumption" onclick="navigateTo('screen-chemicalsconsumption')">
        <span class="dot"></span>
        <span class="icon">🧪</span>
        <span class="label">Chemicals Consumption</span>
      </a>
      <a class="nav-item" data-screen="screen-chemicalreceivedreport" onclick="navigateTo('screen-chemicalreceivedreport')">
        <span class="dot"></span>
        <span class="icon">📑</span>
        <span class="label">Chemical Received Report</span>
      </a>
      <a class="nav-item" data-screen="screen-chemicalopeningbalance" onclick="navigateTo('screen-chemicalopeningbalance')">
        <span class="dot"></span>
        <span class="icon">⚖️</span>
        <span class="label">Opening Balance Report</span>
      </a>
      <a class="nav-item" data-screen="screen-chemicalbalancereport" onclick="navigateTo('screen-chemicalbalancereport')">
        <span class="dot"></span>
        <span class="icon">📊</span>
        <span class="label">Chemical Balance Report</span>
      </a>
      <a class="nav-item" data-screen="screen-chemicalpaymentslist" onclick="navigateTo('screen-chemicalpaymentslist')">
        <span class="dot"></span>
        <span class="icon">💳</span>
        <span class="label">Chemical Payments List</span>
      </a>

      <!-- Section: TRACEABILITY -->
      <div class="nav-section-title">TRACEABILITY</div>
      <a class="nav-item" data-screen="screen-trackcodereport" onclick="navigateTo('screen-trackcodereport')">
        <span class="dot"></span>
        <span class="icon">🔍</span>
        <span class="label">Track Code Report</span>
      </a>
      <a class="nav-item" data-screen="screen-vafloorbalance" onclick="navigateTo('screen-vafloorbalance')">
        <span class="dot"></span>
        <span class="icon">🏢</span>
        <span class="label">VA Floor Balance Report</span>
      </a>
      <a class="nav-item" data-screen="screen-vatransfer" onclick="navigateTo('screen-vatransfer')">
        <span class="dot"></span>
        <span class="icon">🚚</span>
        <span class="label">VA Transfer Report</span>
      </a>
      <a class="nav-item" data-screen="screen-assumedreports" onclick="navigateTo('screen-assumedreports')">
        <span class="dot"></span>
        <span class="icon">💰</span>
        <span class="label">Assumed Reports by Rm & Arrival</span>
      </a>
      <a class="nav-item" data-screen="screen-consolidationdaily" onclick="navigateTo('screen-consolidationdaily')">
        <span class="dot"></span>
        <span class="icon">📈</span>
        <span class="label">Consolidation Report Daily & Monthly</span>
      </a>
      <a class="nav-item" data-screen="screen-fileupload" onclick="navigateTo('screen-fileupload')">
        <span class="dot"></span>
        <span class="icon">📁</span>
        <span class="label">File Upload</span>
      </a>
    </nav>

    <div class="sidebar-footer">
      <span>© 2026 Camaroo</span>
      <span>v3.0.0</span>
    </div>
  </aside>

  <!-- ============================================
       MAIN CONTENT CONTAINER
       ============================================ -->
  <main class="main-content" id="main-content-scroll">
    <!-- Sticky Top Bar -->
    <header class="top-bar">
      <div class="breadcrumb" id="top-breadcrumb">
        Pre-Processing / <span class="current" id="current-screen-name">Floor Overview</span>
      </div>
      <div class="top-bar-right">
        <div class="user-chip">
          <div class="user-avatar-sm">SA</div>
          <div class="user-info-text">
            <span class="user-name">SalesAdmin</span>
            <span class="user-role">Plant Ops Admin</span>
          </div>
        </div>
      </div>
    </header>

    <div class="content-area">

      <!-- ============================================
           SCREEN 1: DASHBOARD
           ============================================ -->
      <section class="screen active" id="screen-dashboard">
        <div class="screen-header">
          <h1 class="screen-title">Floor Overview</h1>
          <p class="screen-subtitle">Real-time insights across all preprocessing operations · DFL UNIT-1 (VSP)</p>
        </div>

        <!-- Row 1: Today's Operations KPIs -->
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-label">Today's Arrivals</div>
            <div class="kpi-value">3</div>
            <div class="kpi-sub"><span class="up">▲ 12%</span> 16,009.30 Kgs vs yesterday</div>
          </div>
          <div class="kpi-card info">
            <div class="kpi-label">Average Yield</div>
            <div class="kpi-value">69.45%</div>
            <div class="kpi-sub"><span class="down">▼ 0.8%</span> Across 3 active batches</div>
          </div>
          <div class="kpi-card warning">
            <div class="kpi-label">Low Chemical Stock</div>
            <div class="kpi-value">2</div>
            <div class="kpi-sub">STPP & Phosphate below threshold</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">WIP on Floor</div>
            <div class="kpi-value">3,103</div>
            <div class="kpi-sub">Kgs across 6 grades · 119 crates</div>
          </div>
        </div>

        <!-- Row 2: Alerts & Actions KPIs -->
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-label">Pending Transfers</div>
            <div class="kpi-value">4</div>
            <div class="kpi-sub">2,955.60 Kgs awaiting movement</div>
          </div>
          <div class="kpi-card danger">
            <div class="kpi-label">Count Discrepancies</div>
            <div class="kpi-value" style="color:var(--danger);">-19.6</div>
            <div class="kpi-sub">Shortfall in today's arrivals</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Pending Payments</div>
            <div class="kpi-value">₹0</div>
            <div class="kpi-sub">All chemical invoices cleared</div>
          </div>
          <div class="kpi-card info">
            <div class="kpi-label">Active Batches</div>
            <div class="kpi-value">7</div>
            <div class="kpi-sub">3 in grading · 4 in VA</div>
          </div>
        </div>

        <!-- Charts + Alerts Row -->
        <div class="dashboard-row-2col">
          <div class="chart-card">
            <div class="card-header">
              <span class="card-title">Production Trend (Last 7 Days)</span>
              <select style="font-size:12px;padding:4px 8px;border:1px solid #cbd5e1;border-radius:6px;outline:none;">
                <option>DFL UNIT-1 (VSP)</option>
                <option>DFL UNIT-2 (KKD)</option>
                <option>DFL UNIT-5 (JPT)</option>
              </select>
            </div>
            <div class="chart-container">
              <canvas id="productionChart"></canvas>
            </div>
          </div>

          <div class="alert-card">
            <div class="card-header">
              <span class="card-title">Alerts & Actions</span>
            </div>
            <div class="alert-list">
              <div class="alert-item danger">
                <span class="alert-icon">🧪</span>
                <div class="alert-content">
                  <div class="alert-title">CARNAL 659 S ADVANCED (STPP)</div>
                  <div class="alert-desc">Stock at 1,671 bags · Reorder soon</div>
                </div>
              </div>
              <div class="alert-item">
                <span class="alert-icon">🚛</span>
                <div class="alert-content">
                  <div class="alert-title">Count shortfall on AP39TT4177</div>
                  <div class="alert-desc">-9.0 count difference on VM-VSP-AMP-056</div>
                </div>
              </div>
              <div class="alert-item">
                <span class="alert-icon">📦</span>
                <div class="alert-content">
                  <div class="alert-title">Batch VM-KKD-MKP-043 pending transfer</div>
                  <div class="alert-desc">1,186 Kgs ready for DFL UNIT-3 (PSP)</div>
                </div>
              </div>
              <div class="alert-item success">
                <span class="alert-icon">✅</span>
                <div class="alert-content">
                  <div class="alert-title">ALTESA NEO S100 received</div>
                  <div class="alert-desc">240 bags cleared at Kakinada port</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chart Row 2: Yield by Grade + Chemical Usage -->
        <div class="dashboard-row-even">
          <div class="chart-card">
            <div class="card-header">
              <span class="card-title">Yield by Grade</span>
              <span style="font-size:11.5px;color:var(--text-muted);">Target: &ge; 70%</span>
            </div>
            <div class="chart-container">
              <canvas id="yieldChart"></canvas>
            </div>
          </div>

          <div class="chart-card">
            <div class="card-header">
              <span class="card-title">Chemical Consumption (STPP)</span>
              <span style="font-size:11.5px;color:var(--text-muted);">Daily KGs Used</span>
            </div>
            <div class="chart-container">
              <canvas id="chemicalChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Quick Actions Row -->
        <div class="quick-actions">
          <button class="action-btn" onclick="navigateTo('screen-rmreceived')">
            <span class="act-icon">🚛</span>
            <span>New RM Received</span>
          </button>
          <button class="action-btn" onclick="navigateTo('screen-deheading')">
            <span class="act-icon">✂️</span>
            <span>Log Deheading</span>
          </button>
          <button class="action-btn" onclick="navigateTo('screen-grading')">
            <span class="act-icon">📏</span>
            <span>Log Grading</span>
          </button>
          <button class="action-btn" onclick="navigateTo('screen-trackcodereport')">
            <span class="act-icon">🔍</span>
            <span>Track a Batch</span>
          </button>
        </div>
      </section>

      <!-- ============================================
           SCREEN 2: RM RECEIVED TRACKID
           ============================================ -->
      <section class="screen" id="screen-rmreceived">
        <div class="screen-header">
          <h1 class="screen-title">RM Received Trackid</h1>
          <p class="screen-subtitle">Log incoming raw material trucks and generate Track IDs for batch traceability</p>
        </div>

        <div class="form-card">
          <form id="form-rmreceived" onsubmit="event.preventDefault(); showToast('Track ID saved successfully', 'success');">
            <div class="form-grid">
              <div class="form-group">
                <label>Production Plant <span class="req">*</span></label>
                <select required>
                  <option>VSP - DFL UNIT-1 (VSP)</option>
                  <option>KKD - DFL UNIT-2 (KKD)</option>
                  <option>JPT - DFL UNIT-5 (JPT)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Arrival Date</label>
                <input type="date" value="2025-10-13">
              </div>
              <div class="form-group">
                <label>Vehicle Number <span class="req">*</span></label>
                <select id="rm-vehicle-select" required onchange="updateRmTrackCode(this.value)">
                  <option value="VM-VSP-AVN-034">AP05TM2628 - VM-VSP-AVN-034</option>
                  <option value="VM-VSP-SKM-054">AP39UF7171 - VM-VSP-SKM-054</option>
                  <option value="VM-VSP-SKM-055">AP39TT4299 - VM-VSP-SKM-055</option>
                </select>
              </div>
              <div class="form-group">
                <label>Track Code Format <span class="req">*</span></label>
                <input type="text" id="rm-trackcode-input" value="VM-VSP-AVN-034" readonly>
              </div>
              <div class="form-group">
                <label>Seal Number <span class="req">*</span></label>
                <input type="text" value="55260" required>
              </div>
              <div class="form-group">
                <label>Supervisor <span class="req">*</span></label>
                <select required>
                  <option>J.PRASAD</option>
                  <option>K VENKATA VINAY</option>
                  <option>T.VENKATESH</option>
                </select>
              </div>
              <div class="form-group col-span-2">
                <label>Remarks</label>
                <textarea placeholder="Enter Remarks"></textarea>
              </div>
            </div>
            <div class="form-actions-row centered">
              <button type="submit" class="btn btn-primary" style="padding:10px 32px;">💾 Save</button>
            </div>
          </form>
        </div>

        <div class="table-card">
          <div class="table-header">
            <div class="table-search-box">
              <span>🔍</span>
              <input type="text" class="table-search" placeholder="Search bill or variety...">
            </div>
            <div class="table-actions-right">
              <button class="btn btn-outline" onclick="showToast('Downloading Excel report...', 'info')">📊 Download Excel</button>
            </div>
          </div>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Bill No</th>
                  <th>Variety</th>
                  <th>Count</th>
                  <th>Head on Weight</th>
                  <th>Recv Count</th>
                  <th>Recv Weight</th>
                  <th>Sample HO Qty</th>
                  <th>No Of Pcs</th>
                  <th>Count Diff</th>
                  <th>Qty Diff</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>AVN/2526/0001</td>
                  <td>VM-HEAD ON</td>
                  <td><input type="text" class="tbl-input" value="63.000" readonly></td>
                  <td><input type="text" class="tbl-input" value="309.000" readonly></td>
                  <td><input type="number" class="tbl-input" value="60.000" oninput="calcRmDiff(this, 63, 'countDiff-1')"></td>
                  <td><input type="number" class="tbl-input" value="309"></td>
                  <td><input type="number" class="tbl-input" value="5.000"></td>
                  <td><input type="number" class="tbl-input" value="300"></td>
                  <td><span id="countDiff-1" class="diff-negative">-3</span></td>
                  <td>0</td>
                  <td><button class="btn btn-sm btn-secondary" onclick="showToast('Row updated', 'info')">✏️</button></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>AVN/2526/0001</td>
                  <td>VM-HEAD ON</td>
                  <td><input type="text" class="tbl-input" value="68.000" readonly></td>
                  <td><input type="text" class="tbl-input" value="402.000" readonly></td>
                  <td><input type="number" class="tbl-input" value="67.800" oninput="calcRmDiff(this, 68, 'countDiff-2')"></td>
                  <td><input type="number" class="tbl-input" value="402"></td>
                  <td><input type="number" class="tbl-input" value="5.000"></td>
                  <td><input type="number" class="tbl-input" value="339"></td>
                  <td><span id="countDiff-2" class="diff-negative">-0.2</span></td>
                  <td>0</td>
                  <td><button class="btn btn-sm btn-secondary" onclick="showToast('Row updated', 'info')">✏️</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ============================================
           SCREEN 3: DEHEADING
           ============================================ -->
      <section class="screen" id="screen-deheading">
        <div class="screen-header">
          <h1 class="screen-title">Deheading</h1>
          <p class="screen-subtitle">Record head removal operations — track HON to HL conversion and yield</p>
        </div>

        <div class="form-card">
          <form onsubmit="event.preventDefault(); showToast('Deheading record saved', 'success');">
            <div class="form-grid">
              <div class="form-group">
                <label>Arrival Date</label>
                <input type="date" value="2026-10-14">
              </div>
              <div class="form-group">
                <label>Arrival/Lot Code <span class="req">*</span></label>
                <select required>
                  <option>Melting</option>
                  <option>Fresh</option>
                </select>
              </div>
              <div class="form-group">
                <label>Production Plant <span class="req">*</span></label>
                <select required>
                  <option>VSP-DFL UNIT-1 (VSP)</option>
                  <option>KKD-DFL UNIT-2 (KKD)</option>
                </select>
              </div>
              <div class="form-group">
                <label>De Heading Station <span class="req">*</span></label>
                <select required>
                  <option>Own Center</option>
                  <option>Outside Center</option>
                </select>
              </div>
              <div class="form-group">
                <label>De Heading Date <span class="req">*</span></label>
                <input type="date" value="2026-10-14" required>
              </div>
              <div class="form-group">
                <label>Select Shift <span class="req">*</span></label>
                <select required>
                  <option>A SHIFT</option>
                  <option>B SHIFT</option>
                  <option>C SHIFT</option>
                </select>
              </div>
              <div class="form-group">
                <label>Supervisor <span class="req">*</span></label>
                <select required>
                  <option>K VENKATA VINAY</option>
                  <option>T.VENKATESH</option>
                  <option>D.SURYA NARAYANA</option>
                </select>
              </div>
              <div class="form-group">
                <label>Headon Count After Checking (Count-2) <span class="req">*</span></label>
                <input type="number" placeholder="Enter Count" required>
              </div>
              <div class="form-group">
                <label>Sample Yield (%)</label>
                <input type="number" step="0.1" id="dehead-sample-yield" placeholder="e.g. 70">
              </div>
              <div class="form-group">
                <label>Ice Consumption (Kgs)</label>
                <input type="number" placeholder="Ice Kgs">
              </div>
              <div class="form-group col-span-2">
                <label>Remarks</label>
                <textarea placeholder="Enter Remarks(Optional)"></textarea>
              </div>
              <div class="form-group">
                <label>HON Quantity(Kgs) <span class="req">*</span></label>
                <input type="number" step="0.1" id="dehead-hon-qty" placeholder="HON Kgs" required oninput="calcDeheadYield()">
              </div>
              <div class="form-group">
                <label>HL Count (Per Kg) <span class="req">*</span></label>
                <input type="number" step="0.01" placeholder="HL Count" required>
              </div>
              <div class="form-group">
                <label>HL Quantity(Kgs) <span class="req">*</span></label>
                <input type="number" step="0.1" id="dehead-hl-qty" placeholder="HL Kgs" required oninput="calcDeheadYield()">
              </div>
              <div class="form-group">
                <label>HON Count (Per Kg)</label>
                <input type="number" step="0.01" placeholder="HON Count">
              </div>
            </div>
            <div class="form-actions-row">
              <button type="button" class="btn btn-secondary" onclick="this.form.reset(); showToast('New record created', 'info');">+ New</button>
              <button type="submit" class="btn btn-primary">💾 Save</button>
            </div>
          </form>
        </div>

        <div class="table-card">
          <div class="table-header">
            <div class="table-search-box">
              <span>🔍</span>
              <input type="text" class="table-search" placeholder="Search deheading logs...">
            </div>
            <div class="table-actions-right">
              <button class="btn btn-outline" onclick="showToast('Downloading Excel...', 'info')">📊 Download Excel</button>
            </div>
          </div>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th class="sortable">S.No ▲</th>
                  <th>Arrival Code</th>
                  <th>Production Plant</th>
                  <th>Center</th>
                  <th>De Heading Date</th>
                  <th>Shift</th>
                  <th>SuperVisor</th>
                  <th>Checking Count-2</th>
                  <th>HL Count</th>
                  <th>HON Count</th>
                  <th>HON Quantity(Kgs)</th>
                  <th>HL Quantity(Kgs)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="12" class="empty-cell">No data available in table</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ============================================
           SCREEN 4: GRADING
           ============================================ -->
      <section class="screen" id="screen-grading">
        <div class="screen-header">
          <h1 class="screen-title">Grading</h1>
          <p class="screen-subtitle">Sort processed shrimp by size and record grade-wise weights</p>
        </div>

        <div class="form-card">
          <form onsubmit="event.preventDefault(); showToast('Grading record saved', 'success');">
            <div class="form-grid">
              <div class="form-group">
                <label>Arrival Date <span class="req">*</span></label>
                <input type="date" value="2026-10-14" required>
              </div>
              <div class="form-group">
                <label>Arrival/Lot Code <span class="req">*</span></label>
                <input type="text" placeholder="Enter Arrival/Lot Code" required>
              </div>
              <div class="form-group">
                <label>Production Plant <span class="req">*</span></label>
                <select required>
                  <option>Select</option>
                  <option selected>VSP-DFL UNIT-1 (VSP)</option>
                  <option>KKD-DFL UNIT-2 (KKD)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Grading Station <span class="req">*</span></label>
                <select required>
                  <option>Select</option>
                  <option>Station 1</option>
                  <option>Station 2</option>
                </select>
              </div>
              <div class="form-group">
                <label>Grading Date <span class="req">*</span></label>
                <input type="date" value="2026-10-14" required>
              </div>
              <div class="form-group">
                <label>Select</label>
                <select>
                  <option>Select</option>
                </select>
              </div>
              <div class="form-group">
                <label>Start Time <span class="req">*</span></label>
                <input type="time" value="08:00" required>
              </div>
              <div class="form-group">
                <label>End Time <span class="req">*</span></label>
                <input type="time" value="16:00" required>
              </div>
              <div class="form-group">
                <label>Break Time(Minutes) <span class="req">*</span></label>
                <input type="number" value="30" required>
              </div>
              <div class="form-group col-span-3">
                <label>Remarks</label>
                <textarea placeholder="Enter Remarks"></textarea>
              </div>
              <div class="form-group">
                <label>Select Variety <span class="req">*</span></label>
                <select required>
                  <option>Select</option>
                  <option>VM-HEAD ON</option>
                  <option>VM-HLSO</option>
                </select>
              </div>
              <div class="form-group">
                <label>HL Count(Per LB)</label>
                <input type="number" placeholder="Enter HL Count">
              </div>
              <div class="form-group">
                <label>HL Weight(Kgs)</label>
                <input type="number" step="0.1" placeholder="Enter HL Weight(Kgs)">
              </div>
              <div class="form-group">
                <label>No Of Crates</label>
                <input type="number" placeholder="Enter No Of Crates">
              </div>
            </div>
            <div class="form-actions-row">
              <button type="button" class="btn btn-secondary" onclick="this.form.reset(); showToast('New record created', 'info');">+ New</button>
              <button type="button" class="btn btn-danger" onclick="showToast('Record deleted', 'error');">🗑 Delete</button>
              <button type="submit" class="btn btn-primary">💾 Save</button>
            </div>
          </form>
        </div>
      </section>

      <!-- ============================================
           SCREEN 5: DE-HEADING TRACKID
           ============================================ -->
      <section class="screen" id="screen-deheadingtrackid">
        <div class="screen-header">
          <h1 class="screen-title">De-Heading Trackid</h1>
          <p class="screen-subtitle">Link a Track ID to the deheading process and record shift-level metrics</p>
        </div>

        <div class="form-card">
          <form onsubmit="event.preventDefault(); showToast('De-heading track saved', 'success');">
            <div class="form-grid">
              <div class="form-group">
                <label>Production Plant <span class="req">*</span></label>
                <select required>
                  <option>VSP-DFL UNIT-1 (VSP)</option>
                  <option>KKD-DFL UNIT-2 (KKD)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Arrival Date <span class="req">*</span></label>
                <input type="date" value="2025-10-14" required>
              </div>
              <div class="form-group">
                <label>Track ID <span class="req">*</span></label>
                <select required>
                  <option>VM-VSP-KKD-036</option>
                  <option>VM-VSP-SKM-054</option>
                  <option>VM-VSP-AMP-056</option>
                </select>
              </div>
              <div class="form-group">
                <label>De Heading Date <span class="req">*</span></label>
                <input type="date" value="2025-10-15" required>
              </div>
              <div class="form-group">
                <label>Shift <span class="req">*</span></label>
                <select required>
                  <option>A SHIFT</option>
                  <option>B SHIFT</option>
                  <option>C SHIFT</option>
                </select>
              </div>
              <div class="form-group">
                <label>Supervisor <span class="req">*</span></label>
                <select required>
                  <option>T.VENKATESH</option>
                  <option>K VENKATA VINAY</option>
                </select>
              </div>
              <div class="form-group col-span-2">
                <label>Remarks</label>
                <textarea placeholder="Enter Remarks"></textarea>
              </div>
            </div>

            <div style="margin: 14px 0 6px; text-align: center; color: var(--danger); font-weight: 600; font-size: 13px;">
              Grading Plant → VSP - DFL UNIT-1 (VSP)
            </div>

            <div class="form-actions-row centered">
              <button type="submit" class="btn btn-primary" style="padding:10px 32px;">💾 Save</button>
            </div>
          </form>
        </div>

        <div class="table-card">
          <div class="table-header">
            <div class="table-search-box">
              <span>🔍</span>
              <input type="text" class="table-search" placeholder="Search bill or variety...">
            </div>
            <div class="table-actions-right">
              <button class="btn btn-outline" onclick="showToast('Downloading Excel...', 'info')">📊 Download Excel</button>
            </div>
          </div>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Bill No</th>
                  <th>Variety</th>
                  <th>Count</th>
                  <th>Weight</th>
                  <th>Sample HO Qty</th>
                  <th>Count / No of Pcs</th>
                  <th>Sample HL Qty / Body Yield</th>
                  <th>Yield (%)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>KKD/2526/1254</td>
                  <td>HEAD ON</td>
                  <td><input type="text" class="tbl-input" value="60.000" readonly></td>
                  <td><input type="text" class="tbl-input" value="1748.0" readonly></td>
                  <td><input type="number" class="tbl-input" value="5.00"></td>
                  <td><input type="number" class="tbl-input" value="303.00"></td>
                  <td><input type="number" class="tbl-input" value="3.50"></td>
                  <td><span class="badge badge-teal">70%</span></td>
                  <td><button class="btn btn-sm btn-secondary" onclick="showToast('Row updated', 'info')">✏️</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ============================================
           SCREEN 6: GRADING TRACKID
           ============================================ -->
      <section class="screen" id="screen-gradingtrackid">
        <div class="screen-header">
          <h1 class="screen-title">Grading Trackid</h1>
          <p class="screen-subtitle">Assign a Track ID to a grading machine and record timing metrics</p>
        </div>

        <div class="form-card">
          <form onsubmit="event.preventDefault(); showToast('Grading saved', 'success');">
            <div class="form-grid">
              <div class="form-group">
                <label>Production Plant <span class="req">*</span></label>
                <select required>
                  <option>VSP-DFL UNIT-1 (VSP)</option>
                  <option>KKD-DFL UNIT-2 (KKD)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Arrival Date <span class="req">*</span></label>
                <input type="date" value="2025-10-14" required>
              </div>
              <div class="form-group">
                <label>Track ID <span class="req">*</span></label>
                <select class="error" required title="Selection mandatory">
                  <option value="VM-VSP-KKD-036">VM-VSP-KKD-036</option>
                  <option value="VM-VSP-SKM-054">VM-VSP-SKM-054</option>
                </select>
              </div>
              <div class="form-group">
                <label>Receiving Count <span class="req">*</span></label>
                <input type="number" value="372" required>
              </div>
              <div class="form-group">
                <label>Grading Date <span class="req">*</span></label>
                <input type="date" value="2026-10-14" required>
              </div>
              <div class="form-group">
                <label>Grading Machine <span class="req">*</span></label>
                <select class="error" required title="Machine assignment required">
                  <option>Unit -1 Roller Grading Machine</option>
                  <option>Unit -2 Grading Machine</option>
                </select>
              </div>
              <div class="form-group">
                <label>Start Time</label>
                <input type="time" value="08:00">
              </div>
              <div class="form-group">
                <label>End Time</label>
                <input type="time" value="16:00">
              </div>
              <div class="form-group">
                <label>Break Time(Minutes)</label>
                <input type="number" value="30">
              </div>
              <div class="form-group">
                <label>Supervisor <span class="req">*</span></label>
                <select required>
                  <option>Select</option>
                  <option selected>K VENKATA VINAY</option>
                  <option>T.VENKATESH</option>
                </select>
              </div>
              <div class="form-group col-span-2">
                <label>Remarks</label>
                <textarea placeholder="Enter Remarks"></textarea>
              </div>
            </div>
            <div class="form-actions-row">
              <button type="button" class="btn btn-info" onclick="showToast('Line added', 'info');">+ Add Line</button>
              <button type="button" class="btn btn-danger" onclick="showToast('Line deleted', 'error');">🗑 Delete</button>
              <button type="submit" class="btn btn-primary">Save Grading</button>
            </div>
          </form>
        </div>
      </section>

      <!-- ============================================
           SCREEN 7: VALUE ADDITION TRACKID
           ============================================ -->
      <section class="screen" id="screen-valueaddition">
        <div class="screen-header">
          <h1 class="screen-title">Value Addition Trackid</h1>
          <p class="screen-subtitle">Record peeling/deveining operations and track HL → VA conversion yield</p>
        </div>

        <div class="form-card">
          <form onsubmit="event.preventDefault(); showToast('Value Addition saved', 'success');">
            <div class="form-grid">
              <div class="form-group">
                <label>Production Plant <span class="req">*</span></label>
                <select required>
                  <option>VSP-DFL UNIT-1 (VSP)</option>
                  <option>KKD-DFL UNIT-2 (KKD)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Arrival Date <span class="req">*</span></label>
                <input type="date" value="2025-02-14" required>
              </div>
              <div class="form-group">
                <label>Track ID <span class="req">*</span></label>
                <select required>
                  <option>VM-VSP-SKM-030</option>
                  <option>VM-VSP-KKD-036</option>
                </select>
              </div>
              <div class="form-group">
                <label>Value Addition Date <span class="req">*</span></label>
                <input type="date" value="2025-02-15" required>
              </div>
              <div class="form-group">
                <label>Shift <span class="req">*</span></label>
                <select required>
                  <option>A SHIFT</option>
                  <option>B SHIFT</option>
                </select>
              </div>
              <div class="form-group">
                <label>Supervisor <span class="req">*</span></label>
                <select required>
                  <option>S.BALA KRISHNA</option>
                  <option>D.SURYA NARAYANA</option>
                </select>
              </div>
              <div class="form-group">
                <label>HL Count <span class="req">*</span></label>
                <select required>
                  <option>Select</option>
                  <option selected>14.00</option>
                  <option>20.00</option>
                </select>
              </div>
              <div class="form-group">
                <label>Totals () <span class="req">*</span></label>
                <input type="text" value="Balance" readonly>
              </div>
              <div class="form-group">
                <label>Variety <span class="req">*</span></label>
                <select required>
                  <option>VM RHLSO</option>
                  <option>VM PVPD</option>
                  <option selected>VM RPD</option>
                </select>
              </div>
              <div class="form-group">
                <label>HL WT (KGS) <span class="req">*</span></label>
                <input type="number" step="0.1" value="27" required>
              </div>
              <div class="form-group">
                <label>Crates <span class="req">*</span></label>
                <input type="number" value="4" required>
              </div>
              <div class="form-group">
                <label>VA Out Quantity</label>
                <input type="number" step="0.1" placeholder="Enter VAOutQuantity">
              </div>
            </div>
            <div class="form-actions-row">
              <button type="button" class="btn btn-danger" onclick="showToast('Cancelled', 'error');">Cancel</button>
              <button type="button" class="btn btn-info" onclick="showToast('Transfer initiated', 'info');">Transfer to Another Plant</button>
              <button type="submit" class="btn btn-primary">💾 Save</button>
            </div>
          </form>
        </div>

        <div class="table-card">
          <div class="table-header">
            <div class="table-search-box">
              <span>🔍</span>
              <input type="text" class="table-search" placeholder="Search batch or plant...">
            </div>
          </div>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th><input type="checkbox"></th>
                  <th>S.No</th>
                  <th>Arrival Code</th>
                  <th>Production Plant</th>
                  <th>Soaking Plant</th>
                  <th>Transaction Date</th>
                  <th>Shift</th>
                  <th>Variety</th>
                  <th>HL Wt(Kgs)</th>
                  <th>HL Count</th>
                  <th>No of Crates</th>
                  <th>VA Out Quantity</th>
                  <th>Rejection Weight</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type="checkbox"></td>
                  <td>1</td>
                  <td>SKM/2425/1478</td>
                  <td>DFL UNIT-1 (VSP)</td>
                  <td style="color:var(--danger);font-weight:600;">DFL UNIT-1 (VSP)</td>
                  <td>15-02-2025</td>
                  <td>A SHIFT</td>
                  <td>VM RPD</td>
                  <td>5.700</td>
                  <td>14.00</td>
                  <td>1</td>
                  <td>5.000</td>
                  <td>0.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ============================================
           SCREEN 8: HON QTY TRANSFER AFTER VA
           ============================================ -->
      <section class="screen" id="screen-honqtytransfer">
        <div class="screen-header">
          <h1 class="screen-title">Hon Qty Transfer After VA</h1>
          <p class="screen-subtitle">Transfer processed quantities between plants after value addition</p>
        </div>

        <div class="form-card">
          <form onsubmit="event.preventDefault(); showToast('Transfer submitted', 'success');">
            <div class="form-grid">
              <div class="form-group">
                <label>Production Plant <span class="req">*</span></label>
                <select required>
                  <option>USHA-DFL UNIT-2 (KKD)</option>
                  <option>VSP-DFL UNIT-1 (VSP)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Arrival Date <span class="req">*</span></label>
                <input type="date" value="2025-10-14" required>
              </div>
              <div class="form-group">
                <label>Track ID <span class="req">*</span></label>
                <select required>
                  <option>VM-KKD-MKP-043</option>
                  <option>VM-VSP-SKM-054</option>
                </select>
              </div>
              <div class="form-group">
                <label>Arrival Code <span class="req">*</span></label>
                <select required>
                  <option>MKP/2526/1397 Mix (56.00, 60.00, 62.00)</option>
                </select>
              </div>
              <div class="form-group">
                <label>HON Count <span class="req">*</span></label>
                <select required>
                  <option>Select</option>
                  <option selected>56.00</option>
                  <option>60.00</option>
                </select>
              </div>
              <div class="form-group">
                <label>HON Weight <span class="req">*</span></label>
                <input type="number" step="0.1" value="1783.4" required>
              </div>
              <div class="form-group">
                <label>Weight <span class="req">*</span></label>
                <input type="number" step="0.1" value="1783.4" required>
              </div>
              <div class="form-group">
                <label>Transfer Plant <span class="req">*</span></label>
                <select required>
                  <option>Select</option>
                  <option>DFL UNIT-1 (VSP)</option>
                  <option selected>DFL UNIT-3 (PSP)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Transfer Date <span class="req">*</span></label>
                <input type="date" value="2026-10-14" required>
              </div>
            </div>
            <div class="form-actions-row">
              <button type="button" class="btn btn-danger" onclick="showToast('Closed', 'error');">Close</button>
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>

        <div class="table-card">
          <div class="table-header">
            <div class="table-search-box">
              <span>🔍</span>
              <input type="text" class="table-search" placeholder="Search bill or plant...">
            </div>
          </div>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th class="sortable">S.No ▲</th>
                  <th>Arrival Date</th>
                  <th>Bill Date</th>
                  <th>Bill Number</th>
                  <th>Production Plant</th>
                  <th>Purchase Count</th>
                  <th>Purchase Weight</th>
                  <th>Rm Production plant</th>
                  <th>Transfer Date</th>
                  <th>VA Weight Qty</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>14-10-2025</td>
                  <td>13-10-2025</td>
                  <td>MKP/2526/1397</td>
                  <td>DFL UNIT-2 (KKD)</td>
                  <td>56.000</td>
                  <td>1783.400</td>
                  <td>DFL UNIT-3 (PSP)</td>
                  <td>15-10-2025</td>
                  <td>1186.000</td>
                  <td><button class="btn btn-sm btn-danger" onclick="showToast('Record deleted', 'error');">🗑</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ============================================
           SCREEN 9: CHEMICAL POS
           ============================================ -->
      <section class="screen" id="screen-chemicalpos">
        <div class="screen-header">
          <h1 class="screen-title">Chemical Pos</h1>
          <p class="screen-subtitle">Manage purchase orders for processing chemicals (STPP, Salt, Phosphates)</p>
        </div>

        <div class="form-card">
          <form onsubmit="event.preventDefault(); showToast('Search executed', 'info');">
            <div class="form-grid">
              <div class="form-group">
                <label>Supplier</label>
                <select>
                  <option>All</option>
                  <option>KPL INTERNATIONAL LTD</option>
                  <option>ADWIK IMPEX</option>
                </select>
              </div>
              <div class="form-group">
                <label>PO No</label>
                <select>
                  <option>All</option>
                  <option>DFL/KPL/2627/004</option>
                </select>
              </div>
              <div class="form-group">
                <label>Chemical</label>
                <select>
                  <option>All</option>
                  <option>ALTESA NEO S100 (NP)</option>
                  <option>CARNAL 659 S ADVANCED (STPP)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Port</label>
                <select>
                  <option>All</option>
                  <option>INPRT - PARADIP GARH</option>
                  <option>INKAK1 - KAKINADA</option>
                </select>
              </div>
              <div class="form-group">
                <label>Year</label>
                <select>
                  <option>2026-27</option>
                  <option>2025-26</option>
                </select>
              </div>
            </div>
            <div class="form-actions-row">
              <button type="button" class="btn btn-primary" onclick="openModal('modalChemPOCreate')">+ Add PO</button>
              <button type="submit" class="btn btn-search">Search →</button>
            </div>
          </form>
        </div>

        <div class="table-card">
          <div class="table-header">
            <div class="table-search-box">
              <span>🔍</span>
              <input type="text" class="table-search" placeholder="Search supplier, PO or chemical...">
            </div>
          </div>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Supplier Name</th>
                  <th>PoNo</th>
                  <th>PO Date</th>
                  <th>Chemicals</th>
                  <th>Port Name</th>
                  <th>Mode of Import</th>
                  <th>Quantity(Bags)</th>
                  <th>Quantity(KGs)</th>
                  <th>Total Amount</th>
                  <th>ETD Date</th>
                  <th>ETA Date</th>
                  <th>Remarks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>KPL INTERNATIONAL LTD</td>
                  <td>DFL/KPL/2627/004</td>
                  <td>06-10-2026</td>
                  <td>-</td>
                  <td>INPRT - PARADIP GARH</td>
                  <td>HSS</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>✏️ ➕ 🖨️</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>ADWIK IMPEX</td>
                  <td>DFL//2627/003</td>
                  <td>25-09-2026</td>
                  <td>-</td>
                  <td>INKAK1 - KAKINADA</td>
                  <td>HSS</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>30-09-2026</td>
                  <td>29-10-2026</td>
                  <td>no</td>
                  <td>✏️ ➕ 🖨️</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>KPL INTERNATIONAL LTD</td>
                  <td>DFL/KPL/2627/003</td>
                  <td>07-09-2026</td>
                  <td>ALTESA NEO S100 (NP)</td>
                  <td>-</td>
                  <td>HSS_BOND</td>
                  <td>240</td>
                  <td>4800</td>
                  <td>₹8,68,800</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>✏️ ➕ 🖨️</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ============================================
           SCREEN 10: RECEIVED CHEMICALS
           ============================================ -->
      <section class="screen" id="screen-receivedchemicals">
        <div class="screen-header">
          <h1 class="screen-title">Received Chemicals</h1>
          <p class="screen-subtitle">Track chemical shipments arriving at plants — customs, containers, and clearance</p>
        </div>

        <div class="form-card">
          <form onsubmit="event.preventDefault(); showToast('Search executed', 'info');">
            <div class="form-grid grid-3col">
              <div class="form-group">
                <label>Plant</label>
                <select>
                  <option>DFL UNIT-5 (JPT)</option>
                  <option>DFL UNIT-1 (VSP)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Status</label>
                <select>
                  <option>Pending</option>
                  <option>Received</option>
                  <option>All</option>
                </select>
              </div>
              <div class="form-group">
                <label>Year</label>
                <select>
                  <option>2025-26</option>
                  <option>2026-27</option>
                </select>
              </div>
            </div>
            <div class="form-actions-row">
              <button type="button" class="btn btn-primary" onclick="openModal('modalChemOrderCreate')">+ Add Order</button>
              <button type="submit" class="btn btn-search">Search →</button>
            </div>
          </form>
        </div>

        <div class="table-card">
          <div class="table-header">
            <div class="table-search-box">
              <span>🔍</span>
              <input type="text" class="table-search" placeholder="Search chemical, PO or BL...">
            </div>
            <div class="table-actions-right">
              <button class="btn btn-sm btn-secondary" onclick="showToast('Loading full registry...', 'info')">Load All</button>
              <button class="btn btn-outline" onclick="showToast('Exporting to Excel...', 'info')">📊 Download Excel</button>
            </div>
          </div>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th class="sortable">S.NO ▲</th>
                  <th>PoNo</th>
                  <th>Chemical</th>
                  <th>BL No</th>
                  <th>Container No</th>
                  <th>Received Bags</th>
                  <th>Received Quantity</th>
                  <th>Bill of Entry No</th>
                  <th>Bill of Entry Date</th>
                  <th>Cleared Date</th>
                  <th>Balance Bags</th>
                  <th>Balance Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>DFL/BC/2526/008</td>
                  <td>CARFOSEL B 940 (STPP)</td>
                  <td>DFL/BC/2526/02</td>
                  <td>DFL/BC/2526/02</td>
                  <td>787</td>
                  <td>19675</td>
                  <td>DFL/BC/2526/02</td>
                  <td>02-08-2025</td>
                  <td>02-08-2025</td>
                  <td>13</td>
                  <td>325</td>
                  <td><span class="badge badge-pending">PENDING</span></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>DFL/KPL/2526/003</td>
                  <td>ALTESA BT2 (NP)</td>
                  <td>2195420</td>
                  <td>2195420</td>
                  <td>1080</td>
                  <td>21600</td>
                  <td>2195420</td>
                  <td>21-05-2025</td>
                  <td>23-05-2025</td>
                  <td>800</td>
                  <td>20000</td>
                  <td><span class="badge badge-pending">PENDING</span></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>DFL/CFB/2425/003</td>
                  <td>CARNAL 659 S ADVANCED (STPP)</td>
                  <td>250506660011</td>
                  <td>CARNAL1-9, TGCU2314437</td>
                  <td>3200</td>
                  <td>80000</td>
                  <td>2141353</td>
                  <td>19-05-2025</td>
                  <td>27-05-2025</td>
                  <td>1600</td>
                  <td>40000</td>
                  <td><span class="badge badge-pending">PENDING</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ============================================
           SCREEN 11: CHEMICALS CONSUMPTION
           ============================================ -->
      <section class="screen" id="screen-chemicalsconsumption">
        <div class="screen-header">
          <h1 class="screen-title">Chemicals Consumption</h1>
          <p class="screen-subtitle">Daily ledger of chemical usage — track opening, consumption, and closing balances</p>
        </div>

        <div class="form-card">
          <form onsubmit="event.preventDefault(); showToast('Search executed', 'info');">
            <div class="form-grid">
              <div class="form-group">
                <label>Plant</label>
                <select>
                  <option>DFL UNIT-5 (JPT)</option>
                  <option>DFL UNIT-1 (VSP)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Chemical</label>
                <select>
                  <option>CARNAL 659 S ADVANCED (STPP)</option>
                  <option>CARFOSEL B 940 (STPP)</option>
                  <option>ALTESA BT2 (NP)</option>
                </select>
              </div>
              <div class="form-group">
                <label>From Date</label>
                <input type="date" value="2025-02-05">
              </div>
              <div class="form-group">
                <label>To Date</label>
                <input type="date" value="2025-02-28">
              </div>
            </div>
            <div class="form-actions-row">
              <button type="button" class="btn btn-primary" onclick="openModal('modalChemConsumptionCreate')">+ Add Consumption</button>
              <button type="submit" class="btn btn-search">Search →</button>
            </div>
          </form>
        </div>

        <div class="table-card">
          <div class="table-header">
            <div class="table-search-box">
              <span>🔍</span>
              <input type="text" class="table-search" placeholder="Search consumption ledger...">
            </div>
          </div>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Date</th>
                  <th>Chemical</th>
                  <th>Received From</th>
                  <th>Received Qty (Bags)</th>
                  <th>Received Qty (Kgs)</th>
                  <th>Sended To</th>
                  <th>Sended (Bags)</th>
                  <th>Sended (Kgs)</th>
                  <th>Used In Bags</th>
                  <th>Used In KGs</th>
                  <th>Opening In Bags</th>
                  <th>Opening In Kgs</th>
                  <th>Closing in Bags</th>
                  <th>Closing in KGs</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>05-02-2025</td>
                  <td>CARNAL 659 S ADVANCED (STPP)</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>30</td>
                  <td>750</td>
                  <td>1741</td>
                  <td>43525</td>
                  <td>1711</td>
                  <td>42775</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>06-02-2025</td>
                  <td>CARNAL 659 S ADVANCED (STPP)</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>20</td>
                  <td>500</td>
                  <td>1711</td>
                  <td>42775</td>
                  <td>1691</td>
                  <td>42275</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>07-02-2025</td>
                  <td>CARNAL 659 S ADVANCED (STPP)</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>20</td>
                  <td>500</td>
                  <td>1691</td>
                  <td>42275</td>
                  <td>1671</td>
                  <td>41775</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ============================================
           SCREEN 12: CHEMICAL RECEIVED REPORT
           ============================================ -->
      <section class="screen" id="screen-chemicalreceivedreport">
        <div class="screen-header">
          <h1 class="screen-title">Chemical Received Report</h1>
          <p class="screen-subtitle">Summary of all chemical orders received vs pending clearance</p>
        </div>

        <div class="form-card">
          <form onsubmit="event.preventDefault(); showToast('Report generated', 'success');">
            <div class="form-grid grid-2col">
              <div class="form-group">
                <label>Plant</label>
                <select>
                  <option>Select</option>
                  <option selected>DFL UNIT-1 (VSP)</option>
                  <option>DFL UNIT-5 (JPT)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Year</label>
                <select>
                  <option>2026-27</option>
                  <option>2025-26</option>
                </select>
              </div>
            </div>
            <div class="form-actions-row">
              <button type="submit" class="btn btn-search">Search →</button>
            </div>
          </form>
        </div>

        <div class="table-card">
          <div class="table-header">
            <div class="table-search-box">
              <span>🔍</span>
              <input type="text" class="table-search" placeholder="Search PO or chemical...">
            </div>
          </div>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th class="sortable">S.NO ▲</th>
                  <th>PoNo</th>
                  <th>Chemical</th>
                  <th>Received Bags</th>
                  <th>Received Quantity</th>
                  <th>Balance Bags</th>
                  <th>Balance Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>DFL/KPL/2627/002</td>
                  <td>ALTESA NEO S100 (NP)</td>
                  <td>300</td>
                  <td>6000</td>
                  <td>0</td>
                  <td>0</td>
                  <td><span class="badge badge-received">ORDER RECEIVED</span></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>DFL/KPL/2627/003</td>
                  <td>ALTESA NEO S100 (NP)</td>
                  <td>240</td>
                  <td>4800</td>
                  <td>0</td>
                  <td>0</td>
                  <td><span class="badge badge-received">ORDER RECEIVED</span></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>DFL/PT/2627/014</td>
                  <td>SALT</td>
                  <td>640</td>
                  <td>32000</td>
                  <td>0</td>
                  <td>0</td>
                  <td><span class="badge badge-received">ORDER RECEIVED</span></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>DFL//2627/002</td>
                  <td>Compound Phosphate (Xingfa)</td>
                  <td>1600</td>
                  <td>40000</td>
                  <td>0</td>
                  <td>0</td>
                  <td><span class="badge badge-received">ORDER RECEIVED</span></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>DFL/CFB/2627/003</td>
                  <td>CARNAL 659 S ADVANCED (STPP)</td>
                  <td>800</td>
                  <td>20000</td>
                  <td>4000</td>
                  <td>100000</td>
                  <td><span class="badge badge-pending">PENDING</span></td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>DFL/PT/2627/013</td>
                  <td>SALT</td>
                  <td>620</td>
                  <td>31000</td>
                  <td>0</td>
                  <td>0</td>
                  <td><span class="badge badge-received">ORDER RECEIVED</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ============================================
           SCREEN 13: OPENING BALANCE REPORT
           ============================================ -->
      <section class="screen" id="screen-chemicalopeningbalance">
        <div class="screen-header">
          <h1 class="screen-title">Chemical Opening Balance Report</h1>
          <p class="screen-subtitle">Snapshot of chemical stock at the start of an accounting period</p>
        </div>

        <div class="form-card">
          <form onsubmit="event.preventDefault(); showToast('Report generated', 'success');">
            <div class="form-grid grid-3col">
              <div class="form-group">
                <label>Plant</label>
                <select>
                  <option>DFL UNIT-5 (JPT)</option>
                  <option>DFL UNIT-1 (VSP)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Chemical</label>
                <select>
                  <option>All</option>
                  <option>CARNAL 659 S ADVANCED (STPP)</option>
                  <option>CARFOSEL B 940 (STPP)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Bill Date</label>
                <input type="date" value="2025-10-14">
              </div>
            </div>
            <div class="form-actions-row">
              <button type="submit" class="btn btn-search">Search →</button>
            </div>
          </form>
        </div>

        <div class="table-card">
          <div class="table-header">
            <div class="table-search-box">
              <span>🔍</span>
              <input type="text" class="table-search" placeholder="Search opening stock...">
            </div>
          </div>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Chemical</th>
                  <th>KGs per Bag</th>
                  <th>Total Bags</th>
                  <th>Total KGs</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>CARNAL 659 S ADVANCED (STPP)</td>
                  <td>25</td>
                  <td>1909</td>
                  <td>47725</td>
                </tr>
                <tr class="highlight-teal">
                  <td>2</td>
                  <td>CARFOSEL B 940 (STPP)</td>
                  <td>25</td>
                  <td>1176</td>
                  <td>29400</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>ALTESA BT2 (NP)</td>
                  <td>20</td>
                  <td>216</td>
                  <td>4320</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>ALTESA NEO S700 (NC)</td>
                  <td>20</td>
                  <td>34</td>
                  <td>680</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>HYDROLOC CF SC</td>
                  <td>30</td>
                  <td>31</td>
                  <td>930</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>SALT</td>
                  <td>50</td>
                  <td>478</td>
                  <td>23900</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ============================================
           SCREEN 14: CHEMICAL BALANCE REPORT
           ============================================ -->
      <section class="screen" id="screen-chemicalbalancereport">
        <div class="screen-header">
          <h1 class="screen-title">Chemical Balance Report</h1>
          <p class="screen-subtitle">Monthly reconciliation: Opening + Purchase − Consumption − Transfer = Closing</p>
        </div>

        <div class="form-card">
          <form onsubmit="event.preventDefault(); showToast('Report generated', 'success');">
            <div class="form-grid">
              <div class="form-group">
                <label>Plant</label>
                <select>
                  <option>DFL UNIT-5 (JPT)</option>
                  <option>DFL UNIT-1 (VSP)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Chemical</label>
                <select>
                  <option>All</option>
                  <option>CARNAL 659 S ADVANCED</option>
                </select>
              </div>
              <div class="form-group">
                <label>From Date</label>
                <input type="date" value="2025-04-01">
              </div>
              <div class="form-group">
                <label>To Date</label>
                <input type="date" value="2026-03-31">
              </div>
              <div class="form-group">
                <label>Year</label>
                <select>
                  <option>2025-26</option>
                  <option>2026-27</option>
                </select>
              </div>
              <div class="form-group">
                <label>Select Month</label>
                <select>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>
              </div>
            </div>
            <div class="form-actions-row">
              <button type="submit" class="btn btn-search">Search →</button>
            </div>
          </form>
        </div>

        <div class="table-card">
          <div class="table-header">
            <span style="font-weight:700;font-size:14px;color:var(--text-main);">October-2025 Reconciliation</span>
            <div class="table-actions-right">
              <button class="btn btn-primary" onclick="showToast('Downloading monthly balance...', 'info')">📊 Download Excel</button>
            </div>
          </div>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Chemical</th>
                  <th>Opening KGs</th>
                  <th>Total Purchase KGs</th>
                  <th>Total Consumption KGs</th>
                  <th>KGs Sent to Other Plant</th>
                  <th>Closing KGs</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>CARNAL 659 S ADVANCED (STPP)</td>
                  <td>47725</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td><strong>47725</strong></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>CARFOSEL B 940 (STPP)</td>
                  <td>33025</td>
                  <td>0</td>
                  <td>12750</td>
                  <td>1250</td>
                  <td><strong>19025</strong></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>ALTESA BT2 (NP)</td>
                  <td>5320</td>
                  <td>0</td>
                  <td>2100</td>
                  <td>0</td>
                  <td><strong>3220</strong></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>ALTESA NEO S700 (NC)</td>
                  <td>680</td>
                  <td>2000</td>
                  <td>600</td>
                  <td>0</td>
                  <td><strong>2080</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ============================================
           SCREEN 15: CHEMICAL PAYMENTS LIST
           ============================================ -->
      <section class="screen" id="screen-chemicalpaymentslist">
        <div class="screen-header">
          <h1 class="screen-title">Chemical Payments List</h1>
          <p class="screen-subtitle">Track payments made to chemical suppliers against purchase orders</p>
        </div>

        <div class="form-card">
          <form onsubmit="event.preventDefault(); showToast('Search executed', 'info');">
            <div class="form-grid grid-2col">
              <div class="form-group">
                <label>Supplier</label>
                <select>
                  <option>KPL INTERNATIONAL LTD</option>
                  <option>ADWIK IMPEX</option>
                </select>
              </div>
              <div class="form-group">
                <label>Year</label>
                <select>
                  <option>2025-26</option>
                  <option>2026-27</option>
                </select>
              </div>
            </div>
            <div class="form-actions-row">
              <button type="button" class="btn btn-primary" onclick="openModal('modalChemPaymentCreate')">+ Add Payment</button>
              <button type="submit" class="btn btn-search">Search →</button>
            </div>
          </form>
        </div>

        <div class="table-card">
          <div class="table-header">
            <div class="table-search-box">
              <span>🔍</span>
              <input type="text" class="table-search" placeholder="Search payment entries...">
            </div>
            <div class="table-actions-right">
              <button class="btn btn-sm btn-secondary" onclick="showToast('Loading full payments...', 'info')">Load All</button>
              <button class="btn btn-outline" onclick="showToast('Exporting to Excel...', 'info')">📊 Download Excel</button>
            </div>
          </div>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th class="sortable">S.NO ▲</th>
                  <th>PoNo</th>
                  <th>Chemical Name</th>
                  <th>Party Name</th>
                  <th>Recieved Quantity (Kgs)</th>
                  <th>Amount (Rupees)</th>
                  <th>Paid Amount (Rupees)</th>
                  <th>Bank Reference No</th>
                  <th>Payment Date</th>
                  <th>Remarks</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="12" class="empty-cell">No data available in table</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ============================================
           SCREEN 16: TRACK CODE REPORT
           ============================================ -->
      <section class="screen" id="screen-trackcodereport">
        <div class="screen-header">
          <h1 class="screen-title">Track Code Report</h1>
          <p class="screen-subtitle">Master traceability view — follow any batch from arrival to freezing</p>
        </div>

        <div class="form-card">
          <form onsubmit="event.preventDefault(); showToast('Report generated', 'success');">
            <div class="form-grid grid-3col">
              <div class="form-group">
                <label>Receiving Plant</label>
                <select>
                  <option>DFL UNIT-1 (VSP)</option>
                  <option>DFL UNIT-2 (KKD)</option>
                </select>
              </div>
              <div class="form-group">
                <label>From Date <span class="req">*</span></label>
                <input type="date" value="2025-02-22" required>
              </div>
              <div class="form-group">
                <label>To Date <span class="req">*</span></label>
                <input type="date" value="2025-03-18" required>
              </div>
            </div>
            <div class="form-actions-row">
              <button type="submit" class="btn btn-search">Search →</button>
            </div>
          </form>
        </div>

        <div class="table-card">
          <div class="table-header">
            <div class="table-search-box">
              <span>🔍</span>
              <input type="text" class="table-search" placeholder="Search track code or bill...">
            </div>
            <div class="table-actions-right">
              <button class="btn btn-sm btn-secondary" onclick="showToast('Loading batch tree...', 'info')">Load All</button>
              <button class="btn btn-outline" onclick="showToast('Exporting to Excel...', 'info')">📊 Download Excel</button>
            </div>
          </div>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Track Code</th>
                  <th>Arrival Date</th>
                  <th>Bill No</th>
                  <th>Count</th>
                  <th>Arrival Weight</th>
                  <th>Received Weight</th>
                  <th>Deheading Weight</th>
                  <th>Grading</th>
                  <th>Grading Yield</th>
                  <th>Freezing Qty F1</th>
                  <th>Soaking Qty S1</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td><a class="text-teal-link" onclick="showToast('Auditing batch VM-VSP-SKM-054', 'info')">VM-VSP-SKM-054</a></td>
                  <td>22-02-2025</td>
                  <td>SKM/2425/1530<br>SKM/2425/1531</td>
                  <td>67.00<br>74.00</td>
                  <td>6206.000</td>
                  <td>6206.000</td>
                  <td>7.000</td>
                  <td>4370.200</td>
                  <td><span class="badge badge-teal">70.42 %</span></td>
                  <td>3758.100</td>
                  <td>0.000</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td><a class="text-teal-link" onclick="showToast('Auditing batch VM-VSP-SKM-055', 'info')">VM-VSP-SKM-055</a></td>
                  <td>22-02-2025</td>
                  <td>SKM/2425/1529</td>
                  <td>59.00<br>74.00</td>
                  <td>5027.000</td>
                  <td>5027.000</td>
                  <td>7.000</td>
                  <td>3521.000</td>
                  <td><span class="badge badge-teal">70.04 %</span></td>
                  <td>2924.700</td>
                  <td>0.000</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td><a class="text-teal-link" onclick="showToast('Auditing batch VM-VSP-AMP-056', 'info')">VM-VSP-AMP-056</a></td>
                  <td>23-02-2025</td>
                  <td>AMP/2425/4078<br>AMP/2425/4079</td>
                  <td>100.00<br>94.00<br>104.00</td>
                  <td>4776.300</td>
                  <td>4776.300</td>
                  <td>7.000</td>
                  <td>3242.300</td>
                  <td><span class="badge badge-warning">67.88 %</span></td>
                  <td>3182.400</td>
                  <td>0.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ============================================
           SCREEN 17: VA FLOOR BALANCE REPORT
           ============================================ -->
      <section class="screen" id="screen-vafloorbalance">
        <div class="screen-header">
          <h1 class="screen-title">VA Floor Balance Report</h1>
          <p class="screen-subtitle">See exactly how much processed stock is sitting on the factory floor by batch</p>
        </div>

        <div class="form-card">
          <form onsubmit="event.preventDefault(); showToast('Report generated', 'success');">
            <div class="form-grid">
              <div class="form-group">
                <label>Receiving Plant</label>
                <select>
                  <option>DFL UNIT-2 (KKD)</option>
                  <option>DFL UNIT-1 (VSP)</option>
                </select>
              </div>
              <div class="form-group">
                <label>To Date <span class="req">*</span></label>
                <input type="date" value="2026-10-14" required>
              </div>
              <div class="form-group">
                <label>Treatment</label>
                <select>
                  <option>All</option>
                  <option>STPP</option>
                  <option>UNT</option>
                </select>
              </div>
              <div class="form-group">
                <label>Type of Material</label>
                <select>
                  <option>Regular</option>
                  <option>Store</option>
                </select>
              </div>
            </div>
            <div class="form-actions-row">
              <button type="submit" class="btn btn-search">Search →</button>
            </div>
          </form>
        </div>

        <div class="table-card">
          <div class="table-header">
            <div class="table-search-box">
              <span>🔍</span>
              <input type="text" class="table-search" placeholder="Search variety or grade...">
            </div>
          </div>
          <div class="table-wrapper">
            <table class="data-table matrix-table">
              <thead>
                <tr>
                  <th rowspan="2">SNO</th>
                  <th rowspan="2">Variety</th>
                  <th rowspan="2">Grade</th>
                  <th rowspan="2">Count</th>
                  <th rowspan="2">Treatment</th>
                  <th>VM-KKD-RPL-058<br><span style="font-weight:400;font-size:10px;">20-09-2026</span></th>
                  <th>VM-KKD-RPL-059<br><span style="font-weight:400;font-size:10px;">20-09-2026</span></th>
                  <th>VM-KKD-KKD-060<br><span style="font-weight:400;font-size:10px;">20-09-2026</span></th>
                  <th>VM-KKD-MKP-061<br><span style="font-weight:400;font-size:10px;">20-09-2026</span></th>
                  <th rowspan="2">Total KGs</th>
                  <th rowspan="2">Total Crates</th>
                </tr>
                <tr>
                  <th>Batch 1</th>
                  <th>Batch 2</th>
                  <th>Batch 3</th>
                  <th>Batch 4</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>PVPD-VM</td>
                  <td>31/35</td>
                  <td>34.00</td>
                  <td>UNT</td>
                  <td>-</td>
                  <td>-</td>
                  <td>663</td>
                  <td>-</td>
                  <td><strong>663</strong></td>
                  <td>25</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>PVPD-VM</td>
                  <td>41/50</td>
                  <td>45.00</td>
                  <td>UNT</td>
                  <td>203</td>
                  <td>332</td>
                  <td>154</td>
                  <td>-</td>
                  <td><strong>689</strong></td>
                  <td>26</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>PVPD-VM</td>
                  <td>51/60</td>
                  <td>55.00</td>
                  <td>UNT</td>
                  <td>-</td>
                  <td>606</td>
                  <td>11</td>
                  <td>385</td>
                  <td><strong>1002</strong></td>
                  <td>38</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>PVPD-VM</td>
                  <td>51/60</td>
                  <td>56.00</td>
                  <td>UNT</td>
                  <td>68</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td><strong>68</strong></td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>RPD-VM</td>
                  <td>61/70</td>
                  <td>65.00</td>
                  <td>STPP</td>
                  <td>-</td>
                  <td>-</td>
                  <td>3</td>
                  <td>156</td>
                  <td><strong>159</strong></td>
                  <td>7</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>RPD-VM</td>
                  <td>61/70</td>
                  <td>66.00</td>
                  <td>STPP</td>
                  <td>63</td>
                  <td>459</td>
                  <td>-</td>
                  <td>-</td>
                  <td><strong>522</strong></td>
                  <td>20</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ============================================
           SCREEN 18: VA TRANSFER REPORT
           ============================================ -->
      <section class="screen" id="screen-vatransfer">
        <div class="screen-header">
          <h1 class="screen-title">VA Transfer Report</h1>
          <p class="screen-subtitle">Track inter-plant transfers with supplier and vehicle traceability</p>
        </div>

        <div class="form-card">
          <form onsubmit="event.preventDefault(); showToast('Report generated', 'success');">
            <div class="form-grid">
              <div class="form-group">
                <label>Production Plant</label>
                <select>
                  <option>DFL UNIT-1 (VSP)</option>
                  <option>DFL UNIT-2 (KKD)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Date Filter <span class="req">*</span></label>
                <select required>
                  <option>Bill Date</option>
                  <option>Arrival Date</option>
                  <option>Transfer Date</option>
                </select>
              </div>
              <div class="form-group">
                <label>From Date <span class="req">*</span></label>
                <input type="date" value="2025-02-22" required>
              </div>
              <div class="form-group">
                <label>To Date <span class="req">*</span></label>
                <input type="date" value="2025-03-18" required>
              </div>
            </div>
            <div class="form-actions-row">
              <button type="submit" class="btn btn-search">Search →</button>
            </div>
          </form>
        </div>

        <div class="table-card">
          <div class="table-header">
            <div class="table-search-box">
              <span>🔍</span>
              <input type="text" class="table-search" placeholder="Search supplier or vehicle...">
            </div>
          </div>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Arrival Date</th>
                  <th>Bill Date</th>
                  <th>Production Plant</th>
                  <th>Vehicle Number</th>
                  <th>Bill Number</th>
                  <th>Supplier</th>
                  <th>Center Name</th>
                  <th>Destination</th>
                  <th>Variety</th>
                  <th>Count</th>
                  <th>Rm Production plant</th>
                  <th>Transfer Date</th>
                  <th>Final Qty</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>23-02-2025</td>
                  <td>22-02-2025</td>
                  <td>DFL UNIT-1 (VSP)</td>
                  <td>AP39UJ3747</td>
                  <td>AMP/2425/4084</td>
                  <td>A.SRINIVASA RAJU(AM)</td>
                  <td>AMALAPURAM</td>
                  <td>DFL UNIT-1 (VSP)</td>
                  <td>HEAD ON-VM</td>
                  <td>100.00</td>
                  <td>DFL UNIT-1 (VSP)</td>
                  <td>-</td>
                  <td>979.80</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>23-02-2025</td>
                  <td>22-02-2025</td>
                  <td>DFL UNIT-1 (VSP)</td>
                  <td>AP39UJ3747</td>
                  <td>AMP/2425/4084</td>
                  <td>A.SRINIVASA RAJU(AM)</td>
                  <td>AMALAPURAM</td>
                  <td>DFL UNIT-1 (VSP)</td>
                  <td>HEAD ON-VM</td>
                  <td>105.00</td>
                  <td>DFL UNIT-1 (VSP)</td>
                  <td>-</td>
                  <td>650.70</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>23-02-2025</td>
                  <td>22-02-2025</td>
                  <td>DFL UNIT-1 (VSP)</td>
                  <td>AP39UJ3747</td>
                  <td>AMP/2425/4084</td>
                  <td>A.SRINIVASA RAJU(AM)</td>
                  <td>AMALAPURAM</td>
                  <td>DFL UNIT-1 (VSP)</td>
                  <td>HEAD ON-VM</td>
                  <td>90.00</td>
                  <td>DFL UNIT-1 (VSP)</td>
                  <td>-</td>
                  <td>325.10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ============================================
           SCREEN 19: ASSUMED REPORTS BY RM & ARRIVAL
           ============================================ -->
      <section class="screen" id="screen-assumedreports">
        <div class="screen-header">
          <h1 class="screen-title">Assumed Reports by Rm & Arrival</h1>
          <p class="screen-subtitle">Financial traceability — connect purchase cost to final product value by grade</p>
        </div>

        <div class="form-card">
          <form onsubmit="event.preventDefault(); showToast('Report generated', 'success');">
            <div class="form-grid">
              <div class="form-group">
                <label>Receiving Plant</label>
                <select>
                  <option>DFL UNIT-1 (VSP)</option>
                  <option>DFL UNIT-2 (KKD)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Arrival Date <span class="req">*</span></label>
                <input type="date" value="2025-01-22" required>
              </div>
              <div class="form-group">
                <label>Track ID <span class="req">*</span></label>
                <select required>
                  <option>VM-VSP-SKM-051</option>
                  <option>VM-VSP-SKM-054</option>
                </select>
              </div>
              <div class="form-group">
                <label>Species</label>
                <select>
                  <option>VM</option>
                  <option>AMP</option>
                  <option>BL</option>
                </select>
              </div>
            </div>
            <div class="form-actions-row">
              <button type="submit" class="btn btn-search">Search →</button>
            </div>
          </form>
        </div>

        <div class="table-card">
          <div class="table-header">
            <span style="font-weight:700;font-size:13.5px;color:var(--text-main);">Inward Purchase Valuation vs Outward Grade Realization</span>
            <div class="table-actions-right">
              <button class="btn btn-outline" onclick="showToast('Exporting valuation matrix...', 'info')">📊 Download Excel</button>
            </div>
          </div>
          <div class="table-wrapper">
            <table class="data-table" style="font-size:12px;">
              <thead>
                <tr style="background:#f1f5f9;">
                  <th colspan="7" style="text-align:center;border-right:2px solid #cbd5e1;background:#f8fafc;">PURCHASE INWARD COST</th>
                  <th colspan="8" style="text-align:center;background:#f0fdf4;">OUTPUT RECOVERY VALUATION</th>
                </tr>
                <tr>
                  <th>SNo</th>
                  <th>Count</th>
                  <th>Weight</th>
                  <th>Purchase count</th>
                  <th>Purchase Weight</th>
                  <th>Purchase Rate</th>
                  <th style="border-right:2px solid #cbd5e1;">Total Value (₹)</th>
                  <th>SNo</th>
                  <th>HLCount</th>
                  <th>Packing Grade</th>
                  <th>Variety Name</th>
                  <th>Treatment</th>
                  <th>Weight</th>
                  <th>Rate</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>-</td>
                  <td>-</td>
                  <td>52.000</td>
                  <td>375.000</td>
                  <td>350.00</td>
                  <td style="border-right:2px solid #cbd5e1;font-weight:600;">1,31,250.00</td>
                  <td>1</td>
                  <td>19.00</td>
                  <td>16/20</td>
                  <td>RPDTO-VM</td>
                  <td>STPP</td>
                  <td>0.20</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>-</td>
                  <td>-</td>
                  <td>53.500</td>
                  <td>903.000</td>
                  <td>340.00</td>
                  <td style="border-right:2px solid #cbd5e1;font-weight:600;">3,07,020.00</td>
                  <td>2</td>
                  <td>29.00</td>
                  <td>26/30</td>
                  <td>RPD-VM</td>
                  <td>STPP</td>
                  <td>206.80</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>-</td>
                  <td>-</td>
                  <td>54.000</td>
                  <td>233.000</td>
                  <td>340.00</td>
                  <td style="border-right:2px solid #cbd5e1;font-weight:600;">79,220.00</td>
                  <td>3</td>
                  <td>38.00</td>
                  <td>31/40</td>
                  <td>RPD-VM</td>
                  <td>STPP</td>
                  <td>71.00</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>-</td>
                  <td>-</td>
                  <td>55.000</td>
                  <td>241.000</td>
                  <td>340.00</td>
                  <td style="border-right:2px solid #cbd5e1;font-weight:600;">81,940.00</td>
                  <td>4</td>
                  <td>98.00</td>
                  <td>91/110</td>
                  <td>RPD-VM</td>
                  <td>STPP</td>
                  <td>11.00</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>-</td>
                  <td>-</td>
                  <td>83.000</td>
                  <td>1342.000</td>
                  <td>265.00</td>
                  <td style="border-right:2px solid #cbd5e1;font-weight:600;">3,55,630.00</td>
                  <td>5</td>
                  <td>150.00</td>
                  <td>151/200</td>
                  <td>RPUD-VM</td>
                  <td>UNT</td>
                  <td>1.30</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>50</td>
                  <td>1,147.250</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td style="border-right:2px solid #cbd5e1;">-</td>
                  <td>6</td>
                  <td>38.00</td>
                  <td>31/40</td>
                  <td>HLSO-CHINA-VM</td>
                  <td>UNT</td>
                  <td>908.80</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>60</td>
                  <td>604.750</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td style="border-right:2px solid #cbd5e1;">-</td>
                  <td>7</td>
                  <td>45.00</td>
                  <td>41/50</td>
                  <td>HLSO-CHINA-VM</td>
                  <td>UNT</td>
                  <td>149.20</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ============================================
           SCREEN 20: CONSOLIDATION REPORT DAILY & MONTHLY
           ============================================ -->
      <section class="screen" id="screen-consolidationdaily">
        <div class="screen-header">
          <h1 class="screen-title">Consolidation Report Daily And Monthly</h1>
          <p class="screen-subtitle">Reconcile graded weight vs finished production — identify packing-stage losses</p>
        </div>

        <div class="form-card">
          <form onsubmit="event.preventDefault(); showToast('Report generated', 'success');">
            <div class="form-grid grid-3col">
              <div class="form-group">
                <label>Receiving Plant</label>
                <select>
                  <option>DFL UNIT-1 (VSP)</option>
                  <option>DFL UNIT-2 (KKD)</option>
                </select>
              </div>
              <div class="form-group">
                <label>From Date <span class="req">*</span></label>
                <input type="date" value="2025-02-22" required>
              </div>
              <div class="form-group">
                <label>To Date <span class="req">*</span></label>
                <input type="date" value="2025-03-18" required>
              </div>
            </div>
            <div class="form-actions-row">
              <button type="submit" class="btn btn-search">Search →</button>
            </div>
          </form>
        </div>

        <div class="table-card">
          <div class="table-header">
            <div class="table-search-box">
              <span>🔍</span>
              <input type="text" class="table-search" placeholder="Search count or grade...">
            </div>
            <div class="table-actions-right">
              <button class="btn btn-outline" onclick="showToast('Exporting loss matrix...', 'info')">📊 Download Excel</button>
            </div>
          </div>
          <div class="table-wrapper">
            <table class="data-table matrix-table" style="font-size:11px;">
              <thead>
                <tr>
                  <th rowspan="2">SNO</th>
                  <th rowspan="2">Count</th>
                  <th rowspan="2">Weight</th>
                  <th rowspan="2">Grade</th>
                  <th rowspan="2">Weight</th>
                  <th colspan="3">- ( - )</th>
                  <th colspan="3">VM-PD( RAW - IQF ) STPP 4 X 2.5 LBS</th>
                  <th colspan="3">VM-PD( RAW - IQF ) NPT 4 X 2.5 LBS</th>
                  <th colspan="3">VM-PD( RAW - IQF ) STPP 5 X 2 LBS</th>
                </tr>
                <tr>
                  <th>HL Graded Wt</th>
                  <th>Finished Prod</th>
                  <th>Difference</th>
                  <th>HL Graded Wt</th>
                  <th>Finished Prod</th>
                  <th>Difference</th>
                  <th>HL Graded Wt</th>
                  <th>Finished Prod</th>
                  <th>Difference</th>
                  <th>HL Graded Wt</th>
                  <th>Finished Prod</th>
                  <th>Difference</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>20</td>
                  <td>825.100</td>
                  <td>DC</td>
                  <td>1598.400</td>
                  <td>1598.400</td>
                  <td>0</td>
                  <td style="color:var(--danger);">1598.400</td>
                  <td>0.000</td>
                  <td>0</td>
                  <td>0.000</td>
                  <td>0.000</td>
                  <td>0</td>
                  <td>0.000</td>
                  <td>0.000</td>
                  <td>0</td>
                  <td>0.000</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>30</td>
                  <td>26,714.250</td>
                  <td>13/15</td>
                  <td>30.400</td>
                  <td>30.400</td>
                  <td>0</td>
                  <td style="color:var(--danger);">30.400</td>
                  <td>0.000</td>
                  <td>0</td>
                  <td>0.000</td>
                  <td>0.000</td>
                  <td>0</td>
                  <td>0.000</td>
                  <td>0.000</td>
                  <td>0</td>
                  <td>0.000</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>40</td>
                  <td>1,196.290</td>
                  <td>16/20</td>
                  <td>232.400</td>
                  <td>11.200</td>
                  <td>0</td>
                  <td style="color:var(--danger);">11.200</td>
                  <td>221.200</td>
                  <td>208.84</td>
                  <td style="color:var(--warning);font-weight:600;">12.360</td>
                  <td>0.000</td>
                  <td>0</td>
                  <td>0.000</td>
                  <td>0.000</td>
                  <td>0</td>
                  <td>0.000</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>50</td>
                  <td>14,905.100</td>
                  <td>21/25</td>
                  <td>391.400</td>
                  <td>53.200</td>
                  <td>0</td>
                  <td style="color:var(--danger);">53.200</td>
                  <td>338.200</td>
                  <td>320.07</td>
                  <td style="color:var(--warning);font-weight:600;">18.130</td>
                  <td>0.000</td>
                  <td>0</td>
                  <td>0.000</td>
                  <td>0.000</td>
                  <td>0</td>
                  <td>0.000</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>60</td>
                  <td>59,990.375</td>
                  <td>26/30</td>
                  <td>5681.000</td>
                  <td>292.100</td>
                  <td>0</td>
                  <td style="color:var(--danger);">292.100</td>
                  <td>93.348</td>
                  <td>55.615</td>
                  <td style="color:var(--warning);font-weight:600;">37.733</td>
                  <td>4,933.250</td>
                  <td>4496.87</td>
                  <td style="color:var(--warning);font-weight:600;">436.380</td>
                  <td>348.502</td>
                  <td>327.0</td>
                  <td style="color:var(--warning);font-weight:600;">21.502</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ============================================
           SCREEN 21: FILE UPLOAD
           ============================================ -->
      <section class="screen" id="screen-fileupload">
        <div class="screen-header">
          <h1 class="screen-title">File Upload</h1>
          <p class="screen-subtitle">Upload and manage quality certificates, customs docs, and batch documents</p>
        </div>

        <div class="form-card">
          <form onsubmit="event.preventDefault(); showToast('Search executed', 'info');">
            <div class="form-grid grid-2col">
              <div class="form-group">
                <label>Plant <span class="req">*</span></label>
                <select required>
                  <option>JPT - DFL UNIT-5 (JPT)</option>
                  <option>VSP - DFL UNIT-1 (VSP)</option>
                  <option>KKD - DFL UNIT-2 (KKD)</option>
                </select>
              </div>
              <div class="form-group" style="justify-content:flex-end;">
                <label>&nbsp;</label>
                <button type="button" class="btn btn-primary" onclick="showToast('Upload dialog opened', 'info')">📁 Upload New Document</button>
              </div>
            </div>
            <div class="form-actions-row">
              <button type="submit" class="btn btn-search">Search →</button>
            </div>
          </form>
        </div>

        <div class="table-card">
          <div class="table-header">
            <div class="table-search-box">
              <span>🔍</span>
              <input type="text" class="table-search" placeholder="Search files...">
            </div>
          </div>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th class="sortable">Date ▲</th>
                  <th>Expires On</th>
                  <th>Plant</th>
                  <th>File Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="5" class="empty-cell">No data available in table</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div><!-- /content-area -->
  </main>
</div><!-- /app-layout -->

<!-- ============================================
     MODALS (4 TOTAL)
     ============================================ -->

<!-- MODAL 1: Gs Chem Po Create -->
<div class="modal-overlay" id="modalChemPOCreate" onclick="handleBackdropClick(event, 'modalChemPOCreate')">
  <div class="modal-content">
    <div class="modal-breadcrumb">Chemical Inventory & Usage / Chemical Pos / Gs Chem Po Create</div>
    <div class="modal-title">GS CHEM PO CREATE</div>
    <form onsubmit="event.preventDefault(); closeModal('modalChemPOCreate'); showToast('PO created successfully', 'success');">
      <div class="form-grid grid-2col">
        <div class="form-group">
          <label>Supplier <span class="req">*</span></label>
          <select required>
            <option>All</option>
            <option>KPL INTERNATIONAL LTD</option>
            <option>ADWIK IMPEX</option>
          </select>
        </div>
        <div class="form-group">
          <label>Port Name</label>
          <select>
            <option>Select</option>
            <option>INPRT - PARADIP GARH</option>
            <option>INKAK1 - KAKINADA</option>
          </select>
        </div>
        <div class="form-group">
          <label>Mode of Import <span class="req">*</span></label>
          <select required>
            <option>Select</option>
            <option>HSS</option>
            <option>HSS_BOND</option>
          </select>
        </div>
        <div class="form-group">
          <label>PO No <span class="req">*</span></label>
          <input type="text" placeholder="Enter Po NO" required>
        </div>
        <div class="form-group">
          <label>PO Date <span class="req">*</span></label>
          <input type="date" value="2026-10-14" required>
        </div>
        <div class="form-group">
          <label>ETA Date</label>
          <input type="date">
        </div>
        <div class="form-group">
          <label>ETD Date</label>
          <input type="date">
        </div>
        <div class="form-group">
          <label>Remarks</label>
          <input type="text" placeholder="Remarks">
        </div>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-danger" onclick="closeModal('modalChemPOCreate')">Close</button>
        <button type="submit" class="btn btn-primary">💾 Save</button>
      </div>
    </form>
  </div>
</div>

<!-- MODAL 2: Gs Chem Orders Create -->
<div class="modal-overlay" id="modalChemOrderCreate" onclick="handleBackdropClick(event, 'modalChemOrderCreate')">
  <div class="modal-content">
    <div class="modal-breadcrumb">Chemical Inventory & Usage / Received Chemicals / Gs Chem Orders Create</div>
    <div class="modal-title">GS CHEM ORDERS CREATE</div>
    <form onsubmit="event.preventDefault(); closeModal('modalChemOrderCreate'); showToast('Chemical order saved', 'success');">
      <div class="form-grid grid-2col">
        <div class="form-group">
          <label>Processing Plant <span class="req">*</span></label>
          <select required>
            <option>All</option>
            <option selected>DFL UNIT-1 (VSP)</option>
            <option>DFL UNIT-5 (JPT)</option>
          </select>
        </div>
        <div class="form-group">
          <label>PONO <span class="req">*</span></label>
          <select required>
            <option>All</option>
            <option>DFL/KPL/2627/003</option>
            <option>DFL/BC/2526/008</option>
          </select>
        </div>
        <div class="form-group">
          <label>Chemical <span class="req">*</span></label>
          <select required>
            <option>Select</option>
            <option>CARNAL 659 S ADVANCED (STPP)</option>
            <option>CARFOSEL B 940 (STPP)</option>
            <option>ALTESA BT2 (NP)</option>
          </select>
        </div>
        <div class="form-group">
          <label>BL No</label>
          <input type="text" placeholder="Bill of Lading No">
        </div>
        <div class="form-group">
          <label>Container No</label>
          <input type="text" placeholder="Container No">
        </div>
        <div class="form-group">
          <label>Received Bags <span class="req">*</span></label>
          <input type="number" placeholder="Bags" required>
        </div>
        <div class="form-group">
          <label>Received Qty in Kgs <span class="req">*</span></label>
          <input type="number" placeholder="Kgs" required>
        </div>
        <div class="form-group">
          <label>Bill of Entry No</label>
          <input type="text" placeholder="Customs Doc No">
        </div>
        <div class="form-group">
          <label>Bill of Entry Date</label>
          <input type="date">
        </div>
        <div class="form-group">
          <label>Cleared Date</label>
          <input type="date">
        </div>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-danger" onclick="closeModal('modalChemOrderCreate')">Close</button>
        <button type="submit" class="btn btn-primary">💾 Save</button>
      </div>
    </form>
  </div>
</div>

<!-- MODAL 3: Gs Chem Consumption Create -->
<div class="modal-overlay" id="modalChemConsumptionCreate" onclick="handleBackdropClick(event, 'modalChemConsumptionCreate')">
  <div class="modal-content">
    <div class="modal-breadcrumb">Chemical Inventory & Usage / Chemicals Consumption / Gs Chem Consumption Create</div>
    <div class="modal-title">GS CHEM CONSUMPTION CREATE</div>
    <form onsubmit="event.preventDefault(); closeModal('modalChemConsumptionCreate'); showToast('Consumption recorded', 'success');">
      <div class="form-grid grid-2col">
        <div class="form-group">
          <label>Plant Name <span class="req">*</span></label>
          <select required>
            <option>All</option>
            <option selected>DFL UNIT-1 (VSP)</option>
            <option>DFL UNIT-5 (JPT)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Usage Type <span class="req">*</span></label>
          <select required>
            <option>Consumption</option>
            <option>Transfer</option>
            <option>Return</option>
          </select>
        </div>
        <div class="form-group">
          <label>Chemical Name <span class="req">*</span></label>
          <select required>
            <option>All</option>
            <option>CARNAL 659 S ADVANCED (STPP)</option>
            <option>CARFOSEL B 940 (STPP)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Bags Quantity <span class="req">*</span></label>
          <input type="number" placeholder="Bags" required>
        </div>
        <div class="form-group">
          <label>Quantity in Kgs <span class="req">*</span></label>
          <input type="number" placeholder="Kgs" required>
        </div>
        <div class="form-group">
          <label>Date <span class="req">*</span></label>
          <input type="date" value="2026-10-14" required>
        </div>
        <div class="form-group col-span-2">
          <label>Send To <span class="req">*</span></label>
          <select required>
            <option>Select</option>
            <option>Production Line 1</option>
            <option>Glazing Station</option>
          </select>
        </div>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-danger" onclick="closeModal('modalChemConsumptionCreate')">Close</button>
        <button type="submit" class="btn btn-primary">💾 Save</button>
      </div>
    </form>
  </div>
</div>

<!-- MODAL 4: Gs Chem Po Payment Create -->
<div class="modal-overlay" id="modalChemPaymentCreate" onclick="handleBackdropClick(event, 'modalChemPaymentCreate')">
  <div class="modal-content" style="max-width:850px;">
    <div class="modal-breadcrumb">Chemical Inventory & Usage / Chemical Payments List / Gs Chem Po Payment Create</div>
    <div class="modal-title">GS CHEM PO PAYMENT CREATE</div>
    <form onsubmit="event.preventDefault(); closeModal('modalChemPaymentCreate'); showToast('Payment recorded', 'success');">
      <div class="form-grid grid-2col">
        <div class="form-group">
          <label>PONO <span class="req">*</span></label>
          <select required>
            <option>All</option>
            <option selected>DFL/KPL/2627/003</option>
          </select>
        </div>
        <div class="form-group">
          <label>Chemical Name <span class="req">*</span></label>
          <input type="text" value="ALTESA NEO S100 (NP)" required>
        </div>
        <div class="form-group">
          <label>Party Name <span class="req">*</span></label>
          <input type="text" value="KPL INTERNATIONAL LTD" required>
        </div>
        <div class="form-group">
          <label>Recieved Quantity <span class="req">*</span></label>
          <input type="number" value="4800" required>
        </div>
        <div class="form-group">
          <label>Amount (₹) <span class="req">*</span></label>
          <input type="number" value="868800" required>
        </div>
        <div class="form-group">
          <label>Bank Reference No <span class="req">*</span></label>
          <input type="text" placeholder="Enter Invoice No" value="NEFT2627001" required>
        </div>
        <div class="form-group">
          <label>Payment Date <span class="req">*</span></label>
          <input type="date" value="2026-10-14" required>
        </div>
        <div class="form-group">
          <label>Remarks</label>
          <input type="text" value="Full payment">
        </div>
      </div>

      <div style="margin-top:16px;" class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>S.NO ▲</th>
              <th>PoNo</th>
              <th>Chemical Name</th>
              <th>Party Name</th>
              <th>Recieved Quantity (Kgs)</th>
              <th>Amount (Rupees)</th>
              <th>Bank Reference No</th>
              <th>Payment Date</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="10" class="empty-cell">No data available in table</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="modal-actions">
        <button type="button" class="btn btn-danger" onclick="closeModal('modalChemPaymentCreate')">Close</button>
        <button type="submit" class="btn btn-primary">💾 Save</button>
      </div>
    </form>
  </div>
</div>

<!-- ============================================
     TOAST CONTAINER
     ============================================ -->
<div class="toast-container" id="toast-container"></div>

<!-- ============================================
     JAVASCRIPT APPLICATION ENGINE
     ============================================ -->
<script>
// --- Navigation Registry & Titles ---
const SCREEN_LABELS = {
  'screen-dashboard': 'Floor Overview',
  'screen-rmreceived': 'RM Received Trackid',
  'screen-deheading': 'Deheading',
  'screen-grading': 'Grading',
  'screen-deheadingtrackid': 'De-Heading Trackid',
  'screen-gradingtrackid': 'Grading Trackid',
  'screen-valueaddition': 'Value Addition Trackid',
  'screen-honqtytransfer': 'Hon Qty Transfer After VA',
  'screen-chemicalpos': 'Chemical Pos',
  'screen-receivedchemicals': 'Received Chemicals',
  'screen-chemicalsconsumption': 'Chemicals Consumption',
  'screen-chemicalreceivedreport': 'Chemical Received Report',
  'screen-chemicalopeningbalance': 'Opening Balance Report',
  'screen-chemicalbalancereport': 'Chemical Balance Report',
  'screen-chemicalpaymentslist': 'Chemical Payments List',
  'screen-trackcodereport': 'Track Code Report',
  'screen-vafloorbalance': 'VA Floor Balance Report',
  'screen-vatransfer': 'VA Transfer Report',
  'screen-assumedreports': 'Assumed Reports by Rm & Arrival',
  'screen-consolidationdaily': 'Consolidation Report Daily & Monthly',
  'screen-fileupload': 'File Upload'
};

function navigateTo(screenId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(s => s.classList.remove('active'));

  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
  }

  // Update nav item state
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    if (item.getAttribute('data-screen') === screenId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Update breadcrumb
  const screenLabel = SCREEN_LABELS[screenId] || 'Screen';
  const breadcrumbSpan = document.getElementById('current-screen-name');
  if (breadcrumbSpan) breadcrumbSpan.textContent = screenLabel;

  // Scroll to top
  const scroller = document.getElementById('main-content-scroll');
  if (scroller) scroller.scrollTop = 0;

  // If dashboard, redraw charts
  if (screenId === 'screen-dashboard') {
    setTimeout(drawAllCharts, 80);
  }
}

// --- Sidebar Toggle ---
document.getElementById('sidebar-toggle-btn').addEventListener('click', () => {
  const sidebar = document.getElementById('app-sidebar');
  if (sidebar.style.width === '72px') {
    sidebar.style.width = '280px';
  } else {
    sidebar.style.width = '72px';
  }
});

// --- Modal System ---
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
}
function handleBackdropClick(event, id) {
  if (event.target && event.target.id === id) {
    closeModal(id);
  }
}

// --- Toast System ---
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'error') icon = '⚠️';

  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 250);
  }, 2800);
}

// --- Live Table Filter Search ---
document.addEventListener('input', (e) => {
  if (e.target.classList.contains('table-search')) {
    const term = e.target.value.toLowerCase().trim();
    const tableCard = e.target.closest('.table-card');
    if (!tableCard) return;

    const rows = tableCard.querySelectorAll('tbody tr');
    rows.forEach(row => {
      // Don't filter empty placeholder row
      if (row.querySelector('.empty-cell')) return;
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(term) ? '' : 'none';
    });
  }
});

// --- Calculations & Dynamic Field Updates ---
function updateRmTrackCode(code) {
  const input = document.getElementById('rm-trackcode-input');
  if (input) input.value = code;
}

function calcRmDiff(inputEl, expectedCount, resultSpanId) {
  const val = parseFloat(inputEl.value) || 0;
  const diff = val - expectedCount;
  const span = document.getElementById(resultSpanId);
  if (span) {
    span.textContent = diff.toFixed(1);
    span.className = diff < 0 ? 'diff-negative' : 'diff-positive';
  }
}

function calcDeheadYield() {
  const hon = parseFloat(document.getElementById('dehead-hon-qty')?.value) || 0;
  const hl = parseFloat(document.getElementById('dehead-hl-qty')?.value) || 0;
  const yieldInput = document.getElementById('dehead-sample-yield');
  if (yieldInput && hon > 0) {
    const yieldPct = ((hl / hon) * 100).toFixed(1);
    yieldInput.value = yieldPct;
  }
}

// --- Canvas 2D Chart Engine (Zero External Dependencies) ---
function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return { ctx, width: rect.width, height: rect.height };
}

function drawProductionChart() {
  const canvas = document.getElementById('productionChart');
  if (!canvas || !canvas.parentElement) return;
  const { ctx, width, height } = setupCanvas(canvas);
  if (width <= 0 || height <= 0) return;

  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = [3200, 4100, 3800, 4500, 5200, 4800, 5600];
  const maxVal = 6500;
  const padLeft = 45, padRight = 20, padTop = 20, padBottom = 30;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  // Gridlines & Y-axis labels
  ctx.strokeStyle = '#f1f5f9';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#94a3b8';
  ctx.font = '10.5px Segoe UI, sans-serif';
  ctx.textAlign = 'right';

  for (let i = 0; i <= 4; i++) {
    const yVal = Math.round((maxVal / 4) * i);
    const y = padTop + chartH - (i / 4) * chartH;
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(width - padRight, y);
    ctx.stroke();
    ctx.fillText(yVal.toLocaleString(), padLeft - 8, y + 3);
  }

  // Plot line points
  const points = data.map((val, idx) => {
    const x = padLeft + (idx / (data.length - 1)) * chartW;
    const y = padTop + chartH - (val / maxVal) * chartH;
    return { x, y, val };
  });

  // Area Fill
  const gradient = ctx.createLinearGradient(0, padTop, 0, height - padBottom);
  gradient.addColorStop(0, 'rgba(20, 184, 166, 0.35)');
  gradient.addColorStop(1, 'rgba(20, 184, 166, 0.00)');

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(points[points.length - 1].x, padTop + chartH);
  ctx.lineTo(points[0].x, padTop + chartH);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  // Stroke Line
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = '#14b8a6';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Data Dots & X Labels
  ctx.textAlign = 'center';
  points.forEach((p, idx) => {
    // Outer circle
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#14b8a6';
    ctx.fill();
    // Inner white dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // X label
    ctx.fillStyle = '#64748b';
    ctx.fillText(labels[idx], p.x, height - 8);
  });
}

function drawYieldChart() {
  const canvas = document.getElementById('yieldChart');
  if (!canvas || !canvas.parentElement) return;
  const { ctx, width, height } = setupCanvas(canvas);
  if (width <= 0 || height <= 0) return;

  const data = [
    { grade: '16/20', yield: 72 },
    { grade: '21/25', yield: 70 },
    { grade: '26/30', yield: 68 },
    { grade: '31/40', yield: 65 },
    { grade: '41/50', yield: 62 },
    { grade: '51/60', yield: 60 }
  ];
  const maxYield = 80;
  const padLeft = 35, padRight = 15, padTop = 25, padBottom = 30;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;
  const barWidth = Math.min(36, (chartW / data.length) * 0.55);

  // Y-axis grid
  ctx.strokeStyle = '#f1f5f9';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#94a3b8';
  ctx.font = '10px Segoe UI, sans-serif';
  ctx.textAlign = 'right';

  [0, 20, 40, 60, 80].forEach(val => {
    const y = padTop + chartH - (val / maxYield) * chartH;
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(width - padRight, y);
    ctx.stroke();
    ctx.fillText(val + '%', padLeft - 6, y + 3);
  });

  // Bars
  ctx.textAlign = 'center';
  data.forEach((item, idx) => {
    const xCenter = padLeft + (idx + 0.5) * (chartW / data.length);
    const barH = (item.yield / maxYield) * chartH;
    const y = padTop + chartH - barH;

    const barGrad = ctx.createLinearGradient(0, y, 0, y + barH);
    barGrad.addColorStop(0, '#14b8a6');
    barGrad.addColorStop(1, '#0f766e');

    // Rounded top bar
    ctx.fillStyle = barGrad;
    const r = 4;
    ctx.beginPath();
    ctx.moveTo(xCenter - barWidth/2, y + barH);
    ctx.lineTo(xCenter - barWidth/2, y + r);
    ctx.quadraticCurveTo(xCenter - barWidth/2, y, xCenter - barWidth/2 + r, y);
    ctx.lineTo(xCenter + barWidth/2 - r, y);
    ctx.quadraticCurveTo(xCenter + barWidth/2, y, xCenter + barWidth/2, y + r);
    ctx.lineTo(xCenter + barWidth/2, y + barH);
    ctx.closePath();
    ctx.fill();

    // Value label
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 10.5px Segoe UI, sans-serif';
    ctx.fillText(item.yield + '%', xCenter, y - 6);

    // X Grade Label
    ctx.fillStyle = '#64748b';
    ctx.font = '10.5px Segoe UI, sans-serif';
    ctx.fillText(item.grade, xCenter, height - 8);
  });
}

function drawChemicalChart() {
  const canvas = document.getElementById('chemicalChart');
  if (!canvas || !canvas.parentElement) return;
  const { ctx, width, height } = setupCanvas(canvas);
  if (width <= 0 || height <= 0) return;

  const dates = ['05-Feb', '06-Feb', '07-Feb', '08-Feb', '09-Feb', '10-Feb', '11-Feb'];
  const values = [750, 500, 500, 600, 450, 700, 550];
  const maxVal = 900;
  const padLeft = 40, padRight = 15, padTop = 25, padBottom = 30;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;
  const barWidth = Math.min(30, (chartW / dates.length) * 0.55);

  // Y-axis grid
  ctx.strokeStyle = '#f1f5f9';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#94a3b8';
  ctx.font = '10px Segoe UI, sans-serif';
  ctx.textAlign = 'right';

  [0, 300, 600, 900].forEach(val => {
    const y = padTop + chartH - (val / maxVal) * chartH;
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(width - padRight, y);
    ctx.stroke();
    ctx.fillText(val + ' kg', padLeft - 6, y + 3);
  });

  // Bars
  ctx.textAlign = 'center';
  values.forEach((val, idx) => {
    const xCenter = padLeft + (idx + 0.5) * (chartW / dates.length);
    const barH = (val / maxVal) * chartH;
    const y = padTop + chartH - barH;

    const barGrad = ctx.createLinearGradient(0, y, 0, y + barH);
    barGrad.addColorStop(0, '#f59e0b');
    barGrad.addColorStop(1, '#d97706');

    ctx.fillStyle = barGrad;
    const r = 4;
    ctx.beginPath();
    ctx.moveTo(xCenter - barWidth/2, y + barH);
    ctx.lineTo(xCenter - barWidth/2, y + r);
    ctx.quadraticCurveTo(xCenter - barWidth/2, y, xCenter - barWidth/2 + r, y);
    ctx.lineTo(xCenter + barWidth/2 - r, y);
    ctx.quadraticCurveTo(xCenter + barWidth/2, y, xCenter + barWidth/2, y + r);
    ctx.lineTo(xCenter + barWidth/2, y + barH);
    ctx.closePath();
    ctx.fill();

    // Value label
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 10px Segoe UI, sans-serif';
    ctx.fillText(val.toString(), xCenter, y - 6);

    // Date Label
    ctx.fillStyle = '#64748b';
    ctx.font = '10px Segoe UI, sans-serif';
    ctx.fillText(dates[idx], xCenter, height - 8);
  });
}

function drawAllCharts() {
  drawProductionChart();
  drawYieldChart();
  drawChemicalChart();
}

window.addEventListener('resize', () => {
  const dash = document.getElementById('screen-dashboard');
  if (dash && dash.classList.contains('active')) {
    drawAllCharts();
  }
});

// Boot init
window.addEventListener('DOMContentLoaded', () => {
  drawAllCharts();
});
</script>
</body>
</html>
'''

def main():
    target = 'preprocessing.html'
    with open(target, 'w', encoding='utf-8') as f:
        f.write(HTML_CONTENT.strip() + '\n')
    print(f"Successfully generated {target} ({len(HTML_CONTENT)} bytes)")

if __name__ == '__main__':
    main()
