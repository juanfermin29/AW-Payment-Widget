import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { $scrappingContext } from "@/context";
import { StoreController } from "@nanostores/lit";
import caution from '@/assets/caution.gif';
import { TWStyles } from "../../../../../tailwind/twlit";

@customElement("aw-process-error")
export class AwProcessError extends LitElement {
  private context = new StoreController(this, $scrappingContext);
  static styles = [
   TWStyles,
  ];

  render() {
    return html`
    <div class="flex flex-col">
    <div class="flex flex-col text-center">
    <img src=${caution} width="100" height="100" class="mx-auto my-3" />
    <small class="text-gray-400 text-sm">${this.context.value.error}</small>
    </div>
    </div>
     `;
  }
}
