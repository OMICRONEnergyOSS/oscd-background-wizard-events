/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect, fixture, html, waitUntil } from '@open-wc/testing';
// Note: it would be nice if the tests could be run with scoped custom elements,
// but for now, we'll use the global registry.
import '@webcomponents/scoped-custom-element-registry';
import { spy } from 'sinon';
import OscdMenuOpen from './oscd-background-wizard-events.js';
import { newCloseWizardEvent, newCreateWizardEvent, newEditWizardEvent, } from './foundation.js';
const doc = new DOMParser().parseFromString('<SCL><Substation name="AA1"></Substation></SCL>', 'application/xml');
customElements.define('oscd-background-wizard-events', OscdMenuOpen);
describe('oscd-background-wizard-events', () => {
    let pluginFixture;
    let xmlEditorCommit;
    beforeEach(async () => {
        xmlEditorCommit = spy();
        pluginFixture = await fixture(html `<oscd-background-wizard-events></oscd-background-wizard-events>`);
        pluginFixture.editor = {
            commit: xmlEditorCommit,
        };
        document.body.append(pluginFixture);
        pluginFixture.click();
    });
    afterEach(() => pluginFixture.remove());
    it('opens the create oscd-edit-dialog upon receiving a oscd-create-wizard-request event', async () => {
        const parent = doc.querySelector('Substation');
        const tagName = 'Bay';
        pluginFixture.dispatchEvent(newCreateWizardEvent(parent, tagName));
        await pluginFixture.updateComplete;
        const oscdEditDialog = pluginFixture?.shadowRoot?.querySelector('oscd-edit-dialog');
        const mdDialog = oscdEditDialog?.shadowRoot?.querySelector('md-dialog');
        await mdDialog.updateComplete;
        await waitUntil(() => mdDialog.open, 'Dialog timed out waiting to open');
        const nameField = mdDialog?.querySelector('scl-text-field[label="name"]');
        expect(nameField).to.exist;
        nameField.value = 'TestBay';
        nameField.dispatchEvent(new Event('change'));
        await nameField.updateComplete;
        const createButton = mdDialog?.querySelector("div[slot='actions'] md-text-button:last-of-type");
        createButton?.click();
        await waitUntil(() => !mdDialog.open, 'Dialog timed out waiting to close');
        await pluginFixture.updateComplete;
        expect(xmlEditorCommit.calledOnce).to.equal(true);
    });
    it('opens the edit oscd-edit-dialog upon receiving an oscd-edit-wizard-request event', async () => {
        const element = doc.querySelector('Substation');
        pluginFixture.dispatchEvent(newEditWizardEvent(element));
        await pluginFixture.updateComplete;
        const oscdEditDialog = pluginFixture?.shadowRoot?.querySelector('oscd-edit-dialog');
        const mdDialog = oscdEditDialog?.shadowRoot?.querySelector('md-dialog');
        await mdDialog.updateComplete;
        await waitUntil(() => mdDialog.open, 'Dialog timed out waiting to open');
        const nameField = mdDialog?.querySelector('scl-text-field[label="name"]');
        expect(nameField).to.exist;
        nameField.value = 'AA2';
        nameField.dispatchEvent(new Event('change'));
        await nameField.updateComplete;
        const createButton = mdDialog?.querySelector("div[slot='actions'] md-text-button:last-of-type");
        createButton?.click();
        await waitUntil(() => !mdDialog.open, 'Dialog timed out waiting to close');
        await pluginFixture.updateComplete;
        expect(xmlEditorCommit.calledOnce).to.equal(true);
    });
    it('closes oscd-edit-dialog upon receiving an oscd-close-wizard event', async () => {
        const element = doc.querySelector('Substation');
        pluginFixture.dispatchEvent(newEditWizardEvent(element));
        await pluginFixture.updateComplete;
        const oscdEditDialog = pluginFixture?.shadowRoot?.querySelector('oscd-edit-dialog');
        const mdDialog = oscdEditDialog?.shadowRoot?.querySelector('md-dialog');
        await mdDialog.updateComplete;
        await waitUntil(() => mdDialog.open, 'Dialog timed out waiting to open');
        pluginFixture.dispatchEvent(newCloseWizardEvent({ element }));
        await pluginFixture.updateComplete;
        await waitUntil(() => !mdDialog.open, 'Dialog timed out waiting to close');
        await pluginFixture.updateComplete;
        expect(xmlEditorCommit.called).to.equal(false);
    });
});
//# sourceMappingURL=oscd-background-wizard-events.spec.js.map