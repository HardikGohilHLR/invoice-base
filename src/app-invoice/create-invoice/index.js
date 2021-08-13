// Create Invoice
import React from 'react';
import InputField from '../../components/input-field';

const CreateInvoice = () => {
    return (
        <React.Fragment>
            
            <div className="ib_container"> 
                <div className="ib_header">

                    <div className="ib_header-title">
                        <h1>New Invoice</h1> 
                    </div>

                </div>

                <div className="ib_create-invoice">

                    <div className="ib_content-form">
                        <div className="ib_input-group__header">
                            <p>Bill From</p> 
                        </div>
                        
                        <div className="ib_row">
                            <div className="ib_col-12">
                                <InputField label="Street Address">
                                    <textarea></textarea>                            
                                </InputField> 
                            </div>
                        </div>

                        <div className="ib_row">
                            <div className="ib_col-4">
                                <InputField label="city">
                                    <input type="text" />                             
                                </InputField> 
                            </div>                                
                            <div className="ib_col-4">
                                <InputField label="Zip Code">
                                    <input type="text" />                             
                                </InputField>
                            </div>                                
                            <div className="ib_col-4">
                                <InputField label="Country">
                                    <input type="text" />                             
                                </InputField>                                
                            </div>
                        </div>


                    </div>
                
                    <div className="ib_content-form">
                        <div className="ib_input-group__header">
                            <p>Bill To</p> 
                        </div>

                        <div className="ib_row">
                            <div className="ib_col-6">
                                <InputField label="Name">
                                    <input type="text" />                             
                                </InputField> 
                            </div>     

                            <div className="ib_col-6">
                                <InputField label="Email">
                                    <input type="text" />                             
                                </InputField>
                            </div>  
                             
                            <div className="ib_col-12">
                                <InputField label="Street Address">
                                    <textarea></textarea>                            
                                </InputField> 
                            </div>  
 
                            <div className="ib_col-4">
                                <InputField label="city">
                                    <input type="text" />                             
                                </InputField> 
                            </div> 

                            <div className="ib_col-4">
                                <InputField label="Zip Code">
                                    <input type="text" />                             
                                </InputField>
                            </div>  

                            <div className="ib_col-4">
                                <InputField label="Country">
                                    <input type="text" />                             
                                </InputField>                                
                            </div>
                        </div>
                    </div>
                
                    <div className="ib_content-form">

                        <div className="ib_row">
                            <div className="ib_col-6">
                                <InputField label="Invoice Date">
                                    <input type="text" />                             
                                </InputField> 
                            </div>     

                            <div className="ib_col-6">
                                <InputField label="Payment Due">
                                    <input type="text" />                             
                                </InputField>
                            </div>  

                            <div className="ib_col-12">
                                <InputField label="Payment Terms">
                                    <select>
                                        <option>Next 30 days</option>    
                                        <option>Next 60 days</option>    
                                    </select>                           
                                </InputField>
                            </div>  
                             
                            <div className="ib_col-12">
                                <InputField label="Product Description">
                                    <input type="text" />                             
                                </InputField>
                            </div>  

                        </div>

                    </div>

                    <div className="ib_content-btns ib_flex">
                        <div>
                            <button className="ib_btn ib_btn-red">Cancel</button>
                        </div>
                        <div className="ib_flex">
                            <button className="ib_btn ib_btn-white">Save Draft</button>
                            <button className="ib_btn ib_btn-blue">Create Invoice</button>
                        </div>
                    </div>


                </div>

            </div>
            
        </React.Fragment>
    )
}

export default CreateInvoice;
