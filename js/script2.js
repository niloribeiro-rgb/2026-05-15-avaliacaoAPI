const paisesContainer = document.querySelector(`.paisesContainer`)

async function getAPI1() {
    let pais = document.querySelector(`#pais`).value
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${pais}`)

        const dados = await response.json()

        if (!response.ok) {
            alert(`Erro: ${response.status} - ${response.statusText}`)
        }
        paisesContainer.innerHTML = `<ul>
        <li>capital: ${dados[0].capital[0]}</li>
        <li>subregion :${dados[0].subregion}</li>
        <li>area: ${dados[0].area}</li>
        <li>population: ${dados[0].population}</li>
        <li>official: ${dados[0].translations.por.official}</li>  
        </ul>
        <img src="${dados[0].flags.png}" alt="flags" >`

    }
    catch (error) {
        console.error(error)
    }
}
