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
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
        {id: todoListId_1, title: 'what to learn', filter: 'all'},
        {id: todoListId_2, title: 'what to buy', filter: 'active'}
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "REACT", isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Chease", isDone: false},
            {id: v1(), title: "Beer", isDone: false},
        ]
    })

    const removeTask = (taskID: string, todoListID: string) => {
        // const copyState = {...tasks}
        // const filteredTasks = tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        // copyState[todoListID] = filteredTasks
        // setTasks(copyState)

        dispatchToTasks(removeTaskAC(taskID, todoListID))
    }
    const addTask = (title: string, todoListID: string) => {
        // setTasks({
        //     ...tasks,
        //     [todoListID]: [{id: v1(), title, isDone: false}, ...tasks[todoListID]]
        // })
        dispatchToTasks(addTaskAC(title, todoListID))
    }
    const changeFilter = (filter: FilterValuesType, todoListID: string) => {
        //setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
        dispatchToTodoLists(ChangeTodolistFilterAC(filter, todoListID))
    }
    const changeTaskStatus = (taskID: string, todoListID: string, isDone: boolean) => {
        // setTasks({
        //     ...tasks,
        //     [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)
        // })
        dispatchToTasks(changeTaskStatusAC(taskID, todoListID, isDone))
    }

    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        // setTasks({
        //     ...tasks,
        //     [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)
        // })
        dispatchToTasks(changeTaskTitleAC(taskID, title, todoListID))
    }

    const changeTodoListTitle = (title: string, todoListID: string) => {
        // setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl))
    dispatchToTodoLists(ChangeTodolistTitleAC(title, todoListID))
    }

    const addTodoList = (title: string) => {
        // const todoListID = v1()
        // const newTodoList: TodoListType = {
        //     id: todoListID,
        //     title,
        //     filter: 'all'
        // }
        // setTodoLists([...todoLists, newTodoList])
        // setTasks({...tasks, [todoListID]: []})
        let action = AddTodolistAC(title)
        dispatchToTasks(action)
        dispatchToTodoLists(action)
    }

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    const todoListComponents = todoLists.map(tl => {
        let tasksForRender: Array<TaskType> = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForRender = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === "completed") {
            tasksForRender = tasks[tl.id].filter(t => t.isDone)
        }
        return (
            <Grid item key={tl.id}>
            <Paper elevation={3} className="paper">
                <TodoListContainer id={tl.id}
                          title={tl.title}
                          filter={tl.filter}
                          tasks={tasksForRender}
                          removeTask={removeTask}
                          changeFilter={changeFilter}
                          addTask={addTask}
                          changeTaskStatus={changeTaskStatus}
                          removeTodoList={removeTodoList}
                          changeTaskTitle={changeTaskTitle}
                          changeTodoListTitle={changeTodoListTitle}
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
