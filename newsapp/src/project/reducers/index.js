import { combineReducers } from 'redux';
import {
  USER_CHECK,
  PROJECT_FETCH_REQUEST,
  PROJECT_FETCH_SUCCESS,
  NEWS_LIST_REQUEST,
  NEWS_LIST_SUCCESS,
  NEWS_VIEWED,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  NEWS_CREATE_REQUEST,
  NEWS_CREATE_SUCCESS,
} from '../actions';


function projectOperations(state = {
  isFetching: true,
  projectsList: {},
  viewedNews: [],
  currProject: [],
  fetchRates: [],
  isLoggedIn: false
}, action) {
  switch (action.type) {
    case USER_CHECK:
    return {
      ...state,
      isLoggedIn: action.data
    };

    case PROJECT_FETCH_REQUEST:
    case NEWS_CREATE_REQUEST:
    case PROJECT_UPDATE_REQUEST:
    case NEWS_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case PROJECT_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        viewedNews: [...state.viewedNews, action.data],
        currProject: action.data,
      };

    case PROJECT_UPDATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currProject: action.data,
      };

    case NEWS_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        newsList: action.data,
      };
    case NEWS_VIEWED:
      return {
        ...state,
        viewedNews: [...state.viewedNews, action.data],
        currNews: action.data,
      };

    case NEWS_CREATE_SUCCESS:
      return {
        ...state,
        currProject: action.data,
        isFetching: false,
        viewedNews: [...state.viewedNews, action.data],
        projectsList: [...state.projectsList, action.data],
      };
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  projectOperations
});

export default rootReducer;
