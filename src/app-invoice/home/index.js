// Home page
import React from 'react';

// Components
import InvoiceOverview from './components/invoice-overview';
import Header from './components/header';

const Home = () => {

    return (
       <React.Fragment>

            <div className="ib_home ib_container"> 
                
                {/* Header */}
                <Header />

                <InvoiceOverview />
            
            </div>

       </React.Fragment>
    )
}

export default Home;
