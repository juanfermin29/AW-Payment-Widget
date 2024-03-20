import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TWStyles } from "../../../../tailwind/twlit";
import { Bank, BankImage } from "@/interfaces";
import { $dataContext } from "@/context";
import bci from "@/assets/bci.svg";
import itau from "@/assets/itau.svg";
import santander from "@/assets/santander.svg";
import falabella from "@/assets/falabella.svg";
import demo from "@/assets/aw-logo.png";
import { bankSelectionStyles } from "../aw-bank-selection.style";

@customElement("aw-banks-grid")
export class AwBanksGrid extends LitElement {
  static styles = [bankSelectionStyles, TWStyles];
  private imgs: BankImage[] = [
    { img: demo, width: 106 },
    { img: santander, width: 100 },
    { img: falabella },
    { img: itau, width: 38, height: 20 },
    { img: bci, width: 55 },
  ];

  @property({ type: Array })
  banks?: Bank[] = [];

  private _getImage(bank: Bank): BankImage {
    return (
      this.imgs.filter((img) => img.img.includes(bank.img!))[0] ?? this.imgs[0]
    );
  }

  render() {
    return html`
      <div class="grid grid-cols-2 justify-center py-3">
        ${this.banks?.map((bank: Bank) => {
          {
            const bankImage = this._getImage(bank);
            return html`
              <div
                @click=${(_: Event) => this._selectBank(_, bank)}
                class="h-20 w-40 rounded-lg mx-auto bank-box
                   mb-5 flex-col cursor-pointer transition-all duration-200
                  flex justify-center items-center"
              >
                <img
                  src=${bankImage.img}
                  class="mx-auto"
                  alt=${bank.name}
                  width=${bankImage.width ?? "80"}
                  height=${bankImage.height ?? "50"}
                />
              </div>
            `;
          }
        })}
      </div>
    `;
  }

  private _selectBank(_: Event, bank: Bank) {
    $dataContext.set({
      ...$dataContext.get(),
      selectedBank: bank,
      url: bank.url,
    });
  }
}
