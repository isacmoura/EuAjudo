function popularUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {res.json()} )
    .then( (states) => {
        for( const estado of states ) {
            ufSelect.innerHTML += `<option value="${estado.id}"> ${estado.name}<\option>`
        }
    })
}

function getCidades(event) {
    const citySelect = document.querySelector("select[name=cidade]")
    const stateInput = document.querySelector("input[name=estado]")

    const ufValue = event.target.value
    
    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    .then( (res) => {res.json()} )
    .then((cities) => {
        for(const cidade of cities) {
            citySelect.innerHTML += `<option value="${cidade.id}"> ${cidade.name}<\option>`
        }
        citySelect.disabled = false
    }) 
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCidades)


