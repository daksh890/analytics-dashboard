import React, { useEffect, useState } from "react";
import "./singleHead.scss";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { updateTemp } from "../../../../store/headerSlice";

function SingleHead({ head, index, setTemp }) {
  const [active, setActive] = useState(true);
  const dispatch = useDispatch();
  const temp = useSelector((state) => state.header.tempvalue);
  return (
    <Draggable draggableId={head.item} index={index} key={head.id}>
      {(provided) => (
        <div
          className={active ? "singleHead active" : "singleHead"}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => {
            var x = temp.slice();
            if (active) {
              x.splice(index, 1);
              dispatch(updateTemp(x));
            } else {
              x.splice(index, 0, head);
              dispatch(updateTemp(x));
            }
            setTemp(x);
            setActive((s) => !s);
          }}
        >
          {head.item}
        </div>
      )}
    </Draggable>
  );
}

export default SingleHead;
