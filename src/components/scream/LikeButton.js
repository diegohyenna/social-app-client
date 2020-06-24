import React, { Component } from "react";
import MyButton from "../../util/MyButton";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { likeScream, unlikeScream } from "../../redux/actions/dataAction";
import { withStyles } from "@material-ui/core";

const styles = {};

class LikeButton extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.screamId
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  likeScream = () => {
    this.props.likeScream(this.props.screamId);
  };

  unlikeScream = () => {
    this.props.unlikeScream(this.props.screamId);
  };
  render() {
    const { authenticated } = this.props.user;
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

    return likeButton;
  }
}

LikeButton.propTypes = {
  user: propTypes.object.isRequired,
  screamId: propTypes.string.isRequired,
  likeScream: propTypes.func.isRequired,
  unlikeScream: propTypes.func.isRequired,
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
)(withStyles(styles)(LikeButton));
