import React from 'react'
import List from '@material-ui/core/List';
import { connect } from 'react-redux'
import TripsListItem from './TripsListItem'
import Loader from '../loader/Loader'

function TripsList({list}) {
    console.log(list)
    return (
        <List>
            {list.length > 0 ? list.map((trip) => 
                <TripsListItem 
                    trip={trip}
                    key={trip.id}
                />) : <Loader />
            }
        </List>
    )
}

function mapStateToProps ({trips: {list}}) {
    return { list }
}


export default connect(mapStateToProps)(TripsList)
