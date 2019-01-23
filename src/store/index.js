import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import rootReducer from "./rootReducer";

////

const logger = createLogger({
  collapsed: true
});

const middleware =
  process.env.NODE_ENV !== "production"
    ? applyMiddleware(thunk, logger)
    : applyMiddleware(thunk);

const store = createStore(rootReducer, middleware);

export { store };
