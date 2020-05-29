import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import propTypes from "prop-types";

import MyButton from "../util/MyButton";

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";

import { connect } from "react-redux";
import { postScream } from "../redux/actions/dataAction";

const styles = (theme) => ({
  form: {
    textAlign: "center",
  },
  image: {
    margin: "20px auto 20px auto",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 20,
    position: "relative",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: "10",
  },
  progress: {
    position: "absolute",
  },
  submitButton: {
    position: "relative",
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "10%",
  },
});

class PostScream extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        body: "",
      });
      this.handleClose();
    }
  }

  handleOpen = () => {
    this.setState({
      open: true,
    });
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

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postScream({
      body: this.state.body,
    });
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;

    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Crie um post">
          <AddIcon></AddIcon>
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Fechar"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon></CloseIcon>
          </MyButton>
          <DialogTitle>Crie um novo post</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Post"
                value={this.state.body}
                multiline
                rows="3"
                placeholder="Faça o seu post aqui"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  ></CircularProgress>
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI,
});

PostScream.propTypes = {
  postScream: propTypes.func.isRequired,
  UI: propTypes.object.isRequired,
};

export default connect(mapStateToProps, { postScream })(
  withStyles(styles)(PostScream)
);
