import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    TodolistDomainType,
    todolistsReducer
} from "../../state/todolists-reducer";

let todoListId_1: string
let todoListId_2: string
let startValue: Array<TodolistDomainType>

beforeEach(() => {
    todoListId_1 = v1()
    todoListId_2 = v1()
    startValue = [
        {id: todoListId_1, title: 'what to learn', filter: 'all', order: 0, addedDate: ""},
        {id: todoListId_2, title: 'what to buy', filter: 'active', order: 0, addedDate: ""}
    ]
})

test("remove todolist", () => {
    const action = removeTodolistAC(todoListId_1)
    const endValue = todolistsReducer(startValue, action)

    expect(endValue.length).toBe(1)
    expect(endValue[0].id).toBe(todoListId_2)
})
test("add todolist", () => {
    const newTitle = 'what to eat'
    const action = addTodolistAC(newTitle)

    const endValue = todolistsReducer(startValue, action)

    expect(endValue.length).toBe(3)
    expect(endValue[2].title).toBe('what to eat')
    expect(endValue[2].filter).toBe('all')
})
test("change todolist title", () => {
    const title = 'work tasks'
    const action = changeTodolistTitleAC(title, todoListId_2)

    const endValue = todolistsReducer(startValue, action)

    expect(endValue.length).toBe(2)
    expect(endValue[1].title).toBe('work tasks')
    expect(startValue.length).toBe(2)
})
test("change todolist filter", () => {
    const newFilter: FilterValuesType = 'completed'
    const action = changeTodolistFilterAC(todoListId_2, newFilter)

    const endValue = todolistsReducer(startValue, action)

    expect(endValue.length).toBe(2)
    expect(endValue[1].filter).toBe('completed')
    expect(endValue[0].filter).toBe('all')
    expect(startValue.length).toBe(2)
})