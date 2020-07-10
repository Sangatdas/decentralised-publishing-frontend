import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Container } from '@material-ui/core'

import Login from './components/login.component';
import Register from './components/register.component';
import Papers from './components/papers.component';
import Review from './components/review.component';
import Profile from './components/profile.component';
import AddPaper from './components/add.paper.component';

class App extends React.Component {
  
  render() {
    return(
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6"><b>Decentralised Publisher</b></Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Route path="/" exact component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/register" component={Register} />
          <Route path="/papers" component={Papers} />
          <Route path="/submitPaper" component={AddPaper} />
          <Route path="/review/:id" component={Review} />
        </Container>
      </Router>
    );
  }
}

export default App;
