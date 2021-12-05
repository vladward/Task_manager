import {useState} from "react";
import {v1} from "uuid";
import {TasksStateType, TodoListType} from "../../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasksReducer";

test('remove task from todolist', () => {
    const todoListId_1 = v1()
    const todoListId_2 = v1()


    const startState: TasksStateType = {
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "REACT", isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Cheese", isDone: false},
            {id: v1(), title: "Beer", isDone: false},
        ]
    }

    const ID = startState[todoListId_2][1].id

    const endState = tasksReducer(startState, removeTaskAC(ID, todoListId_2))

    expect(endState[todoListId_2][1].title).toBe("Cheese")
    expect(endState[todoListId_2].length).toBe(3)
    expect(endState[todoListId_1].length).toBe(4)
})

test('add task to todolist', () => {
    const todoListId_1 = v1()
    const todoListId_2 = v1()


    const startState: TasksStateType = {
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "REACT", isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Cheese", isDone: false},
            {id: v1(), title: "Beer", isDone: false},
        ]
    }

    const title = 'WEB'

    const ID = startState[todoListId_2][1].id

    const endState = tasksReducer(startState, addTaskAC(ID, todoListId_1, title))
    console.log(startState)

    expect(endState[todoListId_1][0].title).toBe("WEB")
    expect(endState[todoListId_2].length).toBe(4)
    expect(endState[todoListId_1].length).toBe(5)
})

test('change Task Status', () => {
    const todoListId_1 = v1()
    const todoListId_2 = v1()


    const startState: TasksStateType = {
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "REACT", isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Cheese", isDone: false},
            {id: v1(), title: "Beer", isDone: false},
        ]
    }

    const ID = startState[todoListId_1][0].id

    const endState = tasksReducer(startState, changeTaskStatusAC(ID, todoListId_1, false))

    expect(endState[todoListId_1][0].isDone).toBe(false)
    expect(endState[todoListId_2][0].isDone).toBe(true)
    expect(endState[todoListId_2].length).toBe(4)
    expect(endState[todoListId_1].length).toBe(4)
    console.log(endState)
})

test('change Task title', () => {
    const todoListId_1 = v1()
    const todoListId_2 = v1()


    const startState: TasksStateType = {
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "REACT", isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Cheese", isDone: false},
            {id: v1(), title: "Beer", isDone: false},
        ]
    }

    const newTitle = 'Vodka'
    const ID = startState[todoListId_2][1].id

    const endState = tasksReducer(startState, changeTaskTitleAC(ID, todoListId_2, newTitle))

    expect(endState[todoListId_1][1].title).toBe("CSS")
    expect(endState[todoListId_2][1].title).toBe("Vodka")
    expect(endState[todoListId_2].length).toBe(4)
    expect(endState[todoListId_1].length).toBe(4)
    console.log(endState)
})