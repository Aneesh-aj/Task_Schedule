import React, { useState, useEffect } from 'react';
import AdminTaskDetails from "./AdminTaskDetails";
import CreateTaskModal from "./CreateTaskModal";
import toast, { Toaster } from 'react-hot-toast';
import { getTasks, getUsers } from '../../Api/admin';
import { Dropdown } from 'primereact/dropdown';
import { Paginator } from 'primereact/paginator';
import 'primereact/resources/themes/saga-blue/theme.css';  
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const AllTaskList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null); 
    const [statusFilter, setStatusFilter] = useState(null); 
    const [first, setFirst] = useState(0); 
    const [rows, setRows] = useState(10); 

    useEffect(() => {
        getAlluser();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [tasks, statusFilter, first, rows]);

    async function getAlluser() {
        try {
            const response = await getUsers();
            const taskResponse = await getTasks();
            setUsers(response.users);
            setTasks(taskResponse.task || []);
        } catch (error) {
            if(error.response.data == "Unauthorized"){
                toast.error(" Invalid Acess!! Login again")
            }
        }
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };

    const applyFilters = () => {
        let filtered = tasks;

        if (statusFilter) {
            filtered = tasks.filter(task => task && task.status === statusFilter);
        }

        const start = first;
        const end = start + rows;
        setFilteredTasks(filtered?.slice(start, end));
    };

    const onStatusChange = (e) => {
        setStatusFilter(e.value);
        setFirst(0);
    };

    const onPageChange = (e) => {
        setFirst(e.first);
        setRows(e.rows);
    };

    const statusOptions = [
        { label: 'Pending', value: 'pending' },
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Completed', value: 'complete' }
    ];

    const addNewTask = async(task) => {
        getAlluser();  
    };

    const handleUpdateTask = async(updatedTask) => {
        getAlluser();  
    };

    return (
        <>
            <div className="w-[90%]">
                <div className="w-full h-[4rem] mt-3 flex gap-4 bg-white rounded-lg p-5 shadow-xl justify-between">
                    <Toaster/>
                    <div className="flex gap-5">
                        <h1 className="font-bold text-lg">Filter</h1>
                        <Dropdown
                            value={statusFilter}
                            options={statusOptions}
                            onChange={onStatusChange}
                            placeholder="Select a Status"
                            className="rounded-md ps-1 h-[2rem]"
                        />
                    </div>
                    <div className="">
                        <button
                            className="w-[5rem] text-white h-[2rem] bg-sky-500 rounded-md shadow-md hover:bg-violet-700 hover:shadow-lg hover:scale-95 transition-all duration-150 delay-150"
                            onClick={handleOpenModal}
                        >
                            Create
                        </button>
                    </div>
                </div>
                <div className="w-full h-screen mt-2 flex mb-3">
                    <div className="h-full w-[45%] flex flex-col items-center ">
                        <div className="w-full h-full ps-5 pe-5 mt-6 flex flex-col gap-2">
                            {filteredTasks?.length > 0 ? (
                                filteredTasks.map((ele) => ele ? (
                                    <div
                                        key={ele._id}
                                        className={`p-1 border-s-8 text-blue-400 flex flex-col items-center gap-1 shadow-xl cursor-pointer rounded-2xl w-full ${selectedTask?._id === ele._id ? "bg-gray-100":"bg-white"} h-28
                ${ele.status === 'complete' ? 'border-green-500'
                                                : ele.status === 'ongoing' ? 'border-orange-500'
                                                    : ele.status === 'pending' ? 'border-yellow-300'
                                                        : 'border-gray-300'}`}
                                        onClick={() => handleTaskClick(ele)}
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
                                ) : null)
                            ) : (
                                <div className=" w-full h-full flex items-center bg-white rounded-lg shadow-xl opacity-40 justify-center">No tasks available</div>
                            )}

                        </div>
                        <Paginator
                            first={first}
                            rows={rows}
                            totalRecords={tasks?.length}
                            rowsPerPageOptions={[5, 10, 20]}
                            onPageChange={onPageChange}
                            className='bg-white bg-opacity-40'
                        />
                    </div>
                    <div className="h-full w-[60%] p-5">
                        <AdminTaskDetails task={selectedTask} onUpdateTask={handleUpdateTask} />
                    </div>
                </div>
            </div>
            <CreateTaskModal open={isModalOpen} handleClose={handleCloseModal} users={users} addNewTask={addNewTask} />
        </>
    );
}

export default AllTaskList;
