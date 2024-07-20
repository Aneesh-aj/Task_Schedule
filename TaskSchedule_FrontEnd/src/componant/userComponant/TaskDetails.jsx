import { Fieldset } from 'primereact/fieldset';
import React, { useState, useEffect } from 'react';
import { endTask, startTask } from '../../Api/user';
import toast, { Toaster } from 'react-hot-toast';
import bg from "../../assets/9169206-removebg-preview.png"
import { clearUser } from '../../utils/clearUser';
const TaskDetails = ({ task, onUpdate }) => {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timer, setTimer] = useState(null);
    const [duration, setDuration] = useState(null); 
    

    useEffect(() => {
        if (task) {
            const now = Date.now();
            if (task.startTime) {
                const storedStartTime = new Date(task.startTime).getTime();
                setStartTime(storedStartTime);
                setElapsedTime(now - storedStartTime);

                if (task.status !== 'complete') {
                    const interval = setInterval(() => {
                        setElapsedTime(Date.now() - storedStartTime);
                    }, 1000);
                    setTimer(interval);

                    return () => clearInterval(interval);
                }
            }

            if (task.endTime) {
                const storedEndTime = new Date(task.endTime).getTime();
                const taskDuration = storedEndTime - new Date(task.startTime).getTime();
                setDuration(taskDuration);
            }
        }
    }, [task]);

    const startTimer = async () => {
        
        const now = Date.now();
        setStartTime(now);
        setElapsedTime(0);
        setDuration(null);
        if (task) {
            try {
                const response = await startTask(task._id, now);
                if (response.success) {
                    toast.success(response.message);
                    task.status = "ongoing"
                    localStorage.setItem(`startTime_${task._id}`, now.toString());
                    onUpdate(response.task);
                }
            } catch (error) {
                if(error.response.data == "Unauthorized"){
                    toast.error(" Invalid Acess!! Login again")
                }
                console.error('Failed to update start time', error);
            }
        }
    };

    const endTimer = async () => {
        if (timer) {
            clearInterval(timer);
            setTimer(null);
        }
        const now = Date.now();
        setEndTime(now);

        if (task) {
            try {
                const response = await endTask(task._id, now);
                if (response.success) {
                    toast.success(response.message);

                    const taskStartTime = new Date(task.startTime).getTime();
                    const taskEndTime = now;
                    const taskDuration = taskEndTime - taskStartTime;
                    setDuration(taskDuration);

                    const updatedTask = { ...task, status: 'complete' };
                    onUpdate(updatedTask);
                }
                localStorage.removeItem(`startTime_${task._id}`);
            } catch (error) {
                console.error('Failed to update end time', error);
            }
        }
    };

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    if (!task) {
        return (
            <div className='w-full h-full flex justify-center'>
                <img src={bg} className='w-[50%] object-contain' alt="" />
            </div>
        )
    }

    return (
        <>
            <div className="rounded-lg bg-white w-full h-full shadow-xl">
                <div className="w-full border-b-2 p-5 flex justify-between gap-2">
                    <div className='w-[50%]'>
                        <Toaster/>
                        <h1 className='font-extrabold text-2xl'>{task.title}</h1>
                    </div>
                    <div className="w-[50%] flex gap-2 justify-end">
                        <p className='flex items-center'>
                            <span
                                className={`flex w-3 h-3 me-3 rounded-full ${task.status === 'complete'
                                    ? 'bg-green-500'
                                    : task.status === 'ongoing'
                                        ? 'bg-orange-500'
                                        : task.status === 'pending'
                                            ? 'bg-yellow-300'
                                            : 'bg-gray-300'
                                    }`}
                            ></span>
                            <span>{task.status}</span>
                        </p>
                        {task.status === 'complete' ? (
                            <div className='flex h-[2rem] items-center'>
                                <p className='font-extrabold'>Duration: {formatTime(duration)}</p>
                            </div>
                        ) : (
                            <>
                                <div className='flex h-[2rem] items-center'>
                                    {
                                        task.status != "pending" ? (<p className='font-extrabold'>Time: {formatTime(elapsedTime)}</p>
                                        ) : ""
                                    }
                                </div>
                                <button
                                    disabled={task.status === "ongoing" || startTime !== null}
                                    onClick={startTimer}
                                    className="w-[5rem] text-white h-[2rem] bg-green-500 rounded-md shadow-md hover:bg-violet-700 hover:shadow-lg transition-all duration-150 delay-150"
                                >
                                    Start
                                </button>
                                <button
                                    onClick={endTimer}
                                    className="w-[5rem] text-white h-[2rem] bg-red-500 rounded-md shadow-md hover:bg-violet-700 hover:shadow-lg transition-all duration-150 delay-150"
                                    disabled={startTime === null}
                                >
                                    End
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div className="p-5">
                    <Fieldset legend="Summary" className="mt-5 border-2 rounded-xl bg-opacity-40">
                        <p className="font-medium text-md pt-5 pb-5">{task.summary}</p>
                    </Fieldset>
                    <Fieldset legend="Details" className="mt-5 border-2 rounded-xl">
                        <p className="font-medium text-md pt-5 pb-8">{task.details}</p>
                    </Fieldset>
                </div>
            </div>
        </>
    );
}

export default TaskDetails;
