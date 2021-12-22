import React, {useCallback} from "react";
import {TaskType, TodoListType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton, Typography} from "@material-ui/core";
import {HighlightOff} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../state/store";
import {addTaskAC} from "../../state/tasksReducer";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "../../state/todolistsReducer";
import {Task} from "../../Task/Task";

type PropsType = {
    todolistId: string
}

export const TodoList = React.memo(({todolistId}: PropsType) => {

    const todolist = useSelector<RootStateType, TodoListType>(state => state.todolists
        .filter(todo => todo.id === todolistId)[0])
    const tasks = useSelector<RootStateType, TaskType[]>(state => state.tasks[todolistId])
    const dispatch = useDispatch()

    const createTask = useCallback((title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, [dispatch, todolistId])
    const setAll = () => {
        dispatch(ChangeTodolistFilterAC('all', todolistId))
    }
    const setCompleted = () => {
        dispatch(ChangeTodolistFilterAC('completed', todolistId))
    }
    const setActive = () => {
        dispatch(ChangeTodolistFilterAC('active', todolistId))
    }

    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(ChangeTodolistTitleAC(title, todolistId))
    }, [todolistId])
    let filteredTask = tasks
    if (todolist.filter === "active") {
        filteredTask = tasks.filter(t => !t.isDone)
    }
    if (todolist.filter === "completed") {
        filteredTask = tasks.filter(t => t.isDone)
    }

    return (
        <div className="todolist">
            <Typography variant="h5" align="center">
                <EditableSpan title={todolist.title} setNewTitle={changeTodoListTitle}/>
                <IconButton aria-label="delete" onClick={() => dispatch(RemoveTodolistAC(todolistId))}>
                    <HighlightOff fontSize={"medium"}/>
                </IconButton>
            </Typography>
            <AddItemForm addItem={createTask} initValue={"Enter task title"}/>

            {filteredTask.map(t => <Task key={t.id}
                                         taskId={t.id}
                                         todolistId={todolistId}
            />)}

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
})