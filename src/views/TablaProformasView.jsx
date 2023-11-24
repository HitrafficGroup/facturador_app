import { useState, useEffect, useRef } from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { collection, query, onSnapshot, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import FilledInput from '@mui/material/FilledInput';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
export default function TablaProformasView(){
    const [proformas,setProformas] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const allProformas = useRef([{}]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getData = () => {
        const q = query(collection(db, "proformas"));
        onSnapshot(q, (querySnapshot) => {
            const proformas_aux = [];
            querySnapshot.forEach((doc) => {
                proformas_aux.push(doc.data());
            });
            setProformas(proformas_aux);
            allProformas.current = proformas_aux;
        });

      
       
      
    }

    useEffect(() => {
        getData();
    }, []);

    return(
        <>
                <Container maxWidth="xl">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{width:100}} align={'left'}>
                                                    Emisión
                                                </TableCell>
                                                <TableCell  sx={{width:160}} align={'left'}>
                                                    Número
                                                </TableCell>
                                                <TableCell align={'left'}>
                                                    Valor
                                                </TableCell>
                                                <TableCell align={'left'}>
                                                    NID Cliente
                                                </TableCell>
                                                <TableCell align={'left'}>
                                                    Cliente
                                                </TableCell>
                                                <TableCell align={'left'}>
                                                    Estado
                                                </TableCell>
                                                <TableCell align={'left'}>
    
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {proformas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                                                    value={row.cantidad}
                                                                    sx={{width:60}}
                                                                    disabled={!row.producto}
                                                                />
                                                            </TableCell>
                                                            <TableCell align={"left"}>
                                                                {row.descripcion}
                                                            </TableCell>
                                                            <TableCell align={"center"}>
                                                                {parseFloat(row.valor_unitario)}
                                                            </TableCell>
                                                            <TableCell align={"center"}>
                                                                {0}%
                                                            </TableCell>
                                                            <TableCell align={"center"}>
                                                                {parseFloat(row.valor_unitario)*parseFloat(row.cantidad)}
                                                            </TableCell>
                                                            <TableCell align={"center"}>
                                                                <Stack direction="row" spacing={1}>
                                                                    <IconButton aria-label="delete" color="rojo"  >
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
                                    count={proformas.length}
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