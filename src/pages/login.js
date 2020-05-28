import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/icon.png";
import theme from "../util/login-sign";

import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import {
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userAction";

const styles = theme;

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <img
            src={AppIcon}
            width="50px"
            alt="react"
            className={classes.image}
          />
          <Typography variant="h3" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              helperText={errors.email}
              error={errors.email ? true : false}
              onChange={this.handleChange}
              fullWidth
              required
            ></TextField>
            <TextField
              id="password"
              name="password"
              type="password"
              label="Senha"
              className={classes.textField}
              value={this.state.password}
              helperText={errors.password}
              error={errors.password ? true : false}
              onChange={this.handleChange}
              fullWidth
              required
            ></TextField>
            {(errors.message || errors.error) &&
              ((errors.message && (
                <Alert severity="error">{errors.message}</Alert>
              )) ||
                (errors.error.code === "auth/too-many-requests" && (
                  <Alert severity="error">
                    Você tentou logar muitas vezes, espere um pouco e tente
                    novamente!
                  </Alert>
                )) || (
                  <Alert severity="error">
                    Suas credenciais estão erradas, tente novamente!
                  </Alert>
                ))}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              fullWidth
            >
              {!loading ? "Entrar" : "."}
              {loading && (
                <CircularProgress
                  size={30}
                  color="secondary"
                  className={classes.progress}
                ></CircularProgress>
              )}
            </Button>
            <small>
              Você não tem uma conta?{" "}
              <Link to="/signup">Cadastre-se aqui!</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
