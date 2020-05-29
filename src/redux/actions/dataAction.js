import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  LOADING_UI,
  SET_ERRORS,
  POST_SCREAM,
  CLEAR_ERRORS,
} from "../types";
import Axios from "axios";

export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  Axios.get("/screams")
    .then((res) => {
      console.log(res);
      dispatch({
        type: SET_SCREAMS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_SCREAMS,
        payload: [],
      });
    });
};

export const postScream = (newScream) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });

  Axios.post("/scream", newScream)
    .then((res) => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data,
      });
      dispatch({
        type: CLEAR_ERRORS,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const likeScream = (screamId) => (dispatch) => {
  Axios.get(`/scream/${screamId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const unlikeScream = (screamId) => (dispatch) => {
  Axios.get(`/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteScream = (screamId) => (dispatch) => {
  Axios.delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({
        type: DELETE_SCREAM,
        payload: screamId,
      });
    })
    .catch((err) => console.log(err));
};
