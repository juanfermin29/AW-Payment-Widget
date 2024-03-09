import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { TWStyles } from "../../../tailwind/twlit";
import "../aw-modal/aw-modal";
import { ContextProvider } from "@lit/context";
import { GlobalData } from "../../models";
import { GlobalDataContext } from "../../context";

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
  private _context = new ContextProvider(this, {
    context: GlobalDataContext,
    initialValue: new GlobalData(),
  });

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
      ${JSON.stringify(this._context.value)}
      <aw-modal></aw-modal> `;
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
      this._context.setValue({
        ...this._context.value,
        widgetToken: resp,
        modalIsVisible: true,
      });
      this._loading = false;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "aw-payment-widget": AWPaymentWidget;
  }
}
