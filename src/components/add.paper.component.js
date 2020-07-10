import React from 'react';

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

class AddPaper extends React.Component {
  
  render() {
    
    const { classes } = this.props;

    return(
      <div>
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                    Add Paper
                </Typography>
                <Divider />
                <Typography variant="body2" component="p">
                    <TextField id="title" className={classes.name} label="Title" placeholder="Enter title"
                        helperText="Example: any title" variant="outlined"
                    /><br />
                    <Typography variant="body2" component="p">
                        <Button variant="contained" component="label">
                            Select File
                            <input type="file" style={{ display: "none" }} />
                        </Button>
                        <p>
                            <Button variant="contained" className={classes.field} color="primary">
                                Upload
                            </Button>
                        </p>
                    </Typography>
                </Typography>
            </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(AddPaper);
