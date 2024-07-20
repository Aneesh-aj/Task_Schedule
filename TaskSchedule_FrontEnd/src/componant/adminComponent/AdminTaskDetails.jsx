import React, { useState, useEffect } from 'react';
import EditTaskModal from './EditTaskModal';
import { Fieldset } from 'primereact/fieldset';
import moment from 'moment';
import bg from "../../assets/9169206-removebg-preview.png";

const formatDate = (date) => moment(date).format('MMMM Do YYYY, h:mm:ss a');
const calculateDuration = (start, end) => {
    const duration = moment.duration(moment(end).diff(moment(start)));
    return `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
};

const AdminTaskDetails = ({ task, onUpdateTask }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(task);

    useEffect(() => {
        setCurrentTask(task);
    }, [task]);

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    const handleUpdateTask = (updatedTask) => {
        setCurrentTask(updatedTask);  
        onUpdateTask(updatedTask);   
        handleCloseModal();
    };

    if (!currentTask) {
        return (
            <div className='w-full h-full'>
                <img src={bg} className='w-full h-[50%] object-contain' alt="" />
            </div>
        );
    }

    return (
        <>
            <div className="rounded-lg bg-white  w-full h-auto shadow-xl">
                <div className="w-full border-b-2 p-5 flex justify-between gap-2">
                    <div className='w-[50%]'>
                        <h1 className='font-extrabold text-2xl'>{currentTask.title}</h1>
                    </div>
                    <div className="w-[50%] flex gap-2 justify-end">
                        <p className='flex items-center'>
                            <span
                                className={`flex w-3 h-3 me-3 rounded-full ${currentTask.status === 'complete'
                                    ? 'bg-green-500'
                                    : currentTask.status === 'ongoing'
                                        ? 'bg-orange-500'
                                        : currentTask.status === 'pending'
                                            ? 'bg-yellow-300'
                                            : 'bg-gray-300'
                                    }`}
                            ></span>
                            <span>{currentTask.status}</span>
                        </p>
                        {currentTask.status === "pending" ? (
                            <button
                                className="w-[5rem] text-white h-[2rem] bg-sky-500 rounded-md shadow-md hover:bg-violet-700 hover:shadow-lg transition-all duration-150 delay-150"
                                onClick={handleEditClick}
                            >
                                Edit
                            </button>
                        ) : null}
                    </div>
                </div>
                <div className="p-5">
                    <Fieldset legend="Summary" className="mt-5 border-2 rounded-xl bg-opacity-40">
                        <p className="font-medium text-md pt-5 pb-5">{currentTask.summary}</p>
                    </Fieldset>
                    <Fieldset legend="Details" className="mt-5 border-2 rounded-xl">
                        <p className="font-medium text-md pt-5 pb-8">{currentTask.details}</p>
                    </Fieldset>
                    <Fieldset legend="Task Information" className="mt-5 border-2 rounded-xl">
                        <div className="flex flex-col gap-2 pt-5">
                            <h3><span className="font-bold">User and email:</span> {currentTask.assignedUser.name +"  "+currentTask.assignedUser.email}</h3>
                            <h3><span className="font-bold">Start Time:</span> {currentTask.startTime ? formatDate(currentTask.startTime) : "NA"}</h3>
                            <h3><span className="font-bold">End Time:</span> {currentTask.endTime ? formatDate(currentTask.endTime) : "NA"}</h3>
                            <h3><span className="font-bold">Duration:</span> {calculateDuration(currentTask.startTime, currentTask.endTime)}</h3>
                        </div>
                    </Fieldset>
                </div>
            </div>
            <EditTaskModal
                isOpen={isEditModalOpen}
                onClose={handleCloseModal}
                task={currentTask}
                onUpdate={handleUpdateTask}
            />
        </>
    );
};

export default AdminTaskDetails;
