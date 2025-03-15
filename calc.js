// Configuration data for all services
const serviceData = {
    webTypes: [
        { id: 'blog', name: 'Bloq', price: 50 },
        { id: 'responsive', name: 'Responsive', price: 100 },
        { id: 'messaging', name: 'Mesajlaşma', price: 80 },
        { id: 'gallery', name: 'Qalereya', price: 70 },
        { id: 'user-profiles', name: 'Üzv girişi / Profillər', price: 120 },
        { id: 'forum', name: 'Forum', price: 150 },
        { id: 'chat', name: 'Canlı Söhbət', price: 180 },
        { id: 'contact-form', name: 'Əlaqə Forması', price: 50 }
    ],
    seoOptions: [
        { id: 'basic-meta', name: 'Başlıqlar & Meta', price: 80 },
        { id: 'xml-delivery', name: '+20 Qabaqcıl Texnika', price: 120 },
        { id: 'sitemap', name: 'Sitemap', price: 50 },
        { id: 'keywords', name: 'Açar söz', price: 75 },
        { id: 'header-tags', name: 'Başlıq Teqləri', price: 60 }
    ],
    ecommerceOptions: [
        { id: 'payment', name: 'Ödəniş', price: 150 },
        { id: 'products', name: 'Məhsullar', price: 200 },
        { id: 'filter', name: 'Filtr', price: 100 },
        { id: 'basket', name: 'Səbət', price: 120 },
        { id: 'favorites', name: 'Bəyəndiklərim', price: 80 },
        { id: 'product-details', name: 'Məhsul Haqqında', price: 90 }
    ]
};

// State object to track all selected options and prices
const calculatorState = {
    pages: {
        count: 1,
        price: 100,
        designComplexity: 1
    },
    webTypes: {
        selected: [],
        total: 0
    },
    seoOptions: {
        selected: [],
        total: 0
    },
    ecommerceOptions: {
        selected: [],
        total: 0
    },
    logoDesign: {
        intensity: 0,
        price: 0
    },
    get subtotal() {
        return this.pages.price + 
               this.webTypes.total + 
               this.seoOptions.total + 
               this.ecommerceOptions.total + 
               this.logoDesign.price;
    },
    get total() {
        // Ensure minimum price is 450
        return Math.max(this.subtotal, 450);
    }
};

// DOM Elements
const elements = {
    // Page slider elements
    pageSlider: document.getElementById('pageSlider'),
    pageSliderProgress: document.getElementById('pageSliderProgress'),
    pageCount: document.getElementById('pageCount'),
    pagePrice: document.getElementById('pagePrice'),
    
    // Design complexity slider
    designComplexitySlider: document.getElementById('designComplexitySlider'),
    designComplexityProgress: document.getElementById('designComplexityProgress'),
    
    // Service option containers
    webTypeOptions: document.getElementById('webTypeOptions'),
    seoOptions: document.getElementById('seoOptions'),
    ecommerceOptions: document.getElementById('ecommerceOptions'),
    
    // Logo slider elements
    logoSlider: document.getElementById('logoSlider'),
    logoSliderProgress: document.getElementById('logoSliderProgress'),
    logoTotal: document.getElementById('logoTotal'),
    
    // Service totals
    webTypeTotal: document.getElementById('webTypeTotal'),
    seoTotal: document.getElementById('seoTotal'),
    ecommerceTotal: document.getElementById('ecommerceTotal'),
    
    // Summary elements
    summaryPages: document.getElementById('summaryPages'),
    summaryFunctions: document.getElementById('summaryFunctions'),
    summarySEO: document.getElementById('summarySEO'),
    summaryLogo: document.getElementById('summaryLogo'),
    summaryEcommerce: document.getElementById('summaryEcommerce'),
    minimumPrice: document.getElementById('minimumPrice'),
    totalPrice: document.getElementById('totalPrice')
};

// Initialize the calculator
function initializeCalculator() {
    // Initialize page count slider
    initPageSlider();
    
    // Initialize design complexity slider
    initDesignComplexitySlider();
    
    // Generate service options from data
    generateServiceOptions();
    
    // Initialize logo design slider
    initLogoSlider();
    
    // Set minimum price
    elements.minimumPrice.textContent = '450';
    
    // Update the initial total
    updateTotals();
}

// Initialize the page count slider
function initPageSlider() {
    elements.pageSlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        const percentage = ((value - 1) / (this.max - 1)) * 100;
        
        // Update slider progress
        elements.pageSliderProgress.style.width = `${percentage}%`;
        
        // Update page count display
        elements.pageCount.textContent = value;
        
        // Calculate page price (base 100 + 50 per additional page)
        const pagePrice = 100 + (value - 1) * 50;
        elements.pagePrice.textContent = pagePrice;
        
        // Update state
        calculatorState.pages.count = value;
        calculatorState.pages.price = pagePrice;
        
        // Update totals
        updateTotals();
    });
}

// Initialize the design complexity slider
function initDesignComplexitySlider() {
    elements.designComplexitySlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        const percentage = ((value - 1) / (this.max - 1)) * 100;
        
        // Update slider progress
        elements.designComplexityProgress.style.width = `${percentage}%`;
        
        // Update state
        calculatorState.pages.designComplexity = value;
        
        // Update totals (design complexity affects page price)
        calculatorState.pages.price = calculatePagePrice();
        elements.pagePrice.textContent = calculatorState.pages.price;
        updateTotals();
    });
}

// Calculate page price based on count and complexity
function calculatePagePrice() {
    const basePrice = 100 + (calculatorState.pages.count - 1) * 50;
    const complexityMultiplier = [1, 1.2, 1.5][calculatorState.pages.designComplexity - 1];
    return Math.round(basePrice * complexityMultiplier);
}

// Initialize the logo design slider
function initLogoSlider() {
    elements.logoSlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        const percentage = value;
        
        // Update slider progress
        elements.logoSliderProgress.style.width = `${percentage}%`;
        
        // Calculate logo price (0-500 based on slider position)
        const logoPrice = Math.round(value * 3);
        elements.logoTotal.textContent = logoPrice;
        
        // Update state
        calculatorState.logoDesign.intensity = value;
        calculatorState.logoDesign.price = logoPrice;
        
        // Update totals
        updateTotals();
    });
}

// Generate all service options from data
function generateServiceOptions() {
    // Generate web type toggle options
    serviceData.webTypes.forEach(option => {
        const toggleElement = createToggleOption(option, 'webTypes');
        elements.webTypeOptions.appendChild(toggleElement);
    });
    
    // Generate SEO checkbox options
    serviceData.seoOptions.forEach(option => {
        const checkboxElement = createCheckboxOption(option);
        elements.seoOptions.appendChild(checkboxElement);
    });
    
    // Generate e-commerce toggle options
    serviceData.ecommerceOptions.forEach(option => {
        const toggleElement = createToggleOption(option, 'ecommerceOptions');
        elements.ecommerceOptions.appendChild(toggleElement);
    });
}

// Create a toggle option element - FIXED VERSION
function createToggleOption(option, category) {
    const container = document.createElement('div');
    container.className = 'flex items-center justify-between py-2';
    
    const label = document.createElement('label');
    label.className = 'text-gray-700';
    label.textContent = option.name;
    
    const toggleWrapper = document.createElement('label');
    toggleWrapper.className = 'relative inline-block w-12 h-6';
    toggleWrapper.htmlFor = option.id;
    
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'opacity-0 w-0 h-0';
    input.id = option.id;
    input.dataset.price = option.price;
    input.dataset.category = category;
    
    const slider = document.createElement('span');
    slider.className = 'absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-all duration-300';
    
    // Add event listener to toggle
    input.addEventListener('change', function() {
        if (this.checked) {
            slider.classList.remove('bg-gray-300');
            slider.classList.add('bg-purple-500');
            
            // Add to selected options
            if (category === 'ecommerceOptions') {
                calculatorState.ecommerceOptions.selected.push(option);
            } else {
                calculatorState.webTypes.selected.push(option);
            }
        } else {
            slider.classList.add('bg-gray-300');
            slider.classList.remove('bg-purple-500');
            
            // Remove from selected options
            if (category === 'ecommerceOptions') {
                calculatorState.ecommerceOptions.selected = calculatorState.ecommerceOptions.selected.filter(
                    item => item.id !== option.id
                );
            } else {
                calculatorState.webTypes.selected = calculatorState.webTypes.selected.filter(
                    item => item.id !== option.id
                );
            }
        }
        
        // Update totals
        updateTotals();
    });
    
    // Add the slider button (circle that moves)
    const sliderButton = document.createElement('span');
    sliderButton.className = 'absolute left-1 bottom-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300';
    
    // Style the slider button when checked
    input.addEventListener('change', function() {
        if (this.checked) {
            sliderButton.style.transform = 'translateX(100%)';
        } else {
            sliderButton.style.transform = 'translateX(0)';
        }
    });
    
    slider.appendChild(sliderButton);
    toggleWrapper.appendChild(input);
    toggleWrapper.appendChild(slider);
    
    container.appendChild(label);
    container.appendChild(toggleWrapper);
    
    return container;
}

// Create a checkbox option element
function createCheckboxOption(option) {
    const container = document.createElement('div');
    container.className = 'flex items-start space-x-2';
    
    const checkboxWrapper = document.createElement('div');
    checkboxWrapper.className = 'pt-1';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = option.id;
    checkbox.className = 'h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500';
    checkbox.dataset.price = option.price;
    
    // Add event listener to checkbox
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            // Add to selected options
            calculatorState.seoOptions.selected.push(option);
        } else {
            // Remove from selected options
            calculatorState.seoOptions.selected = calculatorState.seoOptions.selected.filter(
                item => item.id !== option.id
            );
        }
        
        // Update totals
        updateTotals();
    });
    
    const label = document.createElement('label');
    label.htmlFor = option.id;
    label.className = 'text-gray-700';
    label.textContent = option.name;
    
    checkboxWrapper.appendChild(checkbox);
    container.appendChild(checkboxWrapper);
    container.appendChild(label);
    
    return container;
}

// Update all price totals
function updateTotals() {
    // Calculate section totals
    calculatorState.webTypes.total = calculatorState.webTypes.selected.reduce(
        (sum, option) => sum + option.price, 0
    );
    
    calculatorState.seoOptions.total = calculatorState.seoOptions.selected.reduce(
        (sum, option) => sum + option.price, 0
    );
    
    calculatorState.ecommerceOptions.total = calculatorState.ecommerceOptions.selected.reduce(
        (sum, option) => sum + option.price, 0
    );
    
    // Update section total displays
    elements.webTypeTotal.textContent = calculatorState.webTypes.total;
    elements.seoTotal.textContent = calculatorState.seoOptions.total;
    elements.ecommerceTotal.textContent = calculatorState.ecommerceOptions.total;
    
    // Update summary displays
    elements.summaryPages.textContent = calculatorState.pages.price;
    elements.summaryFunctions.textContent = calculatorState.webTypes.total;
    elements.summarySEO.textContent = calculatorState.seoOptions.total;
    elements.summaryLogo.textContent = calculatorState.logoDesign.price;
    elements.summaryEcommerce.textContent = calculatorState.ecommerceOptions.total;
    
    // Calculate and update total price (with minimum price enforced)
    const total = calculatorState.total;
    elements.totalPrice.textContent = total;
}

// Initialize the calculator when the page loads
document.addEventListener('DOMContentLoaded', initializeCalculator);