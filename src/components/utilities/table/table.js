import React, { useEffect, useState } from "react";
import { Loader } from "rsuite";
import { FaFilter } from "react-icons/fa";
import "./table.scss";
import { useSelector } from "react-redux";
import { createTableData } from "./createTable";
import { filterData } from "./createFilter";
import Filter from "./filter/filter";

function Table() {
  const state = useSelector((state) => state);
  const headers = state.header.realvalue;
  const apps = state.app.data;
  const tabledata = state.table.data;
  const istableLoading = state.table.isLoading;
  const isTable = state.table.isTable;
  const isError = state.table.isError;
  const [showFilter, setShowFilter] = useState(false);
  const [filterprop, setfilterProp] = useState([]);
  const [id, setId] = useState();
  const [tableRows, setTableRows] = useState(null);
  const [filter, setFilter] = useState(null);
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    function fat() {
      var data = createTableData(headers, apps.data, tabledata.data);
      setTableRows(data.data);
      setDefaultData(data.data);
      setFilter(data.filter);
    }
    if (apps && tabledata) {
      fat();
    }
  }, [tabledata]);

  const handleFilter = (e) => {
    setId(e.target.parentNode.id);
    if (id) {
      console.log(id);
      var [header, index] = id.split(",");
      var min = filter[header].min;
      var max = filter[header].max;
      setfilterProp([id, min, max]);
      setShowFilter(true);
    }
  };
  const filteredData = (filterRange, id) => {
    var x = filterData(tableRows, id, filterRange[0], filterRange[1]);
    console.log(x);
    setTableRows(x);
  };

  if (istableLoading) {
    return (
      <div className="table-wrapper">
        <Loader content="Table Loading" vertical size="lg" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="table-error">
        <h3>Hey! Something's off!</h3>
        <h3>We could not display the given data.</h3>
        <p>Try changing filter settings or selecting different data.</p>
      </div>
    );
  }

  return isTable ? (
    <div className="table-wrapper">
      {showFilter && (
        <Filter
          id={filterprop[0]}
          min={filterprop[1]}
          max={filterprop[2]}
          toggle={setShowFilter}
          filteredData={filteredData}
          data={defaultData}
          setTableRows={setTableRows}
        />
      )}
      <div className="table-data">
        <table>
          <tbody>
            <tr>
              <th>
                <div className="head">Date</div>
              </th>
              <th>
                <div className="head">
                  App
                  <div>
                    <h4>420</h4>
                  </div>
                </div>
              </th>
              {headers.map((obj, idx) => {
                return (
                  <th key={idx}>
                    <div className="head">
                      <div
                        onClick={handleFilter}
                        style={{
                          width: "2rem",
                          height: "2rem",
                          cursor: "pointer",
                        }}
                      >
                        <FaFilter id={[obj.id, idx]} />
                      </div>
                      {obj.item}
                      <div>
                        <h4>{obj.head}</h4>
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          </tbody>
          <tbody>
            {tableRows &&
              tableRows.map((obj, key) => {
                return (
                  <tr key={key}>
                    {obj.map((item, idx) => {
                      return <td key={idx}>{item}</td>;
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Table;
