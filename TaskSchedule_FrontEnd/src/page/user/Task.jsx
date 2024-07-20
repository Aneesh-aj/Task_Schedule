import { useEffect, useState } from "react";
import { getTasks } from "../../Api/user";
import toast, { Toaster } from "react-hot-toast";
import TaskDetails from "../../componant/userComponant/TaskDetails";
import useGetUser from "../../hook/useGetUser";
import Nav from "../../componant/Nav";

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null); // New state for the selected task
    const user = useGetUser();

    useEffect(() => {
        if (user) {
            getAllUserTasks();
        }
    }, [user]);

    async function getAllUserTasks() {
        try {
            console.log("User ID:", user.id);
            const taskResponse = await getTasks(user.id);
            console.log("Response:", taskResponse);
            setTasks(taskResponse.tasks || []);
        } catch (error) {
            if(error.response.data == "Unauthorized"){
                toast.error(" Invalid Acess!! Login again")
            }
            toast.error(error.message || 'An error occurred');
        }
    }

    // Function to update the task in the tasks list
    const handleTaskUpdate = (updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task._id === updatedTask._id ? updatedTask : task
            )
        );
        // Optionally, you can also update the selected task
        if (selectedTask && selectedTask._id === updatedTask._id) {
            setSelectedTask(updatedTask);
        }
    };

    return (
        <>
            <Nav />
            <div className="background_color  w-full  flex justify-center h-screen">
                <div className="h-full w-[25%]">
                    <Toaster/>
                    <div className="w-full h-full ps-5 pe-5 mt-6 flex flex-col gap-2">
                        {tasks.length > 0 ? tasks.map((ele, index) => (
                            <div
                                key={index}
                                className={`p-1 border-s-8 text-blue-400 flex flex-col items-center gap-1 shadow-xl cursor-pointer rounded-2xl w-full bg-white h-28
            ${ele.status === 'complete' ? 'border-green-500'
                                        : ele.status === 'ongoing' ? 'border-orange-500'
                                            : ele.status === 'pending' ? 'border-yellow-300'
                                                : 'border-gray-300'}`}
                                onClick={() => setSelectedTask(ele)} // Set the selected task
                            >
                                <div className="flex w-full h-[90%] p-2 justify-start gap-4 items-center">
                                    <div className="flex flex-col w-[90%]">
                                        <h1 className="font-bold">{ele.title}</h1>
                                        <h1 className="w-full break-words text-sm overflow-hidden text-ellipsis" style={{ wordBreak: 'break-word', maxHeight: '2em', lineHeight: '1em' }}>
                                            {ele.summary}
                                        </h1>
                                         </div>
                                </div>
                                <div className="w-full h-full items-center flex justify-between">
                                    <p className='flex items-center'>
                                        <span
                                            className={`flex w-3 h-3 me-3 rounded-full ${ele.status === 'complete'
                                                ? 'bg-green-500'
                                                : ele.status === 'ongoing'
                                                    ? 'bg-orange-500'
                                                    : ele.status === 'pending'
                                                        ? 'bg-yellow-300'
                                                        : 'bg-gray-300'
                                                }`}
                                        ></span>
                                        <span>{ele.status}</span>
                                    </p>
                                    <h1 className="flex p-2 gap-4">{new Date(ele.createdAt).toLocaleDateString()}</h1>
                                </div>
                            </div>
                        )) : (
                            <div className=" w-full h-full flex items-center bg-white rounded-lg shadow-xl opacity-40 justify-center">No tasks available</div>
                        )}

                    </div>
                </div>
                <div className="h-full w-[60%] p-5">
                    <TaskDetails task={selectedTask} onUpdate={handleTaskUpdate} /> {/* Pass the onUpdate function */}
                </div>
            </div>
        </>
    );
}

export default Task;
