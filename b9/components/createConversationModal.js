class CreateConversationModal {

    $container;
    $form;
    $input;
    $btnCreate;
    $btnCancel;

    constructor() {
        this.$container = document.createElement('div');
        // this.$container.style.display = 'none';
        this.$container.classList.add('modal-container');

        this.$form = document.createElement('form');
        this.$form.addEventListener('submit', this.handleSubmit);

        this.$input = document.createElement('input');
        this.$input.type = 'text';
        this.$input.placeholder = 'Enter conversation name ....';

        this.$btnCreate = document.createElement('button');
        this.$btnCreate.innerHTML = "Create";
        this.$btnCreate.type = 'submit';

        this.$btnCancel = document.createElement('button');
        this.$btnCancel.type = 'button';
        this.$btnCancel.innerHTML = "Cancel";
        this.$btnCancel.addEventListener('click', this.handleCancel);

    }

    setVisible(visible) {
        if (visible) {
            this.$container.style.display = 'flex';
        } else {
            this.$container.style.display = 'none';
        }
    }

    handleCancel = () => {
        this.setVisible(false);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.$input.value);
        db.collection('conversations').add({
            name : this.$input.value,
            createdBy : firebase.auth().currentUser.email,
            users : [firebase.auth().currentUser.email],
        }).then(() => {
            this.setVisible(false);
        });
    }

    render() {
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        this.$form.appendChild(this.$input);
        this.$form.appendChild(this.$btnCreate);
        this.$form.appendChild(this.$btnCancel);

        modalContent.appendChild(this.$form)
        this.$container.appendChild(modalContent);

        return this.$container;
    }

}

export { CreateConversationModal };