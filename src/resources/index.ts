import { FrameworkConfiguration } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    'bootstrap/css/bootstrap.css',
    'resources/styles/iconfonts.css',
    'resources/styles/minton/css/components.css',
    'resources/styles/minton/css/core.css',
    'resources/styles/minton/css/elements.css',
    'resources/styles/minton/css/icons.css',
    'resources/styles/minton/css/menu.css',
    'resources/styles/minton/css/pages.css',
    'resources/styles/minton/css/responsive.css',
    'resources/styles/minton/css/variables.css'
  ]);
}
