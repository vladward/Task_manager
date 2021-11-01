import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import { v1 } from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"


let tasksState = [
    {id: v1(), title: "HTML", isDone: true},
    {id: v1(), title: "CSS", isDone: true},
    {id: v1(), title: "JS", isDone: false},
    {id: v1(), title: "REACT", isDone: false},
]

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>(tasksState)
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID))
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let tasksForRender = tasks
    if (filter === "active") {
        tasksForRender = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasksForRender = tasks.filter(t => t.isDone === true)
    }

    return (
        <div className="App">
            <TodoList tasks={tasksForRender}
                      title={"What to learn"}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      filter={filter}
            />
            {/*<TodoList tasks={tasksForRender}*/}
            {/*          title={"What to buy"}*/}
            {/*          removeTask={removeTask}*/}
            {/*          changeFilter={changeFilter}*/}
            {/*          addTask={addTask}*/}
            {/*          filter={filter}*/}
            {/*/>*/}
        </div>
    );
}

    export default App;
