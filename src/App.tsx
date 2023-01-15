import React, {useState} from 'react';
import './App.css';
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {TaskType, Todolist} from "./Todolist";

// export function Counter () {
//     let arr2 = useState(5);
//     let data = arr2[0];
//     let setData = arr2[1];
//     return(
//         <div onClick={ () => { setData(data + 1 ) } }>{data}</div>
//     )
// }
///////////////////////////////////////////////////////////////////////////////////

export type FilterValeType = "all" | "completed" | "active";

function App () {
    let [tasks, setTask] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]);
    function removeTask (id: number) {
        setTask(tasks.filter(t => t.id !== id))
    };


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
            />
        </div>
    )
}
export default App;
