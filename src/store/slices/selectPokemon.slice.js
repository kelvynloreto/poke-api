import { createSlice } from '@reduxjs/toolkit'

export const selecPokemonSlice = createSlice({
    name:"selectPokemon",
    initialState:"",
    reducers:{
        setSelectPokemon:(state,action)=>action.payload,
    }

})

export const {setSelectPokemon} = selecPokemonSlice.actions
export default selecPokemonSlice.reducer