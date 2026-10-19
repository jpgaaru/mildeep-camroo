// Tour guide deactivated per user request

export const TourGuide = {
  isActive: false,
  start() {
    this.cleanup();
  },
  cleanup() {
    const root = document.getElementById('tour-guide-root');
    if (root) root.remove();
  }
};
