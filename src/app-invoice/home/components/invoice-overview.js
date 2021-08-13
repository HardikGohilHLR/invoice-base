// Invoice Overview
import React, { useState } from 'react';
import { dateTimeFormat } from '../../../common/functions';

import StatusTag from '../../../components/status-tag';

const InvoiceOverview = () => {

    const [invoiceData, setInvoiceData] = useState([
        { _id: 1, trackingId: '1234', paymentDueDate: new Date(), clientName: 'John Doe', total: 999, status: 'pending'},
        { _id: 2, trackingId: '3422', paymentDueDate: new Date(), clientName: 'John Mike', total: 40, status: 'paid'},
        { _id: 3, trackingId: '2344', paymentDueDate: new Date(), clientName: 'Mike Mike Doe', total: 12000, status: 'draft'},
        { _id: 4, trackingId: '4234', paymentDueDate: new Date(), clientName: 'Jane Doe', total: 10, status: 'pending'},
    ]);

    return (
        <React.Fragment>
            {
                invoiceData?.map(invoice => {
                    return (
                        <div className="ib_invoice-overview"> 
                            <div className="ib_invoice-overview-left ib_flex ib_align-center">
                                <span class="ib_invoice-tracking-number">#{invoice.trackingId}</span>
                                <span class="ib_invoice-due-date">{dateTimeFormat(invoice.paymentDueDate, 'MMM DD, YYYY')}</span>
                                <span class="ib_invoice-person">{invoice.clientName}</span>
                                <span class="ib_invoice-total-amount">{invoice.total}</span>
                            </div>
                            <StatusTag title={invoice.status} />
                        </div>
                    )
                })
            }
        </React.Fragment>
    )
}

export default InvoiceOverview;
