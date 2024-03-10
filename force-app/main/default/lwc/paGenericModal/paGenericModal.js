import { LightningElement, api } from 'lwc';

export default class PAGenericModal extends LightningElement {
    @api modalHeader;

    closeModal() {
        const closeEvent = new CustomEvent('closemodal');
        this.dispatchEvent(closeEvent);
    }
}
