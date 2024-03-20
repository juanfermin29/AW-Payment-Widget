import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { $dataContext, $scrappingContext, $socketContext } from "@/context";
import { ScrappingProcessState } from "@/interfaces";
import { StoreController } from "@nanostores/lit";
import { TWStyles } from "../../../../../tailwind/twlit";
import bci from "@/assets/bci.svg";
import itau from "@/assets/itau.svg";
import santander from "@/assets/santander.svg";
import falabella from "@/assets/falabella.svg";
import demo from "@/assets/aw-logo.png";

@customElement("aw-select-form")
export class AwSelectForm extends LitElement {
  static styles = [TWStyles];
  private imgs = [bci, itau, santander, demo, falabella];

  @property({ attribute: false })
  @state()
  private _scrappingcontext = new StoreController(this, $scrappingContext);

  private _dataContext = new StoreController(this, $dataContext);

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
        <img
          src=${this.imgs.filter((x) =>
            x.includes(this._dataContext.value.selectedBank!.img!)
          )[0] ?? demo}
          height="80"
          width="100"
          class="mb-4 mx-auto"
        />

        <span class="text-black font-bold text-lg"
          >${this._scrappingcontext.value?.step?.title}</span
        >
        <small class="text-black font-normal text-sm"
          >${this._scrappingcontext.value?.step?.subtitle}</small
        >
      </div>
      <select
        class="pl-4 placeholder:text-black text-sm font-normal w-full h-12 bg-transparent rounded-full  outline-none border-[2px] border-[#909090]"
        id="aw-select-input"
        @change=${this._submit}
      >
        <option value="">----------------</option>
        ${$scrappingContext.get().dynamicSelect?.map((opt) => {
          return html`<option
            class="bg-white border-none h-5 py-2 text-black"
            id=${opt.value}
            value=${opt.value}
          >
            ${opt.text}
          </option>`;
        })}
      </select>
    </form>`;
  }
}
