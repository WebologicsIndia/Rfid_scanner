import React from "react";
import Screens from "./src/screens";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {store, persistor} from "./src/store";


const App = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Screens />
            </PersistGate>
        </Provider>
    );
};
export default App;
