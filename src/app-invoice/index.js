// Main Component

import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; 

// Pages
import Home from './home';
import ViewInvoice from './view-invoice';
import CreateInvoice from './create-invoice';

const AppInvoice = () => {
    return (        
        <React.Fragment>


            <Router> 
                {/* Header */}
                <div className="ib_main-header">
                    <div className="ib_main-container">
                        <Link className="ib_main-header-logo" to="/">
                            <img src="/images/invoice-base.svg" alt="Invoice Base" title="Invoice Base"/>
                        </Link>  
                    </div>  
                </div>  
                
                {/* Routes */}
                <Switch>       
                    <Route exact path="/" render={(props) => <Home {...props} />} />   
                    <Route exact path="/invoice/:invoiceId" render={(props) => <ViewInvoice {...props} />} />  
                    <Route exact path="/create-invoice" render={(props) => <CreateInvoice {...props} />} />  
                    <Route exact path="/edit-invoice/:invoiceId" render={(props) => <CreateInvoice {...props} />} />  
                </Switch>

            </Router>
        </React.Fragment>
    )
}

export default AppInvoice;
