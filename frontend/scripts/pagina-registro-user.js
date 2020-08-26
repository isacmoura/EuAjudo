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
    
    /*const stateInput = document.querySelector("input[name=estado]")

    const ufValue = event.target.value
    
    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text*/

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios`

    fetch(url)
    .then(async (res) => {
        const dados = await res.json() 
        for (const cidade of dados) {
            var opt = document.createElement('option');
            opt.id = cidade.id;
            opt.value = cidade.nome;
            opt.innerHTML = cidade.nome;
            citySelect.appendChild(opt);
        }
        citySelect.disabled = false
    })
    /*.then((cities) => {
        for(const cidade of cities) {
            citySelect.innerHTML += `<option value="${cidade.id}"> ${cidade.name}<\option>`
        }
        citySelect.disabled = false
    })*/ 
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCidades())

window.addEventListener('load', function() {
    popularUFs()
})
