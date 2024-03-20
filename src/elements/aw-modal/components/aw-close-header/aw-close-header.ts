import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { $socketContext } from "../../../../context";
import { TWStyles } from "../../../../../tailwind/twlit";
import ex from "@/assets/ex.svg";
@customElement("aw-close-header")
export class AwCloseHeader extends LitElement {
  static styles = [TWStyles];

  render() {
    return html`
      <div class="absolute top-[10px]">
        <button
          type="button"
          class="p-1 border bg-gray-300 hover:bg-green-400 transition-all duration-75  rounded-full "
          @click=${this._closeModal}
        >
          <img src=${ex} height="12" width="12" />
        </button>
      </div>
    `;
  }

  private _closeModal() {
    $socketContext.get().$socket?.disconnect();
    this.dispatchEvent(new CustomEvent("close-modal-event"));
  }
}
