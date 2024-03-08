import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { modalStyles } from "./aw-modal.styles";
import { GlobalDataContext } from "../../context";
import { consume } from "@lit/context";
import { GlobalData } from "../../models";

@customElement("aw-modal")
export class AwModal extends LitElement {
  static styles = [modalStyles];

  @property({ type: Boolean })
  visible: boolean = false;

  @consume({ context: GlobalDataContext })
  @property({ attribute: false })
  public _context?: GlobalData;

  render() {
    return html`<div class=${`${this.visible ? "visible" : ""} " wrapper`}>
      <div class="modal">
        <div class="button-container">
          <button @click=${this.handleClick}>
            Cancelar 
          </button>
        </div>
      </div>
    </div> `;
  }

  private handleClick() {
    this.visible = false;
    this.dispatchEvent(new CustomEvent("close-modal-event"));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "aw-modal": AwModal;
  }
}
