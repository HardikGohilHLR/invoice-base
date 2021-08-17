// Invoice 
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import db from '../../firebase/firebaseInit';

// Components
import StatusTag from '../../components/status-tag';

const ViewInvoice = () => {
    const history = useHistory();
    const { invoiceId } = useParams();

    const [invoice, setInvoice] = useState({});

    useEffect(() => {
        getInvoice();        
    }, [invoiceId]);

    const getInvoice = async () => {
        const response = db.collection('invoices');
        const data = await response.where('invoiceId', '==', invoiceId).get();
        data.forEach(doc => {
            setInvoice(doc.data());
            console.log(doc.data());
        });
    }

    const handle = {
        toggleEditInvoice: () => {

        },
        deleteInvoice: () => {

        },
        updateStatusToPaid: () => {

        },
        updateStatusToPending: () => {

        }
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
                        <button onClick={handle.deleteInvoice} className="ib_btn ib_btn-red ib_ml-10">Delete</button>
                        {
                            invoice?.invoiceStatus === 2 &&
                            <button onClick={handle.updateStatusToPaid} className="ib_btn ib_btn-green ib_ml-10"> Mark as Paid</button>
                        }
                        {                            
                            invoice?.invoiceStatus === 1 &&
                            <button onClick={handle.updateStatusToPending} className="ib_btn ib_btn-orange ib_ml-10"> Mark as Pending</button>
                        }
                    </div>             
                </div> 

                <div className="ib_view-invoice__body ib_flex ib_align-center">
                
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
