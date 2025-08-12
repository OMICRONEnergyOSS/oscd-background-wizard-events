import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
import '@omicronenergy/oscd-edit-dialog/oscd-edit-dialog.js';
import { convertEdit } from '@omicronenergy/oscd-api/utils.js';
export default class OscdBackgroundWizardEvents extends LitElement {
    async handleCreateWizardEvent(event) {
        const wizardType = event.detail;
        const edits = await this.editDialog.create(wizardType);
        this.editor.commit(convertEdit(edits));
        this.requestUpdate();
    }
    async handleEditWizardEvent(event) {
        const wizardType = event.detail;
        const edits = await this.editDialog.edit(wizardType);
        this.editor.commit(convertEdit(edits));
    }
    async handleCloseWizardEvent() {
        this.editDialog.close();
    }
    constructor() {
        super();
        document.addEventListener('oscd-create-wizard-request', event => this.handleCreateWizardEvent(event), { capture: true });
        document.addEventListener('oscd-edit-wizard-request', event => this.handleEditWizardEvent(event), { capture: true });
        document.addEventListener('oscd-close-wizard', () => this.handleCloseWizardEvent(), { capture: true });
    }
    // eslint-disable-next-line class-methods-use-this
    render() {
        return html `<oscd-edit-dialog></oscd-edit-dialog>`;
    }
}
__decorate([
    property({ type: Object })
], OscdBackgroundWizardEvents.prototype, "editor", void 0);
__decorate([
    query('oscd-edit-dialog')
], OscdBackgroundWizardEvents.prototype, "editDialog", void 0);
//# sourceMappingURL=oscd-background-wizard-events.js.map