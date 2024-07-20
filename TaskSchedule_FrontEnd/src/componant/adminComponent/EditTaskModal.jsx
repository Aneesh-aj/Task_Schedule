import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { updateTask } from '../../Api/admin';

const EditTaskModal = ({ isOpen, onClose, task, onUpdate }) => {
    const formik = useFormik({
        initialValues: {
            title: '',
            summary: '',
            details: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            summary: Yup.string().required('Summary is required'),
            details: Yup.string().required('Details are required')
        }),
        onSubmit: async (values) => {
            try {
                const response = await updateTask(task._id, values);
                console.log(" the response", response)
                if (response.success) {
                    toast.success('Task updated successfully');
                    onClose(); // Close the modal
                    onUpdate(response.task); // Pass the updated task to the parent component
                } else {
                    toast.error('Failed to update task');
                }
            } catch (error) {
                if(error.response.data == "Unauthorized"){
                    toast.error(" Invalid Acess!! Login again")
                }
                toast.error('Failed to update task');
            }
        }
    });

    useEffect(() => {
        if (task) {
            formik.setValues({
                title: task.title,
                summary: task.summary,
                details: task.details
            });
        }
    }, [task]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                <Toaster/>
                <h2 className="text-lg font-bold mb-4">Edit Task</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            className={`border rounded-md p-2 w-full ${formik.errors.title ? 'border-red-500' : ''}`}
                        />
                        {formik.errors.title && <p className="text-red-500 text-sm">{formik.errors.title}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Summary</label>
                        <textarea
                            name="summary"
                            onChange={formik.handleChange}
                            value={formik.values.summary}
                            className={`border rounded-md p-2 w-full ${formik.errors.summary ? 'border-red-500' : ''}`}
                        />
                        {formik.errors.summary && <p className="text-red-500 text-sm">{formik.errors.summary}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Details</label>
                        <textarea
                            name="details"
                            onChange={formik.handleChange}
                            value={formik.values.details}
                            className={`border rounded-md p-2 w-full ${formik.errors.details ? 'border-red-500' : ''}`}
                        />
                        {formik.errors.details && <p className="text-red-500 text-sm">{formik.errors.details}</p>}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTaskModal;
