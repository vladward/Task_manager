import React from 'react'
import './App.css';
import {TaskType} from '../api/todolists-api'
import {useAppSelector} from "../state/store";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {RequestStatusType} from "./appReducer";
import LinearProgress from "@mui/material/LinearProgress";
import {Menu} from '@material-ui/icons';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import ErrorSnackbar from "../Components/ErrorSnackbar/ErrorSnackbar";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>
            <ErrorSnackbar/>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    )
}

export default App;
