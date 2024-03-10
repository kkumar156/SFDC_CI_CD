import { LightningElement, api } from 'lwc';

export default class PAGenericButton extends LightningElement {
    @api label;
    @api variant = 'neutral';
    @api disabled = false;

    get buttonClass() {
        return `slds-button slds-button_${this.variant} ${this.disabled ? 'slds-disabled' : ''}`;
    }

    handleClick(event) {
        if (!this.disabled) {
            this.dispatchEvent(new CustomEvent('click'));
        }
    }
}
