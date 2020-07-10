import React from 'react';
import { Link } from 'react-router-dom';

import { Typography, Card, CardContent, Divider, Button, MenuItem, Select, TextareaAutosize, InputLabel } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

import Swal from 'sweetalert2';

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
            title: props.match.params.id, 
        }

        this.onChangeComments = this.onChangeComments.bind(this);
        this.onSubmitReview = this.onSubmitReview.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
    }

    onChangeComments(e) {
        this.setState({
            comments: e.target.value
        })
    }

    onSubmitReview() {
        Swal.fire({
            title: this.state.title,
            text: this.state.comments,
            icon: 'success',
            confirmButtonText: 'Cool!'
        })
    }

    onChangeRating(e) {
        e.preventDefault();
        this.setState({
            rating: e.target.value
        });
    }
  
    render() {
    
        const { classes } = this.props;

        return(
        <div>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography variant="h5" color="textSecondary" gutterBottom>
                        Add Review
                    </Typography>
                    <Divider />
                    <Typography variant="body2" component="p" style={{paddingTop: '2%'}}>
                        <Typography variant="h5">
                            Title : {this.state.title}
                        </Typography><br />
                        <TextareaAutosize aria-label="empty textarea" 
                        placeholder="Enter your comments" value={this.state.comments} rowsMin={10} cols={100} onChange={this.onChangeComments}/>
                        <p><InputLabel id="Rating">Give rating</InputLabel></p>
                        <Select className={classes.rating} labelId="select-label" id="simple-select" value={this.state.rating}  onChange={this.onChangeRating}>
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
                        </Select>
                        <p>
                            <Button variant="contained" className={classes.field} color="primary" onClick={this.onSubmitReview}>
                                Submit Review
                            </Button>
                        </p>
                        <div className={classes.field}><Link to="/papers">View all papers</Link></div>
                    </Typography>
                </CardContent>
            </Card>
        </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Review);
