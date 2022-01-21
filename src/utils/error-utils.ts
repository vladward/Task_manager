import { setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from '../App/appReducer'
import { Dispatch } from 'redux';
import { ResponseType } from '../api/todolists-api';
import {changeTodolistEntityStatusAC, ChangeTodolistsEntityStatusType} from "../state/todolists-reducer";

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (message: string, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}

export const handleSetLoadingAndBlock = (dispatch: ErrorUtilsDispatchType, todoId: string) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todoId, 'loading'))
}

type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType | ChangeTodolistsEntityStatusType>