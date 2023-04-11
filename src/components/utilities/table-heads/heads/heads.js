import React, { useState, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { updateReal } from "../../../../store/headerSlice";

import SingleHead from "../single-head/singleHead";

import "./heads.scss";

function Heads({ toggle }) {
  const data = useSelector((state) => state.header.tempvalue);
  const dispatch = useDispatch();
  const [temp, setTemp] = useState(data);
  useEffect(() => {
    setTemp(data);
  }, [data]);

  const handleClick = () => {
    // console.log(temp);
    dispatch(updateReal(temp));
    toggle((s) => !s);
  };
  return (
    <div className="header-wrapper">
      <div className="top-text">
        <h4>Dimensions and Metrics</h4>
      </div>

      <div className="headers-lists">
        <Droppable droppableId="headersList" direction="horizontal">
          {(provided) => (
            <div
              className="headers-list-item"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {data &&
                data.map((obj, index) => {
                  return (
                    <SingleHead
                      head={obj}
                      index={index}
                      key={obj.id}
                      setTemp={setTemp}
                    />
                  );
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>

      <div className="toggle-btn">
        <button
          className="close"
          onClick={() => {
            toggle((s) => !s);
          }}
        >
          Close
        </button>
        <button className="save" onClick={handleClick}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Heads;
