import React, { useState } from "react";
import { DateRangePicker } from "rsuite";
import { useDispatch } from "react-redux";
import { fetchTable } from "../../../store/tableSlice";

import "./date.scss";

function DatePicker() {
  const [date, setDate] = useState([]);
  const dispatch = useDispatch();
  const handleClose = () => {
    const startDate =
      date && date[0] ? date[0].toISOString().slice(0, 10) : null;
    const endDate = date && date[1] ? date[1].toISOString().slice(0, 10) : null;
    dispatch(fetchTable([startDate, endDate]));
  };
  return (
    <>
      <DateRangePicker
        size="md"
        value={date}
        onChange={setDate}
        appearance="default"
        placeholder="Select Range"
        format="yyyy-MM-dd"
        defaultCalendarValue={[new Date("2021-06-01"), new Date("2021-06-30")]}
        showOneCalendar
        style={{ width: "12rem" }}
        onClose={handleClose}
      />
    </>
  );
}

export default DatePicker;
