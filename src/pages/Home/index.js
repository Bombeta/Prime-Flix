import{useEffect, useState} from 'react';
import api from '../../services/api';

// URL da API: movie/now_playing?api_key=3f8a34de060d36f77d236dfda2afe1f8&language=pt-BR

function Home(){

    const [filmes, setFilmes] = useState([]);

    useEffect(()=>{
        async function loadFilmes(){
            const response = await api.get("movie/now_playing",{
              params:{
                api_key: "3f8a34de060d36f77d236dfda2afe1f8",
                language: "pt-BR",
                page: 1,
              }  
            })
            
            console.log(response.data.results);
        }

        loadFilmes();
    }, []);


    return(
        <div>
            <h2>Home</h2>
        </div>
    )
}

export default Home;