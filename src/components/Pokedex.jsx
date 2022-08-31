import axios from "axios";
import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import { setFiltername } from "../store/slices/filterName.slice";
import { useSelector, useDispatch } from "react-redux";
import FilterPokemon from "./FilterPokemon";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState();
  const [switchSearch, setSwitchSearch] = useState(false);
  const userName = useSelector((state) => state.nameTrainer);
  const [namePokemons, setNamePokemons] = useState([]);
  const [namesPokemos, setNamesPokemos] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(40);
  const lastPostIndex = currentPage * postPerPage;
  const fistPostIndex = lastPostIndex - postPerPage;

  const dispatch = useDispatch();
  const filterPokemonByType = useSelector((state) => state.filterType);
  useEffect(() => {
    if (filterPokemonByType !== "all") {
      const url = `https://pokeapi.co/api/v2/type/${filterPokemonByType}/`;
      axios.get(url).then((res) => {
        const arr = res.data.pokemon.map((e) => e.pokemon);
        setPokemons(arr);
      });
    } else if (filterPokemonByType === "all") {
      const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1132";
      axios
        .get(url)
        .then((res) => setPokemons(res.data.results))
        .catch((err) => err);
      setPostPerPage(60);
    }
  }, [filterPokemonByType]);

  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1132";
    axios
      .get(url)
      .then((res) => setNamesPokemos(res.data.results))
      .catch((err) => err);
  }, []);

  let pagination = pokemons?.slice(fistPostIndex, lastPostIndex);
  const navigate = useNavigate();

  const handleSwicth = () => {
    setSwitchSearch(!switchSearch);
    dispatch(setFiltername(""));
    let names = namesPokemos?.map((el) => el.name);
    setNamePokemons(names);
  };
  const handleToBack = () => {
    navigate(`//`);
  };
  return (
    <main className="main-pokedex">
      <div className="footer-gear-bg" onClick={handleToBack}>
        <box-icon name="arrow-back" color="#f3e5e5"></box-icon>
      </div>
      <div className="pokedex-header">
        <h2>Pokedex</h2>
        <img className="img1-pokedex" src="../imgs/pikachu.png" alt="" />
      </div>

      <p>
        Welcome <span className="user-text">{userName}</span> , here you can
        find your favorite pokemon
      </p>
      <section className="filter">
        <div className="filter-container_button">
          <h2>Type</h2>
          <div className="button-bg" onClick={handleSwicth}>
            <div
              className={switchSearch ? "btn search-type" : "btn search-name"}
            ></div>
          </div>
          <h2>Pokemon</h2>
        </div>
        <div className="filter-container_input">
          <FilterPokemon
            switchSearch={switchSearch}
            namePokemons={namePokemons}
            setNamePokemons={setNamePokemons}
          />
        </div>
      </section>
      <div className="cards_container">
        {pagination?.map((pokemon) => (
          <PokemonCard key={pokemon.url} url={pokemon.url} />
        ))}
      </div>
      <Pagination
        totalPost={pokemons?.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
};

export default Pokedex;
