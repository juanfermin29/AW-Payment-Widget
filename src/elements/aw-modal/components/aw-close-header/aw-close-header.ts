import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js'
import { $socketContext } from '../../../../context';

@customElement('aw-close-header')
export class AwCloseHeader extends LitElement {
    static styles = [
   
    ];

    render() {
        return html` <button type="button" @click=${this._closeModal}>X</button>`;
    }

    private _closeModal(){
        $socketContext.get().$socket?.disconnect();
        this.dispatchEvent(new CustomEvent('close-modal-event'));
    }
}
