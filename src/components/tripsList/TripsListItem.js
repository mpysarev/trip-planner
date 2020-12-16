import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom'

function TripsListItem({trip: {destination, id}}) {
    return (
        <ListItem button component={Link} to={`/form/${id}`}>
            <ListItemText primary={destination} />
        </ListItem>
    )
}

export default TripsListItem
