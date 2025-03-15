document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const domainSearchInput = document.getElementById('domainSearchInput');
    const domainExtensionSelect = document.getElementById('domainExtensionSelect');
    const domainSearchForm = document.getElementById('domainSearchForm');
    const searchResults = document.getElementById('searchResults');
    
    // Add click event listeners to the domain price list items
    const domainListItems = document.querySelectorAll('ul li');
    domainListItems.forEach(item => {
        item.addEventListener('click', function() {
            // Extract the domain extension from the list item's text content
            const text = this.textContent;
            const domainExtension = text.split(' ')[0].trim();
            
            // Set the select option to the clicked domain extension
            if (domainExtensionSelect) {
                // Find the matching option
                for (let i = 0; i < domainExtensionSelect.options.length; i++) {
                    if (domainExtensionSelect.options[i].value === domainExtension) {
                        domainExtensionSelect.selectedIndex = i;
                        break;
                    }
                }
            }
            
            // Optional: Focus on the input field after selecting the domain
            if (domainSearchInput) {
                domainSearchInput.focus();
            }
        });
    });
    
    // Form submission
    if (domainSearchForm) {
        domainSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const domainName = domainSearchInput.value.trim();
            const extension = domainExtensionSelect.value;
            
            if (!domainName) {
                alert('Zəhmət olmasa domen adını daxil edin');
                return;
            }
            
            // You can redirect to a search results page or perform an AJAX request here
            console.log(`Searching for ${domainName}${extension}`);
            
            // Example: Simulate search result
            const resultContainer = document.createElement('div');
            resultContainer.className = 'mt-4 p-4 bg-white rounded-lg shadow';

            // Tek bir rastgele değer belirliyoruz
            const isAvailable = Math.random() > 0.5;
            const statusText = isAvailable ? 'Əlçatandır' : 'Artıq mövcuddur';
            const statusColor = isAvailable ? 'text-green-500' : 'text-red-500';

            resultContainer.innerHTML = `
                <div class="flex items-center justify-between">
                    <div>
                        <span class="font-bold">${domainName}${extension}</span>
                        <span class="ml-2 ${statusColor}">${statusText}</span>
                    </div>
                    <button class="px-4 py-2 bg-purple-500 text-white rounded-lg">Sifariş et</button>
                </div>
            `;

            document.body.appendChild(resultContainer);

            // Clear previous results and add new result
            searchResults.innerHTML = '';
            searchResults.appendChild(resultContainer);
        });
    }
});