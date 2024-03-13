import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { modalStyles } from "./aw-modal.styles";
import "../index";
import "./components/index";
import { StoreController } from "@nanostores/lit";
import { $dataContext } from "../../context";
import { TWStyles } from "../../../tailwind/twlit";
import { onCloseModal } from "../../utils/functions";
import { animate, fadeIn } from "@lit-labs/motion";

@customElement("aw-modal")
export class AwModal extends LitElement {
  static styles = [modalStyles, TWStyles];

  @property({ type: String })
  country!: string;

  @property({ type: String })
  currency!: string;

  @property({ attribute: false })
  private _context = new StoreController(this, $dataContext);

  render() {
    return html`
      <div
        class=${`${
          this._context?.value.modalIsVisible ? "visible" : ""
        } wrapper`}
      >
        <div
          ${animate({
            keyframeOptions: {
              duration: 250,
              fill: "both",
            },
            in: fadeIn,
          })}
          class="modal shadow-xl"
        >
          <aw-close-header
            @close-modal-event=${this._closeModalEvent}
          ></aw-close-header>
          <div class="h-full pt-10 pb-3 text-center px-3">
            ${!this._context?.value.selectedBank
              ? html`
                  <aw-bank-selection
                    country=${this.country}
                    currency=${this.currency}
                  ></aw-bank-selection>
                `
              : html` <aw-scrapping-process></aw-scrapping-process>`}
          </div>
        </div>
      </div>
    `;
  }

  private _closeModalEvent() {
    onCloseModal();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "aw-modal": AwModal;
  }
}
