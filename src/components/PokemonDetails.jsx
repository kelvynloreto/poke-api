import axios from "axios";
import React, { useState } from "react";
import {  useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'

const PokemonDetails = () => {

  const selectpokemon = useSelector(state=>state.selectPokemon)
  const [isShiny, setIsShiny] = useState()
  const [toggeInfo, setToggeInfo] = useState(false)
  const navigate = useNavigate()
const [locationPokemon, setLocationPokemon] = useState()
const handleShiny=()=>{
  setIsShiny(!isShiny)
}
const handleInfoAbiliti=()=>{
  setToggeInfo(false)
}
const handleInfoLocation=()=>{
  setToggeInfo(true)
  const url= selectpokemon?.location_area_encounters
  axios.get(url)
  .then(res=>setLocationPokemon(res.data))
  
}
const handleHome=()=>{
  navigate(`/pokedex/`)
}

console.log(locationPokemon);
  if (selectpokemon) {
  
    return (
  
      <div className="pokemon-details">
        <div className="container-imgs-pokemon-details">
          {/* <img className="p-fixed" src="./imgs/eevee.png" alt="" />
          <img className="p-fixed" src="./imgs/pichu.png" alt="" />
          <img className="p-fixed" src="./imgs/pidgeot.png" alt="" />
          <img className="p-fixed" src="./imgs/mew.png" alt="" /> */}
        </div>
        <div className="container-pokemon-details">
          <header className="header-pokemon-details">
            <div className="big-Circule-blue"><div className="center-circule"></div></div>
            <p className="littler-circule red"></p>
            <p className="littler-circule yellow"></p>
            <p className="littler-circule green"></p>
            <div className="hr-header"></div>
          </header>
          <main>
            <div className="left-main">
              <div className="top_left-main">
                <div className={`bg-pokemon bg-${selectpokemon.types[0].type.name}`}>
                  {isShiny? <img src={selectpokemon.sprites.other['home'].front_shiny} alt="" /> :   <img src={selectpokemon.sprites.other['home'].front_default} alt="" /> 
                  }              
              <div className="star-icon">
              {isShiny && <box-icon  name='star' type='solid' color='#fffb03' ></box-icon>}
              </div>
                </div>
            
                <div className="container-circule-main">
                <div className="circule-top-main"></div>
                <div className="circule-top-main"></div>
                </div>
           
              </div>
              <div className="bottom_left-main">
                <div className="container_button">
                  <button onClick={handleHome}>
                  <box-icon name='power-off' color='#f1eded' ></box-icon>
                  </button>
                  <div className='liner'></div>
                  <div className='liner'></div>
                  <button onClick={handleShiny}>
                  <box-icon name='star'color={isShiny? '#fffb03': "gray"} ></box-icon>
                  </button>
                </div>
                
                <div className="container_pokemom-name">
                  <h2>Name</h2>
                  <h3>{selectpokemon.species.name}</h3>
                </div>
                <div className="container_pokemom-name">
                  <h2>Types</h2>
                  <div className="tp"> 
                  {
                    selectpokemon.types.map((slot)=>(
                      <h3 key={slot.i}>{slot.type.name}</h3>))
                  }
                  </div>
              
                </div>
                <div className="footer-details">
                  <h2>Abilities</h2>
                  <div className="container-abilities">
                  {selectpokemon.abilities.map(ability=> <h3 > {ability.ability.name }</h3>)}
                  </div>
                </div>
               </div>
            </div>
            <div className="liner_center-main"></div>
            <div className="right-main">
              <div>
                <div className="hability-pokemon">
                  <div onClick={handleInfoAbiliti} className="header_right-main">
                <h2>Movements</h2>
                  </div>
                  <div onClick={handleInfoLocation} className="header_right-main"> 
                  <h2>location</h2>
                  </div>
                </div>  
                { 
                toggeInfo?
                <div className="container-locations">
             {locationPokemon?.map((location,i)=> i<30 &&<li> {location.location_area.name}</li>)}
                </div>
                
:<div className='container-moves' >
                 { selectpokemon.moves.map((move,i)=> i<90 && <li>{move.move.name}</li> )}
                  </div>
                }
               
              </div>
            
            </div>
          </main>
        </div>
      </div>
    );
    
  }
};

export default PokemonDetails;
