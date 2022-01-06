import React, {useEffect, useState} from 'react'
import {TodoApi} from "../api/todo-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodoApi.getTodolist()
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = "newTodolist1111111"
        TodoApi.createTodolist(title)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoId = 'f04e0bf1-c4e2-4c63-8629-6ae8c3068840'
        TodoApi.deleteTodolist(todoId)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    let title = 'React-redux-ty-znat-budesh-crutaaaas'
    let todoId = 'f04e0bf1-c4e2-4c63-8629-6ae8c3068840'
    useEffect(() => {
        TodoApi.updateTodolist({todoId, title})
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

