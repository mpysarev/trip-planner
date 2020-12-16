import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Field} from 'formik';

const MaterialUISelectField = ({
    label, 
    children, 
    value, 
    name, 
    onChange, 
    onBlur}) => {
    
    return (
        <FormControl style={{minWidth: 223}}>
            <InputLabel>{label}</InputLabel>
            <Select
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            >
                {children}
            </Select>
            <FormHelperText>Included/Not included</FormHelperText>
        </FormControl>

    )
}

function FormikSelect({label, options, name}) {
    return (
        <div>
            <Field 
                name={name}
                as={MaterialUISelectField}
                label={label}
            >
                {options.map(item => (
                    <MenuItem key={item.value} value={item.label}>
                        {item.label}
                    </MenuItem>
                ))}
            </Field>
        </div>
    )
}

export default FormikSelect
