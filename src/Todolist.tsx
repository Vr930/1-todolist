import React, {ChangeEvent} from "react";
import {FilterValeType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type PropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, todolistId: string) => void,
    addTask: (newTitle: string, todolistId: string) => void,
    changeIsDone: (changeIsDone: string, isDone: boolean, todolistId: string) => void,
    changeEditTitle: (taskId: string, newTitle: string, todolistId: string) => void,
    changeEditTitleTodoList: (newTitle: string, todolistId: string) => void,
    changeFiltered: (value: FilterValeType, todolistId: string) => void,
    filter: FilterValeType
    removeTodoList: (todolistId: string) => void
}

export const Todolist = (props: PropsType) => {

    function removeTaskButtonHandler(id: string) {
        props.removeTask(id, props.id)
    }

    const allOnclickHandler = () => {
        props.changeFiltered("all", props.id)
    }
    const activeOnclickHandler = () => {
        props.changeFiltered("active", props.id)
    }
    const completedOnclickHandler = () => {
        props.changeFiltered("completed", props.id)
    }
    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const onChangeTitleTodoList = (newTitle: string) => {
        props.changeEditTitleTodoList(newTitle, props.id);
    }
    return (
        <div>
            <div>
                <h3>
                    <EditableSpan title={props.title} onChang={onChangeTitleTodoList}/>
                    <button
                        onClick={removeTodoListHandler}>x
                    </button>
                </h3>
                <AddItemForm addItem={addTask}/>
                <ul>
                    {props.tasks.map(t => {
                        function isDoneOnChangeInputHandler(event: ChangeEvent<HTMLInputElement>) {
                            props.changeIsDone(t.id, event.currentTarget.checked, props.id)
                        }

                        function onChangeTitle(newTitle: string) {
                            props.changeEditTitle(t.id, newTitle, props.id)
                        }

                        return <li key={t.id} className={t.isDone ? "opacity" : ""}>
                            <button onClick={() => removeTaskButtonHandler(t.id)}>x</button>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={isDoneOnChangeInputHandler}
                            />
                            <EditableSpan title={t.title} onChang={onChangeTitle}/>
                        </li>
                    })}
                </ul>
                <div>
                    <button onClick={allOnclickHandler}
                            className={props.filter === "all" ? "active-filter" : ""}
                    >All
                    </button>
                    <button onClick={activeOnclickHandler}
                            className={props.filter === "active" ? "active-filter" : ""}
                    >Active
                    </button>
                    <button onClick={completedOnclickHandler}
                            className={props.filter === "completed" ? "active-filter" : ""}
                    >Completed
                    </button>
                </div>
            </div>
        </div>
    );
}

