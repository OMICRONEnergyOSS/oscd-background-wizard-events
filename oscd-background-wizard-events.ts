import { XMLEditor } from '@omicronenergy/oscd-editor';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { CreateWizardEvent, EditWizardEvent } from './foundation.js';
import { html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
import OscdSclDialogs from '@omicronenergy/oscd-scl-dialogs/OscdSclDialogs.js';
import { Edit } from '@omicronenergy/oscd-api';
import { convertEdit } from '@omicronenergy/oscd-api/utils.js';

class BaseElement extends ScopedElementsMixin(LitElement) {}

export default class OscdBackgroundWizardEvents extends BaseElement {
  static scopedElements = {
    'oscd-scl-dialogs': OscdSclDialogs,
  };

  @property({ type: Object })
  editor!: XMLEditor;

  @query('oscd-scl-dialogs')
  editDialog!: OscdSclDialogs;

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
    return html`<oscd-scl-dialogs></oscd-scl-dialogs>`;
  }
}
