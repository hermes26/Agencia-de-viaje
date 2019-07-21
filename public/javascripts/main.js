document.querySelector('.password').addEventListener('change', event => {
    let password = event.target.value;
    let regexCap = RegExp(/[A-Z]/g);
    let regexNum = RegExp(/[0-9]/g);

    if(document.querySelector('#form').contains(document.querySelector('.invalidPassword'))){
        document.querySelector('.invalidPassword').remove();
    }
    if(password.length < 6){
        let html = `<label class="invalidPassword">Contraseña debe tener mas de 6 caracteres</label>`
        event.target.value= '';
        document.querySelector('.password').insertAdjacentHTML("afterend", html)
    }
    else if(!regexCap.test(password) || !regexNum.test(password) ){
        let html = `<label class="invalidPassword">Contraseña debe tener letras mayusculas y numeros</label>`
        event.target.value= '';
        document.querySelector('.password').insertAdjacentHTML("afterend", html)
    }else{
        document.querySelector('.password').style.borderColor = 'green';
    }
})

document.querySelector('.repeat-password').addEventListener('change', event => {

})