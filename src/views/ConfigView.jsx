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
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase-config";
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
import DoneIcon from '@mui/icons-material/Done';
import FileUploadButton from "../components/fileUploadButton";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Chip from '@mui/material/Chip';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ProfilePhoto from "../components/profile-phot";
import { useDispatch } from 'react-redux';
import { setUser } from "../features/auth/userSlice";
export default function ConfigView() {
    const [showPassword, setShowPassword] = useState(false);
    const [ciudades, setCiudades] = useState([]);
    const [age, setAge] = useState('');
    const [ciudad,setCiudad] = useState('');
    const [factura, setFactura] = useState(false)
    const [password, setPassword] = useState("");
    const [signatureFile, setSignatureFile] = useState(null);
    const [open, setOpen] = useState(false);
    const [profileFile, setProfileFile] = useState(null);
    const [imagenURL, setImagenURL] = useState(null);
    const [contabilidad,setContabilidad] = useState(false);
    const [direccionRuc,setDireccionRuc]  = useState("");
    const [nombreComercial,setNombreComercial]  = useState("");
    const dispatch = useDispatch();
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const userState = useSelector(state => state.auth);
    const getData = () => {

        let final_data = []
        for (let i = 1; i <= 23; i++) {
            let canton_code = i * 100
            let cantones = dataEcu[i]['cantones']
            let provincia = dataEcu[i]['provincia']

            let counter = Object.keys(cantones).length;

            for (let j = 1; j <= counter; j++) {
                let dec = canton_code + j
                let canton = dataEcu[i]['cantones'][dec]['canton']
                let nombre = provincia + ' - ' + canton
                final_data.push(nombre)
            }

        }
        setCiudades(final_data)
        setCiudad(userState.ciudad)
        setContabilidad(userState.contabilidad)
        setFactura(userState.factura)
        setDireccionRuc(userState.direccion_ruc)
        setNombreComercial(userState.nombre_comercial)
        setPassword(userState.firma_password)

    }

    const handleFactura =(event)=>{
        setFactura(event.target.value);
    }
    const handleChangeContabilidad = (event) => {
        setContabilidad(event.target.value);
    };
    
    const actualizarDatos = async () => {
        setOpen(true);
        const user_ref = doc(db, "usuarios", userState.id);
        let user_copy = JSON.parse(JSON.stringify(userState))
        let url_profile = ''
        if (profileFile !== null) {
            const spaceRef = ref(storage, `profiles/${profileFile.name}`);
            await uploadBytes(spaceRef, profileFile).then(async (snapshot) => {
                console.log('Uploaded an array!');
                await getDownloadURL(snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    url_profile = downloadURL
                });
            });
            user_copy['profile'] = true
            user_copy['profile_url'] = url_profile
            
        } 
        if (signatureFile !== null) {
            const spaceRef = ref(storage, `firmas/${signatureFile.name}`);
            await uploadBytes(spaceRef, signatureFile).then(async (snapshot) => {
                console.log('Uploaded an array!');
                await getDownloadURL(snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    url_profile = downloadURL
                });
            });
            user_copy['signature'] = true
            user_copy['signature_url'] = url_profile
            user_copy['signature_name'] = signatureFile.name
        } 
        
        user_copy['contabilidad'] = contabilidad
        user_copy['ciudad'] = ciudad
        user_copy['direccion_ruc'] = direccionRuc
        user_copy['nombre_comercial'] = nombreComercial
        user_copy['factura'] = factura
        user_copy['firma_password'] = password

        
        dispatch(setUser(user_copy));
        console.log(user_copy)
        // Set the "capital" field of the city 'DC'
        await updateDoc(user_ref, user_copy);
        setOpen(false)
    }



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSignatureFile(file)

    };


    const handleFileUpload = (file) => {
        // Aquí puedes manejar el archivo subido, por ejemplo, enviarlo a un servidor o realizar alguna operación con él.

        const url = URL.createObjectURL(file);
        setImagenURL(url);
        setProfileFile(file);
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <Container maxWidth="md">
                <Stack direction={{ xs: 'column', md: 'row' }} alignItems={"center"} spacing={2}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <h5 style={{ textAlign: 'left', color: '#6C737F' }}>Configuración de datos personales</h5>
                        </Grid>
                        <Grid item xs={12} md={6}>
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
                                onChange={(event, newValue) => {
                                    setCiudad(newValue);
                                }}
                                value={ciudad}
                                options={ciudades}
                                renderInput={(params) => <TextField {...params} label="Ciudad" />}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group">Obligado a llevar contabilidad ?</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={contabilidad}
                                        row
                                        onChange={handleChangeContabilidad}
                                    >
                                    <FormControlLabel value={false} control={<Radio />} label="si" />
                                    <FormControlLabel value={true} control={<Radio />} label="no" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                    </Grid>
                    <Stack spacing={2}>

                        <ProfilePhoto condition={userState.profile} url={imagenURL !== null ? imagenURL : userState.profile_url} />
                        <FileUploadButton onFileUpload={handleFileUpload} />
                    </Stack>
                </Stack>
                <Grid container marginTop={4} spacing={1}>
                    <Grid item xs={12}>
                        <h5 style={{ textAlign: 'left', color: '#6C737F' }}>Configuracion de facturacion</h5>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Dirección registrada en el RUC"
                            multiline
                            rows={3}
                            fullWidth
                            value={direccionRuc}
                            onChange={(event) => {
                                setDireccionRuc(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Nombre Comercial Registrado en el RUC"
                            multiline
                            value={nombreComercial}
                            rows={3}
                            onChange={(event) => {
                                setNombreComercial(event.target.value);
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="filled">
                            <InputLabel htmlFor="filled-adornment-password">Ha emitido facturas?</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={factura}
                                label="Has emitido facturas anteriormente"
                                onChange={handleFactura}
                            >
                                <MenuItem value={false}> No, mi ruc es nuevo</MenuItem>
                                <MenuItem value={true}>  Si, He emitido facturas anteriormente.</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack direction="row" alignItems={"center"} spacing={1}>
                            <TextField
                                id="outlined-password-input"
                                label=""
                                type="text"
                                autoComplete="current-password"
                                sx={{ width: 100 }}
                            />
                            <strong>-</strong>
                            <TextField
                                id="outlined-password-input"
                                label=""
                                type="text"
                                autoComplete="current-password"
                                sx={{ width: 100 }}
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
                        <h5 style={{ textAlign: 'left', color: '#6C737F', marginTop: 7 }}>Configuracion de la firma electronica</h5>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="column" spacing={3}>

                                <p style={{ textAlign: "left" }}>Registre o actualice su firma Electronica para validar las facturas en el sistema del SRI.</p>
                                <stack direction="row" spacing={2}>
                                    <input type="file" disabled={userState.signature} width={200} onChange={handleFileChange} />
                                    <Chip label={userState.signature_name} variant="outlined" color="success" icon={<DoneIcon/>}/>  
                                </stack> 
                            <FormControl fullWidth variant="filled">
                                <InputLabel htmlFor="filled-adornment-password">Contraseña de la firma</InputLabel>
                                <FilledInput
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                    }}
                                    value={password}

                                    type={showPassword ? 'text' : 'password'}
                                    style={{ width: 240 }}
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
                        <Button sx={{ marginTop: 5 }} onClick={actualizarDatos} variant="contained">GUARDAR CAMBIOS</Button>
                    </Grid>
                </Grid>

            </Container>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}
//Bely2201828138