import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TWStyles } from "../../../tailwind/twlit";
import spinner from "@/assets/cargando.gif";

@customElement("aw-loading")
export class AwLoading extends LitElement {
  static styles = [TWStyles];

  @property({ type: Number })
  loadWidth: number = 10;

  render() {
    return html`<div
      class="flex flex-col justify-center text-center items-center"
    >
      <span class="text-black font-bold text-lg">Procesando pago</span>
      <small class="text-black font-normal text-sm"
        >Esto demora unos segundos</small
      >
      <img
        class="mx-auto py-5 "
        height="86"
        width="86"
        src=${spinner}
        alt="loading"
      />
      <div
        class="h-2 w-56 max-w-56  gap-0 rounded-full flex-row flex justify-start"
      >
        <div
          style="width:${this.loadWidth}px;"
          class=${`h-2 bg-[#15DB6D] rounded-tl-full rounded-bl-full`}
        ></div>
        <div
          style="width:${224 - this.loadWidth}px;"
          class=${`h-2 bg-[#131313]  rounded-tr-full rounded-br-full `}
        ></div>
      </div>
    </div>`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "aw-loading": AwLoading;
  }
}
