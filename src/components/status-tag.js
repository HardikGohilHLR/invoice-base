// Invoice Status tag
import React from 'react';

const StatusTag = ({status, color}) => {
    
    const invoiceStatuses = [
        { value: 1, label: 'draft', color: '#dfe3fa'},
        { value: 2, label: 'pending', color: '#ff8f00'},
        { value: 3, label: 'paid', color: '#33d69f'},
    ];

    const getInvoiceStatus = (invoiceStatus) => { 
        return invoiceStatuses?.find(_ => _.value === parseInt(invoiceStatus)).label;
    }
 
    return (
        <div className={`ib_invoice-status-tag ib_invoice-status-${getInvoiceStatus(status)}`}>
            <span style={{color: invoiceStatuses?.find(_ => _.value === parseInt(status)).color}}>{getInvoiceStatus(status)}</span>    
        </div>
    )
}

export default StatusTag;
