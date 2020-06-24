import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataAction";
import propTypes from "prop-types";
import Axios from "axios";
import Scream from "../components/scream/Scream";
import { Grid } from "@material-ui/core";
import StaticProfile from "../components/profile/StaticProfile";

class user extends Component {
  state = {
    profile: null,
    screamIdParam: null,
  };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId;

    if (screamId) this.setState({ screamIdParam: screamId });

    this.props.getUserData(handle);

    Axios.get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { screams, loading } = this.props.data;
    const { screamIdParam } = this.state;

    const screamsMarkup = loading ? (
      <p>Carregando...</p>
    ) : screams === null ? (
      <p>Não existem posts!</p>
    ) : !screamIdParam ? (
      screams.map((scream) => (
        <Scream key={scream.screamId} scream={scream}></Scream>
      ))
    ) : (
      screams.map((scream) => {
        if (scream.screamId !== screamIdParam)
          return <Scream key={scream.screamId} scream={scream}></Scream>;
        else
          return (
            <Scream key={scream.screamId} scream={scream} openDialog={true}></Scream>
          );
      })
    );

    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <p>loading profile...</p>
          ) : (
            <StaticProfile profile={this.state.profile}></StaticProfile>
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: propTypes.func.isRequired,
  data: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
