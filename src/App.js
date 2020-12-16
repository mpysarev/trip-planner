import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/Header';
import TripForm from './components/tripForm/TripForm';
import Sidebar from './components/Sidebar';
import makeStyles from '@material-ui/core/styles/makeStyles';

import {BrowserRouter as Router,
        Redirect,
        Route,
        Switch
} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  bg: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      zIndex: 10
  }
}))

function App() {

  const [sidebarOpened, setSidebarOpened] = useState(false);
  const classes = useStyles();

  const toggleSidebar = () => setSidebarOpened(!sidebarOpened);


  return (
    <Router>
      <CssBaseline />
      <div>
        <Header 
          sidebarOpened={sidebarOpened} 
          toggleSidebar={toggleSidebar}        
        />

        <Sidebar
          sidebarOpened={sidebarOpened} 
          toggleSidebar={toggleSidebar}
        />

        <div 
          onClick={toggleSidebar}
          className={sidebarOpened ? classes.bg : null}
        ></div>

        <main>
          <Switch>
            <Route path="/form/:id" component={TripForm} />
            <Route path="*">
              <Redirect to="/form/new" />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App
