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
        id:'',
        profile:false,
        profile_url:'',
        signature:false,
        signature_url:'',
        signature_name:''
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
            state.profile = action.payload.profile;
            state.profile_url = action.payload.profile_url
            state.signature = action.payload.signature;
            state.signature_url = action.payload.signature_url
            state.signature_name = action.payload.signature_name
        },
    }
})
export const {setUser} = userSlice.actions
export default userSlice.reducer