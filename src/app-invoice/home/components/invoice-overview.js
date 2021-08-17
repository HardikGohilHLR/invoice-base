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
                                <span className="ib_invoice-tracking-number">#{invoice?.invoiceId}</span>
                                <span className="ib_invoice-due-date">{dateTimeFormat(invoice?.invoiceDate.toDate(), 'MMM DD, YYYY')}</span>
                                <span className="ib_invoice-person">{invoice?.clientName}</span>
                                <span className="ib_invoice-total-amount">{invoice?.invoiceTotal}</span>                                
                            </div>
                            <StatusTag status={invoice.invoiceStatus} />
                            <span className="ib_invoice-preview" onClick={() => viewInvoice(invoice?.invoiceId)}><i className="far fa-arrow-right"></i></span>
                        </div>
                    )
                })
            }
        </React.Fragment>
    )
}

export default InvoiceOverview;
