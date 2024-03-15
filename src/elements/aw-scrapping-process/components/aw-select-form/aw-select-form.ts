import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { $scrappingContext, $socketContext } from "../../../../context";
import { ScrappingProcessState } from "../../../../interfaces";
import { TWStyles } from "../../../../../tailwind/twlit";
import { StoreController } from "@nanostores/lit";
import img from "../../../../assets/estado.svg";

@customElement("aw-select-form")
export class AwSelectForm extends LitElement {
  static styles = [TWStyles];

  @property({ attribute: false })
  @state()
  private profileController = new StoreController(this, $scrappingContext);

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
    return html` <form id="my-select-form" class="text-center">
      <div class="mb-5">
        <img src=${img} height="80" width="170" class="mb-4 mx-auto" />

        <span class="text-[#474747] font-bold text-lg"
          >${this.profileController.value?.step?.title}</span
        >
        <small class="text-[#474747] font-normal text-sm"
          >${this.profileController.value?.step?.subtitle}</small
        >
      </div>
      <select
        class="pl-4 placeholder:text-[#474747] text-sm font-normal w-full h-12 bg-transparent rounded-full  outline-none border-[2px] border-[#909090]"
        id="aw-select-input"
        @change=${this._submit}
      >
        <option value="">----------------</option>
        ${$scrappingContext.get().dynamicSelect?.map((opt) => {
          return html`<option
          class="bg-white border-none h-5 py-2 text-black"
          id=${opt.value} value=${opt.value}>
            ${opt.text}
          </option>`;
        })}
      </select>
    </form>`;
  }
}
