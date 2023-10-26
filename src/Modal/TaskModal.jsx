import React, { useState } from 'react'

const TaskModal = ({showModal, toogle, save}) => {

    const[taskName, setTaskName] = useState('');
    const[description, setDescription] = useState('');

    const changeHandler=(event)=>{
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

    const handleSave =(e)=>{
        e.preventDefault();
        const newKey = `${taskName}-${Date.now()}`;
        const date = new Date ();
      var dd = date.getDate ();
      var mm = date.getMonth () + 1;
      var yyyy = date.getFullYear ();
      var hh = date.getHours ();
      var minutes = date.getMinutes ();
      var ss = date.getSeconds ();
      var finalDate =
      dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;

        const taskObj = {
          key: newKey,
          taskName,
          description,
          date : finalDate,
          };
        //console.log(taskObj);
        save(taskObj);
        setTaskName('');
        setDescription('');
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
                        Create Task
                    </h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-8 flex-auto">
                    <form>
                    <div className="">
                        <label htmlFor="base-input" className="text-md font-medium text-gray-900 dark:text-black">Task Name</label>
                        <input type="text" id="base-input" name='taskName' value={taskName} onChange={changeHandler} className="base-input" />
                    </div>
                    <div className="mt-5">
                        <label htmlFor="large-input" className="block mb-2 text-md font-medium text-gray-900 dark:text-black">Description</label>
                        <textarea id="large-input" name='description' className="larger-input sm:text-md" value={description} onChange={changeHandler} cols={500} rows={8}></textarea>
                    </div>
                    </form>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="bg-blue-500 text-white focus:ring-blue-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleSave}
                    >
                      Create
                    </button>
                    <button
                      className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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

export default TaskModal;
