import React from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '@mui/material/Autocomplete';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createTask } from '../../Api/admin';
import toast, { Toaster } from 'react-hot-toast';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    summary: Yup.string().required('Summary is required'),
    details: Yup.string().required('Details are required'),
    assignedUser: Yup.object().nullable().required('Assigned user is required'),
});

const CreateTaskModal = ({ open, handleClose, users, addNewTask }) => {
    const handleCreate = async (values, { setSubmitting }) => {
        try {
            console.log("Creating task:", values);
            const response = await createTask(values);
            console.log("Task creation response:", response);
            if (response.success) {
                toast.success(response.message);
                addNewTask(response.task);
                handleClose();
            }
        } catch (error) {
            if (error.response.data == "Unauthorized") {
                toast.error(" Invalid Acess!! Login again")
            }
             toast.error('Failed to create task');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Toaster />
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create Task
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Formik
                    initialValues={{ title: '', summary: '', details: '', assignedUser: null }}
                    validationSchema={validationSchema}
                    onSubmit={handleCreate}
                >
                    {({ setFieldValue, values, isSubmitting }) => (
                        <Form>
                            <Field
                                as={TextField}
                                name="title"
                                label="Title"
                                fullWidth
                                margin="normal"
                                error={!!values.title && values.title === ''}
                                helperText={
                                    <ErrorMessage name="title">
                                        {msg => <Typography color="error">{msg}</Typography>}
                                    </ErrorMessage>
                                }
                            />
                            <Field
                                as={TextField}
                                name="summary"
                                label="Summary"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={3}
                                error={!!values.summary && values.summary === ''}
                                helperText={
                                    <ErrorMessage name="summary">
                                        {msg => <Typography color="error">{msg}</Typography>}
                                    </ErrorMessage>
                                }
                            />
                            <Field
                                as={TextField}
                                name="details"
                                label="Details"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={5}
                                error={!!values.details && values.details === ''}
                                helperText={
                                    <ErrorMessage name="details">
                                        {msg => <Typography color="error">{msg}</Typography>}
                                    </ErrorMessage>
                                }
                            />
                            <Autocomplete
                                options={users}
                                getOptionLabel={(option) => option.name}
                                onChange={(event, newValue) => setFieldValue('assignedUser', newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Assign to User"
                                        margin="normal"
                                        error={!!values.assignedUser && values.assignedUser === null}
                                        helperText={
                                            <ErrorMessage name="assignedUser">
                                                {msg => <Typography color="error">{msg}</Typography>}
                                            </ErrorMessage>
                                        }
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {params.InputProps.endAdornment}
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                            <Box mt={2} display="flex" justifyContent="flex-end">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Create
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
};

export default CreateTaskModal;
