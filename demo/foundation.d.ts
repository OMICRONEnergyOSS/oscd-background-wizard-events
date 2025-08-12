interface WizardRequestBase {
    subWizard?: boolean;
}
export interface EditWizardRequest extends WizardRequestBase {
    element: Element;
}
export interface CreateWizardRequest extends WizardRequestBase {
    parent: Element;
    tagName: string;
}
export type WizardRequest = EditWizardRequest | CreateWizardRequest;
export type EditWizardEvent = CustomEvent<EditWizardRequest>;
export type CreateWizardEvent = CustomEvent<CreateWizardRequest>;
export type WizardEvent = EditWizardEvent | CreateWizardEvent;
type CloseWizardEvent = CustomEvent<WizardRequest>;
export declare function newEditWizardEvent(element: Element, eventInitDict?: CustomEventInit<Partial<EditWizardRequest>>): EditWizardEvent;
export declare function newCreateWizardEvent(parent: Element, tagName: string, eventInitDict?: CustomEventInit<Partial<CreateWizardRequest>>): CreateWizardEvent;
export declare function newCloseWizardEvent(wizard: WizardRequest, eventInitDict?: CustomEventInit<Partial<WizardRequest>>): CloseWizardEvent;
declare global {
    interface ElementEventMap {
        ['oscd-edit-wizard-request']: EditWizardRequest;
        ['oscd-create-wizard-request']: CreateWizardRequest;
        ['oscd-close-wizard']: WizardEvent;
    }
}
export {};
