import { XMLEditor } from '@omicronenergy/oscd-editor';
import { CreateWizardEvent, EditWizardEvent } from './foundation.js';
import { LitElement } from 'lit';
import '@omicronenergy/oscd-edit-dialog/oscd-edit-dialog.js';
import OscdEditDialog from '@omicronenergy/oscd-edit-dialog/OscdEditDialog.js';
export default class OscdBackgroundWizardEvents extends LitElement {
    editor: XMLEditor;
    editDialog: OscdEditDialog;
    handleCreateWizardEvent(event: CreateWizardEvent): Promise<void>;
    handleEditWizardEvent(event: EditWizardEvent): Promise<void>;
    handleCloseWizardEvent(): Promise<void>;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
}
