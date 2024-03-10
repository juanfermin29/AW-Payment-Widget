import { LitElement, html, PropertyValueMap } from "lit";
import { customElement, state } from "lit/decorators.js";
import { fetchContinue } from "../../apis/continue-api/continue-api";
import { $scrappingContext, $socketContext } from "../../context";
import { getSocketConnection } from "../../utils";
import { fetchRunner } from "../../apis";
import {
  ScrappingProcessState,
} from "../../models";
import "./components/index";
@customElement("aw-scrapping-process")
export class AwScrappingProcess extends LitElement {
  static styles = [];

  @state()
  private _pageState: ScrappingProcessState = ScrappingProcessState.Iddle;

  constructor() {
    super();
    $scrappingContext.subscribe((value) => {
      if (value.state != this._pageState) {
        this._pageState = value.state;
      }
    });
  }

  protected async willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): Promise<void> {
    super.willUpdate(_changedProperties);
    if (this._pageState == ScrappingProcessState.Iddle) {
      const value = await fetchContinue();
      if (value && !$socketContext.get().$socket) {
        this._connectSockets(value);
        await fetchRunner();
      }
    }
  }

  render() {
    return html`
      <!--  -->
      ${[ScrappingProcessState.Loading, ScrappingProcessState.Iddle].includes(
        this._pageState
      )
        ? html` <aw-loading></aw-loading>`
        : ""}
      <!--  -->
      ${this._pageState == ScrappingProcessState.DynamicInput
        ? html`<aw-input-form></aw-input-form>`
        : ""}
      <!--  -->
      ${this._pageState == ScrappingProcessState.DynamicSelect
        ? html`<aw-select-form></aw-select-form>`
        : ""}
      <!--  -->
      ${[
        ScrappingProcessState.Canceled,
        ScrappingProcessState.Error,
        ScrappingProcessState.Approved,
      ].includes(this._pageState)
        ? html` <aw-payment-finalized
            status=${this._pageState}
          ></aw-payment-finalized>`
        : ""}
    `;
  }

  private _connectSockets(clientId: string) {
    $socketContext.set({
      $socket: getSocketConnection(clientId),
    });
    $socketContext.get().$socket?.connect();
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "aw-scrapping-process": AwScrappingProcess;
  }
}
