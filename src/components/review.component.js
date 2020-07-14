import React from 'react';
import { Link } from 'react-router-dom';

import { Typography, Card, CardContent, Divider, Button, MenuItem, Select, TextareaAutosize, InputLabel, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

import Swal from 'sweetalert2';

import axios from 'axios';

const styles = theme => ({
  root: {
    minWidth: 275,
    margin: '5%',
    padding: '8px'
  },
  rating: {
    minWidth: 100,
  },
  title: {
    fontSize: '100%',
  },
  field: {
    margin: '0 0 25px 0',
  }
});

class Review extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          rating: 1,
          comments: '',
          title: '',
          location: '',
          password: ''
      }

      this.onInputChange = this.onInputChange.bind(this);
      this.onSubmitReview = this.onSubmitReview.bind(this);
      this.onChangeRating = this.onChangeRating.bind(this);
      this.conditionalRender = this.conditionalRender.bind(this);

    }

    componentDidMount() {
        let config = {
            headers: {
                authorization: "Bearer " + localStorage.getItem("dp_user")
            }
        }
        axios
            .get("http://localhost:5000/paper/details/" + this.props.match.params.id, config)
            .then(response => {
                this.setState({
                    title: response.data.paper.title,
                    location: response.data.paper.location
                });
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    title: "Something went wrong",
                    text: "Couldn't retrieve details for " + this.props.match.params.id + ". Please check if you're search for correct paper",
                    icon: "error"
                });
            });
    }

    onInputChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onChangeRating(e) {
        e.preventDefault();
        this.setState({
            rating: e.target.value
        });
    }

    onSubmitReview(e) {
        e.preventDefault(e);
        let data = {
            paper: this.props.match.params.id,
            rating: this.state.rating,
            review: this.state.comments,
            password: this.state.password,
        }
        axios
          .post('http://localhost:5000/review/', data,
            {
              headers: {
                'authorization': 'Bearer ' + localStorage.getItem('dp_user')
              }
            }
          )
          .then(response => {
            if(response.data.code === "success") {
              this.setState({
                rating: 1,
                comments: '' ,
                password: '',
              });
              Swal.fire({
                title: 'Upload Success',
                text: "Congrats! You've successfully added your review for paper",
                icon: 'success'
              });
            } else if (response.data.code === "failure") {
              Swal.fire({
                title: 'Uh oh!',
                text: response.data.msg,
                icon: 'error'
              });
            } else {
              Swal.fire({
                title: 'Damn!',
                text: 'Something went wrong',
                icon: 'error'
              });
            }
          })
          .catch(err => {
            console.log(err);
            Swal.fire({
              title: 'Fatal error!',
              text: 'Something went really wrong!',
              icon: 'error'
            });
          });
        }

    conditionalRender(classes) {
      if (localStorage.getItem("dp_user") == null || localStorage.getItem("dp_user_type") === "0") {
        window.location.href = '/'
      } else {
        return (
          <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography variant="h5" color="textSecondary" gutterBottom>
                        Add Review
                    </Typography>
                    <Divider />
                    <Typography variant="body2" component="p" style={{paddingTop: '2%'}}>
                        <Typography variant="h5">
                            Title : <a href={this.state.location} target="_blank" rel="noopener noreferrer">{this.state.title}</a>
                        </Typography><br />
                        <TextareaAutosize aria-label="empty textarea" id="comments"
                        placeholder="Enter your comments" value={this.state.comments} rowsMin={10} cols={100} onChange={this.onInputChange}/>
                        <p><InputLabel >Give rating</InputLabel></p>
                        <Select className={classes.rating} labelId="select-label" id="rating" value={this.state.rating} onChange={this.onChangeRating}>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                        </Select><br />
                        <p>
                            <TextField id="password" className={classes.name} type="password" label="Password" placeholder="Enter password"
                            variant="outlined" value={this.state.password} onChange={this.onInputChange} /><br /><br />                       
                            <Button variant="contained" className={classes.field} color="primary" onClick={this.onSubmitReview}>
                                Submit Review
                            </Button>
                        </p>
                        <div className={classes.field}><Link to="/papers">View all papers</Link></div>
                    </Typography>
                </CardContent>
            </Card>
        )
      }

    }
  
    render() {
        const { classes } = this.props;

        return(
          <div>
            {this.conditionalRender(classes)}
          </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Review);
