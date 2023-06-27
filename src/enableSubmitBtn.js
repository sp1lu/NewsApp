const dialogCheckboxes = document.querySelectorAll('input[type="checkbox"]');

export const isChecked = dialogCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        if (checkbox.checked === false) {
            dialogBtn.disabled = true;
        } else {
            dialogBtn.disabled = false;
        }
    })
})