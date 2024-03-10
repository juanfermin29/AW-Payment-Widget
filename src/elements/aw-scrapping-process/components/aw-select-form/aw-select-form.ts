import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { $scrappingContext, $socketContext } from "../../../../context";
import { ScrappingProcessState } from "../../../../models";

@customElement("aw-select-form")
export class AwSelectForm extends LitElement {
  static styles = [];

  _submit(e: Event) {
    e.preventDefault();
    const select = this.shadowRoot?.querySelector(
      "#aw-select-input"
    ) as HTMLSelectElement;
    if (select && select.value.length) {
      $socketContext.get().$socket?.emit("RECEIVE_REQUIRED_DATA", select.value);
      $scrappingContext.set({
        state: ScrappingProcessState.Loading,
        dynamicSelect: [],
      });
    }
  }

  render() {
    return html` <form id="my-select-form">
      <select id="aw-select-input" @change=${this._submit}>
        ${$scrappingContext.get().dynamicSelect?.map((opt) => {
          return html`<option id=${opt.value} value=${opt.value}>
            ${opt.text}
          </option>`;
        })}
      </select>
    </form>`;
  }
}
