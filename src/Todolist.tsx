import React, {useState} from "react";
import {FilterValeType} from "./App";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

export type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: number) => void,
}

export const Todolist = (props: PropsType) => {

    const [filtred, setFilterd] = useState("all");
    let changeFiltred = props.tasks;
    if (filtred === "completed") {
        changeFiltred = changeFiltred.filter( el => el.isDone === true)
    }
    if (filtred === "active") {
        changeFiltred = changeFiltred.filter( el => el.isDone === false)
    }
    function changeFiltered(value: FilterValeType) {
        setFilterd(value);
    }
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {changeFiltred.map(t =>
                        <li>
                            <button onClick={ () => {props.removeTask(t.id)} }>x</button>
                            <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                        </li>
                    )}
                </ul>
                <div>
                    <button onClick={ () => {changeFiltered("all")} }>All</button>
                    <button onClick={ () => {changeFiltered("active")} }>Active</button>
                    <button onClick={ () => {changeFiltered("completed")} }>Completed</button>
                </div>
            </div>
        </div>
    );
}

// export type TaskType = {
//     id: number
//     title: string
//     isDone: boolean
// }
//
// type PropsType = {
//     tasks1: Array<TaskType>;
//     title: string;
//     removeTask: (id: number) => void;
// };

// export const Todolist = (props: PropsType) => {
//     let [filter, setFilter] = useState<FilterValeType>("all");
//     let tasksForTodolist = props.tasks1;
//     if(filter === "completed") {
//         tasksForTodolist = props.tasks1.filter( t => t.isDone === true)
//     };
//     if(filter === "active") {
//         tasksForTodolist = props.tasks1.filter( t => t.isDone === false)
//     };
//     function changeFilter (value: FilterValeType) {
//         setFilter(value)
//     }
//     return (
//         <div>
//             <div>
//                 <h3>{props.title}</h3>
//                 <div>
//                     <input/>
//                     <button>+</button>
//                 </div>
//                 <ul>
//                     {
//                         tasksForTodolist.map((t) => <li>
//                                 <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
//                                 <button onClick={ () => {props.removeTask(t.id)}}>x</button>
//                             </li>
//                         )
//                     }
//                 </ul>
//                 <div>
//                     <button onClick={ () => {changeFilter("all")} }>All</button>
//                     <button onClick={ () => {changeFilter("active")} }>Active</button>
//                     <button onClick={ () => {changeFilter("completed")} }>Completed</button>
//                 </div>
//             </div>
//         </div>
//     );
// }