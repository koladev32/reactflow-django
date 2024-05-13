import { NodeTypes } from "../../../store/nodesSlice";
import { BsChatText } from "react-icons/bs";

export const labelsMap = {
  [NodeTypes.Text]: "Text",
};

export const iconsMap = {
  [NodeTypes.Text]: BsChatText,
};

export const nodeDefaultStates = {
  [NodeTypes.Text]: {
    data: { text: "Hello World" },
  },
};
