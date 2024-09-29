console.log("Öko Euro Quick Check");

function checkCriteria() {
    let resultElement = document.getElementById('result');
    let rejected = false;
    let contactNeeded = false;

    resultElement.innerHTML = '';
    resetLabels();

    // Transport check (Ausschlusskriterium - Flugzeug or too many cars)
    if (document.getElementById('transport7').checked) {
        rejected = true;
        highlightRejected('Flugzeug als Transportart');
    } else if (document.getElementById('carCount').value > (document.getElementById('participants').value / 10)) {
        rejected = true;
        highlightRejected('Zu viele Kraftfahrzeuge');
    }

    // Müll check (Garantiekriterien)
    if (!document.getElementById('waste1').checked || !document.getElementById('waste5').checked) {
        contactNeeded = true;
        highlightContact('Einwegplastik oder Mülltrennung');
    }

    // Lebensmittel check (Garantiekriterien)
    if (document.getElementById('meatMeals').value > 1 && !document.getElementById('food3').checked) {
        contactNeeded = true;
        highlightContact('Fleisch hat keine Bio-Qualität');
    }

    // Result logic
    if (rejected) {
        resultElement.innerText = "Wird abgelehnt (Rejected)";
        resultElement.className = "rejected";
    } else if (contactNeeded) {
        resultElement.innerText = "Nehmt Kontakt auf! (Contact FAK Ökologie)";
        resultElement.className = "contact";
    } else {
        resultElement.innerText = "Wird stattgegeben (Accepted)";
        resultElement.className = ""; // No special color for accepted
    }
}

function resetLabels() {
    let labels = document.querySelectorAll('label');
    labels.forEach(label => {
        label.className = "normal";
    });
}

function highlightRejected(reason) {
    console.log('Rejected due to:', reason);
}

function highlightContact(reason) {
    console.log('Contact needed due to:', reason);
}

function toggleMeatSection() {
    const selectedFoodType = document.querySelector('input[name="foodType"]:checked').value;

    if (selectedFoodType === 'meat') {
        document.getElementById('meatSection').classList.add('show');
    } else {
        document.getElementById('meatSection').classList.remove('show');
    }
}
