import React from 'react';

import { Typography, Divider, Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

class Papers extends React.Component {
  
  render() {
    
    const { classes } = this.props;

    return(
      <div className={classes.root}>
        <Typography variant="h5" color="textSecondary" gutterBottom>
            My Papers
        </Typography>
        <Divider />
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
              <Typography className={classes.heading}>Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
          </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Papers);
