import {TasksStateType} from "../../App";

type removeTasksType = {
    type: "REMOVE-TASKS"
    taskId: string
    todoListID: string
}

type TasksActionType = removeTasksType

export const tasksReducer = (state: TasksStateType, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASKS": {
            let copy = {...state}
            return {...copy, [action.todoListID]: copy[action.todoListID].filter(t => t.id !== action.taskId)}
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListID: string): removeTasksType => {
    return {type: "REMOVE-TASKS", taskId, todoListID} as const
}