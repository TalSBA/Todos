import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Form } from "react-bootstrap";
import "../Styles/TodoCard.css";
import { FaPlus } from "react-icons/fa";
import Filters from "./Filters";
import { VscTrash } from "react-icons/vsc";
import ModalMessage from "./ModalMessage.js";
import TodoInput from "./TodoInput";
import { IoDocumentTextOutline } from "react-icons/io5";

function TodoCard({ todoList, onDeleteList }) {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [activeCount, setActiveCount] = useState(0);
  const [variant, setVariant] = useState("all");
  const [showModal, setShowModal] = useState({ show: false, todo: {} });

  useEffect(() => {
    let count = 0;
    todos.forEach((todo) => {
      if (todo.status === "active") {
        count++;
      }
    });
    setActiveCount(count);
  }, [todos]);

  var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  function addTodo() {
    setTodos(todos.concat({ id: ID(), value: inputText, status: "active" }));
    setInputText("");
  }

  function addTodoWithEnterPress(e) {
    if (e.charCode === 13 && e.target.value.trim()) {
      addTodo();
    }
  }

  function updateTodoStatus(e, id) {
    setTodos((prevState) => {
      let todo = prevState.find((todo) => id === todo.id);
      if (todo !== undefined) {
        if (e.target.checked) {
          todo.status = "completed";
        } else {
          todo.status = "active";
        }
      }
      return [...prevState];
    });
  }
  function handleDeleteClick(id) {
    todos.forEach((todo) => {
      if (todo.id === id) {
        if (todo.status === "active") {
          setShowModal({ show: true, todo: todo });
        } else {
          deleteTodo(id);
        }
      }
    });
  }
  function handleCloseModal(res, todo) {
    setShowModal({ show: false, todo: {} });
    if (res.target.id === "ok") {
      deleteTodo(todo.id);
    }
  }

  function deleteTodo(id) {
    const newTodo = todos.filter((todo) => todo.id !== id);
    setTodos(newTodo);
  }

  let todosList;
  if (todos) {
    todosList = todos.filter((todo) => {
      return variant === "all" ? todo : todo.status === variant;
    });
  }

  return (
    <div className="c-todo-card">
      <Card>
        <Card.Header>
          <span className="title-icon">
            <IoDocumentTextOutline className="list-icon" />
            <span className="title">{todoList.title}</span>
          </span>
          <span className="trash-list">
            <VscTrash onClick={() => onDeleteList(todoList.id)} />
          </span>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {todos &&
              todosList.map((todo) => {
                return (
                  <div className="todo-row">
                    <Form.Check
                      key={todo.id}
                      type="checkbox"
                      className={`mb-2 mr-sm-2 ${
                        todo.status === "completed" ? "completed" : ""
                      }`}
                      label={todo.value}
                      checked={todo.status === "completed" ? true : false}
                      onChange={(e) => updateTodoStatus(e, todo.id)}
                    />
                    <span className="trash-icon">
                      <VscTrash onClick={() => handleDeleteClick(todo.id)} />
                    </span>
                  </div>
                );
              })}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <TodoInput
            placeholder="Add Todo"
            value={inputText}
            onEnter={addTodoWithEnterPress}
            setValue={(value) => setInputText(value)}
            onButtonClick={addTodo}
          />
          <div className="filters-countiner">
            <span>{activeCount} items left</span>
            <Filters
              variant={variant}
              onFilterChange={(value) => setVariant(value)}
            />
          </div>
        </Card.Footer>
      </Card>
      <ModalMessage
        show={showModal.show}
        onCloseModal={handleCloseModal}
        message="Are you sure you want to delete an active item :"
        title="Confirm Deletion"
        todo={showModal.todo}
      />
    </div>
  );
}

export default TodoCard;
