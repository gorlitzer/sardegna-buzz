import React from "react";

import "./style.scss";

const Modal = ({ title, show, children }) => {
  if (!show) {
    return null;
  }
  return (
    <div className="modal-component" /* onClick={props.onClose} */>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{title}</h4>
        </div>
        <section className="modal-body">{children}</section>
        <div className="modal-footer">
          <button className="button" /* onClick={props.onClose} */>
            close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
