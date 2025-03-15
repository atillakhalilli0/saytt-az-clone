document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('testimonials-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const paginationDots = document.querySelectorAll('.pagination-dot');
    
    let currentIndex = 0;
    let startX;
    let touched = false;
    const slideWidth = 100; // 100% width
    
    // Initialize slider
    updateSliderPosition();
    updatePaginationDots();
    
    // Set up event listeners
    prevBtn.addEventListener('click', showPrevSlide);
    nextBtn.addEventListener('click', showNextSlide);
    
    // Set up touch/swipe functionality
    slider.addEventListener('touchstart', handleTouchStart, { passive: true });
    slider.addEventListener('touchmove', handleTouchMove, { passive: true });
    slider.addEventListener('touchend', handleTouchEnd);
    
    // Mouse drag for desktop
    slider.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Set up pagination dots
    paginationDots.forEach(dot => {
      dot.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        goToSlide(index);
      });
    });
    
    function showPrevSlide() {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = slides.length - 1; // Loop to the last slide
      }
      updateSliderPosition();
      updatePaginationDots();
    }
    
    function showNextSlide() {
      if (currentIndex < slides.length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0; // Loop to the first slide
      }
      updateSliderPosition();
      updatePaginationDots();
    }
    
    function goToSlide(index) {
      currentIndex = index;
      updateSliderPosition();
      updatePaginationDots();
    }
    
    function updateSliderPosition() {
      slider.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    }
    
    function updatePaginationDots() {
      paginationDots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.remove('bg-purple-200');
          dot.classList.add('bg-purple-500');
        } else {
          dot.classList.remove('bg-purple-500');
          dot.classList.add('bg-purple-200');
        }
      });
    }
    
    function handleTouchStart(e) {
      startX = e.touches[0].clientX;
      touched = true;
    }
    
    function handleTouchMove(e) {
      if (!touched) return;
      const currentX = e.touches[0].clientX;
      const diff = startX - currentX;
      
      // Optional: add some visual feedback during swiping
      if (Math.abs(diff) > 30) {
        e.preventDefault();
      }
    }
    
    function handleTouchEnd(e) {
      if (!touched) return;
      touched = false;
      const currentX = e.changedTouches[0].clientX;
      const diff = startX - currentX;
      
      if (diff > 50) {
        showNextSlide(); // Swipe left, go to next slide
      } else if (diff < -50) {
        showPrevSlide(); // Swipe right, go to previous slide
      }
    }
    
    function handleMouseDown(e) {
      startX = e.clientX;
      touched = true;
      slider.style.cursor = 'grabbing';
    }
    
    function handleMouseMove(e) {
      if (!touched) return;
      e.preventDefault(); // Prevent text selection during drag
    }
    
    function handleMouseUp(e) {
      if (!touched) return;
      touched = false;
      slider.style.cursor = 'grab';
      
      const diff = startX - e.clientX;
      if (diff > 50) {
        showNextSlide();
      } else if (diff < -50) {
        showPrevSlide();
      }
    }
    
    // setInterval(function() {
    //   showNextSlide();
    // }, 6000);
  });