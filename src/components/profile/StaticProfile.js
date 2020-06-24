import React, { Fragment } from "react";
import { Paper, withStyles, Typography } from "@material-ui/core";
import MuiLink from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import CalenderToday from "@material-ui/icons/CalendarToday";
import LinkIcon from "@material-ui/icons/Link";
import LocationOn from "@material-ui/icons/LocationOn";
import dayjs from "dayjs";

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

const StaticProfile = (props) => {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, bio, website, location },
  } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
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
              <LocationOn color="primary"></LocationOn> <span>{location}</span>
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
      </div>
    </Paper>
  );
};

StaticProfile.propTypes = {
  profile: propTypes.object.isRequired,
  classes: propTypes.object.isRequired,
};

export default withStyles(styles)(StaticProfile);
