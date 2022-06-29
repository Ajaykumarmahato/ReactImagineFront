import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function WindowModal(props) {
    return (
      <Modal size={props.size} isOpen={props.openModal} toggle={props.toggleModal}>
        <ModalHeader toggle={props.toggleModal}>
          {props.titleModal}
        </ModalHeader>
        <ModalBody>{props.bodyModal}</ModalBody>
        {props.footerModal!=null?(
            <ModalFooter>{props.footerModal}</ModalFooter>
        ):null}
      </Modal>
    );
}
export default WindowModal;
