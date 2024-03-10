import { LightningElement, api } from 'lwc';

export default class PAGenericDatatable extends LightningElement {
    @api keyField;
    @api data;
    @api columns;
    @api sortedBy;
    @api sortedDirection;
    @api hideCheckboxColumn = false;

    handleSort(event) {
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;
        // Dispatch event to parent component
        this.dispatchEvent(new CustomEvent('sort', { detail: { fieldName: this.sortedBy, sortDirection: this.sortedDirection } }));
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        // Dispatch event to parent component
        this.dispatchEvent(new CustomEvent('rowaction', { detail: { actionName, row } }));
    }
}
