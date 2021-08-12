// Main Component

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 

// Pages
import Home from './home';
import ViewInvoice from './view-invoice';

const AppInvoice = () => {
    return (        
        <React.Fragment>
            <Router> 
                
                <Switch>       
                    <Route exact path="/" render={(props) => <Home {...props} />} />   
                    <Route exact path="/invoice/1" render={(props) => <ViewInvoice {...props} />} />  
                </Switch>

            </Router>
        </React.Fragment>
    )
}

export default AppInvoice;
