import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import { NavLink} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TripIcon from '@material-ui/icons/Train';
import ListItemText from '@material-ui/core/ListItemText';
// import DeleteIcon from '@material-ui/icons/BackspaceOutlined';

const useStyles = makeStyles({
    root: {
      minWidth: 300,
      display: 'flex',
      justifyContent: 'space-evenly',
      marginRight: 10
    },
    itemText: {
      textAlign: 'center',
      width: 100
    }
  });

function TripsListItem({trip: {destination, dates, id, tripCost, tripLength}}) {

  

  const classes = useStyles();

  return (
      <ListItem button className={classes.root} component={NavLink} to={`/form/${id}`}>
        <TripIcon />
        <ListItemText primary={destination} className={classes.itemText}/>
        <ListItemText primary={dates.start} className={classes.itemText}/>
        <ListItemText primary={dates.end} className={classes.itemText}/>
        <ListItemText primary={`${tripLength} days`} className={classes.itemText}/>
        <ListItemText primary={`${tripCost}$`} className={classes.itemText}/>
      </ListItem>
  )
}

export default TripsListItem

