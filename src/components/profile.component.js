import React from 'react';
import { Link } from 'react-router-dom';

import { Typography, Card, CardContent, Divider } from '@material-ui/core'
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

class Profile extends React.Component {
  
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
                    <Typography variant="p">
                        Name: Sangat Das
                    </Typography>
                    <Typography variant="p">
                        Email: sangatdas5@gmail.com
                    </Typography>
                    <Typography variant="p">
                        Account: Sangat Das
                    </Typography>
                    <Typography variant="p">
                        Number of submissions: 2<br />
                        <div className={classes.field}><Link to="/papers">View</Link></div>
                    </Typography>
                    <Typography variant="p">
                        Balance: 200 DPT 
                    </Typography>
                </Typography>
            </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Profile);
