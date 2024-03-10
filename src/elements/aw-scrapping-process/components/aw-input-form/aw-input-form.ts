import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { $scrappingContext, $socketContext } from "../../../../context";
import {
  ScrapperInputRequired,
  ScrappingProcessState,
} from "../../../../models";
import { TWStyles } from "../../../../../tailwind/twlit";
import "../../../../components/index";
@customElement("aw-input-form")
export class AwInputForm extends LitElement {
  static styles = [TWStyles];

  _submit(e: SubmitEvent) {
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
        dynamicInputs: [],
      });
    }
  }

  render() {
    return html` <form
      id="my-form"
      class=" h-[100%] flex flex-col"
      @submit=${this._submit}
    >
      ${$scrappingContext
        .get()
        .dynamicInputs?.map((_input: ScrapperInputRequired) => {
          return html`
            <input
              class="pl-4 placeholder:text-gray-400 text-sm font-normal w-full 
               h-12 bg-transparent rounded-full  outline-none border-[2px] border-[#909090] mb-5"
              placeholder=${_input.label}
              type=${_input.type}
              name=${_input.name}
              id=${_input.name}
            />
          `;
        })}
      <div class="flex flex-1"></div>
      <aw-continue-button
        class="w-full"
        type="submit"
        @button-continue-click=${(e:SubmitEvent) => {
          this._submit(e)
        }}
      ></aw-continue-button>
    </form>`;
  }
}
