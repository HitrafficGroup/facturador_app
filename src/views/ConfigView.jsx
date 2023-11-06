import { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonIcon from '@mui/icons-material/Person';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { useSelector } from 'react-redux';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import Stack from '@mui/material/Stack';
import profile from '../assets/profile3.png';
import NumbersIcon from '@mui/icons-material/Numbers';
import Autocomplete from '@mui/material/Autocomplete';
import dataEcu from "../scripts/provincias.json";
export default function ConfigView() {

    const userState = useSelector(state => state.auth);
    const getData= ()=>{
        console.log(dataEcu)
        let final_data = []
        for(let i = 0;i<=24;i++){
           
            let aux_cantones = dataEcu[i]
            console.log(dataEcu[i])
        }
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <Container maxWidth="md">
                <Stack direction="row" spacing={2}>
                    <Grid container spacing={1}>
                      
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="filled">
                                <InputLabel htmlFor="filled-adornment-password">Razon</InputLabel>
                                <FilledInput
                                    type="text"
                                    value={userState.razon}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton aria-label="toggle password visibility" edge="end">
                                                <PersonIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Razon"
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth variant="filled">
                                <InputLabel htmlFor="filled-adornment-password">Email</InputLabel>
                                <FilledInput
                                    type="text"
                                    value={userState.email}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton aria-label="toggle password visibility" edge="end">
                                                <AlternateEmailIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Email"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="filled">
                                <InputLabel htmlFor="filled-adornment-password">Telefono</InputLabel>
                                <FilledInput
                                    type="text"
                                    value={userState.phone}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton aria-label="toggle password visibility" edge="end">
                                                <PhoneAndroidIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Telefono"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="filled">
                                <InputLabel htmlFor="filled-adornment-password">Ruc</InputLabel>
                                <FilledInput
                                    type="text"
                                    value={userState.ruc}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton aria-label="toggle password visibility" edge="end">
                                                <NumbersIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Ruc"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="filled">
                                <InputLabel htmlFor="filled-adornment-password">Ciudad</InputLabel>
                                <FilledInput
                                    type="text"
                                    value={userState.ruc}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton aria-label="toggle password visibility" edge="end">
                                                <NumbersIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Ruc"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>

                        </Grid>
                        <Grid item xs={12}>

                        </Grid>
                    </Grid>
                    <div style={{height:"15rem",width:"20rem",borderRadius:5,borderStyle:"dashed",color:"#B2BABB",display:"flex",borderWidth:5,alignItems:"center",justifyContent:"center"}}>
                        <img  src={profile}  style={{height:"60%",width:"60%"}}/>
                    </div>
                </Stack>
            </Container>
        </>
    );
}