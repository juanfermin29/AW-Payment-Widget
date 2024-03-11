import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { TWStyles } from "../../../tailwind/twlit";
import { $dataContext } from "../../context";
import { awPaymentWidgetSchema } from "../../utils";
import * as React from "react";
import { createComponent } from "@lit/react";
import "../aw-modal/aw-modal";

@customElement("aw-payment-widget")
export class AWPaymentWidget extends LitElement {
  static styles = [TWStyles];

  @property({ type: String })
  country?: string;

  @property({ type: String })
  currency?: string;

  @property()
  widgetTokenCallback?: () => Promise<string> = undefined;

  @state()
  private _loading: boolean = false;

  validateProps() {
    awPaymentWidgetSchema.validateSync({
      currency: this.currency,
      country: this.country,
    });
  }

  render() {
    this.validateProps();
    return html`
      <button
        ?disabled=${this._loading}
        class=${` bg-blue-500 px-5 py-2 text-xl text-white rounded flex flex-row
        items-center hover:bg-blue-600 transition-all `}
        @click=${this.fetchToken}
      >
        ${this._loading ? html`<div class="animate-spin h-3 w-3 "></div>` : ""}
        <span> Pagar</span>
      </button>
      <aw-modal country=${this.country!} currency=${this.currency!}></aw-modal>
    `;
  }

  private async fetchToken() {
    if (this.widgetTokenCallback) {
      this._loading = true;
      const resp = await this.widgetTokenCallback();
      if (typeof resp != "string") {
        throw new TypeError(
          `Return type of ${
            this.widgetTokenCallback.name
          } must be a string, object returned ${JSON.stringify(resp)}`
        );
      }

      $dataContext.set({
        ...$dataContext.get(),
        widgetToken: resp,
        modalIsVisible: true,
      });
      this._loading = false;
    } else {
      throw new Error(
        "widgetTokenCallback doesnt exist! " +
          JSON.stringify(this.widgetTokenCallback)
      );
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "aw-payment-widget": AWPaymentWidget;
  }
}

export const MyReactPaymentWidget = createComponent({
  tagName: "aw-payment-widget",
  elementClass: AWPaymentWidget,
  react: React,
  events: {
    onactivate: "activate",
    onchange: "change",
  },
  /*  events: {
    onWidgetTokenCallback: "widgetTokenCallback",
  }, */
});
