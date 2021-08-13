// Home page - Header
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Header = () => {

    const history = useHistory();

    const [filterOptions, setFilterOptions] = useState([
        { value: 'draft', label: 'Draft' },
        { value: 'pending', label: 'Pending' },
        { value: 'paid', label: 'Paid' },
        { value: 'clear', label: 'Clear Filter' },
    ]);

    const [allValues, setAllValues] = useState({
        totalInvoices: 0,
        activeFitler: { value: 'draft', label: 'Draft' },
        isFilterMenuActive: false
    });

    const handle = {
        getFiletersMenu: () => {
            setAllValues({...allValues, isFilterMenuActive: !allValues?.isFilterMenuActive});
        },
        selectFilter: (filter) => {
            if(filter?.value === 'clear') {
                handle.clearFilter();
            } else {
                setAllValues({...allValues, activeFitler: filter, isFilterMenuActive: false});
            }
        },
        clearFilter: () => {
            setAllValues({...allValues, activeFitler: '', isFilterMenuActive: false});
        },
        createInvoice: () => {
            history.push('/create-invoice');
        }
    }

    return (
        <React.Fragment>
            <div className="ib_header">

                <div className="ib_header-title">
                    <h1>Invoices</h1>
                    <span>There are {allValues?.totalInvoices} total invoices</span>
                </div>

                <div className="ib_header-filters">
                    {
                        allValues?.activeFitler &&
                        <div className="ib_header-filters__current">
                            <span> {allValues?.activeFitler?.label} <i className="fal fa-times" onClick={handle.clearFilter}></i></span>
                        </div>
                    }
                    <div className="ib_header-filters__dropdown">
                        <span onClick={handle.getFiletersMenu}>Filter by status <i className="fas fa-chevron-down"></i></span> 
                        <ul className={`ib_header-filters__menu ${allValues?.isFilterMenuActive ? 'active' : ''}`}>
                            {
                                filterOptions?.map(filter => {
                                    return (
                                        <li onClick={() => handle.selectFilter(filter)} key={filter.label}>{filter.label}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                    <button className="ib_header-add-invoice" onClick={handle.createInvoice}>
                        <span><i className="fal fa-plus"></i></span>   
                        New Invoice
                    </button>

                </div>
            </div>
        </React.Fragment>
    )
}

export default Header;
