import { css, html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
import type OscdSclDialogs from '@omicronenergy/oscd-scl-dialogs/OscdSclDialogs.js';

import { XMLEditor } from '@omicronenergy/oscd-editor';
import {
  emptyWizard,
  wizards,
} from '@omicronenergy/oscd-scl-dialogs/wizards.js';
import { newCreateWizardEvent, newEditWizardEvent } from '../foundation.js';

function prettyPrintXml(xml: XMLDocument | Element): string {
  const serializer = new XMLSerializer();
  const xmlStr = serializer.serializeToString(xml);

  // Insert line breaks between tags
  const xmlString = xmlStr.replace(/>(\s*)</g, '>\n<');
  let formatted = '';
  let pad = 0;

  xmlString.split('\n').forEach(node => {
    if (node.match(/^<\/[^>]+>/)) {
      pad -= 2;
    } // Closing tag
    if (pad < 0) {
      pad = 0;
    }
    formatted += ' '.repeat(pad) + node + '\n';
    if (node.match(/^<[^!?/][^>]*[^/]>$/)) {
      pad += 2;
    } // Opening tag (not self-closing, not comment/doctype)
  });

  return formatted.trim();
}

const supportedCreateTagNames = Object.entries(wizards)
  .filter(([, value]) => value.create !== emptyWizard)
  .map(([key]) => key);

const supportedEditTagNames = Object.entries(wizards)
  .filter(([, value]) => value.edit !== emptyWizard)
  .map(([key]) => key);

export default class TriggerWizard extends LitElement {
  @property()
  doc!: XMLDocument;

  @property()
  editor!: XMLEditor;

  @property()
  editCount!: unknown;

  @query('#newTagName') newTagName!: HTMLSelectElement;

  @query('#parentSelector') parentSelector!: HTMLInputElement;

  @query('#childtag') childinput!: HTMLInputElement;

  @query('#tagSelector') tagSelector!: HTMLInputElement;

  @query('oscd-scl-dialogs') editDialog!: OscdSclDialogs;

  async triggerWizardCreate(): Promise<void> {
    const parent = this.doc.querySelector(this.parentSelector.value);
    const tagName = this.newTagName.value;
    if (!parent || !tagName) {
      return;
    }

    this.dispatchEvent(newCreateWizardEvent(parent, tagName));
    this.requestUpdate();
    console.log(new XMLSerializer().serializeToString(this.doc));
  }

  async triggerWizardEdit(): Promise<void> {
    const element = this.doc.querySelector(this.tagSelector.value);

    if (!element) {
      this.tagSelector.setCustomValidity('Terrible selector, try again.');
      this.tagSelector.reportValidity();
      return;
    } else if (!supportedEditTagNames.includes(element.tagName)) {
      this.tagSelector.setCustomValidity(
        'This tag name is not currently supported.',
      );
      this.tagSelector.reportValidity();
      return;
    } else {
      this.tagSelector.setCustomValidity('');
    }

    this.dispatchEvent(newEditWizardEvent(element));
    this.requestUpdate();
  }

  render() {
    return html`<div class="card">
        <h2>Add Element</h2>
        <p>
          Use this section to trigger the oscd-scl-dialogs to Add/Inert the
          specified Element to the specified Parent
        </p>
        <label>Parent Selector:</label
        ><input id="parentSelector" value="Substation" />
        <label for="newTagName">Tag Name:</label
        ><select id="newTagName">
          ${supportedCreateTagNames.map(
            tagName => html`<option value=${tagName}>${tagName}</option>`,
          )}
        </select>
        <button @click="${this.triggerWizardCreate}">Add</button>
      </div>

      <div class="card">
        <h2>Edit existing Element</h2>
        <p>
          Use this section to trigger the oscd-scl-dialogs to Edit the specified
          existing Element
        </p>
        <label>Tag Selector</label>
        <div>
          <input
            id="tagSelector"
            value="Substation"
            aria-describedby="supportedEditElements"
          />
          <div
            role="tooltip"
            id="supportedEditElements"
            aria-label="Supported Elements for Editing"
          >
            <h3>Supported Elements for Editing</h3>
            <ul>
              ${supportedEditTagNames.map(tagName => html`<li>${tagName}</li>`)}
            </ul>
          </div>
        </div>
        <button @click="${this.triggerWizardEdit}">Edit</button>
      </div>

      <div class="card">
        <h2>Document Content</h2>
        <pre style="white-space: break-spaces">${prettyPrintXml(this.doc)}</pre>
      </div> `;
  }

  static styles = css`
    .card {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem 2rem;
      align-items: center;
      justify-items: center;
      padding: 2rem;
      background: #fafbfc;
      border-radius: 8px;
      max-width: 500px;
      margin: 2rem auto;
    }

    .card h2,
    .card p,
    .card button {
      grid-column: 1 / -1;
      text-align: center;
      margin-block: 0;
    }

    .card label,
    .card select,
    .card input,
    .card > div,
    .card button {
      width: 100%;
    }

    .card button {
      text-align: center;
    }

    [role='tooltip'],
    .hide-tooltip.hide-tooltip.hide-tooltip + [role='tooltip'] {
      visibility: hidden;
      position: absolute;
      background: black;
      color: white;
      padding: 1rem;
      border-radius: 8px;
    }
    [aria-describedby]:hover,
    [aria-describedby]:focus {
      position: relative;
    }
    [aria-describedby]:hover + [role='tooltip'],
    [aria-describedby]:focus + [role='tooltip'] {
      visibility: visible;
    }
  `;
}
