import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
    addItem: (title: string) => void,
}
export function AddItemForm(props: AddItemFormType) {
    const [newTitle, setNewTitle] = useState<string>("");
    const [error, setError] = useState<null | string>(null);


    function onChangeInputHandler(event: ChangeEvent<HTMLInputElement>) {
        setNewTitle(event.currentTarget.value)
    }

    function onKeyDownInputHandler(event: KeyboardEvent<HTMLInputElement>) {
        setError(null)
        if (event.key === "Enter") {
            addTaskButtonHandler()
        }
    }

    function addTaskButtonHandler() {
        if (newTitle.trim() === "") {
            setError("Can't deliver message")
        } else {
            props.addItem(newTitle)
            setNewTitle("")
        }
    }

    return (
        <div>
            <input value={newTitle}
                   onChange={onChangeInputHandler}
                   onKeyDown={onKeyDownInputHandler}
                   className={error ? "errorBorder" : ""}
            />
            <button onClick={addTaskButtonHandler}>+</button>
            {error && <div className="error">Can't deliver message</div>}
        </div>
    )
}