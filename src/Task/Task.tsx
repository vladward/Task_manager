import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton, ListItem} from "@material-ui/core"
import {EditableSpan} from "../Components/EditableSpan/EditableSpan"
import DeleteIcon from "@material-ui/icons/Delete"
import {TaskType} from "../App";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../state/store";

export type TaskPropsType = {
    todolistId: string
    taskId: string
}

export const Task = React.memo(({todolistId, taskId}: TaskPropsType) => {
    let dispatch = useDispatch()
    const task = useSelector<RootStateType, TaskType>(state => state.tasks[todolistId].filter(t => t.id === taskId)[0])

    const removeTaskById = useCallback(() => dispatch(removeTaskAC(taskId, todolistId)), [taskId, todolistId])
    const onChangeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(taskId, todolistId, e.currentTarget.checked)), [taskId, todolistId])
    const changeTitle = useCallback((title: string) => dispatch(changeTaskTitleAC(taskId, todolistId, title)), [taskId, todolistId])
    return (
        <ListItem className={task.isDone ? "done-task" : ''}
                  disableGutters
                  style={{padding: "0", display: "flex", justifyContent: "space-between", maxWidth: "260px"}}
                  divider
                  key={taskId}>

            <Checkbox
                edge="start"
                size="small"
                checked={task.isDone}
                onChange={onChangeTaskStatus}
            />
            <EditableSpan title={task.title}
                          setNewTitle={changeTitle}/>
            <IconButton size={"small"} onClick={removeTaskById} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
})