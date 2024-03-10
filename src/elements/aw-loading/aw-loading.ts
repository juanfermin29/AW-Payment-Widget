import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { TWStyles } from "../../../tailwind/twlit";
@customElement("aw-loading")
export class AwLoading extends LitElement {
  static styles = [TWStyles];

  render() {
    return html`<div class="flex flex-col">
      <img
        height="86"
        width="86"
        src="https://s3-alpha-sig.figma.com/img/7e2e/9a03/a1269ee9892fbc351b354260eec1a850?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AqRKO50K2Vvu-bWAOms0BdD6ZzsVfNS-Cllf~01wgRkuLqS~YdP~cFuNSvMNtIEjhin7XXc0L7Q5MrGNVUbf7m0lfmajQA4TJFnM6Cf4deJBdjGUcxPs-Xy5CBHPvnyT6IEjSDUjmP0DEMr-PFAeoFRk9QIHTcI8ImC1yjqaKkcfCnmfvt5YNMgH~2A37bAZinQMRl~furML3F4R4GWBE8BAcWBPu-2OBFnChQ5chhiXyeJrA6av6wAEJpuPNyuBpKR8WomEMXddK0r1bADnWRjfg18~Bl61-i7~MEZWQ9svRr0LhRAqAvkDIJyG5ZNSqZpBd0zqVM~4IjOvFau1zQ__"
        alt="loading"
      />
    </div>`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "aw-loading": AwLoading;
  }
}
