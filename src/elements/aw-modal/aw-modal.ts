import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { modalStyles } from "./aw-modal.styles";
import "@/elements/index";
import "./components/index";
import { StoreController } from "@nanostores/lit";
import { $dataContext } from "@/context";
import { onCloseModal } from "@/utils/functions";
import { animate, fadeIn } from "@lit-labs/motion";
import { TWStyles } from "../../../tailwind/twlit";

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
          class="modal shadow-xl flex flex-col "
        >
          <aw-close-header
            @close-modal-event=${this._closeModalEvent}
          ></aw-close-header>
          <div class="h-full  text-center">
            ${!this._context?.value.selectedBank
              ? html`
                  <aw-bank-selection
                    country=${this.country}
                    currency=${this.currency}
                  ></aw-bank-selection>
                `
              : html` <aw-scrapping-process></aw-scrapping-process>`}
          </div>
          <div class="w-full font-normal text-gray-950 mb-4 text-center">
            <span>Supported by: Andean Wide</span>
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
