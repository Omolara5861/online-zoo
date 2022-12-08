const donateForm = document.getElementById('donate-form');
const anotherAmount = document.getElementById('another-amount');
const donatedAmount = donateForm.money;

donateForm.anotherAmount.value = 100;


donateForm.addEventListener('change', updateDonateAmount);

function updateDonateAmount() {
    for(let amount of donatedAmount) {
        if (amount.checked === true) donateForm.anotherAmount.value = amount.id;
    }
}


anotherAmount.addEventListener('input', updateCheckedAmount);

function updateCheckedAmount() {
    for (let amount of donatedAmount) {
        if (anotherAmount.value === amount.id) amount.checked = true;
        else amount.checked = false;
    }
}
updateCheckedAmount();