import React from "react";
import { Link } from "react-router-dom";

import "./style.scss";

const Modal = ({ title, show, children }) => {
  const titleColor = title === "SUCCESS" ? "green" : "red";

  if (!show) {
    return null;
  }
  return (
    <div className="modal-component" /* onClick={props.onClose} */>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className={`modal-title ${titleColor}`}>{title}</h2>
        </div>
        <section className="modal-body">{children}</section>
        <div className="modal-footer">
          <button className="modal-button">
            <h2>
              <Link to="/">← GO BACK</Link>
            </h2>
          </button>
          <button className="modal-button" /* onClick={props.onClose} */>
            <h2>
              <Link to="/">TRY AGAIN ⟳</Link>
            </h2>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
