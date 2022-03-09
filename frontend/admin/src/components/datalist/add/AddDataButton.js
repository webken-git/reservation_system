import React from "react";
import { Link } from "react-router-dom";

const AddDataButton = () => {
  return (
    <Link to="/data-list/add">
      <button type="button" className="modal-open-btn">
        施設追加
      </button>
    </Link>
  );
};

export default AddDataButton;
