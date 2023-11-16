import { useState, useEffect, useRef } from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { collection, query, onSnapshot, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';
import ButtonGroup from '@mui/material/ButtonGroup';
export default function ProformasView() {
    const [value, setValue] = useState(dayjs('2022-04-17'));
    const [productos, setProductos] = useState([{}])
    const [modalCliente, setModalCliente] = useState(false);
    const [currentCliente, setCurrentCliente] = useState([{}]);
    const [modalProducto, setModalProducto] = useState(false);
    const [items, setItems] = useState([{}]);
    const [page, setPage] = useState(0);
    const [busqueda, setBusqueda] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [clientes, setClientes] = useState([]);

    const allproducts = useRef([{}]);
    const allClientes = useRef([{}])
    const allItems = useRef([{}])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearchProduct = (event)=>{
        let textoMinusculas = event.target.value.toLowerCase();
        const filtrados = allItems.current.filter((elemento) => {
            // Convertir el nombre del elemento a minúsculas para la comparación
            const nombreMinusculas = elemento.descripcion.toLowerCase();

            // Verificar si el nombre del elemento incluye el texto de búsqueda
            return nombreMinusculas.includes(textoMinusculas);
        });
        setItems(filtrados);

    }
    const productoSeleccionado = (data) => {
        console.log(data)
        const items_selected = allItems.current.map((item)=>{
            if(item.id === data.id){
                item['select'] = !item['select']
            }
            return item;
        })
        allItems.current = items_selected
        setItems(items_selected)
        console.log(items_selected)
        
    }
    const abrirModalProductos = ()=>{
        const items_formated = allItems.current.map((item)=>{
            item['select']= false
            return item;
        });
        allItems.current = items_formated

        setItems(items_formated)
        setModalProducto(true);
        console.log(items_formated)
    }
    const handleSearchClient = (event) => {
        let textoMinusculas = event.target.value.toLowerCase();
        const filtrados = allClientes.current.filter((elemento) => {
            // Convertir el nombre del elemento a minúsculas para la comparación
            const nombreMinusculas = elemento.nombre.toLowerCase();

            // Verificar si el nombre del elemento incluye el texto de búsqueda
            return nombreMinusculas.includes(textoMinusculas);
        });

        setClientes(filtrados);
    }
    const handleBusqueda = (event) => {
        setBusqueda(event.target.value);
    };

    const agregarProductos =()=>{
        const seleccionados = allItems.current.filter(item => item['select'] === true);
        setProductos(seleccionados)
    }
    const eliminarProducto = async (item) => {

    }
    const getData = () => {
        const q = query(collection(db, "productos"));
        onSnapshot(q, (querySnapshot) => {
            const products_aux = [];
            querySnapshot.forEach((doc) => {
                products_aux.push(doc.data());
            });
            setItems(products_aux);
            allItems.current = products_aux;

        });

        const q2 = query(collection(db, "clientes"));
        onSnapshot(q2, (querySnapshot) => {
            const clientes_aux = [];
            querySnapshot.forEach((doc) => {
                clientes_aux.push(doc.data());
            });
            setClientes(clientes_aux);
            allClientes.current = clientes_aux;

        });



    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Container maxWidth="xl">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className="header-dash">
                            Sistema de generacion de proformas.
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="proforma-container">
                            <div>
                                <p className="proforma-titulo" style={{ margin: 0 }}> <strong>PROFORMA</strong></p>
                            </div>
                            <div>
                                <p style={{ margin: 0 }} className="proforma-datos">Joan David Encarnacion Diaz <strong>1104595671 .- MECDEVS SAS</strong> </p>
                            </div>
                        </div>

                    </Grid>
                    <Grid item xs={12} md={6}>

                        <div className="proforma-info">
                            <Stack direction="column" justifyContent={"space-between"} spacing={2}>
                                <Button sx={{ width: 190 }} variant="contained" onClick={() => { setModalCliente(true) }}  >Buscar Cliente</Button>
                                <Stack direction="row" spacing={2}>
                                    <p ><strong>Cédula de Identidad</strong></p>  <p>1104595671</p>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <p><strong>Nombres:</strong></p>
                                    <p>Joan David Encarnacion Diaz</p>
                                </Stack>
                            </Stack>
                        </div>


                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div className="proforma-info">
                            <Stack direction="column" justifyContent={"space-between"} spacing={2}>
                                <Stack direction="row" spacing={2}>
                                    <strong>Doc.# :</strong> <p>001-001-000000001</p>
                                </Stack>
                                <Stack direction="row" alignItems={"center"} spacing={2}>
                                    <strong style={{ margin: 0 }}>F. Emisión:</strong>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                                            <DatePicker
                                                label="Controlled picker"
                                                value={value}
                                                onChange={(newValue) => setValue(newValue)}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Stack>
                            </Stack>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={8}>

                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button sx={{ width: 190 }} variant="contained" onClick={() => { abrirModalProductos() }} >Agregar Producto</Button>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{width:60}} align={'center'}>
                                            Item
                                        </TableCell>
                                        <TableCell  sx={{width:60}} align={'center'}>
                                            Cantidad
                                        </TableCell>
                                        <TableCell align={'left'}>
                                            Detalle
                                        </TableCell>
                                        <TableCell align={'center'}>
                                            Precio
                                        </TableCell>
                                        <TableCell align={'center'}>
                                            Desc
                                        </TableCell>
                                        <TableCell align={'center'}>
                                            Total
                                        </TableCell>
                                        <TableCell align={'left'}>

                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                    <TableCell align={"center"}>
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell align={"center"}>
                                                    <FilledInput
                                                        hiddenLabel
                                                        id="filled-adornment-password"
                                                        type="number"
                                                        size="small"
                                                        sx={{width:60}}
                                                    />
                                                    </TableCell>
                                                    <TableCell align={"left"}>
                                                        {row.descripcion}
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
                            count={productos.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Grid>
                </Grid>
            </Container>
            <Modal isOpen={modalProducto} size="lg" >
                <ModalHeader>Agregar Producto</ModalHeader>
                <ModalBody>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <FormControl fullWidth variant="filled">
                                <FilledInput
                                    hiddenLabel
                                    id="filled-adornment-password"
                                    type="text"
                                    size="small"
                                    onChange={handleSearchProduct}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                            >
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                           
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
                                                Precio
                                            </TableCell>
                                            <TableCell align={'left'}>

                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                                            {row.valor_unitario}
                                                        </TableCell>

                                                        <TableCell align={"center"}>
                                                            <Stack direction="row" spacing={1}>
                                                                <Checkbox
                                                                    checked={row['select']}
                                                                    onClick={()=>{productoSeleccionado(row)}}
                                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                                />
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
                                count={items.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Grid>
                       
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Stack direction="row" spacing={2}>
                        <Button color="primary" variant="contained" onClick={agregarProductos}  >
                            terminar seleccion
                        </Button>
                        <Button color="rojo" variant="contained" onClick={() => { setModalProducto(false) }} >
                            Cancelar
                        </Button>
                    </Stack>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalCliente} size="lg">
                <ModalHeader>Agregar Cliente</ModalHeader>
                <ModalBody>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <FormControl fullWidth variant="filled">
                                <FilledInput
                                    hiddenLabel
                                    id="filled-adornment-password"
                                    type="text"
                                    size="small"
                                    onChange={handleSearchClient}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                            >
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={busqueda}
                                    onChange={handleBusqueda}
                                >
                                    <FormControlLabel value={true} control={<Radio />} label="Nombre" />
                                    <FormControlLabel value={false} control={<Radio />} label="Cedula" />
                                </RadioGroup>
                            </FormControl>
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
                                                Nombre
                                            </TableCell>
                                            <TableCell align={'center'}>
                                                Cedula
                                            </TableCell>
                                            <TableCell align={'left'}>

                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {clientes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                        <TableCell align={"left"}>
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell align={"center"}>
                                                            {row.nombre}
                                                        </TableCell>
                                                        <TableCell align={"center"}>
                                                            {row.ci}
                                                        </TableCell>
                                                        <TableCell align={"center"}>
                                                            <Stack direction="row" spacing={1}>
                                                                <Button sx={{ width: 190 }} variant="contained" startIcon={<PanToolAltIcon />} >Seleccionar</Button>
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
                                count={clientes.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Grid>
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => { setModalCliente(false) }} >
                        Salir
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}