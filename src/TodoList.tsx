import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";


export type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (filter: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
}

const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const createTask = () => {
        title.trim() !== '' ? props.addTask(title.trim(), props.id) : setError(true)
        setTitle("")
    }
    const setAll = () => {
        return props.changeFilter("all", props.id)
    }
    const setCompleted = () => {
        return props.changeFilter("completed", props.id)
    }
    const setActive = () => {
        return props.changeFilter("active", props.id)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value) {
            setError(false)
        }
        setTitle(e.currentTarget.value)
    }
    const onKeyPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            createTask()
        }
    }


    let allBtnClass = props.filter === 'all' ? "active-filter" : ""
    let activeBtnClass = props.filter === 'active' ? "active-filter" : ""
    let completedBtnClass = props.filter === 'completed' ? "active-filter" : ""
    const errorMessage = error
        ? <div style={{color: 'red'}}>Title is required</div>
        : null

    const liJsxElements = props.tasks.map(t => {
        const removeTaskById = () => {
            props.removeTask(t.id, props.id)
        }
        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        }
        return (
            <li className={t.isDone ? "done-task" : ''}
                key={t.id}>
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
            <h3>
                {props.title}
                <button onClick={() => props.removeTodoList(props.id)}>x</button>
            </h3>
            <div>
                <input className={error ? "error" : ''}
                       placeholder="Enter your task"
                       onChange={onChangeTitle}
                       value={title}
                       onKeyPress={onKeyPressEnter}
                />
                <button onClick={createTask} disabled={error}>+</button>
                {errorMessage}
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