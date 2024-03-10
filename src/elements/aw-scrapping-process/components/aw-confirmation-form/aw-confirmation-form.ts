import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js'
import { TWStyles } from '../../../../../tailwind/twlit';
import { $socketContext } from '../../../../context';

@customElement('aw-confirmation-form')
export class AwConfirmationForm extends LitElement {
    static styles = [
        TWStyles
    ];

    render() {
        return html`
            <button type="button" @click=${(_:Event)=>this.handleConfirmation(false)}>Cancelar</button>
            <button type="button" @click=${(_:Event)=>this.handleConfirmation(true)}>Confirmar</button>
        `;
    }

    private handleConfirmation(confirm:boolean){
        $socketContext.get().$socket?.emit("RECEIVE_REQUIRED_DATA", `${confirm}`)
    }
}
