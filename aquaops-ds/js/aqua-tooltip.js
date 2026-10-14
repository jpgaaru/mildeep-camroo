/**
 * AquaOps Design System — AquaTooltip Engine
 * Supports standard cardinal anchored tooltips and dynamic cursor-following tooltips (MUI followCursor)
 * with rounded corners and directional indicator arrows.
 */

export class AquaTooltip {
  static el = null;
  static arrowEl = null;
  static contentEl = null;
  static currentTarget = null;
  static isFollowing = false;

  static init() {
    if (this.el) return;

    // Create the global floating tooltip node
    const tip = document.createElement('div');
    tip.className = 'aqua-floating-tooltip';
    tip.id = 'aquaGlobalTooltip';
    tip.setAttribute('role', 'tooltip');
    tip.setAttribute('aria-hidden', 'true');

    tip.innerHTML = `
      <div class="tooltip-arrow"></div>
      <div class="tooltip-content"></div>
    `;

    document.body.appendChild(tip);
    this.el = tip;
    this.arrowEl = tip.querySelector('.tooltip-arrow');
    this.contentEl = tip.querySelector('.tooltip-content');

    // Global Event Delegation
    document.addEventListener('mouseover', (e) => this.handleMouseOver(e));
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e), { passive: true });
    document.addEventListener('mouseout', (e) => this.handleMouseOut(e));

    // Keyboard Accessibility (Focusin / Focusout)
    document.addEventListener('focusin', (e) => this.handleFocusIn(e));
    document.addEventListener('focusout', () => this.hide());
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.hide();
    });
  }

  static handleMouseOver(e) {
    const target = e.target.closest('[data-tooltip]');
    if (!target) return;

    const text = target.getAttribute('data-tooltip');
    if (!text) return;

    this.currentTarget = target;
    this.isFollowing = target.getAttribute('data-tooltip-follow') === 'true';

    this.contentEl.innerHTML = text;
    this.el.setAttribute('aria-hidden', 'false');

    const placement = target.getAttribute('data-tooltip-placement') || 'top';
    this.el.setAttribute('data-placement', placement);

    if (this.isFollowing) {
      this.el.classList.add('follow-cursor');
      this.updateCursorPosition(e);
    } else {
      this.el.classList.remove('follow-cursor');
      this.positionToAnchor(target, placement);
    }

    // Trigger smooth fade-in
    requestAnimationFrame(() => {
      this.el.classList.add('visible');
    });
  }

  static handleMouseMove(e) {
    if (!this.currentTarget || !this.isFollowing) return;
    this.updateCursorPosition(e);
  }

  static handleMouseOut(e) {
    if (!this.currentTarget) return;
    const related = e.relatedTarget;
    if (related && this.currentTarget.contains(related)) return;
    this.hide();
  }

  static handleFocusIn(e) {
    const target = e.target.closest('[data-tooltip]');
    if (!target) return;

    const text = target.getAttribute('data-tooltip');
    if (!text) return;

    this.currentTarget = target;
    this.isFollowing = false;

    this.contentEl.innerHTML = text;
    this.el.setAttribute('aria-hidden', 'false');
    this.el.classList.remove('follow-cursor');

    const placement = target.getAttribute('data-tooltip-placement') || 'top';
    this.el.setAttribute('data-placement', placement);

    this.positionToAnchor(target, placement);
    requestAnimationFrame(() => {
      this.el.classList.add('visible');
    });
  }

  static updateCursorPosition(e) {
    const tipWidth = this.el.offsetWidth || 120;
    const tipHeight = this.el.offsetHeight || 32;

    // Follow cursor: float 14px above mouse cursor, with arrow pointing at cursor
    let left = e.clientX - 18;
    let top = e.clientY - tipHeight - 12;

    // Flip to bottom if cursor is near top of viewport
    if (top < 10) {
      top = e.clientY + 22;
      this.el.setAttribute('data-placement', 'bottom');
    } else {
      this.el.setAttribute('data-placement', 'top');
    }

    // Keep within horizontal screen bounds
    if (left + tipWidth > window.innerWidth - 12) {
      left = window.innerWidth - tipWidth - 12;
    }
    if (left < 12) {
      left = 12;
    }

    this.el.style.left = `${left}px`;
    this.el.style.top = `${top}px`;
  }

  static positionToAnchor(target, placement) {
    const rect = target.getBoundingClientRect();
    const tipWidth = this.el.offsetWidth || 120;
    const tipHeight = this.el.offsetHeight || 32;

    let left = 0;
    let top = 0;

    switch (placement) {
      case 'top':
        left = rect.left + rect.width / 2 - tipWidth / 2;
        top = rect.top - tipHeight - 8;
        break;
      case 'bottom':
        left = rect.left + rect.width / 2 - tipWidth / 2;
        top = rect.bottom + 8;
        break;
      case 'left':
        left = rect.left - tipWidth - 8;
        top = rect.top + rect.height / 2 - tipHeight / 2;
        break;
      case 'right':
        left = rect.right + 8;
        top = rect.top + rect.height / 2 - tipHeight / 2;
        break;
      default:
        left = rect.left + rect.width / 2 - tipWidth / 2;
        top = rect.top - tipHeight - 8;
    }

    // Horizontal boundary clamp
    if (left < 12) left = 12;
    if (left + tipWidth > window.innerWidth - 12) {
      left = window.innerWidth - tipWidth - 12;
    }

    this.el.style.left = `${left}px`;
    this.el.style.top = `${top}px`;
  }

  static hide() {
    if (!this.el) return;
    this.el.classList.remove('visible');
    this.el.setAttribute('aria-hidden', 'true');
    this.currentTarget = null;
    this.isFollowing = false;
  }
}
