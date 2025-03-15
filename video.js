document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const wrapper = document.getElementById('customSwiperWrapper');
    const slides = document.querySelectorAll('.custom-swiper-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const paginationContainer = document.getElementById('paginationDots');
    
    // Variables
    let currentIndex = 0;
    let slidesPerView = getSlidesPerView();
    let touchStartX = 0;
    let touchEndX = 0;
    let transformValue = 0;
    let autoplayInterval;
    
    // Initialize
    initSlider();
    
    // Responsive Behavior
    window.addEventListener('resize', handleResize);
    
    function initSlider() {
      // Set initial position
      updateSlidePosition();
      
      // Generate pagination dots
      createPaginationDots();
      
      // Set active dot
      updateActiveDot();
      
      // Event listeners
      prevBtn.addEventListener('click', goToPrevSlide);
      nextBtn.addEventListener('click', goToNextSlide);
      
      // Touch events for mobile
      wrapper.addEventListener('touchstart', handleTouchStart, false);
      wrapper.addEventListener('touchmove', handleTouchMove, false);
      wrapper.addEventListener('touchend', handleTouchEnd, false);
      
      // Start autoplay
      startAutoplay();
    }
    
    function getSlidesPerView() {
      if (window.innerWidth >= 1024) {
        return 3; // Large screens
      } else if (window.innerWidth >= 768) {
        return 2; // Medium screens
      } else {
        return 1; // Small screens
      }
    }
    
    function getMaxIndex() {
      return Math.max(0, slides.length - slidesPerView);
    }
    
    function updateSlidePosition() {
      const slideWidth = 100 / slidesPerView;
      
      // Set slide widths
      slides.forEach(slide => {
        slide.style.width = `${slideWidth}%`;
      });
      
      // Calculate transform value
      transformValue = -currentIndex * (100 / slidesPerView);
      
      // Apply transform
      wrapper.style.transform = `translateX(${transformValue}%)`;
    }
    
    function handleResize() {
      const newSlidesPerView = getSlidesPerView();
      
      if (newSlidesPerView !== slidesPerView) {
        slidesPerView = newSlidesPerView;
        // If the current index is now out of bounds, adjust it
        currentIndex = Math.min(currentIndex, getMaxIndex());
        updateSlidePosition();
        createPaginationDots(); // Recreate pagination dots
        updateActiveDot();
      }
    }
    
    function goToPrevSlide() {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlidePosition();
        updateActiveDot();
      } else {
        // Optional: loop back to end
        currentIndex = getMaxIndex();
        updateSlidePosition();
        updateActiveDot();
      }
    }
    
    function goToNextSlide() {
      if (currentIndex < getMaxIndex()) {
        currentIndex++;
        updateSlidePosition();
        updateActiveDot();
      } else {
        // Optional: loop back to beginning
        currentIndex = 0;
        updateSlidePosition();
        updateActiveDot();
      }
    }
    
    function createPaginationDots() {
      // Clear existing dots
      paginationContainer.innerHTML = '';
      
      // Calculate number of pages
      const numPages = Math.ceil(slides.length / slidesPerView);
      
      // Create dots
      for (let i = 0; i < numPages; i++) {
        const dot = document.createElement('button');
        dot.classList.add('h-3', 'w-3', 'rounded-full', 'bg-purple-300');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        
        // Add click event
        dot.addEventListener('click', () => {
          currentIndex = i * slidesPerView;
          currentIndex = Math.min(currentIndex, getMaxIndex());
          updateSlidePosition();
          updateActiveDot();
        });
        
        paginationContainer.appendChild(dot);
      }
    }
    
    function updateActiveDot() {
      const dots = paginationContainer.querySelectorAll('button');
      const activeDotIndex = Math.floor(currentIndex / slidesPerView);
      
      dots.forEach((dot, index) => {
        if (index === activeDotIndex) {
          dot.classList.remove('bg-purple-300');
          dot.classList.add('bg-purple-800');
        } else {
          dot.classList.remove('bg-purple-800');
          dot.classList.add('bg-purple-300');
        }
      });
    }
    
    function handleTouchStart(e) {
      touchStartX = e.touches[0].clientX;
      stopAutoplay();
    }
    
    function handleTouchMove(e) {
      touchEndX = e.touches[0].clientX;
    }
    
    function handleTouchEnd() {
      const swipeDistance = touchEndX - touchStartX;
      const threshold = 50; // Minimum swipe distance
      
      if (swipeDistance > threshold) {
        goToPrevSlide();
      } else if (swipeDistance < -threshold) {
        goToNextSlide();
      }
      
      startAutoplay();
    }
    
    function startAutoplay() {
      // Clear any existing interval
      stopAutoplay();
      
      // Set new interval
      autoplayInterval = setInterval(() => {
        goToNextSlide();
      }, 5000);
    }
    
    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    }
  });