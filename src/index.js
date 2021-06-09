import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import App from "./App";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./store/rootReducer";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById(`root`)
);
