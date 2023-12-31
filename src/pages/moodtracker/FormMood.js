import { useEffect, useState } from "react";
import api from "../../services/api"

import { Card, Typography, Grid, Button, Box, TextField, Alert } from "@mui/material";
//
import IconProvider from "../../components/IconProvider";
import fantastic from '../../components/assets/moods/fantastic.jpg'
import happy from '../../components/assets/moods/happy.jpg'
import sad from '../../components/assets/moods/sad.jpg'
import tired from '../../components/assets/moods/tired.jpg'
import soso from '../../components/assets/moods/soso.jpg'
import { LoadingButton } from "@mui/lab";
import secureLocalStorage from "react-secure-storage";
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

//


const listMood = [
    {
        "name": "Fantastico",
        "value": "fantastico",
        "icon": "iconoir:emoji-talking-happy",
        "img": fantastic
    },
    {
        "name": "Feliz",
        "value": "feliz",
        "icon": "ant-design:smile-outlined",
        "img": happy
    },
    {
        "name": "OK",
        "value": "OK",
        "icon": "ant-design:meh-outlined",
        "img": soso
    },
    {
        "name": "Cansado",
        "value": "cansado",
        "icon": "fluent-emoji-high-contrast:sleeping-face",
        "img": tired
    },
    {
        "name": "Triste",
        "value": "triste",
        "icon": "ant-design:frown-outlined",
        "img": sad
    }
]

// ----------------------------------------------------------------
export default function FormMood(){
    const [isLoading, setLoading ] = useState()
    const [error, setError] = useState()
    //
    const [icon, setIcon] = useState()

    const [mood, setMood] = useState()

    const [observation, setObservation] = useState()

    function handleSave(){
        setLoading(true)
        const newmood = [{
            text: observation,
            mood: mood,
            icon: icon,
            related_user: secureLocalStorage.getItem('secret')
        }]
        console.log(newmood)
        api.post('/moodtracker', newmood).then(
            response => {
                setLoading(false)
                window.location.reload()
            },
            response => {
                setError(response.response.data?.message ?? 'Ocorreu um erro, tente novamente mais tarde')
            }
        )
    }

    return (
        <>
            <Typography variant="primary">Como você está se sentindo?</Typography>
            <Grid container>
                {listMood.map((items)=>(
                    <Grid sx={{py: 3, m: 3}}>
                        <Box
                            component="img"
                            sx={mood === items.value ?
                                {
                                    height: 80,
                                    width: 80,
                                    borderRadius: '50%',
                                    opacity: 1,
                                    border: '1px solid #F4F6F8'
                                }
                            : 
                                {
                                    height: 80,
                                    width: 80,
                                    borderRadius: '50%',
                                    opacity: [0.5, 0.4, 0.3],
                                    '&:hover': {
                                    opacity: 1,
                                    },
                                }
                            }
                            alt="Fantastic items "
                            src={items.img}
                            onClick={()=>{setMood(items.value);setIcon(items.icon)}}
                        />
                        <Typography sx={{textAlign: "center"}}>{items.name}</Typography>
                    </Grid>
                ))}
            </Grid>

            <Grid sx={{py: 3}}>
                <Typography sx={{pb:2}}>Nos conte como foi seu dia</Typography>
                <TextField variant="outlined" fullWidth multiline rows={4} onChange={e=>{setObservation(e.target.value)}}/>
            </Grid>

            {error ? 
                <Alert variant="outlined" severity="error">
                    {error}
                </Alert>
            : ''}

            <LoadingButton variant="contained" onClick={e=>{handleSave()}} loading={isLoading}>
                <IconProvider icon={'fluent:save-24-regular'} sx={{mr:2}}/>
                Salvar
            </LoadingButton>
        </>
    )
}