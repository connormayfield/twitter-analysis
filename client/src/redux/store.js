import { applyMiddleware, createStore } from "redux"
//import {AsyncStorage} from "react-native";
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from "redux-persist";



//import logger from "redux-logger";
import {createLogger} from "redux-logger"
import thunk from "redux-thunk"
//import promise from "redux-promise-middleware"

import reducer from "./reducers"

const persistConfig={
    key:"root",
    storage:storage
}
const middlewares = [thunk,createLogger()];

const persistedReducer=persistReducer(persistConfig,reducer);

// const middleware = applyMiddleware(...middlewares);

// export default createStore(reducer, middleware)

const middleware=applyMiddleware(...middlewares);

export const store=createStore(persistedReducer,middleware);

export const persistor=persistStore(store);