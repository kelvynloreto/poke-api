import { createSlice } from '@reduxjs/toolkit'

export const filterTypeSlice = createSlice({
    name:"filtertype",
    initialState:"all",
    reducers:{
        setFiltertype:(state,action)=>action.payload,
    
    }

})

export const {setFiltertype} = filterTypeSlice.actions
export default filterTypeSlice.reducer