import React from 'react';

import { Typography, Divider, List } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

import PaperListElement from './paperListElement.component';

import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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
      },
    }

    this.showPapers = this.showPapers.bind(this);
    this.showTitle = this.showTitle.bind(this);
    this.conditionalRender = this.conditionalRender.bind(this);

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
      Swal.fire({
        title: "Something went wrong.",
        text: "Cannot fetch papers.",
        icon: "error"
      });
      this.setState({
        papers: []
      });
    });
    axios
    .get('http://localhost:5000/user/', this.state.configHeaders)
    .then(res => {
      this.setState({
        userType: res.data.user.type
      });       
    })
    .catch(err => {
      Swal.fire({
        title: "Something went wrong.",
        text: "Cannot fetch user details. Page won't be loaded.",
        icon: "error"
      });
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

  showTitle() {
    if (this.state.userType > 0) {
      return(
        <Typography variant="h5" color="textSecondary" gutterBottom>
          Papers to be reviewed
        </Typography>
      );
    } else if (this.state.userType === 0) {
      return(
        <Typography variant="h5" color="textSecondary" gutterBottom>
          My Papers (<Link to="/submitPaper">Submit a new paper</Link>)
        </Typography>
      );
    } else {
      return;
    }
  }

  conditionalRender(classes) {
    if (localStorage.getItem("dp_user") == null) {
      window.location.href = '/';
    } else {
      return (
        <div>
          {this.showTitle()}
          <Divider />
          {this.showPapers(classes)}
        </div>
      )
    }
    
  }
  
  render() {
    
    const { classes } = this.props;

    return(
      <div className={classes.root}>
        {this.conditionalRender(classes)}
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Papers);
