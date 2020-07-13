import React from 'react';

import { ListItem, ListItemAvatar, ListItemText, Avatar, Divider, Typography } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    inline: {
        display: 'inline',
      },
});

class ReviewListElement extends React.Component {

    render() {

        const { classes } = this.props;

        return (
            <div>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={this.props.review.reviewer}
                        secondary={
                            <React.Fragment>
                                <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                                    {this.props.review.text}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </div>
        )
    }

}

export default withStyles(styles, {withTheme: true})(ReviewListElement);
