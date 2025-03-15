const sites = [
    {
        url: "https://api.websiteca.com/storage/wKyykqEbaB5lQ5Q4bq6r5KcpP91bZytQXDtBopDY.png",
        title: "biophysics.az"
    },
    {
        url: "https://api.websiteca.com/storage/wKyykqEbaB5lQ5Q4bq6r5KcpP91bZytQXDtBopDY.png",
        title: "ureb.com"
    },
    {
        url: "https://api.websiteca.com/storage/wKyykqEbaB5lQ5Q4bq6r5KcpP91bZytQXDtBopDY.png",
        title: "ug.news"
    },
    {
        url: "https://api.websiteca.com/storage/wKyykqEbaB5lQ5Q4bq6r5KcpP91bZytQXDtBopDY.png",
        title: "football.biz"
    },
    {
        url: "https://api.websiteca.com/storage/wKyykqEbaB5lQ5Q4bq6r5KcpP91bZytQXDtBopDY.png",
        title: "wisher.az"
    },
    {
        url: "https://api.websiteca.com/storage/wKyykqEbaB5lQ5Q4bq6r5KcpP91bZytQXDtBopDY.png",
        title: "imexcommodites.com"
    },
    {
        url: "https://api.websiteca.com/storage/wKyykqEbaB5lQ5Q4bq6r5KcpP91bZytQXDtBopDY.png",
        title: "azfennttq.az"
    },
    {
        url: "https://api.websiteca.com/storage/wKyykqEbaB5lQ5Q4bq6r5KcpP91bZytQXDtBopDY.png",
        title: "notehub.az"
    },
    {
        url: "https://api.websiteca.com/storage/wKyykqEbaB5lQ5Q4bq6r5KcpP91bZytQXDtBopDY.png",
        title: "azeholidays.az"
    },
    {
        url: "https://api.websiteca.com/storage/wKyykqEbaB5lQ5Q4bq6r5KcpP91bZytQXDtBopDY.png",
        title: "vipconsulting.az"
    }
    // ...more data 
]

document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const itemsPerPage = 6;
    let currentPage = 1;
    
    // DOM Elements
    const websitesContainer = document.getElementById('websites-container');
    const paginationContainer = document.getElementById('pagination-numbers');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    
    // Calculate total pages
    const totalPages = Math.ceil(sites.length / itemsPerPage);
    
    // Initialize
    displayWebsites(currentPage);
    setupPagination();
    updatePaginationButtons();
    
    // Event listeners for pagination
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        displayWebsites(currentPage);
        updatePaginationButtons();
      }
    });
    
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        displayWebsites(currentPage);
        updatePaginationButtons();
      }
    });
    
    // Function to display websites for the current page
    function displayWebsites(page) {
      // Clear current websites
      websitesContainer.innerHTML = '';
      
      // Calculate start and end indices
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, sites.length);
      
      // Create and append website cards
      for (let i = startIndex; i < endIndex; i++) {
        const site = sites[i];
        
        // Create website card
        const card = document.createElement('div');
        card.className = 'bg-purple-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 p-4';
        
        // Create card content
        card.innerHTML = `
          <div class="aspect-video w-full overflow-hidden rounded-xl mb-4">
            <img src="${site.url}" alt="${site.title}" class="w-full h-full object-cover">
          </div>
          <h3 class="text-center text-purple-800 uppercase font-medium">${site.title}</h3>
        `;
        
        websitesContainer.appendChild(card);
      }
    }
    
    // Function to setup pagination numbers
    function setupPagination() {
      paginationContainer.innerHTML = '';
      
      for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.className = 'px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50';
        pageButton.textContent = i;
        
        // Add active state for current page
        if (i === currentPage) {
          pageButton.classList.remove('bg-white', 'text-gray-700');
          pageButton.classList.add('bg-purple-600', 'text-white');
        }
        
        pageButton.addEventListener('click', () => {
          currentPage = i;
          displayWebsites(currentPage);
          updatePaginationButtons();
        });
        
        paginationContainer.appendChild(pageButton);
      }
    }
    
    // Function to update pagination button states
    function updatePaginationButtons() {
      // Update pagination numbers
      const pageButtons = paginationContainer.getElementsByTagName('button');
      for (let i = 0; i < pageButtons.length; i++) {
        if (i + 1 === currentPage) {
          pageButtons[i].classList.remove('bg-white', 'text-gray-700');
          pageButtons[i].classList.add('bg-purple-600', 'text-white');
        } else {
          pageButtons[i].classList.remove('bg-purple-600', 'text-white');
          pageButtons[i].classList.add('bg-white', 'text-gray-700');
        }
      }
      
      // Update prev/next buttons
      prevButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage === totalPages;
      
      // Visual indication of disabled state
      if (prevButton.disabled) {
        prevButton.classList.add('opacity-50', 'cursor-not-allowed');
      } else {
        prevButton.classList.remove('opacity-50', 'cursor-not-allowed');
      }
      
      if (nextButton.disabled) {
        nextButton.classList.add('opacity-50', 'cursor-not-allowed');
      } else {
        nextButton.classList.remove('opacity-50', 'cursor-not-allowed');
      }
    }
  });