import config from '../../config';
import Cookies from "universal-cookie";
import CryptoJS from 'crypto-js';

import {
  apiListNews,
  apiFetchProject,
  apiProjectUpdate,
  apiProjectCreate,
} from '../api';

export const USER_CHECK = 'USER_CHECK';
export const PROJECT_FETCH_REQUEST = 'PROJECT_FETCH_REQUEST';
export const PROJECT_FETCH_SUCCESS = 'PROJECT_FETCH_SUCCESS';
export const PROJECT_UPDATE_REQUEST = 'PROJECT_UPDATE_REQUEST';
export const PROJECT_UPDATE_SUCCESS = 'PROJECT_UPDATE_SUCCESS';
export const NEWS_LIST_REQUEST = 'NEWS_LIST_REQUEST';
export const NEWS_LIST_SUCCESS = 'NEWS_LIST_SUCCESS';
export const NEWS_CREATE_REQUEST = 'NEWS_CREATE_REQUEST';
export const NEWS_CREATE_SUCCESS = 'NEWS_CREATE_SUCCESS';
export const NEWS_VIEWED = 'NEWS_VIEWED';

export const authenticateUser = (isLoggedIn) => ({
  type: USER_CHECK,
  data: isLoggedIn
});

const sendProjectFetchRequest = () => ({
  type: PROJECT_FETCH_REQUEST,
});

const projectFetchSuccess = project => ({
  type: PROJECT_FETCH_SUCCESS,
  data: project,
});


const sendProjectUpdateRequest = () => ({
  type: PROJECT_UPDATE_REQUEST,
});

// Calling this to log Request has been made.
const listNewsRequest = () => ({
  type: NEWS_LIST_REQUEST,
});

// This is sent to reducer using mapStateToProps IN Dashboard.
const listNewsSuccess = json => ({
  type: NEWS_LIST_SUCCESS,
  data: json,
});

const sendNewsCreateRequest = () => ({
  type: NEWS_CREATE_REQUEST,
});

const newsCreateSuccess = json => ({
  type: NEWS_CREATE_SUCCESS,
  data: json,
});

const projectUpdateSuccess = project => ({
  type: PROJECT_UPDATE_SUCCESS,
  data: project,
});

export const viewedNews = news => ({
  type: NEWS_VIEWED,
  data: news,
});

export const updateProjectDetails = project => (dispatch) => {
  dispatch(sendProjectUpdateRequest());
  return (apiProjectUpdate(project))
    .then(res => res.json())
    .then(json => dispatch(projectUpdateSuccess(project)));
};

// Fetching news list
export const listNews = () => (dispatch) => {
  dispatch(listNewsRequest());
  return apiListNews()
    .then(res => res.json()) //this is returning a promise - result parsinng the response as json
    .then(json => dispatch(listNewsSuccess(json)));
};

export const fetchProject = pid => (dispatch) => {
  dispatch(sendProjectFetchRequest());
  return apiFetchProject(pid)
    .then(res => res.json())
    .then(json => dispatch(projectFetchSuccess(json.pop())));
};

export const addNews = (news) => (dispatch) => {
  dispatch(sendNewsCreateRequest());
  return apiProjectCreate(news)
    .then(res => res.json())
    .then((json) => {
      const pid = json.result.pop();
      news.pid = pid;
    });
};

export const userAuthenticationCheck = (name, pass) => (dispatch, getState) => {
  if (config.username === name && config.password === pass) {
    const cookies = new Cookies();
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt('true', config.encryptText);
    cookies.set('isLoggedIn', ciphertext.toString(), {path:'/'});
    dispatch(authenticateUser(true));
  }
};
