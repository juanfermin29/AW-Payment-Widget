import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js'
import { $socketContext } from '../../../../context';
import { TWStyles } from '../../../../../tailwind/twlit';

@customElement('aw-close-header')
export class AwCloseHeader extends LitElement {
    static styles = [
   TWStyles
    ];

    render() {
        return html`
        <div class="absolute top-[0px] border">
        <button type="button" @click=${this._closeModal}>X</button>
        </div>
        `;
    }

    private _closeModal(){
        $socketContext.get().$socket?.disconnect();
       this.dispatchEvent(new CustomEvent('close-modal-event')); 
    }
}
