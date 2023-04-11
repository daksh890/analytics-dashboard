import React, { useState } from "react";
import "./dashboard.scss";

import DatePicker from "../utilities/date-range/date";
import Settings from "../utilities/settings/settings";
import Heads from "../utilities/table-heads/heads/heads";
import Table from "../utilities/table/table";

function Dashboard() {
  const [show, setShow] = useState(false);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard">
        <div className="head">
          <h2>Analytics</h2>
        </div>
        <div className="settings">
          <div className="settings-tab">
            <div className="date-picker">
              <DatePicker />
            </div>
            <div className="settings-toggle">
              <Settings toggle={setShow} />
            </div>
          </div>
          {show && (
            <div className="settings-view">
              <Heads toggle={setShow} />
            </div>
          )}
        </div>
        <div className="analytics">
          <Table />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
