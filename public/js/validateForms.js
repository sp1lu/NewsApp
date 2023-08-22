// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    const forms = document.querySelectorAll('form')

    // Loop over them and prevent submission
    Array.from(forms)
        .forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            }, false)
        })
})()