import React from 'react';

import { Typography, Divider, List } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

import PaperListElement from './paperListElement.component';

import axios from 'axios';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    minWidth: 275,
    margin: '5%',
    padding: '8px'
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
});

class Papers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      papers: [],
      configHeaders: {
        headers: {
          authorization: "Bearer " + localStorage.getItem("dp_user")
        }
      }
    }
  }

  componentDidMount() {
    axios
    .get("http://localhost:5000/paper/", this.state.configHeaders)
    .then(res => {
      if (res.data.length > 0) {
        this.setState({
          papers: res.data
        });  
      } else {
        this.setState({
          papers: []
        });
      }
    })
    .catch(err => {
        this.setState({
          papers: []
        });
    });
  }

  showPapers(classes) {
    var paperList = [];
    if (this.state.papers.length > 0) {
      for (var paper of this.state.papers) {
        var paperListElement = <PaperListElement paper={paper}/>
        paperList.push(paperListElement);
      }
      return (
        <div className={classes.list}>
          <List dense={true}>
            {paperList}
          </List>
        </div>
      );
    } else {
        return(
          <div style={{marginTop: '10px'}}>
            <Typography variant="h6">
              No Papers found.
            </Typography>
          </div>
        );
    }
  }
  
  render() {
    
    const { classes } = this.props;

    return(
      <div className={classes.root}>
        <Typography variant="h5" color="textSecondary" gutterBottom>
            My Papers (<Link to="/submitPaper">Add a new paper</Link>)
        </Typography>
        <Divider />
        {this.showPapers(classes)}
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Papers);
