import React from 'react';
// import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import makeStyles from '@material-ui/core/styles/makeStyles';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import TripsList from './tripsList/TripsList'

const drawerHeight = 150;
const useStyles = makeStyles((theme) => ({
    toolbarIcon: {
        display: 'inline-block',
        // flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'flex-end',
        padding: '0 8px'
    },
    drawerPaper: {
        position: 'relative',
        height: drawerHeight,
        backgroundColor: 'white',
        zIndex: 100,
        transition: theme.transitions.create('height', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    drawerPaperClose: {
        overflowY: 'hidden',
        height: 0,
        transition: theme.transitions.create('height', {
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
            {/* <div className={classes.toolbarIcon}>
                <IconButton onClick={toggleSidebar}>
                    <ArrowUpwardIcon />
                </IconButton>
            </div> */}
            <div styles={{overflow: 'auto'}}>
                <TripsList />
            </div>
        </Drawer>
    )
}

export default Sidebar
