import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface UserState {
    id: number,
    userName: string,
    login: string,
    email: string,
    role: string,
    orderID: number,
    title: string,
    material: string,
    currentPage: string,
}

const initialState: UserState = {
    id: 0,
    userName: '',
    login: '',
    email: '',
    role: '',
    orderID: 0,
    title: '',
    material: '',
    currentPage: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setName: (state, value: PayloadAction<string>) => {
            state.userName = value.payload
        },
        setEmail: (state, value: PayloadAction<string>) => {
            state.email = value.payload
        },
        setId: (state, value: PayloadAction<number>) => {
            state.id = value.payload
        },
        setLogin: (state, value: PayloadAction<string>) => {
            state.login = value.payload
        },
        setRole: (state, value: PayloadAction<string>) => {
            state.role = value.payload
        },
        setOrderID: (state, value: PayloadAction<number>) => {
            state.orderID = value.payload
        },
        setTitle: (state, value: PayloadAction<string>) => {
            state.title = value.payload
        },
        setMaterial: (state, value: PayloadAction<string>) => {
            state.material = value.payload
        },
        setCurrentPage: (state, value: PayloadAction<string>) => {
            state.currentPage = value.payload
        },
    }
})

export const {
    setName, 
    setEmail, 
    setId, 
    setLogin, 
    setRole,
    setOrderID,
    setTitle,
    setMaterial,
    setCurrentPage,
} = userSlice.actions

export default userSlice.reducer