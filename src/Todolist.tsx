import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValeType} from "./App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string) => void,
    addTask: (newTitle: string) => void,
    changeIsDone: (changeIsDone: string, isDone: boolean) => void
}

export const Todolist = (props: PropsType) => {

    const [filtred, setFilterd] = useState<FilterValeType>("all");
    const [newTitle, setNewTitle] = useState<string>("");
    const [error, setError] = useState<null | string>(null);

    let changeFiltred = props.tasks;
    if (filtred === "completed") {
        changeFiltred = changeFiltred.filter(el => el.isDone === true)
    }
    if (filtred === "active") {
        changeFiltred = changeFiltred.filter(el => el.isDone === false)
    }

    function changeFiltered(value: FilterValeType) {
        setFilterd(value);
    }

    function addTaskButtonHandler() {
        if (newTitle.trim() === "") {
            setError("Can't deliver message")
        } else {
            props.addTask(newTitle)
            setNewTitle("")
        }
    }

    function removeTaskButtonHandler(id: string) {
        props.removeTask(id)
    }

    function onChangeInputHandler(event: ChangeEvent<HTMLInputElement>) {

        setNewTitle(event.currentTarget.value)
    }

    function onKeyDownInputHandler(event: KeyboardEvent<HTMLInputElement>) {
        setError(null)
        if (event.key === "Enter") {
            addTaskButtonHandler()
        }
    }

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={newTitle}
                           onChange={onChangeInputHandler}
                           onKeyDown={onKeyDownInputHandler}
                           className={error ? "errorBorder" : ""}
                    />
                    <button onClick={addTaskButtonHandler}>+</button>
                    {error && <div className="error">Can't deliver message</div>}
                </div>
                <ul>
                    {changeFiltred.map(t => {
                        function isDoneOnChangeInputHandler(event: ChangeEvent<HTMLInputElement>) {
                            props.changeIsDone(t.id, event.currentTarget.checked)
                        }

                        return <li key={t.id} className={ t.isDone ? "opacity" : ""}>
                            <button onClick={() => removeTaskButtonHandler(t.id)}>x</button>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={isDoneOnChangeInputHandler}
                            />
                            <span>{t.title}</span>
                        </li>
                    })}
                </ul>
                <div>
                    <button onClick={() => {
                        changeFiltered("all")
                    }}
                            className={filtred === "all" ? "checked" : ""}
                    >All</button>
                    <button onClick={() => {
                        changeFiltered("active")
                    }}
                            className={filtred === "active" ? "checked" : ""}
                    >Active</button>
                    <button onClick={() => {
                        changeFiltered("completed")
                    }}
                            className={filtred === "completed" ? "checked" : ""}
                    >Completed</button>
                </div>
            </div>
        </div>
    );
}
