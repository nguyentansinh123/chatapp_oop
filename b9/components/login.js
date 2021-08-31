import { setScreen } from "../app.js";
import { Register } from "./register.js";
import { InputGroup } from "./inputGroup.js";

class Login {
    $container;
    $title;
    $inputGroupEmail;
    $inputGroupPassword;
    $form;
    $buttonSubmit;
    $linkToRegister;

    constructor() {
        this.$container = document.createElement('div');
        this.$container.classList.add('center', 'h-screen', 'flex-col');
        this.$title = document.createElement('h3');
        this.$title.innerHTML = 'Login';
        this.$inputGroupEmail = new InputGroup('email', 'Email', 'email');
        this.$inputGroupPassword = new InputGroup('password', 'Password', 'password');

        this.$form = document.createElement('form');
        this.$form.addEventListener('submit', this.handlesubmit);
        this.$buttonSubmit = document.createElement('button');
        this.$buttonSubmit.type = 'submit';
        this.$buttonSubmit.innerHTML = 'Login';

        this.$linkToRegister = document.createElement('div');
        this.$linkToRegister.innerHTML = 'Create new account';
        this.$linkToRegister.classList.add('btn-link');

        this.$linkToRegister.addEventListener('click', this.moveToRegister);

    }

    moveToRegister = () => {
        const register = new Register();
        setScreen(register);
    }

    handlesubmit = (evt) => {
        evt.preventDefault();
        const email = this.$inputGroupEmail.getInputValue();
        const password = this.$inputGroupPassword.getInputValue();
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userInfo) => {
            console.log(userInfo);
        })
        .catch((error) =>{
            console.log(error);
        });

    }

    render() {
        this.$form.appendChild(this.$inputGroupEmail.render());
        this.$form.appendChild(this.$inputGroupPassword.render());
        this.$form.appendChild(this.$buttonSubmit);

        this.$container.appendChild(this.$title);
        this.$container.appendChild(this.$form);
        this.$container.appendChild(this.$linkToRegister);
        
        return this.$container;

    }

}

export { Login }