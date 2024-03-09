import { LitElement, html, css, PropertyValueMap } from "lit";
import { customElement } from "lit/decorators.js";
import { fetchContinue } from "../../apis/continue-api/continue-api";
import { $profile } from "../../context";

@customElement("aw-scrapping-process")
export class AwScrappingProcess extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  protected async willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): Promise<void> {
    super.willUpdate(_changedProperties);
    const { selectedBank, country, currency, widgetToken } = $profile.get();
    await fetchContinue({
      bankId: selectedBank,
      country,
      currency,
      widgetToken,
    });
    
    /*  */
    
  }

  render() {
    return html`<h2>Hola mundo</h2>`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "aw-scrapping-process": AwScrappingProcess;
  }
}
