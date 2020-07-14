import React from 'react';
import { Link } from 'react-router-dom';

import { Typography, Card, CardContent, CardActions, Divider, Button } from '@material-ui/core'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import StarsIcon from '@material-ui/icons/Stars';

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
          firstname: res.data.user.firstname,
          lastname: res.data.user.lastname,
          email: res.data.user.email,
          account: res.data.user.account,
          type: res.data.user.type,
          balance: res.data.user.balance,
          sub_count: res.data.user.sub_count,
          credibility: res.data.user.credibility,
        });
        localStorage.setItem("dp_user_type", res.data.user.type);     
      })
      .catch(err => {
        console.log(err);
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
          title: "Successfully bought tokens. Refresh page too see updated balance.",
          icon: "success",
          html: "Token transfer transaction hash: " + response.value.data.msg.tokenTxHash + 
                "<br>Ether transfer transaction hash: " + response.value.data.msg.ethTxHash +
                "<br>Disclaimer: " + response.value.data.msg.disclaimer
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
          title: "Successfully sold tokens. Refresh page too see updated balance.",
          icon: "success",
          html: "Token transfer transaction hash: " + response.value.data.msg.tokenTxHash + 
                "<br>Ether transfer transaction hash: " + response.value.data.msg.ethTxHash +
                "<br>Disclaimer: " + response.value.data.msg.disclaimer
        });
      }
    })
  }

  render() {
    if (localStorage.getItem("dp_user") === null) window.location.href = '/';
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
              <Typography>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Name"
                      secondary={this.state.firstname + this.state.lastname}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <EmailIcon/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Email"
                      secondary={this.state.email}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <AccountBalanceWalletIcon/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Balance"
                      secondary={this.state.balance + " DPT"}
                    />
                  </ListItem>
                  { this.state.type > 0 ? (
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <StarsIcon/>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Credibility"
                          secondary={this.state.credibility}
                        />
                      </ListItem>
                    ) : (
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <StarsIcon/>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Number of Submissions"
                          secondary={this.state.sub_count}
                        />
                      </ListItem>
                    )
                  }
                </List>
                <Divider/>
                <CardActions style={{marginTop: '10px'}}>
                  <Button size="small" color="primary" onClick={this.onClickBuyButton}><b>Buy Tokens</b></Button>
                  <Button size="small" color="secondary" onClick={this.onClickSellButton}><b>Sell Tokens</b></Button>
                  <Button size="small"><b><Link to="/papers" style={{color: "green", textDecoration: "none"}}>Show papers</Link></b></Button>
                </CardActions>
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Profile);
