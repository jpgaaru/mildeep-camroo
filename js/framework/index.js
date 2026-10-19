// AquaPulse Component Framework — Master Barrel Registry
// Unifies BaseComponent, Reactive Store, Declarative Router, Atoms, Molecules, and Organisms

import { Component } from './Component.js';
import { Store, ERPStore } from './Store.js';
import { Router, SECTION_METADATA_REGISTRY } from './Router.js';
import { Atoms } from './atoms/index.js';
import { Molecules } from './molecules/index.js';
import { Organisms } from './organisms/index.js';
import { Environment, ENV_SITEMAP_01, ENV_SITEMAP_02, ENV_CLIENT_2026 } from './Environment.js';

export const AquaFramework = {
  Component,
  Store,
  ERPStore,
  Router,
  SECTION_METADATA_REGISTRY,
  Atoms,
  Molecules,
  Organisms,
  Environment,
  ENV_SITEMAP_01,
  ENV_SITEMAP_02,
  ENV_CLIENT_2026
};

if (typeof window !== 'undefined') {
  window.AquaFramework = AquaFramework;
}

export {
  Component,
  Store,
  ERPStore,
  Router,
  SECTION_METADATA_REGISTRY,
  Atoms,
  Molecules,
  Organisms,
  Environment,
  ENV_SITEMAP_01,
  ENV_SITEMAP_02,
  ENV_CLIENT_2026
};
