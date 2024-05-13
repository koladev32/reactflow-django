import { FC } from "react";
import { useOnSelectionChange } from "reactflow";
import NodeTypeRenderer, { NodeTypeProps } from "./nodes";
import {
  Nodes,
  TextNode,
  selectNodes,
  setNodesChange,
} from "../../store/nodesSlice";
import { deselectNodes } from "../../store/selectedNodesSlice";
import NodeDataEditor from "./editor";
import {
  setSelectedNodes,
  selectedNodes,
} from "../../store/selectedNodesSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { BiArrowBack } from "react-icons/bi";

interface SidebarProps {
  nodes: NodeTypeProps[];
}

const Sidebar: FC<SidebarProps> = ({ nodes }) => {
  const dispatch = useAppDispatch();
  const selectedNodesState = useAppSelector(selectedNodes);
  const nodesArray = useAppSelector(selectNodes);

  useOnSelectionChange({
    onChange: (elements) => {
      if (elements.nodes.length > 0) {
        dispatch(setSelectedNodes(elements.nodes as Array<Nodes>));
      } else {
        dispatch(setSelectedNodes([]));
      }
    },
  });

  const onDeselect = (selectedNode: TextNode) => {
    // deselect the node
    const nodes = nodesArray.map((node: any) => {
      if (node.id === selectedNode?.id) {
        return {
          ...node,
          selected: false,
        };
      }

      return node;
    });

    dispatch(setNodesChange(nodes));
    dispatch(deselectNodes(selectedNode?.id));
  };

  const isSingleNodeSelected = selectedNodesState.length === 1;

  const isMultipleNodesSelected = selectedNodesState.length > 1;

  if (isMultipleNodesSelected) {
    return (
      <div>
        <div>Multiple nodes selected</div>
        <div>Select your keyboard keys to do actions</div>
      </div>
    );
  }

  if (isSingleNodeSelected) {
    const selectedNode = selectedNodesState[0];

    return (
      <div className="border-2">
        <div className="flex items-center py-2 px-2 border-b-2">
          <BiArrowBack onClick={() => onDeselect(selectedNode)} />
          <p className="flex-1 text-center">Message</p>
        </div>
        <NodeDataEditor node={selectedNode} />
      </div>
    );
  }

  return (
    <div className="border-2 border-[#DBDBDB]">
      {nodes.map((node) => (
        <NodeTypeRenderer key={node.id} {...node} />
      ))}
    </div>
  );
};

export default Sidebar;
