import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { $scrappingContext, $socketContext } from "@/context";
import { ScrappingProcessState } from "@/interfaces";
import alert from "@/assets/alert.png";
import { TWStyles } from "../../../../../tailwind/twlit";
@customElement("aw-confirmation-form")
export class AwConfirmationForm extends LitElement {
  static styles = [TWStyles];

  @state()
  @property({ attribute: false })
  confirmationMsg?: string = $scrappingContext.get().step?.title;

  @state()
  @property({ attribute: false })
  scrapperState?: ScrappingProcessState = $scrappingContext.get().state;

  render() {
    return html`
      <div class="flex flex-col text-center justify-center">
        <img src=${alert} height="100" width="100" class="mx-auto" />
        <span class="text-bold text-lg mb-3"> ${this.confirmationMsg} </span>
        <div class="flex flex-1"></div>
        ${this.scrapperState == ScrappingProcessState.Confirmation
          ? html` <div class="flex flex-col justify-center gap-2">
              <button
                type="button"
                class="text-gray-800 h-10  border text-center rounded-full w-full
                font-bold text-base "
                @click=${(_: Event) => this.handleConfirmation(true)}
              >
                Confirmar
              </button>

              <button
                type="button"
                class="text-gray-800  h-10  text-center rounded-full border w-full font-bold text-base"
                @click=${(_: Event) => this.handleConfirmation(false)}
              >
                Cancelar
              </button>
            </div>`
          : ""}
      </div>
    `;
  }

  private handleConfirmation(confirm: boolean) {
    $socketContext.get().$socket?.emit("RECEIVE_REQUIRED_DATA", `${confirm}`);
  }
}
