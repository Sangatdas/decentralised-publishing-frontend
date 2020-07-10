import React from 'react';
import { Link } from 'react-router-dom';

import { Typography, Card, CardContent, Divider, TextField, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    minWidth: 275,
    margin: '5%',
    padding: '8px'
  },
  title: {
    fontSize: '100%',
  },
  name: {
    margin: '20px 25px 25px 0',
    width: '47.6%'
  },
  field: {
    margin: '0 0 25px 0',
  }
});

class Register extends React.Component {
  
  render() {
    
    const { classes } = this.props;

    return(
      <div>
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                    Register
                </Typography>
                <Divider />
                <Typography variant="body2" component="p">
                    <TextField id="firstname" className={classes.name} label="First Name" placeholder="Enter first name"
                        helperText="Example: John" variant="outlined"
                    />
                    <TextField id="lastname" className={classes.name} label="Last Name" placeholder="Enter last name"
                        helperText="Example: Doe" variant="outlined"
                    />
                    <TextField id="email" className={classes.field} label="Email" placeholder="Enter email"
                        helperText="Example: john.doe@xyz.com" fullWidth variant="outlined"
                    />
                    <TextField id="password" className={classes.field} label="Password" type="password" placeholder="Enter password"
                        helperText="Should be minimum 8 characters." fullWidth variant="outlined"
                    />
                    <TextField id="rpassword" className={classes.field} label="Repeat Password" type="password" placeholder="Enter password again"
                        helperText="Should match your password." fullWidth variant="outlined"
                    />
                    <Button variant="contained" className={classes.field} color="primary">
                        Register
                    </Button>
                    <div className={classes.field}><Link to="/">Already a user? Login here</Link></div>
                </Typography>
            </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Register);
