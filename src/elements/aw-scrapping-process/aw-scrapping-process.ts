import { LitElement, html, PropertyValueMap } from "lit";
import { customElement } from "lit/decorators.js";
import { fetchContinue } from "../../apis/continue-api/continue-api";
import { $dataContext, $socketContext } from "../../context";
import { getSocketConnection } from "../../utils";

@customElement("aw-scrapping-process")
export class AwScrappingProcess extends LitElement {
  static styles = [];


  protected async willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): Promise<void> {
    super.willUpdate(_changedProperties);
    const value = await fetchContinue();
    if (value && !$socketContext.get().$socket) {
      $socketContext.set({
        $socket: getSocketConnection(value)
      })
      $socketContext.get().$socket?.connect();
    } 
  }

  render() {
    return html`<h2>${JSON.stringify($dataContext.get().selectedBank)}</h2>`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "aw-scrapping-process": AwScrappingProcess;
  }
}
