import { useEffect, useState } from "react";

import api from "../../services/api"

import { Button, Card, Container, Grid, Modal, Box, Typography, Backdrop, CircularProgress } from "@mui/material";

import IconProvider from '../../components/IconProvider'

import FormTask from './FormTask'
import Task from "./Task";

// ----------------------------------------------------------------

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    p: 3,
};

// ----------------------------------------------------------------

export default function TasksList(){
    const [taskList, setTaskList] = useState([])
    //
    const [isLoading, setLoading ] = useState(false)
    const [error, setError] = useState()
    //
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(()=>{
        getTaskList()
    },[])

    function getTaskList(){
        setLoading(true)
        api.get(`/task/${sessionStorage.getItem('secret')}`).then(
            response => {
                setLoading(false)
                setTaskList(response.data)
            },
            response => {
                setLoading(false)
                setError(response.response.data?.message ?? 'Ocorreu um erro, tente novamente mais tarde')
            }
        )
    }

    return (
        <>
            <Container>

                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{p:3}}
                >

                    <Grid>
                        <Typography variant="h6"><IconProvider icon={'mingcute:list-check-2-fill'} sx={{mx: 2}}/>Tarefas</Typography>
                    </Grid>

                    <Grid>
                        <Button onClick={handleOpen} variant="contained">
                            <IconProvider icon={'heroicons-solid:plus-sm'} sx={{me: 2}}/>
                            Nova Tarefa
                        </Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Card sx={style}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{py: 2}}
                                >
                                    <Typography variant="h1">Nova Tarefa</Typography>
                                    <Button variant="fill"><IconProvider icon={'mingcute:close-fill'} onClick={handleClose}/></Button>
                                </Grid>
                                <FormTask/>
                            </Card>
                        </Modal>
                    </Grid>

                </Grid>

                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    sx={{p:3}}
                >

                    <Grid xs={12}>
                        {taskList.map((task)=>(
                            <Task date={new Date(task.date)} name={task.name} complete={task.complete} _id={task._id}/>
                        ))}
                    </Grid>

                </Grid>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

            </Container>
        </>
    )
}