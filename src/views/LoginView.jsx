import { useState } from "react";
import Stack from '@mui/material/Stack';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import logo from "../assets/logofinal.png";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Grid from '@mui/material/Grid';
export default function LoginView(){
    const [personas,setPersona] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [modalRegistro, setModalRegistro] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const navigate = useNavigate(); 
    const toggle = () => setModalRegistro(!modalRegistro);
    const cambiarVista = (path) => {
      navigate(path);
  } 

    return(
            <>
                <div style={{background:"#2C3E50",height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>         
                        <div style={{height:"33em",width:"20em",padding:25,backgroundColor:"white",borderRadius:"10px"}}>
                            <Stack spacing={2} alignItems={"center"} justifyContent={"center"}>
                            <img src={logo} alt='logo de la empresa' height={180} width={200}/> 
                            <FormControl fullWidth variant="filled">
                                <InputLabel htmlFor="filled-adornment-password">Usuario</InputLabel>
                                <FilledInput
                                    id="filled-adornment-password"
                                        type="text"
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                
                                            edge="end"
                                            >
                                                <PersonIcon/>
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                                <FormControl fullWidth  variant="filled">
                                <InputLabel htmlFor="filled-adornment-password">Contraseña</InputLabel>
                                <FilledInput
                                    id="filled-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
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
                                <Button variant="contained" color="verde2" fullWidth onClick={()=>{cambiarVista('/registrar')}}>Iniciar Sesion</Button>
                                <Button variant="contained" fullWidth onClick={toggle}>Registrar</Button>
                            </Stack>
                        </div>
                 
                </div>
                <Modal isOpen={modalRegistro} toggle={toggle} >
                    <ModalHeader toggle={toggle}>Registrar Nueva Cuenta</ModalHeader>
                    <ModalBody>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                    
                            </Grid>
                            <Grid item xs={4}>
                            
                            </Grid>
                            <Grid item xs={4}>
                            
                            </Grid>
                            <Grid item xs={8}>
                            
                            </Grid>
                        </Grid>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        Crear Cuenta
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancelar
                    </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
}