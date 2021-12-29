import React from 'react'
import {Provider} from "react-redux"
import {RootStateType, store} from "../../state/store"
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../state/tasksReducer";
import {todolistsReducer} from "../../state/todolistsReducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: '3', title: "Milk", isDone: true},
            {id: '4', title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as RootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}