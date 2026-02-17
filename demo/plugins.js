import OscdMenuOpen from '@omicronenergy/oscd-menu-open';
import OscdMenuSave from '@omicronenergy/oscd-menu-save';
import OscdBackgroundEditV1 from '@omicronenergy/oscd-background-editv1';
import OscdBackgroundWizardEvents from '../oscd-background-wizard-events.js';

const oscdShell = document.querySelector('oscd-shell');

if (oscdShell?.registry) {
  const { registry } = oscdShell;
  registry.define('oscd-menu-open', OscdMenuOpen);
  registry.define('oscd-menu-save', OscdMenuSave);
  registry.define('oscd-background-editv1', OscdBackgroundEditV1);

  registry.define('oscd-background-wizard-events', OscdBackgroundWizardEvents);
} else {
  console.error('Shell registry not found. Plugins could not be registered.');
}

export const plugins = {
  menu: [
    {
      name: 'Open File',
      translations: { de: 'Datei öffnen' },
      icon: 'folder_open',
      tagName: 'oscd-menu-open',
    },
    {
      name: 'Save File',
      translations: { de: 'Datei speichern' },
      icon: 'save',
      requireDoc: true,
      tagName: 'oscd-menu-save',
    },
  ],
  editor: [
    {
      name: 'Trigger Wizard',
      translations: { de: 'Wizard Triggern' },
      icon: 'folder_open',
      requireDoc: true,
      src: './demo-editor-plugin.js',
    },
  ],
  background: [
    {
      name: 'Background Plugin for Wizard Events',
      tagName: 'oscd-background-wizard-events',
      icon: 'none',
      requireDoc: true,
    },
    {
      name: 'EditV1 Events Listener',
      icon: 'none',
      requireDoc: true,
      tagName: 'oscd-background-editv1',
    },
  ],
};
