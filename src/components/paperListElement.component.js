import React from 'react';

import { ListItem, ListItemAvatar, ListItemText, Avatar, Divider } from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'; 
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = theme => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
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

class PaperListElement extends React.Component {

    render() {

        return (
            <div>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <FolderIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Link to={"/paper/" + this.props.paper.location}>{this.props.paper.title}</Link>}
                        secondary={this.props.paper.status ? 'Reviewing Completed | Rating: ' + this.props.paper.rating : 'Reviewing in progress'}
                    />
                </ListItem>
                <Divider/>
            </div>
        )
    }

}

export default withStyles(styles, {withTheme: true})(PaperListElement);
