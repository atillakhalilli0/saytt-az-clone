document.addEventListener('DOMContentLoaded', function() {
    const monthlyTab = document.getElementById('monthlyTab');
    const yearlyTab = document.getElementById('yearlyTab');
    const priceElements = document.querySelectorAll('.text-3xl.font-bold');
    const periodTexts = document.querySelectorAll('.period-text');
    
    // Store original monthly prices
    const monthlyPrices = Array.from(priceElements).map(el => {
        // Extract the numeric value from the price text (removing the currency symbol)
        return parseFloat(el.textContent.replace('₼', ''));
    });
    
    // Tab click handlers
    monthlyTab.addEventListener('click', function() {
        // Update UI for selected tab
        monthlyTab.classList.add('bg-purple-500', 'text-white');
        monthlyTab.classList.remove('text-gray-500');
        yearlyTab.classList.remove('bg-purple-500', 'text-white');
        yearlyTab.classList.add('text-gray-500');
        
        // Update prices to monthly values
        priceElements.forEach((el, index) => {
            el.textContent = `₼${monthlyPrices[index]}`;
        });
        
        // Update period text
        periodTexts.forEach(el => {
            el.textContent = '/ay';
        });
    });
    
    yearlyTab.addEventListener('click', function() {
        // Update UI for selected tab
        yearlyTab.classList.add('bg-purple-500', 'text-white');
        yearlyTab.classList.remove('text-gray-500');
        monthlyTab.classList.remove('bg-purple-500', 'text-white');
        monthlyTab.classList.add('text-gray-500');
        
        // Update prices to yearly values (monthly * 12)
        priceElements.forEach((el, index) => {
            const yearlyPrice = monthlyPrices[index] * 12;
            el.textContent = `₼${yearlyPrice}`;
        });
        
        // Update period text
        periodTexts.forEach(el => {
            el.textContent = '/il';
        });
    });
});