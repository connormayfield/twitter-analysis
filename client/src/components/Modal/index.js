import React from "react";

const Modal = props => {
    return(
        <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" onClick = {props.closedHandler}>&times;</span>
              </button>
            </div>
            <div class="modal-body">
              {props.children}
            </div>
          </div>
        </div>
      </div>       
    )
}

export default Modal;