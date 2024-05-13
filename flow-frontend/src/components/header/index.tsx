import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import { selectEdges } from "../../store/edgesSlice";
import { selectNodes } from "../../store/nodesSlice";

const Header = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const edges = useAppSelector(selectEdges);
  const nodes = useAppSelector(selectNodes);
  const nodesWithNoTarget = nodes.filter((node: any) => {
    const nodeEdges = edges.filter((edge: any) => edge.source === node.id);
    return nodeEdges.length === 0;
  });

  const onSave = useCallback(() => {
    if (nodesWithNoTarget.length > 1) {
      setError("There are more than one node with no target");
      return;
    }

    setSuccess("Flow saved");
  }, [nodes, edges]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    }
  }, [success]);

  return (
    <header>
      <nav className="relative flex w-full items-center justify-center bg-[#F3F3F3] py-2">
        <div className="m-auto">
          {error && (
            <div
              className="relative py-3 px-4  leading-normal text-red-700 bg-red-100 rounded-lg text-center"
              role="alert"
            >
              <p className="text-center">Cannot save flow</p>
            </div>
          )}
          {success && (
            <div
              className="relative py-3 px-4  leading-normal text-green-700 bg-green-100 rounded-lg text-center"
              role="success"
            >
              <p className="text-center">Saved Successfully</p>
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-end px-3">
          <ul>
            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <button
                className="inline-block rounded border-2 border-[#727AA8] px-6 py-2 font-medium text-[#727AA8] transition duration-150 ease-in-out bg-white hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 "
                onClick={onSave}
              >
                Save Changes
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
