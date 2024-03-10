import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { modalStyles } from "./aw-modal.styles";
import "../index";
import "./components/index";
import { StoreController } from "@nanostores/lit";
import { $dataContext } from "../../context";
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
  /* 
  render() {
    return html` <div
      class=${`${this._context?.value.modalIsVisible ? "visible" : ""} wrapper`}
    >
      <div class="modal pt-20 pb-1 rounded-lg">
        <aw-close-header
          @close-modal-event=${this._closeModalEvent}
        ></aw-close-header>
        <input
          placeholder="Usuario"
          class="pl-4 placeholder:text-[#131313] text-sm font-normal w-full
          h-12 bg-transparent rounded-full  outline-none border-[2px] border-[#909090] mb-3"
        />
        <input
          placeholder="Usuario"
          class="pl-4 placeholder:text-[#131313] text-sm font-normal w-full 
          h-12 bg-transparent rounded-full  outline-none border-[2px] border-[#909090] mb-5"
        />
      </div>
    </div>`;
  } */
  render() {
    return html`
      <div
        class=${`${
          this._context?.value.modalIsVisible ? "visible" : ""
        } wrapper`}
      >
        <div class="modal  rounded-lg ">
          <aw-close-header
            @close-modal-event=${this._closeModalEvent}
          ></aw-close-header>
          <div
            class="h-full pt-20 pb-1 text-center px-3"
          >
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
    $dataContext.set({
      amount: 0,
      currency: "",
      country: "",
      clientId: "",
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
