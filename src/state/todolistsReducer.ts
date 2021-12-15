import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";

export type TodolistsReducerActionTypes = RemoveTodolistType
    | AddTodolistType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType

export type RemoveTodolistType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistType = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}
export type ChangeTodolistTitleType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
export type ChangeTodolistFilterType = {
    type: "CHANGE-TODOLIST-FILTER"
    todolistId: string
    filter: FilterValuesType
}

const initialState: TodoListType[] = []

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistType => {
    return {type: "ADD-TODOLIST", title, todolistId: v1()}
}
export const ChangeTodolistTitleAC = (title: string, todolistId: string): ChangeTodolistTitleType => {
    return {type: "CHANGE-TODOLIST-TITLE", title, id: todolistId}
}
export const ChangeTodolistFilterAC = (filter: FilterValuesType, todolistId: string): ChangeTodolistFilterType => {
    return {type: "CHANGE-TODOLIST-FILTER", filter, todolistId}
}

export const todolistsReducer = (state = initialState, action: TodolistsReducerActionTypes): TodoListType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "ADD-TODOLIST": {
            return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        }
        default:
            return state
    }
}
