import React, { Component, Fragment } from "react";

import NotificationIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

import propTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { markNotificationsRead } from "../../redux/actions/userAction";
import {
  Badge,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

class Notifications extends Component {
  state = {
    anchorEl: null,
  };

  handleOpen = (event) => {
    this.setState({
      anchorEl: event.target,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  onMenuOpened = () => {
    let unreadNotificationsIds = this.props.notifications
      .filter((not) => !not.read)
      .map((not) => not.notificationId);

    this.props.markNotificationsRead(unreadNotificationsIds);
  };

  render() {
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;

    dayjs.extend(relativeTime);

    let notificationsIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter((not) => not.read === false).length > 0
        ? (notificationsIcon = (
            <Badge
              color="secondary"
              badgeContent={
                notifications.filter((not) => not.read === false).length
              }
            >
              <NotificationIcon></NotificationIcon>
            </Badge>
          ))
        : (notificationsIcon = <NotificationIcon></NotificationIcon>);
    } else {
      notificationsIcon = <NotificationIcon></NotificationIcon>;
    }

    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((not) => {
          const verb = not.type === "like" ? "liked" : "commented on";
          const time = dayjs(not.createdAt).fromNow();
          const iconColor = not.read ? "primary" : "secondary";
          const icon =
            not.type === "like" ? (
              <FavoriteIcon
                color={iconColor}
                style={{ marginRight: 10 }}
              ></FavoriteIcon>
            ) : (
              <ChatIcon
                color={iconColor}
                style={{ marginRight: 10 }}
              ></ChatIcon>
            );

          return (
            <MenuItem key={not.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color="primary"
                variant="body1"
                to={`/users/${not.recipient}/scream/${not.screamId}`}
              >
                {not.sender} {verb} seu post {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          Você não tem notificações!
        </MenuItem>
      );

    return (
      <Fragment>
        <Tooltip placement="top" title="Notificações">
          <IconButton
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationsMarkup}
        </Menu>
      </Fragment>
    );
  }
}

Notifications.propTypes = {
  markNotificationsRead: propTypes.func.isRequired,
  notifications: propTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
);
