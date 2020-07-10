import React from 'react';
import { Link } from 'react-router-dom';

import { Typography, Card, CardContent, Divider, TextField, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

import Swal from 'sweetalert2';

import axios from 'axios';

const styles = theme => ({
  root: {
    minWidth: 275,
    margin: '5%',
    padding: '8px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: '100%',
  },
  pos: {
    marginBottom: 12,
  },
  field: {
      margin: '25px 0 0 0',
  }
});

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
    
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  onHandleChange(e) {
    this.setState({
      [e.target.id] : e.target.value
    });
  }

  onLoginSubmit(e) {
    e.preventDefault();
    Swal.fire({
      title: 'Signing in...',
      preConfirm: () => {
        Swal.showLoading();
      },
    }).then(() => {
      axios
      .post("http://localhost:5000/user/login", this.state)
      .then(res => {
        console.log(res);
        Swal.fire({
          title: `Welcome, ${res.data.firstname}`,
          icon: 'success'
        });
      })
      .catch(err => console.log(err));
    });
  }
  
  render() {
    
    const { classes } = this.props;

    return(
      <div>
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                    Login
                </Typography>
                <Divider />
                <Typography variant="body2" component="p">
                    <TextField id="email" name="email" className={classes.field} label="Email" placeholder="Enter email"
                        helperText="Example: john.doe@xyz.com" fullWidth variant="outlined" onChange={this.onHandleChange}
                    />
                    <TextField id="password" name="password" className={classes.field} label="Password" type="password" placeholder="Enter password"
                        helperText="Should be minimum 8 characters." fullWidth variant="outlined" onChange={this.onHandleChange}
                    />
                    <Button variant="contained" className={classes.field} color="primary" onClick={this.onLoginSubmit}>
                        Sign in
                    </Button>
                    <div className={classes.field}><Link to="/register">Not a user? Register here</Link></div>
                </Typography>
            </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Login);
