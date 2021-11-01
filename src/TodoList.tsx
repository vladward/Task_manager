import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";


export type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
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


    let allBtnClass = props.filter === 'all' ? "active-filter" : ""
    let activeBtnClass = props.filter === 'active' ? "active-filter" : ""
    let completedBtnClass = props.filter === 'completed' ? "active-filter" : ""

    const liJsxElements = props.tasks.map(t => {
        const removeTaskById = () => {
            props.removeTask(t.id)
        }
        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked)
        }
        return (
            <li key={t.id}>
                <input type="checkbox"
                       checked={t.isDone}
                onChange={onChangeTaskStatus}
                />
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
                <button className={allBtnClass} onClick={setAll}>All</button>
                <button className={activeBtnClass} onClick={setActive}>Active</button>
                <button className={completedBtnClass} onClick={setCompleted}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList