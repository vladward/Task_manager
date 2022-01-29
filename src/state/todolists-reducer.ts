import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {AppActionsType, RequestStatusType, setAppStatusAC} from "../App/appReducer";
import {handleServerAppError, handleServerNetworkError, handleSetLoadingAndBlock} from "../utils/error-utils";
import {AxiosError} from "axios";
import {ResponseStatusCodes, setTasks, SetTasksType} from "./tasks-reducer";
import {ThunkType} from "./store";

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

//types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistsEntityStatusType = ReturnType<typeof changeTodolistEntityStatusAC>
export type ClearDataType = ReturnType<typeof clearDataAC>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export type TodolistsActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | AppActionsType
    | ChangeTodolistsEntityStatusType
    | SetTasksType
    | ClearDataType

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        case "CLEAR-DATA":
            return []
        default:
            return state;
    }
}

//actions
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', todolistId} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
}
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus} as const
}
export const clearDataAC = () => {
    return {type: 'CLEAR-DATA'} as const
}

//thunks
export const setTodolists = (): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setTodolistsAC(res.data))
            return res.data
        })
        .then(res => {
            res.forEach(tl => {
                dispatch(setTasks(tl.id))
            })
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err.message, dispatch)
        })
}

export const removeTodolistTC = (id: string): ThunkType => (dispatch) => {
    handleSetLoadingAndBlock(dispatch, id)
    todolistsAPI.deleteTodolist(id)
        .then(res => {
            if (res.data.resultCode === ResponseStatusCodes.success) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(removeTodolistAC(id))
                dispatch(changeTodolistEntityStatusAC(id, 'idle'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err.message, dispatch)
        })
}

export const updateTodolistTitle = (id: string, title: string): ThunkType => (dispatch) => {
    handleSetLoadingAndBlock(dispatch, id)
    todolistsAPI.updateTodolist(id, title)
        .then(res => {
            if (res.data.resultCode === ResponseStatusCodes.success) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTodolistTitleAC(id, title))
                dispatch(changeTodolistEntityStatusAC(id, 'idle'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err.message, dispatch)
        })
}

export const createTodolist = (title: string): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === ResponseStatusCodes.success) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(addTodolistAC(res.data.data.item))
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err.message, dispatch)
        })
}