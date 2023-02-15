import React, {ChangeEvent, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;

type EditableSpanType = {
    title: string
    onChang: (newTitle: string) => void
}

export function EditableSpan(prosp: EditableSpanType) {
    let [editMode, setEditMode] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>("");
    const activateEditMode = () => {
        setEditMode(true);
        setNewTitle(prosp.title)
    }
    const activateViewMode = () => {
        setEditMode(false);
        prosp.onChang(newTitle)
    }
    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <input value={newTitle} onBlur={activateViewMode} autoFocus onChange={inputOnChangeHandler}/>
            : <span onDoubleClick={activateEditMode}>{prosp.title}</span>
    )
}