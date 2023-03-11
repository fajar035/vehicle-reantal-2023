import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function index({ show, handleModal, handleAction, title, body }) {
  return (
    <>
      <Modal show={show} onHide={show} className="modal" centered>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button className="btnModalYes" onClick={handleAction}>
            {title}
          </Button>
          <Button className="btnModalNo" onClick={handleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default index;
