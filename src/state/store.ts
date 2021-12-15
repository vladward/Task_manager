import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
export const store = createStore(rootReducer)

export type RootStateType = ReturnType<typeof rootReducer>