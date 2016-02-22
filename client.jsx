import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { syncHistory, routeReducer } from "react-router-redux";
import * as reducers from "./reducers";

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}));

const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore);

const store = createStoreWithMiddleware(reducer);
reduxRouterMiddleware.listenForReplays(store);

/* global document */


import Layout from "./components/Layout";
import SongList from "./components/SongList";
import Song from "./components/Song";
import "./main.scss";

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={SongList}/>
                <Route path="songs" component={SongList}/>
                <Route path="songs/:songId" component={Song}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("app-root")
);

import {setSongs} from "./actions";
import {get} from "axios";

/* global localStorage */

get("/api/songs")
  .then(
    // Try to access the real server
    ({data}) => {
      const songs = {songs: data};
      localStorage.setItem('songs', JSON.stringify(songs));
      store.dispatch(setSongs(songs));
    }
  )
  .catch(
    // If unavailable, then check localStorage
    () => {
      const songs = localStorage.getItem('songs');
      if (songs) {
        store.dispatch(setSongs(JSON.parse(songs)));
      }
    }
  )
;

import registerServiceWorker from './src/serviceWorker';
registerServiceWorker();
