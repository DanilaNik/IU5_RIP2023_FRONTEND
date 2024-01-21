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
    orderStatus: string,
    currentPage: string,
    minDate: string,
    maxDate: string,
    orderEmail: string,
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
    orderStatus: '',
    currentPage: '',
    minDate: '',
    maxDate: '',
    orderEmail: '',
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
        setOrderStatus: (state, value: PayloadAction<string>) => {
            state.orderStatus = value.payload
        },
        setCurrentPage: (state, value: PayloadAction<string>) => {
            state.currentPage = value.payload
        },
        setMinDate: (state, value: PayloadAction<string>) => {
            state.minDate = value.payload
        },
        setMaxDate: (state, value: PayloadAction<string>) => {
            state.maxDate = value.payload
        },
        setOrderEmail: (state, value: PayloadAction<string>) => {
            state.orderEmail = value.payload
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
    setOrderStatus,
    setCurrentPage,
    setMinDate,
    setMaxDate,
    setOrderEmail,
} = userSlice.actions

export default userSlice.reducer