import React, { useState } from "react";
import { CardColumns, Col, Container, Row } from "react-bootstrap";

import TodoCard from "../Components/TodoCard";
import TodoInput from "../Components/TodoInput";
import "../Styles/Todos.css";

function Todos(props) {
  const [lists, setLists] = useState([]);
  const [inputText, setInputText] = useState("");

  var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  function addListWithEnterPress(e) {
    if (e.charCode === 13 && e.target.value.trim()) {
      addList();
    }
  }

  function addList() {
    setLists(lists.concat({ id: ID(), title: inputText, todos: [] }));
    setInputText("");
  }

  function deleteList(id) {
    const newListsArr = lists.filter((list) => list.id !== id);
    setLists(newListsArr);
  }
  return (
    <Container fluid className="p-todos">
        <h1>Todos</h1>
        <TodoInput
          placeholder="Add Todo List"
          value={inputText}
          setValue={(value) => setInputText(value)}
          onEnter={addListWithEnterPress}
          onButtonClick={addList}
        />
      <Row>
        {lists &&
          lists.map((todoList) => {
            return (
              <Col lg={4} md={2}>
                <TodoCard todoList={todoList} onDeleteList={deleteList} />
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}

export default Todos;
