import React,{ useState } from "react"
import EditTask from '../Modal/EditTask'

const Card = ({taskObj, index, deleteTask , updateListArray, isCompletedScreen, completeTask}) => {
    
    const[showModal, setShowModal] = useState(false);
    
    const colors = [
        {
            primaryColor : "#5D93E1",
            secondaryColor : "#ECF3FC"
        },
        {
            primaryColor : "#F9D288",
            secondaryColor : "#FEFAF1"
        },
        {
            primaryColor : "#5DC250",
            secondaryColor : "#F2FAF1"
        },
        {
            primaryColor : "#F48687",
            secondaryColor : "#FDF1F1"
        },
        {
            primaryColor : "#B964F7",
            secondaryColor : "#F3F0FD"
        }
    ];

    const handleDelete = () =>{
        // console.log(index);
        deleteTask(index);
    }

    const toogle=()=>{
        setShowModal(!showModal);
    }

    const updateTask = (obj)=>{
        updateListArray(obj, index);
    }

    const handleComplete = () =>{
        console.log("Completed");
        completeTask(index);
    }
       
    
  return (
    <>
    {isCompletedScreen === false && <div className = "card-wrapper mr-5">
        <div className = "card-top" style={{backgroundColor: colors[index%5].primaryColor}}></div>
            <div className = "task-holder">
                <span className = "card-header" style={{backgroundColor: colors[index%5].secondaryColor, borderRadius: "10px"}}>{taskObj.taskName}</span>
                <p className = "mt-3">{taskObj.description}</p>

                <div style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>
                    <i className = "far fa-edit mr-3" style={{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick={()=>{setShowModal(true)}}></i>
                    <i className ="fas fa-trash-alt mr-3" style = {{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick={handleDelete}></i>
                    <i className ="fas fa-check" style = {{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick={handleComplete}></i>
                </div>
        </div>
        <EditTask showModal={showModal} toogle={toogle} updateTask={updateTask} taskObj={taskObj}  />
    </div>
      }{
        isCompletedScreen === true && <div className = "card-wrapper mr-5">
        <div className = "card-top" style={{backgroundColor: colors[index%5].primaryColor}}></div>
            <div className = "task-holder">
                <span className = "card-header" style={{backgroundColor: colors[index%5].secondaryColor, borderRadius: "10px"}}>{taskObj.taskName}</span>
                <p className = "mt-3">{taskObj.description}</p>
                <div style={{"position": "absolute","left" : "20px", "bottom" : "20px"}}>
                    <p>{taskObj.completedOn}</p>
                </div>
                <div style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>
                    <i className ="fas fa-trash-alt mr-3" style = {{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick={handleDelete}></i>
                </div>
        </div>
        </div>
      }
    </>
  );
};

export default Card;
