import React, {useState} from 'react';
import './App.css';
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {TaskType, Todolist} from "./Todolist";
import * as net from "net";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";


export type FilterValeType = "all" | "completed" | "active";
type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValeType,
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    function removeTask(id: string, todolistId: string) {
        let task = taskObj[todolistId];
        if (task) {
            let newTask = task.filter(t => t.id !== id);
            taskObj[todolistId] = newTask;
            setTaskObj({...taskObj})
        }
    };

    function addTask(newTitle: string, todolistId: string) {
        let task = taskObj[todolistId];
        if (task) {
            let newTask = [{id: v1(), title: newTitle, isDone: false}, ...task];
            taskObj[todolistId] = newTask;
            setTaskObj({...taskObj});
        }
    }

    function changeIsDone(taskId: string, isDone: boolean, todolistId: string) {
        let task = taskObj[todolistId];
        let newTask = task.find(t => t.id === taskId);
        if (newTask) {
            newTask.isDone = isDone;
            setTaskObj({...taskObj});
        }
    }
    function changeEditTitle(taskId: string, newTitle: string, todolistId: string) {
        let task = taskObj[todolistId];
        let newTask = task.find(t => t.id === taskId);
        if (newTask) {
            newTask.title = newTitle;
            setTaskObj({...taskObj});
        }
    }
    function changeEditTitleTodoList(newTitle: string, todolistId: string) {
        let task = todoLists.find(tl => tl.id === todolistId);
        if (task) {
            task.title = newTitle;
            setTodoList([...todoLists]);
        }
    }


    function changeFiltered(value: FilterValeType, todolistId: string) {
        let tack = todoLists.find(t => t.id === todolistId);
        if (tack) {
            tack.filter = value;
            setTodoList([...todoLists])
        }
    }

    function removeTodoList(todolistId: string) {
        let filtredTodoLists = todoLists.filter(tl => tl.id !== todolistId);
        setTodoList(filtredTodoLists)
        delete taskObj[todolistId]
        setTaskObj({...taskObj})
    }

    const addTodoList = (title: string) => {
        let newTodolist: TodoListsType =  {id: v1(), title: title, filter: "all"}
        setTodoList([...todoLists, newTodolist]);
        setTaskObj({
            [newTodolist.id]:[],
            ...taskObj
        })
    }

    let todoListsId1 = v1();
    let todoListsId2 = v1();

    let [todoLists, setTodoList] = useState<Array<TodoListsType>>([
            {id: todoListsId1, title: "what to learn", filter: "all"},
            {id: todoListsId2, title: "what to buy", filter: "all"},
        ]
    )

    let [taskObj, setTaskObj] = useState<TaskStateType>({
        [todoListsId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "New", isDone: false},
        ],
        [todoListsId2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "New", isDone: false},
        ]
    })

    return (
        <div className="App">
            <div>
                <AddItemForm addItem={addTodoList}/>
            </div>
            {todoLists.map(tl => {
                let taskForTodolist = taskObj[tl.id];
                if (tl.filter === "active") {
                    taskForTodolist = taskForTodolist.filter(t => t.isDone === false)
                }
                if (tl.filter === "completed") {
                    taskForTodolist = taskForTodolist.filter(t => t.isDone === true)
                }
                return <Todolist
                    id={tl.id}
                    key={tl.id}
                    title={tl.title}
                    tasks={taskForTodolist}
                    removeTask={removeTask}
                    addTask={addTask}
                    changeIsDone={changeIsDone}
                    changeEditTitle={changeEditTitle}
                    changeEditTitleTodoList={changeEditTitleTodoList}
                    changeFiltered={changeFiltered}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                />
            })}

        </div>
    )
}


export default App;
