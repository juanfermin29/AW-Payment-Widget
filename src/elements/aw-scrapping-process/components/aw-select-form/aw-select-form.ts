import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { $scrappingContext, $socketContext } from "../../../../context";
import { ScrappingProcessState } from "../../../../models";
import { TWStyles } from "../../../../../tailwind/twlit";
import { StoreController } from "@nanostores/lit";

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
        <span class="text-[#131313] font-bold text-xs"
          >${this.profileController.value?.step?.title}</span
        >
        <small class="text-[#474747] font-normal text-xs"
          >${this.profileController.value?.step?.subtitle}</small
        >
      </div>
      <select
        class="pl-4 placeholder:text-[#131313] text-sm font-normal w-full 
               h-12 bg-transparent rounded-full  outline-none border-[2px] border-[#909090]"
        id="aw-select-input"
        @change=${this._submit}
      >
        ${$scrappingContext.get().dynamicSelect?.map((opt) => {
          return html`<option id=${opt.value} value=${opt.value}>
            ${opt.text}
          </option>`;
        })}
      </select>
    </form>`;
  }
}
