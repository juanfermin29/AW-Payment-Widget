import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Bank } from "../../models";
import { TWStyles } from "../../../tailwind/twlit";
import { StoreController } from "@nanostores/lit";
import { $dataContext } from "../../context";
import { DASHBORAD_API_URL_BASE } from "../../utils";
import { Task } from "@lit/task";
import "./components/index";
import "../../components/index";

@customElement("aw-bank-selection")
export class AWBankSelection extends LitElement {
  static styles = [css``, TWStyles];

  @property({ type: String })
  country!: string;

  @property({ type: String })
  currency!: string;

  @property({ attribute: false })
  private _context = new StoreController(this, $dataContext);

  private _banksTask = new Task(this, {
    task: async ([_context], { signal }) => {
      if (!this._context.value.modalIsVisible) {
        return;
      }
      const response = await fetch(
        `${DASHBORAD_API_URL_BASE}/bank/scrapper-banks/${this.country}/${this.currency}`,
        { signal }
      );
      if (!response.ok) {
        throw new Error("Error looking for banks");
      }
      const data = (await response.json()) as { data: Bank[] };
      return data;
    },
    args: () => [this._context.value.modalIsVisible],
  });

  render() {
    return html`
      ${this._banksTask.render({
        complete(banks) {
          return html`
            <div class=" h-[100%] flex flex-col">
              <span class="font-bold text-sm text-[#131313] mb-3"
                >Selecciona tu banco</span
              >
              <aw-banks-grid .banks=${banks?.data}></aw-banks-grid>
              <div class="flex flex-1 border"></div>
              <aw-continue-button
                class="w-full"
                type="button"
              ></aw-continue-button>
            </div>
          `;
        },
        pending: () => html`<aw-loading></aw-loading>`,
      })}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "aw-bank-selection": AWBankSelection;
  }
}
