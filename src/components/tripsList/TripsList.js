import React from 'react'
import List from '@material-ui/core/List';
import { connect } from 'react-redux'
import TripsListItem from './TripsListItem'

function TripsList({trips, tripsForm}) {
    // console.log(trips, tripsForm)
    return (
        <List>
            {trips.list.map((trip) => 
                <TripsListItem 
                    trip={trip}
                    key={trip.id}
                />) 
            }
        </List>
    )
}

function mapStateToProps ({trips, tripsForm}) {
    return {trips, tripsForm}
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TripsList)
