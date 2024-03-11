import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { TWStyles } from "../../../../../tailwind/twlit";
import { $scrappingContext, $socketContext } from "../../../../context";
import { ScrappingProcessState } from "../../../../interfaces";

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
      <div class="flex flex-col text-center">
        <span class="text-bold text-lg mb-3"> ${this.confirmationMsg} </span>
        ${this.scrapperState == ScrappingProcessState.Confirmation
          ? html` <div class="flex flex-row justify-center gap-2">
              <button
                type="button"
                class="text-white  h-7 text-center rounded-full w-full
               bg-[#E42A3C] font-bold text-base"
                @click=${(_: Event) => this.handleConfirmation(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                class="bg-[#131313]  h-7 text-center rounded-full w-full
               text-[#E5ECEF] font-bold text-base "
                @click=${(_: Event) => this.handleConfirmation(true)}
              >
                Confirmar
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
