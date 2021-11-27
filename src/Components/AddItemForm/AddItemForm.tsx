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
            <TextField label={!error ? (props.initValue ? props.initValue : "Enter title") : "Error"}
                       size="small"
                       variant="outlined"
                       error={error}
                       helperText={error ? "Title is required" : ""}
                       onChange={onChangeTitle}
                       value={title}
                       onKeyPress={onKeyPressEnter}/>
            <IconButton aria-label="delete" onClick={AddItem} style={{color: "green"}} disabled={!title}>
                <AddBox fontSize="small" />
            </IconButton>
        </div>
    )
}