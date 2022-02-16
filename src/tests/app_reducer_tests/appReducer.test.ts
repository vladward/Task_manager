import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC, setIsInitializedAC} from "../../App/appReducer";

let startState: InitialStateType

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppErrorAC({error: 'some error'}))

    expect(endState.error).toBe('some error')
})

test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatusAC({status: 'loading'}))

    expect(endState.status).toBe('loading')
})

test('isInitialized should be change', () => {
    const endState = appReducer(startState, setIsInitializedAC({isInitialized: true}))

    expect(endState.isInitialized).toBe(true)
})