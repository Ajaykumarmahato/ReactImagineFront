import React, { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class WindowModal extends Component {
  render() {
    return (
      <Modal isOpen={this.props.openModal} toggle={this.props.toggleModal}>
        <ModalHeader toggle={this.props.toggleModal}>
          {this.props.titleModal}
        </ModalHeader>
        <ModalBody>{this.props.bodyModal}</ModalBody>
        {this.props.footerModal!=null?(
            <ModalFooter>{this.props.footerModal}</ModalFooter>
        ):null}
      </Modal>
    );
  }
}
export default WindowModal;
