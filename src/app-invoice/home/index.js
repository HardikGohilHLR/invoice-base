// Home page
import React, { useState, useEffect } from 'react';

import db from "../../firebase/firebaseInit"; 

// Components
import InvoiceOverview from './components/invoice-overview';
import Header from './components/header';

const Home = () => {

    const [invoiceData, setInvoiceData] = useState([]);
    const [allValues, setAllValues] = useState({
        totalInvoices: 0
    });

    useEffect(() => {
        getInvoiceData();
    }, []);

    const getInvoiceData = async () => {        
        const response = db.collection('invoices');
        const data = await response.get();
        let allInvoices = [];
        data.forEach(doc => {
            allInvoices.push({...doc.data(), _id: doc?.id});
        }); 
        setInvoiceData(allInvoices);
        setAllValues({...allValues, totalInvoices: allInvoices?.length});
    }

    const filterInvoices = async (status) => {
        if(status?.value === 'clear') {
            getInvoiceData();
            return;
        }
        const response = db.collection('invoices');
        const data = await response.where('invoiceStatus', '==', status?.value).get();
        let allInvoices = [];
        data.forEach(doc => { 
            allInvoices.push({...doc.data(), _id: doc?.id}); 
        });
        setInvoiceData(allInvoices);
        setAllValues({...allValues, totalInvoices: allInvoices?.length});
    }


    return (
       <React.Fragment>

            <div className="ib_home ib_container"> 
                
                {/* Header */}
                <Header totalInvoices={allValues?.totalInvoices} filterInvoices={filterInvoices} />

                <InvoiceOverview invoiceData={invoiceData} />
            
            </div>

       </React.Fragment>
    )
}

export default Home;
