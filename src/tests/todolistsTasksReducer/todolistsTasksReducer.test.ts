import {TasksStateType, TodoListType} from "../../App";
import {tasksReducer} from "../../state/tasksReducer";
import {AddTodolistAC, todolistsReducer} from "../../state/todolistsReducer";

test("id's should be equal", () => {

    const startState: TasksStateType = {}
    const startTodolistsState: Array<TodoListType> = []

    const action = AddTodolistAC('new todo')

    const endState = tasksReducer(startState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endState)
    const idsFromTasks = keys[0]
    const idsFromTodolists = endTodolistsState[0].id

    expect(idsFromTasks).toBe(action.todolistId)
    expect(idsFromTodolists).toBe(action.todolistId)
    console.log(endState)
    console.log(endTodolistsState)
})