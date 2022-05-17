import {
  Button,
  Checkbox,
  ControlGroup,
  InputGroup,
  Tag,
} from "@blueprintjs/core"
import { useState } from "react"
import useLocalStorage from "./useLocalStorage"
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./Footer";
import Navbar from "./Navbar";

function App() {
  const [userInput, setUserInput] = useState("")

  const [todoList, setTodoList] = useLocalStorage("todo-items", [])

  const addItem = e => {
    e.preventDefault()
    const trimmedUserInput = userInput.trim()
    if (trimmedUserInput) {
      setTodoList(existingItems => [
        ...existingItems,
        { name: trimmedUserInput, finished: false },
      ])
      setUserInput("")
    }
  }

  const toggleTask = index => {
    setTodoList(existingItems =>
      existingItems.map((item, i) =>
        index === i ? { ...item, finished: !item.finished } : item
      )
    )
  }

  const deleteTask = index => {
    setTodoList(existingItems => existingItems.filter((item, i) => index !== i))
  }

  return (
    <div className="App">
        <Navbar/>
      <div className="container">
        <div className="row">
        <h2 className="mt-4 mb-3 fw-bold">Todo List <a href="#">Back to home</a></h2>
        <form onSubmit={addItem} className="mb-4">
          <ControlGroup fill={true} vertical={false}>
            <InputGroup
              placeholder="Add a task..."
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
            />
            <Button type="submit" intent="success">
              Add todo
            </Button>
          </ControlGroup>
        </form>
        <div className="items-list">
          {todoList.map((item, index) => (
            <Tag
              key={index + item.name}
              large
              minimal
              multiline
              onRemove={() => deleteTask(index)}
            >
              <Checkbox
                checked={item.finished}
                onChange={() => toggleTask(index)}
              >
                <span className={item.finished ? "finished" : ""}>
                  {item.name}
                </span>
              </Checkbox>
            </Tag>
          ))}
        </div>
        </div>
      <Footer/>
      </div>
    </div>
  )
}

export default App
