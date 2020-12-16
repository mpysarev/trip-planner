import React from 'react';
import TextField from '@material-ui/core/TextField';
import {Field} from 'formik'


function FormikField({name, label, type, helperText, className}) {
    // console.log(className);
    return (
        <div style={{display: "inline-block"}}>
            <Field 
                as={TextField}
                variant="outlined"
                label={label}
                name={name}
                type={type || null}
                helperText={helperText || null}
                className={className}
            />
        </div>
    )
}

export default FormikField
