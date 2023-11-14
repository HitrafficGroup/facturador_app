import { useState, useEffect } from "react";
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
import { collection, query, onSnapshot, doc, setDoc,updateDoc,deleteDoc  } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector,useDispatch } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { setLoading } from "../features/menu/menuSlice";
export default function ProductosView() {
    const [productos, setProductos] = useState([])
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [modalProducto, setModalProducto] = useState(false);
    const [modalEditar,setModalEditar] = useState(false);
    const [codigoPrincipal, setCodigoPrincipal] = useState('');
    const [codigoAuxiliar, setCodigoAuxiliar] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [valorUnitario, setValorUnitario] = useState('');
    const [unidadMedida, setUnidadMedida] = useState('');
    const [activo, setActivo] = useState(false);
    const [stock, setStock] = useState('');
    const [establecimiento, setEstablecimiento] = useState('');
    const [inventario,setInventario] = useState(false);
    const [categoria,setCategoria] = useState('');
    const [tarifa, setTarifa] = useState(1);
    const [establecimientos,setEstablecimientos] = useState({});
    const [ice, setIce] = useState({});
    const [value, setValue] = useState(0);
    const [param1,setParam1] = useState("")
    const [param2,setParam2] = useState("");
    const [param3,setParam3] = useState("");
    const [value1,setValue1] = useState("");
    const [value2,setValue2] = useState("");
    const [value3,setValue3] = useState("");
    const userState = useSelector(state => state.auth);
    const [currentProducto,setCurrentProducto] = useState({
        codigo_principal: "",
        codigo_auxiliar: "",
        descripcion: "",
        valor_unitario: "",
        unidad_medida: "",
        tarifa_iva: "",
        ice:"",
        activo:"",
        establecimiento:"",
        categoria: "",
        inventario:"",
        stock: "",
        id:"",
        param1:"",
        value1:"",
        param2:"",
        value2:"",
        param3:"",
        value3:"",
    });
    


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getData = () => {
        const q = query(collection(db, "productos"));
        onSnapshot(q, (querySnapshot) => {
            const products_aux = [];
            querySnapshot.forEach((doc) => {
                products_aux.push(doc.data());
            });
            setProductos(products_aux);
        });
        setEstablecimientos(userState.direcciones)
        

        
    }


    const handleChange = (event) => {
        setTarifa(event.target.value);
    };


    const handleInventario = (event) => {
        setInventario(event.target.value);
    };
    const handleActivo = (event) => {
        setActivo(event.target.value);
      };
    const abrirModalEditar =(item)=>{
        setModalEditar(true);
        setCurrentProducto(item);
    }

    const agregarProductos = async () => {
        dispatch(setLoading(true));
        let id = uuidv4();
        console.log(id);
        let new_producto = {
            codigo_principal: codigoPrincipal,
            codigo_auxiliar: codigoAuxiliar,
            descripcion: descripcion,
            valor_unitario: valorUnitario,
            unidad_medida: unidadMedida,
            tarifa_iva: tarifa,
            ice:ice,
            activo:activo,
            establecimiento:establecimiento,
            categoria: categoria,
            param1:param1,
            value1:value1,
            param2:param2,
            value2:value2,
            param3:param3,
            value3:value3,
            inventario:inventario,
            stock: stock,
            id:id,
        }
        await setDoc(doc(db, "productos", id), new_producto);
        dispatch(setLoading(false));
        setModalProducto(false);

    }

    const actualizarProducto = async ()=>{
        dispatch(setLoading(true));
        const ref_data = doc(db, "productos", currentProducto.id);
        await updateDoc(ref_data, currentProducto);
        setModalEditar(false);
        dispatch(setLoading(false));
    }
    const eliminarProducto = async(item)=>{
        await deleteDoc(doc(db, "productos", item.id));
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const nuevoObjeto = { ...currentProducto };
        nuevoObjeto[name] = value;
        setCurrentProducto(nuevoObjeto);
      };
    



    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>Productos View</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={() => { setModalProducto(true) }}>Agregar Producto</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
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
                                            Stock
                                        </TableCell>
                                        <TableCell align={'left'}>
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
                                                        {row.descripcion}
                                                    </TableCell>
                                                    <TableCell align={"center"}>
                                                        {row.valor_unitario}
                                                    </TableCell>
                                                    <TableCell align={"center"}>
                                                        {row.valor_unitario}
                                                    </TableCell>
                                                    <TableCell align={"center"}>
                                                        {row.stock}
                                                    </TableCell>
                                                    <TableCell align={"center"}>
                                                        <Stack direction="row" spacing={1}>
                                                            <IconButton aria-label="delete" color="amarillo" onClick={()=>{abrirModalEditar(row)}} >
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton aria-label="delete" color="rojo" onClick={()=>{eliminarProducto(row)}}  >
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
            <Modal isOpen={modalProducto} >
                <ModalHeader  >Registrar Nuevo Producto <ShoppingBagIcon/> </ModalHeader>
                <ModalBody>

                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
                                <Tab label="Datos Generales" {...a11yProps(0)} />
                                <Tab label="Datos Adicionales" {...a11yProps(1)} />
                                <Tab label="Inventario" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Código Principal"
                                        fullWidth
                                        value={codigoPrincipal}
                                        onChange={(event) => {
                                            setCodigoPrincipal(event.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        id="outlined-required"
                                        label="Código Auxiliar"
                                        fullWidth
                                        value={codigoAuxiliar}
                                        onChange={(event) => {
                                            setCodigoAuxiliar(event.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <TextField
                                        id="outlined-required"
                                        label="Descripción"
                                        fullWidth
                                        value={descripcion}
                                        onChange={(event) => {
                                            setDescripcion(event.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid item md={4} xs={6}>
                                    <TextField
                                        id="outlined-required"
                                        label="Valor Unitario"
                                        fullWidth
                                        value={valorUnitario}
                                        onChange={(event) => {
                                            setValorUnitario(event.target.value);
                                        }}

                                    />
                                </Grid>
                                <Grid item md={4} xs={6}>
                                    <TextField
                                        id="outlined-required"
                                        label="U.Medida"
                                        fullWidth
                                        value={unidadMedida}
                                        onChange={(event) => {
                                            setUnidadMedida(event.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid item md={4} xs={6}>
                                    <FormControl fullWidth variant="filled">
                                        <InputLabel htmlFor="filled-adornment-password">Tarifador IVA</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            value={tarifa}
                                            label="Tipo de Persona"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={1}>0%</MenuItem>
                                            <MenuItem value={2}>12%</MenuItem>
                                            <MenuItem value={3}>No Objeto de impuesto</MenuItem>
                                            <MenuItem value={4}>Extento de IVA</MenuItem>
                                            <MenuItem value={5}>8%</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={8} xs={6}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        value={ice}
                                        options={data}
                                        getOptionLabel={(option) =>
                                            option.nombre
                                        }
                                        onChange={(event, newValue) => {
                                            setIce(newValue);
                                        }}
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
                                            value={activo}
                                            onChange={handleActivo}
                                        >
                                            <FormControlLabel value={true} control={<Radio />} label="Si" />
                                            <FormControlLabel value={false} control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <Grid container spacing={2}>
                                <Grid item md={12} xs={12}>
                                    <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            value={establecimiento}
                                            options={establecimientos}
                                            getOptionLabel={(option) =>
                                                option.direccion
                                            }
                                            onChange={(event, newValue) => {
                                                setEstablecimiento(newValue);
                                            }}
                                            fullWidth
                                            renderInput={(params) => <TextField {...params} label="Establecimiento" />}
                                        />
                                </Grid>
                              
                                <Grid item xs={12}>
                                    <h6 style={{color:"#616A6B"}}>Datos Adicionales</h6>
                                </Grid>
                                <Grid item xs={6}>
                                <TextField
                                        id="outlined-required"
                                        label="Nombre"
                                        fullWidth
                                        value={param1}
                                        onChange={(event) => {
                                            setParam1(event.target.value);
                                        }}                                    
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                            id="outlined-required"
                                            label="Valor"
                                            fullWidth
                                            value={value1}
                                            onChange={(event) => {
                                                setValue1(event.target.value);
                                            }} 
                                        />
                                </Grid>
                                <Grid item xs={6}>
                                <TextField
                                        id="outlined-required"
                                        label="Nombre"
                                        fullWidth
                                        value={param2}
                                        onChange={(event) => {
                                            setParam2(event.target.value);
                                        }} 
                                      
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                <TextField
                                        id="outlined-required"
                                        label="Valor"
                                        fullWidth
                                        value={value2}
                                        onChange={(event) => {
                                            setValue2(event.target.value);
                                        }} 
                                        
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                <TextField
                                        id="outlined-required"
                                        label="Nombre"
                                        fullWidth
                                        value={param3}
                                        onChange={(event) => {
                                            setParam3(event.target.value);
                                        }} 
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                <TextField
                                        id="outlined-required"
                                        label="Valor"
                                        fullWidth
                                        value={value3}
                                        onChange={(event) => {
                                            setValue3(event.target.value);
                                        }} 
                                    />
                                </Grid>
                                
                            </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <Grid container spacing={2}>
                                    <Grid item md={4} xs={12}>
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Llevar Inventario?</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            value={inventario}
                                            onChange={handleInventario}
                                        >
                                            <FormControlLabel value={true} control={<Radio />} label="Si" />
                                            <FormControlLabel value={false} control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                    </Grid>
                                    <Grid item md={8} xs={12}>
                                        <TextField
                                                id="outlined-required"
                                                label="Stock de Equipos"
                                                fullWidth
                                                value={stock}
                                                onChange={(event) => {
                                                    setStock(event.target.value);
                                                }}
                                            />
                                    </Grid>
                                   
                            </Grid>
                        </CustomTabPanel>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    
                    <Button color="primary" onClick={() => { agregarProductos() }}>
                        Crear Producto
                    </Button>
                    <Button color="secondary" onClick={() => { setModalProducto(false) }} >
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={modalEditar}    >
                <ModalHeader  >Editar Producto </ModalHeader>
                <ModalBody>

                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
                                <Tab label="Datos Generales" {...a11yProps(0)} />
                                <Tab label="Datos Adicionales" {...a11yProps(1)} />
                                <Tab label="Inventario" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Código Principal"
                                        fullWidth
                                        value={currentProducto.codigo_principal}
                                        name="codigo_principal"
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        id="outlined-required"
                                        label="Código Auxiliar"
                                        fullWidth
                                        name="codigo_auxiliar"
                                        value={currentProducto.codigo_auxiliar}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <TextField
                                        id="outlined-required"
                                        label="Descripción"
                                        name="descripcion"
                                        value={currentProducto.descripcion}
                                        fullWidth
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item md={4} xs={6}>
                                    <TextField
                                        id="outlined-required"
                                        label="Valor Unitario"
                                        name="valor_unitario"
                                        fullWidth
                                        value={currentProducto.valor_unitario}
                                        onChange={handleInputChange}

                                    />
                                </Grid>
                                <Grid item md={4} xs={6}>
                                    <TextField
                                        id="outlined-required"
                                        label="U.Medida"
                                        name="unidad_medida"
                                        fullWidth
                                        value={currentProducto.unidad_medida}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item md={4} xs={6}>
                                    <FormControl fullWidth variant="filled">
                                        <InputLabel htmlFor="filled-adornment-password">Tarifador IVA</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            value={currentProducto.tarifa_iva}
                                            label="Tipo de Persona"
                                            name="tarifa_iva"
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value={1}>0%</MenuItem>
                                            <MenuItem value={2}>12%</MenuItem>
                                            <MenuItem value={3}>No Objeto de impuesto</MenuItem>
                                            <MenuItem value={4}>Extento de IVA</MenuItem>
                                            <MenuItem value={5}>8%</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={8} xs={6}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        name="ice"
                                        options={data}
                                        value={currentProducto.ice}
                                        getOptionLabel={(option) =>
                                            option.nombre
                                        }
                                        onChange={handleInputChange}
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
                                            name="activo"
                                            value={currentProducto.activo}
                                            onChange={handleInputChange}
                                        >
                                            <FormControlLabel value={true} control={<Radio />} label="Si" />
                                            <FormControlLabel value={false} control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <Grid container spacing={2}>
                                <Grid item  xs={12}>
                                    <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={data}
                                            name="establecimiento"
                                            getOptionLabel={(option) =>
                                                option.direccion
                                            }
                                            value={currentProducto.establecimiento}
                                            onChange={(event, newValue) => {
                                                setEstablecimiento(newValue);
                                            }}
                                            fullWidth
                                            renderInput={(params) => <TextField {...params} label="Establecimiento" />}
                                        />
                                </Grid>
                             
                                <Grid item xs={12}>
                                    <h6 style={{color:"#616A6B"}}>Datos Adicionales</h6>
                                </Grid>
                                <Grid item xs={6}>
                                <TextField
                                        id="outlined-required"
                                        label="Nombre"
                                        fullWidth
                                        value={currentProducto.param1}
                                        name="param1"
                                        onChange={handleInputChange}                                    
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                <TextField
                                        id="outlined-required"
                                        label="Valor"
                                        fullWidth
                                        value={currentProducto.value1}
                                        name="value1"
                                        onChange={handleInputChange} 
                
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                <TextField
                                        id="outlined-required"
                                        label="Nombre"
                                        fullWidth
                                        value={"param2"}
                                        onChange={handleInputChange} 
        
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                <TextField
                                        id="outlined-required"
                                        label="Valor"
                                        fullWidth
                                        value={"value2"}
                                        onChange={handleInputChange} 
            
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                <TextField
                                        id="outlined-required"
                                        label="Nombre"
                                        fullWidth
                                        value={"param3"}
                                        onChange={handleInputChange} 
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                <TextField
                                        id="outlined-required"
                                        label="Valor"
                                        fullWidth 
                                        value={"value3"}
                                        onChange={handleInputChange} 
                                    />
                                </Grid>
                                
                            </Grid>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <Grid container spacing={2}>
                                    <Grid item md={4} xs={12}>
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Llevar Inventario?</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="inventario"
                                            value={currentProducto.inventario}
                                            onChange={handleInputChange} 
                                        >
                                            <FormControlLabel value={true} control={<Radio />} label="Si" />
                                            <FormControlLabel value={false} control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                    </Grid>
                                    <Grid item md={8} xs={12}>
                                        <TextField
                                                id="outlined-required"
                                                label="Stock de Equipos"
                                                fullWidth
                                                name="stock"
                                                value={currentProducto.stock}
                                                onChange={handleInputChange}
                                            />
                                    </Grid>
                                   
                            </Grid>
                        </CustomTabPanel>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"  onClick={() => { actualizarProducto()}} >
                        Actualizar
                    </Button>
                    <Button color="secondary" onClick={() => { setModalEditar(false) }} >
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        
        </>
    );
}
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

let data = [
    {
        codigo:3011,
        nombre:"ICE CIGARRILLOS RUBIOS"
    },
    {
        codigo:3021,
        nombre:"ICE CIGARRILLOS NEGROS"
    },
    {
        codigo:3031,
        nombre:"ICE BEBIDAS ALCOHOLICAS"
    },
    {
        codigo:3041,
        nombre:"ICE - CERVEZA INDUSTRIAL"
    },
    {
        codigo:3043,
        nombre:"ICE - CERVEZA ARTESANAL"
    },
    {
        codigo:3053,
        nombre:"ICE - BEBIDAS GASEOSAS ALTO CONTENIDO DE AZUCAR "
    },
    {
        codigo:3054,
        nombre:"ICE - BEBIDAS GASEOSAS BAJO CONTENIDO DE AZUCAR "
    },
    {
        codigo:3081,
        nombre:"ICE - AVIONES - TRICARES"
    },
    {
        codigo:3092,
        nombre:"ICE - SERVICIOS DE TELEVISION PAGADA"
    },
    {
        codigo:3093,
        nombre:"SERVICIOS DE TELEFONIA"
    },
    {
        codigo:3101,
        nombre:"ICE BEBIDAS ENERGIZANTES"
    }, 
    {
        codigo:3111,
        nombre:"ICE - BEBIBAS NO ALCÓHÓLICAS"
    },
    {
        codigo:3610,
        nombre:"ICE PERFUMES Y AGUAS DE TOCADOR"
    },    
    {
        codigo:3620,
        nombre:"ICE VIDEO-JUEGOS"
    },
    {
        codigo:3630,
        nombre:"ICE ARMAS DE FUEGO, ARMAS DEPORTIVAS"
    }, 
    {
        codigo:3640,
        nombre:"ICE - CUOTAS MEMBRESÍAS"
    },
    {
        codigo:3670,
        nombre:"ICE COCINAS, CALEFONES Y OTROS DE USO DOMÉSTICO A GAS SRI"
    },    
    {
        codigo:3770,
        nombre:"ICE COCINAS, CALEFONES Y OTROS DE USO DOMÉSTICO A GAS SENAE"
    }
]