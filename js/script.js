let codAnimes = [48583, 52991, 40748, 44511, 20, 61469]
async function getAPI1() {

    const animeContainer = document.querySelector(`.animeContainer`)

    animeContainer.innerHTML = ""
    for (let i = 0; i < codAnimes.length; i++) {
        // alert(i)
        try {

            const response = await fetch(`https://api.jikan.moe/v4/anime/${codAnimes[i]}`)
            const dados = await response.json()
            if (!response.ok) {
                alert(`Erro: ${response.status} - ${response.statusText} ${i}`)
            }

            let videoKey = ""
            if (dados.data.trailer.embed_url !== null) {
                // melhor null do que undefined 
                for (let c = 39; c < 51; c++) {
                    videoKey += dados.data.trailer.embed_url[c]
                }
                // for recorta da casa 39 a 51 do link recebido
                // da letra 39 ate 51 é padrao da chave principal do video 
                console.log(videoKey)
                console.log(dados.data.trailer.embed_url)
            }

            let cardConteudo = ""
            cardConteudo += `<div class="animeCardPosition"><div class="animeCard" id="animeCard${i}">
        <img src="${dados.data.images.webp.large_image_url}" alt="${dados.data.title}">
        <div class="textContainer">
        <h2 class="title">${dados.data.title}</h2>
        <p class="synopsis">${dados.data.synopsis}</p>
        </div>
        <p>${dados.data.rating}</p>`
            if (dados.data.trailer.embed_url !== null) {
                cardConteudo += `<iframe src="https://www.youtube.com/embed/${videoKey}si=R-EVc6WSTISt_vc8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
            }
            // alert(cardConteudo)
            animeContainer.innerHTML += `${cardConteudo} <hr> ${i} | id:${dados.data.mal_id} | ${dados.data.type} </div></div>`

        }
        catch (error) {
            console.error(error)
        }
    }
}
getAPI1()

async function newCard() {
    let nomeAnime = document.querySelector(`#nomeAnime`).value
    let indexAnime = document.querySelector(`#indexAnime`).value
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${nomeAnime}&limit=5`)
        const dados = await response.json()
        if (!response.ok) {
            alert(`Erro: ${response.status} - ${response.statusText}`)
        }
        // alert(dados.data[indexAnime].mal_id)
        if (dados.data[indexAnime].mal_id !== null) {
            codAnimes.push(dados.data[indexAnime].mal_id)
        }
        else{
            alert("ops! nao tem esse index")
            return
        }
    }
    catch (error) {
        console.error(error)
    }
    getAPI1()
}
