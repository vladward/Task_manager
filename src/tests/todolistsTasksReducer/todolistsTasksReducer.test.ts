import {TasksStateType} from "../../App/App";
import {TodolistType} from "../../api/todolists-api";
import {addTodolistAC, todolistsReducer} from "../../state/todolists-reducer";
import {tasksReducer} from "../../state/tasks-reducer";


test("id's should be equal", () => {

    const startState: TasksStateType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = addTodolistAC({
        title: 'wow',
        id: '123',
        order: 0,
        addedDate: ''
    })

    const endState = tasksReducer(startState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endState)
    const idsFromTasks = keys[0]
    const idsFromTodolists = endTodolistsState[0].id

    expect(idsFromTasks).toBe(action.todolist.id)
    expect(idsFromTodolists).toBe(action.todolist.id)
    console.log(endState)
    console.log(endTodolistsState)
})