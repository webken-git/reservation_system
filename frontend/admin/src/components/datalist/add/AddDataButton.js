import React from "react";
import { Link } from "react-router-dom";

const AddDataButton = () => {
  return (
    <div className="functions">
      <span className="space">
        <Link to="/data-list/add">
          <button type="button" className="modal-open-btn">
            施設追加
          </button>
        </Link>
      </span>
    </div>
  );
};

export default AddDataButton;
