import React from "react";
import { GoSettings } from "react-icons/go";
import "./settings.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateTemp } from "../../../store/headerSlice";

function Settings({ toggle }) {
  const defaultvalue = useSelector((state) => state.header.defaultvalue);
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="settings-btn"
        onClick={() => {
          toggle((s) => !s);
          dispatch(updateTemp(defaultvalue));
        }}
      >
        <div className="gear-img">
          <GoSettings />
        </div>
        <div className="settings-text">Settings</div>
      </div>
    </>
  );
}

export default Settings;
