import {v1} from "uuid";
import {
    addTodolistAC, changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC, setTodolistsAC,
    TodolistDomainType,
    todolistsReducer
} from "../../state/todolists-reducer";
import {start} from "repl";
import {RequestStatusType} from "../../App/appReducer";

let todoListId_1: string
let todoListId_2: string
let startValue: Array<TodolistDomainType>

beforeEach(() => {
    todoListId_1 = v1()
    todoListId_2 = v1()
    startValue = [
        {id: todoListId_1, title: 'what to learn', filter: 'all', order: 0, addedDate: "", entityStatus: 'idle'},
        {id: todoListId_2, title: 'what to buy', filter: 'active', order: 0, addedDate: "", entityStatus: 'idle'}
    ]
})

test("remove todolist", () => {
    const action = removeTodolistAC({todolistId: todoListId_1})
    const endValue = todolistsReducer(startValue, action)

    expect(endValue.length).toBe(1)
    expect(endValue[0].id).toBe(todoListId_2)
})
test("add todolist", () => {
    const newTitle = 'what to eat'
    const action = addTodolistAC({todolist: {
            id: "any id",
            title: newTitle,
            order: 0,
            addedDate: ""
        }
    })

    const endValue = todolistsReducer(startValue, action)

    expect(endValue.length).toBe(3)
    expect(endValue[0].title).toBe('what to eat')
})
test("change todolist title", () => {
    const title = 'work tasks'
    const action = changeTodolistTitleAC({id: todoListId_2, title})

    const endValue = todolistsReducer(startValue, action)

    expect(endValue.length).toBe(2)
    expect(endValue[1].title).toBe('work tasks')
    expect(startValue.length).toBe(2)
})
test("change todolist filter", () => {
    const newFilter: FilterValuesType = 'completed'
    const action = changeTodolistFilterAC({id: todoListId_2, filter: newFilter})

    const endValue = todolistsReducer(startValue, action)

    expect(endValue.length).toBe(2)
    expect(endValue[1].filter).toBe('completed')
    expect(endValue[0].filter).toBe('all')
    expect(startValue.length).toBe(2)
})

test('todolists should be added', () => {
    const action = setTodolistsAC({todolists: startValue})
    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
})

test('correct entity status of todolist should be changed', () => {
    let newStatus: RequestStatusType = 'loading'
    const action = changeTodolistEntityStatusAC({id: todoListId_1, entityStatus: newStatus})
    const endState = todolistsReducer(startValue, action)

    expect(endState[0].entityStatus).toBe('loading')
    expect(endState[1].entityStatus).toBe('idle')
})