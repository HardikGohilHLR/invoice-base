// Invoice 
import React from 'react';
import { useHistory } from 'react-router-dom';

// Components
import StatusTag from '../../components/status-tag';

const ViewInvoice = () => {
    const history = useHistory();

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
                    <h1>Invoice #123123</h1> 
                </div>

                <div className="ib_view-invoice__goback">
                    <span className="ib_flex ib_align-center" onClick={() => history.goBack()}>
                        <i class="far fa-chevron-left"></i>
                        Go back
                    </span>
                </div>

                <div className="ib_view-invoice__header ib_flex ib_align-center"> 
                    <div className=" ib_view-invoice__header-left ib_flex ib_align-center">
                        <span>Status</span>
                        <StatusTag title='pending' />
                    </div>  
                    
                    <div className="ib_view-invoice__header-right ib_flex ib_align-center">                        
                        <button onClick={handle.toggleEditInvoice} className="ib_btn ib_btn-dark">Edit</button>
                        <button onClick={handle.deleteInvoice} className="ib_btn ib_btn-red ib_ml-10">Delete</button>
                        <button onClick={handle.updateStatusToPaid}  className="ib_btn ib_btn-green ib_ml-10"> Mark as Paid</button>
                        <button onClick={handle.updateStatusToPending} className="ib_btn ib_btn-orange ib_ml-10"> Mark as Pending</button>
                    </div>             
                </div> 

                <div className="ib_view-invoice__body ib_flex ib_align-center">
                
                    <div class="ib_view-invoice__products">
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
                                <tr>
                                    <td>Design</td>
                                    <td>5</td>
                                    <td>300.00</td>
                                    <td>1500</td>
                                </tr>
                                <tr>
                                    <td>Design</td>
                                    <td>5</td>
                                    <td>300.00</td>
                                    <td>1500</td>
                                </tr>
                            </tbody>

                            <tfoot>                            
                                <tr>
                                    <td colSpan="2">Amount Due</td>
                                    <td colSpan="2">1200</td>
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
