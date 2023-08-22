const button = document.querySelector('#add-input');
const div = document.querySelector('#custom-inputs');

button.addEventListener('click', (event) => {
    let wrapper = document.createElement('div');
    let input = document.createElement('input');
    input.type = 'text';
    input.name = 'channels[name]';

    let removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.innerText = 'Remove';
    removeBtn.addEventListener('click', (event) => {
        wrapper.remove();
    });

    wrapper.append(input);
    wrapper.append(removeBtn);
    div.append(wrapper);
});