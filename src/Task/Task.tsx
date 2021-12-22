import React, {ChangeEvent} from 'react'
import {Checkbox, IconButton, ListItem} from "@material-ui/core"
import {EditableSpan} from "../Components/EditableSpan/EditableSpan"
import DeleteIcon from "@material-ui/icons/Delete"
import {TaskType} from "../App";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasksReducer";
import {useDispatch} from "react-redux";

export type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = React.memo(({task, todolistId}: TaskPropsType) => {
    let dispatch = useDispatch()

    const removeTaskById = () => {dispatch(removeTaskAC(task.id, todolistId))}
    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {dispatch(changeTaskStatusAC(task.id, todolistId, e.currentTarget.checked))}
    const changeTitle = (title: string) => {dispatch(changeTaskTitleAC(task.id, todolistId, title))}
    return (
        <ListItem className={task.isDone ? "done-task" : ''}
                  disableGutters
                  style={{padding: "0", display: "flex", justifyContent: "space-between", maxWidth: "260px"}}
                  divider
                  key={task.id}>

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