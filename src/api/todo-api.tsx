import React from 'react'
import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'd2b9a4d9-cefb-4fec-a892-1707fa6823da'
    }
})

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

type Created = ResponseType<{item: TodolistType}>

export const TodoApi = {
    getTodolist() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<Created, AxiosResponse<Created>, {title: string}>('todo-lists', {title: title})
    },
    deleteTodolist(todoId: string) {
        return instance.delete<Array<ResponseType>>(`todo-lists/${todoId}`)
    },
    updateTodolist(params: {todoId: string, title: string}) {
        return instance.put<ResponseType ,AxiosResponse<ResponseType>, {title: string}>(`todo-lists/${params.todoId}`,{title: params.title})
    }
}