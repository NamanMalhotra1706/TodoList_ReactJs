import React from 'react'
import { useState, useEffect } from 'react'
import '../App.css'
import TaskModal from '../Modal/TaskModal'
import Card from './Card'

const TodoList = () => {

    const [showModal, setShowModal] = useState(false);
    const [isCompletedScreen, setIsCompletedScreen] = useState(false);
    const[taskList, setTaskList] = useState([]);
    const[completedTodos, setCompletedTodos] = useState([]);

    const toogle =() =>{
        setShowModal(!showModal) ;
    }

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
      if(isCompletedScreen===false){
      const lists = [...taskList];
      lists.splice(index,1);
      localStorage.setItem('taskList',JSON.stringify(lists));
      setTaskList(lists);
      }
      // Deleting Completed Task...
      if(isCompletedScreen===true){
        const completedlists = [...completedTodos];
        completedlists.splice(index,1);
        localStorage.setItem('completedTodos',JSON.stringify(completedlists));
        setCompletedTodos(completedlists);
     }
    };

    // Completed Task Checking
    useEffect(()=>{
      const completedData = localStorage.getItem('completedTodos');
      if(completedData){
        setCompletedTodos(JSON.parse(completedData));
      }
    },[]);

    //Complete Tasks
    const completeTask=(index)=>{
      
      setCompletedTodos((prevCompletedTask)=>{
      const date = new Date ();
      var dd = date.getDate ();
      var mm = date.getMonth () + 1;
      var yyyy = date.getFullYear ();
      var hh = date.getHours ();
      var minutes = date.getMinutes ();
      var ss = date.getSeconds ();
      var finalDate =
        dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;
  
      let filteredTodo = {
        ...taskList[index],
        completedOn: finalDate,
      };
      let updatedCompletedList = [...prevCompletedTask, filteredTodo];

      localStorage.setItem (
        'completedTodos',
        JSON.stringify (updatedCompletedList)
      );
        return updatedCompletedList;
      });
      deleteTask(index);
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
  
    <div className='text-center btn-area'>
      <button type="button" className={`secondaryBtn bg-gray-800 ${isCompletedScreen ===false && 'bg-green-800'}`} onClick={()=>{setIsCompletedScreen(false)}}>Tasks</button>
      <button type="button" className={`bg-gray-800 secondaryBtn ${isCompletedScreen ===true && 'bg-green-800'}`} onClick={()=>{setIsCompletedScreen(true)}}>Completed</button>
    </div>
    
    {isCompletedScreen === false && <div className='task-container'>
        {taskList.map((obj, index)=>
        <Card key={obj.key} taskObj={obj} index={index} updateListArray={updateListArray} deleteTask={deleteTask} isCompletedScreen={isCompletedScreen} completeTask={completeTask} />)}
    </div>
    } : {
    isCompletedScreen === true && <div className='task-container'>
     {completedTodos.map((obj, index)=>
        <Card key={obj.key} taskObj={obj} index={index} deleteTask={deleteTask} isCompletedScreen={isCompletedScreen} />)}
    </div>
    }
    
    {/* Create Task */}
    <TaskModal showModal={showModal} toogle={toogle} save={saveTask} />
    </>
  )
}

export default TodoList;