import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { modalStyles } from "./aw-modal.styles";
import "../index";
import { StoreController } from "@nanostores/lit";
import { $profile } from "../../context";

@customElement("aw-modal")
export class AwModal extends LitElement {
  static styles = [modalStyles];

  @property({ attribute: false })
  private _context = new StoreController(this, $profile);

  render() {
    return html`
      <div
        class=${`${
          this._context?.value.modalIsVisible ? "visible" : ""
        } wrapper`}
      >
        <div class="modal border">
          <aw-close-header
            @close-modal-event=${this._closeModalEvent}
          ></aw-close-header>
          ${!this._context?.value.selectedBank
            ? html` <aw-bank-selection></aw-bank-selection> `
            : html` <aw-scrapping-process></aw-scrapping-process>`}
        </div>
      </div>
    `;
  }

  private _closeModalEvent() {
    $profile.set({
      amount: 0,
      country: "",
      loadingState: { isLoading: false },
      selectedBank: "",
      widgetToken: "",
      modalIsVisible: false,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "aw-modal": AwModal;
  }
}
