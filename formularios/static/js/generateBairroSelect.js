const select = document.querySelector('#bairro-input');

fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios/3550308/distritos')
.then(resp => resp.json())
.then(resp => {
    resp.forEach(data => {
        const option = document.createElement('option');
        option.setAttribute('value', data.id);
        option.innerText = data.nome
        select.appendChild(option);
    });
})