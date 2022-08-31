import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import StatPokemon from './StatPokemon'
import { useDispatch } from "react-redux";
import { setSelectPokemon } from '../store/slices/selectPokemon.slice';

const PaintCard = ({pokemon,typetext}) => {


const navigate = useNavigate()
const dispatch = useDispatch();

const handleClick=()=>{
  let url=`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`
  navigate(`/pokedex/:${pokemon.name}`)
  axios.get(url)
  .then(res=> dispatch(setSelectPokemon(res.data)))
}

  return (
    <article className={`card ${pokemon?.types[0].type.name}`} onClick={handleClick}>
    <header className='header_card'>
  <img src={pokemon?.sprites.other['home'].front_default} alt="" /> 
    </header>
    <section className="main_card">
    <h2>{pokemon?.name}</h2>
    <h5>{typetext>1? "Types":"Type"}</h5>
    <ul className='card_types'>
 
    {
    pokemon?.types.map((slot)=>(
        <li key={slot.type.name}>{slot.type.name}</li>
    ))}
    </ul>
</section>

     <footer className='card_footer'>
     <div className="hr"></div>
        <ul className='stats-list'>
            {
            pokemon?.stats.map(stat=>(
            <StatPokemon key={stat.stat.url}  infoStat={stat}/> 
                )
             )
            }
        </ul>
     </footer>
</article>
    
  )
}

export default PaintCard