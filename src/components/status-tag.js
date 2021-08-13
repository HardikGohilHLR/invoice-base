// Invoice Status tag
import React from 'react';

const StatusTag = ({title, color}) => {
    
    const statusColors = [
        { value: 'pending', color: '#ff8f00'},
        { value: 'paid', color: '#33d69f'},
        { value: 'draft', color: '#dfe3fa'}
    ];
 
    return (
        <div className={`ib_invoice-status-tag ib_invoice-status-${title}`}>
            <span style={{color: statusColors?.find(_ => _.value === title).color}}>{title}</span>    
        </div>
    )
}

export default StatusTag;
