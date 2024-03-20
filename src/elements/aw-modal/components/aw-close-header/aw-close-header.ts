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
          class="p-2 border bg-gray-300 hover:bg-gray-500  rounded-full "
          @click=${this._closeModal}
        >
          <img src=${ex} height="15" width="15" />
        </button>
      </div>
    `;
  }

  private _closeModal() {
    $socketContext.get().$socket?.disconnect();
    this.dispatchEvent(new CustomEvent("close-modal-event"));
  }
}
