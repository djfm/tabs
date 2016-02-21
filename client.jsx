import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Router, Route, browserHistory } from "react-router";
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
import "./main.scss";

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Layout}>
                <Route path="songs" component={SongList}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("app-root")
);

import {setSongs} from "./actions";
import {get} from "axios";

get("/api/songs").then(({data}) => store.dispatch(setSongs({songs: data})));
