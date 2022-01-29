import {TasksActionsType, tasksReducer} from './tasks-reducer';
import {TodolistsActionsType, todolistsReducer} from './todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, { ThunkAction } from 'redux-thunk'
import {AppActionsType, appReducer} from "../App/appReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AuthActionsType, authReducer} from "../features/Login/authReducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type ReducersActionTypes = AppActionsType | AuthActionsType | TodolistsActionsType | TasksActionsType
export type ThunkType = ThunkAction<void, AppRootStateType, unknown, ReducersActionTypes>

// @ts-ignore
window.store = store;