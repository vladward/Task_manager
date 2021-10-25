import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

export type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>("")
    const createTask = () => {
        if (title) {
            props.addTask(title)
            setTitle("")
        }
    }
    const setAll = () => {
        return props.changeFilter("all")
    }
    const setCompleted = () => {
        return props.changeFilter("completed")
    }
    const setActive = () => {
        return props.changeFilter("active")
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            createTask()
        }
    }

    const liJsxElements = props.tasks.map(t => {
        const removeTaskById = () => {
            props.removeTask(t.id)
        }
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTaskById}>
                    Del
                </button>
            </li>
        )
    })

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input placeholder="Enter you'r task"
                       onChange={onChangeTitle}
                       value={title}
                       onKeyPress={onKeyPressEnter}
                />
                <button onClick={createTask}>+</button>
            </div>
            {liJsxElements}
            <div>
                <button onClick={setAll}>All</button>
                <button onClick={setActive}>Active</button>
                <button onClick={setCompleted}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList