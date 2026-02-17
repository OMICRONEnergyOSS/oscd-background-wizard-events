import { XMLEditor } from '@omicronenergy/oscd-editor';
import { CreateWizardEvent, EditWizardEvent } from './foundation.js';
import { LitElement } from 'lit';
import OscdSclDialogs from '@omicronenergy/oscd-scl-dialogs/OscdSclDialogs.js';
declare const BaseElement_base: typeof LitElement & import("@open-wc/scoped-elements/lit-element.js").ScopedElementsHostConstructor;
declare class BaseElement extends BaseElement_base {
}
export default class OscdBackgroundWizardEvents extends BaseElement {
    static scopedElements: {
        'oscd-scl-dialogs': typeof OscdSclDialogs;
    };
    editor: XMLEditor;
    editDialog: OscdSclDialogs;
    handleCreateWizardEvent(event: CreateWizardEvent): Promise<void>;
    handleEditWizardEvent(event: EditWizardEvent): Promise<void>;
    handleCloseWizardEvent(): Promise<void>;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
}
export {};
