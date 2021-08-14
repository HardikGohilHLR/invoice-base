// Form
import React from 'react';

const InputField = (props) => {
    return (
        <React.Fragment>
            
            <div className={`ib_input ${props?.className}`}>
                {
                    props?.label &&
                    <label>{props?.label}</label>
                }
                
                {
                    props?.children
                }

            </div>
        </React.Fragment>
    )
}

export default InputField;
