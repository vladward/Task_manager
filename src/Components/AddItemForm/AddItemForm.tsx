import React, {ChangeEvent, KeyboardEvent, useState} from "react"

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const errorInpStyle = {border: "2px solid red", outline: "none"}

    const errorMessage = error
        ? <div style={{background: 'red', color: 'white'}}>Title is required</div>
        : null

    const AddItem = () => {
        title.trim() !== ''
            ? props.addItem(title.trim())
            : setError(true)
        setTitle("")
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value) {
            setError(false)
        }
        setTitle(e.currentTarget.value)
    }

    const onKeyPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            AddItem()
        }
    }

    return (
        <div>
            <input style={error ? errorInpStyle : undefined}
                   placeholder="Enter title..."
                   onChange={onChangeTitle}
                   value={title}
                   onKeyPress={onKeyPressEnter}
            />
            <button onClick={AddItem} disabled={error}>+</button>
            {errorMessage}
        </div>
    )
}