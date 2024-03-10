import { LightningElement, api } from 'lwc';

export default class ComboBoxComponent extends LightningElement {
    @api name;
    @api label;
    @api value;
    @api options;
    @api placeholder;
    @api variant;
    @api disabled;
    @api required;

    handleChange(event) {
        this.value = event.detail.value;
        this.dispatchEvent(new CustomEvent('change', { detail: { value: this.value } }));
    }
}
