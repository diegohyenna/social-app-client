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
import { likeScream, unlikeScream } from "../redux/actions/dataAction";
import propTypes from "prop-types";
import MyButton from "../util/MyButton";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteScream from "./DeleteScream";

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
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.scream.screamId
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId);
  };

  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId);
  };

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

    const likeButton = !authenticated ? (
      <MyButton tip="Curtir">
        <Link to="/login">
          <FavoriteBorder color="primary"></FavoriteBorder>
        </Link>
      </MyButton>
    ) : this.likedScream() ? (
      <MyButton tip="Desfazer curtida" onClick={this.unlikeScream}>
        <FavoriteIcon color="primary"></FavoriteIcon>
      </MyButton>
    ) : (
      <MyButton tip="Curtir" onClick={this.likeScream}>
        <FavoriteBorder color="primary"></FavoriteBorder>
      </MyButton>
    );

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
          {likeButton}
          <span>{likeCount} likes</span>
          <MyButton tip="Comentários">
            <ChatIcon color="primary"></ChatIcon>
          </MyButton>
          <span>{commentCount} comentários</span>
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  likeScream: propTypes.func.isRequired,
  unlikeScream: propTypes.func.isRequired,
  user: propTypes.object.isRequired,
  scream: propTypes.object.isRequired,
  classes: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeScream,
  unlikeScream,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Scream));
