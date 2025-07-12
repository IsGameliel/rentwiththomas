document.addEventListener('DOMContentLoaded', function() {
    const applyForm = document.querySelector('form[action="/apply"]');
    if (applyForm) {
        applyForm.addEventListener('submit', function(event) {
            if (!validateApplyForm()) {
                event.preventDefault();
            }
        });
    }

    const payRentForm = document.querySelector('form[action="/pay_rent"]');
    if (payRentForm) {
        payRentForm.addEventListener('submit', function(event) {
            if (!validatePayRentForm()) {
                event.preventDefault();
            }
        });
    }

    const contactForm = document.querySelector('form[action="/contact"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            if (!validateContactForm()) {
                event.preventDefault();
            }
        });
    }
});

function validateApplyForm() {
    clearErrors();
    let isValid = true;

    // Validate a few critical fields for demonstration purposes
    const fullname = document.getElementById('fullname');
    if (!fullname.value) {
        showError(fullname, 'Full Name is required.');
        isValid = false;
    }

    const email = document.getElementById('email');
    if (!email.value) {
        showError(email, 'Email is required.');
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        showError(email, 'Email is invalid.');
        isValid = false;
    }

    const phone = document.getElementById('phone');
    if (!phone.value) {
        showError(phone, 'Phone is required.');
        isValid = false;
    }

    const ssn = document.getElementById('ssn');
    if (!ssn.value) {
        showError(ssn, 'Social Security Number is required.');
        isValid = false;
    }

    return isValid;
}

function showError(input, message) {
    const formControl = input.parentElement;
    const error = document.createElement('div');
    error.className = 'error';
    error.innerText = message;
    formControl.appendChild(error);
}

function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.remove());
}

function validatePayRentForm() {
    clearErrors();
    let isValid = true;

    const name = document.getElementById('name');
    if (!name.value) {
        showError(name, 'Name is required.');
        isValid = false;
    }

    const email = document.getElementById('email');
    if (!email.value) {
        showError(email, 'Email is required.');
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        showError(email, 'Email is invalid.');
        isValid = false;
    }

    const amount = document.getElementById('amount');
    if (!amount.value) {
        showError(amount, 'Amount is required.');
        isValid = false;
    }

    return isValid;
}

function validateContactForm() {
    clearErrors();
    let isValid = true;

    const name = document.getElementById('name');
    if (!name.value) {
        showError(name, 'Name is required.');
        isValid = false;
    }

    const email = document.getElementById('email');
    if (!email.value) {
        showError(email, 'Email is required.');
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        showError(email, 'Email is invalid.');
        isValid = false;
    }

    const message = document.getElementById('message');
    if (!message.value) {
        showError(message, 'Message is required.');
        isValid = false;
    }

    return isValid;
}
