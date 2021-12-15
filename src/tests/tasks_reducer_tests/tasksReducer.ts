import {v1} from "uuid";
import {AddTodolistType, RemoveTodolistType} from "../todo_reducer_tests/todolistsReducer";
import {TasksStateType, TaskType} from "../../App";

export type removeTasksType = {
    type: "REMOVE-TASKS"
    taskId: string
    todoListID: string
}
export type addTasksType = {
    type: "ADD-TASKS"
    todoListID: string
    title: string
}
export type changeTasksStatusType = {
    type: "CHANGE-TASKS-STATUS",
    taskId: string
    todoListID: string
    status: boolean
}
export type changeTasksTitleType = {
    type: "CHANGE-TASKS-TITLE",
    taskId: string
    todoListID: string
    newTitle: string
}

const initialState: TasksStateType = {}

type TasksActionType = removeTasksType
    | addTasksType
    | changeTasksStatusType
    | changeTasksTitleType
    | AddTodolistType
    | RemoveTodolistType

export const tasksReducer = (state = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASKS": {
            return {...state, [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskId)}
        }
        case "ADD-TASKS": {
            // let copy = {...state}
            // copy[action.todoListID] = [{id: v1(), title: action.title, isDone: false}, ...copy[action.todoListID]]
            // return copy
            return {...state, [action.todoListID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todoListID]]}
        }
        case "CHANGE-TASKS-STATUS": {
            return {...state, [action.todoListID]: state[action.todoListID]
                    .map(t => t.id === action.taskId ? {...t, isDone: action.status} : t)}
        }
        case "CHANGE-TASKS-TITLE": {
            return {...state, [action.todoListID]: state[action.todoListID]
                    .map(t => t.id === action.taskId ? {...t, title: action.newTitle} : t)}
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolistId]: []}
        }
        case "REMOVE-TODOLIST": {
            let {[action.id]: [], ...copy} = {...state}
            return copy
        }
        default:
            return state
        // throw new Error('i not understand this type')
    }
}

export const removeTaskAC = (taskId: string, todoListID: string): removeTasksType => {
    return {type: "REMOVE-TASKS", taskId, todoListID} as const
}
export const addTaskAC = (todoListID: string, title: string): addTasksType => {
    return {type: "ADD-TASKS", todoListID, title} as const
}
export const changeTaskStatusAC = (taskId: string, todoListID: string, status: boolean): changeTasksStatusType => {
    return {type: "CHANGE-TASKS-STATUS", taskId, todoListID, status} as const
}
export const changeTaskTitleAC = (taskId: string, todoListID: string, newTitle: string): changeTasksTitleType => {
    return {type: "CHANGE-TASKS-TITLE", taskId, todoListID, newTitle} as const
}