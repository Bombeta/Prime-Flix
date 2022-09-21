import{useEffect, useState} from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import "./style.css"

// URL da API: movie/now_playing?api_key=3f8a34de060d36f77d236dfda2afe1f8&language=pt-BR

function Home(){

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilmes(){
            const response = await api.get("movie/now_playing",{
              params:{
                api_key: "3f8a34de060d36f77d236dfda2afe1f8",
                language: "pt-BR",
                page: 1,
              }  
            })
            
            setFilmes(response.data.results.slice(0,10));
            
            //console.log(filmes);
        }

        loadFilmes();
        setLoading(false);
    }, []);


    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="lista-filmes">
              {filmes.map((filmes) => {
                return(
                    <article key={filmes.id}>
                        <strong>{filmes.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${filmes.poster_path}`} alt={filmes.title}></img>
                        <Link to={`/filmes/${filmes.id}`}>Acessar</Link>
                    </article>
                )
              })}
            </div>
        </div>
    )
}

export default Home;