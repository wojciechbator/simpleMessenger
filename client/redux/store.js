import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

export default function configureStore(initialState) {
  const store = createStore(reducers, initialState, compose(
    applyMiddleware(thunk),
    (typeof window !== 'undefined' && window.devToolsExtension) ? window.devToolsExtension() : fn => fn
  ));
  return store;
}
