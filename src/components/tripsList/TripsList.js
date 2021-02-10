import React from 'react';
import List from '@material-ui/core/List';
import { connect } from 'react-redux';
import TripsListItem from './TripsListItem';
import Loader from '../loader/Loader';

function TripsList({list, isSignedIn}) {
    
    const newList = list.filter((item) => !item.userId);
    console.log('List', newList);
    
    return (
        <List>
            {isSignedIn && newList.length > 0 ? newList.map((trip) => 
                <TripsListItem 
                    trip={trip}
                    key={trip.id}
                />) : <Loader />}
        </List>
    )
}

function mapStateToProps ({trips: {list}, auth: {token}}) {
    return { list, isSignedIn: !!token }
}


export default connect(mapStateToProps)(TripsList)
