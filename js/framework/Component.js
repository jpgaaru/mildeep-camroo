// AquaPulse Framework — Base Component Class (Lifecycle, State, Event Delegation)

import { SelectPicker } from '../components/selectPicker.js';

export class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
    this.el = null;
    this.container = null;
    this._boundDelegatedHandlers = [];
  }

  /**
   * Update component state and trigger a re-render
   */
  setState(partialState) {
    const nextState = typeof partialState === 'function'
      ? partialState(this.state)
      : partialState;
    this.state = { ...this.state, ...nextState };
    if (this.container) {
      this.mount(this.container);
    }
  }

  /**
   * Override in subclasses to return HTML string
   */
  render() {
    return '';
  }

  /**
   * Override in subclasses to return declarative event map:
   * e.g. { 'click #reset-btn': 'onReset', 'change select': 'onFilterChange' }
   */
  events() {
    return {};
  }

  /**
   * Lifecycle hook called after DOM is mounted and upgraded
   */
  afterMount() {}

  /**
   * Mount component into a DOM element or element ID
   */
  mount(target) {
    const container = typeof target === 'string'
      ? document.getElementById(target)
      : target;
    if (!container) return null;

    this.unmountEvents();
    this.container = container;
    this.container.innerHTML = this.render(this.props, this.state);
    this.el = this.container.firstElementChild || this.container;

    // Auto-upgrade AquaOps Design System Rich Selects & Lucide Icons
    if (SelectPicker && typeof SelectPicker.upgradeAllSelects === 'function') {
      SelectPicker.upgradeAllSelects(this.container);
    }
    if (typeof window !== 'undefined' && window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }

    this.bindDeclarativeEvents();
    this.afterMount(this.container);
    return this.el;
  }

  bindDeclarativeEvents() {
    if (!this.container) return;
    const eventMap = this.events() || {};

    Object.entries(eventMap).forEach(([descriptor, handlerName]) => {
      const spaceIdx = descriptor.indexOf(' ');
      if (spaceIdx === -1) return;
      const eventType = descriptor.slice(0, spaceIdx).trim();
      const selector = descriptor.slice(spaceIdx + 1).trim();
      const method = typeof handlerName === 'function' ? handlerName : this[handlerName];
      if (typeof method !== 'function') return;

      const listener = (e) => {
        const matched = e.target.closest(selector);
        if (matched && this.container.contains(matched)) {
          method.call(this, e, matched);
        }
      };

      this.container.addEventListener(eventType, listener);
      this._boundDelegatedHandlers.push({ eventType, listener });
    });
  }

  unmountEvents() {
    if (!this.container) return;
    this._boundDelegatedHandlers.forEach(({ eventType, listener }) => {
      this.container.removeEventListener(eventType, listener);
    });
    this._boundDelegatedHandlers = [];
  }
}
