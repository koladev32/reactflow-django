import { FC } from "react";
import { useDrag } from "react-dnd";
import { NodeTypes } from "../../../store/nodesSlice";
import { iconsMap } from "./constants";

export interface NodeTypeProps {
  id: string;
  label: string;
  type: NodeTypes;
}

const NodeTypeRenderer: FC<NodeTypeProps> = ({ id, type, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "node",
    item: { id, type, label },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const Icon = iconsMap[type];

  return (
    <div
      id={id}
      // @ts-ignore
      ref={drag}
      className="flex cursor-pointer w-52 mx-auto items-center text-[#727AA8]  justify-center flex-col border-2 border-[#727AA8] p-6 mt-6 hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600"
    >
      <Icon />
      <p className="pt-2">{label}</p>
    </div>
  );
};

export default NodeTypeRenderer;
