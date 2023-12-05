import { Badge, Button, Card, Container, Grid, Tooltip, Typography } from "@mui/material";

import { grey } from "@mui/material/colors";

import IconProvider from "../../components/IconProvider"
/// ----------------------------------------------------------------

const conquistas = [
    {
        'id': 'drink-water',
        'title': 'Fique hidratado',
        'description': 'Crie o hábito de beber água',
        'icon':{
            'icon': 'fa6-solid:bottle-water',
            'color': '#8EECF5'
        },
        'done': false
    },
    {
        'id': 'eat-health',
        'title': 'Dieta',
        'description': 'Comece a fazer uma refeição saúdavel',
        'icon':{
            'icon': 'noto-v1:watermelon',
            'color': '#8EECF5'
        },
        'done': false
    },
    {
        'id': 'tasks-complete',
        'title': 'Rotina',
        'description': 'Complete todas as tarefas de um dia.',
        'icon':{
            'icon': 'noto:ledger',
            'color': '#8EECF5'
        },
        'done': false
    },
    {
        'id': 'sleep',
        'title': 'Bons sonhos',
        'description': 'Durma antes das 22h',
        'icon':{
            'icon': 'noto:sleeping-face',
            'color': '#8EECF5'
        },
        'done': false
    },
    {
        'id': 'meditation',
        'title': 'Corpo e mente',
        'description': 'Comece a fazer exercicios.',
        'icon':{
            'icon': 'noto:flexed-biceps',
            'color': '#8EECF5'
        },
        'done': false
    },
    {
        'id': 'diary-I',
        'title': 'Diário I',
        'description': 'Escreva no diário 3 dias consecutivos',
        'icon':{
            'icon': 'noto:3rd-place-medal',
            'color': '#8EECF5'
        },
        'done': false
    },
    {
        'id': 'diary-II',
        'title': 'Diário II',
        'description': 'Escreva no diário 7 dias consecutivos',
        'icon':{
            'icon': 'noto:2nd-place-medal',
            'color': '#8EECF5'
        },
        'done': false
    },
    {
        'id': 'diary-III',
        'title': 'Diário II',
        'description': 'Escreva no diário 30 dias consecutivos',
        'icon':{
            'icon': 'noto:1st-place-medal',
            'color': '#8EECF5'
        },
        'done': false
    },
]

export default function Achievements(){
    return (
        <>
            <Container>

                <Typography variant="h1">Conquistas</Typography>

                <Card sx={{p: 2, mt: 3}}>
                    <Grid 
                        container
                    >
                        {conquistas.map((conquista)=>(
                            <>
                                <Tooltip title={conquista.description} sx={{m: 2}}>
                                    <Badge badgeContent={conquista.done ? <IconProvider icon={'lets-icons:check-fill'} sx={{color: 'primary.main'}}/> : ''}>
                                        <Grid 
                                            item
                                            sx={{
                                                border: 1,
                                                borderColor: grey[200],
                                                p: 3,
                                                borderRadius: 3,
                                                boxShadow: 3,
                                                width: 140,
                                                height: 140,
                                                display: 'flex',
                                                flexDirection:'column',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <IconProvider icon={conquista.icon.icon} sx={{mb: 1, color: conquista.icon.color}}/>
                                            <Typography sx={{textAlign: 'center'}}>{conquista.title}</Typography>
                                        </Grid>
                                    </Badge>
                                </Tooltip>
                            </>
                        ))}
                    </Grid>
                </Card>
            </Container>
        </>
    )
}