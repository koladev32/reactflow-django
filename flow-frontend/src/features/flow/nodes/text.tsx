import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { useAppSelector } from "../../../hooks";
import { TextNodeData, selectNodeById } from "../../../store/nodesSlice";
import { selectEdges } from "../../../store/edgesSlice";
import { BsChatText } from "react-icons/bs";
import { AppState } from "@/store/store";

const TextNode: FC<NodeProps<TextNodeData>> = ({ id }) => {
  const edges = useAppSelector(selectEdges);
  const data = useAppSelector((state: AppState) => selectNodeById(state, id));

  const allowSourceConnection = (id: string) => {
    const isAlreadyConnected = edges.some((e: { source: any; target: any }) => {
      const { source, target } = e;

      if (source === id && target) {
        return true;
      }

      return false;
    });

    return !isAlreadyConnected;
  };

  const connection = allowSourceConnection(id);

  return (
    <>
      <Handle type="target" position={Position.Left} id="target" />
      <div
        className={`min-w-[200px] shadow-xl border-2 rounded-xl ${
          data?.selected ? "border-[#727AA8]" : ""
        }`}
      >
        <div className="flex items-center  bg-[#B5EFE3] px-4 py-2 rounded-t-xl">
          <BsChatText />
          <p className="pl-2 font-semibold">Send Message</p>
        </div>
        <div className="px-4 py-2 bg-white rounded-b-xl">{data?.data.text}</div>
      </div>
      <Handle
        type="source"
        isConnectable={connection}
        isConnectableStart={connection}
        position={Position.Right}
        id="source"
      />
    </>
  );
};

export default TextNode;
