import React, { Component, Fragment } from "react";
import propTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";

import { Paper, Typography } from "@material-ui/core";
import CalenderToday from "@material-ui/icons/CalendarToday";
import LinkIcon from "@material-ui/icons/Link";
import LocationOn from "@material-ui/icons/LocationOn";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

import dayjs from "dayjs";

import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../../redux/actions/userAction";

import EditDetails from "./EditDetails";
import MyButton from "../../util/MyButton";

const styles = (theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: theme.palette.primary.main,
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
    "& button": {
      marginTop: 20,
      position: "relative",
    },
  },
  buttons: {
    textAlign: "center",
    marginTop: "10px",
    "& a": {
      margin: "10px",
    },
  },
});

class Profile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];

    const formData = new FormData();
    formData.append("image", image, image.name);

    this.props.uploadImage(formData);
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById("image-input");
    fileInput.click();
  };

  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated,
      },
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="profile" className="profile-image" />
              <input
                type="file"
                id="image-input"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              <MyButton
                tip="Editar imagem do perfil"
                onClick={this.handleEditPicture}
                btnClassName="button"
              >
                <EditIcon color="primary"></EditIcon>
              </MyButton>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h5"
              >
                @{handle}
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <Fragment>
                  <LocationOn color="primary"></LocationOn>{" "}
                  <span>{location}</span>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LinkIcon color="primary"></LinkIcon>{" "}
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <hr style={{ borderTop: "1px solid #ccc", margin: "20px 0" }} />
              <CalenderToday color="primary"></CalenderToday>{" "}
              <small>Criado em {dayjs(createdAt).format("MMM YYYY")}</small>
            </div>
            <hr style={{ borderTop: "1px solid #ccc", margin: "20px 0 0 0" }} />
            <MyButton
              tip="Sair"
              onClick={this.handleLogout}
              btnClassName="button"
            >
              <KeyboardReturn color="primary"></KeyboardReturn>
            </MyButton>
            <EditDetails></EditDetails>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            O Perfil não foi encontrado, por favor logue-se novamente!
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Logar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Registrar-se
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <p>Loading...</p>
    );

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
  user: propTypes.object.isRequired,
  classes: propTypes.object.isRequired,
  logoutUser: propTypes.func.isRequired,
  uploadImage: propTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
