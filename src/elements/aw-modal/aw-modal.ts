import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { modalStyles } from "./aw-modal.styles";
import { GlobalDataContext } from "../../context";
import { consume } from "@lit/context";
import { GlobalData } from "../../models";
import "../index";

@customElement("aw-modal")
export class AwModal extends LitElement {
  static styles = [modalStyles];

  @property({ type: Boolean })
  visible: boolean = false;

  @consume({ context: GlobalDataContext })
  @property({ attribute: false })
  public _context!: GlobalData;

  render() {
    return html`
      <div class=${`${this.visible ? "visible" : ""} wrapper`}>
        <div class="modal border">
          <aw-close-header></aw-close-header>
          ${this._context.loadingState.isLoading
            ? html` <aw-loading></aw-loading>`
            : html` <aw-bank-selection></aw-bank-selection> `}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "aw-modal": AwModal;
  }
}
