import { configureStore } from "@reduxjs/toolkit";
import nodesReducer from "./nodesSlice";
import edgesReducer from "./edgesSlice";
import selectedNodesReducer from "./selectedNodesSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      nodes: nodesReducer,
      edges: edgesReducer,
      selectedNodes: selectedNodesReducer,
    },
  });
}

const store = makeStore();

export type AppDispatch = typeof store.dispatch;

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<AppStore["getState"]>;
export default store;
