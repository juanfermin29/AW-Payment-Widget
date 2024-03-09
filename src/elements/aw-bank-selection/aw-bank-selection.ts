import {
  LitElement,
  PropertyDeclaration,
  PropertyValueMap,
  css,
  html,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Bank, GlobalData } from "../../models";
import { TWStyles } from "../../../tailwind/twlit";
import { DASHBORAD_API_URL_BASE } from "../../utils";
import { consume, provide } from "@lit/context";
import { GlobalDataContext } from "../../context";

@customElement("aw-bank-selection")
export class AWBankSelection extends LitElement {
  static styles = [css``, TWStyles];

  @consume({ context: GlobalDataContext,subscribe: true})
  @state()
  public _context!: GlobalData;

  private banks: Bank[] = [];


  /* */
  /*     const resp = fetch(
        `${DASHBORAD_API_URL_BASE}/bank/scrapper-banks/Chile/CLP`
      ).then((x) => x.json()); */

  render() {
    if (this._context.modalIsVisible) {
      this._updateLoading();
    }
    return html`
      <div class="flex flex-col border h-[100%] text-center">
        <span class=" font-bold text-base text-[#131313]"
          >Selecciona tu banco</span
        >
        ${JSON.stringify(this._context)}
        <div class="flex flex-1 "></div>
      </div>
    `;
  }

   private _updateLoading() {
    setTimeout(() => {
      this._context = {
        ...this._context,
        loadingState: {isLoading: true}
      }; 
    }, 3000);
  } 
}

declare global {
  interface HTMLElementTagNameMap {
    "aw-bank-selection": AWBankSelection;
  }
}
