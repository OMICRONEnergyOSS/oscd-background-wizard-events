/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// Note: it would be nice if the tests could be run with scoped custom elements,
// but for now, we'll use the global registry.

import { SinonSpy, spy } from 'sinon';

import OscdMenuOpen from './oscd-background-wizard-events.js';
import OscdBackgroundEditV1 from './oscd-background-wizard-events.js';
import { XMLEditor } from '@omicronenergy/oscd-editor';
import {
  newCloseWizardEvent,
  newCreateWizardEvent,
  newEditWizardEvent,
} from './foundation.js';
import { LitElement } from 'lit';

const doc = new DOMParser().parseFromString(
  '<SCL><Substation name="AA1"></Substation></SCL>',
  'application/xml',
);

customElements.define('oscd-background-wizard-events', OscdMenuOpen);

describe('oscd-background-wizard-events', () => {
  let pluginFixture: OscdBackgroundEditV1;

  let xmlEditorCommit: SinonSpy;

  beforeEach(async () => {
    xmlEditorCommit = spy();

    pluginFixture = await fixture(
      html`<oscd-background-wizard-events></oscd-background-wizard-events>`,
    );
    pluginFixture.editor = {
      commit: xmlEditorCommit,
    } as unknown as XMLEditor;
    document.body.append(pluginFixture);

    pluginFixture.click();
  });

  afterEach(() => pluginFixture.remove());

  it('opens the create oscd-scl-dialogs upon receiving a oscd-create-wizard-request event', async () => {
    const parent = doc.querySelector('Substation')!;
    const tagName = 'Bay';
    pluginFixture.dispatchEvent(newCreateWizardEvent(parent, tagName));
    await pluginFixture.updateComplete;

    const OscdSclDialogs =
      pluginFixture?.shadowRoot?.querySelector('oscd-scl-dialogs');
    const mdDialog = OscdSclDialogs?.shadowRoot?.querySelector(
      'md-dialog',
    ) as LitElement & { open: boolean };
    await mdDialog.updateComplete;

    await waitUntil(() => mdDialog.open, 'Dialog timed out waiting to open');

    const nameField = mdDialog?.querySelector(
      'scl-text-field[label="name"]',
    ) as (LitElement & HTMLInputElement) | null;
    expect(nameField).to.exist;
    nameField!.value = 'TestBay';
    nameField!.dispatchEvent(new Event(''));

    await nameField!.updateComplete;

    const dialogSubmitButton = mdDialog?.querySelector(
      "md-filled-button[form='add-data-object']",
    ) as HTMLButtonElement | null;
    dialogSubmitButton?.click();
    await waitUntil(() => !mdDialog.open, 'Dialog timed out waiting to close');
    await pluginFixture.updateComplete;

    expect(xmlEditorCommit.calledOnce).to.equal(true);
  });

  it('opens the edit oscd-scl-dialogs upon receiving an oscd-edit-wizard-request event', async () => {
    const element = doc.querySelector('Substation')!;
    pluginFixture.dispatchEvent(newEditWizardEvent(element));
    await pluginFixture.updateComplete;

    const OscdSclDialogs =
      pluginFixture?.shadowRoot?.querySelector('oscd-scl-dialogs');
    const mdDialog = OscdSclDialogs?.shadowRoot?.querySelector(
      'md-dialog',
    ) as LitElement & { open: boolean };
    await mdDialog.updateComplete;

    await waitUntil(() => mdDialog.open, 'Dialog timed out waiting to open');

    const nameField = mdDialog?.querySelector(
      'scl-text-field[label="name"]',
    ) as (LitElement & HTMLInputElement) | null;
    expect(nameField).to.exist;
    nameField!.value = 'AA2';
    nameField!.dispatchEvent(new Event('change'));

    await nameField!.updateComplete;

    const dialogSubmitButton = mdDialog?.querySelector(
      "md-filled-button[form='add-data-object']",
    ) as HTMLButtonElement | null;
    dialogSubmitButton?.click();
    await waitUntil(() => !mdDialog.open, 'Dialog timed out waiting to close');
    await pluginFixture.updateComplete;

    expect(xmlEditorCommit.calledOnce).to.equal(true);
  });

  it('closes oscd-scl-dialogs upon receiving an oscd-close-wizard event', async () => {
    const element = doc.querySelector('Substation')!;
    pluginFixture.dispatchEvent(newEditWizardEvent(element));
    await pluginFixture.updateComplete;

    const OscdSclDialogs =
      pluginFixture?.shadowRoot?.querySelector('oscd-scl-dialogs');
    const mdDialog = OscdSclDialogs?.shadowRoot?.querySelector(
      'md-dialog',
    ) as LitElement & { open: boolean };
    await mdDialog.updateComplete;

    await waitUntil(() => mdDialog.open, 'Dialog timed out waiting to open');

    pluginFixture.dispatchEvent(newCloseWizardEvent({ element }));
    await pluginFixture.updateComplete;

    await waitUntil(() => !mdDialog.open, 'Dialog timed out waiting to close');
    await pluginFixture.updateComplete;

    expect(xmlEditorCommit.called).to.equal(false);
  });
});
