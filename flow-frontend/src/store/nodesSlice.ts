import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { Node } from "reactflow";

export enum NodeTypes {
  Text = "text",
}

export interface TextNodeData {
  text: string;
}

export interface TextNode extends Node<TextNodeData, NodeTypes.Text> {
  type: NodeTypes.Text;
  selected: boolean;
}

export type Nodes = TextNode;
const initialDummyNodes = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { text: "text message 1" },
    type: NodeTypes.Text,
    selected: false,
  },
  {
    id: "2",
    position: { x: 420, y: 220 },
    data: { text: "text message 2" },
    type: NodeTypes.Text,
    selected: false,
  },
];

const initialState = {
  nodes: initialDummyNodes,
};

const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    addNode: (state, action) => {
      state.nodes = [...state.nodes, action.payload];
    },
    changeNodeData: (state, action) => {
      const { id, data, selected } = action.payload;

      const node = state.nodes.find((node) => node.id === id);

      if (!node) return;

      const newNode = {
        ...node,
        selected,
        data: {
          ...node.data,
          ...data,
        },
      };

      state.nodes = state.nodes.map((node) =>
        node.id === id ? newNode : node
      );
    },
    setNodesChange: (state, action) => {
      state.nodes = action.payload;
    },
    onDrop: (state, action) => {
      const { id, type } = action.payload.item;
      const offset = action.payload.monitor.getClientOffset();
      const lastNode = state.nodes[state.nodes.length - 1];

      const x = offset?.x || lastNode.position.x + 300;
      const y = offset?.y || lastNode.position.y + 400;

      const newNode: Nodes = {
        id: `${id}-${Date.now()}`,
        position: { x, y },
        data: { text: "Default Text" },
        selected: false,
        type,
      };

      state.nodes.push(newNode);
    },
  },
});

export const { addNode, changeNodeData, setNodesChange, onDrop } =
  nodesSlice.actions;

export const selectNodes = (state: AppState) => state.nodes.nodes;

export const selectNodeById = (selectNodes: AppState, nodeId: string) =>
  selectNodes.nodes.nodes.find((node) => node.id === nodeId);

export default nodesSlice.reducer;
