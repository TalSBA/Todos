import { Button, Modal } from "react-bootstrap";

function ModalMessage({ show, onCloseModal, message, title, todo }) {
  return (
    <>
      <Modal
        show={show}
        onHide={(e) => onCloseModal(e, todo)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message + " " + todo.value + "?"}</Modal.Body>
        <Modal.Footer>
          <Button id="cancle" variant="secondary" onClick={(e) => onCloseModal(e, todo)}>
            Cancle
          </Button>
          <Button id="ok" variant="primary" onClick={(e) => onCloseModal(e, todo)}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalMessage;
