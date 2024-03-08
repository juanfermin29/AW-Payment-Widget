import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {TWStyles} from '../../../tailwind/twlit';
import '../my-modal/aw-modal';

@customElement("aw-payment-widget")
export class AWPaymentWidget extends LitElement {
  static styles = [css``,TWStyles];

  @property({ type: String })
  country: string = "";

  @property({ type: String })
  currency: string = "";

  @state()
  private _loading: boolean = false;

  @state()
  private _visibleModal: boolean = false;

   _token: string = "";
  

  @property()
  widgetTokenPromise?: () => Promise<string> = undefined;

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
        <span> Pagar ${JSON.stringify(this._visibleModal)}</span>
      </button>
      <aw-modal 
      @close-modal-event=${this._closeModalEvent}
      ?visible=${this._visibleModal}></aw-modal> `;
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
      this._token = resp;
      this._loading = false;
      this._visibleModal = true;
    }
  }

  private _closeModalEvent(){
    this._visibleModal = false;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "aw-payment-widget": AWPaymentWidget;
  }
}
