// Main Component

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 

// Pages
import Home from './home';
import ViewInvoice from './view-invoice';
import CreateInvoice from './create-invoice';

const AppInvoice = () => {
    return (        
        <React.Fragment>
            <Router> 
                
                <Switch>       
                    <Route exact path="/" render={(props) => <Home {...props} />} />   
                    <Route exact path="/invoice/:invoiceId" render={(props) => <ViewInvoice {...props} />} />  
                    <Route exact path="/create-invoice" render={(props) => <CreateInvoice {...props} />} />  
                </Switch>

            </Router>
        </React.Fragment>
    )
}

export default AppInvoice;
