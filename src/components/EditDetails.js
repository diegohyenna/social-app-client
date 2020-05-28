import React, { Component, Fragment } from "react";
import propTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userAction";

import {
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import MyButton from "../util/MyButton";

const styles = (theme) => ({
  //   ...theme,
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  form: {
    textAlign: "center",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 20,
    position: "relative",
  },
});

class EditDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    open: false,
  };

  componentDidMount() {
    const { credentials } = this.props;
    this.mapSetUserDetailsToState(credentials);
  }

  mapSetUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
    });
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
    this.mapSetUserDetailsToState(this.props.credentials);
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    };

    this.props.editUserDetails(userDetails);

    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Editar detalhes"
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <EditIcon color="primary"></EditIcon>
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edite os detalhes do perfil</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="Uma curta descrição sobre você"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="Seu website pessoal"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <TextField
                name="location"
                type="text"
                label="Localização"
                placeholder="Sua localização"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancelar
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

EditDetails.propTypes = {
  editUserDetails: propTypes.func.isRequired,
  classes: propTypes.object.isRequired,
};

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);
