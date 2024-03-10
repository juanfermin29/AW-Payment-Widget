import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TWStyles } from "../../../../tailwind/twlit";
import { Bank } from "../../../models";
import { $dataContext } from "../../../context";
import bancoEstado from '../../../assets/bancoestado.svg'
@customElement("aw-banks-grid")
export class AwBanksGrid extends LitElement {
  static styles = [TWStyles];

  @property({ type: Array })
  banks?: Bank[];

  render() {
    return html`
      <div class="grid grid-cols-2 gap-2 border justify-center">
        ${this.banks?.map((bank: Bank) => {
          return html`
            <div
              @click=${(_: Event) => this._selectBank(_, bank._id)}
              class="h-24 rounded-lg w-44 mx-auto hover:bg-gray-100 mb-3  flex-col cursor-pointer transition-all duration-200
           bg-white flex justify-center items-center"
            >
              <img
                src=${bancoEstado}
                class="mx-auto"
                alt=${bank.name}
                width="124"
                height="24"
              />
            </div>
          <span>
          ${bank.name}
          </span>
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
