import { NodeTypes } from "../../store/nodesSlice";

export interface TextNodeDataEditorState {
  type: NodeTypes.Text;
  data: { text: string };
}

export type NodeDataEditorState = TextNodeDataEditorState;
