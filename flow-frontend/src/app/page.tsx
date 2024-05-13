"use client";

import Head from "next/head";
import FlowZone from "../features/flow";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ReactFlowProvider } from "reactflow";
import { NodeTypes } from "../store/nodesSlice";

function Flow() {
  const nodes = [
    {
      id: NodeTypes.Text,
      label: "Message",
      type: NodeTypes.Text,
    },
  ];

  return (
    <div
      style={{
        height: " 100%",
        width: "100%",
      }}
    >
      <Head>
        <title>Flowbuilder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          height: " 100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <DndProvider backend={HTML5Backend}>
          <ReactFlowProvider>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "3fr 1fr",
                gridAutoRows: "1fr",
                flex: 1,
              }}
            >
              <FlowZone />
              <Sidebar nodes={nodes} />
            </div>
          </ReactFlowProvider>
        </DndProvider>
      </div>
    </div>
  );
}

export default Flow;
