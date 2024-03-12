import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TWStyles } from "../../../tailwind/twlit";
@customElement("aw-loading")
export class AwLoading extends LitElement {
  static styles = [TWStyles];

  @property({ type: Number })
  loadWidth!: number;

  render() {
    return html`<div
      class="flex flex-col justify-center text-center items-center"
    >
      <span class="text-[#474747] font-bold text-lg">Procesando pago</span>
      <small class="text-[#474747] font-normal text-sm"
        >Esto demora unos segundos</small
      >
      <img
        class="mx-auto py-5 "
        height="86"
        width="86"
        src="https://s3-alpha-sig.figma.com/img/7e2e/9a03/a1269ee9892fbc351b354260eec1a850?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AqRKO50K2Vvu-bWAOms0BdD6ZzsVfNS-Cllf~01wgRkuLqS~YdP~cFuNSvMNtIEjhin7XXc0L7Q5MrGNVUbf7m0lfmajQA4TJFnM6Cf4deJBdjGUcxPs-Xy5CBHPvnyT6IEjSDUjmP0DEMr-PFAeoFRk9QIHTcI8ImC1yjqaKkcfCnmfvt5YNMgH~2A37bAZinQMRl~furML3F4R4GWBE8BAcWBPu-2OBFnChQ5chhiXyeJrA6av6wAEJpuPNyuBpKR8WomEMXddK0r1bADnWRjfg18~Bl61-i7~MEZWQ9svRr0LhRAqAvkDIJyG5ZNSqZpBd0zqVM~4IjOvFau1zQ__"
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
