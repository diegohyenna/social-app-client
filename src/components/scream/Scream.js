import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import { connect } from "react-redux";

import propTypes from "prop-types";
import MyButton from "../../util/MyButton";
import ChatIcon from "@material-ui/icons/Chat";

import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};

class Scream extends Component {
  render() {
    dayjs.extend(relativeTime);

    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        likeCount,
        commentCount,
        screamId,
      },
      user: { authenticated, credentials },
    } = this.props;

    const deleteButton =
      authenticated && userHandle === credentials.handle ? (
        <DeleteScream screamId={screamId}></DeleteScream>
      ) : null;

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile Image"
          className={classes.image}
        ></CardMedia>
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton screamId={screamId}></LikeButton>
          <span>{likeCount} likes</span>
          <MyButton tip="Comentários">
            <ChatIcon color="primary"></ChatIcon>
          </MyButton>
          <span>{commentCount} comentários</span>
          <ScreamDialog
            openDialog={this.props.openDialog}
            screamId={screamId}
            userHandle={userHandle}
          ></ScreamDialog>
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  user: propTypes.object.isRequired,
  scream: propTypes.object.isRequired,
  classes: propTypes.object.isRequired,
  openDialog: propTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
