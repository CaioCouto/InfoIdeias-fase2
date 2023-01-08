const form = document.querySelector('.main-form');

function validateName(name) {
    /**
     * Para o nome ser válido, ele deve:
     *      - Não possuir caracteres que não sejam letras
     *      - Possuir 3 letras, no mínimo
     */
    const isValid = name.length >= 3 && name.search(/[^a-zA-Z]/) === -1;
    const alert = document.querySelector('#nameValidation');
    if (isValid) {
        alert.style.display = 'none';
        return true;
    }
    alert.style.display = 'block';
}

function validateEmail(email) {
    /**
     * Para o email ser válido, ele deve
     * possuir o seguinte formato: xxx@yyyy.com.
     * Sendo a quantidade mínima de x e y, respectivamente,
     * 3 e 4.
     */
    const isValid = email.search(/^[a-z]{3,}@[a-z]{4,}.com/) !== -1;
    const help = document.querySelector('#emailHelp');
    const alert = document.querySelector('#emailValidation');
    if (isValid) {
        alert.style.display = 'none';
        help.style.display = 'block';
        return true;
    }
    alert.style.display = 'block';
    help.style.display = 'none';
}

function validatePhone(phone) {
    /**
     * Para o telefone ser válido, ele deve:
     *      - possuir apenas dígitos
     *      - possuir exatamente 11 caracteres (DDD + 9 dígitos) 
     */
    const isValid = phone.length === 11 && phone.search(/\D/) === -1;
    const help = document.querySelector('#phoneHelp');
    const alert = document.querySelector('#phoneValidation');
    if (isValid) {
        alert.style.display = 'none';
        help.style.display = 'block';
        return true;
    }
    alert.style.display = 'block';
    help.style.display = 'none';
}

function validateBirthdate(birthdate) {
    /**
     * Para a data de nascimento ser válida, ela deve
     *      - possuir 10 caracteres 
     *      - e ter o seguinte formato: YYYY-MM-DD
     *      - representar 18 anos no passado, no mesmo dia de hoje.
     */
    const today = new Date();
    const isLongEnough = birthdate.length === 10;
    const isNotFromTheFuture = new Date(birthdate).getFullYear() <= today.getFullYear();
    const isValid = isLongEnough && isNotFromTheFuture;
    const alert = document.querySelector('#dataNascimentoValidation');
    if (isValid) {
        alert.style.display = 'none';
        return true;
    }
    alert.style.display = 'block';
}

function validateNeighborhood(neighborhood) {
    /**
     * Para um bairro ser válido, ele apenas precisa
     * ter um valor capaz de ser convertido para número,
     * uma vez que representa o ID recebido pela API
     * do IBGE.
     */
    const isValid = !!Number(neighborhood.value);
    const alert = document.querySelector('#bairroValidation');
    if (isValid) {
        alert.style.display = 'none';
        return true;
    }
    alert.style.display = 'block';
}

function validateContactPeriod(contactPeriod) {
    /**
     * Para período para contato ser válido, ele apenas precisa
     * ter um valor capaz de ser convertido para número,
     * uma vez que representa o index de periodos válidos
     * no backend. Sendo
     *      1 - Manhã
     *      2 - Tarde
     *      3 - Noite
     */
    const isValid = !!Number(contactPeriod);
    const alert = document.querySelector('#periodoContatoValidation');
    if (isValid) {
        alert.style.display = 'none';
        return true;
    }
    alert.style.display = 'block';
}

function validateForm(name, email, phone, birthdate, neighborhood, contactPeriod, takeCalls) {
    const nameIsValid = validateName(name);
    const emailIsValid = validateEmail(email);
    const phoneIsValid = validatePhone(phone);
    const birthdateIsValid = validateBirthdate(birthdate);
    const neighborhoodIsValid = validateNeighborhood(neighborhood);
    const contactPeriodIsValid = validateContactPeriod(contactPeriod);

    return nameIsValid && emailIsValid && phoneIsValid
            && birthdateIsValid && neighborhoodIsValid
            && contactPeriodIsValid;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.elements['nome-input'].value;
    const email = form.elements['email-input'].value;
    const phone = form.elements['telefone-input'].value;
    const birthdate = form.elements['dataNascimento-input'].value;
    const neighborhood = form.elements['bairro-input'];
    const contactPeriod = form.elements['periodoContato-input'].value;
    const takeCalls = form.elements['aceitaChamada-input'].value;
    
    const formIsValid = validateForm(
        name,
        email,
        phone,
        birthdate,
        neighborhood,
        contactPeriod,
        takeCalls
    );
    
    if(formIsValid) {
        const selectedNeighborhood = neighborhood.options[neighborhood.selectedIndex].text;
        const body = {
            name,
            email,
            phone,
            birthdate,
            'neighborhood': selectedNeighborhood,
            contactPeriod,
            'takeCalls': Number(takeCalls) ? 'aceita ligação' : 'não aceita ligação'
        }
        console.log(body);
    }
});