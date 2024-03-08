import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { TWStyles } from "../../../tailwind/twlit";
import "../my-modal/aw-modal";
import { provide } from "@lit/context";
import { GlobalDataContext } from "../../context";
import { GlobalData } from "../../models";

@customElement("aw-payment-widget")
export class AWPaymentWidget extends LitElement {
  static styles = [css``, TWStyles];

  @property({ type: String })
  country: string = "";

  @property({ type: String })
  currency: string = "";

  @property()
  widgetTokenPromise?: () => Promise<string> = undefined;

  @state()
  private _loading: boolean = false;

  @state()
  private _visibleModal: boolean = false;

  @provide({ context: GlobalDataContext })
  private _context: GlobalData = new GlobalData();

  render() {
    return html`<button
        ?disabled=${this._loading}
        class=${` bg-blue-500 px-5 py-2 text-xl 
      text-white rounded flex flex-row items-center hover:bg-blue-600 transition-all `}
        @click=${this.fetchToken}
      >
        ${this._loading
          ? html`<div class="animate-spin h-3 w-3 border "></div>`
          : ""}
        <span> Pagar </span>
      </button>
      <aw-modal
        @close-modal-event=${this._closeModalEvent}
        ?visible=${this._visibleModal}
      ></aw-modal> `;
  }

  private async fetchToken() {
    if (this.widgetTokenPromise) {
      this._loading = true;
      const resp = await this.widgetTokenPromise();
      if (typeof resp != "string") {
        throw new TypeError(
          `Return type of ${
            this.widgetTokenPromise.name
          } must be a string, object returned ${JSON.stringify(resp)}`
        );
      }
      this._context.widgetToken = resp;
      this._loading = false;
      this._visibleModal = true;
    }
  }

  private _closeModalEvent() {
    this._visibleModal = false;
    this._context = {
      amount: 0,
      country: "",
      selectedBank: "",
      widgetToken: "",
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "aw-payment-widget": AWPaymentWidget;
  }
}
