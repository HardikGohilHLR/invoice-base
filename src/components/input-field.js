// Form
import React from 'react';

const InputField = (props) => {
    return (
        <React.Fragment>
            
            <div className="ib_input">
                <label>{props?.label}</label>
                
                {
                    props?.children
                }

            </div>
        </React.Fragment>
    )
}

export default InputField;
