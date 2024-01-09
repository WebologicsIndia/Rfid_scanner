import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import {configureStore} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "./reducers/rootReducer";

import {batchState, clientState, inventoryState, userState} from "./initialState";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["config", "user"]
};
const createStore = (preloadedState: object) => {
    const mainReducer = (state: any, action: any) => {
        if (action.type === "RESET_APP") {
            return preloadedState;
        }
        return rootReducer(state, action);
    };
    const persistedReducer = persistReducer(persistConfig, mainReducer);

    return configureStore({
        reducer: persistedReducer,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        preloadedState: preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
                }
            })
    });
};
export const store = createStore({
    client: clientState,
    user: userState,
    batch: batchState,
    inventory: inventoryState
});
export const persistor = persistStore(store);
