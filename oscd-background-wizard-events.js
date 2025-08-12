import { __decorate } from './node_modules/tslib/tslib.es6.js';
import './node_modules/@lit/reactive-element/reactive-element.js';
import { html as x } from './node_modules/lit-html/lit-html.js';
import { LitElement as i } from './node_modules/lit-element/lit-element.js';
import { property as n } from './node_modules/@lit/reactive-element/decorators/property.js';
import { query as e } from './node_modules/@lit/reactive-element/decorators/query.js';
import './node_modules/@omicronenergy/oscd-edit-dialog/dist/oscd-edit-dialog.js';
import { convertEdit } from './node_modules/@omicronenergy/oscd-api/dist/convertEdit.js';

class OscdBackgroundWizardEvents extends i {
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
        return x `<oscd-edit-dialog></oscd-edit-dialog>`;
    }
}
__decorate([
    n({ type: Object })
], OscdBackgroundWizardEvents.prototype, "editor", void 0);
__decorate([
    e('oscd-edit-dialog')
], OscdBackgroundWizardEvents.prototype, "editDialog", void 0);

export { OscdBackgroundWizardEvents as default };
//# sourceMappingURL=oscd-background-wizard-events.js.map
