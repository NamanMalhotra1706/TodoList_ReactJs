import React,{ useEffect, useState } from 'react'

const EditTask = ({ showModal, toogle, taskObj, updateTask }) => {

    const[taskName, setTaskName] = useState('');
    const[description, setDescription] = useState('');

    const handleChange=(event)=>{
        const name = event.target.name;
        const value = event.target.value;

        if(name==='taskName'){
            setTaskName(value);
            // console.log(taskName);
        }
        else{
            setDescription(value);
            // console.log(description);
        }
    }

    useEffect(()=>{
        setTaskName(taskObj.taskName);
        setDescription(taskObj.description);
    },[]);

    // Update Form
    const handleUpdate =(event)=>{
        event.preventDefault();
        const newKey = `${taskName}-${Date.now()}`;        
        const taskObj = {
            key:newKey,
            taskName,
            description,
            
          };
        console.log(taskObj);
        updateTask(taskObj);
        toogle();
    }

    return (
      <>
        {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-sm">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                        Update Task
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    //   onClick={}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-8 flex-auto">
                    <form>
                    <div className="">
                        <label for="base-input" className="text-md font-medium text-gray-900 dark:text-black">Task Name</label>
                        <input type="text" id="base-input" name='taskName' className="base-input" value={taskName} onChange={handleChange} />
                    </div>
                    <div className="mt-5">
                        <label for="large-input" className="block mb-2 text-md font-medium text-gray-900 dark:text-black">Description</label>
                        <textarea id="large-input"  cols={500} rows={8} className="larger-input sm:text-md" value={description} onChange={handleChange}></textarea>
                    </div>
                    </form>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="modal-create-button"
                      type="button"
                      onClick={handleUpdate}
                    >
                      Update
                    </button>
                    <button
                      className="modal-cancel-button"
                      type="button"
                      onClick={toogle}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    );
}

export default EditTask;
