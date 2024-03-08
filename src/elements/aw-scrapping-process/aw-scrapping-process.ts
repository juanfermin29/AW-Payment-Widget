import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js'

@customElement('aw-scrapping-process')
export class AwScrappingProcess extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    render() {
        return html`<h2>Hola mundo</h2>`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
      "aw-scrapping-process": AwScrappingProcess;
    }
  }