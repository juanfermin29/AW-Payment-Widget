import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ScrappingProcessState } from "../../../../models";

@customElement("aw-payment-finalized")
export class AwPaymentFinalized extends LitElement {
  static styles = [];

  @property({ type: Number })
  status!: ScrappingProcessState;

  render() {
    return html`<h2>Proceso finalizado</h2>
      <h3>${this.status}</h3> `;
  }
}
