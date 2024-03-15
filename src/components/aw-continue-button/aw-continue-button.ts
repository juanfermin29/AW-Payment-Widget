import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { TWStyles } from "../../../tailwind/twlit";
@customElement("aw-continue-button")
export class AwContinueButton extends LitElement {
  static styles = [TWStyles];

  @property({ type: String })
  text = "Continuar";

  @property({ type: String })
  type: "submit" | "reset" | "button" = "button";

  @property({ type: Boolean })
  @state()
  disabled = false;

  render() {
    return html`
      <button
        ?disabled=${this.disabled}
        type=${this.type}
        class="bg-[#131313]  h-12 text-center rounded-full w-full
               text-[#E5ECEF] font-bold text-base"
        @click=${this._onClick}
      >
        ${this.text}
      </button>
    `;
  }

  private _onClick() {
    if (this.type == "submit") {
      this.dispatchEvent(new SubmitEvent("button-continue-click"));
    } else {
      this.dispatchEvent(new CustomEvent("button-continue-click"));
    }
  }
}
