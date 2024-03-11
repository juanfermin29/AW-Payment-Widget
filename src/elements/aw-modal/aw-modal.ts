import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { modalStyles } from "./aw-modal.styles";
import "../index";
import "./components/index";
import { StoreController } from "@nanostores/lit";
import { $dataContext, $scrappingContext, $socketContext } from "../../context";
import { TWStyles } from "../../../tailwind/twlit";
import { ScrappingProcessState } from "../../models";

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
        <div class="modal  rounded-lg ">
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

    $scrappingContext.set({
      state: ScrappingProcessState.Iddle,
      confirmation: null,
      dynamicInputs: [],
      dynamicSelect: [],
      step: null,
    });

    $socketContext.set({$socket: null});
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "aw-modal": AwModal;
  }
}
