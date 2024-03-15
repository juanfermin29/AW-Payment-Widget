import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { $scrappingContext } from "../../../../context";
import { StoreController } from "@nanostores/lit";

@customElement("aw-process-error")
export class AwProcessError extends LitElement {
  private context = new StoreController(this, $scrappingContext);

  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  render() {
    return html` <span> ${this.context.value.error} </span> `;
  }
}
