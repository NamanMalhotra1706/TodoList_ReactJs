import React from 'react'
import { useState, useEffect } from 'react'
import '../App.css'
import TaskModal from '../Modal/taskModal'
import Card from './Card'

const TodoList = () => {

    const [showModal, setShowModal] = useState(false);
    
    const toogle =() =>{
        setShowModal(!showModal) ;
    }

    const[taskList, setTaskList] = useState([]);

    useEffect(() => {
        const savedData = localStorage.getItem('taskList');
        if (savedData) {
          setTaskList(JSON.parse(savedData));
        }
      }, []);

    //Create Task
    const saveTask = (taskObj)=>{
        // console.log(taskObj);
        setTaskList((prevtaskList) => {
            const latestList = [...prevtaskList, taskObj];
            localStorage.setItem("taskList",JSON.stringify(latestList));
            console.log(latestList);
            return latestList; 
        });
        setShowModal(false);
    }

    // Delete Task
    const deleteTask = (index) =>{
      const lists = [...taskList];
      lists.splice(index,1);
      localStorage.setItem('taskList',JSON.stringify(lists));
      setTaskList(lists);
    };

    //Update Task
    const updateListArray=(obj,index)=>{
        const lists=[...taskList];
        lists[index]=obj;
        localStorage.setItem('taskList',JSON.stringify(lists));
        setTaskList(lists);
    }

  return (
    <>
    <div className='pt-8 pb-5 bg-gray-200 text-center'>
    <h3>Todo List</h3>
    <button type="button" className="create-button" onClick={()=>setShowModal(true)}>Create Todo</button>
    </div>

    <div className='task-container'>
        {taskList.map((obj, index)=><Card key={obj.key} taskObj={obj} index={index} updateListArray={updateListArray} deleteTask={deleteTask}/>)}
    </div>
    <TaskModal showModal={showModal} toogle={toogle} save={saveTask} />
    </>
  )
}

export default TodoList;