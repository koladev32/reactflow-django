import { ChangeEvent, FC, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../../../hooks";
import {
  TextNode,
  selectNodeById,
  changeNodeData,
} from "../../../../store/nodesSlice";
import { AppState } from "@/store/store";

const TextNodeDataEditor: FC<TextNode> = ({ id, type }) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: AppState) => selectNodeById(state, id));

  const onTextAreaChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (!state) return;

      dispatch(
        changeNodeData({
          ...state,
          type,
          data: { ...state.data, [e.target.name]: e.target.value },
        })
      );
    },
    [state, type, changeNodeData]
  );

  return (
    <div className="p-8 border-b-2">
      <label className="block mb-2 font-semibold">Text</label>
      <textarea
        className="w-full h-32 p-2 border-2 border-[#f3f3f3] rounded-md"
        name="text"
        value={state?.data.text}
        onChange={onTextAreaChange}
      />
    </div>
  );
};

export default TextNodeDataEditor;
