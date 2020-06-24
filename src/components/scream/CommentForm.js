import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles, Grid, TextField, Button } from "@material-ui/core";
import propTypes from "prop-types";
import { submitComment } from "../../redux/actions/dataAction";

const styles = (theme) => ({});

class CommentForm extends Component {
  state = {
    body: "",
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        body: "",
        errors: {},
      });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitComment(this.props.screamId, { body: this.state.body });
  };

  render() {
    const { classes, authenticated } = this.props;
    const errors = this.state.errors;

    const commentFormMarkup = authenticated ? (
      <Grid item sm={12} style={{ textAlign: "center" }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Comente o post"
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          ></TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Commentar
          </Button>
        </form>
        <hr className={classes.visibleSeparator} />
      </Grid>
    ) : null;

    return commentFormMarkup;
  }
}

CommentForm.propTypes = {
  submitComment: propTypes.func.isRequired,
  UI: propTypes.object.isRequired,
  classes: propTypes.object.isRequired,
  screamId: propTypes.string.isRequired,
  authenticated: propTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
