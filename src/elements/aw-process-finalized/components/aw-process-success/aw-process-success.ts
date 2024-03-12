import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import success from "../../../../assets/success.svg";
import { TWStyles } from "../../../../../tailwind/twlit";
import { $dataContext, $scrappingContext } from "../../../../context";
import { StoreController } from "@nanostores/lit";

@customElement("aw-process-success")
export class AwProcessSuccess extends LitElement {
  private context = new StoreController(this, $scrappingContext);
  private data = $dataContext.get();
  private _rows = [
    {
      label: "Número de operación",
      value: this.context.value.dataStack.reference,
    },
    {
      label: "Desde banco",
      value: this.data.selectedBank,
    },
    {
      label: "Cuenta",
      value: this.context.value.dataStack.account.accountNumber,
    },
    {
      label: "Destinatario",
      value: this.context.value.dataStack.account.owner,
    },
    {
      label: "Monto",
      value: `${this.data.amount} ${this.data.currency}`,
    },
  ];

  static styles = [TWStyles];

  render() {
    return html`
      <div class="flex flex-col">
        <div class="flex flex-col text-center">
          <span class="text-lg text-[#15DB6D] font-bold">¡Pago exitoso!</span>
          <small class="text-gray-400 text-sm">Detalles de pago</small>
          <img src=${success} width="100" height="100" class="mx-auto my-3" />
        </div>
      </div>

      <div class="flex flex-col">
        ${this._rows.map((info) => {
          return html`
            <div class="border-b py-1 border-gray-500 flex justify-between">
              <span class="text-[#131313]"> ${info.label} </span>
              <span class="font-bold"> ${info.value} </span>
            </div>
          `;
        })}
      </div>
    `;
  }
}
