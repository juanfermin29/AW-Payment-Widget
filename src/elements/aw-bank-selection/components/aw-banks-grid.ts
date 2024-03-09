import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TWStyles } from "../../../../tailwind/twlit";
import { Bank } from "../../../models";
import { $profile } from "../../../context";

@customElement("aw-banks-grid")
export class AwBanksGrid extends LitElement {
  static styles = [TWStyles];

  @property({ type: Array })
  banks?: Bank[];

  render() {
    return html`
      <div class="grid grid-cols-2 gap-2 border justify-center">
        ${this.banks?.map((bank: Bank) => {
          return html`
            <div
              @click=${(_: Event)=>this._selectBank(_,bank.name)}
              class="h-24 rounded-lg w-44 mx-auto hover:bg-gray-100 mb-3 cursor-pointer transition-all duration-200
           bg-white flex justify-center items-center"
            >
              <img
                src="/assets/bancoestado.svg"
                class="mx-auto"
                alt=${bank.name}
                width="124"
                height="24"
              />
            </div>
          `;
        })}
      </div>
    `;
  }

  private _selectBank(_: Event, name:string){
    console.log('click');
    
    $profile.set({
      ...$profile.get(),
      selectedBank: name
    })
  }
}
