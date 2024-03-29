import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { TWStyles } from "../../../tailwind/twlit";
import { $dataContext } from "../../context";
import { awPaymentWidgetSchema } from "../../utils";
import * as React from "react";
import { createComponent } from "@lit/react";
import { until } from "lit/directives/until.js";
import "../aw-modal/aw-modal";

@customElement("aw-payment-widget")
export class AWPaymentWidget extends LitElement {
  static styles = [TWStyles];

  @property({ type: String })
  country?: string;

  @property({ type: String })
  currency?: string;

  @property({ type: String })
  text?: string;

  @property({ type: String })
  buttonClass?: string = "";

  @property()
  widgetTokenCallback?: () => Promise<string> = undefined;

  @state()
  private _loading: boolean = false;

  validateProps() {
    awPaymentWidgetSchema.validateSync({
      currency: this.currency,
      country: this.country,
      text: this.text,
      widgetTokenCallback: this.widgetTokenCallback,
    });
  }

  render() {
    this.validateProps();
    return html`
      <button
        ?disabled=${this._loading}
        class=${until(this.buttonClass, "")}
        @click=${this.fetchToken}
      >
      <div class="flex flex-row items-center">
      ${this._loading
          ? html`<div
              class="animate-spin h-3 w-3 border-4 rounded-full border-gray-200 "
            ></div>`
          : ""}
        <span>${this.text}</span>
      </div>
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
        "widgetTokenCallback not found! " +
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

export const PaymentWidget = createComponent({
  tagName: "aw-payment-widget",
  elementClass: AWPaymentWidget,
  react: React,
  events: {
    onactivate: "activate",
    onchange: "change",
  },
});
