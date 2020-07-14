import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { Container } from '@material-ui/core';

import MenuBar from './components/menubar.component';
import Login from './components/login.component';
import Register from './components/register.component';
import Papers from './components/papers.component';
import Review from './components/review.component';
import Profile from './components/profile.component';
import AddPaper from './components/add.paper.component';
import Paper from './components/paper.component';


class App extends React.Component {
  
  render() {

    return(
      <Router>
        <MenuBar />
        <Container>
          <Route path="/" exact component={Login} />
          { localStorage.getItem("dp_user") !== null ? (<Route path="/profile" component={Profile} />) : (<Redirect to="/"/>) }
          { localStorage.getItem("dp_user") !== null ? (<Route path="/register" component={Register} />) : (<Redirect to="/"/>) }
          { localStorage.getItem("dp_user") !== null ? (<Route path="/papers" component={Papers} />) : (<Redirect to="/"/>) }
          { localStorage.getItem("dp_user") !== null ? (<Route path="/paper/:id" component={Paper} />) : (<Redirect to="/"/>) }
          { localStorage.getItem("dp_user") !== null ? (<Route path="/submitPaper" component={AddPaper} />) : (<Redirect to="/"/>) }
          { (localStorage.getItem("dp_user") !== null || localStorage.getItem("dp_user_type") !== "0") ? (<Route path="/review/:id" component={Review} />) : (<Redirect to="/"/>) }
        </Container>
      </Router>
    );
  }
}

export default App;
