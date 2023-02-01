import React, {useState} from 'react';
import './App.css';
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {TaskType, Todolist} from "./Todolist";
import * as net from "net";
import {v1} from 'uuid';


export type FilterValeType = "all" | "completed" | "active";
type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValeType,
}

function App() {

    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todoListId] = filteredTasks;
        setTasksObj({...tasksObj})
    };

    function addTask(newTitle: string, todoListId: string) {
        let task = {id: v1(), title: newTitle.trim(), isDone: false};
        let newTasks = [task, ...tasksObj[todoListId]];
        tasksObj[todoListId] = newTasks
        setTasksObj({...tasksObj})

    }

    function changeIsDone(taskId: string, isDone: boolean, todoListId: string) {
        let task = tasksObj[todoListId].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone
        }
        setTasksObj({...tasksObj})
    }

    function changeFiltered(value: FilterValeType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }

    let todoListId1 = v1();
    let todoListId2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
            {id: todoListId1, title: "What to learn", filter: "all"},
            {id: todoListId2, title: "What to buy", filter: "all"},
        ]
    )

    function removeTodoList(todoListId: string) {
        let newTodoLists = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(newTodoLists);
        delete tasksObj[todoListId];
        setTasksObj(tasksObj)
    }

    const [tasksObj, setTasksObj] = useState({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "New", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS", isDone: true},
        ]
    })

    return (
        <div className="App">

            {todoLists.map((tl) => {
                let taskForTodolist = tasksObj[tl.id];
                if (tl.filter === "completed") {
                    taskForTodolist = taskForTodolist.filter(el => el.isDone === true)
                }
                if (tl.filter === "active") {
                    taskForTodolist = taskForTodolist.filter(el => el.isDone === false)
                }

                return (
                    <Todolist
                        id={tl.id}
                        key={tl.id}
                        title={tl.title}
                        tasks={taskForTodolist}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeIsDone={changeIsDone}
                        changeFiltered={changeFiltered}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                    />
                )
            })
            }

        </div>
    )
}


export default App;
