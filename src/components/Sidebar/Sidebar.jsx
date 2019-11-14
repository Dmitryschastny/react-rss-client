import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Checkbox,
} from "@material-ui/core";
import {
  Add as AddIcon
} from "@material-ui/icons";

export default class Sidebar extends React.Component {
  render() {
    const { sources, toggleDialog } = this.props;

    return (
      <Drawer
        anchor='left'
        variant='permanent'
      >
        <List>
          <ListItem divider>
            <ListItemText primary='Your subscriptions' />
          </ListItem>
          <ListItem button>
            <ListItemText primary='Show all' />
          </ListItem>
          {sources.map((item, index) => (
            <ListItem button key={index}>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
          <ListItem button onClick={toggleDialog}>
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText primary='Add' />
          </ListItem>
        </List>
      </Drawer>
    )
  }
}