const donateForm = document.getElementById("donate-form");
const donatedAmount = donateForm.money;

donateForm.anotherAmount.value = 100;

donateForm.addEventListener('change', updateDonateAmount);

function updateDonateAmount() {
    for(let amount of donatedAmount) {
        if (amount.checked === true) donateForm.anotherAmount.value = amount.id;
    }
}