import React, { useState } from "react";
import RangeSlider from "rsuite/RangeSlider";
import "./filter.scss";
import "rsuite/dist/rsuite.css";

function Filter({ id, min, max, toggle, filteredData, data, setTableRows }) {
  const [search, setSearch] = useState([min, max]);
  //   console.log(min, max);
  const handleChange = (value) => {
    console.log(value[0], value[1]);
    var x = min + (value[0] / 100) * (max - min);
    var y = min + (value[1] / 100) * (max - min);
    console.log(x, y);
    setSearch([x, y]);
  };
  return (
    <div className="filter-wrapper">
      <div className="filter">
        <p>{min}</p>
        <RangeSlider
          defaultValue={[min, max]}
          onChange={handleChange}
          style={{ width: "12rem" }}
        />
        <p>{max}</p>
      </div>
      <div className="button">
        <button
          className="close"
          onClick={() => {
            setSearch([min, max]);
            toggle((s) => !s);
            setTableRows(data);
          }}
        >
          Reset
        </button>
        <button
          onClick={() => {
            toggle((s) => !s);
            filteredData(search, id);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Filter;
