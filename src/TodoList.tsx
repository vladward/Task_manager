import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton, ListItem, ListItemIcon, Typography} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {HighlightOff} from "@material-ui/icons";

export type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (filter: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, todoListID: string, isDone: boolean) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export const TodoList = (props: TodoListPropsType) => {

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

    const liJsxElements = props.tasks.map(t => {
        const removeTaskById = () => {
            props.removeTask(t.id, props.id)
        }
        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, props.id, e.currentTarget.checked)
        }
        const changeTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.id)
        }
        return (
            <ListItem className={t.isDone ? "done-task" : ''}
                      disableGutters
                      style={{ padding: "0", display: "flex", justifyContent: "space-between", maxWidth: "260px" }}
                      divider
                key={t.id}>

                    <Checkbox
                        edge="start"
                        size="small"
                        checked={t.isDone}
                        onChange={onChangeTaskStatus}
                    />
                <EditableSpan title={t.title}
                              setNewTitle={changeTitle}/>
                <IconButton size={"small"} onClick={removeTaskById} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </ListItem>
        )
    })

    return (
        <div className="todolist">
            <Typography variant="h5" align="center">
                <EditableSpan title={props.title} setNewTitle={changeTodoListTitle}/>
                <IconButton aria-label="delete" onClick={() => props.removeTodoList(props.id)}>
                    <HighlightOff fontSize={"medium"}/>
                </IconButton>
            </Typography>
            <AddItemForm addItem={createTask} initValue={"Enter task title"}/>
            {liJsxElements}
            <div className="filterButtons">
                <Button variant="contained"
                        size="small"
                        color={props.filter === 'all' ? "primary" : "default"}
                        onClick={setAll}>All</Button>
                <Button variant="contained"
                        size="small"
                        color={props.filter === 'active' ? "primary" : "default"}
                        onClick={setActive}>Active</Button>
                <Button variant="contained"
                        size="small"
                        color={props.filter === 'completed' ? "primary" : "default"}
                        onClick={setCompleted}>Completed</Button>
            </div>
        </div>
    )
}

export const TodoListContainer = React.memo(TodoList)