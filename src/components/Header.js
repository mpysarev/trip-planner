import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import {Link} from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles'

const drawerHeight = 150;
const headerMinHeight = 70;
const useStyles = makeStyles((theme) => ({
    toolbar: {
        paddingRight: 24
    },
    appBar: {
        minHeight: headerMinHeight,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['height', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    appBarShift: {
        marginTop: drawerHeight,
        transition: theme.transitions.create(['height', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),

        // height: `calc(100% - ${drawerHeight}px)`,
    },
    title: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: 10
    },
    menuButtonHidden: {
        display: 'none'
    }
}))


function Header({sidebarOpened, toggleSidebar}) {

    const classes = useStyles();

    return (
        <AppBar
            position="absolute"
            classes={{
                root: `${classes.appBar} ${sidebarOpened ? classes.appBarShift : null}`
            }}
        >
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleSidebar}
                    className={classes.menuButton}
                >
                    {sidebarOpened ? <CloseIcon /> : <MenuIcon />}
                </IconButton>

                <Typography
                    className={classes.title}
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                >
                    My trips
                </Typography>
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

export default Header
