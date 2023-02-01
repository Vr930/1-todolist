import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValeType} from "./App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type PropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, todoListId: string) => void,
    addTask: (newTitle: string, todoListId: string) => void,
    changeIsDone: (changeIsDone: string, isDone: boolean, todoListId: string) => void,
    filter: FilterValeType,
    changeFiltered:(value: FilterValeType, todoListId: string)=> void,
    removeTodoList: (todoListId: string) => void
}

export const Todolist = (props: PropsType) => {


    const [newTitle, setNewTitle] = useState<string>("");
    const [error, setError] = useState<null | string>(null);




    function addTaskButtonHandler() {
        if (newTitle.trim() === "") {
            setError("Can't deliver message")
        } else {
            props.addTask(newTitle, props.id)
            setNewTitle("")
        }
    }

    function removeTaskButtonHandler(id: string) {
        props.removeTask(id, props.id)
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
    const allOnclickHandler = () => {props.changeFiltered("all", props.id)}
    const activeOnclickHandler = () => {props.changeFiltered("active", props.id)}
    const completedOnclickHandler = () => {props.changeFiltered("completed", props.id)}
    const titleButtonOnclickHandler = () =>{
        props.removeTodoList(props.id)
    }
    return (
        <div>
            <div>
                <h3>{props.title}
                <button onClick={titleButtonOnclickHandler}>x</button>
                </h3>
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
                    {props.tasks.map(t => {
                        function isDoneOnChangeInputHandler(event: ChangeEvent<HTMLInputElement>) {
                            props.changeIsDone(t.id, event.currentTarget.checked, props.id)
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
                    <button onClick={allOnclickHandler}
                            className={props.filter === "all" ? "active-filter" : ""}
                    >All</button>
                    <button onClick={activeOnclickHandler}
                            className={props.filter === "active" ? "active-filter" : ""}
                    >Active</button>
                    <button onClick={completedOnclickHandler}
                            className={props.filter === "completed" ? "active-filter" : ""}
                    >Completed</button>
                </div>
            </div>
        </div>
    );
}
