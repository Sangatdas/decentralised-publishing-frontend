import React from 'react';

import { Typography, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import FolderIcon from '@material-ui/icons/Folder';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import { withStyles } from '@material-ui/core/styles';

import ReviewListElement from './reviewListElement.component';

import axios from 'axios';

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

class Paper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        title: '',
        reviews: [],
        location: props.match.params.id,
        author: '',
        owner: '',
        status: false,
        rating: 0,
        exists: false,
        configHeaders: {
            headers: {
            authorization: "Bearer " + localStorage.getItem("dp_user")
            }
        }
    }

    this.showReviews = this.showReviews.bind(this);
  }

  componentDidMount() {
    axios
    .get("http://localhost:5000/paper/details/" + this.state.location, this.state.configHeaders)
    .then(res => {
      if (res.data.paper) {
        var paper = res.data.paper;
        this.setState({
            title: paper.title,
            reviews: paper.reviews,
            location: paper.location,
            author: paper.author,
            owner: paper.owner,
            status: paper.status,
            rating: paper.rating,
            exists: true,
        });  
      } 
    })
    .catch(err => {
        console.log("Failed to retrieve paper");
    });
  }

  showReviews(classes) {
    var reviewsList = [];
    if (this.state.reviews.length > 0 && this.state.status) {
      for (var review of this.state.reviews) {
        var reviewListElement = <ReviewListElement review={review}/>
        reviewsList.push(reviewListElement);
      }
      return (
        <div className={classes.list}>
          <List dense={true}>
            {reviewsList}
          </List>
        </div>
      );
    } else {
        return(
          <div style={{marginTop: '10px'}}>
            <Typography variant="h6">
              Paper is in reviewing state.
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
            <a href={"http://localhost:8080/ipfs/" + this.state.location} target="_blank" rel="noopener noreferrer">{this.state.title}</a>
        </Typography>
        <Divider />
        <Typography>
            <List>
                <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Author"
                            secondary={this.state.author}
                        />
                </ListItem>
                <Divider/>
                <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Owner"
                            secondary={this.state.owner}
                        />
                </ListItem>
                <Divider/>
                <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Hash"
                            secondary={this.state.location}
                        />
                </ListItem>
                <Divider/>
                <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <AccessTimeIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="State"
                            secondary={this.state.status ? "Reviewed | Rating: " + this.state.rating : "In Reviewing"}
                        />
                </ListItem>
                <Divider/>
            </List>
            </Typography>
            <div style={{marginTop: "10px"}}>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                    Reviews
                </Typography>
            </div>
            <Divider/>
            {this.showReviews(classes)}
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Paper);
