import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan/EditableSpan";

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
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

const TodoList = (props: TodoListPropsType) => {

    const createTask = (title: string) => {
        props.addTask(title, props.id)
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

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }

    let allBtnClass = props.filter === 'all' ? "active-filter" : ""
    let activeBtnClass = props.filter === 'active' ? "active-filter" : ""
    let completedBtnClass = props.filter === 'completed' ? "active-filter" : ""

    const liJsxElements = props.tasks.map(t => {
        const removeTaskById = () => {
            props.removeTask(t.id, props.id)
        }
        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        }
        const changeTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.id)
        }
        return (
            <li className={t.isDone ? "done-task" : ''}
                key={t.id}>

                    <Checkbox
                        edge="start"
                        size="small"
                        checked={t.isDone}
                        onChange={onChangeTaskStatus}
                    />
                <EditableSpan title={t.title}
                              setNewTitle={changeTitle}/>
                <button onClick={removeTaskById}>
                    Del
                </button>
            </li>
        )
    })

    return (
        <div className="todolist">
            <h3>
                <EditableSpan title={props.title} setNewTitle={changeTodoListTitle}/>
                <button onClick={() => props.removeTodoList(props.id)}>x</button>
            </h3>
            <AddItemForm addItem={createTask}/>
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