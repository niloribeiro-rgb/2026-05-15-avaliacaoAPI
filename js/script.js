async function getAPI1() {
    try {
        const animeContainer = document.querySelector(`.animeContainer`)

        const response = await fetch(`https://api.jikan.moe/v4/anime/40748`)
        // https://api.jikan.moe/v4/anime/48583
        // https://api.jikan.moe/v4/anime/52991
        // https://api.jikan.moe/v4/anime/40748
        // https://api.jikan.moe/v4/anime/20
        // https://api.jikan.moe/v4/anime/57555
        const dados = await response.json()
        if (!response.ok) {
            alert(`Erro: ${response.status} - ${response.statusText}`)
        }

        let videoKey = ""
        if (dados.data.trailer.embed_url !== undefined) {
            for (let i = 39; i < 51; i++) {
                videoKey += dados.data.trailer.embed_url[i]
            }
            // for recorta da casa 39 a 51 do link recebido
            // da letra 39 ate 51 é padrao da chave principal do video 
        }
        console.log(videoKey)
        console.log(dados.data.trailer.embed_url)

        
        animeContainer.innerHTML = `<div class="animeCard">
        <img src="${dados.data.images.jpg.image_url}" alt="${dados.data.title}">
        <h2>${dados.data.title}</h2>
        <p>${dados.data.synopsis}</p>
        </div>
        <h4>Traller</h4>
        <iframe width="300" height="auto" src="https://www.youtube.com/embed/${videoKey}si=R-EVc6WSTISt_vc8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`

    }
    catch (error) {
        console.error(error)
    }
}