import TextNodeDataEditor from "./nodes/text";
import { Nodes, NodeTypes } from "../../../store/nodesSlice";
import { FC } from "react";

// A component which renders the specific editor for the selected node
const NodeDataEditor: FC<{ node: Nodes }> = ({ node }) => {
  switch (node.type) {
    case NodeTypes.Text:
      return <TextNodeDataEditor {...node} />;
    default:
      return null;
  }
};

export default NodeDataEditor;
