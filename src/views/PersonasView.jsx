import {useState,useEffect} from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export default function PersonasView(){



    const [personas,setPersonas] = useState([]);


    return(
        <>
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>Personas View</h1>
                    </Grid>
                    <Grid item xs={12}>
                        
                    </Grid>
                    <Grid item xs={12}>
                    
                    </Grid>
                    <Grid item xs={12}>
                    
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}