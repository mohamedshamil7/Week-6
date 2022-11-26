let usernameError=document.getElementById('username-error');
let passwordError=document.getElementById('password-error')


function validateName(){
    let username= document.getElementById('v-username').value

    if(username.length==0){
        usernameError.innerHTML='Username Required';
        return false
    }
    nameError.innerHTML ='<i class="fa-solid fa-circle-check"></i>';
    return true;
}

function validatePassword(){
    let password=document.getElementById('v-password').value

    if(password.length==0){
        passwordError.innerHTML='password Required'
        return false
    }
    passwordError.innerHTML='<i class="fa-solid fa-circle-check"></i>';
    return true;
}
