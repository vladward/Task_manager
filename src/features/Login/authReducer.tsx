import {Dispatch} from 'redux'
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {ResponseStatusCodes} from "../../state/tasks-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {ChangeTodolistsEntityStatusType, clearDataAC, ClearDataType} from "../../state/todolists-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../App/appReducer";

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>) {
            state.isLoggedIn = action.payload.value
        }
    }
})


export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

// type InitialStateType = typeof initialState
// export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'login/SET-IS-LOGGED-IN':
//             return {...state, isLoggedIn: action.value}
//         default:
//             return state
//     }
// }

// actions
// export const setIsLoggedInAC = (value: boolean) => {
//     return {type: 'login/SET-IS-LOGGED-IN', value} as const
// }

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === ResponseStatusCodes.success) {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === ResponseStatusCodes.success) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(clearDataAC())
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}

// types
// export type AuthActionsType =
//     ReturnType<typeof setIsLoggedInAC>
//     | SetAppStatusActionType
//     | SetAppErrorActionType
//     | ChangeTodolistsEntityStatusType
//     | ClearDataType