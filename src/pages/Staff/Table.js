import React from "react";
import Layout from "../../components/Staff/Order/Layout";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Table = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Layout />
      
    </DndProvider>
  );
};

export default Table;
