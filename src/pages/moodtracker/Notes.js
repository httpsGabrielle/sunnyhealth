import { Card, Box, Typography, Grid } from "@mui/material";
import IconProvider from "../../components/IconProvider";
import palette from "../../theme/design/palette"
// ----------------------------------------------------------------

export default function Notes({note}){
    return(
        <>
            <Card sx={{p:3, my: 2}}>
                <Grid container alignItems="center">
                    <Grid sx={{pr: 2}}>
                        <Box 
                            sx={{
                                borderRadius: '50%',
                                height: 48,
                                width: 48,
                                p:1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <IconProvider icon={note.icon ?? 'ant-design:smile-outlined'}/>
                        </Box>
                    </Grid>
                    <Grid>
                        <Typography>{new Date(note.createdAt).toLocaleDateString("pt-BR", {year: "numeric",month: "long",day: "numeric"})}</Typography>
                    </Grid>
                </Grid>
                <Grid sx={{m:3, p: 3, backgroundColor: palette.grey[200], borderRadius: 8}} >
                    <Grid container alignItems="center">
                        <Grid sx={{pr: 2}}>
                            <Box 
                                sx={{
                                    backgroundColor: palette.common.white,
                                    borderRadius: '50%',
                                    height: 48,
                                    width: 48,
                                    p:1,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <IconProvider icon={'mingcute:chat-2-fill'}/>
                            </Box>
                        </Grid>
                        <Grid>
                            <Typography>{note.text}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}