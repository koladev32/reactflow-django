import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { Nodes } from "./nodesSlice";
interface SelectedNodesState {
  selectedNodes: Array<Nodes>;
}

const initialState: SelectedNodesState = {
  selectedNodes: [],
};

const selectedNodesSlice = createSlice({
  name: "selectedNodes",
  initialState,
  reducers: {
    setSelectedNodes: (state, action) => {
      state.selectedNodes = action.payload;
    },
    deselectNodes: (state, action) => {
      state.selectedNodes = state.selectedNodes.filter(
        (node) => node.id !== action.payload
      );
    },
  },
});

export const { setSelectedNodes, deselectNodes } = selectedNodesSlice.actions;

export const selectedNodes = (state: AppState) =>
  state.selectedNodes.selectedNodes;

export default selectedNodesSlice.reducer;
