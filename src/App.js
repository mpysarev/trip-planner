import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/header/Header';
import TripForm from './components/tripForm/TripForm';
import makeStyles from '@material-ui/core/styles/makeStyles';

import {BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import TripsList from './components/tripsList/TripsList';
import Location from './components/location/Location'
import Auth from './components/auth/Auth';
import {fetchTripsList} from './store/actions/trips'
import {autoLogin} from './store/actions/auth'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: '#36669d',
    backgroundImage: `linear-gradient(315deg, #36669d 0%, #d3d3d3 74%)`
  },
}))

function App({fetchTripsList, autoLogin, userId}) {

  const classes = useStyles();

  useEffect(() => {
    fetchTripsList(userId)
  }, [userId, fetchTripsList])

  useEffect(() => {
    autoLogin()
  }, [autoLogin])

  return (
    <Router>
      <CssBaseline />
      <div className={classes.root}>
        <Header />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Switch>
            <Route path="/form/:id" component={TripForm} />
            <Route path="/trips" component={TripsList} />
            <Route path="/auth" component={Auth} />
            <Route path="/location" component={Location} />
            <Route path="*">
              <Redirect to="/auth" />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

function mapStateToProps({auth: {userId}}) {

  return {userId}
}

const mapDispatchToProps = {
  fetchTripsList,
  autoLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
