import { LitElement, html, PropertyValueMap } from "lit";
import { customElement, state } from "lit/decorators.js";
import { fetchContinue } from "../../apis/continue-api/continue-api";
import { $scrappingContext, $socketContext } from "../../context";
import { getSocketConnection } from "../../utils";
import { fetchRunner } from "../../apis";
import { ScrapperInputRequired, ScrappingProcessState } from "../../models";
import "./components/index";
@customElement("aw-scrapping-process")
export class AwScrappingProcess extends LitElement {
  static styles = [];

  @state()
  private _pageState: ScrappingProcessState = ScrappingProcessState.Iddle;

  constructor() {
    super();

    $scrappingContext.subscribe(value=>{
     if(value.state != this._pageState){
        this._pageState = value.state
     }
    })
    $socketContext.subscribe((value) => {
      if (value.$socket) {
        value.$socket.on(
          "ASK_FOR_DATA",
          (dynamicInputs: ScrapperInputRequired[]) => {
            $scrappingContext.set({
              ...$scrappingContext.get(),
              state: ScrappingProcessState.DynamicInput,
              dynamicInputs,
            });
            this._pageState = ScrappingProcessState.DynamicInput;
          }
        );
        value.$socket.on("ASK_FOR_OPTION", (e: any) => {
          console.log(e);
        });
      }
    });
  }

  protected async willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): Promise<void> {
    super.willUpdate(_changedProperties);
    if(this._pageState == ScrappingProcessState.Iddle){
      const value = await fetchContinue();
      if (value && !$socketContext.get().$socket) {
        this._connectSockets(value);
        const algo = await fetchRunner();
        console.log(algo);
      }
    }
  }

  render() {
    return html`
      ${this._pageState == ScrappingProcessState.Iddle
        ? html` <aw-loading></aw-loading>`
        : ""}
      <!--  -->
      ${this._pageState == ScrappingProcessState.Loading
        ? html` <aw-loading></aw-loading>`
        : ""}
      <!--  -->
      ${this._pageState == ScrappingProcessState.DynamicInput
        ? html`<aw-input-form></aw-input-form>`
        : ""}
      ${$scrappingContext.get().state}
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
