import {combineReducers} from "redux";
import {ADD_COMMENT, COMMENTS_REFRESHED} from "./comments/commentsActions";

const commentsReducer = (state = {status: 'stale', data: []}, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        status: state.status,
        data: state.data.concat(action.comment)
      };

    case COMMENTS_REFRESHED:
      return {
        status: 'loaded',
        data: action.comments
      };

    default:
      return state;
  }
};

const reducers = combineReducers({
  comments: commentsReducer,
});

export default reducers;