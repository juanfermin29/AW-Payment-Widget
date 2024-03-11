import { LitElement, PropertyValueMap, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { asyncReplace } from "lit/directives/async-replace.js";
import { $scrappingContext, $socketContext } from "../../../../context";
import { ScrappingProcessState } from "../../../../interfaces";
import { TWStyles } from "../../../../../tailwind/twlit";
async function* countDown(count: number) {
  while (count > 0) {
    yield count--;
    await new Promise((r) => setTimeout(r, 1000));
  }
}

@customElement("aw-time-out")
export class AwTimeOut extends LitElement {
  static styles = [TWStyles];

  constructor() {
    super();
  }

  private _fireTimeout?: ReturnType<typeof setTimeout>;

  @property({ type: Number })
  timeout?: number;

  disconnectedCallback() {
    clearTimeout(this._fireTimeout);
    super.disconnectedCallback();
  }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    clearTimeout(this._fireTimeout);
    this._fireTimeout = setTimeout(() => {
      $socketContext.get().$socket?.disconnect();
      $scrappingContext.set({ state: ScrappingProcessState.TimeOut });
    }, this.timeout! * 1000);
  }

  render() {
    return html`
      ${this.timeout &&
      html`<span class="text-green-600 font-bold: ">Tiempo restante: </span>
        <span>${asyncReplace(countDown(this.timeout))}</span>.`}
    `;
  }
}
