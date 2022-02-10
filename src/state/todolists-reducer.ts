import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {RequestStatusType, setAppStatusAC} from "../App/appReducer";
import {handleServerAppError, handleServerNetworkError, handleSetLoadingAndBlock} from "../utils/error-utils";
import {AxiosError} from "axios";
import {ResponseStatusCodes, setTasks} from "./tasks-reducer";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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
// export type TodolistsActionsType = RemoveTodolistActionType
//     | AddTodolistActionType
//     | SetTodolistsActionType
//     | ReturnType<typeof changeTodolistTitleAC>
//     | ReturnType<typeof changeTodolistFilterAC>
//     // | AppActionsType
//     | ChangeTodolistsEntityStatusType
//     | SetTasksType
//     | ClearDataType


const slice = createSlice({
    name: "todolists",
    initialState: initialState,
    reducers: {
        setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        },
        clearDataAC(state) {
            state = []
        },
    }
})

export const todolistsReducer = slice.reducer
export const {
    setTodolistsAC,
    addTodolistAC,
    removeTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    changeTodolistEntityStatusAC,
    clearDataAC
} = slice.actions

//     (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
//     switch (action.type) {
//         case 'REMOVE-TODOLIST':
//             return state.filter(tl => tl.id !== action.todolistId)
//         case 'ADD-TODOLIST':
//             return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
//         case 'CHANGE-TODOLIST-TITLE':
//             return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
//         case 'CHANGE-TODOLIST-FILTER':
//             return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
//         case 'SET-TODOLISTS':
//             return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
//         case "CHANGE-TODOLIST-ENTITY-STATUS":
//             return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
//         case "CLEAR-DATA":
//             return []
//         default:
//             return state;
//     }
// }

//actions
// export const setTodolistsAC = (todolists: Array<TodolistType>) => {
//     return {type: 'SET-TODOLISTS', todolists} as const
// }
// export const removeTodolistAC = (todolistId: string) => {
//     return {type: 'REMOVE-TODOLIST', todolistId} as const
// }
// export const addTodolistAC = (todolist: TodolistType) => {
//     return {type: 'ADD-TODOLIST', todolist} as const
// }
// export const changeTodolistTitleAC = (id: string, title: string) => {
//     return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
// }
// export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
//     return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
// }
// export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
//     return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus} as const
// }
// export const clearDataAC = () => {
//     return {type: 'CLEAR-DATA'} as const
// }

//thunks
export const setTodolists = () => (dispatch: any) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            dispatch(setTodolistsAC({todolists: res.data}))
            return res.data
        })
        .then(res => {
            res.forEach(tl => {
                dispatch(setTasks(tl.id))
            })
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
    handleSetLoadingAndBlock(dispatch, id)
    todolistsAPI.deleteTodolist(id)
        .then(res => {
            if (res.data.resultCode === ResponseStatusCodes.success) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(removeTodolistAC({todolistId: id}))
                dispatch(changeTodolistEntityStatusAC({id, entityStatus: 'idle'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}

export const updateTodolistTitle = (id: string, title: string) => (dispatch: Dispatch) => {
    handleSetLoadingAndBlock(dispatch, id)
    todolistsAPI.updateTodolist(id, title)
        .then(res => {
            if (res.data.resultCode === ResponseStatusCodes.success) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(changeTodolistTitleAC({id, title}))
                dispatch(changeTodolistEntityStatusAC({id, entityStatus: 'idle'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}

export const createTodolist = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === ResponseStatusCodes.success) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(addTodolistAC({todolist: res.data.data.item}))
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}