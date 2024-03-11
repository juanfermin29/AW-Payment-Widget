import { LitElement, PropertyValueMap, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { asyncReplace } from "lit/directives/async-replace.js";
import { $scrappingContext, $socketContext } from "../../../../context";
import { TWStyles } from "../../../../../tailwind/twlit";
import { ScrappingProcessState } from "../../../../interfaces";
import { timeFormStyles } from "./aw-timeout-form.style";


async function* countDown(count: number) {
  while (count > 0) {
    count--;
    const totalMinutes = Math.floor(count/60);
    const remainingSeconds = count%60;
    yield `${totalMinutes.toString().padStart(2,'0')}:${remainingSeconds.toString().padStart(2,"0")}`
    await new Promise((r) => setTimeout(r, 1000));
  }
}

@customElement("aw-time-out")
export class AwTimeOut extends LitElement {
  static styles = [timeFormStyles, TWStyles];

  private _fireTimeout?: ReturnType<typeof setTimeout>;

  @property({ type: Number })
  timeout?: number;

  @query("span") spanLoader: HTMLSpanElement | undefined;

  disconnectedCallback() {
    clearTimeout(this._fireTimeout);
    super.disconnectedCallback();
  }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    this._setAnimation();
    this._setTimeouthandler();
  }

  private _setAnimation() {
    this.spanLoader!.style.animation = `prixClipFix ${this
      .timeout!}s infinite linear`;
    this.spanLoader!.style.animationIterationCount = "1";
  }

  private _setTimeouthandler() {
    clearTimeout(this._fireTimeout);
    this._fireTimeout = setTimeout(() => {
      $socketContext.get().$socket?.disconnect();
      $scrappingContext.set({ state: ScrappingProcessState.TimeOut });
    }, this.timeout! * 1000);
  }

  render() {
    return html`
      ${this.timeout &&
      html`<div class="flex flex-col text-center justify-center my-5">
        <span class="aw-timeout-loader mx-auto"></span>
        <small class="text-[#747474] font-normal text-xs">
          ${asyncReplace(countDown(this.timeout))}
        </small>
      </div> `}
    `;
  }
}
