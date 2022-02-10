import {v1} from "uuid";
import {TasksStateType} from "../../App/App";
import {addTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from "../../state/tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "../../state/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

let todoListId_1: string
let todoListId_2: string
let startState: TasksStateType

beforeEach(() => {
    todoListId_1 = v1()
    todoListId_2 = v1()
    startState = {
        [todoListId_1]: [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ],
        [todoListId_2]: [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ]
    }
})

test('remove task from todolist', () => {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    let id = [todoListId_2][1]
    const endState = tasksReducer(startState, removeTaskAC({taskId: '1', todolistId: todoListId_2}))

    expect(endState[todoListId_2][0].title).toBe("milk")
    expect(endState[todoListId_2].length).toBe(2)
    expect(endState[todoListId_1].length).toBe(3)
    console.log(endState)
})

test('add task to todolist', () => {
    const title = 'WEB'
    const endState = tasksReducer(startState, addTaskAC({
        task: {
            id: '12',
            status: TaskStatuses.Completed,
            title,
            description: '',
            order: 0,
            priority: 0,
            startDate: '',
            deadline: '',
            todoListId: todoListId_1,
            addedDate: ''
        }
    }))

    expect(endState[todoListId_1].length).toBe(4);
    expect(endState[todoListId_2].length).toBe(3);
    expect(endState[todoListId_1][0].id).toBeDefined();
    expect(endState[todoListId_1][0].title).toBe('WEB');
})

test('change Task Status', () => {
    const ID = startState[todoListId_1][0].id

    const endState = tasksReducer(startState, updateTaskAC({
        taskId: ID,
        model: {
            status: TaskStatuses.Completed
        }
        ,
        todolistId: todoListId_1
    }))

    expect(endState[todoListId_1][0].status).toBe(TaskStatuses.Completed)
    expect(endState[todoListId_1][1].status).toBe(TaskStatuses.Completed)
    console.log(endState)
})

test('change Task title', () => {
    const newTitle = 'Vodka'
    const ID = startState[todoListId_2][1].id

    const endState = tasksReducer(startState, updateTaskAC({
        taskId: ID,
        model: {
            title: newTitle
        }
        ,
        todolistId: todoListId_2
    }))

    expect(endState[todoListId_1][1].title).toBe("JS")
    expect(endState[todoListId_2][1].title).toBe("Vodka")
    expect(endState[todoListId_2].length).toBe(3)
    expect(endState[todoListId_1].length).toBe(3)
    console.log(endState)
})

test('new property with new array should be added when new todolist is added', () => {
    const newTitle = 'title no matter'
    let action = addTodolistAC({
        todolist: {
            id: '10',
            order: 0,
            title: newTitle,
            addedDate: ''
        }
    })
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != todoListId_1 && k != todoListId_2)
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, removeTodolistAC({todolistId: todoListId_2}))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todoListId_2]).toBeUndefined()
    console.log(endState)
})