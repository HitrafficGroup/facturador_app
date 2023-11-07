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
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import Stack from '@mui/material/Stack';
import profile from '../assets/profile3.png';
import NumbersIcon from '@mui/icons-material/Numbers';
import Autocomplete from '@mui/material/Autocomplete';
import dataEcu from "../scripts/provincias.json";
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FileUploadButton from "../components/fileUploadButton";
export default function ConfigView() {
    const [showPassword, setShowPassword] = useState(false);
    const [ciudades,setCiudades] = useState([]);
    const [age, setAge] = useState('');
    const [factura,setFactura] = useState(false)
    const [password,setPassword] = useState("");
    const handleChange = (event) => {
      setAge(event.target.value);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);  
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const userState = useSelector(state => state.auth);
    const getData= ()=>{
    
        let final_data = []
        for(let i = 1;i<=23;i++){
            let canton_code = i*100
            let cantones = dataEcu[i]['cantones']
            let provincia = dataEcu[i]['provincia']
       
            let counter = Object.keys(cantones).length;
       
            for (let j = 1 ; j <= counter;j++){
                let dec = canton_code+j
                let canton = dataEcu[i]['cantones'][dec]['canton']
                let nombre = provincia+' - '+ canton
                final_data.push(nombre)
            }
            
        }
        setCiudades(final_data)

    }
    const handleFileUpload = (file) => {
        // Aquí puedes manejar el archivo subido, por ejemplo, enviarlo a un servidor o realizar alguna operación con él.
        console.log('Archivo subido:', file);
      };
    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <Container maxWidth="md">
                <Stack  direction={{ xs: 'column', md: 'row' }} alignItems={"center"} spacing={2}>
                    <Grid container spacing={1}>
                    <Grid item xs={12}>
                            <h5 style={{textAlign:'left',color:'#6C737F'}}>Configuracion de la cuenta</h5>
                        </Grid>
                        <Grid item  xs={12} md={6}>
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

                        <Grid item xs={12} md={6}>
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
                        <Grid item xs={12} md={6}>
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
                        <Grid item xs={12} md={6}>
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
                        <Grid item xs={12} md={6}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            fullWidth
                            options={ciudades}
                            
                            renderInput={(params) => <TextField {...params} label="Ciudad" />}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Obligado a llevar contabilidad?</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="si" control={<Radio />} label="si" />
                                    <FormControlLabel value="no" control={<Radio />} label="no" />
                                   
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        
                    </Grid>
                        <Stack spacing={2}>    
                            <div style={{height:"15rem",width:"20rem",borderRadius:5,borderStyle:"dashed",color:"#B2BABB",display:"flex",borderWidth:5,alignItems:"center",justifyContent:"center"}}>
                                <img  src={profile}  style={{height:"60%",width:"60%"}}/>
                            </div>
                            <FileUploadButton onFileUpload={handleFileUpload} />
                        </Stack>
                </Stack>
                <Grid container marginTop={4} spacing={1}>
                    <Grid item xs={12}>
                            <h5 style={{textAlign:'left',color:'#6C737F'}}>Configuracion del ruc</h5>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Dirección registrada en el RUC"
                        multiline
                        rows={3}
                        maxRows={3}
                        fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Nombre Comercial Registrado en el RUC"
                        multiline
                        rows={3}
                        maxRows={3}
                        fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="filled">
                            <InputLabel htmlFor="filled-adornment-password">Ha emitido facturas?</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Has emitido facturas anteriormente"
                                onChange={handleChange}
                            >
                                <MenuItem value={false}>No, mi ruc es nuevo</MenuItem>
                                <MenuItem value={true}>Si, He emitido facturas anteriormente.</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack direction="row"  alignItems={"center"} spacing={1}>
                            <TextField
                                id="outlined-password-input"
                                label=""
                                type="text"
                                autoComplete="current-password"
                                sx={{width:100}}
                                />
                                <strong>-</strong>
                                <TextField
                                id="outlined-password-input"
                                label=""
                                type="text"
                                autoComplete="current-password"
                                sx={{width:100}}
                                />
                                <strong>-</strong>
                                <TextField
                                id="outlined-password-input"
                                label=""
                                type="text"
                                fullWidth
                                autoComplete="current-password"
                                />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <h5 style={{textAlign:'left',color:'#6C737F',marginTop:7}}>Configuracion de la firma electronica</h5>
                    </Grid>
                    <Grid item xs={12}>
                    <Stack direction="column"  spacing={1}>
                        <p style={{textAlign:"left"}}>Registre o actualice su firma Electronica para validar las facturas en el sistema del SRI.</p>
                        <input type="file" />
                        <FormControl fullWidth  variant="filled">
                                <InputLabel htmlFor="filled-adornment-password">Contraseña de la firma</InputLabel>
                                <FilledInput
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                    }}
                      
                                    type={showPassword ? 'text' : 'password'}
                                    style={{width:240}}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                                </FormControl>
                    </Stack>
                       
                    </Grid>
                    <Grid item xs={12}>
                        <Button  sx={{marginTop:5}} variant="contained">GUARDAR CAMBIOS</Button>
                    </Grid>
                </Grid>
                
            </Container>
        </>
    );
}