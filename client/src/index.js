import React from "react";
import {render} from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import {Provider} from "react-redux"
import {store,persistor} from "./redux/store"
import {PersistGate} from "redux-persist/integration/react";

render(<Provider store={store}><PersistGate persistor={persistor}><App /></PersistGate></Provider>, document.getElementById("root"));
registerServiceWorker();
