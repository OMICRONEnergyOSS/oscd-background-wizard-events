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

export function newEditWizardEvent(
  element: Element,
  eventInitDict?: CustomEventInit<Partial<EditWizardRequest>>,
): EditWizardEvent {
  return new CustomEvent<EditWizardRequest>('oscd-edit-wizard-request', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { element },
  });
}

export function newCreateWizardEvent(
  parent: Element,
  tagName: string,
  eventInitDict?: CustomEventInit<Partial<CreateWizardRequest>>,
): CreateWizardEvent {
  return new CustomEvent<CreateWizardRequest>('oscd-create-wizard-request', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: {
      parent,
      tagName,
    },
  });
}

export function newCloseWizardEvent(
  wizard: WizardRequest,
  eventInitDict?: CustomEventInit<Partial<WizardRequest>>,
): CloseWizardEvent {
  return new CustomEvent<WizardRequest>('oscd-close-wizard', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: wizard,
  });
}

declare global {
  interface ElementEventMap {
    ['oscd-edit-wizard-request']: EditWizardRequest;
    ['oscd-create-wizard-request']: CreateWizardRequest;
    ['oscd-close-wizard']: WizardEvent;
  }
}
