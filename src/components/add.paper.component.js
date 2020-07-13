import React from 'react';

import { Typography, Card, CardContent, Divider, TextField, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

import axios from 'axios';
import Swal from 'sweetalert2';

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

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      file: '',
      password: ''
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onUploadPaper = this.onUploadPaper.bind(this);
  }

  onInputChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.id] : e.target.value
    });
  }

  onFileChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.id] : e.target.files[0]
    })
  }

  onUploadPaper(e) {
    e.preventDefault(e);
    let formData = new FormData();
    formData.append('file', this.state.file);
    formData.append('title', this.state.title);
    formData.append('password', this.state.password);
    axios
      .post('http://localhost:5000/paper/upload/', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'authorization': 'Bearer ' + localStorage.getItem('dp_user')
          }
        }
      )
      .then(response => {
        if(response.data.code === "success") {
          this.setState({
            title: '',
            password: '',
            file: ''
          });
          Swal.fire({
            title: 'Upload Success',
            text: "Congrats! You've successfully uploaded your paper",
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
      })
  }
  
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
                        helperText="Example: any title" variant="outlined" onChange={this.onInputChange}
                    /><br />
                    <TextField id="password" className={classes.name} type="password" label="Password" placeholder="Enter password"
                        variant="outlined" onChange={this.onInputChange}
                    /><br />
                    <Typography variant="body2" component="p">
                        <Button variant="contained" component="label">
                            Select File
                            <input id='file' type="file" style={{ display: "none" }} onChange={this.onFileChange} />
                        </Button>
                        <p>
                          <Button variant="contained" className={classes.field} onClick={this.onUploadPaper} color="primary">
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
