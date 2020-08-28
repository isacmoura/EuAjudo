function popularUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(async (res) => {
        const data = await res.json()

        function sortJSON(arr, key, way) {
            return arr.sort(function(a, b) {
                var x = a[key]; var y = b[key];
                if (way === '123') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
                if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
            });
        }
        
        ufs = sortJSON(data,'sigla', '123'); // 123 or 321

        for (let estado of ufs){
            var opt = document.createElement('option');
            opt.id = estado.id;
            opt.value = estado.sigla;
            opt.innerHTML = estado.sigla;
            ufSelect.appendChild(opt);
    } })
}

function getCidades() {
    let citySelect = document.querySelector("#city")
    citySelect.innerHTML = '<option value="">Selecione a cidade</option>'
    
    const stateInput = document.querySelector("#uf")

    const ufValue = stateInput.options[stateInput.selectedIndex].id

    if(ufValue === '') {
        return
    } else {
        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

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
    }
}

window.addEventListener('load', function() {
    popularUFs()
})