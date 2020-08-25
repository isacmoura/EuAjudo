function popularUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(async (res) => {
        const data = await res.json()
        for (const estado of data){
            var opt = document.createElement('option');
            opt.id = estado.id;
            opt.value = estado.nome;
            opt.innerHTML = estado.nome;
            ufSelect.appendChild(opt);
    } })
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

window.addEventListener('load', function() {
    popularUFs()
})
