import React, {useState} from 'react';
import './App.css';
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {TaskType, Todolist} from "./Todolist";
import * as net from "net";
import {v1} from 'uuid';

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

function App() {
    let [tasks, setTask] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "New", isDone: false},
    ]);

    function removeTask(id: string) {
        setTask(tasks.filter(t => t.id !== id))
    };

    function addTask(newTitle: string) {
        let newTask = {id: v1(), title: newTitle.trim(), isDone: false};
        setTask([newTask, ...tasks]);
    }

    function changeIsDone(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId);
       if (task) {
           task.isDone = isDone
       }
        setTask([...tasks])
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeIsDone={changeIsDone}
            />
        </div>
    )
}

export default App;
