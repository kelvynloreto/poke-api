import { createSlice } from '@reduxjs/toolkit'

export const filterNameSlice = createSlice({
    name:"filterName",
    initialState:"",
    reducers:{
        setFiltername:(state,action)=>action.payload,
    
    }

})

export const {setFiltername} = filterNameSlice.actions
export default filterNameSlice.reducer