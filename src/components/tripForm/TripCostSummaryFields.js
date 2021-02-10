import React, {useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { useFormikContext } from 'formik';
import { connect } from 'react-redux';
import {setTripLength, setTripCost} from '../../store/actions/tripSummary';



function TripCostSummary({setTripLength, setTripCost, className}) {
    
    
    const { values } = useFormikContext();

    const {dates: {start}, dates: {end}} = values;
    const {housing, 
           meals, 
           transportation, 
           extraExpenses} = values;
    const {cost: transCost} = transportation;
    const {cost: extraCost} = extraExpenses;
    const {cost: hCost} = housing;
    const {cost: mCost} = meals;
  

    const tripLength = getLength(start, end);
    const tripCost = getCost(transCost, 
                             extraCost,
                             hCost,
                             mCost,
                             tripLength)
    useEffect(()=> {
        setTripLength(tripLength)
        setTripCost(tripCost)
    })


    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
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
        </div>
    )
}

function getLength (start, end) {
    if((start) && (end)) {
        const from = new Date(start);
        const to = new Date(end);
        return parseInt((to - from) / (24 * 3600 * 1000));
    }
    return 0
}

function getCost(transCost, extraCost, hCost, mCost, tLength) {
    
    const tCost = transCost.reduce((acc, num) => acc + +num, 0);
    const eCost = extraCost.reduce((acc, num) => acc + +num, 0);

    return (hCost*tLength) + (mCost*tLength) + tCost + eCost;
}

const mapDispatchToProps = {
    setTripLength,
    setTripCost
}

export default connect(null, mapDispatchToProps)(TripCostSummary)
