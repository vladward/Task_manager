import {authAPI} from "../api/todolists-api";
import {handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {setIsLoggedInAC} from "../features/Login/authReducer";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error
        },
        setIsInitializedAC(state, action: PayloadAction<{isInitialized: boolean}>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const {setIsInitializedAC, setAppStatusAC, setAppErrorAC} = slice.actions

export type InitialStateType = typeof initialState
//
// export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR':
//             return {...state, error: action.error}
//         case "APP/SET-INITIALIZED":
//             return {...state, isInitialized: action.isInitialized}
//         default:
//             return state
//     }
// }

// export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
// export const setAppErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)
// export const setIsInitializedAC = (isInitialized: boolean) => ({type: "APP/SET-INITIALIZED", isInitialized} as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}));
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
        .finally(() => {
            dispatch(setIsInitializedAC({isInitialized: true}));
        })
}

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetInitializedActionType = ReturnType<typeof setIsInitializedAC>
//
// export type AppActionsType = SetAppStatusActionType | SetAppErrorActionType | SetInitializedActionType