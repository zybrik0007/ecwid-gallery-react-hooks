import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import './App.scss';
import './assets/icomoon/style.css'
import Gallery from './gallery/pages/gallery/gallery';
import PhotoInfo from './gallery/pages/photi-info/photo-info';


function App() {
    return (
          <Router>
            <div className={'header header_style'}>
              <div className={'header-wrapper header-wrapper_style'}>
                <h1 className={'header-name header-name_style'}>Gallery</h1>
              </div>
            </div>
              <Switch>
                  <Redirect exact from='/' to='/gallery'/>
                  <Route exact path='/gallery'><Gallery/></Route>
                  <Route exact path='/photo/:id'><PhotoInfo/></Route>
                  <Redirect from='*' to='/gallery'/>
              </Switch>
          </Router>
    )
}

export default App;
