const translations = {
    es: {
        title: "Calculadora de Crédito",

        // Header
        language: "Idioma",

        // Configuración del préstamo
        loanConfig: "Configuración del Crédito",
        currency: "Moneda",
        loanAmount: "Monto del Crédito",
        interestRate: "Tasa de Interés (%)",
        rateType: "Tipo de Tasa",
        ratePeriod: "Período de Tasa",
        annual: "Anual",
        monthly: "Mensual",
        term: "Plazo (meses)",
        disbursementDate: "Fecha de Desembolso",

        // Tipos de tasa
        nominal: "Nominal",
        effective: "Efectiva",

        // Tabs
        tabConfig: "Datos del Crédito",
        tabContributions: "Aportes Extra",
        tabRates: "Cambios de Tasa",

        // Opciones Avanzadas
        showAdvancedOptions: "Mostrar Opciones Avanzadas",
        hideAdvancedOptions: "Ocultar Opciones Avanzadas",

        // Manual de Usuario
        userManual: "Manual de Usuario",
        instructions: "Instrucciones de Uso",
        calculationMethod: "📋 Método de Cálculo",
        frenchMethodDesc: "Esta calculadora utiliza el método francés de amortización, que es el más común en Latinoamérica. En este método:",
        constantPayments: "Las cuotas son constantes (mismo valor todos los meses)",
        moreInterestInitially: "Al inicio se pagan más intereses y menos capital",
        moreCapitalFinally: "Al final se pagan más capital y menos intereses",
        balanceDecrease: "El saldo disminuye gradualmente hasta llegar a cero",

        basicConfig: "⚙️ 1. Configuración Básica",
        currencyDesc: "Selecciona la moneda del préstamo. Cada moneda tiene su formato específico.",
        amountDesc: "Ingresa el valor del préstamo con separadores de miles automáticos.",
        rateDesc: "Ingresa el porcentaje sin símbolo %. Acepta hasta 2 decimales.",
        rateTypeDesc: "Efectiva está seleccionada por defecto.",
        ratePeriodDesc: "Selecciona si la tasa es anual o mensual.",
        termDesc: "Número de meses del préstamo (por defecto 180 meses = 15 años).",
        disbursementDesc: "La primera cuota se paga exactamente un mes después.",

        // Aportes extraordinarios
        extraContributions: "💰 2. Aportes Extraordinarios",
        contributionType: "Tipo de Aporte",
        single: "Único",
        recurring: "Recurrente",
        amount: "Monto",
        applicationMonth: "Mes de Aplicación/Altura de cuota",
        strategy: "Estrategia",
        reduceTerm: "Reducir Plazo (mantener cuota)",
        reducePayment: "Reducir Cuota (mantener plazo)",
        addContribution: "Agregar Aporte",

        contributionsDesc: "2. Aportes Extraordinarios",
        singleDesc: "Se aplica solo en el mes especificado.",
        recurringDesc: "Se aplica desde el mes inicial hasta el final del préstamo.",
        strategiesHeader: "Estrategias:",
        reduceTermDesc: "Mantiene la cuota y reduce el tiempo de pago.",
        reducePaymentDesc: "Mantiene el plazo y reduce el valor de la cuota.",

        // Cambios de tasa
        rateChanges: "📉 3. Cambios de Tasa",
        newRate: "Nueva Tasa (%)",
        newRateType: "Tipo de Nueva Tasa",
        newRatePeriod: "Período de Nueva Tasa",
        addRateChange: "Agregar Cambio de Tasa",
        rateChangesDesc: "3. Cambios de Tasa",
        rateChangesNote: "Los cambios de tasa se aplican ÚNICAMENTE como reducción de cuota.",
        rateChangesNote2: "No afectan las estrategias de aportes previamente configuradas.",
        rateChangesNote3: "La nueva tasa recalcula solo la cuota mensual basada en el saldo restante.",

        paymentDates: "📅 4. Fechas de Pago",
        firstPaymentDesc: "El primer pago es exactamente un mes después del desembolso.",
        dateFormatDesc: "El formato de fecha se ajusta automáticamente según la moneda seleccionada.",

        // Botón calcular
        calculateAmortization: "Calcular Amortización",

        // Resultados
        financialSummary: "Resumen Financiero",
        originalAmount: "Monto Original",
        totalInterest: "Intereses Totales",
        extraPayments: "Aportes Extras",
        totalPaid: "Total Pagado",
        actualMonths: "Meses Reales",
        savedMonths: "Meses Ahorrados",

        balanceEvolution: "Evolución del Saldo",
        paymentDistribution: "Distribución de Pagos",
        amortizationTable: "Tabla de Amortización",
        exportCsv: "Exportar CSV",

        // Tabla
        month: "Mes",
        date: "Fecha",
        payment: "Cuota",
        principal: "Capital",
        interest: "Interés",
        extraContribution: "Aporte Extra",
        balance: "Saldo",

        // Paginación
        prev: "Anterior",
        next: "Siguiente",
        page: "Página",
        of: "de",

        // Monedas
        currencies: {
            COP: "Peso Colombiano (COP)",
            USD: "Dólar Estadounidense (USD)",
            EUR: "Euro (EUR)",
            MXN: "Peso Mexicano (MXN)",
            PEN: "Sol Peruano (PEN)",
            ARS: "Peso Argentino (ARS)",
            CLP: "Peso Chileno (CLP)",
            BRL: "Real Brasileño (BRL)",
            BOB: "Boliviano (BOB)",
            UYU: "Peso Uruguayo (UYU)"
        },

        // Mensajes
        noContributions: "No hay aportes extraordinarios configurados",
        noRateChanges: "No hay cambios de tasa configurados",

        // Mensajes de eliminación
        contributionRemoved: "Aporte eliminado. El cálculo se actualizará.",
        rateChangeRemoved: "Cambio de tasa eliminado. El cálculo se actualizará.",

        // Notas
        note: "Nota",
        rateChangeNote: "Los cambios de tasa afectan el valor de la cuota mensual basándose en el saldo restante, sin afectar las estrategias de aportes configuradas.",

        // Pie de página
        developedBy: "Desarrollado por Jorge López",
        viewOnGithub: "Ver en GitHub",

        // Validaciones
        validAmountRequired: "Por favor ingrese un monto válido mayor que cero",
        validRateRequired: "Debe ingresar una tasa válida (mayor o igual a 0)",
        validTermRequired: "Debe ingresar un valor entero positivo mayor que cero",
        maxAmountExceeded: "El monto máximo permitido es",
        rateOver100: "La tasa no puede ser mayor a 100%",

        // Notificaciones
        contributionAdded: "agregado correctamente.",
        rateChangeAdded: "Cambio de tasa agregado para el mes",
        amortizationCalculated: "Amortización calculada correctamente",
        calculating: "Calculando...",
        csvExported: "Archivo CSV descargado correctamente",
        browserNotSupported: "Su navegador no soporta la descarga directa de archivos"
    },

    en: {
        title: "Loan Calculator",

        // Header
        language: "Language",

        // Loan configuration
        loanConfig: "Loan Configuration",
        currency: "Currency",
        loanAmount: "Loan Amount",
        interestRate: "Interest Rate (%)",
        rateType: "Rate Type",
        ratePeriod: "Rate Period",
        annual: "Annual",
        monthly: "Monthly",
        term: "Term (months)",
        disbursementDate: "Disbursement Date",

        // Rate types
        nominal: "Nominal",
        effective: "Effective",

        // Tabs
        tabConfig: "Loan Details",
        tabContributions: "Extra Contributions",
        tabRates: "Rate Changes",

        // Advanced Options
        showAdvancedOptions: "Show Advanced Options",
        hideAdvancedOptions: "Hide Advanced Options",

        // User manual
        userManual: "User Manual",
        instructions: "Usage Instructions",
        calculationMethod: "📋 Calculation Method",
        frenchMethodDesc: "This calculator uses the French amortization method, international standard for loans. In this method:",
        constantPayments: "Payments are constant (same value every month)",
        moreInterestInitially: "More interest and less principal is paid initially",
        moreCapitalFinally: "More principal and less interest is paid at the end",
        balanceDecrease: "The balance decreases gradually until reaching zero",

        basicConfig: "1. Basic Configuration",
        currencyDesc: "Select the loan currency. Each currency has its specific format.",
        amountDesc: "Enter the loan value with automatic thousands separators.",
        rateDesc: "Enter the percentage without % symbol. Accepts up to 2 decimals.",
        rateTypeDesc: "Effective is selected by default.",
        ratePeriodDesc: "Select if the rate is annual or monthly.",
        termDesc: "Number of loan months.",
        disbursementDesc: "The first payment is exactly one month after disbursement.",

        // Extra contributions
        extraContributions: "Extra Contributions",
        contributionType: "Contribution Type",
        single: "Single",
        recurring: "Recurring",
        amount: "Amount",
        applicationMonth: "Application Month",
        strategy: "Strategy",
        reduceTerm: "Reduce Term (maintain payment)",
        reducePayment: "Reduce Payment (maintain term)",
        addContribution: "Add Contribution",

        contributionsDesc: "2. Extra Contributions",
        singleDesc: "Applied only in the specified month.",
        recurringDesc: "Applied from the initial month until the end of the loan.",
        strategiesHeader: "Strategies:",
        reduceTermDesc: "Maintains the payment and reduces the payment time.",
        reducePaymentDesc: "Maintains the term and reduces the payment value.",

        // Rate changes
        rateChanges: "Rate Changes",
        newRate: "New Rate (%)",
        newRateType: "New Rate Type",
        newRatePeriod: "New Rate Period",
        addRateChange: "Add Rate Change",
        rateChangesDesc: "3. Rate Changes",
        rateChangesNote: "Rate changes are applied ONLY as payment reduction.",
        rateChangesNote2: "They do not affect previously configured contribution strategies.",
        rateChangesNote3: "The new rate recalculates only the monthly payment based on the remaining balance.",

        paymentDates: "4. Payment Dates",
        firstPaymentDesc: "The first payment is exactly one month after disbursement.",
        dateFormatDesc: "The date format automatically adjusts according to the selected currency.",

        // Calculate button
        calculateAmortization: "Calculate Amortization",

        // Results
        financialSummary: "Financial Summary",
        originalAmount: "Original Amount",
        totalInterest: "Total Interest",
        extraPayments: "Extra Payments",
        totalPaid: "Total Paid",
        actualMonths: "Actual Months",
        savedMonths: "Saved Months",

        balanceEvolution: "Balance Evolution",
        paymentDistribution: "Payment Distribution",
        amortizationTable: "Amortization Table",
        exportCsv: "Export CSV",

        // Table
        month: "Month",
        date: "Date",
        payment: "Payment",
        principal: "Principal",
        interest: "Interest",
        extraContribution: "Extra Contribution",
        balance: "Balance",

        // Pagination
        prev: "Previous",
        next: "Next",
        page: "Page",
        of: "of",

        // Currencies
        currencies: {
            COP: "Colombian Peso (COP)",
            USD: "US Dollar (USD)",
            EUR: "Euro (EUR)",
            MXN: "Mexican Peso (MXN)",
            PEN: "Peruvian Sol (PEN)",
            ARS: "Argentine Peso (ARS)",
            CLP: "Chilean Peso (CLP)",
            BRL: "Brazilian Real (BRL)",
            BOB: "Bolivian Boliviano (BOB)",
            UYU: "Uruguayan Peso (UYU)"
        },

        // Messages
        noContributions: "No extra contributions configured",
        noRateChanges: "No rate changes configured",

        // Messages of removal
        contributionRemoved: "Contribution removed. Calculation will update.",
        rateChangeRemoved: "Rate change removed. Calculation will update.",

        // Notes
        note: "Note",
        rateChangeNote: "Rate changes affect the monthly payment value based on the remaining balance, without affecting configured contribution strategies.",

        // Pie de página
        developedBy: "Developed by Jorge López",
        viewOnGithub: "View on GitHub",

        // Validations
        validAmountRequired: "Please enter a valid amount greater than zero",
        validRateRequired: "Must enter a valid rate (greater than or equal to 0)",
        validTermRequired: "Must enter a positive integer value greater than zero",
        maxAmountExceeded: "The maximum allowed amount is",
        rateOver100: "The rate cannot be greater than 100%",

        // Notifications
        contributionAdded: "added successfully.",
        rateChangeAdded: "Rate change added for month",
        amortizationCalculated: "Amortization calculated successfully",
        calculating: "Calculating...",
        csvExported: "CSV file downloaded successfully",
        browserNotSupported: "Your browser does not support direct file downloads"
    },

    fr: {
        title: "Calculatrice de Crédit",
        language: "Langue",
        loanConfig: "Configuration du Crédit",
        currency: "Devise",
        loanAmount: "Montant du Crédit",
        interestRate: "Taux d'Intérêt (%)",
        rateType: "Type de Taux",
        ratePeriod: "Période de Taux",
        annual: "Annuel",
        monthly: "Mensuel",
        term: "Durée (mois)",
        disbursementDate: "Date de Déblocage",
        nominal: "Nominal",
        effective: "Effectif",

        // Tabs
        tabConfig: "Détails du Prêt",
        tabContributions: "Contributions Supplémentaires",
        tabRates: "Changements de Taux",

        // Options Avancées
        showAdvancedOptions: "Afficher les Options Avancées",
        hideAdvancedOptions: "Masquer les Options Avancées",

        userManual: "Manuel d'Utilisation",
        instructions: "Instructions d'Utilisation",
        calculationMethod: "📋 Méthode de Calcul",
        frenchMethodDesc: "Cette calculatrice utilise la méthode française d'amortissement, standard international. Dans cette méthode:",
        constantPayments: "Les paiements sont constants (même valeur chaque mois)",
        moreInterestInitially: "Plus d'intérêts et moins de capital sont payés initialement",
        moreCapitalFinally: "Plus de capital et moins d'intérêts sont payés à la fin",
        balanceDecrease: "Le solde diminue progressivement jusqu'à atteindre zéro",

        basicConfig: "1. Configuration de Base",
        extraContributions: "Contributions Extraordinaires",
        contributionType: "Type de Contribution",
        single: "Unique",
        recurring: "Récurrent",
        amount: "Montant",
        applicationMonth: "Mois d'Application",
        strategy: "Stratégie",
        reduceTerm: "Réduire la Durée (maintenir le paiement)",
        reducePayment: "Réduire le Paiement (maintenir la durée)",
        addContribution: "Ajouter une Contribution",

        rateChanges: "Changements de Taux",
        newRate: "Nouveau Taux (%)",
        newRateType: "Type de Nouveau Taux",
        newRatePeriod: "Période de Nouveau Taux",
        addRateChange: "Ajouter un Changement de Taux",

        calculateAmortization: "Calculer l'Amortissement",

        financialSummary: "Résumé Financier",
        originalAmount: "Montant Original",
        totalInterest: "Intérêts Totaux",
        extraPayments: "Paiements Supplémentaires",
        totalPaid: "Total Payé",
        actualMonths: "Mois Réels",
        savedMonths: "Mois Économisés",

        balanceEvolution: "Évolution du Solde",
        paymentDistribution: "Distribution des Paiements",
        amortizationTable: "Tableau d'Amortissement",
        exportCsv: "Exporter CSV",

        month: "Mois",
        date: "Date",
        payment: "Paiement",
        principal: "Capital",
        interest: "Intérêt",
        extraContribution: "Contribution Supplémentaire",
        balance: "Solde",

        // Pagination
        prev: "Précédent",
        next: "Suivant",
        page: "Page",
        of: "sur",

        currencies: {
            COP: "Peso Colombien (COP)",
            USD: "Dollar Américain (USD)",
            EUR: "Euro (EUR)",
            MXN: "Peso Mexicain (MXN)",
            PEN: "Sol Péruvien (PEN)",
            ARS: "Peso Argentin (ARS)",
            CLP: "Peso Chilien (CLP)",
            BRL: "Réal Brésilien (BRL)",
            BOB: "Bolivian Bolivien (BOB)",
            UYU: "Peso Uruguayen (UYU)"
        },

        noContributions: "Aucune contribution supplémentaire configurée",
        noRateChanges: "Aucun changement de taux configuré",
        contributionAdded: "ajouté avec succès.",
        rateChangeAdded: "Changement de taux ajouté pour le mois",
        amortizationCalculated: "Amortissement calculé avec succès",
        calculating: "Calcul...",
        csvExported: "Fichier CSV téléchargé avec succès",

        // Messages de suppression
        contributionRemoved: "Contribution supprimée.",
        rateChangeRemoved: "Changement de taux supprimé.",

        // Notes
        note: "Note",
        rateChangeNote: "Les changements de taux affectent la valeur du paiement mensuel basé sur le solde restant, sans affecter les stratégies de contribution configurées.",

        // Pie de página
        developedBy: "Développé par Jorge López",
        viewOnGithub: "Voir sur GitHub"
    },

    de: {
        title: "Kreditrechner",
        language: "Sprache",
        loanConfig: "Kreditkonfiguration",
        currency: "Währung",
        loanAmount: "Kreditbetrag",
        interestRate: "Zinssatz (%)",
        rateType: "Zinstyp",
        ratePeriod: "Zinsperiode",
        annual: "Jährlich",
        monthly: "Monatlich",
        term: "Laufzeit (Monate)",
        disbursementDate: "Auszahlungsdatum",
        nominal: "Nominal",
        effective: "Effektiv",

        // Tabs
        tabConfig: "Kreditdetails",
        tabContributions: "Sonderzahlungen",
        tabRates: "Zinsänderungen",

        // Erweiterte Optionen
        showAdvancedOptions: "Erweiterte Optionen anzeigen",
        hideAdvancedOptions: "Erweiterte Optionen ausblenden",

        userManual: "Benutzerhandbuch",
        instructions: "Gebrauchsanweisung",
        calculationMethod: "📋 Berechnungsmethode",
        frenchMethodDesc: "Dieser Rechner verwendet die französische Tilgungsmethode. Bei dieser Methode:",
        constantPayments: "Die Zahlungen sind konstant (gleicher Wert jeden Monat)",
        moreInterestInitially: "Anfangs werden mehr Zinsen und weniger Kapital gezahlt",
        moreCapitalFinally: "Am Ende werden mehr Kapital und weniger Zinsen gezahlt",
        balanceDecrease: "Der Saldo verringert sich allmählich bis auf null",

        basicConfig: "1. Grundkonfiguration",
        extraContributions: "Sonderzahlungen",
        contributionType: "Art der Sonderzahlung",
        single: "Einmalig",
        recurring: "Wiederkehrend",
        amount: "Betrag",
        applicationMonth: "Anwendungsmonat",
        strategy: "Strategie",
        reduceTerm: "Laufzeit reduzieren (Rate beibehalten)",
        reducePayment: "Rate reduzieren (Laufzeit beibehalten)",
        addContribution: "Sonderzahlung hinzufügen",

        rateChanges: "Zinsänderungen",
        newRate: "Neuer Zinssatz (%)",
        newRateType: "Neuer Zinstyp",
        newRatePeriod: "Neue Zinsperiode",
        addRateChange: "Zinsänderung hinzufügen",

        calculateAmortization: "Tilgung berechnen",

        financialSummary: "Finanzübersicht",
        originalAmount: "Ursprünglicher Betrag",
        totalInterest: "Gesamtzinsen",
        extraPayments: "Sonderzahlungen",
        totalPaid: "Insgesamt gezahlt",
        actualMonths: "Tatsächliche Monate",
        savedMonths: "Gesparte Monate",

        balanceEvolution: "Saldoentwicklung",
        paymentDistribution: "Zahlungsverteilung",
        amortizationTable: "Tilgungstabelle",
        exportCsv: "CSV exportieren",

        month: "Monat",
        date: "Datum",
        payment: "Zahlung",
        principal: "Kapital",
        interest: "Zinsen",
        extraContribution: "Sonderzahlung",
        balance: "Saldo",

        // Pagination
        prev: "Zurück",
        next: "Weiter",
        page: "Seite",
        of: "von",

        currencies: {
            COP: "Kolumbianischer Peso (COP)",
            USD: "US-Dollar (USD)",
            EUR: "Euro (EUR)",
            MXN: "Mexikanischer Peso (MXN)",
            PEN: "Peruanischer Sol (PEN)",
            ARS: "Argentinischer Peso (ARS)",
            CLP: "Chilenischer Peso (CLP)",
            BRL: "Brasilianischer Real (BRL)",
            BOB: "Bolivianischer Boliviano (BOB)",
            UYU: "Uruguayischer Peso (UYU)"
        },

        noContributions: "Keine Sonderzahlungen konfiguriert",
        noRateChanges: "Keine Zinsänderungen konfiguriert",
        contributionAdded: "erfolgreich hinzugefügt.",
        rateChangeAdded: "Zinsänderung für Monat hinzugefügt",
        amortizationCalculated: "Tilgung erfolgreich berechnet",
        calculating: "Berechnung...",
        csvExported: "CSV-Datei erfolgreich heruntergeladen",

        // Löschungsnachrichten
        contributionRemoved: "Sonderzahlung entfernt.",
        rateChangeRemoved: "Zinsänderung entfernt.",

        // Notizen
        note: "Hinweis",
        rateChangeNote: "Zinsänderungen beeinflussen den monatlichen Zahlungsbetrag basierend auf dem verbleibenden Saldo, ohne die konfigurierten Beitragsstrategien zu beeinflussen.",

        // Pie de página
        developedBy: "Entwickelt von Jorge López",
        viewOnGithub: "Auf GitHub anzeigen"
    },

    pt: {
        title: "Calculadora de Crédito",
        language: "Idioma",
        loanConfig: "Configuração do Crédito",
        currency: "Moeda",
        loanAmount: "Valor do Crédito",
        interestRate: "Taxa de Juros (%)",
        rateType: "Tipo de Taxa",
        ratePeriod: "Período da Taxa",
        annual: "Anual",
        monthly: "Mensal",
        term: "Prazo (meses)",
        disbursementDate: "Data de Desembolso",
        nominal: "Nominal",
        effective: "Efetiva",

        // Tabs
        tabConfig: "Dados do Crédito",
        tabContributions: "Aportes Extras",
        tabRates: "Mudanças de Taxa",

        // Opções Avançadas
        showAdvancedOptions: "Mostrar Opções Avançadas",
        hideAdvancedOptions: "Ocultar Opções Avançadas",

        userManual: "Manual do Usuário",
        instructions: "Instruções de Uso",
        calculationMethod: "📋 Método de Cálculo",
        frenchMethodDesc: "Esta calculadora usa o método francês de amortização, padrão internacional. Neste método:",
        constantPayments: "As parcelas são constantes (mesmo valor todos os meses)",
        moreInterestInitially: "No início pagam-se mais juros e menos capital",
        moreCapitalFinally: "No final pagam-se mais capital e menos juros",
        balanceDecrease: "O saldo diminui gradualmente até chegar a zero",

        basicConfig: "1. Configuração Básica",
        extraContributions: "Aportes Extraordinários",
        contributionType: "Tipo de Aporte",
        single: "Único",
        recurring: "Recorrente",
        amount: "Valor",
        applicationMonth: "Mês de Aplicação",
        strategy: "Estratégia",
        reduceTerm: "Reduzir Prazo (manter parcela)",
        reducePayment: "Reduzir Parcela (manter prazo)",
        addContribution: "Adicionar Aporte",

        rateChanges: "Mudanças de Taxa",
        newRate: "Nova Taxa (%)",
        newRateType: "Tipo da Nova Taxa",
        newRatePeriod: "Período da Nova Taxa",
        addRateChange: "Adicionar Mudança de Taxa",

        calculateAmortization: "Calcular Amortização",

        financialSummary: "Resumo Financeiro",
        originalAmount: "Valor Original",
        totalInterest: "Juros Totais",
        extraPayments: "Aportes Extras",
        totalPaid: "Total Pago",
        actualMonths: "Meses Reais",
        savedMonths: "Meses Economizados",

        balanceEvolution: "Evolução do Saldo",
        paymentDistribution: "Distribuição de Pagamentos",
        amortizationTable: "Tabela de Amortização",
        exportCsv: "Exportar CSV",

        month: "Mês",
        date: "Data",
        payment: "Parcela",
        principal: "Capital",
        interest: "Juros",
        extraContribution: "Aporte Extra",
        balance: "Saldo",

        // Paginação
        prev: "Anterior",
        next: "Próximo",
        page: "Página",
        of: "de",

        currencies: {
            COP: "Peso Colombiano (COP)",
            USD: "Dólar Americano (USD)",
            EUR: "Euro (EUR)",
            MXN: "Peso Mexicano (MXN)",
            PEN: "Sol Peruano (PEN)",
            ARS: "Peso Argentino (ARS)",
            CLP: "Peso Chileno (CLP)",
            BRL: "Real Brasileiro (BRL)",
            BOB: "Boliviano (BOB)",
            UYU: "Peso Uruguaio (UYU)"
        },

        noContributions: "Nenhum aporte extraordinário configurado",
        noRateChanges: "Nenhuma mudança de taxa configurada",
        contributionAdded: "adicionado com sucesso.",
        rateChangeAdded: "Mudança de taxa adicionada para o mês",
        amortizationCalculated: "Amortização calculada com sucesso",
        calculating: "Calculando...",
        csvExported: "Arquivo CSV baixado com sucesso",

        // Mensagens de remoção
        contributionRemoved: "Aporte removido.",
        rateChangeRemoved: "Mudança de taxa removida.",

        // Notas
        note: "Nota",
        rateChangeNote: "As mudanças de taxa afetam o valor do pagamento mensal baseado no saldo restante, sem afetar as estratégias de contribuição configuradas.",

        // Pie de página
        developedBy: "Desenvolvido por Jorge López",
        viewOnGithub: "Ver no GitHub"
    }
};

// Variable global para el idioma actual
let currentLanguage = 'es';

// Función para obtener traducción
function t(key) {
    const keys = key.split('.');
    let value = translations[currentLanguage];

    for (const k of keys) {
        if (value && typeof value === 'object') {
            value = value[k];
        } else {
            return key; // Retorna la clave si no encuentra la traducción
        }
    }

    return value || key;
}

// Función para cambiar idioma
function changeLanguage(language) {
    if (translations[language]) {
        currentLanguage = language;
        localStorage.setItem('preferred-language', language);
        updateAllTexts();

        // Actualizar gráficas si existen
        if (chartInstance) {
            chartInstance.destroy();
        }
        if (distributionChartInstance) {
            distributionChartInstance.destroy();
        }

        // Re-renderizar si hay resultados
        const results = document.getElementById('results');
        if (!results.classList.contains('hidden')) {
            // Trigger recalculation to update chart labels
            const event = new Event('click');
            document.getElementById('calculateAmortization').dispatchEvent(event);
        }
    }
}

// Función para actualizar todos los textos
function updateAllTexts() {
    // Actualizar título
    document.title = t('title');
    document.querySelector('h1').textContent = t('title');

    // Actualizar todos los elementos con data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');

        if (element.tagName === 'OPTION') {
            element.textContent = t(key);
        } else if (element.placeholder !== undefined) {
            element.placeholder = t(key);
        } else {
            element.textContent = t(key);
        }
    });

    // Actualizar opciones de moneda
    updateCurrencyOptions();

    // Actualizar opciones de tipo de tasa con traducciones
    if (typeof updateRateTypeOptions === 'function') {
        updateRateTypeOptions();
    }
    if (typeof updateNewRateTypeOptions === 'function') {
        updateNewRateTypeOptions();
    }

    // Re-renderizar listas si existen
    if (typeof renderContributions === 'function') {
        renderContributions();
    }
    if (typeof renderRateChanges === 'function') {
        renderRateChanges();
    }
}

// Función para actualizar opciones de moneda
function updateCurrencyOptions() {
    const currencySelect = document.getElementById('currency');
    const currentValue = currencySelect.value;

    currencySelect.innerHTML = '';
    Object.keys(currencies).forEach(code => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = t(`currencies.${code}`);
        currencySelect.appendChild(option);
    });

    currencySelect.value = currentValue;
}