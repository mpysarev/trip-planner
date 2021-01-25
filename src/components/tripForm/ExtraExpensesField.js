import React from 'react'
import {FieldArray} from 'formik'
import FormikField from './FormikField'
import DeleteIcon from '@material-ui/icons/HighlightOffOutlined';
import AddIcon from '@material-ui/icons/AddCircleOutlineOutlined';


function ExtraExpensesField({name, label, className}) {
    
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
                                {extraExpenses.type.map((transport, index) => (
                                    <div key={index}>
                                        <FormikField name={`${name}[${index}]`} label={label} className={className}/>
                                        
                                        <AddIcon type="button" onClick={() => push('')} />
                                        {index > 0 && name === 'extraExpenses.type' ? <DeleteIcon type="button" onClick={() => remove(index)} /> : null}
                                        
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

export default ExtraExpensesField

