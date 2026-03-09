function newEditWizardEvent(element, eventInitDict) {
    return new CustomEvent('oscd-edit-wizard-request', {
        bubbles: true,
        composed: true,
        ...eventInitDict,
        detail: { element },
    });
}
function newCreateWizardEvent(parent, tagName, eventInitDict) {
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
function newCloseWizardEvent(wizard, eventInitDict) {
    return new CustomEvent('oscd-close-wizard', {
        bubbles: true,
        composed: true,
        ...eventInitDict,
        detail: wizard,
    });
}

export { newCloseWizardEvent, newCreateWizardEvent, newEditWizardEvent };
//# sourceMappingURL=foundation.js.map
