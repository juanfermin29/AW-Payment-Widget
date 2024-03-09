import { LitElement, PropertyValueMap,  css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Bank, GlobalData } from "../../models";
import { TWStyles } from "../../../tailwind/twlit";
import { DASHBORAD_API_URL_BASE } from "../../utils";

@customElement("aw-bank-selection")
export class AWBankSelection extends LitElement {
  constructor() {
    /*      console.log('prueba');
      this._context.loadingState = { isLoading: true };
      const resp = fetch(
        `${DASHBORAD_API_URL_BASE}/bank/scrapper-banks/Chile/CLP`
      ).then((x) => x.json());
      console.log(resp); */
    super();
  }

  static styles = [css``, TWStyles];

  @property({ type: Boolean })
  visible: boolean = false;

  /* @consume({ context: GlobalDataContext }) */
  @property({ attribute: false })
  public _context!: GlobalData;

  private banks: Bank[] = [];
  

  protected shouldUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): boolean {
    console.log(_changedProperties.get('visible'));
      return true;
  }

    
  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
      console.log(_changedProperties);
  }
  /* 
  private loadData(){
    const resp = fetch(
      `${DASHBORAD_API_URL_BASE}/bank/scrapper-banks/Chile/CLP`
    ).then((x) => x.json());
    return resp;
    console.log(resp);
  } */

  render() {
    return html`
      <div class="flex flex-col border h-[100%] text-center">
        <span class=" font-bold text-base text-[#131313]"
          >Selecciona tu banco</span
        >
        <div class="flex flex-1 "></div>
      </div>
    `;
  }

 
}

declare global {
  interface HTMLElementTagNameMap {
    "aw-bank-selection": AWBankSelection;
  }
}
