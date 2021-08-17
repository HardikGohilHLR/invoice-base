// Create Invoice
import React, { useState, useEffect, useRef } from 'react';

import { dateTimeFormat } from '../../common/functions';
import { useForceUpdate } from '../../common/hooks/useForceUpdate';

import db from '../../firebase/firebaseInit';

// Packages
import moment from 'moment';
import Validator from 'simple-react-validator';

// Components
import InputField from '../../components/input-field';
import { useHistory } from 'react-router-dom';

const CreateInvoice = () => {
    const history = useHistory();
    const forceUpdate = useForceUpdate(); 
    const validator = useRef(new Validator({ element: message => <>{message}</>, autoForceUpdate: {forceUpdate} })); 

    const [fieldValues, setFieldValues] = useState({
        streetAddress: '',
        city: '',
        zip: '',
        country: '',
        clientName: '',
        clientEmail: '',
        clientStreetAddress: '',
        clientCity: '',
        clientZip: '',
        clientCountry: '',
        invoiceDate: new Date(),
        paymentDue: new Date(moment(this?.invoiceDate).add(30, 'days')),
        paymentTerms: 30,
        productDesc: '',
        products: [
            { name: '', qty: null, price: null, total: 0 },
            { name: '', qty: null, price: null, total: 0 },
            { name: '', qty: null, price: null, total: 0 },
        ]
    });
    const [allValues, setAllValues] = useState({
        draftInvoiceLoading: false,
        createInvoiceLoading: false,
    });

    const handle = {
        change: (e) => {
            setFieldValues({...fieldValues, [e.target.name]: e?.target?.value});
        },
        paymentTermsSelect: (e) => {
            let paymentDueDate = new Date(moment(fieldValues?.invoiceDate).add(parseInt(e?.target?.value), 'days').format()); 
            setFieldValues({...fieldValues, paymentDue: paymentDueDate, paymentTerms: e?.target?.value});
        },
        addNewProduct: () => {
            let data = [...fieldValues?.products];
            data.push({ name: '', qty: null, price: null, total: 0 });
            setFieldValues({...fieldValues, products: data});
        },
        deleteProduct: (index) => { 
            validator?.current?.purgeFields();
            let products = [...fieldValues?.products];
            products.splice(index, 1); 
            setFieldValues({...fieldValues, products: products});
        },
        changeProduct: (e, index) => {
            let products = [...fieldValues?.products];            
            products[index][e.target.name] = e.target.value;
            if(e.target.name === 'price' || e.target.name === 'qty') { 
                products[index]['total'] = parseInt((products[index]['price'] * products[index]['qty']).toFixed(2));
            }
            setFieldValues({...fieldValues, products: products});
        }
    }

    const getSubTotal = () => {
        let products = [...fieldValues?.products];    
        let subTotal = 0;
        products?.forEach(product => {   
            subTotal = parseInt(subTotal) + parseInt(product.total);
        });
        return subTotal;
    }

    const createInvoie = () => {
        if (validator?.current?.allValid()) { 
            setAllValues({...allValues, createInvoiceLoading: true});
            console.log({...fieldValues});
            db.collection('invoices').add({
                ...fieldValues,
                invoiceStatus: 2,
                invoiceId: Math.floor(Math.random()*16777215).toString(16),
                invoiceTotal: getSubTotal()
            }).then(() => {  
                setAllValues({...allValues, createInvoiceLoading: false});
                validator?.current?.hideMessages(); 
            }).catch(e => { console.log(e); setAllValues({...allValues, createInvoiceLoading: false}); })
        } else {
            console.log(validator?.current?.errorMessages);
            console.log(validator?.current);
            validator?.current?.showMessages();  
        }
    }

    const saveDraft = () => {
        setAllValues({...allValues, createInvoiceLoading: false});
    }

    return (
        <React.Fragment>
            
            <div className="ib_container"> 

                <div className="ib_header">

                    <div className="ib_header-title">
                        <h1>New Invoice</h1> 
                    </div>

                </div>
                
                <div className="ib_view-invoice__goback">
                    <span className="ib_flex ib_align-center" onClick={() => history.goBack()}>
                        <i className="far fa-chevron-left"></i>
                        Go back
                    </span>
                </div>

                <div className="ib_create-invoice">

                    <div className="ib_content-form">
                        <div className="ib_input-group__header">
                            <p>Bill From</p> 
                        </div>
                        
                        <div className="ib_row">
                            <div className="ib_col-12">
                                <InputField label="Street Address" hasError={validator?.current?.message('streetAddress', fieldValues?.streetAddress, 'required')}> 
                                    <textarea name="streetAddress" value={fieldValues?.streetAddress} onChange={handle.change}/>                  
                                </InputField> 
                            </div>
                        </div>

                        <div className="ib_row">
                            <div className="ib_col-4">
                                <InputField label="city" hasError={validator?.current?.message('city', fieldValues?.city, 'required')}>
                                    <input type="text" name="city" value={fieldValues?.city} onChange={handle.change}/>                            
                                </InputField> 
                            </div>                                
                            <div className="ib_col-4">
                                <InputField label="Zip Code" hasError={validator?.current?.message('zipCode', fieldValues?.zip, 'numeric|min:0,num|required')}>
                                    <input type="text" name="zip" value={fieldValues?.zip} onChange={handle.change}/>                                    
                                </InputField>
                            </div>                                
                            <div className="ib_col-4">
                                <InputField label="Country"> 
                                    <input type="text" name="country" value={fieldValues?.country} onChange={handle.change}/>                                 
                                </InputField>                                
                            </div>
                        </div>
                    </div>
                
                    <div className="ib_content-form">
                        <div className="ib_input-group__header">
                            <p>Bill To</p> 
                        </div>

                        <div className="ib_row">
                            <div className="ib_col-4">
                                <InputField label="Name" hasError={validator?.current?.message('name', fieldValues?.clientName, 'required')}> 
                                    <input type="text" name="clientName" value={fieldValues?.clientName} onChange={handle.change}/>    
                                </InputField> 
                            </div>     

                            <div className="ib_col-4">
                                <InputField label="Email" hasError={validator?.current?.message('email', fieldValues?.clientEmail, 'email|required')}>
                                    <input type="email" name="clientEmail" value={fieldValues?.clientEmail} onChange={handle.change}/>                                
                                </InputField>
                            </div>  

                            <div className="ib_col-4">
                                <InputField label="Invoice Date">
                                    <input type="text" disabled value={dateTimeFormat(fieldValues?.invoiceDate, 'MMM DD, YYYY')}/>                             
                                </InputField> 
                            </div>     
                             
                            <div className="ib_col-12">
                                <InputField label="Street Address" hasError={validator?.current?.message('clientStreetAddress', fieldValues?.clientStreetAddress, 'required')}>                                 
                                    <textarea name="clientStreetAddress" value={fieldValues?.clientStreetAddress} onChange={handle.change}/>        
                                </InputField> 
                            </div>  
 
                            <div className="ib_col-4">
                                <InputField label="City" hasError={validator?.current?.message('clientCity', fieldValues?.clientCity, 'required')}> 
                                    <input type="text" name="clientCity" value={fieldValues?.clientCity} onChange={handle.change}/>      
                                </InputField> 
                            </div> 

                            <div className="ib_col-4">
                                <InputField label="Zip Code" hasError={validator?.current?.message('clientZip', fieldValues?.clientZip, 'numeric|min:0,num|required')}> 
                                    <input type="text" name="clientZip" value={fieldValues?.clientZip} onChange={handle.change}/>       
                                </InputField>
                            </div>  

                            <div className="ib_col-4">
                                <InputField label="Country"> 
                                    <input type="text" name="clientCountry" value={fieldValues?.clientCountry} onChange={handle.change}/> 
                                </InputField>                                
                            </div>
                        </div>
                    </div>
                
                    <div className="ib_content-form">

                        <div className="ib_row">

                            <div className="ib_col-6">
                                <InputField label="Payment Due">   
                                    <input type="text" disabled name="paymentDue" value={fieldValues?.paymentDue ? dateTimeFormat(fieldValues?.paymentDue, 'MMM DD, YYYY') : ''} onChange={handle.change}/>                          
                                </InputField>
                            </div>  

                            <div className="ib_col-6">
                                <InputField label="Payment Terms">
                                    <select value={fieldValues?.paymentTerms} onChange={handle.paymentTermsSelect}>  
                                        <option value="30">Next 30 days</option>    
                                        <option value="60">Next 60 days</option>    
                                    </select>                           
                                </InputField>
                            </div>  
                             
                            <div className="ib_col-12">
                                <InputField label="Product Description">   
                                    <input type="text" name="productDesc" value={fieldValues?.productDesc} onChange={handle.change}/>                        
                                </InputField>
                            </div>  

                        </div>

                    </div>

                    <div className="ib_content-form">
                        <div className="ib_input-group__header">
                            <p>Product List</p> 
                        </div>

                        {
                            fieldValues?.products?.length ? <>
                            <div className="ib_row ib_align-center ib_mb-10">
                                <label className="ib_col-6">Item Name</label>     
                                <label className="ib_col-1">Qty</label>   
                                <label className="ib_col-2">Price</label>
                                <label className="ib_col-2">Total</label>  
                                <label className="ib_col-1">Action</label>     
                            </div>  
                            {
                                fieldValues?.products?.map((product, index) => {
                                    return (
                                        <div className="ib_row ib_mb-10">
                                            <div className="ib_col-6"> 
                                                <InputField className="ib_mb-0" hasError={validator?.current?.message(`productName_${index}`, product?.name, 'required')}>
                                                    <input type="text" value={product?.name} name="name" onChange={(e) => handle.changeProduct(e, index)} /> 
                                                </InputField>
                                            </div>     
                                            <div className="ib_col-1"> 
                                                <InputField className="ib_mb-0" hasError={validator?.current?.message(`qty_${index}`, product?.name, 'required')}>
                                                    <input type="text" value={product?.qty} name="qty" onChange={(e) => handle.changeProduct(e, index)} />  
                                                </InputField> 
                                            </div>   
                                            <div className="ib_col-2"> 
                                                <InputField className="ib_mb-0" hasError={validator?.current?.message(`price_${index}`, product?.name, 'required')}>
                                                    <input type="text" value={product?.price} name="price" onChange={(e) => handle.changeProduct(e, index)} />    
                                                </InputField> 
                                            </div>
                                            <div className="ib_col-2"> 
                                                <InputField className="ib_mb-0">
                                                    <input type="text" value={product?.total} name="total" disabled /> 
                                                </InputField> 
                                            </div>  
                                            <div className="ib_col-1">  
                                                <span className="ib_add-product__delete" onClick={() => handle.deleteProduct(index)}><i className="far fa-trash-alt"></i></span>
                                            </div>     
                                        </div>
                                    )
                                })
                            } 
                            
                        </> : ''
                        }
 

                        <div className="ib_row ib_content-center ib_mt-20">
                            <div className="ib_col-9">
                                <button className="ib_btn ib_btn-blue" onClick={handle.addNewProduct}>
                                    <span className="ib_mr-10 ib_flex"><i className="fal fa-plus"></i></span>   
                                    Add New Product
                                </button> 
                            </div>                               
                            <div className="ib_col-3">
                            { 
                                fieldValues?.products?.length !== 0 && getSubTotal() !== 0 && <p>Sub Total: <strong>{getSubTotal()}</strong></p>
                            }
                            </div> 
                        </div>

                    </div>

                    <div className="ib_content-btns ib_flex ib_content-end ib_mt-15 ib_mb-20">  
                        <button className={`ib_btn ib_btn-white ib_mr-15 ${allValues?.draftInvoiceLoading ? 'ib_btn-loading' : ''}`} onClick={saveDraft}>
                            <span className="ib_btn-loader"><img src="/images/spinner.svg" /></span>
                            Save Draft
                        </button>
                        <button className={`ib_btn ib_btn-blue ${allValues?.createInvoiceLoading ? 'ib_btn-loading' : ''}`} onClick={createInvoie}>
                            <span className="ib_btn-loader"><img src="/images/spinner.svg" /></span>
                            Create Invoice
                        </button> 
                    </div>

                </div>

            </div>
            
        </React.Fragment>
    )
}

export default CreateInvoice;
