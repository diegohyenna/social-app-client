import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import propTypes from "prop-types";
import MyButton from "../../util/MyButton";

import { deleteScream, getScreams } from "../../redux/actions/dataAction";
import { connect } from "react-redux";

import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";

const styles = {
  deleteButton: {
    position: "absolute",
    top: "10%",
    right: "1%",
  },
};

class DeleteScream extends Component {
  state = {
    open: false,
  };

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

  deleteScream = () => {
    this.props.deleteScream(this.props.screamId);
    this.setState({
      open: false,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <MyButton
          tip="Deletar Post"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary"></DeleteOutline>
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Tem certeza que deseja deletar esse post?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.deleteScream} color="secondary">
              Deletar
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteScream.propTypes = {
  deleteScream: propTypes.func.isRequired,
  classes: propTypes.object.isRequired,
  screamId: propTypes.string.isRequired,
};

export default connect(null, { deleteScream, getScreams })(
  withStyles(styles)(DeleteScream)
);
