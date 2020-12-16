import React from 'react'
import {FieldArray} from 'formik'
import FormikField from './FormikField'
import DeleteIcon from '@material-ui/icons/HighlightOffOutlined';
import AddIcon from '@material-ui/icons/AddCircleOutlineOutlined';


function TransportCostField({name, label, className}) {
    
    return (
        <div>
            <FieldArray 
                name={name}
                label={label}
            >
                {(props) => {
                        const {push, remove, form: {values}} = props;
                        const {transportation} = values;

                        return (
                            
                            <div>
                                {transportation.cost.map((transport, index) => (
                                    <div key={index}>
                                        <FormikField name={`${name}[${index}]`} label={label} className={className}/>
                                        
                                        <AddIcon type="button" onClick={() => push('')} />
                                        {index > 0 && name === 'transportation.cost' ? <DeleteIcon type="button" onClick={() => remove(index)} /> : null}
                                        
                                    </div>
                                ))}
                            </div>
                        )
                    }
                }
            </FieldArray>
        </div>
    )
}

export default TransportCostField
