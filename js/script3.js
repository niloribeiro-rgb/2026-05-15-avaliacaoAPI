let codAnimes = [1, 2, 3, 4, 5, 6]
async function getAPI1() {

    const animeContainer = document.querySelector(`.animeContainer`)

    animeContainer.innerHTML = ""
    for (let i = 0; i < codAnimes.length; i++) {
        // alert(i)
        try {

            const response = await fetch(`https://dragonball-api.com/api/characters/${codAnimes[i]}`)
            const dados = await response.json()
            if (!response.ok) {
                alert(`Erro: ${response.status} - ${response.statusText} ${i}`)
            }
            // alert(dados.image)
            let cardConteudo = ""
            cardConteudo += `<div class="animeCardPosition"><div class="animeCard" id="animeCard${i}">
        <img src="${dados.image}" alt="${dados.name}">
        <div class="textContainer">
        <h2 class="name">${dados.name}</h2>
        <p class="race">${dados.race}</p>
        </div>
        <p>${dados.affiliation}</p>
        <p>${dados.originPlanet.name}</p>`
            animeContainer.innerHTML += `${cardConteudo} <hr> ${i} | id:${dados.id}</div></div>`

        }
        catch (error) {
            console.error(error)
        }
    }
}
getAPI1()