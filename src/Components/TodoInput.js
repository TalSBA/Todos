import React from "react";
import "../Styles/TodoInput.css";
import { Form, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

function TodoInput({ placeholder, value, setValue, onEnter, onButtonClick }) {
  return (
    <div className="c-todo-input">
      <Form.Control
        type="text"
        className="mb-2 mr-sm-2 input-text"
        placeholder={placeholder}
        onKeyPress={(e) => onEnter(e)}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <Button className="mb-2" onClick={onButtonClick}>
        <FaPlus />
      </Button>
    </div>
  );
}

export default TodoInput;
