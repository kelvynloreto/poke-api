import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNameTrainer } from "../store/slices/nameTrainer.slice";
import PokeballBG from "./PokeballBG";


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.name.value.trim();
    
    if (inputValue.length !== 0) {
      dispatch(setNameTrainer(inputValue));
      navigate("/pokedex");
    }
    e.target.name.value = "";
  };

  return (
    <div className="home">
       <PokeballBG/>
       <main className="main_home">
        <section>
          <div className="content">
            <h2> Hello</h2>
            <h2> Hello</h2>
            <h2> Trainer!</h2>
            <h2> Trainer!</h2>
          </div>
        </section>
         <img
          className="trainer_boy"
          src="https://www.seekpng.com/png/full/201-2011786_red-by-xous-54-red-pokemon-trainer-png.png"
          alt="trainer"
        />
        <img className="trainer_girl" src="../imgs/trainer.png" alt="trainer" />
        <p>Give me your name to start</p>
        <form className="home_form" onSubmit={handleSubmit}>
          <input type="text" id="name" className="text_area" placeholder="Enter your name" />
          <button className="home_form-button">
            <box-icon className="send" type="solid" name="send"></box-icon>
          </button>
        </form>
      </main>
      <footer className="footer-home">
        <img src="../imgs/pokemons-home.png" alt="" />

      </footer>
     
    </div>
  );
};

export default Home;
