import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { $scrappingContext, $socketContext } from "../../../../context";
import { ScrapperInputRequired, ScrappingProcessState } from "../../../../models";

@customElement("aw-input-form")
export class AwInputForm extends LitElement {
  static styles = [];

  _submit(e: any) {
    e.preventDefault();

    const inputs = $scrappingContext.get().dynamicInputs!;
    let obj = {};
    if (inputs.length > 0) {
      for (let index = 0; index < inputs.length; index++) {
        const input = this.shadowRoot?.querySelector(
          `#${inputs[index].name}`
        ) as HTMLInputElement;
        obj = Object.assign(obj, {
          [input.id]: input.value,
        });
      }

      $socketContext.get().$socket?.emit("RECEIVE_REQUIRED_DATA", obj);
      $scrappingContext.set({
        state: ScrappingProcessState.Loading,
        dynamicInputs: []
      })
    }
  }

  render() {
    return html` <form id="my-form" @submit=${this._submit}>
      ${$scrappingContext
        .get()
        .dynamicInputs?.map((_input: ScrapperInputRequired) => {
          return html`
            <label>${_input.label}</label>
            <input type=${_input.type} name=${_input.name} id=${_input.name} />
          `;
        })}
      <button type="submit">Enviar</button>
    </form>`;
  }
}
