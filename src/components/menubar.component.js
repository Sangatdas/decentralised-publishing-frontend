import React from 'react';
import { Link } from 'react-router-dom';

import { Typography, AppBar, Toolbar, IconButton, Button, SwipeableDrawer } from '@material-ui/core'
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
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
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PersonIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Link to="/profile" style={{textDecoration: 'none', color: "black"}}>Profile</Link>}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PersonIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Link to="/papers" style={{textDecoration: 'none', color: "black"}}>Papers</Link>}
                                />
                            </ListItem>
                            { 
                                localStorage.getItem("dp_user_type") > 0 ? (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PersonIcon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={<Link to="/submitPaper" style={{textDecoration: 'none', color: "black"}}>Submit a paper</Link>}
                                        />
                                    </ListItem>
                                ) : (null)
                            }
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PersonIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Link to="/profile" style={{textDecoration: 'none', color: "black"}}>Logout</Link>}
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
