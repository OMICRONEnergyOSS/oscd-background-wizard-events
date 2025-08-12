export function newEditWizardEvent(element, eventInitDict) {
    return new CustomEvent('oscd-edit-wizard-request', {
        bubbles: true,
        composed: true,
        ...eventInitDict,
        detail: { element },
    });
}
export function newCreateWizardEvent(parent, tagName, eventInitDict) {
    return new CustomEvent('oscd-create-wizard-request', {
        bubbles: true,
        composed: true,
        ...eventInitDict,
        detail: {
            parent,
            tagName,
        },
    });
}
export function newCloseWizardEvent(wizard, eventInitDict) {
    return new CustomEvent('oscd-close-wizard', {
        bubbles: true,
        composed: true,
        ...eventInitDict,
        detail: wizard,
    });
}
//# sourceMappingURL=foundation.js.map