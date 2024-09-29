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
    let rejected = false;

    const transportFlugzeug = document.getElementById('transport7').checked;
    if (transportFlugzeug) rejected = true;
    setRejectedHint('transport7', transportFlugzeug, showHints);

    const plasticAvoided = document.getElementById('waste1').checked;
    if (!plasticAvoided) rejected = true;
    setRejectedHint('waste1', !plasticAvoided, showHints);

    const wasteSeparated = document.getElementById('waste5').checked;
    if (!wasteSeparated) rejected = true;
    setRejectedHint('waste5', !wasteSeparated, showHints);

    const allowedCars = Math.ceil(participants / 10) * 3;
    if (cars > allowedCars) rejected = true;
    setRejectedHint('carCount', cars > allowedCars, showHints);

    const isVegan = document.getElementById('food1').checked;
    const isVegetarian = document.getElementById('food2').checked;
    const meatMeals = document.getElementById('meatMeals').value;
    if (!isVegan && !isVegetarian && meatMeals >= days) rejected = true;
    setRejectedHint('meatMeals', !isVegan && !isVegetarian && meatMeals >= days, showHints);

    return rejected;
}

function isAccepted(showHints) {
    let accepted = true;

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
    if (autoChecked) accepted = false;
    setContactHint('transport6', autoChecked, showHints);
    if (reisebusChecked && busEmptyChecked) accepted = false;
    setContactHint('busEmpty', reisebusChecked && busEmptyChecked, showHints);

    const allowedCars = Math.ceil(participants / 50);
    if (cars > allowedCars) accepted = false;
    setContactHint('carCount', cars > allowedCars, showHints);
    if (cars >= 1 && carDistance > 500) accepted = false;
    setContactHint('carDistance', cars >= 1 && carDistance > 500, showHints);
    if (!bottlesChecked) accepted = false;
    setContactHint('waste2', !bottlesChecked, showHints);
    if (!lunchboxesChecked) accepted = false;
    setContactHint('waste3', !lunchboxesChecked, showHints);
    if (!leftoversChecked) accepted = false;
    setContactHint('waste4', !leftoversChecked, showHints);
    if (days < 3 && meatMeals > 0) accepted = false;
    if (days < 3) setContactHint('meatMeals', meatMeals > 0, showHints);
    if (days === 3 && meatMeals > 1) accepted = false;
    if (days === 3) setContactHint('meatMeals', meatMeals > 1, showHints);
    if (days > 3 && meatMeals > Math.floor(days / 3)) accepted = false;
    if (days > 3) setContactHint('meatMeals', meatMeals > Math.floor(days / 3), showHints);
    if (meatChecked && meatMeals > 0 && !bioMeatChecked) accepted = false;
    if (meatChecked) setContactHint('food4', meatChecked && meatMeals > 0 && !bioMeatChecked, showHints);
    if (meatChecked && meatMeals > 0 && !mscFishChecked) accepted = false;
    if (meatChecked) setContactHint('food5', meatChecked && meatMeals > 0 && !mscFishChecked, showHints);
    if (!fairTradeChecked) accepted = false;
    setContactHint('food6', !fairTradeChecked, showHints);
    if (!regionalChecked) accepted = false;
    setContactHint('food7', !regionalChecked, showHints);
    if (!ecoMeasuresChecked) accepted = false;
    setContactHint('theme1', !ecoMeasuresChecked, showHints);

    return accepted;
}

function setRejectedHint(id, showHint, showHints) {
    if (showHint && showHints) {
        document.getElementById(id).parentElement.classList.add('hintRejected');
    } else {
        document.getElementById(id).parentElement.classList.remove('hintRejected');
    }
}

function setContactHint(id, showHint, showHints) {
    if (showHint && showHints) {
        document.getElementById(id).parentElement.classList.add('hintContact');
    } else {
        document.getElementById(id).parentElement.classList.remove('hintContact');
    }
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
