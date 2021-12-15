import React, {useReducer, useState} from 'react';
import './App.css';
import {TodoListContainer} from "./TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC, ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./tests/todo_reducer_tests/todolistsReducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./tests/tasks_reducer_tests/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const todoLists = useSelector<RootStateType, TodoListType[]>(state => state.todolists)
    // const tasks = useSelector<RootStateType, TasksStateType>(state => state.tasks)
    let dispatch = useDispatch()

    // const removeTask = (taskID: string, todoListID: string) => {
    //     // const copyState = {...tasks}
    //     // const filteredTasks = tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
    //     // copyState[todoListID] = filteredTasks
    //     // setTasks(copyState)
    //
    //     dispatch(removeTaskAC(taskID, todoListID))
    // }
    // const addTask = (title: string, todoListID: string) => {
    //     // setTasks({
    //     //     ...tasks,
    //     //     [todoListID]: [{id: v1(), title, isDone: false}, ...tasks[todoListID]]
    //     // })
    //     dispatch(addTaskAC(title, todoListID))
    // }
    // const changeFilter = (filter: FilterValuesType, todoListID: string) => {
    //     //setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
    //     dispatch(ChangeTodolistFilterAC(filter, todoListID))
    // }
    // const changeTaskStatus = (taskID: string, todoListID: string, isDone: boolean) => {
    //     // setTasks({
    //     //     ...tasks,
    //     //     [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)
    //     // })
    //     dispatch(changeTaskStatusAC(taskID, todoListID, isDone))
    // }

    // const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
    //     // setTasks({
    //     //     ...tasks,
    //     //     [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)
    //     // })
    //     dispatch(changeTaskTitleAC(taskID, title, todoListID))
    // }

    // const changeTodoListTitle = (title: string, todoListID: string) => {
    //     // setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl))
    //     dispatch(ChangeTodolistTitleAC(title, todoListID))
    // }

    const addTodoList = (title: string) => {
        // const todoListID = v1()
        // const newTodoList: TodoListType = {
        //     id: todoListID,
        //     title,
        //     filter: 'all'
        // }
        // setTodoLists([...todoLists, newTodoList])
        // setTasks({...tasks, [todoListID]: []})
        dispatch(AddTodolistAC(title))
    }

    // const removeTodoList = (todoListID: string) => {
    //     // setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
    //     // delete tasks[todoListID]
    //     dispatch(RemoveTodolistAC(todoListID))
    // }

    const todoListComponents = todoLists.map(tl => {
        // let tasksForRender: Array<TaskType> = tasks[tl.id]
        // if (tl.filter === "active") {
        //     tasksForRender = tasks[tl.id].filter(t => !t.isDone)
        // }
        // if (tl.filter === "completed") {
        //     tasksForRender = tasks[tl.id].filter(t => t.isDone)
        // }
        return (
            <Grid item key={tl.id}>
            <Paper elevation={3} className="paper">
                <TodoListContainer key={tl.id} todolistId={tl.id}

                />
            </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="sticky">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant="outlined">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm addItem={addTodoList} initValue="Enter todolist name"/>
                </Grid>
                <Grid container spacing={2}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    )
}

export default App;
