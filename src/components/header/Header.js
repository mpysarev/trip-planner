import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Link, NavLink, withRouter, useHistory } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles'
import TripsIcon from '@material-ui/icons/FlightTakeoff';
import MapIcon from '@material-ui/icons/Room';
import SignIn from '@material-ui/icons/Fingerprint';
import { connect } from 'react-redux';
import SignOut from '@material-ui/icons/ExitToApp';
import { signOut } from '../../store/actions/auth'

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-around'
    },
}))


function Header({isSignedIn, signOut}) {

    const classes = useStyles();
    const history = useHistory()
    console.log('Signed in', isSignedIn);

    function onSignOutClick() {
        signOut();
        history.push('/auth')
    }

    return (
        <AppBar
            position="absolute"
        >
            <Toolbar className={classes.toolbar}>
                <Button color="inherit"
                    startIcon={<TripsIcon />}
                    component={NavLink}
                    to="/trips"
                >
                    My trips
                </Button>
                <Button
                    color="inherit"
                    startIcon={<MapIcon />}
                    component={NavLink}
                    to="/location"
                >
                    Location
                </Button>
                {isSignedIn 
                    ? <Button
                        color="inherit"
                        startIcon={<SignOut />}
                        onClick={onSignOutClick}
                      >Sign out</Button> 
                    : <Button
                        color="inherit"
                        startIcon={<SignIn />}
                        component={NavLink}
                        to="/auth"
                    >
                        Authorization
                    </Button>
                }
                
                <Button
                    color="inherit"
                    variant="outlined"
                    startIcon={<AddIcon />}
                    component={Link}
                    to="/form/new"
                >
                    New trip
                </Button>
            </Toolbar>
        </AppBar>
    )
}

function mapStateToProps({auth}) {

    return {
        isSignedIn: !!auth.token 
    }
}
const mapDispatchToProps = {
    signOut
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Header)
)
