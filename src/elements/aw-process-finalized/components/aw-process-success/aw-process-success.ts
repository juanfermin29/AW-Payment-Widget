import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import success from "../../../../assets/success.svg";
import { TWStyles } from "../../../../../tailwind/twlit";

@customElement("aw-process-success")
export class AwProcessSuccess extends LitElement {
  static styles = [
        TWStyles
  ];

  render() {
    return html`
      <div class="flex flex-col">
        <div class="flex flex-col text-center">
          <span class="text-lg">Pago exitoso!</span>
          <small>Detalles de pago</small>
          <img src=${success} width="100" height="100" class="mx-auto" />
        </div>
            
      </div>
    `;
  }
}
