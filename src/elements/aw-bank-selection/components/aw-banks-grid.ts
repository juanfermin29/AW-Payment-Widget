import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TWStyles } from "../../../../tailwind/twlit";
import { Bank } from "../../../interfaces";
import { $dataContext } from "../../../context";
import estado from "../../../assets/estado.svg";
import bci from "../../../assets/bci.svg";
import itau from "../../../assets/itau.svg";
import santander from "../../../assets/santander.svg";
import falabella from "../../../assets/falabella.svg";
import demo from "../../../assets/success.svg";

@customElement("aw-banks-grid")
export class AwBanksGrid extends LitElement {
  static styles = [TWStyles];
  private imgs = [estado, bci, itau, santander, demo, falabella];

  @property({ type: Array })
  banks?: Bank[] = [];

  render() {
    return html`
      <div class="grid grid-cols-2 justify-center">
        ${this.banks?.map((bank: Bank) => {
          return html`
            <div
              @click=${(_: Event) => this._selectBank(_, bank)}
              class="h-20 w-32 rounded-lg mx-auto hover:shadow-lg border
               border-gray-300 mb-5 flex-col cursor-pointer transition-all duration-200
              flex justify-center items-center"
            >
              <img
                src=${this.imgs.filter((x) => x.includes(bank.img!!))[0] ??
                demo}
                class="mx-auto"
                alt=${bank.name}
                width="60"
                height="50"
              />
            </div>
          `;
        })}
      </div>
    `;
  }

  private _selectBank(_: Event, bank: Bank) {
    $dataContext.set({
      ...$dataContext.get(),
      selectedBank: bank._id,
      url: bank.url
    });
  }
}
