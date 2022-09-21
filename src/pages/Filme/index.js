import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import api from '../../services/api';

function Filme() {
    const { id } = useParams();
    const [filme, setFilme] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "3f8a34de060d36f77d236dfda2afe1f8",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                //console.log(response.data);
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {
                console.log("FILME NAO ENCONTRADO");
            })
        }
    

        loadFilme();

        return() =>{
            console.log("COMPONENT FOI DESMONTADO!");
        }
    },[])

    if(loading){
        return(
            <div className="filmes-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }


    return(

      <div className="filmes-info">
        <h1>{filme.tilte}</h1>       
        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}></img>
      
        <h3>Sinopse</h3>
        <span>{filme.overview}</span>

        <strong>Avaliação: {filme.vote_average} / 10</strong>

      </div>
        
    )
}

export default Filme;