import React from 'react'
import TextField from '@material-ui/core/TextField';
import { useFormikContext } from 'formik';
import { connect } from 'react-redux';
import {setTripLength, setTripCost} from '../../store/actions/tripsForm'



function FormikTextField({setTripLength, setTripCost, className}) {
    
    
    const {
        values,
        // handleChange,
        // handleBlur,
        // touched,
        // errors
    } = useFormikContext();

    const {dates: {start}, dates: {end}} = values;
    const {housing, 
           meals, 
           transportation, 
           extraExpenses} = values;

    // console.log(transportation, extraExpenses);

    const tripLength = getLength();
    const tripCost = getCost()

    

    function getLength () {
        if((start) && (end)) {
            const from = new Date(start);
            const to = new Date(end);
            return parseInt((to - from) / (24 * 3600 * 1000));
        }
        return 0
    }

    function getCost() {
        
        const tCost = transportation.cost.reduce((acc, num) => acc + +num, 0);
        const eCost = extraExpenses.cost.reduce((acc, num) => acc + +num, 0);

        // console.log(tCost, eCost);


        return (housing.cost*tripLength) + (meals.cost*tripLength) + tCost + eCost;
    }

    // setTripLength(tripLength)
    // setTripCost(tripCost)


    return (
        <>
        <TextField
            variant="outlined"
            value={tripLength}
            label="Trip length / Days"
            className={className}
        />
        <TextField
            variant="outlined" 
            value={tripCost}
            label="Total cost / $"
            className={className}
        />
        </>
    )
}

const mapDispatchToProps = {
    setTripLength,
    setTripCost
}

export default connect(null, mapDispatchToProps)(FormikTextField)
