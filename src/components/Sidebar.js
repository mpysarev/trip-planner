import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


const drawerWidth = 250;
const useStyles = makeStyles((theme) => ({
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px'
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
        whiteSpace: 'nowrap',
        backgroundColor: 'white',
        zIndex: 100,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        width: 0,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    }
}))

function Sidebar({sidebarOpened, toggleSidebar}) {

    const classes = useStyles();

    return (
        <Drawer
            variant="permanent"
            open={sidebarOpened}
            classes={{
                paper: `${classes.drawerPaper} ${
                    !sidebarOpened ? classes.drawerPaperClose : null
                }`
            }}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={toggleSidebar}>
                    <ArrowBackIcon />
                </IconButton>
            </div>
            <List>
                <ListItem component={Link} to="/trips">
                    My trips
                </ListItem>
            </List>
        </Drawer>
    )
}

export default Sidebar
