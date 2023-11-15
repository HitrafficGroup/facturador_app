import { useState, useEffect, useRef } from "react";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
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
import { collection, query, onSnapshot, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import EditIcon from '@mui/icons-material/Edit';
export default function ServiciosView(){
    const [servicios,setServicios] = useState([{}]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [modalEditar,setModalEditar] = useState(false);
    const [modalServicio,setModalServicio] = useState(false);
    const [modalOpciones,setModalOpciones] = useState(false);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const eliminarProducto = ()=>{
        
    }
    const abrirModalEditar=()=>{
        setModalEditar(true);
    }


    return(
        <>
            <Container maxWidth="xl">
                <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                        <div className="header-dash">
                            Listado de servicios habilitados
                        </div>
                    </Grid>
                    <Grid item  xs={12}>
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
                                            <TableCell align={'center'}>
                                                Direccion
                                            </TableCell>
                                            <TableCell align={'center'}>
                                                Acciones
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {servicios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                                            {row.direccion}
                                                        </TableCell>
                                                    
                                                        <TableCell align={"center"}>
                                                            <Stack direction="row" justifyContent={"center"} spacing={1}>
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
                                count={servicios.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                    </Grid>  
                </Grid>         
            </Container>
        </>
    );

}