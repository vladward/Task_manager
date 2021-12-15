import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "../tests/todo_reducer_tests/todolistsReducer";
import {tasksReducer} from "../tests/tasks_reducer_tests/tasksReducer";

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
export const store = createStore(rootReducer)

export type RootStateType = ReturnType<typeof rootReducer>