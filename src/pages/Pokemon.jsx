import {useParams} from "react-router-dom";
import {getPokemonById} from "../api/pokemons.js";
import {useEffect, useState} from "react";
import PokemonImage from "../components/details/pokemonImage.jsx";
import Carousel from "../components/details/carousel.jsx";
import Strenght from "../components/details/strenght.jsx";
import Weakness from "../components/details/weakness.jsx";
import Types from "../components/details/types.jsx";
import Name from "../components/details/name.jsx";
import Informations from "../components/details/informations.jsx";


// eslint-disable-next-line react/prop-types
function Pokemon({id: propId}) {
  const {id: paramId} = useParams();
  const id = propId || paramId;
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPokemonById(id);
        setPokemon(data);
      } catch (error) {
        console.log(error);
        setError("Erreur lors de la récupération des données.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);


  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <div className="grid grid-cols-1 justify-items-center min-h-[calc(100dvh-144px)]
                      md:grid-cols-2">
        <div className="order-2 px-4
                        md:order-1 md:pl-10">
          <div className="flex flex-col items-center gap-10 justify-between
                          lg:flex-row">

            <Name pokemonNames={pokemon.name}/>

            <div className="flex justify-center gap-3">
              <Types pokemon={pokemon}/>
            </div>

          </div>

          <div className="my-10 grid sm:grid-cols-2">
            <Strenght pokemon={pokemon}/>
            <Weakness pokemon={pokemon}/>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 placeholder sm:mt-20">
            <Carousel pokemon={pokemon}/>
            <Informations weight={pokemon.weight} height={pokemon.height} catchRate={pokemon.catch_rate}/>
          </div>

        </div>

        <PokemonImage pokemon={pokemon}/>

      </div>
    </main>
  );
}

export default Pokemon;
