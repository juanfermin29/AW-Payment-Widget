import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { modalStyles } from "./elements/my-modal/aw-modal.styles";

@customElement("aw-modal")
export class AwModal extends LitElement {
  static styles = [modalStyles];

  @property({ type: Boolean })
  visible: boolean = false;

  render() {
    return html`<div class=${`${this.visible ? "visible" : ""} " wrapper`}>
      <div class="modal">
        <div class="button-container">
          <h2>vini mono</h2>
          <button @click=${this.handleClick}></button>
        </div>
      </div>
    </div> `;
  }

  
  private handleClick(){
  this.visible=false;    
  this.dispatchEvent(new CustomEvent('close-modal-event'));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "aw-modal": AwModal;
  }
}
