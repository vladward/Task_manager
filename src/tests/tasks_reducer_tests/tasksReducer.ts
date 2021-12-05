import {TasksStateType} from "../../App";
import {v1} from "uuid";

type removeTasksType = {
    type: "REMOVE-TASKS"
    taskId: string
    todoListID: string
}
type addTasksType = {
    type: "ADD-TASKS"
    taskId: string
    todoListID: string
    title: string
}
type changeTasksStatusType = {
    type: "CHANGE-TASKS-STATUS",
    taskId: string
    todoListID: string
    status: boolean
}
type changeTasksTitleType = {
    type: "CHANGE-TASKS-TITLE",
    taskId: string
    todoListID: string
    newTitle: string
}

type TasksActionType = removeTasksType | addTasksType | changeTasksStatusType | changeTasksTitleType | AddTodolistType

export const tasksReducer = (state: TasksStateType, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASKS": {
            let copy = {...state}
            return {...copy, [action.todoListID]: copy[action.todoListID].filter(t => t.id !== action.taskId)}
        }
        case "ADD-TASKS": {
            let copy = {...state}
            copy[action.todoListID] = [{id: v1(), title: action.title, isDone: false}, ...copy[action.todoListID]]
            return copy
        }
        case "CHANGE-TASKS-STATUS": {
            let copy = {...state}
            return {...copy, [action.todoListID]: copy[action.todoListID]
                        .map(t => t.id === action.taskId ? {...t, isDone: action.status} : t)}
        }
        case "CHANGE-TASKS-TITLE": {
            let copy = {...state}
            return {...copy, [action.todoListID]: copy[action.todoListID]
                        .map(t => t.id === action.taskId ? {...t, title: action.newTitle} : t)}
        }
        case "ADD-TODOLIST": {
            let copy = {...state}
            copy[action.todolistId] = []
            return copy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListID: string): removeTasksType => {
    return {type: "REMOVE-TASKS", taskId, todoListID} as const
}
export const addTaskAC = (taskId: string, todoListID: string, title: string): addTasksType => {
    return {type: "ADD-TASKS", taskId, todoListID, title} as const
}
export const changeTaskStatusAC = (taskId: string, todoListID: string, status: boolean): changeTasksStatusType => {
    return {type: "CHANGE-TASKS-STATUS", taskId, todoListID, status} as const
}
export const changeTaskTitleAC = (taskId: string, todoListID: string, newTitle: string): changeTasksTitleType => {
    return {type: "CHANGE-TASKS-TITLE", taskId, todoListID, newTitle} as const
}