import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TWStyles } from "../../../../tailwind/twlit";
import { Bank } from "../../../interfaces";
import { $dataContext } from "../../../context";
import bancoEstado from '../../../assets/bancoestado.svg'
@customElement("aw-banks-grid")
export class AwBanksGrid extends LitElement {
  static styles = [TWStyles];

  @property({ type: Array })
  banks: Bank[] = [];

  render() {
    return html`
      <div class="grid grid-cols-2 justify-center">
        ${this.banks?.map((bank: Bank) => {
          return html`
            <div
              @click=${(_: Event) => this._selectBank(_, bank._id)}
              class="h-20 w-32 rounded-lg mx-auto hover:shadow-lg border
               border-gray-300 mb-5 flex-col cursor-pointer transition-all duration-200
              flex justify-center items-center"
            >
              <img
                src=${bancoEstado}
                class="mx-auto"
                alt=${bank.name}
                width="103"
                height="24"
              />
            </div>
          `;
        })}
      </div>
    `;
  }

  private _selectBank(_: Event, _id: string) {
    $dataContext.set({
      ...$dataContext.get(),
      selectedBank: _id,
    });
  }
}
