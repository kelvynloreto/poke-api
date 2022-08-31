import React, { useEffect, useState } from 'react'
import axios from 'axios'

import PaintCard from './PaintCard';


const PokemonCard = ({url}) => {

const [pokemon, setPokemon] = useState()
const [typetext, setTypetext] = useState()


useEffect(() => {
    axios.get(url)
      .then((res) => { setPokemon(res.data)
        setTypetext(res.data.types.length)     
       setSelectValue(res.data.types.map(e=> e.type.name))    
  })
      .catch(err=> err)
   }, [])


    return(
<PaintCard  pokemon={pokemon} typetext={typetext}/>
    )

}

export default PokemonCard