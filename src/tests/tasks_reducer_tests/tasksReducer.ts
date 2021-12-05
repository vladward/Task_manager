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

type TasksActionType = removeTasksType | addTasksType

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