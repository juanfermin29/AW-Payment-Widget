import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { $scrappingContext, $socketContext } from "../../../../context";
import {
  ScrapperInputRequired,
  ScrappingProcessState,
} from "../../../../models";
import { TWStyles } from "../../../../../tailwind/twlit";
import "../../../../components/index";

import img from "../../../../assets/bancoestado.svg";
import { StoreController } from "@nanostores/lit";
@customElement("aw-input-form")
export class AwInputForm extends LitElement {
  static styles = [TWStyles];

  private profileController = new StoreController(this, $scrappingContext);

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
      class=" h-[100%] flex flex-col justify-center"
      @submit=${this._submit}
    >
      ${!this.profileController.value?.step?.title?.length
        ? html`<img src=${img} height="55" width="100" class="mb-4 mx-auto" />`
        : html`
        <div class="mb-5">
        <span class="text-[#131313] font-bold text-xs"
              >${this.profileController.value?.step?.title}</span
            >
            <small class="text-[#474747] font-normal text-xs"
              >${this.profileController.value?.step?.subtitle}</small
            >
        </div>
          `}
      ${$scrappingContext
        .get()
        .dynamicInputs?.map((_input: ScrapperInputRequired) => {
          return html`
            <input
              class="pl-4 placeholder:text-gray-400 placeholder:capitalize text-sm font-normal w-full 
               h-12 bg-transparent rounded-full  outline-none border-[2px] border-[#909090] mb-5"
              placeholder=${_input.label}
              type=${_input.type}
              name=${_input.name}
              id=${_input.name}
            />
          `;
        })}
      ${!this.profileController.value?.step?.title?.length
        ? html`
            <div class="bg-[#C6C6C6] mx-5 py-1 px-0.5 rounded-md">
              <span class="text-[#474747] text-xs break-words">
                Los datos son encriptados con TLS 1.2 y se utilizarán para pagar
                esta única vez.
              </span>
            </div>
          `
        : ""}

      <div class="flex flex-1"></div>
      <aw-continue-button
        class="w-full"
        type="submit"
        @button-continue-click=${(e: SubmitEvent) => {
          this._submit(e);
        }}
      ></aw-continue-button>
    </form>`;
  }
}
