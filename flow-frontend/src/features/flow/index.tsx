import {
  Background,
  BackgroundVariant,
  MiniMap,
  NodeTypes as FlowNodeTypes,
  ReactFlow,
  DefaultEdgeOptions,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { useDrop } from "react-dnd";
import { onDrop } from "../../store/nodesSlice";
import { selectNodes, setNodesChange } from "../../store/nodesSlice";
import { onEdgesChange, selectEdges, onConnect } from "../../store/edgesSlice";
import { setSelectedNodes } from "../../store/selectedNodesSlice";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { TextNode } from "./nodes";

const nodeTypes: FlowNodeTypes = {
  text: TextNode,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const FlowZone = () => {
  const nodes = useAppSelector(selectNodes);
  const edges = useAppSelector(selectEdges);
  const dispatch = useAppDispatch();

  const [, dropRef] = useDrop({
    accept: "node",
    drop: (item, monitor) => {
      dispatch(onDrop({ item, monitor }));
    },
  });

  const onNodesChange = (changes: any) => {
    dispatch(setNodesChange(applyNodeChanges(changes, nodes)));
  };

  const onConnectFunction = (params: any) => {
    dispatch(onConnect(params));
  };

  return (
    <div>
      <ReactFlow
        // @ts-ignore
        ref={dropRef}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnectFunction}
        onNodesDelete={() => {
          setSelectedNodes([]);
        }}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <MiniMap nodeColor={"lightblue"} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowZone;
