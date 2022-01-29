import React, {useEffect} from 'react'
import s from './App.module.css';
import {TaskType} from '../api/todolists-api'
import {AppRootStateType, useAppSelector} from "../state/store";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {initializeAppTC, RequestStatusType} from "./appReducer";
import LinearProgress from "@mui/material/LinearProgress";
import {Menu} from '@material-ui/icons';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import ErrorSnackbar from "../Components/ErrorSnackbar/ErrorSnackbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {Error404Page} from "../features/Error404Page/Error404Page";
import {useDispatch, useSelector} from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import {logoutTC} from "../features/Login/authReducer";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

export const App =({demo = false}: PropsType) => {
    const dispatch = useDispatch()
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const handleLogout = () => {
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return <div className={s.circularProgress}
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar className={s.header}>

                    <div className={s.headerLeft}>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                    </div>
                    {isLoggedIn && <div className={s.headerRight}>
                        <Button color="inherit" onClick={handleLogout}>Log out</Button>
                    </div>}

                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>
            <ErrorSnackbar/>
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistsList demo={demo}/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/404" element={<Error404Page/>}/>
                    <Route path="*" element={<Navigate to="/404"/>}/>
                </Routes>
            </Container>
        </div>
    )
}
