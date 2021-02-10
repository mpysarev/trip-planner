import React from 'react';
import {FieldArray} from 'formik';
import FormikField from './FormikField';
import DeleteIcon from '@material-ui/icons/HighlightOffOutlined';
import AddIcon from '@material-ui/icons/AddCircleOutlineOutlined';


function ExtraExpensesCostField({name, label, className}) {
    
    return (
        <>
            <FieldArray 
                name={name}
                label={label}
            >
                {(props) => {
                        const {push, remove, form: {values}} = props;
                        const {extraExpenses} = values;

                        return (
                            <div>
                                {extraExpenses.cost.map((transport, index) => (
                                    <div key={index} style={{display: 'flex', justifyContent: 'flex-end'}}>
                                        {index > 0 && name === 'extraExpenses.cost' ? <DeleteIcon type="button" onClick={() => remove(index)} /> : null}
                                        <AddIcon type="button" onClick={() => push('')} />
                                        
                                        <FormikField name={`${name}[${index}]`} label={label} className={className}/>
                                        
                                    </div>
                                ))}
                            </div>
                        )
                    }
                }
            </FieldArray>
        </>
    )
}

export default ExtraExpensesCostField

