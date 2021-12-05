import {useState} from "react";
import {v1} from "uuid";
import {TasksStateType, TodoListType} from "../../App";

test('remove task from todolist', () => {
    const todoListId_1 = v1()
    const todoListId_2 = v1()


    const startState = {
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

    const endState = tasksReducer(startState, removeTaskAC(taskId: string, todolistId: string))

    expect(endState[todoListId_2][2].title).toBe("Cheese")
    expect(endState[todoListId_2].length).toBe(3)
    expect(endState[todoListId_1].length).toBe(4)
})