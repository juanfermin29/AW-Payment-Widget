import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ScrappingProcessState } from "@/interfaces";
import "@/elements/aw-scrapping-finalized/components";
import { TWStyles } from "../../../tailwind/twlit";

@customElement("aw-scrapping-finalized")
export class AwProcessFinalized extends LitElement {
  static styles = [TWStyles];

  @property({ type: Number })
  private state!: ScrappingProcessState;

  render() {
    return html`
      ${this.state == ScrappingProcessState.Approved
        ? html`<aw-process-success></aw-process-success>`
        : ""}
      ${this.state == ScrappingProcessState.Error
        ? html`<aw-process-error></aw-process-error>`
        : ""}
    `;
  }
}
