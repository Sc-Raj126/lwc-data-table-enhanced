import { LightningElement, api, track } from 'lwc';

export default class EnhancedDataTable extends LightningElement {
    @api columns = [];
    @api data = [];
    @api sortedBy = '';
    @api sortedDirection = 'asc';
    @track filteredData = [];
    
    connectedCallback() {
        this.filteredData = this.data;
    }
    
    handleSort(event) {
        const { fieldName, sortDirection } = event.detail;
        this.sortedBy = fieldName;
        this.sortedDirection = sortDirection;
        this.sortData(fieldName, sortDirection);
    }
    
    sortData(fieldName, direction) {
        this.filteredData = [...this.filteredData].sort((a, b) => {
            const aVal = a[fieldName];
            const bVal = b[fieldName];
            return direction === 'asc' ? aVal > bVal ? 1 : -1 : aVal < bVal ? 1 : -1;
        });
    }
    
    handleFilterChange(event) {
        const searchTerm = event.target.value.toLowerCase();
        this.filteredData = this.data.filter(row => {
            return this.columns.some(col => 
                String(row[col.fieldName]).toLowerCase().includes(searchTerm)
            );
        });
    }
}
