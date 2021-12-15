import React, {ChangeEvent} from "react";
import {TaskType, TodoListType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {
    Button,
    Checkbox,
    IconButton,
    ListItem,
    Typography
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {HighlightOff} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../state/store";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC
} from "../../state/tasksReducer";
import {
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "../../state/todolistsReducer";

type PropsType = {
    todolistId: string
}

export const TodoList = (props: PropsType) => {

    const todolist = useSelector<RootStateType, TodoListType>(state => state.todolists
        .filter(todo => todo.id === props.todolistId)[0])
    const tasks = useSelector<RootStateType, TaskType[]>(state => state.tasks[props.todolistId])
    const dispatch = useDispatch()

    const createTask = (title: string) => {
        dispatch(addTaskAC(props.todolistId, title))
    }
    const setAll = () => {
        dispatch(ChangeTodolistFilterAC('all', props.todolistId))
    }
    const setCompleted = () => {
        dispatch(ChangeTodolistFilterAC('completed', props.todolistId))
    }
    const setActive = () => {
        dispatch(ChangeTodolistFilterAC('active', props.todolistId))
    }

    const changeTodoListTitle = (title: string) => {
        dispatch(ChangeTodolistTitleAC(title, props.todolistId))
    }
    let filteredTask = tasks
    if (todolist.filter === "active") {
        filteredTask = tasks.filter(t => !t.isDone)
    }
    if (todolist.filter === "completed") {
        filteredTask = tasks.filter(t => t.isDone)
    }

    const liJsxElements = filteredTask.map(t => {
        const removeTaskById = () => {
            dispatch(removeTaskAC(t.id, props.todolistId))
        }
        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskStatusAC(t.id, props.todolistId, e.currentTarget.checked))
        }
        const changeTitle = (title: string) => {
            dispatch(changeTaskTitleAC(t.id, title, props.todolistId))
        }
        return (
            <ListItem className={t.isDone ? "done-task" : ''}
                      disableGutters
                      style={{padding: "0", display: "flex", justifyContent: "space-between", maxWidth: "260px"}}
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
                    <DeleteIcon/>
                </IconButton>
            </ListItem>
        )
    })

    return (
        <div className="todolist">
            <Typography variant="h5" align="center">
                <EditableSpan title={todolist.title} setNewTitle={changeTodoListTitle}/>
                <IconButton aria-label="delete" onClick={() => dispatch(RemoveTodolistAC(props.todolistId))}>
                    <HighlightOff fontSize={"medium"}/>
                </IconButton>
            </Typography>
            <AddItemForm addItem={createTask} initValue={"Enter task title"}/>
            {liJsxElements}
            <div className="filterButtons">
                <Button variant="contained"
                        size="small"
                        color={todolist.filter === 'all' ? "primary" : "default"}
                        onClick={setAll}>All</Button>
                <Button variant="contained"
                        size="small"
                        color={todolist.filter === 'active' ? "primary" : "default"}
                        onClick={setActive}>Active</Button>
                <Button variant="contained"
                        size="small"
                        color={todolist.filter === 'completed' ? "primary" : "default"}
                        onClick={setCompleted}>Completed</Button>
            </div>
        </div>
    )
}

export const TodoListContainer = React.memo(TodoList)