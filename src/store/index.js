import { configureStore } from '@reduxjs/toolkit'
import nameTrainer from './slices/nameTrainer.slice'
import filterType from "./slices/filterType.slice"
import filterName from './slices/filterName.slice'
import selectPokemon from './slices/selectPokemon.slice'

export default configureStore({
  reducer: {
    nameTrainer,
    filterType,
    filterName,
    selectPokemon
}})