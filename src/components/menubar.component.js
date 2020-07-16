import React from 'react';
import { Link } from 'react-router-dom';

import { Typography, AppBar, Toolbar, IconButton, Button, SwipeableDrawer, ListItemIcon, Divider } from '@material-ui/core'
import { List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PublishIcon from '@material-ui/icons/Publish';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    menuListItem: {
        cursor: 'pointer',
    },
});

class MenuBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
        
        this.onToggle = this.onToggle.bind(this);
        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }

    onToggle() {
        this.setState({
            isOpen: this.state.isOpen ? false : true
        });
    }

    closeDrawer() {
        this.setState({
            isOpen: false
        })
    }

    openDrawer() {
        this.setState({
            isOpen: true
        })
    }

    logoutUser() {
        localStorage.removeItem("dp_user");
        localStorage.removeItem("dp_user_type");
        this.closeDrawer();
        window.location.href="/";
    }

    render() {
    
        const { classes } = this.props;

        return(
            <div>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            { localStorage.getItem("dp_user") !== null ? (
                                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={this.onToggle}>
                                        <MenuIcon />
                                    </IconButton>
                                ) : (
                                    <span></span>
                                ) 
                            }
                            <Typography variant="h6" className={classes.title}>
                                Decentralised Publisher
                            </Typography>
                            { localStorage.getItem("dp_user") !== null ? (
                                    <Button color="inherit" onClick={this.logoutUser}>Logout</Button>
                                ) : (
                                    <span></span>
                                ) 
                            }
                        </Toolbar>
                    </AppBar>
                </div>
                <React.Fragment>
                    <SwipeableDrawer
                        anchor='left'
                        open={this.state.isOpen}
                        onClose={this.closeDrawer}
                        onOpen={this.openDrawer}
                    >
                        <List>
                            <ListItem className={classes.menuListItem}>
                                <ListItemAvatar>
                                        <ListItemIcon><PersonIcon/></ListItemIcon>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Link to="/profile" style={{textDecoration: 'none', color: "black"}}>Profile</Link>}
                                    onClick={this.closeDrawer}
                                />
                            </ListItem>
                            <ListItem className={classes.menuListItem}>
                                <ListItemAvatar>
                                    <ListItemIcon><ReceiptIcon/></ListItemIcon>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Link to="/papers" style={{textDecoration: 'none', color: "black"}}>Papers</Link>}
                                    onClick={this.closeDrawer}
                                />
                            </ListItem>
                            { 
                                parseInt(localStorage.getItem("dp_user_type")) === 0 ? (
                                    <ListItem className={classes.menuListItem}>
                                        <ListItemAvatar>
                                            <ListItemIcon><PublishIcon/></ListItemIcon>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={<Link to="/submitPaper" style={{textDecoration: 'none', color: "black"}}>Submit a paper</Link>}
                                            onClick={this.closeDrawer}
                                        />
                                    </ListItem>
                                ) : (null)
                            }
                            <Divider/>
                            <ListItem className={classes.menuListItem}>
                                <ListItemAvatar>
                                    <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Logout"
                                    onClick={this.logoutUser}
                                />
                            </ListItem>
                        </List>
                    </SwipeableDrawer>
                </React.Fragment>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(MenuBar);
