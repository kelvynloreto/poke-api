import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setFiltertype } from "../store/slices/filterType.slice";
import { setFiltername } from "../store/slices/filterName.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectPokemon } from "../store/slices/selectPokemon.slice";
import axios from "axios";

const arr=['grass','fire','water','bug','flying','normal','poison','electric','fairy','ground','fighting','psychic','rock','ghost','steel','ice','dragon','dark','shadow','unknown']

const FilterPokemon = ({ switchSearch, namePokemons }) => {
  const [inputName, setInputName] = useState();
  const [autoComplete, setAutoComplete] = useState();
  const [displayNone, setAutodisplayNone] = useState("displayNone");
  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();
  const filterPokemonByType = useSelector((state) => state.filterType);
  const navigate = useNavigate();
  const filterByName = useSelector((state) => state.filterName);

  const handleValue = (event) => {
    dispatch(setFiltertype(event.target.value));
  };
  const target = (e) => {
    setInputName(e.target.value.trim().toLowerCase());
    if (namePokemons) {
      const arr = [];
      for (let i = 0; i < namePokemons?.length; i++) {
        if (namePokemons[i].includes(inputName)) {
          arr.push(namePokemons[i]);
        }
        setAutoComplete(arr);
      }
    }
  };

  const selectInput = (e) => {
    setInputName(e.target.value);
    let url = `https://pokeapi.co/api/v2/pokemon/${e.target.value}/`;
    navigate(`/pokedex/:${e.target.value}`);
    axios.get(url).then((res) => dispatch(setSelectPokemon(res.data)));
  };
  useEffect(() => {
    if (inputName?.length > 2) {
      setAutodisplayNone("displayFlex");
    } else if (inputName?.length <= 2) {
      setAutodisplayNone("displayNone");
    }
  }, [inputName]);

  const submit = (data) => {
    dispatch(setFiltername(data.search.trim().toLowerCase()));
    reset();
    for (let i = 0; i < autoComplete.length; i++) {
      if (autoComplete[i].includes(filterByName)) {
        let url = `https://pokeapi.co/api/v2/pokemon/${autoComplete[0]}/`;
        navigate(`/pokedex/:${autoComplete[0]}`);
        axios.get(url).then((res) => dispatch(setSelectPokemon(res.data)));
      }
    }
  };

  if (switchSearch) {
    return (
      <form
        className="form_name"
        onSubmit={handleSubmit(submit)}
        onChange={target}
      >
        <input
          type="text"
          placeholder="Search your Pokemon here"
          className="input-filter"
          {...register("search")}
        />
        <section
          value={filterByName}
          className={`input-names ${displayNone}`}
          id="names"
          onChange={handleValue}
        >
          {autoComplete?.map((e) => (
            <option key={e} onClick={selectInput} value={e}>
              {e}
            </option>
          ))}
        </section>
        <button className="input_button">
          <box-icon name="search-alt-2"></box-icon>
        </button>
      </form>
    );
  } else {
    return (
      <select
        className="input-filter"
        id="types"
        value={filterPokemonByType}
        onChange={handleValue}
      >
        <option value="all">All pokemons</option>
        {arr.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  }
};

export default FilterPokemon;
