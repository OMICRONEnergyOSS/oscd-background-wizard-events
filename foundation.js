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

export { newCreateWizardEvent, newEditWizardEvent };
//# sourceMappingURL=foundation.js.map
