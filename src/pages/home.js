import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import Scream from "../components/Scream";
import Profile from "../components/Profile";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { getScreams } from "../redux/actions/dataAction";

class home extends Component {
  state = {
    screams: null,
  };

  componentDidMount() {
    this.props.getScreams();
  }

  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map((scream, index) => (
        <Scream key={index} scream={scream}></Scream>
      ))
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile></Profile>
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getScreams: propTypes.func.isRequired,
  data: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getScreams })(home);
