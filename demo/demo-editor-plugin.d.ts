import { LitElement } from 'lit';
import type OscdSclDialogs from '@omicronenergy/oscd-scl-dialogs/OscdSclDialogs.js';
import { XMLEditor } from '@omicronenergy/oscd-editor';
export default class TriggerWizard extends LitElement {
    doc: XMLDocument;
    editor: XMLEditor;
    editCount: unknown;
    newTagName: HTMLSelectElement;
    parentSelector: HTMLInputElement;
    childinput: HTMLInputElement;
    tagSelector: HTMLInputElement;
    editDialog: OscdSclDialogs;
    triggerWizardCreate(): Promise<void>;
    triggerWizardEdit(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
