import { LightningElement, api, wire } from 'lwc';
import searchRecords from '@salesforce/apex/GenericLookupController.searchRecords';

export default class PAGenericCustomMultiLookup extends LightningElement {
    @api objectApiName; // API property to specify the object API name
    @api label; // API property to specify the lookup label
    searchTerm = '';
    searchResults = [];
    showSearchResults = false;
    selectedRecords = [];

    handleSearchTermChange(event) {
        this.searchTerm = event.target.value;
        if (this.searchTerm.length > 2) {
            this.searchRecords();
        } else {
            this.searchResults = [];
            this.showSearchResults = false;
        }
    }

    @wire(searchRecords, { objectApiName: '$objectApiName', searchTerm: '$searchTerm' })
    wiredSearchResults({ error, data }) {
        if (data) {
            this.searchResults = data;
            this.showSearchResults = true;
        } else if (error) {
            console.error('Error searching records:', error);
        }
    }

    handleResultSelection(event) {
        const selectedRecordId = event.currentTarget.dataset.recordid;
        const selectedRecordName = event.currentTarget.dataset.recordname;
        this.selectedRecords.push({ Id: selectedRecordId, Name: selectedRecordName });
        this.showSearchResults = false;
        this.searchTerm = '';
    }

    handleRemoveRecord(event) {
        const recordId = event.currentTarget.dataset.id;
        this.selectedRecords = this.selectedRecords.filter(record => record.Id !== recordId);
    }
}
