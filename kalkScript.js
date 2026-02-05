// Funksjon for å bytte mellom kalkulatorer
function switchCalculator() {
    const selectedType = document.getElementById('calcType').value;
    
    // Skjul alle seksjoner
    document.querySelectorAll('.calc-section').forEach(el => el.classList.remove('active'));
    
    // Vis den valgte seksjonen
    document.getElementById('section-' + selectedType).classList.add('active');
}

// Kalkulator 1: Væskebehov (4-2-1 regelen)
function calculateFluid() {
    const weight = parseFloat(document.getElementById('weightInputFluid').value);
    const resultsDiv = document.getElementById('results-fluid');

    if (!weight || weight <= 0) {
        alert("Vennligst skriv inn en gyldig vekt.");
        return;
    }

    let fluidTotal = 0;
    if (weight <= 10) {
        fluidTotal = weight * 100;
    } else if (weight <= 20) {
        fluidTotal = 1000 + ((weight - 10) * 50);
    } else {
        fluidTotal = 1500 + ((weight - 20) * 20);
    }
    
    const fluidHourly = (fluidTotal / 24).toFixed(1);
    const sickFluidValue = (fluidTotal * 0.8).toFixed(1);
    const fluidSickHourly = (sickFluidValue / 24).toFixed(1);

    // Oppdater UI
    document.getElementById('fluidValue').innerText = Math.round(fluidTotal) + " ml/døgn";
    document.getElementById('fluidRate').innerText = fluidHourly + " ml/time";
    document.getElementById('sickFluidValue').innerText = Math.round(sickFluidValue) + " ml/døgn";
    document.getElementById('fluidSickRate').innerText = fluidSickHourly + " ml/time";
    resultsDiv.style.display = "block";
}

// Kalkulator 2: BMI
function calculateBMI() {
    const weight = parseFloat(document.getElementById('bmiWeight').value);
    const heightCm = parseFloat(document.getElementById('bmiHeight').value);
    const resultsDiv = document.getElementById('results-bmi');

    if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
        alert("Vennligst fyll inn både vekt og høyde.");
        return;
    }

    const heightM = heightCm / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);

    document.getElementById('bmiResult').innerText = bmi;
    resultsDiv.style.display = "block";
}

// Kalkulator 3: Dosering (Paracetamol/Ibux)
function calculateDosage() {
    const weight = parseFloat(document.getElementById('weightInputDose').value);
    const resultsDiv = document.getElementById('results-dosage');

    if (!weight || weight <= 0) {
        alert("Vennligst skriv inn en gyldig vekt.");
        return;
    }

    const paraDose = Math.round(weight * 15);
    const ibuxDose = Math.round(weight * 10);

    document.getElementById('paraValue').innerText = paraDose + " mg";
    document.getElementById('ibuxValue').innerText = ibuxDose + " mg";
    resultsDiv.style.display = "block";
}

// Kalkulator 4: Diabetes (Insulin)
function calculateInsulin() {
    const enheter = parseFloat(document.getElementById('enheter').value);
    const weight = parseFloat(document.getElementById('weightInputDia').value);
    const resultsDiv = document.getElementById('results-insulin');

    if (!enheter || !weight || enheter <= 0 || weight <= 0) {
        alert("Vennligst fyll inn både enheter og vekt.");
        return;
    }
    const insulinDøgndose = (enheter * weight).toFixed(1);
    const startDose = (weight * 0.05).toFixed(1);
    const karbhydratVurdering = (500 / weight).toFixed(1);
    const insulinSensitivitet = (100 / weight).toFixed(1);

    document.getElementById('insulinResult').innerText = insulinDøgndose + " enheter/døgn";
    document.getElementById('startDose').innerText = startDose + " enheter";
    document.getElementById('karbResult').innerText = "1E insulin dekker " + karbhydratVurdering + " gram karbohydrater";
    document.getElementById('sensitivityResult').innerText = "1E insulin senker blodsukkeret med " + insulinSensitivitet + " mmol/L";
    resultsDiv.style.display = "block";
}

// Kalkulator 5: Diabetisk Ketoacidose (DKA)
function calculateDKA() {
    const weight = parseFloat(document.getElementById('weightInputDKA').value);
    const deficit = parseFloat(document.getElementById('antattDeficit').value);
    const resultsDiv = document.getElementById('results-DKA');
    
    if (!weight || weight <= 0) {
        alert("Vennligst skriv inn en gyldig vekt.");
        return;
    }   
    
    const initialVæske = Math.round(10 * weight);           
    const antattDeficitVal = Math.round(((deficit * weight)/100)*1000);
    const fluidMaintenance = (() => {
        if (weight <= 10) return weight * 100;
        if (weight <= 20) return 1000 + ((weight - 10) * 50);
        return 1500 + ((weight - 20) * 20);
    })();
    
    const væskeEtterInitial = Math.round((antattDeficitVal - initialVæske) + (2 * fluidMaintenance));
    const væskeEtterInitialRate = Math.round(væskeEtterInitial / 48);

    document.getElementById('initialFluid').innerText = initialVæske + " ml over 20-30 min";
    document.getElementById('deficitValue').innerText = antattDeficitVal + " ml";
    document.getElementById('maintenanceValue').innerText = fluidMaintenance + " ml";
    document.getElementById('væskeEtterInitial').innerText = væskeEtterInitial + " ml";
    document.getElementById('dkaFluidRate').innerText = "(" + væskeEtterInitialRate + " ml/time)";
    resultsDiv.style.display = "block";
}

// Kalkulator 6: Prematur PN (Parenteral Ernæring)
function calculatePremPN() {
    const weight = parseFloat(document.getElementById('weightInputPPn').value);
    const vBehov = parseFloat(document.getElementById('væskebehov').value);
    const ønsketKH = parseFloat(document.getElementById('Karbohydrat').value); 
    const enteralt = parseFloat(document.getElementById('enteralt').value) || 0;
    const andreV = parseFloat(document.getElementById('andreVæsker').value) || 0;
    const resultsDiv = document.getElementById('results-premPN');

    if (!weight || weight <= 0 || isNaN(vBehov)) {
        alert("Vennligst fyll inn vekt og væskebehov.");
        return;
    }
    
    // 1. Move this UP so it is defined before use
    const glucoseVolum = (20 * weight); 

    // 2. Now you can use glucoseVolum here
    const mengdePN = (weight * vBehov) - enteralt - andreV - glucoseVolum;
    const ratePn = (mengdePN / 24).toFixed(1);
    
    // 3. Rest of the calculations...
    const khInPn = (0.057 * mengdePN) / weight; 
    const protein = (0.028 * mengdePN) / weight; 
    const fett = (0.024 * mengdePN) / weight; 

    const rateGlucose = (glucoseVolum / 24).toFixed(1);
    const khInGlucose = ønsketKH - khInPn; 
    const ønsketGlucoseProsent = ((khInGlucose * 1000) / 20 / 10).toFixed(1); 

    // 4. Update UI
    document.getElementById('pnAmount').innerText = Math.round(mengdePN) + " ml/døgn";
    document.getElementById('pnRate').innerText = ratePn + " ml/time";
    document.getElementById('khInPn').innerText = khInPn.toFixed(1) + " g/kg/døgn";
    document.getElementById('proteinInPn').innerText = protein.toFixed(1) + " g/kg/døgn";
    document.getElementById('fatInPn').innerText = fett.toFixed(1) + " g/kg/døgn";
    
    document.getElementById('glucoseResult').innerText = Math.round(glucoseVolum) + " ml/døgn";
    document.getElementById('glucoseRate').innerText = rateGlucose + " ml/time";
    document.getElementById('gGlucoseInGlucose').innerText = khInGlucose.toFixed(1) + " g/kg/døgn";
    document.getElementById('gGlucoseInTotal').innerText = (khInPn + khInGlucose).toFixed(1) + " g/kg/døgn";
    document.getElementById('glucosePercent').innerText = "Ønsket glukoseprosent er: " + ønsketGlucoseProsent + " %";
    
    resultsDiv.style.display = "block";
}