import { LitElement, html } from "lit";
import { customElement,  state } from "lit/decorators.js";
import { modalStyles } from "./aw-modal.styles";
import {  consume } from "@lit/context";
import { GlobalData } from "../../models";
import "../index";
import { GlobalDataContext } from "../../context";

@customElement("aw-modal")
export class AwModal extends LitElement {
  static styles = [modalStyles];

  @consume({ context: GlobalDataContext, subscribe: true })
  @state()
  public _context!: GlobalData;

  render() {
    return html`
      <div class=${`${this._context?.modalIsVisible ? "visible" : ""} wrapper`}>
        <div class="modal border">
          <aw-close-header
            @close-modal-event=${this._closeModalEvent}
          ></aw-close-header>
            <span>aca ${JSON.stringify(this._context?.loadingState.isLoading)}</span>
          ${this._context?.loadingState.isLoading
            ? html` <aw-loading></aw-loading>`
            : html` <aw-bank-selection></aw-bank-selection> `}
        </div>
      </div>
    `;
  }

  private _closeModalEvent() {
    this._context = {
      modalIsVisible: false,
      amount: 0,
      country:  '',
      selectedBank: '',
      loadingState: {isLoading: false},
      widgetToken: ""
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "aw-modal": AwModal;
  }
}
