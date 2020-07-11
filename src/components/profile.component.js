import React from 'react';
import { Link } from 'react-router-dom';

import { Typography, Card, CardContent, Divider, Button } from '@material-ui/core'
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
  link: {
    fontSize: '80%'
  }
});

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      account: '',
      papers: [],
      balance: '',
      configHeaders: {
        headers: {
          authorization: "Bearer " + localStorage.getItem("dp_user")
        }
      }
    }

    this.onClickBuyButton = this.onClickBuyButton.bind(this);
    this.onClickSellButton = this.onClickSellButton.bind(this);
  }

  componentDidMount() {

    axios
      .get('http://localhost:5000/user/', this.state.configHeaders)
      .then(res => {
        this.setState({
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          email: res.data.email,
          account: res.data.account,
          papers: res.data.papers
        });       
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get("http://localhost:5000/token/balance/", this.state.configHeaders)
      .then(res => {
        this.setState({
          balance: res.data.balance
        });
      })
      .catch(err => {
          this.setState({
            bal: "<span color='red'>Failed to retrieve balance!</span>"
          });
      });

  }

  onClickBuyButton(e) {
    e.preventDefault();
    Swal.fire({
      title: 'Buy tokens',
      html:
      '<input id="buy-amount" class="swal2-input" placeholder="Enter amount of tokens">' +
      '<input id="buy-password" class="swal2-input" type="password" placeholder="Enter password">',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      showLoaderOnConfirm: true,
      preConfirm: (dummy) => {
        var data = {
          amount: document.getElementById("buy-amount").value,
          password: document.getElementById("buy-password").value
        }
        return axios
          .post(`http://localhost:5000/token/buy/`, data, this.state.configHeaders)
          .then(response => {
            if (response.data.code === "success") {
              return response;
            } else {
              throw new Error(response.data.msg);
            }
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((response) => {
      console.log(response);
      if (response.value.data.code === "success") {
        Swal.fire({
          title: `Successfully bought tokens. Refresh page too see updated balance.`,
          icon: "success",
          text: "Token transfer transaction hash: " + response.value.data.msg.tokenTxHash + 
                "\nEther transfer transaction hash: " + response.value.data.msg.ethTxHash +
                "\nDisclaimer: " + response.value.data.msg.disclaimer
        });
      }
    })
  }

  onClickSellButton(e) {
    e.preventDefault();
    Swal.fire({
      title: 'Sell tokens',
      html:
      '<input id="sell-amount" class="swal2-input" placeholder="Enter amount of tokens">' +
      '<input id="sell-password" class="swal2-input" type="password" placeholder="Enter password">',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        var data = {
          amount: document.getElementById("sell-amount").value,
          password: document.getElementById("sell-password").value
        }
        return axios
          .post(`http://localhost:5000/token/sell/`, data, this.state.configHeaders)
          .then(response => {
            if (response.data.code === "success") {
              return response;
            } else {
              throw new Error(response.data.msg);
            }
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((response) => {
      console.log(response);
      if (response.value.data.code === "success") {
        Swal.fire({
          title: `Successfully sold tokens. Refresh page too see updated balance.`,
          icon: "success",
          text: "Token transfer transaction hash: " + response.value.data.msg.tokenTxHash + 
                "\nEther transfer transaction hash: " + response.value.data.msg.ethTxHash +
                "\nDisclaimer: " + response.value.data.msg.disclaimer
        });
      }
    })
  }

  render() {
    const { classes } = this.props;

    return(
      <div>
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                    My Profile
                </Typography>
                <Divider />
                <div style={{paddingTop: '10px'}}>
                  <Typography variant="body2" component="p">
                      <Typography variant="h5">
                          Name: {this.state.firstname + " " + this.state.lastname}
                      </Typography><br/>
                      <Typography variant="h5">
                          Email: {this.state.email}
                      </Typography><br/>
                      <Typography variant="h5">
                          Account: {this.state.account}
                      </Typography><br/>
                      <Typography variant="h5">
                          Number of submissions: {this.state.papers.length}&nbsp;
                          <span className={classes.link}><Link to="/papers">View Submissions</Link></span>
                      </Typography><br/>
                      <Typography variant="h5">
                          Balance: {this.state.balance}<br/>
                      </Typography>
                      <p><Button variant="contained" color="primary" onClick={this.onClickBuyButton}>Buy Tokens</Button></p>
                      <p><Button variant="contained" color="secondary" onClick={this.onClickSellButton}>Sell Tokens</Button></p>
                  </Typography>
                </div>
            </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Profile);
