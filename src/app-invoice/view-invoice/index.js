// Invoice 
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { dateTimeFormat } from '../../common/functions';
import db from '../../firebase/firebaseInit';

// Components
import StatusTag from '../../components/status-tag';

const ViewInvoice = () => {
    const history = useHistory();
    const { invoiceId } = useParams();

    const [invoice, setInvoice] = useState({});
    const [allValues, setAllValues] = useState({
        loading: false,
        deleteLoading: false
    });

    useEffect(() => {
        getInvoice();        
    }, [invoiceId]);

    const getInvoice = async () => {
        const response = db.collection('invoices');
        const data = await response.where('invoiceId', '==', invoiceId).get();
        data.forEach(doc => { 
            setInvoice({...doc.data(), _id: doc.id});
        });
    }

    const handle = {
        toggleEditInvoice: () => {

        },
        deleteInvoice: async () => {
            setAllValues({...allValues, deleteLoading: true});
            const response = await db.collection('invoices').doc(invoice._id).delete();
            history.push('/');
        }
    }

    const updateStatus = async (status) => {
        setAllValues({...allValues, loading: true});
        const response = db.collection('invoices').doc(invoice._id); 
        const data = await response.update({invoiceStatus: status});  
        getInvoice().then(() => {            
            setAllValues({...allValues, loading: false});
        });
    }

    return (
        <React.Fragment>
            <div className="ib_view-invoice ib_container"> 

                <div className="ib_view-invoice__title">
                    <h1>Invoice #{invoiceId}</h1> 
                </div>

                <div className="ib_view-invoice__goback">
                    <span className="ib_flex ib_align-center" onClick={() => history.goBack()}>
                        <i className="far fa-chevron-left"></i>
                        Go back
                    </span>
                </div>

                <div className="ib_view-invoice__header ib_flex ib_align-center"> 
                    {
                        invoice?.invoiceStatus &&
                        <div className=" ib_view-invoice__header-left ib_flex ib_align-center">
                            <span>Status</span>
                            <StatusTag status={invoice?.invoiceStatus} />
                        </div>  
                    }
                    
                    <div className="ib_view-invoice__header-right ib_flex ib_align-center">  
                        {
                            invoice?.invoiceStatus !== 3 &&
                            <button onClick={handle.toggleEditInvoice} className="ib_btn ib_btn-dark">Edit</button>
                        }                       
                        <button className={`ib_btn ib_btn-red ib_ml-10 ${allValues?.deleteLoading ? 'ib_btn-loading' : ''}`} onClick={handle.deleteInvoice}>
                            <span className="ib_btn-loader"><img src="/images/spinner.svg" /></span>
                            Delete
                        </button>  
                        {
                            invoice?.invoiceStatus === 2 &&
                            <button className={`ib_btn ib_btn-green ib_ml-10 ${allValues?.loading ? 'ib_btn-loading' : ''}`} onClick={() => updateStatus(3)}>
                                <span className="ib_btn-loader"><img src="/images/spinner.svg" /></span>
                                Mark as Paid
                            </button>  
                        }
                        {                            
                            invoice?.invoiceStatus === 1 &&
                            <button className={`ib_btn ib_btn-orange ib_ml-10 ${allValues?.loading ? 'ib_btn-loading' : ''}`} onClick={() => updateStatus(2)}>
                                <span className="ib_btn-loader"><img src="/images/spinner.svg" /></span>
                                Mark as Pending
                            </button> 
                        }
                    </div>             
                </div> 

                <div className="ib_view-invoice__body">

                    
                    <div className="ib_view-invoice__sender ib_flex ib_content-between ib_mb-30">                        
                        <div className="ib_view-invoice__block">
                            <h1>#{invoice?.invoiceId}</h1>
                            <p>{invoice?.productDesc}</p> 
                        </div>
                    
                        <div className="ib_view-invoice__block ib_pr-0">
                            <ul className="ib_text-right">
                                <li>{invoice?.streetAddress},</li>
                                <li>{invoice?.zip}, {invoice?.city}</li>  
                                { invoice?.country && 
                                    <li>{invoice?.country}.</li>
                                }
                            </ul>
                        </div> 
                    </div>

                    <div className="ib_view-invoice__content ib_pt-10">
                        
                        <div className="ib_flex ib_flex-column ib_view-invoice__block"> 
                            <div className="ib_view-invoice__block-inner">
                                <p>Invoice Date</p> 
                                <h2>{dateTimeFormat(invoice?.invoiceDate?.toDate(), 'DD MMM YYYY')}</h2>
                            </div>
                        
                            <div className="ib_view-invoice__block-inner">
                                <p>Payment Due</p>
                                <h2>{dateTimeFormat(invoice?.paymentDue?.toDate(), 'DD MMM YYYY')}</h2>
                            </div>
                        </div>

                        <div className="ib_view-invoice__block">
                            <p>Bill to</p>
                            <h2>{invoice?.clientName}</h2>

                            <ul>
                                <li>{invoice?.clientStreetAddress},</li>
                                <li>{invoice?.clientZip}, {invoice?.clientCity}</li> 
                                { invoice?.clientCountry && 
                                    <li>{invoice?.clientCountry}.</li>
                                }
                            </ul>
                        </div>
                        
                        <div className="ib_view-invoice__block">
                            <p>Sent to</p>
                            <h2>{invoice?.clientEmail}</h2>
                        </div>
                    </div>
                
                    <div className="ib_view-invoice__products">
                        <table>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>QTY.</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>                            
                            </thead>

                            <tbody>
                                {
                                    invoice?.products?.map(product => {
                                        return (
                                            <tr>
                                                <td>{product?.name}</td>
                                                <td>{product?.qty}</td>
                                                <td>{product?.price}</td>
                                                <td>{product?.total}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>

                            <tfoot>                            
                                <tr>
                                    <td colSpan="2">Amount Due</td>
                                    <td colSpan="2">{invoice?.invoiceTotal}</td>
                                </tr> 
                            </tfoot>
                        </table>
                    
                    </div>
                </div>

            </div>
        
        </React.Fragment>
    )
}

export default ViewInvoice;
