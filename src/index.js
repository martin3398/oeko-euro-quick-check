console.log("Öko Euro Quick Check");

function checkCriteria() {
    let resultAccepted = document.getElementById('resultAccepted');
    let resultContact = document.getElementById('resultContact');
    let resultRejected = document.getElementById('resultRejected');

    const showHints = document.getElementById('showHints').checked || false;

    resultAccepted.classList.remove('show');
    resultContact.classList.remove('show');
    resultRejected.classList.remove('show');

    const participants = document.getElementById('participants').value;
    const cars = document.getElementById('carCount').value;
    const days = document.getElementById('days').value;

    if (participants === '' || cars === '' || days === '') {
        resultElement.innerText = "Es befinden sich Fehler im Antrag";
        resultElement.className = "error";

        return;
    }

    let rejected = isRejected(participants, cars, days, showHints);
    let accepted = isAccepted(showHints);

    if (rejected) {
        resultRejected.classList.add('show');
    } else if (accepted) {
        resultAccepted.classList.add('show');
    } else {
        resultContact.classList.add('show');
    }
}

function isRejected(participants, cars, days, showHints) {
    const transportFlugzeug = document.getElementById('transport7').checked;
    if (transportFlugzeug) return true;

    const plasticAvoided = document.getElementById('waste1').checked;
    if (!plasticAvoided) return true;

    const wasteSeparated = document.getElementById('waste5').checked;
    if (!wasteSeparated) return true;

    const allowedCars = Math.ceil(participants / 10) * 3;
    if (cars > allowedCars) return true;

    const isVegan = document.getElementById('food1').checked;
    const isVegetarian = document.getElementById('food2').checked;
    const meatMeals = document.getElementById('meatMeals').value;
    if (!isVegan && !isVegetarian && meatMeals >= days) return true;

    return false;
}

function isAccepted(showHints) {
    const participants = parseInt(document.getElementById('participants').value, 10);
    const cars = parseInt(document.getElementById('carCount').value, 10);
    const days = parseInt(document.getElementById('days').value, 10);
    const carDistance = parseInt(document.getElementById('carDistance').value, 10);

    const autoChecked = document.getElementById('transport6').checked;
    const reisebusChecked = document.getElementById('transport5').checked;
    const busEmptyChecked = document.getElementById('busEmpty') ? document.getElementById('busEmpty').checked : true;

    const bottlesChecked = document.getElementById('waste2').checked;
    const lunchboxesChecked = document.getElementById('waste3').checked;
    const leftoversChecked = document.getElementById('waste4').checked;

    const veganChecked = document.getElementById('food1').checked;
    const vegetarianChecked = document.getElementById('food2').checked;
    const meatChecked = document.getElementById('food3').checked;
    const meatMealsInput = parseInt(document.getElementById('meatMeals').value, 10) || 0;
    const meatMeals = veganChecked || vegetarianChecked ? 0 : meatMealsInput;
    const bioMeatChecked = document.getElementById('food4').checked;
    const mscFishChecked = document.getElementById('food5').checked;

    const fairTradeChecked = document.getElementById('food6').checked;
    const regionalChecked = document.getElementById('food7').checked;

    const ecoMeasuresChecked = document.getElementById('theme1').checked;
    if (autoChecked) return false;
    if (reisebusChecked && busEmptyChecked) return false;

    const allowedCars = Math.ceil(participants / 50);
    if (cars > allowedCars) return false;
    if (cars >= 1 && carDistance > 500) return false;
    if (!bottlesChecked) return false;
    if (!lunchboxesChecked) return false;
    if (!leftoversChecked) return false;
    if (days < 3 && meatMeals > 0) return false;
    if (days === 3 && meatMeals > 1) return false
    if (days > 3 && meatMeals > Math.floor(days / 3)) return false;
    if (meatChecked && meatMeals > 0 && !bioMeatChecked) return false;
    if (meatChecked && meatMeals > 0 && !mscFishChecked) return false;
    if (!fairTradeChecked) return false;
    if (!regionalChecked) return false;
    if (!ecoMeasuresChecked) return false;

    return true;
}

function toggleMeatSection() {
    const selectedFoodType = document.querySelector('input[name="foodType"]:checked').value;

    if (selectedFoodType === 'meat') {
        document.getElementById('meatSection').classList.add('show');
    } else {
        document.getElementById('meatSection').classList.remove('show');
    }
}

function toggleBusSection() {
    const busSelected = document.getElementById('transport5').checked;

    if (busSelected) {
        document.getElementById('busSection').classList.add('show');
    } else {
        document.getElementById('busSection').classList.remove('show');
    }
}

checkCriteria();
