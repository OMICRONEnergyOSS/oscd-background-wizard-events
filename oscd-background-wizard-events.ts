import { XMLEditor } from '@omicronenergy/oscd-editor';
import { CreateWizardEvent, EditWizardEvent } from './foundation.js';
import { html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
import '@omicronenergy/oscd-edit-dialog/oscd-edit-dialog.js';
import OscdEditDialog from '@omicronenergy/oscd-edit-dialog/OscdEditDialog.js';
import { Edit } from '@omicronenergy/oscd-api';
import { convertEdit } from '@omicronenergy/oscd-api/utils.js';

export default class OscdBackgroundEditDialogEvents extends LitElement {
  @property({ type: Object })
  editor!: XMLEditor;

  @query('oscd-edit-dialog')
  editDialog!: OscdEditDialog;

  async handleCreateWizardEvent(event: CreateWizardEvent) {
    const wizardType = event.detail;
    const edits = await this.editDialog.create(wizardType);
    this.editor.commit(convertEdit(edits as Edit[]));
    this.requestUpdate();
  }

  async handleEditWizardEvent(event: EditWizardEvent) {
    const wizardType = event.detail;
    const edits = await this.editDialog.edit(wizardType);
    this.editor.commit(convertEdit(edits as Edit[]));
  }

  async handleCloseWizardEvent() {
    this.editDialog.close();
  }

  constructor() {
    super();
    document.addEventListener(
      'oscd-create-wizard-request',
      event => this.handleCreateWizardEvent(event as CreateWizardEvent),
      { capture: true },
    );
    document.addEventListener(
      'oscd-edit-wizard-request',
      event => this.handleEditWizardEvent(event as EditWizardEvent),
      { capture: true },
    );
    document.addEventListener(
      'oscd-close-wizard',
      () => this.handleCloseWizardEvent(),
      { capture: true },
    );
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`<oscd-edit-dialog></oscd-edit-dialog>`;
  }
}
