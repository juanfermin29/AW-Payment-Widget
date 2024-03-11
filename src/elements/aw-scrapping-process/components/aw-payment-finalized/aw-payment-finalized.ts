import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { $scrappingContext } from "../../../../context";
import { StoreController } from "@nanostores/lit";

@customElement("aw-payment-finalized")
export class AwPaymentFinalized extends LitElement {
  static styles = [];

  private _context = new StoreController(this, $scrappingContext);

  render() {
    return html`
      ${this._context.value.dataStack &&
      html`${JSON.stringify(this._context.value.dataStack)}`}
      <h3>${this._context.value.state}</h3>
    `;
  }
}
