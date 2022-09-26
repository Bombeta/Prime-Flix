import {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';
import "./style.css"

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();  

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
                console.log(response.data);
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {
                console.log("FILME NAO ENCONTRADO");
                navigate("/", { replace: true });
                return;
            })
        }
    

        loadFilme();

        return() =>{
            console.log("COMPONENT FOI DESMONTADO!");
        }
    },[navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeFlix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);
    
        if(hasFilme){
            toast.warn('ESTE FILME JÁ ESTÁ NA LISTA');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos));
        toast.success("FILME SALCO COM SUCESSO!");
    }

    if(loading){
        return(
            <div className="filmes-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }


    return(

      <div className="filmes-info">
        <h1>{filme.title}</h1>       
        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}></img>
      
        <h3>Sinopse</h3>
        <span>{filme.overview}</span>

        <strong>Avaliação: {filme.vote_average} / 10</strong>

        <div className='area-buttons'>
            <button onClick={salvarFilme}>Salvar</button>
            <button>
                <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                    Trailer
                </a>
            </button>
        </div>

      </div>
        
    )
}

export default Filme;