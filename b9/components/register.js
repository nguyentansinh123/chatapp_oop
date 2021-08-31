import { setScreen } from '../app.js';
import { InputGroup } from './inputGroup.js';
import { Login } from './login.js';

class Register {

    $container;
    $title;

    $formRegister;

    $inputGroupEmail;
    
    $inputGroupPassword;

    $inputGroupConfirmPassword;

    $btnSubmit;

    $linkToLogin;

    constructor() {
        this.$container = document.createElement('div');
        this.$container.style.width = '400px';
        this.$container.style.margin = 'auto';
        this.$container.classList.add('center','h-screen', 'flex-col');
        this.$title = document.createElement('h3');
        this.$title.innerHTML = 'Register';

        this.$formRegister = document.createElement('form');
        this.$formRegister.addEventListener('submit', this.handleSubmit);

        this.$inputGroupEmail = new InputGroup('email', 'Email', 'email');

        this.$inputGroupPassword = new InputGroup('password', 'Password', 'password');

        this.$inputGroupConfirmPassword = new InputGroup('password', 'Confirm Password', 'confirmPassword');

        this.$btnSubmit = document.createElement('button');
        this.$btnSubmit.type = 'submit';
        this.$btnSubmit.innerHTML = 'Register';

        this.$linkToLogin = document.createElement('div');
        this.$linkToLogin.classList.add('btn-link');
        this.$linkToLogin.innerHTML = 'Back to Login';
        this.$linkToLogin.addEventListener('click', this.moveToLogin);

    }

    moveToLogin = (screen) => {
        const login = new Login();
        setScreen(login);
    }

    handleSubmit = (evt) => {
        evt.preventDefault();

        const email = this.$inputGroupEmail.getInputValue();
        const password = this.$inputGroupPassword.getInputValue();
        const confirmPassword = this.$inputGroupConfirmPassword.getInputValue();
        console.log(this.$inputGroupEmail.getInputValue());

        this.$inputGroupEmail.setError(null);

        if (!email) {
            this.$inputGroupEmail.setError('Email cannot be empty!');
        }
        if (password.length < 6) {
            this.$inputGroupPassword.setError("Password length must be greater or equal than 6!");
        }
        if (confirmPassword != password) {
            this.$inputGroupConfirmPassword.setError('Confirm password not correct');
        }


        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            firebase.auth().currentUser.sendEmailVerification();
        })
        .catch((error) => {
            console.log(error);
        });

    };

    render() {
        this.$formRegister.appendChild(this.$inputGroupEmail.render());
        this.$formRegister.appendChild(this.$inputGroupPassword.render());
        this.$formRegister.appendChild(this.$inputGroupConfirmPassword.render());
        this.$formRegister.appendChild(this.$btnSubmit);

        this.$container.appendChild(this.$title);
        this.$container.appendChild(this.$formRegister);
        this.$container.appendChild(this.$linkToLogin);
        return this.$container;
    }

};

export { Register };