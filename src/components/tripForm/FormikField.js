import React from 'react';
import TextField from '@material-ui/core/TextField';
import {Field} from 'formik';


function FormikField({name, 
                      label, 
                      type, 
                      helperText, 
                      className, 
                      fullWidth}) {


    return (
        <Field 
            as={TextField}
            fullWidth={fullWidth}
            variant="outlined"
            label={label}
            name={name}
            type={type}
            helperText={helperText}
            className={className}
        />
    )
}

export default FormikField
