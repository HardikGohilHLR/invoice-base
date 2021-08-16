// Invoice Overview
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { dateTimeFormat } from '../../../common/functions';

import StatusTag from '../../../components/status-tag';

const InvoiceOverview = (props) => {
    const history = useHistory();
    
    const viewInvoice = (trackingId) => {        
        history.push(`invoice/${trackingId}`);
    }

    return (
        <React.Fragment>
            {
                props?.invoiceData?.map(invoice => {
                    return (
                        <div className="ib_invoice-overview"> 
                            <div className="ib_invoice-overview-left ib_flex ib_align-center">
                                <span class="ib_invoice-tracking-number">#{invoice?.invoiceId}</span>
                                <span class="ib_invoice-due-date">{dateTimeFormat(invoice?.invoiceDate.toDate(), 'MMM DD, YYYY')}</span>
                                <span class="ib_invoice-person">{invoice?.clientName}</span>
                                <span class="ib_invoice-total-amount">{invoice?.invoiceTotal}</span>                                
                            </div>
                            <StatusTag status={invoice.invoiceStatus} />
                            <span class="ib_invoice-preview" onClick={() => viewInvoice(invoice?.invoiceId)}><i class="far fa-arrow-right"></i></span>
                        </div>
                    )
                })
            }
        </React.Fragment>
    )
}

export default InvoiceOverview;
