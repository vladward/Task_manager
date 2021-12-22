import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    setNewTitle: (title: string) => void
}

export const EditableSpan = React.memo(({title, setNewTitle}: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [spanTitle, setSpanTitle] = useState<string>(title)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setSpanTitle(e.currentTarget.value)
    }

    const onEditMode = () => {
        setEditMode(true)
    }

    const offEditMode = () => {
        setEditMode(false)
        setNewTitle(spanTitle)
    }

    const onKeyPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            offEditMode()
        }
    }

    return (
        editMode
            ?
            <TextField onBlur={offEditMode}
                   value={spanTitle}
                   onKeyPress={onKeyPressEnter}
                   onChange={onChangeTitle}
                   autoFocus
            style={{width: "200px"}}
            />
            : <span onDoubleClick={onEditMode}>{title}</span>
    )
})