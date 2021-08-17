import React from "react";

import "./style.scss";

const Modal = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal-component" onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">MODAL HEADER</h4>
        </div>
        <div className="modal-body">
          {/*   {props.renderBodyComponent()} */}
        </div>
        <div className="modal-footer">
          <button className="button" onClick={props.onClose}>close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;