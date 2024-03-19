import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TWStyles } from "../../../tailwind/twlit";
import { ScrappingProcessState } from "../../interfaces";
import "./components/index";

@customElement("aw-process-finalized")
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
