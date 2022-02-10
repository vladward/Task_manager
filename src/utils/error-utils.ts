import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../App/appReducer'
import { Dispatch } from 'redux';
import { ResponseType } from '../api/todolists-api';
import {changeTodolistEntityStatusAC, ChangeTodolistsEntityStatusType} from "../state/todolists-reducer";

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleSetLoadingAndBlock = (dispatch: ErrorUtilsDispatchType, todoId: string) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: todoId, entityStatus: 'loading'}))
}

export type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType | ChangeTodolistsEntityStatusType>