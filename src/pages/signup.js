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
import { signupUser } from "../redux/actions/userAction";

const styles = theme;

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      errors: {},
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      loading: true,
    });

    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };

    this.props.signupUser(newUserData, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

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
            Cadastrar-se
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
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirmar Senha"
              className={classes.textField}
              value={this.state.confirmPassword}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              onChange={this.handleChange}
              fullWidth
              required
            ></TextField>
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Nome de Usuário"
              className={classes.textField}
              value={this.state.handle}
              helperText={errors.handle}
              error={errors.handle ? true : false}
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
              {!loading ? "Cadastrar-se" : "."}
              {loading && (
                <CircularProgress
                  size={30}
                  color="secondary"
                  className={classes.progress}
                ></CircularProgress>
              )}
            </Button>
            <small>
              Você já tem uma conta? <Link to="/login">Entre aqui!</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(signup)
);
