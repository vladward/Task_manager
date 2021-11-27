import React, {ChangeEvent, KeyboardEvent, useState} from "react"

type EditableSpanPropsType = {
    title: string
    setNewTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onEditMode = () => {
        setEditMode(true)
    }

    const offEditMode = () => {
        setEditMode(false)
        props.setNewTitle(title)
    }

    const onKeyPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            offEditMode()
        }
    }

    return (
        editMode
            ?
            <input onBlur={offEditMode}
                   value={title}
                   onKeyPress={onKeyPressEnter}
                   onChange={onChangeTitle}
                   autoFocus/>
            : <span onClick={onEditMode}>{props.title}</span>
    )
}