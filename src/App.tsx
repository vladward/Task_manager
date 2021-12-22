import React, {useCallback} from 'react';
import './App.css';
import {TodoListContainer} from "./Components/TodoList/TodoList";
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddTodolistAC} from "./state/todolistsReducer";
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
    let dispatch = useDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
    },[dispatch])

    const todoListComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={3} className="paper">
                    <TodoListContainer key={tl.id}
                                       todolistId={tl.id}
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
