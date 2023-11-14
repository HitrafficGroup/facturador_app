import {useState,useEffect} from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { collection, query, onSnapshot, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { db } from "../firebase/firebase-config";
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FilledInput from '@mui/material/FilledInput';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import MenuItem from '@mui/material/MenuItem';
import BadgeIcon from '@mui/icons-material/Badge';
import InputAdornment from '@mui/material/InputAdornment';
import CloseIcon from '@mui/icons-material/Close';
import validator from 'validator';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Paper } from "@mui/material";
export default function PersonasView(){
    const [personas,setPersonas] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [modalEditar, setModalEditar] = useState(false);
    const [currentCliente,setCurrentCliente] = useState();
    const [modalCliente,setModalCliente] = useState();
    const [tipoIde,setTipoIde] = useState(1);
    const [correos,setCorreos] = useState([]);
    const [correo,setCorreo] = useState();
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const abrirModalEditar = (item) => {
        setModalEditar(true);
        setCurrentCliente(item);
    }
    const eliminarProducto = async (item) => {
        await deleteDoc(doc(db, "productos", item.id));
    }
    const agregarEmail = () => {
        if(  validator.isEmail(correo) ){
            let aux_emails =  JSON.parse(JSON.stringify(correos));
            aux_emails.push(correo);
            setCorreos(aux_emails);
            setCorreo("")
        }
    }
    const eliminarEmail =(index)=>{
        let aux_emails =  JSON.parse(JSON.stringify(correos));
        aux_emails.splice(index, 1);
        setCorreos(aux_emails);
    }



    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleChange = (event) => {
        setTipoIde(event.target.value);
    };


    return(
        <>
            <Container maxWidth="xl">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>Clientes View</h1>
                    </Grid>
                    <Grid item md={10}>

                    </Grid>
                    <Grid item md={2}>
                    <Button fullWidth variant="contained" startIcon={<AddIcon />} onClick={()=>{setModalCliente(true)}} >Agregar Cliente</Button>
                    </Grid>
                    <Grid item xs={12}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align={'left'}>
                                            Item
                                        </TableCell>
                                        <TableCell align={'center'}>
                                            Descripcion
                                        </TableCell>
                                        <TableCell align={'center'}>
                                            Categoria
                                        </TableCell>
                                        <TableCell align={'center'}>
                                            Valor
                                        </TableCell>
                                        <TableCell align={'center'}>
                                            Codigo
                                        </TableCell>
                                        <TableCell align={'center'}>
                                            Stock
                                        </TableCell>
                                        <TableCell align={'left'}>
                                            Estado
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {personas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                    <TableCell align={"left"}>
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell align={"center"}>
                                                        {row.descripcion}
                                                    </TableCell>
                                                    <TableCell align={"center"}>
                                                        {row.categoria}
                                                    </TableCell>
                                                    <TableCell align={"center"}>
                                                        {row.valor_unitario}
                                                    </TableCell>
                                                    <TableCell align={"center"}>
                                                        {row.codigo_principal}
                                                    </TableCell>
                                                    <TableCell align={"center"}>
                                                        {row.stock}
                                                    </TableCell>
                                                    <TableCell align={"center"}>
                                                        <Stack direction="row" spacing={1}>
                                                            <IconButton aria-label="delete" color="amarillo" onClick={() => { abrirModalEditar(row) }} >
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton aria-label="delete" color="rojo" onClick={() => { eliminarProducto(row) }}  >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Stack>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={personas.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    
                    </Grid>
                    <Grid item xs={12}>
                    
                    </Grid>
                </Grid>
            </Container>
            <Modal isOpen={modalCliente} >
                <ModalHeader >Registrar Nuevo cliente </ModalHeader>
                <ModalBody>
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>
                            <TextField
                                id="outlined-required"
                                label="Identificación"
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BadgeIcon />
                                    </InputAdornment>
                                ),
                                }}
                               
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <FormControl fullWidth variant="filled">
                                        <InputLabel htmlFor="filled-adornment-password">Tipo de Identificación</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            value={tipoIde}
                                            label="Tipo de Persona"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={1}>RUC</MenuItem>
                                            <MenuItem value={2}>Cedula de identidad</MenuItem>
                                            <MenuItem value={3}>Pasaporte</MenuItem>
                                            <MenuItem value={4}>Identificación del exterior</MenuItem>
                                           
                                        </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <TextField
                                id="outlined-required"
                                label="Razon Social o Nombre"
                                fullWidth
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                ),
                                }}
                               
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <TextField
                                    id="outlined-required"
                                    label="Dirección"
                                    fullWidth
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <ShareLocationIcon />
                                        </InputAdornment>
                                    ),
                                    }}
                                />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <TextField
                                    id="outlined-required"
                                    label="Telefono"
                                    fullWidth
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocalPhoneIcon />
                                        </InputAdornment>
                                    ),
                                    }}
                                />
                        </Grid>
                        <Grid item md={8} xs={12}>
                            <TextField
                                    id="outlined-required"
                                    label="Email"
                                    fullWidth
                                    value={correo}
                                    onChange={(event) => {
                                        setCorreo(event.target.value);
                                    }}
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AlternateEmailIcon />
                                        </InputAdornment>
                                    ),
                                    }} 
                                />
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Button fullWidth sx={{height:"100%"}} variant="contained" startIcon={<AddIcon />} onClick={agregarEmail} >Correo</Button>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>Correo</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {correos.map((row,index) => (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                 
                                        <TableCell align="left">{row}</TableCell>
                                        <TableCell align="center">
                                            <IconButton aria-label="delete" onClick={()=>{eliminarEmail(index)}}>
                                                <CloseIcon />
                                            </IconButton>
                                        </TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
              
                </ModalBody>
                <ModalFooter>
                    <Stack spacing={2} direction={"row"}>
                        <Button fullWidth color="rojo" variant="contained" onClick={()=>{setModalCliente(false)}} >Cancelar</Button>
                    </Stack>
                </ModalFooter>
            </Modal>
        </>
    );
}