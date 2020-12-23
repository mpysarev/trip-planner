import React from 'react'
import {FieldArray} from 'formik'
import FormikField from './FormikField'
import DeleteIcon from '@material-ui/icons/HighlightOffOutlined';
import AddIcon from '@material-ui/icons/AddCircleOutlineOutlined';


function TransportTypeField({name, label}) {
    
    return (
        <div>
            <FieldArray 
                name={name}
                label={label}
            >
                {(props) => {
                        const {push, remove, form: {values}} = props;
                        const {transportation} = values;

                        // console.log(transportation);

                        return (
                            
                            <div>
                                {transportation.type.map((transport, index) => (
                                    <div key={index}>
                                        <FormikField name={`${name}[${index}]`} label={label}/>
                                        
                                        <AddIcon type="button" onClick={() => push('')} />
                                        {index > 0 && name === 'transportation.type' 
                                            ? <DeleteIcon type="button" onClick={() => remove(index)} /> 
                                            : null
                                        }
                                        
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

export default TransportTypeField
