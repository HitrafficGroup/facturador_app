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
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { collection, query, onSnapshot,doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


export default function ProductosView(){
    const [productos,setProductos] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [modalProducto,setModalProducto] = useState(false);
    const [codigoPrincipal,setCodigoPrincipal] = useState('');
    const [codigoAuxiliar,setCodigoAuxiliar] = useState('');
    const [descripcion,setDescripcion] = useState('');
    const [valorUnitario,setValorUnitario] = useState('');
    const [unidadMedida,setUnidadMedida] = useState('');
    const [tarifaIva,setTarifaIva] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getData=()=>{
        const q = query(collection(db, "productos"));
        onSnapshot(q, (querySnapshot) => {
        const products_aux = [];
        querySnapshot.forEach((doc) => {
            products_aux.push(doc.data());
        });
        setProductos(products_aux);
        });
    }
    const toggle = () => setModalProducto(!modalProducto);


    const agregarProductos = async()=>{
        let id = uuidv4();
        console.log(id);
        let new_producto = {
            descripcion:descripcion,
            codigo_principal:codigoPrincipal,
            codigo_auxiliar:codigoAuxiliar,
            descripcion:descripcion,
            valor_unitario:valorUnitario,
            unidad_medida:unidadMedida,
            tarifa_iva:tarifaIva,
        }
        await setDoc(doc(db, "productos", id),new_producto);
        

    }

    useEffect(() => {
        getData();
    }, []);

    return(
        <>
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>Productos View</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={()=>{setModalProducto(true)}}>Agregar Producto</Button>
                    </Grid>
                    <Grid item xs={12}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell  align={'center'}>
                                        Descripcion
                                        </TableCell>
                                        <TableCell  align={'center'}>
                                        Categoria
                                        </TableCell>
                                        <TableCell  align={'center'}>
                                        Valor
                                        </TableCell>
                                        <TableCell  align={'center'}>
                                        Stock
                                        </TableCell>
                                        <TableCell  align={'left'}>
                                        Estado
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                    <TableCell align={"center"}>
                                                        {row.number}
                                                    </TableCell>
                                                    <TableCell align={"center"}>
                                                        {row.walk}
                                                    </TableCell>
                                                    <TableCell align={"center"}>
                                                        {row.pedestrianClear}
                                                    </TableCell>
                                                    <TableCell align={"center"}>
                                                        {row.minimumGreen}
                                                    </TableCell>
                                                    <TableCell  align={"center"}>
                                                        <Stack direction="row" spacing={1}>
                                                            <IconButton aria-label="delete" color="gris" >
                                                                <SettingsIcon />
                                                            </IconButton>
                                                            <IconButton aria-label="delete" color="rojo" >
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
                            count={productos.length}
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
            <Modal isOpen={modalProducto} toggle={toggle} >
                    <ModalHeader toggle={toggle} >Registrar Nueva Cuenta</ModalHeader>
                        <ModalBody>
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12}> 
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Código Principal"
                                        fullWidth
                                        value={codigoPrincipal}
                                        onChange={(event, newValue) => {
                                            setCodigoPrincipal(newValue);
                                        }}
                                        />
                                </Grid>
                                <Grid item md={6} xs={12}> 
                                    <TextField
                                        id="outlined-required"
                                        label="Código Auxiliar"
                                        fullWidth
                                        value={codigoAuxiliar}
                                        onChange={(event, newValue) => {
                                            setCodigoAuxiliar(newValue);
                                        }}
                                        />
                                </Grid>
                                <Grid item md={12} xs={12}> 
                                    <TextField
                                        id="outlined-required"
                                        label="Descripción"
                                        fullWidth
                                        value={descripcion}
                                        onChange={(event, newValue) => {
                                            setDescripcion(newValue);
                                        }}
                                        />
                                </Grid>
                                <Grid item md={4} xs={6}> 
                                    <TextField
                                        id="outlined-required"
                                        label="Valor Unitario"
                                        fullWidth
                                        value={valorUnitario}
                                        onChange={(event, newValue) => {
                                            setValorUnitario(newValue);
                                        }}
                                        />
                                </Grid>
                                <Grid item md={4} xs={6}> 
                                    <TextField
                                        id="outlined-required"
                                        label="U.Medida"
                                        fullWidth
                                        value={unidadMedida}
                                        onChange={(event, newValue) => {
                                            setUnidadMedida(newValue);
                                        }}
                                        />
                                </Grid>
                                <Grid item md={4} xs={6}> 
                                    <TextField
                                        id="outlined-required"
                                        label="Tarifa IVA"
                                        fullWidth
                                        value={unidadMedida}
                                        onChange={(event, newValue) => {
                                            setTarifaIva(newValue);
                                        }}
                                        />
                                </Grid>
                                <Grid item md={8} xs={6}> 
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        value={tarifaIva}
                                        options={data}
                                        fullWidth
                                        renderInput={(params) => <TextField {...params} label="Tarifado ICE" />}
                                        

                                    />
                                </Grid>
                                <Grid item md={4} xs={6}> 
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Activo</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel value={true} control={<Radio />} label="Si" />
                                            <FormControlLabel value={false} control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </ModalBody>
                        <ModalFooter>
                        <Button color="primary" onClick={()=>{agregarProductos()}}>
                            Crear Producto
                        </Button>
                        <Button color="secondary" onClick={()=>{setModalProducto(false)}} >
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>
        </>
    );
}
let data = [
    {
        name:'ICE Alcohol',
        valor: 321.2
    },
    {
        name:'ICE Motorizados',
        valor: 321.2
    }
]