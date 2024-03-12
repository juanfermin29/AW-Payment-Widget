import { LitElement, html, PropertyValueMap } from "lit";
import { customElement, state } from "lit/decorators.js";
import { fetchContinue } from "../../apis/continue-api/continue-api";
import { $dataContext, $scrappingContext, $socketContext } from "../../context";
import { getSocketConnection } from "../../utils";
import { fetchRunner } from "../../apis";
import { ScrappingProcessState } from "../../interfaces";
import "./components/index";
import { TWStyles } from "../../../tailwind/twlit";
import { StoreController } from "@nanostores/lit";
import { animate, fadeOut, fadeInSlow } from "@lit-labs/motion";
@customElement("aw-scrapping-process")
export class AwScrappingProcess extends LitElement {
  static styles = [TWStyles];

  @state()
  private _pageState: ScrappingProcessState = ScrappingProcessState.Iddle;

  @state()
  private loadWidth: number = 1;

  private _context = new StoreController(this, $scrappingContext);

  constructor() {
    super();
    $scrappingContext.subscribe((value) => {
      if (value.state != this._pageState) {
        this._pageState = value.state;
      }
      if (
        this._context.value.step?.finalizedSteps &&
        this._context.value.step.totalSteps
      ) {
        this.loadWidth = Math.floor(
          (((this._context.value.step?.finalizedSteps * 100) /
            this._context.value.step.totalSteps) *
            224) /
            100
        );
      }
    });
  }

  protected async willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): Promise<void> {
    super.willUpdate(_changedProperties);
    if (
      this._pageState == ScrappingProcessState.Iddle &&
      $dataContext.get().modalIsVisible
    ) {
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
        ? html`<aw-loading
            ${animate({
              keyframeOptions: {
                duration: 200,
                fill: "both",
              },
              in: fadeInSlow,
            })}
            loadWidth=${this.loadWidth}
          ></aw-loading>`
        : ""}
      <!--  -->
      ${this._pageState == ScrappingProcessState.DynamicInput
        ? html`<aw-input-form
            ${animate({
              keyframeOptions: {
                duration: 200,
                fill: "both",
              },
              in: fadeInSlow,
            })}
          ></aw-input-form>`
        : ""}
      <!--  -->
      ${this._pageState == ScrappingProcessState.DynamicSelect
        ? html`<aw-select-form
            ${animate({
              keyframeOptions: {
                duration: 200,
                fill: "both",
              },
              in: fadeInSlow,
            })}
          ></aw-select-form>`
        : ""}
      <!--  -->
      ${[
        ScrappingProcessState.Confirmation,
        ScrappingProcessState.Alert,
      ].includes(this._pageState)
        ? html`<aw-confirmation-form
            ${animate({
              keyframeOptions: {
                duration: 200,
                fill: "both",
              },
              in: fadeInSlow,
            })}
          ></aw-confirmation-form>`
        : ""}
      <!--  -->
      ${[
        ScrappingProcessState.Canceled,
        ScrappingProcessState.Error,
        ScrappingProcessState.Approved,
        ScrappingProcessState.TimeOut,
      ].includes(this._pageState)
        ? html` <aw-process-finalized
            ${animate({
              keyframeOptions: {
                duration: 200,
                fill: "both",
              },
              in: fadeInSlow,
            })}
            state=${this._pageState}
          ></aw-process-finalized>`
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
