import { useEffect, useState } from "react";

import { grey } from "@mui/material/colors";

import IconProvider from "../../components/IconProvider";

import { Backdrop, Button, Card, Checkbox, CircularProgress, Divider, FormControlLabel, Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import api from "../../services/api";

//----------------------------------------------------------------

export default function Task({ date , name, complete, _id }){
    const [isLoading, setLoading ] = useState(false)
    const [error, setError ] = useState(false)
    const [status, setStatus] = useState(complete)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(()=>{
        console.log(complete)
    }, [status])

    const handleCompleteTask = () => {
        const data = [{
            complete: !status
        }]
        setLoading(true)
        api.patch(`/task/${_id}`, data).then(
            response => {
                setStatus(!status)
                setLoading(false)
            },
            err => {
                setLoading(false)
                setError(err.response.data?.message ?? 'Ocorreu um erro, tente novamente mais tarde')
            }
        ) 
    };

    const handleDelete = () => {
        api.delete(`/task/${_id}`).then(
            response => {
                setLoading(false)
                window.location.reload()
            },
            err => {
                setLoading(false)
                setError(err.response.data?.message ?? 'Ocorreu um erro, tente novamente mais tarde')
            }
        ) 
    };

    return  (
        <>
            <Card sx={{p: 3, mb: 3}}>

                <Grid
                    container
                    spacing={3}
                >

                    <Grid item>
                        <Typography>{date.toLocaleString('default', {month: 'short'})}</Typography>
                        <Typography variant="h1">{date.getDate()}</Typography>
                    </Grid>

                    <Grid item>
                        <Divider orientation="vertical"/>
                    </Grid>

                    <Grid item xs={2}>

                        <Typography 
                            sx={{display: 'flex'}}
                        >
                            <IconProvider 
                                icon={'ic:round-access-time-filled'} 
                                sx={{mr: 1, color: grey['500']}}
                            />
                            {date.toLocaleTimeString('pt-BR', {hour: 'numeric', minute: 'numeric'})}
                        </Typography>

                        <Typography sx={{display: 'flex'}}>
                            <FormControlLabel control={<Checkbox checked={status} onChange={handleCompleteTask}/>} label="Complete" />
                        </Typography>
                        
                    </Grid>

                    <Grid item xs={8} sx={{display: 'flex'}}>
                        <Typography variant="h2">{name}</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton
                            onClick={handleClick}
                        >
                            <IconProvider icon={'basil:edit-outline'}/>
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            {status === false ?
                                <MenuItem onClick={handleCompleteTask}><IconProvider icon={'wi:time-2'} sx={{mr: 2}}/> Concluir tarefa</MenuItem>
                            : ''}
                            <MenuItem onClick={handleClose}><IconProvider icon={'tabler:edit'} sx={{mr: 2}}/> Editar</MenuItem>
                            <MenuItem onClick={handleDelete}><IconProvider icon={'prime:trash'} sx={{mr: 2}}/> Excluir</MenuItem>
                        </Menu>
                    </Grid>
                </Grid>

            </Card>

            
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}