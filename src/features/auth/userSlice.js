import {createSlice} from '@reduxjs/toolkit';



export const userSlice = createSlice({
    name: 'user',
    initialState: {
        email:'',
        password:'',
        phone:'',
        razon:'',
        ruc: '',
        tipo:'',
        usuario:'',
        id:''
    },
    reducers: {
        setUser: (state,action)=>{
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.phone = action.payload.phone;
            state.razon = action.payload.razon;
            state.ruc = action.payload.ruc;
            state.tipo = action.payload.tipo;
            state.usuario = action.payload.usuario;
            state.id = action.payload.id;
        },
    }
})
export const {setUser} = userSlice.actions
export default userSlice.reducer