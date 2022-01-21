import {TasksStateType} from '../App/App';
import {
    AddTodolistActionType,
    changeTodolistEntityStatusAC,
    ChangeTodolistsEntityStatusType,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {AppActionsType, setAppStatusAC} from "../App/appReducer";
import {handleServerAppError, handleServerNetworkError, handleSetLoadingAndBlock} from "../utils/error-utils";
import {AxiosError} from "axios";

//types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
type ActionsType = ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof removeTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | AppActionsType
    | ChangeTodolistsEntityStatusType

export enum ResponseStatusCodes {
    success = 0,
    error = 1,
    captcha = 10
}

const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolist.id]: []
            }
        case 'REMOVE-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(tl => tl.id !== action.todolistId)
            }
            // let copyState = {...state}
            // delete copyState[action.todolistId];
            // return copyState;
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case "SET-TASKS":
            return {
                ...state,
                [action.todoId]: action.tasks
            }

        default:
            return state;
    }
}

//actions
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId} as const
}
export const setTasksAC = (todoId: string, tasks: Array<TaskType>) => {
    return {type: 'SET-TASKS', todoId, tasks} as const
}


//thunks
export const setTasks = (todoId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTasks(todoId)
        .then(res => {
            !res.data.error &&
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setTasksAC(todoId, res.data.items))
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err.message, dispatch)
        })
}

export const removeTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
    handleSetLoadingAndBlock(dispatch, todoId)
    todolistsAPI.deleteTask(todoId, taskId)
        .then(res => {
            if (res.data.resultCode === ResponseStatusCodes.success) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(removeTaskAC(taskId, todoId))
                dispatch(changeTodolistEntityStatusAC(todoId, 'idle'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err.message, dispatch)
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    handleSetLoadingAndBlock(dispatch, todolistId)
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === ResponseStatusCodes.success) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'))
                let task = res.data.data.item
                dispatch(addTaskAC(task))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err.message, dispatch)
        })
}

export const updateTask = (todoId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        handleSetLoadingAndBlock(dispatch, todoId)
        const state = getState()
        const task = state.tasks[todoId].find(t => t.id === taskId)
        if (task) {
            todolistsAPI.updateTask(todoId, taskId, {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...domainModel
            })
                .then(res => {
                    if (res.data.resultCode === ResponseStatusCodes.success) {
                        dispatch(updateTaskAC(taskId, domainModel, todoId))
                        dispatch(setAppStatusAC('succeeded'))
                        dispatch(changeTodolistEntityStatusAC(todoId, 'idle'))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                })
                .catch((err: AxiosError) => {
                    handleServerNetworkError(err.message, dispatch)
                })
        }
    }