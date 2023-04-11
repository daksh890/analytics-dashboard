import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { updateTemp } from "./store/headerSlice";
import { fetchApps } from "./store/appSlice";

import Home from "./components/home/home";
import Dashboard from "./components/dashboard/dashboard";
import Header from "./components/header/header";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchApps());
  }, [dispatch]);

  const header = useSelector((state) => state.header.tempvalue);
  const onDragEnd = (result) => {
    const { source, destination } = result;
    // console.log(header);
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    else {
      const oldidx = source.index;
      const newidx = destination.index;
      const item = header[oldidx];
      var temp = header.slice();
      temp.splice(oldidx, 1);
      temp.splice(newidx, 0, item);
      // console.log(temp);
      dispatch(updateTemp(temp));
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Dashboard />} />
        </Routes>
      </div>
    </DragDropContext>
  );
}

export default App;
