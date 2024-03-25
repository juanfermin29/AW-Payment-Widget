import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { $scrappingContext, $socketContext } from "@/context";
import { ScrappingProcessState } from "@/interfaces";
import alert from "@/assets/caution.gif";
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

  @state()
  private _disabled = false;

  render() {
    return html`
      <div class="flex flex-col text-center justify-center ">
        <img src=${alert} height="100" width="100" class="mx-auto" />
        <span class="font-bold text-2xl my-3 break-words">
          ${this.confirmationMsg}
        </span>
        <div class="flex flex-1"></div>
        ${this.scrapperState == ScrappingProcessState.Confirmation
          ? html` <div class="flex flex-col justify-center gap-2">
              <aw-continue-button
                type="button"
                .disabled=${this._disabled}
                text="Continuar"
                @button-continue-click=${(_: CustomEvent) => {
                  this._handleConfirmation(true);
                }}
              ></aw-continue-button>

              <span
                type="button"
                class="text-gray-950 font-bold cursor-pointer underline"
                @click=${(_: Event) => this._handleConfirmation(false)}
              >
                CANCELAR
              </span>
            </div>`
          : ""}
      </div>
    `;
  }

  private _handleConfirmation(confirm: boolean) {
    if (!this._disabled) {
      console.log(confirm);
      this._disabled = true;
      $socketContext.get().$socket?.emit("RECEIVE_REQUIRED_DATA", `${confirm}`);
    }
  }
}
