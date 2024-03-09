import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Bank } from "../../models";
import { TWStyles } from "../../../tailwind/twlit";
import { StoreController } from "@nanostores/lit";
import { $dataContext } from "../../context";
import { DASHBORAD_API_URL_BASE } from "../../utils";
import { Task } from "@lit/task";
import "./components/index";
@customElement("aw-bank-selection")
export class AWBankSelection extends LitElement {
  static styles = [css``, TWStyles];

  @property({ attribute: false })
  private _context = new StoreController(this, $dataContext);

  private _banksTask = new Task(this, {
    task: async ([_context], { signal }) => {
        if(!this._context.value.modalIsVisible){
          return;
        }
      const response = await fetch(
        `${DASHBORAD_API_URL_BASE}/bank/scrapper-banks/Chile/CLP`,
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
      <div class="flex flex-col  h-[100%] text-center">
        ${this._banksTask.render({
          complete(banks) {
            return html`
              <span class=" font-bold text-base text-[#131313]"
                >Selecciona tu banco</span
              >
              <aw-banks-grid .banks=${banks?.data}></aw-banks-grid>
              <div class="flex flex-1 "></div>
            `;
          },
          pending: () => html`<aw-loading></aw-loading>`,
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "aw-bank-selection": AWBankSelection;
  }
}
