// Configuración de monedas
const currencies = {
    COP: { symbol: '$', name: 'Peso Colombiano', decimals: 0, locale: 'es-CO' },
    USD: { symbol: '$', name: 'Dólar Estadounidense', decimals: 2, locale: 'en-US' },
    EUR: { symbol: '€', name: 'Euro', decimals: 2, locale: 'de-DE' },
    MXN: { symbol: '$', name: 'Peso Mexicano', decimals: 2, locale: 'es-MX' },
    PEN: { symbol: 'S/', name: 'Sol Peruano', decimals: 2, locale: 'es-PE' },
    ARS: { symbol: '$', name: 'Peso Argentino', decimals: 2, locale: 'es-AR' },
    CLP: { symbol: '$', name: 'Peso Chileno', decimals: 0, locale: 'es-CL' },
    BRL: { symbol: 'R$', name: 'Real Brasileño', decimals: 2, locale: 'pt-BR' },
    BOB: { symbol: 'Bs', name: 'Boliviano', decimals: 2, locale: 'es-BO' },
    UYU: { symbol: '$U', name: 'Peso Uruguayo', decimals: 2, locale: 'es-UY' }
};

// Variables globales
let contributions = [];
let rateChanges = [];
let currentCurrency = 'COP';
let chartInstance = null;
let distributionChartInstance = null;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    initializeLanguage();
});

function initializeApp() {
    currentCurrency = document.getElementById('currency').value;
    
    // Establecer valores por defecto según datos de prueba
    document.getElementById('term').value = 180;
    document.getElementById('interestRate').value = 10.00;
    
    // Establecer fecha actual del sistema
    setCurrentSystemDate();
    
    // Establecer monto por defecto según los datos de prueba
    if (currentCurrency === 'COP') {
        document.getElementById('loanAmount').value = formatCurrency(200000000, 'COP');
    }
    
    // Configurar opciones de tipo de tasa según el período seleccionado
    updateRateTypeOptions();
    updateNewRateTypeOptions(); // Nueva función para cambios de tasa
    
    setupCurrencyFormatting();
}

function setCurrentSystemDate() {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    document.getElementById('disbursementDate').value = dateString;
}

function initializeLanguage() {
    // Cargar idioma guardado o usar español por defecto
    const savedLanguage = localStorage.getItem('preferred-language') || 'es';
    document.getElementById('languageSelect').value = savedLanguage;
    
    // Importar el archivo de traducciones si no está cargado
    if (typeof translations === 'undefined') {
        const script = document.createElement('script');
        script.src = 'translations.js';
        script.onload = () => {
            changeLanguage(savedLanguage);
        };
        document.head.appendChild(script);
    } else {
        changeLanguage(savedLanguage);
    }
}

function hasBasicConfiguration() {
    const loanAmount = parseFormattedNumber(document.getElementById('loanAmount').value);
    const term = parseInt(document.getElementById('term').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    
    return loanAmount > 0 && term > 0 && !isNaN(interestRate) && interestRate >= 0;
}

function setupEventListeners() {
    // Selector de idioma
    document.getElementById('languageSelect').addEventListener('change', function() {
        changeLanguage(this.value);
    });
    
    // Cambio de moneda
    document.getElementById('currency').addEventListener('change', handleCurrencyChange);
    
    // Formateo de montos (SIN formateo automático para tasas)
    document.getElementById('loanAmount').addEventListener('input', handleAmountInput);
    document.getElementById('contributionAmount').addEventListener('input', handleAmountInput);
    
    // CAMPO DE TASA: Solo validación numérica, SIN formateo automático
    document.getElementById('interestRate').addEventListener('input', handleRateInput);
    document.getElementById('newRate').addEventListener('input', handleRateInput);
    
    // Validación al perder el foco
    document.getElementById('loanAmount').addEventListener('blur', validateAmount);
    document.getElementById('term').addEventListener('blur', validatePositiveInteger);
    document.getElementById('interestRate').addEventListener('blur', validateRate);
    document.getElementById('contributionAmount').addEventListener('blur', validateAmount);
    document.getElementById('contributionMonth').addEventListener('blur', validatePositiveInteger);
    document.getElementById('newRate').addEventListener('blur', validateRate);
    document.getElementById('rateChangeMonth').addEventListener('blur', validatePositiveInteger);
    
    // Cambio de período de tasa principal
    document.querySelectorAll('input[name="ratePeriod"]').forEach(radio => {
        radio.addEventListener('change', updateRateTypeOptions);
    });
    
    // Cambio de período de nueva tasa
    document.querySelectorAll('input[name="newRatePeriod"]').forEach(radio => {
        radio.addEventListener('change', updateNewRateTypeOptions);
    });
    
    // Botones de acción
    document.getElementById('addContribution').addEventListener('click', addContribution);
    document.getElementById('addRateChange').addEventListener('click', addRateChange);
    document.getElementById('calculateAmortization').addEventListener('click', calculateAmortization);
    document.getElementById('exportCsv').addEventListener('click', exportToCSV);
}

function updateRateTypeOptions() {
    const ratePeriod = document.querySelector('input[name="ratePeriod"]:checked').value;
    const rateTypeSelect = document.getElementById('rateType');
    const currentValue = rateTypeSelect.value;
    
    // Limpiar opciones actuales
    rateTypeSelect.innerHTML = '';
    
    if (ratePeriod === 'annual') {
        rateTypeSelect.innerHTML = `
            <option value="nominal-annual">${t('nominal') || 'Nominal'}</option>
            <option value="effective-annual">${t('effective') || 'Efectiva'}</option>
        `;
        // Mantener selección si es compatible
        if (currentValue === 'nominal-annual' || currentValue === 'effective-annual') {
            rateTypeSelect.value = currentValue;
        } else {
            rateTypeSelect.value = 'effective-annual'; // Default
        }
    } else { // monthly
        rateTypeSelect.innerHTML = `
            <option value="nominal-monthly">${t('nominal') || 'Nominal'}</option>
            <option value="effective-monthly">${t('effective') || 'Efectiva'}</option>
        `;
        // Mantener selección si es compatible
        if (currentValue === 'nominal-monthly' || currentValue === 'effective-monthly') {
            rateTypeSelect.value = currentValue;
        } else {
            rateTypeSelect.value = 'effective-monthly'; // Default
        }
    }
}

function updateNewRateTypeOptions() {
    const newRatePeriod = document.querySelector('input[name="newRatePeriod"]:checked').value;
    const newRateTypeSelect = document.getElementById('newRateType');
    const currentValue = newRateTypeSelect.value;
    
    // Obtener los valores por defecto de la configuración principal
    const mainRatePeriod = document.querySelector('input[name="ratePeriod"]:checked').value;
    const mainRateType = document.getElementById('rateType').value;
    
    // Limpiar opciones actuales
    newRateTypeSelect.innerHTML = '';
    
    if (newRatePeriod === 'annual') {
        newRateTypeSelect.innerHTML = `
            <option value="nominal-annual">${t('nominal') || 'Nominal'}</option>
            <option value="effective-annual">${t('effective') || 'Efectiva'}</option>
        `;
        // Si el período principal es anual, usar el mismo tipo por defecto
        if (mainRatePeriod === 'annual') {
            newRateTypeSelect.value = mainRateType;
        } else {
            newRateTypeSelect.value = 'effective-annual'; // Default
        }
    } else { // monthly
        newRateTypeSelect.innerHTML = `
            <option value="nominal-monthly">${t('nominal') || 'Nominal'}</option>
            <option value="effective-monthly">${t('effective') || 'Efectiva'}</option>
        `;
        // Si el período principal es mensual, usar el mismo tipo por defecto
        if (mainRatePeriod === 'monthly') {
            newRateTypeSelect.value = mainRateType;
        } else {
            newRateTypeSelect.value = 'effective-monthly'; // Default
        }
    }
    
    // Mantener selección si es compatible
    if (currentValue && (currentValue.includes('annual') && newRatePeriod === 'annual' || 
                        currentValue.includes('monthly') && newRatePeriod === 'monthly')) {
        newRateTypeSelect.value = currentValue;
    }
}

// FUNCIÓN CRÍTICA: Manejo de entrada de tasa SIN formateo automático
function handleRateInput(event) {
    let value = event.target.value;
    
    // Permitir solo números, punto decimal y nada más
    value = value.replace(/[^\d.]/g, '');
    
    // Limitar a un solo punto decimal
    const parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Limitar a 2 decimales
    if (parts.length === 2 && parts[1].length > 2) {
        parts[1] = parts[1].substring(0, 2);
        value = parts.join('.');
    }
    
    // Actualizar el valor SIN agregar %
    event.target.value = value;
    
    // Remover clase de error si existe
    event.target.classList.remove('error-input');
    removeErrorMessage(event.target);
}

function handleAmountInput(event) {
    let value = event.target.value;
    
    // Remover todo excepto números
    let numericValue = value.replace(/[^\d]/g, '');
    
    if (numericValue === '') {
        event.target.value = '';
        return;
    }
    
    const number = parseInt(numericValue);
    const maxAmount = 999999999999;
    
    if (number > maxAmount) {
        numericValue = maxAmount.toString();
    }
    
    // Formatear con separadores de miles
    event.target.value = formatCurrency(parseInt(numericValue), currentCurrency);
    event.target.classList.remove('error-input');
    removeErrorMessage(event.target);
}

function validateRate(event) {
    const value = parseFloat(event.target.value);
    
    if (isNaN(value) || value < 0) {
        event.target.classList.add('error-input');
        showErrorMessage(event.target, 'Debe ingresar una tasa válida (mayor o igual a 0)');
    } else if (value > 100) {
        event.target.classList.add('error-input');
        showErrorMessage(event.target, 'La tasa no puede ser mayor a 100%');
    } else {
        event.target.classList.remove('error-input');
        removeErrorMessage(event.target);
    }
}

function validateAmount(event) {
    const value = parseFormattedNumber(event.target.value);
    const maxAmount = 999999999999;
    
    if (isNaN(value) || value <= 0) {
        event.target.classList.add('error-input');
        showErrorMessage(event.target, 'Debe ingresar un monto válido mayor que cero');
    } else if (value > maxAmount) {
        event.target.classList.add('error-input');
        showErrorMessage(event.target, `El monto máximo permitido es ${formatCurrency(maxAmount)}`);
    } else {
        event.target.classList.remove('error-input');
        removeErrorMessage(event.target);
    }
}

function validatePositiveInteger(event) {
    const value = parseInt(event.target.value);
    
    if (isNaN(value) || value <= 0) {
        event.target.classList.add('error-input');
        showErrorMessage(event.target, 'Debe ingresar un valor entero positivo mayor que cero');
    } else {
        event.target.classList.remove('error-input');
        removeErrorMessage(event.target);
    }
}

function showErrorMessage(element, message) {
    removeErrorMessage(element);
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    element.after(errorMessage);
    
    setTimeout(() => {
        removeErrorMessage(element);
    }, 5000);
}

function removeErrorMessage(element) {
    const nextElement = element.nextElementSibling;
    if (nextElement && nextElement.classList.contains('error-message')) {
        nextElement.remove();
    }
}

function handleCurrencyChange() {
    currentCurrency = document.getElementById('currency').value;
    setupCurrencyFormatting();
    
    // Ya no necesitamos actualizar la fecha según la moneda
    // La fecha se mantiene como la fecha actual del sistema
    
    // Reformatear campos de monto existentes
    const loanAmount = document.getElementById('loanAmount');
    const contributionAmount = document.getElementById('contributionAmount');
    
    if (loanAmount.value) {
        const value = parseFormattedNumber(loanAmount.value);
        if (value > 0) {
            loanAmount.value = formatCurrency(value, currentCurrency);
        }
    }
    
    if (contributionAmount.value) {
        const value = parseFormattedNumber(contributionAmount.value);
        if (value > 0) {
            contributionAmount.value = formatCurrency(value, currentCurrency);
        }
    }
}

function setupCurrencyFormatting() {
    // Configurar formato de fecha según moneda - NO necesario cambios aquí
}

function formatCurrency(amount, currency = currentCurrency) {
    const config = currencies[currency];
    
    if (isNaN(amount) || amount < 0) {
        amount = 0;
    }
    
    if (amount > 999999999999) {
        amount = 999999999999;
    }
    
    try {
        return new Intl.NumberFormat(config.locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: config.decimals,
            maximumFractionDigits: config.decimals
        }).format(amount);
    } catch (error) {
        return config.symbol + ' ' + amount.toLocaleString();
    }
}

function parseFormattedNumber(value) {
    if (!value || typeof value !== 'string') return 0;
    const cleanValue = value.replace(/[^\d]/g, '');
    const number = parseInt(cleanValue);
    return isNaN(number) ? 0 : number;
}

function getMonthlyRate() {
    const rate = parseFloat(document.getElementById('interestRate').value);
    const rateType = document.getElementById('rateType').value;
    const ratePeriod = document.querySelector('input[name="ratePeriod"]:checked').value;
    
    if (isNaN(rate) || rate <= 0) return 0;
    
    // Convertir la tasa según el tipo y período seleccionados
    if (ratePeriod === 'annual') {
        if (rateType === 'effective-annual') {
            return Math.pow(1 + rate / 100, 1/12) - 1;
        } else { // nominal-annual
            return rate / 12 / 100;
        }
    } else { // ratePeriod === 'monthly'
        if (rateType === 'effective-monthly') {
            return rate / 100;
        } else { // nominal-monthly
            return rate / 100;
        }
    }
}

function addContribution() {
    const type = document.getElementById('contributionType').value;
    const amountField = document.getElementById('contributionAmount');
    const amount = parseFormattedNumber(amountField.value);
    const monthField = document.getElementById('contributionMonth');
    const month = parseInt(monthField.value);
    const strategy = document.querySelector('input[name="contributionStrategy"]:checked').value;
    
    if (!amount || amount <= 0) {
        showErrorNotification('Por favor ingrese un monto válido para el aporte');
        amountField.classList.add('error-input');
        return;
    }
    
    if (!month || month <= 0) {
        showErrorNotification('Por favor ingrese un mes válido');
        monthField.classList.add('error-input');
        return;
    }
    
    const contribution = {
        id: Date.now(),
        type,
        amount,
        month,
        strategy
    };
    
    contributions.push(contribution);
    renderContributions();
    
    showSuccessNotification(`Aporte ${type === 'single' ? 'único' : 'recurrente'} agregado correctamente. Haz clic en "Calcular Amortización" para ver los cambios.`);
    
    amountField.classList.add('success-highlight');
    setTimeout(() => {
        amountField.classList.remove('success-highlight');
    }, 1000);
    
    // Limpiar campos después de agregar
    amountField.value = '';
    monthField.value = '1';
}

function addRateChange() {
    const rateField = document.getElementById('newRate');
    const newRate = parseFloat(rateField.value);
    const monthField = document.getElementById('rateChangeMonth');
    const month = parseInt(monthField.value);
    const newRateType = document.getElementById('newRateType').value;
    const newRatePeriod = document.querySelector('input[name="newRatePeriod"]:checked').value;
    
    if (isNaN(newRate) || newRate < 0) {
        showErrorNotification(t('validRateRequired') || 'Por favor ingrese una tasa válida');
        rateField.classList.add('error-input');
        return;
    }
    
    if (!month || month <= 0) {
        showErrorNotification(t('validTermRequired') || 'Por favor ingrese un mes válido');
        monthField.classList.add('error-input');
        return;
    }
    
    const rateChange = {
        id: Date.now(),
        newRate,
        newRateType,
        newRatePeriod,
        month,
        strategy: 'Reducir Cuota'
    };
    
    rateChanges.push(rateChange);
    renderRateChanges();
    
    const successMessage = t('rateChangeAdded') || 'Cambio de tasa agregado para el mes';
    showSuccessNotification(`${successMessage} ${month}. ${t('calculateAmortization') || 'Haz clic en "Calcular Amortización"'} para ver los cambios.`);
    
    rateField.classList.add('success-highlight');
    setTimeout(() => {
        rateField.classList.remove('success-highlight');
    }, 1000);
    
    // Limpiar campos después de agregar
    rateField.value = '';
    monthField.value = '1';
    // Resetear el período y tipo de nueva tasa a los valores por defecto
    document.querySelector('input[name="newRatePeriod"][value="annual"]').checked = true;
    updateNewRateTypeOptions();
}

function showSuccessNotification(message) {
    showNotification(message, 'success-notification');
}

function showErrorNotification(message) {
    showNotification(message, 'error-notification');
}

function showNotification(message, className) {
    const notification = document.createElement('div');
    notification.className = `notification ${className}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateY(-20px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function renderContributions() {
    const container = document.getElementById('contributionsList');
    container.innerHTML = '';
    
    if (contributions.length === 0) {
        const emptyMessage = t('noContributions') || 'No hay aportes extraordinarios configurados';
        container.innerHTML = `<p class="empty-list-message">${emptyMessage}</p>`;
        return;
    }
    
    contributions.forEach(contribution => {
        const div = document.createElement('div');
        div.className = `contribution-item ${contribution.type}`;
        
        // Usar traducciones para etiquetas
        const typeLabel = contribution.type === 'single' ? (t('single') || 'Único') : (t('recurring') || 'Recurrente');
        const strategyLabel = contribution.strategy === 'Reducir Plazo' ? 
            (t('reduceTerm') || 'Reducir Plazo (mantener cuota)') : 
            (t('reducePayment') || 'Reducir Cuota (mantener plazo)');
        const monthLabel = t('month') || 'Mes';
        
        div.innerHTML = `
            <div class="item-content">
                <strong>${typeLabel}</strong> - ${formatCurrency(contribution.amount)} 
                (${monthLabel} ${contribution.month}) - ${strategyLabel}
            </div>
            <button class="remove-btn" data-id="${contribution.id}">×</button>
        `;
        
        div.querySelector('.remove-btn').addEventListener('click', function() {
            removeContribution(contribution.id);
        });
        
        container.appendChild(div);
    });
}

function renderRateChanges() {
    const container = document.getElementById('rateChangesList');
    container.innerHTML = '';
    
    if (rateChanges.length === 0) {
        const emptyMessage = t('noRateChanges') || 'No hay cambios de tasa configurados';
        container.innerHTML = `<p class="empty-list-message">${emptyMessage}</p>`;
        return;
    }
    
    rateChanges.forEach(rateChange => {
        const div = document.createElement('div');
        div.className = 'rate-change-item';
        
        // Determinar etiquetas de tipo y período
        let typeLabel = 'Efectiva';
        let periodLabel = 'Anual';
        
        if (rateChange.newRateType) {
            typeLabel = rateChange.newRateType.includes('nominal') ? (t('nominal') || 'Nominal') : (t('effective') || 'Efectiva');
            periodLabel = rateChange.newRatePeriod === 'monthly' ? (t('monthly') || 'Mensual') : (t('annual') || 'Anual');
        }
        
        const newRateLabel = t('newRate') || 'Nueva Tasa';
        const monthLabel = t('month') || 'Mes';
        const strategyLabel = t('reducePayment') || 'Reducir Cuota (mantener plazo)';
        
        div.innerHTML = `
            <div class="item-content">
                <strong>${newRateLabel}:</strong> ${rateChange.newRate}% ${typeLabel} ${periodLabel} (${monthLabel} ${rateChange.month}) - <span class="strategy-label">${strategyLabel}</span>
            </div>
            <button class="remove-btn" data-id="${rateChange.id}">×</button>
        `;
        
        div.querySelector('.remove-btn').addEventListener('click', function() {
            removeRateChange(rateChange.id);
        });
        
        container.appendChild(div);
    });
}

function removeContribution(id) {
    contributions = contributions.filter(c => c.id !== id);
    renderContributions();
    
    const message = t('contributionRemoved') || 'Aporte eliminado. Haz clic en "Calcular Amortización" para actualizar.';
    showNotification(message, 'info-notification');
}

function removeRateChange(id) {
    rateChanges = rateChanges.filter(r => r.id !== id);
    renderRateChanges();
    
    const message = t('rateChangeRemoved') || 'Cambio de tasa eliminado. Haz clic en "Calcular Amortización" para actualizar.';
    showNotification(message, 'info-notification');
}

function calculateAmortization() {
    // Validar datos básicos
    const loanAmountField = document.getElementById('loanAmount');
    const termField = document.getElementById('term');
    const interestRateField = document.getElementById('interestRate');
    
    const loanAmount = parseFormattedNumber(loanAmountField.value);
    const term = parseInt(termField.value);
    const interestRate = parseFloat(interestRateField.value);
    
    let hasErrors = false;
    
    if (!loanAmount || loanAmount <= 0) {
        showErrorNotification('Por favor ingrese un monto de préstamo válido');
        loanAmountField.classList.add('error-input');
        hasErrors = true;
    }
    
    if (!term || term <= 0) {
        showErrorNotification('Por favor ingrese un plazo válido');
        termField.classList.add('error-input');
        hasErrors = true;
    }
    
    if (isNaN(interestRate) || interestRate < 0) {
        showErrorNotification('Por favor ingrese una tasa de interés válida');
        interestRateField.classList.add('error-input');
        hasErrors = true;
    }
    
    if (hasErrors) return;
    
    // Eliminar clases de error
    loanAmountField.classList.remove('error-input');
    termField.classList.remove('error-input');
    interestRateField.classList.remove('error-input');
    
    const monthlyRate = getMonthlyRate();
    const disbursementDate = new Date(document.getElementById('disbursementDate').value);
    
    // Mostrar indicador de carga
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.innerHTML = `
        <div class="spinner"></div>
        <p>Calculando amortización...</p>
    `;
    document.body.appendChild(loadingIndicator);
    
    setTimeout(() => {
        try {
            const amortizationData = generateAmortizationSchedule(
                loanAmount, 
                term, 
                monthlyRate, 
                disbursementDate,
                contributions,
                rateChanges
            );
            
            displayResults(amortizationData, loanAmount, term);
            document.getElementById('results').classList.remove('hidden');
            document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
            
            showSuccessNotification('Amortización calculada correctamente');
        } catch (error) {
            console.error('Error al calcular la amortización:', error);
            showErrorNotification('Error al calcular la amortización: ' + error.message);
        } finally {
            loadingIndicator.remove();
        }
    }, 100);
}

function generateAmortizationSchedule(principal, originalTerm, initialRate, startDate, contributions, rateChanges) {
    const schedule = [];
    let currentBalance = principal;
    let currentRate = initialRate;
    let currentMonth = 1;
    let totalInterest = 0;
    let totalContributions = 0;
    let effectiveTerm = originalTerm;

    // Ordenar contribuciones y cambios de tasa por mes
    const sortedContributions = [...contributions].sort((a, b) => a.month - b.month);
    const sortedRateChanges = [...rateChanges].sort((a, b) => a.month - b.month);
    
    // Mapeo de cambios de tasa por mes (con información completa)
    const rateChangesByMonth = {};
    sortedRateChanges.forEach(rc => {
        rateChangesByMonth[rc.month] = {
            newRate: rc.newRate,
            newRateType: rc.newRateType || 'effective-annual', // Default si no existe
            newRatePeriod: rc.newRatePeriod || 'annual' // Default si no existe
        };
    });
    
    // Mapeo de aportes por mes
    const contributionsByMonth = {};
    sortedContributions.forEach(c => {
        if (!contributionsByMonth[c.month]) {
            contributionsByMonth[c.month] = [];
        }
        contributionsByMonth[c.month].push(c);
    });
    
    // Aportes recurrentes
    const recurringContributions = sortedContributions.filter(c => c.type === 'recurring');
    
    // CALCULAR la cuota base inicial
    let baseMonthlyPayment;
    if (currentRate === 0) {
        baseMonthlyPayment = principal / originalTerm;
    } else {
        baseMonthlyPayment = principal * (currentRate * Math.pow(1 + currentRate, originalTerm)) / 
                           (Math.pow(1 + currentRate, originalTerm) - 1);
    }
    
    // PRE-PROCESAR: Calcular todas las reducciones de plazo acumuladas hasta cada mes
    const termReductionsByMonth = {};
    let accumulatedTermReduction = 0;
    
    for (let month = 1; month <= originalTerm + 120; month++) {
        let monthlyTermReduction = 0;
        
        // Aportes únicos para este mes
        if (contributionsByMonth[month]) {
            contributionsByMonth[month].forEach(contribution => {
                if (contribution.type === 'single' && contribution.strategy === 'Reducir Plazo') {
                    if (baseMonthlyPayment > 0) {
                        const monthsEquivalent = contribution.amount / baseMonthlyPayment;
                        monthlyTermReduction += monthsEquivalent;
                    }
                }
            });
        }
        
        // Aportes recurrentes activos (cada mes desde que se activa)
        recurringContributions.forEach(rc => {
            if (rc.month <= month && rc.strategy === 'Reducir Plazo') {
                if (baseMonthlyPayment > 0) {
                    const monthsEquivalent = rc.amount / baseMonthlyPayment;
                    monthlyTermReduction += monthsEquivalent;
                }
            }
        });
        
        accumulatedTermReduction += monthlyTermReduction;
        termReductionsByMonth[month] = accumulatedTermReduction;
    }
    
    // Variables de control
    let currentMonthlyPayment = baseMonthlyPayment;
    let hasReduceQuotaStrategy = false;
    
    // Detectar si hay algún aporte de "Reducir Cuota" en toda la programación
    sortedContributions.forEach(c => {
        if (c.strategy === 'Reducir Cuota') {
            hasReduceQuotaStrategy = true;
        }
    });
    
    while (currentBalance > 0.01 && currentMonth <= originalTerm + 120) {
        const currentDate = new Date(startDate);
        currentDate.setMonth(currentDate.getMonth() + currentMonth);
        
        // ACTUALIZAR effectiveTerm con todas las reducciones acumuladas hasta este mes
        const totalReductionSoFar = termReductionsByMonth[currentMonth] || 0;
        effectiveTerm = originalTerm - totalReductionSoFar;
        effectiveTerm = Math.max(currentMonth, effectiveTerm);
        
        // Verificar cambios de tasa
        let rateChangedThisMonth = false;
        if (rateChangesByMonth[currentMonth]) {
            const rateChangeData = rateChangesByMonth[currentMonth];
            const newRatePercent = rateChangeData.newRate;
            const newRateType = rateChangeData.newRateType;
            const newRatePeriod = rateChangeData.newRatePeriod;
            
            // Convertir la nueva tasa según SU PROPIO tipo y período
            if (newRatePeriod === 'annual') {
                if (newRateType === 'effective-annual') {
                    currentRate = Math.pow(1 + newRatePercent / 100, 1/12) - 1;
                } else { // nominal-annual
                    currentRate = newRatePercent / 12 / 100;
                }
            } else { // newRatePeriod === 'monthly'
                if (newRateType === 'effective-monthly') {
                    currentRate = newRatePercent / 100;
                } else { // nominal-monthly
                    currentRate = newRatePercent / 100;
                }
            }
            
            rateChangedThisMonth = true;
        }
        
        // Procesar aportes extraordinarios del mes actual
        let totalExtraContributionThisMonth = 0;
        let displayReducedMonths = 0;
        let hasReduceQuotaThisMonth = false;

        // Aportes únicos para este mes
        if (contributionsByMonth[currentMonth]) {
            contributionsByMonth[currentMonth].forEach(contribution => {
                if (contribution.type === 'single') {
                    totalExtraContributionThisMonth += contribution.amount;
                    if (contribution.strategy === 'Reducir Plazo') {
                        displayReducedMonths += contribution.amount / currentMonthlyPayment;
                    } else if (contribution.strategy === 'Reducir Cuota') {
                        hasReduceQuotaThisMonth = true;
                    }
                }
            });
        }
        
        // Aportes recurrentes activos
        recurringContributions.forEach(rc => {
            if (rc.month <= currentMonth) {
                totalExtraContributionThisMonth += rc.amount;
                if (rc.strategy === 'Reducir Plazo') {
                    displayReducedMonths += rc.amount / currentMonthlyPayment;
                } else if (rc.strategy === 'Reducir Cuota') {
                    hasReduceQuotaThisMonth = true;
                }
            }
        });

        // LÓGICA SIMPLIFICADA DE CÁLCULO DE CUOTA
        let monthlyPayment;
        
        if (hasReduceQuotaStrategy || rateChangedThisMonth) {
            // Para "Reducir Cuota" o cambios de tasa: recalcular cuota
            let targetTerm;
            
            if (hasReduceQuotaStrategy) {
                // Si hay aportes "Reducir Cuota": siempre usar plazo original
                targetTerm = originalTerm;
            } else if (rateChangedThisMonth) {
                // CORRECCIÓN CRÍTICA: Para cambios de tasa, calcular el plazo real donde terminará el préstamo
                // basado en el saldo actual y los aportes futuros, no usar el effectiveTerm del pre-procesamiento
                
                // Simular cuántos meses más se necesitan con la cuota actual y aportes futuros
                let simulatedBalance = currentBalance;
                let simulatedMonth = currentMonth;
                let simulatedPayment = currentMonthlyPayment;
                
                while (simulatedBalance > 0.01 && simulatedMonth <= originalTerm + 120) {
                    let simulatedInterest = simulatedBalance * currentRate;
                    let simulatedPrincipal = simulatedPayment - simulatedInterest;
                    
                    // Agregar aportes futuros
                    let futureExtraContribution = 0;
                    
                    // Aportes únicos futuros
                    if (contributionsByMonth[simulatedMonth]) {
                        contributionsByMonth[simulatedMonth].forEach(contribution => {
                            if (contribution.type === 'single' && contribution.strategy === 'Reducir Plazo') {
                                futureExtraContribution += contribution.amount;
                            }
                        });
                    }
                    
                    // Aportes recurrentes activos
                    recurringContributions.forEach(rc => {
                        if (rc.month <= simulatedMonth && rc.strategy === 'Reducir Plazo') {
                            futureExtraContribution += rc.amount;
                        }
                    });
                    
                    simulatedBalance -= (simulatedPrincipal + futureExtraContribution);
                    if (simulatedBalance <= 0.01) break;
                    simulatedMonth++;
                }
                
                targetTerm = simulatedMonth;
            }
            
            const remainingMonths = Math.max(1, targetTerm - currentMonth + 1);
            
            if (currentRate === 0) {
                monthlyPayment = currentBalance / remainingMonths;
            } else {
                monthlyPayment = currentBalance * (currentRate * Math.pow(1 + currentRate, remainingMonths)) / 
                               (Math.pow(1 + currentRate, remainingMonths) - 1);
            }
            
            currentMonthlyPayment = monthlyPayment;
        } else {
            // Para "Reducir Plazo" puro: mantener cuota constante
            monthlyPayment = currentMonthlyPayment;
        }
        
        let interestPayment = currentBalance * currentRate;
        let scheduledPrincipalPayment = monthlyPayment - interestPayment;
        
        // Validar que el pago de capital no sea negativo
        if (scheduledPrincipalPayment < 0) {
            scheduledPrincipalPayment = 0;
            monthlyPayment = interestPayment;
        }
        
        // Ajustar si es el último pago o si el saldo es menor al capital programado
        if (currentBalance <= scheduledPrincipalPayment + 0.01) {
            scheduledPrincipalPayment = currentBalance;
            monthlyPayment = scheduledPrincipalPayment + interestPayment;
        }

        // Aplicar pagos al saldo
        let finalTotalPrincipalPaidThisMonth = scheduledPrincipalPayment + totalExtraContributionThisMonth;

        // Ajustar si el pago total excede el saldo
        if (finalTotalPrincipalPaidThisMonth > currentBalance) {
            const overpaidPrincipal = finalTotalPrincipalPaidThisMonth - currentBalance;
            finalTotalPrincipalPaidThisMonth = currentBalance;
            
            if (totalExtraContributionThisMonth >= overpaidPrincipal) {
                totalExtraContributionThisMonth -= overpaidPrincipal;
            } else {
                scheduledPrincipalPayment -= (overpaidPrincipal - totalExtraContributionThisMonth);
                totalExtraContributionThisMonth = 0;
            }
            monthlyPayment = scheduledPrincipalPayment + interestPayment + totalExtraContributionThisMonth;
        }

        // Actualizar el saldo
        currentBalance -= finalTotalPrincipalPaidThisMonth;
        totalInterest += interestPayment;
        totalContributions += totalExtraContributionThisMonth;
        
        let displayBalance = Math.max(0, currentBalance);

        schedule.push({
            month: currentMonth,
            date: formatDate(currentDate),
            payment: monthlyPayment,
            principal: scheduledPrincipalPayment,
            interest: interestPayment,
            extraContribution: totalExtraContributionThisMonth,
            balance: displayBalance,
            rateChange: rateChangedThisMonth,
            reducedMonths: displayReducedMonths
        });
        
        if (displayBalance < 0.01) {
            if(schedule.length > 0) schedule[schedule.length-1].balance = 0;
            break;
        }
        currentMonth++;
    }
    
    if (schedule.length > 0 && schedule[schedule.length-1].balance > 0 && schedule[schedule.length-1].balance < 0.01) {
         schedule[schedule.length-1].balance = 0;
    }

    return {
        schedule,
        totalInterest,
        totalContributions,
        actualTerm: schedule.length > 0 ? schedule[schedule.length-1].month : 0,
        totalPaid: principal + totalInterest
    };
}

function formatDate(dateInput) {
    const date = new Date(dateInput);
    
    // Formatear fecha según la moneda/país
    switch (currentCurrency) {
        case 'USD':
            // Formato estadounidense: MM/DD/YYYY
            return date.toLocaleDateString('en-US');
        case 'EUR':
            // Formato europeo: DD/MM/YYYY
            return date.toLocaleDateString('de-DE');
        case 'MXN':
            // Formato mexicano: DD/MM/YYYY
            return date.toLocaleDateString('es-MX');
        case 'COP':
        default:
            // Formato colombiano: DD/MM/YYYY
            return date.toLocaleDateString('es-CO');
    }
}

function displayResults(data, originalAmount, originalTerm) {
    // Resumen financiero con traducciones
    const summaryContent = document.getElementById('summaryContent');
    summaryContent.innerHTML = `
        <div class="summary-item">
            <span class="summary-value">${formatCurrency(originalAmount)}</span>
            <div class="summary-label">${t('originalAmount') || 'Monto Original'}</div>
        </div>
        <div class="summary-item">
            <span class="summary-value">${formatCurrency(data.totalInterest)}</span>
            <div class="summary-label">${t('totalInterest') || 'Intereses Totales'}</div>
        </div>
        <div class="summary-item">
            <span class="summary-value">${formatCurrency(data.totalContributions)}</span>
            <div class="summary-label">${t('extraPayments') || 'Aportes Extras'}</div>
        </div>
        <div class="summary-item">
            <span class="summary-value">${formatCurrency(data.totalPaid)}</span>
            <div class="summary-label">${t('totalPaid') || 'Total Pagado'}</div>
        </div>
        <div class="summary-item">
            <span class="summary-value">${data.actualTerm}</span>
            <div class="summary-label">${t('actualMonths') || 'Meses Reales'}</div>
        </div>
        <div class="summary-item">
            <span class="summary-value">${originalTerm - data.actualTerm}</span>
            <div class="summary-label">${t('savedMonths') || 'Meses Ahorrados'}</div>
        </div>
    `;
    
    displayAmortizationTable(data.schedule);
    displayChart(data.schedule);
    displayDistributionChart(data, originalAmount);
}

function displayAmortizationTable(schedule) {
    const tableBody = document.querySelector('#amortizationTable tbody');
    tableBody.innerHTML = '';
    
    schedule.forEach(row => {
        const tr = document.createElement('tr');
        
        if (row.rateChange) {
            tr.classList.add('rate-change-row');
        }
        
        tr.innerHTML = `
            <td>${row.month}</td>
            <td>${row.date}</td>
            <td>${formatCurrency(row.payment)}</td>
            <td>${formatCurrency(row.principal)}</td>
            <td>${formatCurrency(row.interest)}</td>
            <td>${formatCurrency(row.extraContribution)}${row.reducedMonths > 0 ? ' <span class="term-reduction-badge" title="Reduce aproximadamente ' + row.reducedMonths.toFixed(1) + ' meses">↓</span>' : ''}</td>
            <td>${formatCurrency(row.balance)}</td>
        `;
        tableBody.appendChild(tr);
    });
}

function displayChart(schedule) {
    const ctx = document.getElementById('balanceChart').getContext('2d');
    
    if (chartInstance) {
        chartInstance.destroy();
    }
    
    const monthLabel = t('month') || 'Mes';
    const labels = schedule.map(row => `${monthLabel} ${row.month}`);
    const balances = schedule.map(row => row.balance);
    
    const rateChangeDataset = {
        label: t('rateChanges') || 'Cambios de Tasa',
        data: schedule.map(row => row.rateChange ? row.balance : null),
        borderColor: '#DB4545',
        backgroundColor: '#DB4545',
        pointRadius: schedule.map(row => row.rateChange ? 5 : 0),
        pointHoverRadius: schedule.map(row => row.rateChange ? 7 : 0),
        pointStyle: 'triangle',
        showLine: false
    };
    
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: t('balance') || 'Saldo Pendiente',
                    data: balances,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: true,
                    tension: 0.1
                },
                rateChangeDataset
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: t('balanceEvolution') || 'Evolución del Saldo del Préstamo',
                    color: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim(),
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    labels: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim()
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const index = context.dataIndex;
                            const datasetIndex = context.datasetIndex;
                            
                            if (datasetIndex === 0) {
                                const balanceLabel = t('balance') || 'Saldo';
                                return `${balanceLabel}: ${formatCurrency(balances[index])}`;
                            } else if (datasetIndex === 1 && schedule[index].rateChange) {
                                const rateChangeLabel = t('rateChanges') || 'Cambio de Tasa';
                                const monthLabel = t('month') || 'Mes';
                                return `${rateChangeLabel} en ${monthLabel} ${schedule[index].month}`;
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    }
                }
            },
            elements: {
                point: {
                    radius: 0
                }
            }
        }
    });
}

function exportToCSV() {
    const table = document.getElementById('amortizationTable');
    let csv = [];
    
    // Cabeceras
    const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent);
    csv.push(headers.join(','));
    
    // Filas de datos
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll('td')).map(td => {
            let value = td.textContent;
            if (value.includes('$') || value.includes('€')) {
                value = value.replace(/[^0-9.-]/g, '');
            }
            value = value.replace('↓', '');
            return `"${value.trim()}"`;
        });
        csv.push(cells.join(','));
    });
    
    // Descargar archivo
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'amortization_schedule.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showSuccessNotification('Archivo CSV descargado correctamente');
    } else {
        showErrorNotification('Su navegador no soporta la descarga directa de archivos');
    }
}

function displayDistributionChart(data, originalAmount) {
    const ctx = document.getElementById('distributionChart').getContext('2d');
    
    if (distributionChartInstance) {
        distributionChartInstance.destroy();
    }
    
    // Calcular distribución
    const totalPaid = data.totalPaid;
    const totalInterest = data.totalInterest;
    const totalContributions = data.totalContributions;
    const principalPaid = originalAmount;
    const remainingBalance = data.schedule.length > 0 ? data.schedule[data.schedule.length - 1].balance : 0;
    
    // Calcular porcentajes
    const total = principalPaid + totalInterest + totalContributions;
    const principalPercentage = ((principalPaid / total) * 100).toFixed(1);
    const interestPercentage = ((totalInterest / total) * 100).toFixed(1);
    const contributionsPercentage = ((totalContributions / total) * 100).toFixed(1);
    
    // Etiquetas con traducciones
    const principalLabel = t('principal') || 'Capital';
    const interestLabel = t('interest') || 'Intereses';
    const contributionsLabel = t('extraContribution') || 'Aportes';
    
    // Datos para la gráfica de torta
    const chartData = {
        labels: [
            `${principalLabel} (${principalPercentage}%)`, 
            `${interestLabel} (${interestPercentage}%)`, 
            `${contributionsLabel} (${contributionsPercentage}%)`
        ],
        datasets: [{
            data: [principalPaid, totalInterest, totalContributions],
            backgroundColor: [
                '#1FB8CD',  // Azul - Capital
                '#DB4545',  // Rojo - Intereses  
                '#28A745'   // Verde - Aportes
            ],
            borderColor: [
                '#1B9AAA',
                '#C53030',
                '#22863A'
            ],
            borderWidth: 2,
            hoverOffset: 10
        }]
    };
    
    // Configuración de la gráfica
    const config = {
        type: 'doughnut',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: t('paymentDistribution') || 'Distribución del Total de Pagos',
                    color: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim(),
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim(),
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            return `${label}: ${formatCurrency(value)}`;
                        }
                    }
                },
                datalabels: {
                    display: true,
                    color: 'white',
                    font: {
                        weight: 'bold',
                        size: 16
                    },
                    formatter: (value, context) => {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${percentage}%`;
                    }
                }
            },
            elements: {
                arc: {
                    borderWidth: 2
                }
            }
        },
        plugins: [ChartDataLabels]
    };
    
    distributionChartInstance = new Chart(ctx, config);
}